const assert = require('assert');

describe('Login and Register test', () => {
    it('It should register a test account', () => {
        browser.url('http://localhost:4200');
        const username = $('input[name="username"]');
        username.setValue("tester01");

        const password = $('input[name="password"]');
        password.setValue("aA123456");

        const retypepassword = $('input[name="retypepassword"]');
        retypepassword.setValue(password.getValue());

        const firstName = $('input[name="firstname"]');
        firstName.setValue("Tester");

        const lastName = $('input[name="lastname"]');
        lastName.setValue("Nguyen");

        const sNo = $('input[name="studentnumber"]');
        sNo.setValue("s9999000");

        const sEmail = $('input[name="email"]');
        sEmail.setValue("s9999000@student.rmit.edu.au");

        const phoneNo = $('input[name="phonenumber"]');
        phoneNo.setValue("0410999999");

        const submitBtn = $('button[type="submit"]');
        submitBtn.click();

        assert.strictEqual(0, $$('.checkError').length, "Information must not exist");

        browser.waitUntil(() => {
            return browser.getAlertText() === "Register Successful"
        }, 3000);
        browser.acceptAlert();
    })

    it('It should login with registered user', () => {
        const username = $('input[name="username"]');
        username.setValue("tester01");

        const password = $('input[name="password"]');
        password.setValue("aA123456");

        const loginBtn = $('button[type="button"]');
        loginBtn.click();

        browser.waitUntil(() => {
            return browser.getUrl() === 'http://localhost:4200/welcome/tester01'
        }, 3000);
        // assert.strictEqual('http://localhost:4200/welcome/tester01', browser.getUrl(), "User should be able to login");

    })
})