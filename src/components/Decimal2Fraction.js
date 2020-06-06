import React from "react";

let fractions = [...Array(32)].map((x, i) => i / 32);
// console.log(fractions);

class Decimal2Fraction extends React.Component {
  d2f({ target }) {
    if (!target.value.match(/\d+\.?\d*/)) return;

    let fractionDiv = document.getElementById("fraction");
    let errorDiv = document.getElementById("error");
    let value = target.value;
    let number = Math.floor(value);
    let decimal = round5(value % 1);
    // console.log(number + decimal);

    number = number ? number : "";

    // let neighbors = fractions.filter((x,i))
    let fraction = reduce(
      fractions.indexOf(
        fractions.reduce((prev, curr) =>
          Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev
        )
      ),
      32
    );
    // console.log(fraction);

    fractionDiv.textContent = `${number} ${fraction[0]}/${fraction[1]}`;
    errorDiv.textContent = round3(value - (number + fraction[0] / fraction[1]));
  }
  render() {
    let style = { width: "100px" };
    return (
      <div className="mx-auto">
        <div className="my-3">Decimal to Fraction</div>
        {/* <div className="flex">
          <div>
            <input className="textCenter" onChange={this.d2f} style={style} />
          </div>
          <div id="fraction" className="ml-2 px-2 border" style={style}></div>
          <div id="error" className="ml-2 px-2 border" style={style}></div>
        </div> */}
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "10px 5px",
          }}
        >
          <tbody>
            <tr>
              <td style={style}>Decimal</td>
              <td style={style}>Fraction</td>
              <td style={style}>Error</td>
            </tr>
            <tr>
              <td>
                <input
                  className="textCenter"
                  onChange={this.d2f}
                  style={style}
                />
              </td>
              <td id="fraction" className="border">
                &nbsp;
              </td>
              <td id="error" className="border">
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Decimal2Fraction;

function round3(value) {
  return Math.round(value * 1000) / 1000;
}

function round5(value) {
  return Math.round(value * 100000) / 100000;
}

function reduce(numerator, denominator) {
  var gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}
