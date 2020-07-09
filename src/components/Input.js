import React from "react";
import Utils from "../Utils";
import Help from "./Help";
import About from "./About";

var defaultInput = "Math goes here. Enter to submit. Example: 11/3";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisions: 32,
      input: defaultInput,
      help: false,
      about: false,
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.divisionChange = this.divisionChange.bind(this);
  }
  toggleHelp() {
    this.setState({ help: !this.state.help });
  }
  toggleAbout() {
    this.setState({ about: !this.state.about });
  }
  onFocus(e) {
    if (e.target.value === defaultInput) e.target.value = "";
  }
  onKeyUp(e) {
    if (e.key === "ArrowUp") {
      e.target.value = this.props.history[this.props.index - 1]
        ? this.props.history[this.props.index - 1].function
        : "";
      this.props.historyUp();
      return;
    } else if (e.key === "ArrowDown") {
      e.target.value = this.props.history[this.props.index + 1]
        ? this.props.history[this.props.index + 1].function
        : "";
      this.props.historyDown();
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

      this.props.historyPush(result);
      e.target.value = "";
    }
  }
  divisionChange(e) {
    // console.log("divisionChange:", e.target.value);
    this.setState({ divisions: e.target.value });
  }
  render() {
    return (
      <div className="my-3 flex">
        <div className="mr-1 grow">
          <input
            style={{ width: "100%" }}
            defaultValue={this.state.input}
            onKeyUp={this.onKeyUp}
            onFocus={this.onFocus}
          ></input>
        </div>
        <div className="mx-1">
          <select
            style={{ height: 30 }}
            onChange={this.divisionChange}
            defaultValue={this.state.divisions}
          >
            {[64, 32, 16, 8, 4, 2].map((v) => {
              let end = v.toString().split("")[v.toString().length - 1];
              let label = v === 2 ? "Half" : `${v}${end === "2" ? "nd" : "th"}`;
              return (
                <option key={v} value={v}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div
          onClick={this.toggleHelp}
          className="mx-1 button pointer textCenter text-white bg-primary border border-secondary rounded-circle"
          style={{ lineHeight: "1.1em" }}
        >
          ?
        </div>
        <div
          onClick={this.toggleAbout}
          className="mx-1 button pointer textCenter text-white bg-success border border-secondary rounded-circle"
          style={{ lineHeight: "1.1em" }}
        >
          i
        </div>
        <div
          onClick={this.props.clearHistory}
          className="ml-1 button pointer textCenter text-white bg-danger border border-secondary rounded-circle"
          style={{ lineHeight: ".9em" }}
        >
          c
        </div>
        {this.state.help && <Help toggle={this.toggleHelp} />}
        {this.state.about && <About toggle={this.toggleAbout} />}
      </div>
    );
  }
}

export default Input;
