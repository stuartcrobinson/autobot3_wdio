// @ts-check
import { livy } from '../../aqua/support/Livy';

describe('DummyParent2', () => {
  describe('Dummy2', () => {
    it('go home', () => {
    });

    it('go home2', () => {
      throw new Error('failing the test');
    });

    it('go home3', () => {
    });
  });
});
