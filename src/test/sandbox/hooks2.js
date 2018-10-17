var assert = require('assert');
// var asdf = require('../../autobot');

describe('hooks2 describe', function () {

    describe('hooks2 describedescribe', function () {

        beforeEach(function () {
            // do async stuff
            console.log('hooks2 in  beforeEach!')
            // done();
        });

        afterEach(function () {
            // do async stuff
            console.log('hooks2 in  afterEach!')
            // done();
        });

        before(function () {
            // do async stuff
            console.log('hooks2 in  before!')
            // done();
        });

        after(function () {
            // do async stuff
            console.log('hooks2 in  after!')
            // done();
        });

        it('itHooks2_1', function () {
            console.log('in itHooks2_1')
        });

        it('itHooks2_2', function () {
            console.log('in itHooks2_2')
            assert(false, "false to fail itHooks2_2");
        });

        it('itHooks2_3', function () {
            console.log('in itHooks2_3')
        });

    });

});