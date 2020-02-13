'use strict';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.growingInterval = 1000;
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

    setInterval(() => {
      if (!this.state.empty) {
        this.age++;
      }

      if (this.age === this.ageOfYoungShoots) {
        this.changeState('youngShoots');
      }
      else if (this.age === this.ageOfAlmostRipe) {
        this.changeState('almostRipe');
      }
      else if (this.age === this.ageOfRipe) {
        this.changeState('ripe');
      }
      else if (this.age === this.ageOfCropSpoiled) {
        this.changeState('cropSpoiled');
      }

    }, this.growingInterval);
  }

  render() {
    const empty = this.state.empty ? 'empty' : '';
    const justSown = this.state.justSown ? 'just-sown' : '';
    const youngShoots = this.state.youngShoots ? 'young-shoots' : '';
    const almostRipe = this.state.almostRipe ? 'almost-ripe' : '';
    const ripe = this.state.ripe ? 'ripe' : '';
    const cropSpoiled = this.state.cropSpoiled ? 'crop-spoiled' : '';

    return (
      <div
        className={`cell ${empty} ${justSown} ${youngShoots} ${almostRipe} ${ripe} ${cropSpoiled}`}
        onClick={() => this.handleClick()}>
      </div>
    );
  }

  handleClick() {
    this.age = 0;

    if (this.state.empty) {
      this.changeState('justSown');
    }
    else {
      this.changeState('empty');
    }
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

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.fieldSideLength = 4;
    this.cells = [];
  }

  render() {
    for (let i = 0; i < this.fieldSideLength; i++) {
      let rowCells = [];

      for (let j = 0; j < this.fieldSideLength; j++) {
        rowCells.push(this.renderCell(i * this.fieldSideLength + j));
      }

      this.cells.push(rowCells);
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
      <Cell
        key={newKey} />
    );
  }
}

ReactDOM.render(<Field />, document.querySelector('#container-farm'));