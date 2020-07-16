import React from 'react';
import { render } from '../../testUtils/customized-testing-library';
import { createFaktasideContext } from '../../../gatsby-utils/createFaktasider';
import { rawFaktasideDataMock } from '../../../__mocks__/rawFaktasideDataMock';
import TestFaktaside from '../../testUtils/TestFaktaside';
import { faktasiderSummaryMockData } from '../../utils/faktasiderSummary/faktasiderSummaryMockData';

beforeAll(() => {
  const JSutils = require('nav-frontend-js-utils');
  JSutils.guid = jest.fn(() => 'Helt tilfeldig ID');
});

/* Dette er en veldig grov test som fanger opp det meste av endringer på faktaside */
test('Snapshottest Faktaside', () => {
  const context = createFaktasideContext(rawFaktasideDataMock, 'no', faktasiderSummaryMockData);
  const { container } = render(<TestFaktaside context={context} />);

  expect(container).toMatchSnapshot();
});
