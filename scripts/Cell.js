'use strict';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.model = new CellModel(this);
  }

  render() {
    this.setStatus();

    return (
      <div
        className={`cell ${this.model.status}`}
        onClick={() => this.props.clickCallback(this.props.index, this.model.status)}>
      </div>
    );
  }

  setStatus() {
    this.model.status = this.props.isEmpty ? 'empty' :
      this.props.age < this.model.ageOfYoungShoots ? 'just-sown' :
        this.props.age < this.model.ageOfAlmostRipe ? 'young-shoots' :
          this.props.age < this.model.ageOfRipe ? 'almost-ripe' :
            this.props.age < this.model.ageOfCropSpoiled ? 'ripe' :
              'crop-spoiled';
  }
}
