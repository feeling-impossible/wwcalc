// import React from "react";
var fracty = require("fracty");

let Utils = {};
Utils.d2f = function (value, divisions) {
  // console.log(typeof value, value);
  if (!value.toString().match(/^\d*\.?\d*$/))
    return {
      real: value,
      decimal: undefined,
      fraction: undefined,
      error: undefined,
    };

  let decimal = Math.round(value * divisions) / divisions;
  let fraction = fracty(decimal);
  let error = decimal - value;

  return {
    real: value,
    decimal: decimal,
    fraction: fraction,
    error: error,
  };
};

Utils.round3 = function (value) {
  return Math.round(value * 1000) / 1000;
};

Utils.round5 = function (value) {
  return Math.round(value * 100000) / 100000;
};

export default Utils;
