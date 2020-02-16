'use strict'

class PaceControl extends React.Component {
  constructor(props) {
    super(props);

    this.handleSlide = this.handleSlide.bind(this);
  }

  render() {
    return (
      <input
        className='slider'
        type='range'
        min='1'
        max='20'
        onChange={this.handleSlide}>
      </input>
    );
  }

  handleSlide() {
    this.props.slideCallback(event.target.value);
  }
}