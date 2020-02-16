'use strict';

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
