// @ts-check

import { assert } from 'chai';
import { options } from '../../autobot_framework/autobot';
import { createAProjectPage } from '../support/wordsmith/misc/page/createAProject.page';
import { loginPage } from '../support/wordsmith/misc/page/login.page';
import { dashboardPage } from '../support/wordsmith/misc/page/dashboard.page';
import Table from '../support/wordsmith/table';

describe('Dashboard', () => {
  before(() => { loginPage.logIn(options.email, options.password, options.url); });


  it('"New Project" button loads the "Create a Project" input table page', () => {
    dashboardPage.newProjectButton.click();
    createAProjectPage.waitForLoad();
    assert(createAProjectPage.isLoaded());
  });

  describe('Sort table', () => {
    before(() => { dashboardPage.load(); });

    describe('Projects ', () => {
      it('by Project increasing', () => {
        const values = dashboardPage.table.sortIncreasing('Project').select('Project').getValues();
        assert(Table.isIncreasing(values), 'Project column should be increasing');
      });

      it('by Project decreasing', () => {
        const values = dashboardPage.table.sortDecreasing('Project').select('Project').getValues();
        assert(Table.isDecreasing(values), 'Project column should be increasing');
      });
    });

    describe('Downloads ', () => {
      before(() => {
        dashboardPage.downloadsTabLink.click_waitForChange();
        dashboardPage.table.waitForHeader('Total Narratives');
      });

      it('by Project increasing', () => {
        const values = dashboardPage.table.sortIncreasing('Project').select('Project').getValues();
        assert(Table.isIncreasing(values), 'Project column should be increasing');
      });

      it('by Project decreasing', () => {
        const values = dashboardPage.table.sortDecreasing('Project').select('Project').getValues();
        assert(Table.isDecreasing(values), 'Project column should be increasing');
      });
    });
  });
});
