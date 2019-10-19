const assert = require('assert');
const path = require('path');
let casual = require('casual');
let window1 = null
let window2 = null


casual.define('user', function () {
    return {
        username: casual.username,
        firstName: casual.first_name,
        lastName: casual.last_name,
        password: "aA123456",
        sNo: "s" + casual.integer(from = "3000000", to = "5000000"),
        sEmail: casual.email,
        phoneNo: "040" + casual.integer(from = "1000000", to = "9999999")
    }
})

casual.define('user_2', function () {
    return {
        username: casual.username,
        firstName: casual.first_name,
        lastName: casual.last_name,
        password: "aA123456",
        sNo: "s" + casual.integer(from = "3000000", to = "5000000"),
        sEmail: casual.email,
        phoneNo: "040" + casual.integer(from = "1000000", to = "9999999")
    }
});

let user = casual.user;
let user2 = casual.user_2;


describe('Login and Register test', () => {
    it('It should register a test account', () => {
        browser.url('http://localhost:4200');
        window1 = browser.getWindowHandle();

        const registerBtn = $('button[name="register"]');
        registerBtn.click();

        const username = $('input[name="username"]');
        username.setValue(user.username);

        const password = $('input[name="password"]');
        password.setValue(user.password);

        const retypepassword = $('input[name="retypepassword"]');
        retypepassword.setValue(password.getValue());

        const firstName = $('input[name="firstname"]');
        firstName.setValue(user.firstName);

        const lastName = $('input[name="lastname"]');
        lastName.setValue(user.lastName);

        const sNo = $('input[name="studentnumber"]');
        sNo.setValue(user.sNo);

        const sEmail = $('input[name="email"]');
        sEmail.setValue(user.sEmail);

        const phoneNo = $('input[name="phonenumber"]');
        phoneNo.setValue(user.phoneNo);

        const submitBtn = $('button[name="register"]');
        submitBtn.click();

        assert.strictEqual(0, $$('.checkError').length, "Information must not exist");
        
        browser.pause(1000);
    })

    it('It should login with registered user', () => {
        const username = $('input[name="username"]');
        username.setValue(user.username);

        const password = $('input[name="password"]');
        password.setValue(user.password);

        const loginBtn = $('button[name="login"]');
        loginBtn.click();

        browser.waitUntil(() => {
            return browser.getUrl() === 'http://localhost:4200/welcome/' + user.username
        }, 1000);

        assert.equal(browser.getUrl(), 'http://localhost:4200/welcome/' + user.username);
    })
});

describe('Post status and comment on the general wall', () => {
    it('It should post status with logged in user', () => {
        let i = 0;
        const statusInput = $('input[name="description"]');
        const submitBtn = $('button[type="submit"]');

        for (let i = 0; i <= 5; i++) {
            statusInput.setValue("This is the test status number " + i);
            submitBtn.click();
        }
    })

    it('It should comment on posted status', () => {
        const comments = $$('input[placeholder="Write a comment.."]');
        for (const key in comments) {
            if (comments.hasOwnProperty(key)) {
                const comment = comments[key];
                comment.setValue("random comment " + key);
                browser.keys("Enter");
            }
        }
    })
});

describe('Change avatar and background', () => {
    it('It should change avatar', () => {
        const profileLink = $('a[href="/profile/' + user.username + '"]')
        profileLink.click();
        browser.pause(1000);
        // browser.waitUntil(() => {
        //     return !browser.isLoading();
        // }, 1000);

        const avatarBtn = $('.image-cropper');
        avatarBtn.click();

        const uploadAvatarBtn = $('input[name="avatarfile"]');
        const filePath = path.join(__dirname, '/assets/test1-ava.jpg');
        uploadAvatarBtn.setValue(filePath);

        const saveBtn = $('.btn-primary=Save Changes');
        saveBtn.click();
    })

    it('It should change banner', () => {
        // browser.waitUntil(() => {
        //     return !browser.isLoading();
        // }, 1000);

        const bannerBtn = $('.banner');
        bannerBtn.click();

        const uploadBannerBtn = $('input[name="backgroundfile"]');
        const filePath = path.join(__dirname, '/assets/test1-banner.jpg');

        uploadBannerBtn.setValue(filePath);
        const saveBtn = $('.btn-primary=Save Changes');
        saveBtn.click();
        browser.pause(1000);
    })

});

describe('Post status and comment on their own profile', () => {
    it('It should post status with logged in user', () => {
        let i = 0;
        const statusInput = $('input[name="description"]');
        const submitBtn = $('button[type="submit"]');

        for (let i = 0; i <= 5; i++) {
            statusInput.setValue("This is the test status number " + i);
            submitBtn.click();
        }
    })

    it('It should comment on posted status', () => {
        const comments = $$('input[placeholder="Write a comment.."]');
        for (const key in comments) {
            if (comments.hasOwnProperty(key)) {
                const comment = comments[key];
                comment.setValue("random comment " + key);
                browser.keys("Enter");
            }
        }
    })
});

