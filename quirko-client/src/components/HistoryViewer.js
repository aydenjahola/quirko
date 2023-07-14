import React from "react";

class HistoryViewer extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div className="user-history">
        <h4>Your History</h4>
        <ul>
          {history.map((item) => (
            <li key={item.generatedKey}>
              <a href={item.generatedURL}>{item.generatedURL}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HistoryViewer;
