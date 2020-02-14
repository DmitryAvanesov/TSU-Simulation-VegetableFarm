'use strict';

var budget = 0;

class Cell {
  constructor() {
    this.age = 0;
    this.ageOfYoungShoots = 5;
    this.ageOfAlmostRipe = 15;
    this.ageOfRipe = 20;
    this.ageOfCropSpoiled = 30;

    this.state = {
      empty: true,
      justSown: false,
      youngShoots: false,
      almostRipe: false,
      ripe: false,
      cropSpoiled: false
    };
  }

  checkStateChanging(ui) {
    if (!this.state.empty) {
      this.age++;
    }

    if (this.age === this.ageOfYoungShoots) {
      ui.changeState('youngShoots');
    }
    else if (this.age === this.ageOfAlmostRipe) {
      ui.changeState('almostRipe');
    }
    else if (this.age === this.ageOfRipe) {
      ui.changeState('ripe');
    }
    else if (this.age === this.ageOfCropSpoiled) {
      ui.changeState('cropSpoiled');
    }
  }

  handleClick(ui) {
    this.age = 0;

    if (ui.state.empty) {
      ui.changeState('justSown');
    }
    else {
      ui.changeState('empty');
    }
  }
}

class Cell_UI extends React.Component {
  constructor(props) {
    super(props);
    this.model = new Cell();

    this.state = {
      status: 'empty'
    };

    setInterval(() => {
      this.model.checkStateChanging(this);

    }, this.model.growingInterval);
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
    this.fieldSideLength = 4;
    this.cells = [];
    this.time = 0;
    this.timeIncreasingInterval = 100;
  }

  increaseTime() {
    this.time++;

    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.setState('empty');
      });
    });
  }
}

class Field_UI extends React.Component {
  constructor(props) {
    super(props);
    this.model = new Field();

    setInterval(() => {
      this.model.increaseTime();
    }, this.model.timeIncreasingInterval);
  }

  render() {
    for (let i = 0; i < this.model.fieldSideLength; i++) {
      let rowCells = [];

      for (let j = 0; j < this.model.fieldSideLength; j++) {
        rowCells.push(this.renderCell(i * this.model.fieldSideLength + j));
      }

      this.model.cells.push(rowCells);
    }

    return (
      <div className='field'>
        <div
          className='field-row'>
          {this.cells[0]}
        </div>
        <div
          className='field-row'>
          {this.cells[1]}
        </div>
        <div
          className='field-row'>
          {this.cells[2]}
        </div>
        <div
          className='field-row'>
          {this.cells[3]}
        </div>
      </div>
    );
  }

  renderCell(newKey) {
    return (
      <Cell_UI
        key={newKey} />
    );
  }
}

ReactDOM.render(<Field_UI />, document.querySelector('#container-farm'));