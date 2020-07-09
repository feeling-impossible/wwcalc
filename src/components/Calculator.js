import React from "react";
import Utils from "../Utils";
import Input from "./Input";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      index: 0,
    };
    this.historyPush = this.historyPush.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.historyUp = this.historyUp.bind(this);
    this.historyDown = this.historyDown.bind(this);
  }
  componentDidUpdate() {
    //scroll to bottom of history div
    let historyDiv = document.getElementById("history");
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }
  historyPush(data) {
    let history = this.state.history;
    history.push(data);
    this.setState({ history: history, index: history.length });
  }
  historyUp(e) {
    if (this.state.index >= 0) this.setState({ index: this.state.index - 1 });
  }
  historyDown(e) {
    if (this.state.index < this.state.history.length)
      this.setState({ index: this.state.index + 1 });
  }
  clearHistory() {
    this.setState({ history: [], index: 0 });
  }
  render() {
    return (
      <div className="h-100 flex">
        <div className="mx-auto flex flexCol" style={{ minWidth: 500 }}>
          <div className="header border border-secondary">Freedom Calc</div>
          <div
            id="history"
            onLoad={this.scrollDown}
            className="mt-3 px-2 grow scroll border"
          >
            <table style={{ width: "100%" }}>
              <thead>
                <tr className="border-bottom">
                  <td className="w-100 textCenter">&nbsp;</td>
                  <td className="px-2 textCenter border-right">Real</td>
                  <td className="px-2 textCenter border-right">Fraction</td>
                  {/* <td className="px-2 textCenter">Decimal</td> */}
                  <td className="px-2 textCenter">Error</td>
                </tr>
              </thead>
              <tbody>
                {this.state.history.map((row, i) => (
                  <tr className="noWrap" key={i}>
                    <td className="px-4 textRight">{row.function}</td>
                    <td className="px-2 border-right">
                      {Utils.round3(row.real)}
                    </td>
                    <td className="px-2  border-right bg-light">
                      {row.fraction}
                    </td>
                    {/* <td className="px-2">{Utils.round3(row.decimal)}</td> */}
                    <td className="px-2">{Utils.round3(row.error)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Input
            index={this.state.index}
            history={this.state.history}
            historyPush={this.historyPush}
            clearHistory={this.clearHistory}
            historyUp={this.historyUp}
            historyDown={this.historyDown}
          />
        </div>
      </div>
    );
  }
}

export default Calculator;
