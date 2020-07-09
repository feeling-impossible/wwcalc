import React from "react";

class Help extends React.Component {
  render() {
    return (
      <div className="flex fixed-top w-100 h-100 bg-shade">
        <div
          className="m-auto px-3 py-2 border border-secondary rounded bg-white"
          style={{ width: 400 }}
        >
          <div
            onClick={this.props.toggle}
            className="mt-1 pointer float-right fontSmaller textCenter text-white bg-danger border border-secondary rounded-circle"
            style={{ width: 20, height: 20, lineHeight: 1.35 }}
          >
            X
          </div>
          <div className="mt-2 textCenter">
            <h4>Fraction Shorthand</h4>
          </div>
          <p>
            With most calculators if you want to input 3 ¾, you would have to
            enter it as "(3+3/4)". Ain't nobody got time for that.
          </p>
          <p>
            This calculator interprets "XX YY/ZZ" as "(XX+YY/ZZ)" saving you
            some keystrokes.
          </p>
          <p>Example: "22 3/4/2" would be interpreted as "(22+3/4)/2"</p>
          <p>It looks goofy but it works like a champ.</p>
          <div className="textCenter">
            <h4>Function History</h4>
          </div>
          <p>
            With the input field selected, use the up and down arrow keys to
            flip through your previous entries.
          </p>
          <p>
            Example: If you want to subtract 2 from the previous answer, just
            hit the up arrow, type "-2", and hit enter.
          </p>
        </div>
      </div>
    );
  }
}

export default Help;
