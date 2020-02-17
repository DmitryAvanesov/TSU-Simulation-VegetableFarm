'use strict';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.model = new FieldModel();

    this.createCells = this.createCells.bind(this);
    this.handleSlide = this.handleSlide.bind(this);

    this.model.createCellData();

    this.state = {
      cells: this.createCells(),
      time: 0,
      money: this.model.initialAmountOfMoney
    };

    this.timeIncreasingWrapper = setInterval(() => {
      this.model.increaseTime();
      this.rerenderCells();

    }, this.model.timeIncreasingInterval * (1 / this.model.initialPace));
  }

  render() {
    return (
      <div className='field'>
        <div className='field-row'>
          {this.state.cells.slice(0, 4)}
        </div>
        <div className='field-row'>
          {this.state.cells.slice(4, 8)}
        </div>
        <div className='field-row'>
          {this.state.cells.slice(8, 12)}
        </div>
        <div className='field-row'>
          {this.state.cells.slice(12, 16)}
        </div>

        <Info
          time={this.state.time}
          money={this.state.money} />

        <PaceControl
          slideCallback={this.handleSlide} />
      </div>
    );
  }

  createCells() {
    const newCells = [];

    for (let cellIndex = 0; cellIndex < this.model.numberOfCells; cellIndex++) {
      newCells.push(this.renderCell(
        cellIndex,
        this.model.cellData[cellIndex].isEmpty,
        this.model.cellData[cellIndex].age,
        this.model.handleClick
      ));
    }

    return newCells;
  }

  renderCell(newKey, newIsEmpty, newAge, newClickCallback) {
    return (<Cell
      key={newKey}
      index={newKey}
      isEmpty={newIsEmpty}
      age={newAge}
      clickCallback={newClickCallback} />);
  }

  rerenderCells() {
    const newCells = [];

    this.state.cells.forEach((_cell, index) => {  
      newCells[index] = this.renderCell(
        index,
        this.model.cellData[index].isEmpty,
        this.model.cellData[index].age,
        this.model.handleClick
      );
    });

    this.setState({
      cells: newCells,
      time: this.model.time,
      money: this.model.money
    });
  }

  handleSlide(pace) {
    clearInterval(this.timeIncreasingWrapper);

    this.timeIncreasingWrapper = setInterval(() => {
      this.model.increaseTime();
      this.rerenderCells();

    }, this.model.timeIncreasingInterval * (1 / pace));
  }
}
