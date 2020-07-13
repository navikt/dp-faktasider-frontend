import React from 'react';
import { render } from '../../utils/test-utils';
import FaktaSide from './FaktaSide';
import { createFaktasideContext } from '../../../gatsby-utils/createFaktasider';
import { rawFaktasideDataMock } from '../../../__mocks__/rawFaktasideDataMock';

jest.mock('../../utils/faktasiderSummary/useFaktasiderSumary', () => () => {
  return require('../../utils/faktasiderSummary/faktasiderSummaryMockData').faktasiderSummaryMockData;
});

beforeAll(() => {
  const JSutils = require('nav-frontend-js-utils');
  JSutils.guid = jest.fn(() => 'Helt tilfeldig ID');
});

/* Dette er en veldig grov test som fanger opp det meste av endringer på faktaside */
test('Snapshottest Faktaside', () => {
  const context = createFaktasideContext(rawFaktasideDataMock, 'no');
  const { container } = render(
    // @ts-ignore
    <FaktaSide pageContext={context} />
  );

  expect(container).toMatchSnapshot();
});
