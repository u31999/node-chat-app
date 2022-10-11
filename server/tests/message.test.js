const expect = require('expect').expect
const {generateMessage} = require('../utils/message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        const from = 'Jen'
        const text = 'Some message'
        const message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({ from, text })

    })
})