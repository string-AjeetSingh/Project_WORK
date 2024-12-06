import { ifDebugging } from "../../MyLib/ifDebugging/ifDebugging";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

let debug = new ifDebugging(true);
let consoleSpy;

describe('testing ifDebugging.console', () => {

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log')
    })
    test('provide the string as parameter', () => {

        let string = 'My name is Ajeet singh';
        debug.console(string);
        expect(debug.isDebugging).toBe(true)
        expect(consoleSpy).toHaveBeenCalledWith(string);
    })


    test('provide the Multi val as parameter', () => {

        let string = 'My name is Ajeet singh';
        debug.console(string, 'Hello hero');

        expect(consoleSpy).toHaveBeenCalledWith(string, 'Hello hero');
    })

})


describe('testing ifDebugging.levelConsole', () => {
    let debugSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'warn')
        debugSpy = jest.spyOn(debug, 'levelConsole').mockImplementation(() => { });
    })

    test('provide the string , level', () => {

        let string = 'My name is Ajeet singh';

        debug.levelConsole('warn', string, 'Hello hero');

        expect(debugSpy).toHaveBeenCalledWith('warn', string, 'Hello hero');

    })

})
