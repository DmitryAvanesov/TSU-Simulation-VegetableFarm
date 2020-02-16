'use strict';

class FieldModel {
  constructor(ui) {
    this.ui = ui;
    this.cells = [];
    this.cellData = [];

    this.numberOfCells = 16;
    this.initialAmountOfMoney = 100;
    this.initialPace = 50;
    this.timeIncreasingInterval = 1000;
    this.moneyForEmpty = -2;
    this.moneyForAlmostRipe = 3;
    this.moneyForRipe = 5;
    this.moneyForCropSpoiled = -1;

    this.time = 0;
    this.money = this.initialAmountOfMoney;

    this.handleClick = this.handleClick.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
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

    this.ui.setState({
      cells: this.cells,
      time: this.time,
      money: this.money
    });
  }

  handleClick(index, status) {
    if (this.money >= 0) {
      this.money +=
        status === 'empty' ? this.moneyForEmpty :
          status === 'almost-ripe' ? this.moneyForAlmostRipe :
            status === 'ripe' ? this.moneyForRipe :
              status === 'crop-spoiled' ? this.moneyForCropSpoiled :
                0;

      this.cellData[index].isEmpty = !this.cellData[index].isEmpty;

      if (this.cellData[index].isEmpty) {
        this.cellData[index].age = 0;
      }
    }
    else {
      alert('Your balance is negative\nGame over');
    }
  }

  handleSlide(pace) {
    clearInterval(this.ui.timeIncreasingWrapper);

    this.ui.timeIncreasingWrapper = setInterval(() => {
      this.increaseTime();

    }, this.timeIncreasingInterval * (1 / pace));
  }
}
