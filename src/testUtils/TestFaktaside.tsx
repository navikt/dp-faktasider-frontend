import * as React from 'react';
import { FaktasideContext } from '../../gatsby-utils/createFaktasider';
import FaktaSide from '../templates/faktaside/FaktaSide';
import { Block } from '../utils/richTextUtils/richTextTypes';
import { faktaSideMockContext } from './faktaSideMockContext';
import { faktasiderSummaryMockData } from '../utils/faktasiderSummary/faktasiderSummaryMockData';

jest.mock('../utils/faktasiderSummary/useProjectData', () => () => ({ title: 'Testtittel' }));

type Props = {
  context?: FaktasideContext;
  innhold?: Block[];
};

function TestFaktaside(props: Props) {
  const context: FaktasideContext = {
    ...faktaSideMockContext,
    ...props.context,
    projectNavigation: faktasiderSummaryMockData,
    innhold: props.innhold || props.context?.innhold || faktaSideMockContext.innhold,
  };

  return (
    /* @ts-ignore */
    <FaktaSide pageContext={context} />
  );
}

export default TestFaktaside;
