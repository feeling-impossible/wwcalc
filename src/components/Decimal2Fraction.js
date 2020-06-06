import React from "react";
import Utils from "../Utils";

class Decimal2Fraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decimal: undefined,
      fraction: undefined,
      error: undefined,
    };
    this.onChange = this.onChange.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    // this.onDivisionsChange = this.onDivisionsChange.bind(this);
  }
  onInputChange({ target }) {
    this.setState(Utils.d2f(target.value, this.state.divisions));
  }
  onDivisionsChange({ target }) {
    this.setState({ divisions: target.value });
  }
  onChange() {
    let divisions = document.getElementById("divisions").value;
    let value = document.getElementById("value").value;
    this.setState(Utils.d2f(value, divisions));
  }
  render() {
    let style = { width: "100px" };
    return (
      <div className="mx-auto">
        <div className="my-3">
          <h3>Round to Fraction</h3>
        </div>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "10px 5px",
          }}
        >
          <tbody>
            <tr>
              <td style={style}>Round</td>
              <td style={style}>&nbsp;</td>
              <td style={style}>Fraction</td>
              <td style={style}>Decimal</td>
              <td style={style}>Difference</td>
            </tr>
            <tr>
              <td>
                <select
                  id="divisions"
                  defaultValue={32}
                  onChange={this.onChange}
                  style={style}
                >
                  {[64, 32, 16, 8, 4].map((value) => {
                    return (
                      <option className="textCenter" key={value} value={value}>
                        {value}
                        {value.toString().match(/2$/) ? "nd" : "th"}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <input
                  id="value"
                  className="textCenter"
                  onChange={this.onChange}
                  style={style}
                />
              </td>
              <td className="border">{this.state.fraction || ""}</td>
              <td className="border">
                {Utils.round3(this.state.decimal) || ""}
              </td>
              <td className="border">{Utils.round3(this.state.error) || ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Decimal2Fraction;