// @ts-check

describe('DummyParent1', () => {
  describe('Dummy1', () => {
    it('go home1', () => {
    });

    it('go home2', () => {
      throw new Error('failing the test');
    });

    it('go home3', () => {
    });
  });
});
