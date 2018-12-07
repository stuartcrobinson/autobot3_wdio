// @ts-check

import assert from 'assert';
import { options } from '../../aquifer/aqua';
import { createAProjectPage } from '../ui-model/wordsmith/misc/page/createAProject.page';
import { loginPage } from '../ui-model/wordsmith/misc/page/login.page';
import { dashboardPage } from '../ui-model/wordsmith/misc/page/dashboard.page';
import { Table } from '../ui-model/wordsmith/table';

describe('Dashboard', () => {
  before(() => { loginPage.logIn(options.wsLogin, options.wsPassword, options.wsUrl); });


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
