class StringCalculator {
    add(numbers) {
        if (numbers === '') {
            return 0
        }
  
        let delimiter = /,|\n/
        let numberString = numbers
  
        if (numbers.startsWith('//')) {
            const delimiterEndIndex = numbers.indexOf('\n')
            const customDelimiter = numbers.substring(2, delimiterEndIndex).trim()
            delimiter = new RegExp(customDelimiter)
            numberString = numbers.substring(delimiterEndIndex + 1)
        }
  
        let numArray = numberString.split(delimiter).map(n => Number(n))
        numArray = numArray.filter(n => n <= 1000)
        let negatives = numArray.filter(n => n < 0)
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`)
        }
        return numArray.reduce((sum, num) => sum + num, 0)
    }
}


//for test case uncomment this
module.exports = StringCalculator


// for UI uncomment this
// export default StringCalculator
