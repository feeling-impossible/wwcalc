import React from "react";
import Utils from "../Utils";

// let testData = [
//   {
//     decimal: 1.09375,
//     error: -0.006250000000000089,
//     fraction: "1 3/32",
//     function: "1.1",
//   },
//   {
//     decimal: 1.1875,
//     error: -0.012499999999999956,
//     fraction: "1 3/16",
//     function: "1.2",
//   },
//   {
//     decimal: 1.3125,
//     error: 0.012499999999999956,
//     fraction: "1 5/16",
//     function: "1.3",
//   },
// ];

var defaultInput = "Input Here. Use the enter key to submit. Example: 6.75/4";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisions: 32,
      history: [],
      index: 0,
      input: defaultInput,
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.historyPush = this.historyPush.bind(this);
  }
  componentDidUpdate() {
    this.scrollDown();
  }
  onFocus(e) {
    if (e.target.value === defaultInput) e.target.value = "";
  }
  onKeyUp(e) {
    // console.log(e.key);
    if (e.key === "ArrowUp") {
      // console.log("up:", this.state.index);
      e.target.value = this.state.history[this.state.index - 1]
        ? this.state.history[this.state.index - 1].function
        : "";
      if (this.state.index >= 0) this.setState({ index: this.state.index - 1 });
      return;
    } else if (e.key === "ArrowDown") {
      // console.log("down:", this.state.index);
      e.target.value = this.state.history[this.state.index + 1]
        ? this.state.history[this.state.index + 1].function
        : "";
      if (this.state.index < this.state.history.length)
        this.setState({ index: this.state.index + 1 });
      return;
    } else if (e.key === "Enter" && e.target.value) {
      let value = e.target.value
        .replace(/\sin\s*/gi, " ")
        .replace(/\s*([+\-/()])\s*/g, " $1 ")
        .replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)\s*/g, "($1+$2/$3) ");
      // console.log(value);
      let decimal;
      try {
        // eslint-disable-next-line
        decimal = eval(value);
        e.target.style.color = "black";
      } catch {
        e.target.style.color = "red";
        return;
      }

      let result = Utils.d2f(decimal, this.state.divisions);
      result.function = value;

      this.historyPush(result);
      e.target.value = "";
    }
  }
  historyPush(data) {
    let history = this.state.history;
    history.push(data);
    this.setState({ history: history, index: history.length });
  }
  scrollDown() {
    let historyDiv = document.getElementById("history");
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }
  render() {
    return (
      <div className="h-100 flex">
        <div className="mx-auto flex flexCol" style={{ minWidth: 500 }}>
          <div className="header border border-secondary">Freedom Calc</div>
          <div
            id="history"
            onLoad={this.scrollDown}
            className="mt-3 px-2 grow scroll"
          >
            <table style={{ width: "100%" }}>
              <thead>
                <tr className="border-bottom">
                  <td className="w-100 textCenter">&nbsp;</td>
                  <td className="px-2 textCenter">Real</td>
                  <td className="px-2 textCenter">Decimal</td>
                  <td className="px-2 textCenter">Error</td>
                  <td className="px-2 textCenter">Fraction</td>
                </tr>
              </thead>
              <tbody>
                {this.state.history.map((row, i) => (
                  <tr className="noWrap" key={i}>
                    <td className="px-4 textRight">{row.function}</td>
                    <td className="px-2">{Utils.round3(row.real)}</td>
                    <td className="px-2">{Utils.round3(row.decimal)}</td>
                    <td className="px-2">{Utils.round3(row.error)}</td>
                    <td className="px-2">{row.fraction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-3">
            <input
              style={{ width: "100%" }}
              defaultValue={this.state.input}
              onKeyUp={this.onKeyUp}
              onFocus={this.onFocus}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
