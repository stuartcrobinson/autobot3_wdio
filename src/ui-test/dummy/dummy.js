// @ts-check
import { fastWebpage } from '../../ui-model/misc/fastWebpage.page';

// @ts-check

// @ts-check
/* eslint guard-for-in: "off", no-restricted-syntax: "off", prefer-destructuring: "off" */


describe('DummyParent', () => {
  describe('Dummy', () => {
    it('go home', () => {
    });

    it('go home2', () => {
      fastWebpage.load();

      throw new Error('asdf');
    });

    it('go home3', () => {
    });
  });
});