/*-----------------------------------------------------------------------------*/

describe('Create an account for second test user', () => {
    it('It should open a new window', () => {
            browser.url('http://localhost:4200');
            browser.newWindow('http://localhost:4200');
            window2 = browser.getWindowHandle();
    })

    it('It should register a second test account', () => {

        const logoutBtn = $('a[name="logout"]');
        logoutBtn.click();

        const registerBtn = $('button[name="register"]');
        registerBtn.click();

        const username = $('input[name="username"]');
        username.setValue(user2.username);

        const password = $('input[name="password"]');
        password.setValue(user2.password);

        const retypepassword = $('input[name="retypepassword"]');
        retypepassword.setValue(password.getValue());

        const firstName = $('input[name="firstname"]');
        firstName.setValue(user2.firstName);

        const lastName = $('input[name="lastname"]');
        lastName.setValue(user2.lastName);

        const sNo = $('input[name="studentnumber"]');
        sNo.setValue(user2.sNo);

        const sEmail = $('input[name="email"]');
        sEmail.setValue(user2.sEmail);

        const phoneNo = $('input[name="phonenumber"]');
        phoneNo.setValue(user2.phoneNo);

        const submitBtn = $('button[name="register"]');
        submitBtn.click();

        assert.strictEqual(0, $$('.checkError').length, "Information must not exist");

        browser.pause(1000);

    })

    it('It should login with the second registered user', () => {

        // browser.pause(500);
        const username = $('input[name="username"]');
        username.setValue(user2.username);

        const password = $('input[name="password"]');
        password.setValue(user2.password);

        const loginBtn = $('button[name="login"]');
        loginBtn.click();

        let pageUrl = browser.getUrl();
        assert.notEqual(pageUrl, "http://localhost:4200/welcome/" + username.getValue());
    })
});


describe('Post status and comment for second user on the general wall', () => {
    it('It should post status with the second logged in user', () => {
        let i = 0;
        const statusInput = $('input[name="description"]');
        const submitBtn = $('button[type="submit"]');

        for (let i = 0; i <= 5; i++) {
            statusInput.setValue("This is the test status number " + i + " for second user");
            submitBtn.click();
        }
    })

    it('It should comment on posted status on my profile', () => {
        const comments = $$('input[placeholder="Write a comment.."]');
        for (const key in comments) {
            if (comments.hasOwnProperty(key)) {
                const comment = comments[key];
                comment.setValue("random comment for second user " + key);
                browser.keys("Enter");
            }
        }
    })
});


describe('Message PM system', () => {
    it('It should be able to send Private Message', () => {
        const selectChat = $('.chat-username=' + user.username);
        selectChat.click();

        const chatInput = $('.chatControl input');
        chatInput.setValue("Hey");
        browser.keys("Enter");

        browser.switchToWindow(window1);

        chatInput.setValue("Hi, how are you?");
        browser.keys("Enter");

        browser.switchToWindow(window2);
        chatInput.setValue("Pretty good, thanks.");
        browser.keys("Enter");
    })
});


describe('Change avatar and background of the second tester', () => {
    it('It should change avatar of second tester', () => {
        const profileLink = $('a[href="/profile/' + user2.username + '"]');
        profileLink.click();

        browser.waitUntil(() => {
            return !browser.isLoading();
        },1000);

        const avatarBtn = $('.image-cropper');
        avatarBtn.click();

        const uploadAvatarBtn = $('input[name="avatarfile"]')
        const filePath = path.join(__dirname, '/assets/test2-ava.jpg');
        uploadAvatarBtn.setValue(filePath);

        const saveBtn = $('.btn-primary=Save Changes');
        saveBtn.click();
    })

    it('It should change banner of the second tester', () => {
        // browser.waitUntil(() => {
        //     return !browser.isLoading();
        // },1000);

        const bannerBtn = $('.banner');
        bannerBtn.click();

        const uploadBannerBtn = $('input[name="backgroundfile"]');
        const filePath = path.join(__dirname, '/assets/test2-banner.jpg');

        uploadBannerBtn.setValue(filePath);
        const saveBtn = $('.btn-primary=Save Changes');
        saveBtn.click();
        browser.pause(1000);
    })
});

describe('Post status and comment on their own profile', () => {
    it('It should post status with logged in user', () => {
        let i = 0;
        const statusInput = $('input[name="description"]');
        const submitBtn = $('button[type="submit"]');

        for (let i = 0; i <= 5; i++) {
            statusInput.setValue("This is the test status number " + i);
            submitBtn.click();
        }
    })

    it('It should comment on posted status', () => {
        const comments = $$('input[placeholder="Write a comment.."]');
        for (const key in comments) {
            if (comments.hasOwnProperty(key)) {
                const comment = comments[key];
                comment.setValue("random comment " + key);
                browser.keys("Enter");
            }
        }
    })
});