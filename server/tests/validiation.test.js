const expect = require('expect').expect
const { isRealString } = require('../utils/validation')

describe('IsRealString', () => {
    it('Should reject non string', () => {
        let testNum = 3
        expect(isRealString(testNum)).toBe(false)
    })
    it('Should reject string with only space', () => {
        let testSpaceStr = '  '
        expect(isRealString(testSpaceStr)).toBe(false)
    })
    it('Should allow string with not-space character', () => {
        let testStr = 'Test Str'
        expect(isRealString(testStr)).toBe(true)
    })
})