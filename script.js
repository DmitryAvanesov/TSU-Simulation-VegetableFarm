'use strict';

class Cell {
  constructor(curEmpty, curAge) {
    this.empty = curEmpty;
    this.age = curAge;
    this.ageOfYoungShoots = 25;
    this.ageOfAlmostRipe = 150;
    this.ageOfRipe = 200;
    this.ageOfCropSpoiled = 300;

    this.stage =
      this.empty ? 'empty' :
        this.age < this.ageOfYoungShoots ? 'just-sown' :
          this.age >= this.ageOfYoungShoots && this.age < this.ageOfAlmostRipe ? 'young-shoots' :
            this.age >= this.ageOfAlmostRipe && this.age < this.ageOfRipe ? 'almost-ripe' :
              this.age >= this.ageOfRipe && this.age < this.ageOfCropSpoiled ? 'ripe' :
                'crop-spoiled';
  }

  handleClick(ui) {
    this.age = 0;

    if (ui.state.empty) {
      ui.changeState('just-sown');
    }
    else {
      ui.changeState('empty');
    }
  }
}

class Cell_UI extends React.Component {
  constructor(props) {
    super(props);
    this.model = new Cell(props.emptiness, props.age);

    this.state = {
      status: this.model.stage
    };
  }

  render() {
    return (
      <div
        className={`cell ${this.state.status}`}
        onClick={() => this.model.handleClick(this)}>
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
  constructor() {
    this.numberOfCells = 16;
    this.cells = [];
    this.cellData = [];
    this.timeIncreasingInterval = 100;
  }

  createCells(ui) {
    for (let cellIndex = 0; cellIndex < this.numberOfCells; cellIndex++) {
      this.cellData.push({
        empty: true,
        age: 0
      });

      this.cells.push(ui.renderCell(cellIndex, this.cellData[cellIndex]));
    }

    return this.cells;
  }

  increaseTime(ui) {
    this.time++;

    this.cells.forEach((_cell, index) => {
      if (!this.cellData[index].empty) {
        this.cells[index] = ui.renderCell(
          index,
          this.cellData[index].empty,
          this.cellData[index].age
        );
      }
    });

    ui.setState(this.cells);
  }
}

class Field_UI extends React.Component {
  constructor(props) {
    super(props);
    this.model = new Field();

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

  renderCell(newKey, isEmpty, newAge = 0) {
    return (
      <Cell_UI
        key={newKey}
        emptiness={isEmpty}
        age={newAge} />
    );
  }
}

ReactDOM.render(<Field_UI />, document.querySelector('#container-farm'));