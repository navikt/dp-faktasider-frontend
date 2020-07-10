import React from 'react';
import { PureIndexPage } from '../index';
import { faktasiderSummaryMockData } from '../../utils/faktasiderSummary/faktasiderSummaryMockData';
import { render } from '../../utils/test-utils';

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
