let counter = 0;

function sleep() {
    return new Promise(resolve => {
        console.log(counter)
        counter++
        setTimeout(resolve, 2000)
    })
}

const arr = ['a', 's', 'd', 'f']

// awaits the promise resolve to interate again
/*for (let index in arr){
    await sleep()
    console.log(arr[index])
}*/

// isn't going to wait the promise resolve
arr.map(async item => {
    await sleep()
    console.log(item)
})