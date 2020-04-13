let calculateTip = (total , tip ) => total + (total * tip);
let calculateTipDefault = (total , tip = .2) => total + (total * tip)

module.exports = {
    calculateTip,
    calculateTipDefault
}