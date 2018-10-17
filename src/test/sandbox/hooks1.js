var assert = require('assert');
// var autobot = require('../../autobot.js');
// const asdf = require('../../../src/demo/class')

// import { Rectangle, Triangle, circle, throwerror } from '../../autobot.js';

describe('hooks1 describe @testtag', function () {

    describe('hooks1 describedescribe', function () {

        // beforeEach(function () {
        //     // do async stuff
        //     console.log('hooks1 in  beforeEach!')
        //     // done();
        // });

        // afterEach(function () {
        //     // do async stuff
        //     console.log('hooks1 in  afterEach!')
        //     // done();
        // });

        before(function () {
            // do async stuff
            console.log('hooks1 in  before!')
            // done();
        });

        after(function () {
            // do async stuff
            console.log('hooks1 in  after!')
            // done();

            console.log("this");
            console.log(this);

            console.log("this.test");
            console.log(this.test);
            console.log("this.test.parent");
            console.log(this.test.parent);

        });

        it('itHooks2_1 #testtag', function () {
            console.log('in itHooks2_1')
        });

        // it('itHooks2_2', function () {
        //     console.log('in itHooks2_2')
        //     throwerror();
        //     assert(true);
        //     // assert(false, "false to fail itHooks2_2");
        // });

        it('itHooks2_3', function () {
            console.log('in itHooks2_3')
        });

        // it('itHooks2_4 class test 1', function () {
        //     console.log('in itHooks2_4')
        //     const square = new Rectangle(10, 10);
        //     console.log('height: ' + square.height);
        // });

        // it('itHooks2_5 class test 2', function () {
        //     console.log('in itHooks2_5')
        //     // const circle = new autobot.Circle(10);
        //     console.log('height: ' + circle.radius);
        // });

        // it('itHooks2_6 class test 3', function () {
        //     console.log('in itHooks2_6')
        //     // const circle = new autobot.Circle(10);
        //     console.log('height: ' + new Triangle(123).height);
        // });

    });

});