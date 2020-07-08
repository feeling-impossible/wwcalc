import React from "react";
import Utils from "../Utils";
import Help from "./Help";

var defaultInput = "Math goes here. Enter to submit. Example: 11/3";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisions: 32,
      history: [],
      index: 0,
      input: defaultInput,
      help: false,
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.historyPush = this.historyPush.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }
  componentDidUpdate() {
    this.scrollDown();
  }
  onFocus(e) {
    if (e.target.value === defaultInput) e.target.value = "";
  }
  onKeyUp(e) {
    if (e.key === "ArrowUp") {
      e.target.value = this.state.history[this.state.index - 1]
        ? this.state.history[this.state.index - 1].function
        : "";
      if (this.state.index >= 0) this.setState({ index: this.state.index - 1 });
      return;
    } else if (e.key === "ArrowDown") {
      e.target.value = this.state.history[this.state.index + 1]
        ? this.state.history[this.state.index + 1].function
        : "";
      if (this.state.index < this.state.history.length)
        this.setState({ index: this.state.index + 1 });
      return;
    } else if (e.key === "Enter" && e.target.value) {
      let value = e.target.value
        .replace(/\sin\s*/gi, " ")
        .replace(/\s*([+*\-/()])\s*/g, " $1 ")
        .replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)\s*/g, "($1+$2/$3) ");
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
  toggleHelp() {
    this.setState({ help: !this.state.help });
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
          <div className="my-3 flex">
            <div className="mr-1 grow">
              <input
                style={{ width: "100%" }}
                defaultValue={this.state.input}
                onKeyUp={this.onKeyUp}
                onFocus={this.onFocus}
              ></input>
            </div>
            <div
              onClick={this.toggleHelp}
              className="pointer textCenter text-white bg-primary border border-secondary rounded-circle"
              style={{
                width: 30,
                height: 30,
                fontSize: "1.5em",
                lineHeight: "1.1em",
              }}
            >
              ?
            </div>
          </div>
        </div>
        {this.state.help && <Help toggleHelp={this.toggleHelp} />}
      </div>
    );
  }
}

export default Calculator;
