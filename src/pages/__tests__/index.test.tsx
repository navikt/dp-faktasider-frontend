import React from 'react';
import { PureIndexPage } from '../index';
import { faktasiderSummaryMockData } from '../../utils/faktasiderSummary/faktasiderSummaryMockData';
import { render } from '../../testUtils/customized-testing-library';

test('Snapshottest landingsside', () => {
  const { container } = render(<PureIndexPage title={'Arbeid'} sider={faktasiderSummaryMockData} />);
  expect(container).toMatchSnapshot();
});
