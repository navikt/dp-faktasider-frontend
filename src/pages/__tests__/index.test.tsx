import React from 'react';
import { PureIndexPage } from '../index';
import { faktasiderSummaryMockData } from '../../utils/faktasiderSummary/faktasiderSummaryMockData';
import { render } from '../../testUtils/customized-testing-library';

const indexStaticQueryMockData = {
  oppsett: {
    title: {
      _type: 'localeString',
      no: 'Arbeid',
    },
  },
};

test('Snapshottest landingsside', () => {
  const { container } = render(
    <PureIndexPage projectData={indexStaticQueryMockData} sider={faktasiderSummaryMockData} />
  );
  expect(container).toMatchSnapshot();
});
