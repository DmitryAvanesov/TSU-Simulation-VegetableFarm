'use strict';


class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.model = new CellModel(this);
  }

  render() {
    this.model.setStatus();

    if (this.props.index == 0) {
      console.log(this.props.isEmpty);
    }

    return (
      <div
        className={`cell ${this.model.status}`}
        onClick={() => this.props.clickCallback(this.props.index)}>
      </div>
    );
  }
}

class CellModel {
  constructor(ui) {
    this.ui = ui;
    this.status = 'empty';

    this.ageOfYoungShoots = 30;
    this.ageOfAlmostRipe = 150;
    this.ageOfRipe = 200;
    this.ageOfCropSpoiled = 300;
  }

  setStatus() {
    this.status = this.ui.props.isEmpty ? 'empty' :
      this.ui.props.age < this.ageOfYoungShoots ? 'just-sown' :
        this.ui.props.age < this.ageOfAlmostRipe ? 'young-shoots' :
          this.ui.props.age < this.ageOfRipe ? 'almost-ripe' :
            this.ui.props.age < this.ageOfCropSpoiled ? 'ripe' :
              'crop-spoiled';
  }
}


class Field extends React.Component {
  constructor(props) {
    super(props);
    this.model = new FieldModel(this);

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
      <Cell
        key={newKey}
        index={newKey}
        isEmpty={newIsEmpty}
        age={newAge}
        clickCallback={newClickCallback} />
    );
  }
}

class FieldModel {
  constructor(ui) {
    this.ui = ui;
    this.numberOfCells = 16;
    this.cells = [];
    this.cellData = [];
    this.timeIncreasingInterval = 100;

    this.handleClick = this.handleClick.bind(this);
  }

  createCells() {
    for (let cellIndex = 0; cellIndex < this.numberOfCells; cellIndex++) {
      this.cellData.push({
        isEmpty: true,
        age: 0
      });

      this.cells.push(this.ui.renderCell(
        cellIndex,
        this.cellData[cellIndex].isEmpty,
        this.cellData[cellIndex].age,
        this.handleClick
      ));
    }

    return this.cells;
  }

  increaseTime() {
    this.time++;

    this.cells.forEach((_cell, index) => {
      if (!this.cellData[index].isEmpty) {
        this.cellData[index].age++;
      }

      this.cells[index] = this.ui.renderCell(
        index,
        this.cellData[index].isEmpty,
        this.cellData[index].age,
        this.handleClick
      );
    });

    this.ui.setState(this.cells);
  }

  handleClick(index) {
    this.cellData[index].isEmpty = !this.cellData[index].isEmpty;

    if (this.cellData[index].isEmpty) {
      this.cellData[index].age = 0;
    }
  }
}


ReactDOM.render(<Field />, document.querySelector('#container-farm'));