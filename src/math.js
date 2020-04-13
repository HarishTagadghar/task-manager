let calculateTip = (total , tip ) => total + (total * tip);
let calculateTipDefault = (total , tip = .2) => total + (total * tip)

let add = (a,b) => {
    return output = new Promise((resolve,reject) => {
            if ( a < 0 || b < 0){
          return reject(`cannot be negative`)
            }
             resolve( a + b )
    })
}





module.exports = {
    calculateTip,
    calculateTipDefault,
    add
}