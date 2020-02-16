'use strict';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.model = new CellModel(this);
  }

  render() {
    this.model.setStatus();

    return (
      <div
        className={`cell ${this.model.status}`}
        onClick={() => this.props.clickCallback(this.props.index, this.model.status)}>
      </div>
    );
  }
}
