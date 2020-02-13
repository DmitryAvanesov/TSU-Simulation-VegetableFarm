'use strict';

class Cell extends React.Component {
  render() {
    return (
      <div
        className="cell"
        onClick={() => { alert('Good') }}>

      </div>
    );
  }
}

ReactDOM.render(<Cell />, document.querySelector('#container-farm'));