const {calculateTip , calculateTipDefault} = require('../math')

test('calculating tip' , ()=> {
    let total = calculateTip(10,.3)
    // js method
    if(total !== 13){
        throw new Error('tip shoud be 13 but you got' + total)
    }
    // jest method
    expect(total).toBe(13)
})
test('calculating default tip' , () => {
    let total = calculateTipDefault(10)
    expect(total).toBe(12)
})