// @ts-check

describe('hooks1 describe @testtag', () => {
  describe('hooks1 describedescribe', () => {
    before(() => {
      // do async stuff
      console.log('hooks1 in  before!');
      // done();
    });

    after(function () {
      // do async stuff
      console.log('hooks1 in  after!');
      // done();

      console.log('this');
      console.log(this);

      console.log('this.test');
      console.log(this.test);
      console.log('this.test.parent');
      console.log(this.test.parent);
    });

    it('itHooks2_1 #testtag', () => {
      console.log('in itHooks2_1');
    });

    it('itHooks2_3', () => {
      console.log('in itHooks2_3');
    });
  });
});
