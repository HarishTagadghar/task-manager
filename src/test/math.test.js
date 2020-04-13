const {calculateTip , calculateTipDefault , add} = require('../math')

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

test('adding numbers with async method' , async()=> {
    let sum = await add(5,5)
    expect(sum).toBe(10)
}) // in jest testing with async code the code is running to be true every time so with async testing we should use async awit method

test('add without async await ' , (done) => {
add(5,5).then((sum)=> {
    expect(sum).toBe(10)
    done()
})
}) // a method without async await