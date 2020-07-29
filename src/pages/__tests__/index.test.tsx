import React from 'react';
import IndexPage from '../../templates';
import { faktasiderSummaryMockData } from '../../utils/faktasiderSummary/faktasiderSummaryMockData';
import { render } from '../../testUtils/customized-testing-library';

test('Snapshottest landingsside', () => {
  // @ts-ignore
  const { container } = render(<IndexPage pageContext={{ title: 'Arbeid', summaries: faktasiderSummaryMockData }} />);
  expect(container).toMatchSnapshot();
});
