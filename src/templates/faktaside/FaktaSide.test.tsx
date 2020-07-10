import React from 'react';
import { render } from '../../utils/test-utils';
import FaktaSide from './FaktaSide';
import { createFaktasideContext } from '../../../gatsby-utils/createFaktasider';
import { rawFaktasideDataMock } from '../../../__mocks__/rawFaktasideDataMock';
import { faktasiderSummaryMockData } from '../../utils/faktasiderSummary/faktasiderSummaryMockData';
import useFaktasiderSumary from '../../utils/faktasiderSummary/useFaktasiderSumary';

jest.mock('../../utils/faktasiderSummary/useFaktasiderSumary');
// @ts-ignore
useFaktasiderSumary.mockReturnValue(faktasiderSummaryMockData);

/* Dette er en veldig grov test som fanger opp det meste av endringer på faktaside */
test('Snapshottest Faktaside', () => {
  const context = createFaktasideContext(rawFaktasideDataMock, 'no');
  const { container } = render(
    // @ts-ignore
    <FaktaSide pageContext={context} />
  );

  expect(container).toMatchSnapshot();
});
