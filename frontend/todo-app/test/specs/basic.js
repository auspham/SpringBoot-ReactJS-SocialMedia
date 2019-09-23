const assert = require('assert');

describe('Register test', () => {
    it('It should register a test account', () => {
        browser.url('http://localhost:4200');
        const username = $('input[name="username"]');
        username.setValue("123");
        console.log(username.getValue());
        browser.debug();
        // username.setValue('test123');
        // assert.strictEqual(username.getValue(), 'test123');
    })
})