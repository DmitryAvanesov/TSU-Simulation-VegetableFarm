'use strict';

class FieldModel {
  constructor() {
    this.handleClick = this.handleClick.bind(this);

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
  }

  createCellData() {
    for (let cellIndex = 0; cellIndex < this.numberOfCells; cellIndex++) {
      this.cellData.push({
        isEmpty: true,
        age: 0
      });
    }
  }

  increaseTime() {
    this.time++;

    this.cellData.forEach((_cell, index) => {
      if (!this.cellData[index].isEmpty) {
        this.cellData[index].age++;
      }
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
}
