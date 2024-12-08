const { describe, expect } = require("@jest/globals");

require("@jest/globals");
const controller = require('../../../src/controllers/controllers');


describe(" test login control ", () => {


    test(`pure login : 
    Expected -- 
    res.cookie(), res.status(), res.json()`, () => {


        let res = {
            cookie: jest.fn(),
            status: jest.fn(),
            json: jest.fn()
        };
        let req = {
            signedCookies: {
                user: null
            }
        }


        controller.login(req, res, null);

        expect(res.cookie).toHaveBeenCalledWith('user', 'hero', { signed: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 1 });

    })




    test(`impure login : 
    Expected -- 
    res.cookie(), res.status(), res.json()`, () => {


        res = {
            cookie: jest.fn(),
            status: jest.fn(),
            json: jest.fn()
        };
        req = {
            signedCookies: {
                user: 'hero'
            }
        }


        controller.login(req, res, null);

        expect(res.cookie).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            {
                status: 0,
                message: 'already had cookie'
            });

    })




})

describe("test control logout", () => {

    let user = { name: 'user', val: 'hero' };

    test(`pure logout : 
    Expected --
    res.clearCookie(), res.status(), res.json()`, () => {
        let req = {
            signedCookies: {
                user: user.val    //having pre user
            }
        };
        let res = {
            status: jest.fn(() => { return res }),
            json: jest.fn(),
            clearCookie: jest.fn()
        }

        controller.logout(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith(user.name);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 1, messag: "succesfully log out." });

    })

    test(`impure logout :
    Expected --
    res.clearCookie(), res.status(), res.json()`, () => {

        let req = {
            signedCookies: {
                user: null        //not having pre user
            }
        };
        let res = {
            status: jest.fn(() => { return res }),
            json: jest.fn(),
            clearCookie: jest.fn()
        }

        controller.logout(req, res);

        expect(res.clearCookie).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 0, messag: "no user yet to logout." });
    })
});




