'use strict'

class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='info'>
        <div
          className='info-time'>
          Time passed: {this.props.time / 10} s
        </div>
        <div
          className='info-money'>
          Money left: {this.props.money} RUB
        </div>
      </div>
    );
  }
}