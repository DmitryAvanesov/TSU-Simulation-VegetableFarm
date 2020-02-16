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
      this.cells.push(this.ui.renderCell(cellIndex, this.cellData[cellIndex].isEmpty, this.cellData[cellIndex].age, this.handleClick));
    }
    return this.cells;
  }
  increaseTime() {
    this.time++;
    this.cells.forEach((_cell, index) => {
      if (!this.cellData[index].isEmpty) {
        this.cellData[index].age++;
      }
      this.cells[index] = this.ui.renderCell(index, this.cellData[index].isEmpty, this.cellData[index].age, this.handleClick);
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
