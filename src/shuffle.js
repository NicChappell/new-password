const shuffle = arr => {
    // keep track of current index
    let currentIndex = arr.length
    // temporary value
    let tempValue
    // random index
    let randomIndex

    while (currentIndex !== 0) {
        // get a random number
        randomIndex = Math.floor(Math.random() * currentIndex)

        // decrement currentIndex
        currentIndex--

        // swap values
        tempValue = arr[currentIndex]
        arr[currentIndex] = arr[randomIndex]
        arr[randomIndex] = tempValue
    }

    return arr
}

export default shuffle
