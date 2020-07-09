import React from "react";

class About extends React.Component {
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
            <h4>About</h4>
          </div>
          <p>
            Let me describe a scenary to you. If you live in a part of the world
            where we measure with fractions, I bet you've run into it too.
          </p>
          <p>
            You want to hang a picture in the exact middle of a wall. You break
            out your tape measure and it's 32 ¾. You go to your calculator and
            punch in (32+3/4)/2.
          </p>
          <p>
            16.375, perfect. There's only one glaring issue, there is no .375 on
            my tape measure. It's a tedious pain in the ass and I hate it.
          </p>
          <p>
            Freedom Calc rounds all the answers to the closest fraction. Problem
            solved. EZPZ.
          </p>
          {/* <p>
            P.S. To you folks in the metric part of the world, you buncha
            commies with your socialized medicine and standardized measuring
            systems. We all know metric is a cheating. Where is the challenge?
            You rational people using science and reasoning to make your lives
            better. Despicable. /s
          </p> */}
        </div>
      </div>
    );
  }
}

export default About;
