'use strict';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.index = props.index;
    this.state = {
      empty: false,
      justSown: true,
      youngShoots: false,
      almostRipe: false,
      ripe: false,
      cropSpoiled: false
    };
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
        onClick={this.handleClick}>
      </div>
    );
  }
  
  handleClick() {
    const newState = {};

    Object.keys(this.state).forEach(key => {
      newState[key] = false;
    });

    newState.empty = true;
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
    for (let curRowIndex = 0; curRowIndex < this.fieldSideLength; curRowIndex++) {
      let rowCells = [];

      for (let curIndex = 0; curIndex < this.fieldSideLength; curIndex++) {
        rowCells.push(this.renderCell(curRowIndex * this.fieldSideLength + curIndex));
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

  renderCell(newIndex) {
    return (
      <Cell
        key={newIndex}
        index={newIndex} />
    );
  }
}

ReactDOM.render(<Field />, document.querySelector('#container-farm'));