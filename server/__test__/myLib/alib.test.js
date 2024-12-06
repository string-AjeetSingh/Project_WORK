

let alib = require('./../../src/myLib/PracLib/alib');
const mongoClient = require("mongodb");

require('@jest/globals');


jest.mock('mongodb', () => {

    let connectMocked = jest.fn();
    let findMocked = jest.fn(() => {
        return {
            toArray: jest.fn(async () => { })
        }
    });
    const db = jest.fn(() => {
        return {
            collection: jest.fn(() => {
                return {
                    find: findMocked,
                }
            })
        }
    })

    return {
        MongoClient: jest.fn(() => {
            return {
                connect: connectMocked, db
            }
        }),
        connectMocked, findMocked
    };
})



let mongo = new alib(null, null);

describe('testing alib.find()', () => {

    beforeAll(() => {
        mongo.setCollection('hero');
    })

    test('find()', () => {
        let query = { document: 'users' };
        mongo.find(query);
        let aclient = new mongoClient.MongoClient();

        expect(mongoClient.findMocked).toHaveBeenCalledWith(query);

    })
})