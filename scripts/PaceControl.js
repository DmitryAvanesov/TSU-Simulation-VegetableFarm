'use strict'

class PaceControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        className='slider'
        type='range'
        min='1'
        max='20'
        onChange={() => {this.props.slideCallback(event.target.value)}}>
      </input>
    );
  }
}