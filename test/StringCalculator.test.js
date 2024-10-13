const StringCalculator = require('../StringCalculator')

describe("String Calculator", function() {
    let calculator

    beforeEach(function() {
        calculator = new StringCalculator()
    })

    test("should return zero when '' is passed", function() {
        expect(calculator.add('')).toBe(0)
    })

    test("should return the number itself when a single number is passed", function() {
        expect(calculator.add('1')).toBe(1)
    })

    test("should return the sum of the numbers if two are given", function() {
        expect(calculator.add('1,2')).toBe(3)
    })

    test("should return the sum of an unknown amount of numbers", function() {
        const randomArray = (length, max) => [...new Array(length)]
            .map(() => Math.round(Math.random() * max))

        const randy = Math.floor((Math.random() * 100) + 1)
        const res = randomArray(randy, randy)
        const sum = res.filter(n => n <= 1000).reduce((pv, cv) => pv + cv, 0)
        const arg = res.join()
        expect(calculator.add(arg)).toBe(sum)
    })

    test("should allow \\n in between the input number string", function() {
        expect(calculator.add("1\n2,3")).toBe(6)
    })

    test("should not allow a single negative number and show it in the error message", function() {
        expect(() => calculator.add("-1,2,3")).toThrow('negative numbers not allowed: -1')
    })

    test("should not allow multiple negative numbers and show all of them in the error message", function() {
        expect(() => calculator.add("-1,2,-3")).toThrow('negative numbers not allowed: -1, -3')
    })

    test("should allow custom delimiter and return the sum", function() {
        expect(calculator.add("//;\n1;2")).toBe(3)
    })

    test("should handle custom delimiter with multiple characters", function() {
        expect(calculator.add("//[***]\n1***2***3")).toBe(6)
    })

    test("should ignore numbers greater than 1000 and return the sum", function() {
        expect(calculator.add("2,1001")).toBe(2)
        expect(calculator.add("//;\n2;1001")).toBe(2)
    })

    test("should handle large numbers correctly, ignoring those greater than 1000", function() {
        const numbers = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 2000)).join(',')
        const sum = numbers.split(',').filter(n => Number(n) <= 1000).reduce((a, b) => a + Number(b), 0)
        expect(calculator.add(numbers)).toBe(sum)
    })
})
