'use strict';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.index = props.index;
  }

  render() {
    return (
      <div
        className='cell'>
        {this.index}
      </div>
    );
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