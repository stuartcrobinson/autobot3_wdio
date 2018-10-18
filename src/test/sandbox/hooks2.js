// @ts-check
const assert = require('assert');
// var asdf = require('../../autobot');

describe('hooks2 describe', () => {
  describe('hooks2 describedescribe', () => {
    beforeEach(() => {
      // do async stuff
      console.log('hooks2 in  beforeEach!');
      // done();
    });

    afterEach(() => {
      // do async stuff
      console.log('hooks2 in  afterEach!');
      // done();
    });

    before(() => {
      // do async stuff
      console.log('hooks2 in  before!');
      // done();
    });

    after(() => {
      // do async stuff
      console.log('hooks2 in  after!');
      // done();
    });

    it('itHooks2_1', () => {
      console.log('in itHooks2_1');
    });

    it('itHooks2_2', () => {
      console.log('in itHooks2_2');
      assert(false, 'false to fail itHooks2_2');
    });

    it('itHooks2_3', () => {
      console.log('in itHooks2_3');
    });
  });
});
