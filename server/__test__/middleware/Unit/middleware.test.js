const { describe, expect } = require("@jest/globals");

require("@jest/globals");
const middlewares = require('../../../src/middleware/middleware');


describe("test authorize middleware, with POST request", () => {
    let arr = [
        {
            message: `authorized : 
  Expected --
    next(), req.theJwt
  `, function: authorizedPost1
        },
        {
            message: `not authorized completely : 
  Expected -- 
   next(), res.json(), res.status(), req.theJwt
  `, function: authorizedPost2
        },
        {
            message: `not authorized, with not containing req.body.authorized property : 
        Expected -- 
         next(), res.json(), res.status(), req.theJwt
        `, function: authorizedPost3
        }
    ]
    for (let i = 0; i < 3; i++) {
        test(arr[i].message, () => { arr[i].function })
    }

});

describe("test authorize middleware, with GET request", () => {
    let arr = [
        {
            message: `authorized : 
  Expected --
    next(), req.theJwt
  `, function: authorizedPost1
        },
        {
            message: `not authorized completely : 
  Expected -- 
   next(), res.json(), res.status(), req.theJwt
  `, function: authorizedPost2
        },
        {
            message: `not authorized, with not containing req.body.authorized property : 
        Expected -- 
         next(), res.json(), res.status(), req.theJwt
        `, function: authorizedPost3
        }
    ]
    for (let i = 0; i < 3; i++) {
        test(arr[i].message, () => {
            arr[i].function('GET')
        })
    }

});

function authorizedPost1(method = 'POST') {

    let req = {};
    if (method === 'GET') {
        req = {
            query: {
                authorized: true
            },
            method: method
        };
    } else {
        req = {
            body: {
                authorized: true
            },
            method: method
        };
    }

    let next = jest.fn();
    let res = {
        status: jest.fn(() => { return res }),
        json: jest.fn(() => { return res })
    }



    middlewares.authorize(req, res, next);


    expect(next).toHaveBeenCalled();
    expect(req.theJwt).toBeTruthy();
}

function authorizedPost2(method = 'POST') {

    let req = {};

    if (method === 'GET') {
        req = {
            query: {
                authorized: false
            },
            method: method
        };
    } else {
        req = {
            body: {
                authorized: false
            },
            method: method
        };
    }


    let res = {
        status: jest.fn(() => { return res }),
        json: jest.fn(() => { return res })
    }
    let next = jest.fn();

    middlewares.authorize(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        status: -1,
        'message':
            'unauthorizd, please login'
    })
    expect(req.theJwt).not.toBeTruthy();

}

function authorizedPost3(method = 'POST') {

    let req = {};
    if (method === 'GET') {
        req = {
            query: {
                random: 'hero'
            },
            method: method
        }
    }
    else {
        req = {
            body: {
                random: 'hero'
            },
            method: method
        }
    }

    let res = {
        status: jest.fn(() => { return res }),
        json: jest.fn(() => { return res })
    }
    let next = jest.fn();

    middlewares.authorize(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        status: -2,
        'message':
            'unauthorizd, please config authorized properity in  req.query'
    })
    expect(req.theJwt).not.toBeTruthy();
}