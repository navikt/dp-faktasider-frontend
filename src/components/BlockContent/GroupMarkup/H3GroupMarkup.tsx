import * as React from 'react';
import styled from 'styled-components';
import { Ingress } from 'nav-frontend-typografi';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import CommonGroupMarkup from './CommonGroupMarkup';

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledIngress = styled(Ingress).attrs({ as: 'h3' })`
  margin-bottom: 1rem;
  font-weight: 600 !important;
`;

function H3GroupMarkup(props: Group) {
  return <CommonGroupMarkup header={StyledIngress} region={StyledSection} group={props} anchorMarginTop="6rem" />;
}

export default H3GroupMarkup;
