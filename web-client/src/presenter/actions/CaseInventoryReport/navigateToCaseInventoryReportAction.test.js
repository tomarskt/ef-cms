import { navigateToCaseInventoryReportAction } from './navigateToCaseInventoryReportAction';
import { presenter } from '../../presenter';
import { runAction } from 'cerebral/test';

describe('navigateToCaseInventoryReportAction', () => {
  let routeStub;

  beforeEach(() => {
    routeStub = jest.fn();

    presenter.providers.router = {
      route: routeStub,
    };
  });

  it('navigates to case inventory report url', async () => {
    await runAction(navigateToCaseInventoryReportAction, {
      modules: {
        presenter,
      },
    });

    expect(routeStub).toHaveBeenCalled();
  });
});