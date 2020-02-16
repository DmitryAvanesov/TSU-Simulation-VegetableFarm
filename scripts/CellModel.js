'use strict';

class CellModel {
  constructor(ui) {
    this.ui = ui;
    this.status = 'empty';

    this.ageOfYoungShoots = 20;
    this.ageOfAlmostRipe = 100;
    this.ageOfRipe = 120;
    this.ageOfCropSpoiled = 200;
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
