'use strict';

class Cell {
  constructor(props) {
    this.ageOfYoungShoots = 25;
    this.ageOfAlmostRipe = 150;
    this.ageOfRipe = 200;
    this.ageOfCropSpoiled = 300;

    console.log(props.isEmpty);
  }
}

class Cell_UI extends React.Component {
  constructor(props) {
    super(props);
    this.model = new Cell(props);

    this.state = {
      status: this.model.stage
    };
  }

  render() {
    return (
      <div
        className={`cell ${this.state.status}`}
        onClick={() => this.props.clickCallback(this.props.index)}>
      </div>
    );
  }

  changeState(newStateKey) {
    const newState = {};

    Object.keys(this.state).forEach(key => {
      newState[key] = false;
    });

    newState[newStateKey] = true;
    this.setState(newState);
  }
}

class Field {
  constructor(ui) {
    this.ui = ui;
    this.numberOfCells = 16;
    this.cells = [];
    this.cellData = [];
    this.timeIncreasingInterval = 1000;

    this.handleClick = this.handleClick.bind(this);
  }

  createCells() {
    for (let cellIndex = 0; cellIndex < this.numberOfCells; cellIndex++) {
      this.cellData.push({
        empty: true,
        age: 0
      });

      this.cells.push(this.ui.renderCell(
        cellIndex,
        this.cellData[cellIndex].empty,
        this.cellData[cellIndex].age,
        this.handleClick
      ));
    }

    return this.cells;
  }

  increaseTime() {
    this.time++;

    this.cells.forEach((_cell, index) => {
      if (!this.cellData[index].empty) {
        this.cells[index] = this.ui.renderCell(
          index,
          this.cellData[index].empty,
          ++this.cellData[index].age,
          this.handleClick
        );
      }
    });

    this.ui.setState(this.cells);
  }

  handleClick(index) {
    this.cellData[index].empty = !this.cellData[index].empty;

    if (this.cellData[index].empty) {
      this.cellData[index].age = 0;
    }
  }
}

class Field_UI extends React.Component {
  constructor(props) {
    super(props);
    this.model = new Field(this);

    this.state = {
      cells: this.model.createCells(this)
    };

    this.model.createCells(this);

    setInterval(() => {
      this.model.increaseTime(this);

    }, this.model.timeIncreasingInterval);
  }

  render() {
    return (
      <div className='field'>
        <div
          className='field-row'>
          {this.state.cells.slice(0, 4)}
        </div>
        <div
          className='field-row'>
          {this.state.cells.slice(4, 8)}
        </div>
        <div
          className='field-row'>
          {this.state.cells.slice(8, 12)}
        </div>
        <div
          className='field-row'>
          {this.state.cells.slice(12, 16)}
        </div>
      </div>
    );
  }

  renderCell(newKey, newIsEmpty, newAge, newClickCallback) {
    return (
      <Cell_UI
        key={newKey}
        index={newKey}
        isEmpty={newIsEmpty}
        age={newAge}
        clickCallback={newClickCallback} />
    );
  }
}

ReactDOM.render(<Field_UI />, document.querySelector('#container-farm'));