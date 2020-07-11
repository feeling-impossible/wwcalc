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
  onClick(e) {
    let input = document.getElementById("input");
    input.value = input.value + e.target.textContent;
    input.focus();
  }
  render() {
    return (
      <div className="h-100 flex">
        <div className="mx-auto flex flexCol" style={{ minWidth: 500 }}>
          <div className="mb-1 header border border-secondary">
            Freedom Calc
          </div>
          <div className="my-3">
            <Input
              index={this.state.index}
              history={this.state.history}
              historyPush={this.historyPush}
              clearHistory={this.clearHistory}
              historyUp={this.historyUp}
              historyDown={this.historyDown}
            />
          </div>
          {/* <div id="history" className="my-1 px-2 grow border"> */}
          {this.state.history.length > 0 && (
            <table className="my-1 px-2 border" style={{ width: "100%" }}>
              <thead>
                <tr className="border-bottom">
                  <td className="px-4 w-100 textRight">Input</td>
                  <td className="px-2 textRight border-right">Real</td>
                  <td className="px-2 textRight border-right">Rounded</td>
                  {/* <td className="px-2 textRight">Decimal</td> */}
                  <td className="px-2 textRight">Diff</td>
                </tr>
              </thead>
              <tbody>
                {this.state.history
                  .slice()
                  .reverse()
                  .map((row, i) => (
                    <tr className="noWrap" key={i}>
                      <td className="px-4 textRight" onClick={this.onClick}>
                        {row.function}
                      </td>
                      <td
                        className="px-2 textRight border-right"
                        onClick={this.onClick}
                      >
                        {Utils.round3(row.real)}
                      </td>
                      <td
                        className="px-2 textRight border-right bg-light"
                        onClick={this.onClick}
                      >
                        {row.fraction}
                      </td>
                      {/* <td className="px-2">{Utils.round3(row.decimal)}</td> */}
                      <td className="px-2 textRight" onClick={this.onClick}>
                        {Utils.round3(row.error)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Calculator;
