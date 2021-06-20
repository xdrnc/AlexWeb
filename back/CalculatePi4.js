function calcPi(n) {
    //Machin's formula for pi:
    return ((16 * Math.atan(1 / 5) - 4 * Math.atan(1 / 239)).toFixed(n)).toString();
}

module.exports = {
    calcPi
}

//https://gist.github.com/bennett39/193a566dc38fff39aa5df6acdb807d40