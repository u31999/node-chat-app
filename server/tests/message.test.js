const expect = require('expect').expect
const {generateMessage, generateLocationMessage} = require('../utils/message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        const from = 'Jen'
        const text = 'Some message'
        const message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({ from, text })

    })
})

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        const from = 'Jon'
        const latitude = 15
        const longitude = 32
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`
        const locationMessage = generateLocationMessage(from, latitude, longitude)

        expect(typeof locationMessage.createdAt).toBe('number')
        expect(typeof locationMessage.url).toBe('string')
        expect(locationMessage).toMatchObject({from, url})
    })
})