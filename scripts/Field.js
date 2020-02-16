class Field extends React.Component {
  constructor(props) {
    super(props);
    this.model = new FieldModel(this);
    this.state = {
      cells: this.model.createCells(this)
    };
    this.model.createCells(this);
    setInterval(() => {
      this.model.increaseTime(this);
    }, this.model.timeIncreasingInterval);
  }
  render() {
    return (<div className='field'>
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
    </div>);
  }
  renderCell(newKey, newIsEmpty, newAge, newClickCallback) {
    return (<Cell key={newKey} index={newKey} isEmpty={newIsEmpty} age={newAge} clickCallback={newClickCallback} />);
  }
}
