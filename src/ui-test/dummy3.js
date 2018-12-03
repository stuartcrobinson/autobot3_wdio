// @ts-check
import { livy } from '../../autobot_framework/support/Livy';

describe('DummyParent', () => {
  describe('Dummy', () => {
    it('go home', () => {
      const d = 9;
    });

    it('go home2', () => {
      throw new Error('dummy3 failed!');
    });

    it('go home3', () => {
    });
  });
});
