import * as React from 'react';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import CommonGroupMarkup from './CommonGroupMarkup';

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledElement = styled(Element).attrs({ as: 'h4' })`
  text-align: center;
  margin: 3rem 0 0.7rem;
`;

function H4GroupMarkup(props: Group) {
  return <CommonGroupMarkup header={StyledElement} region={StyledSection} group={props} anchorMarginTop="4rem" />;
}

export default H4GroupMarkup;
