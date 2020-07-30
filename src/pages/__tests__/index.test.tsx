import React from 'react';
import { PureIndexPage } from '../../templates';
import { mockFaktasiderMenuData } from '../../hooks/graphQl/mockFaktasiderMenuData';
import { render } from '../../testUtils/customized-testing-library';

test('Snapshottest landingsside', () => {
  const { container } = render(<PureIndexPage title={'Arbeid'} sider={mockFaktasiderMenuData} path={'test'} />);
  expect(container).toMatchSnapshot();
});
