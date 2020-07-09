import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { theme } from '../../styles/theme';
import withErrorBoundary from '../../components/withErrorBoundary';

interface Props {
  heading: string;
  ingress: string;
  small?: boolean;
}

const Background = styled.div`
  background-color: ${theme.colors.navBlaLighten80};
  border-bottom: 0.3rem solid ${theme.colors.navBlaLighten60};
  border-top: 0.3rem solid ${theme.colors.navBlaLighten60};
  display: flex;
  justify-content: center;
  text-align: center;
`;

const StyledSidetittel = styled(Sidetittel)`
  font-size: 1.7rem;
`;

const MaxWidth = styled.div`
  padding: 2rem;
  max-width: 50rem;
`;

const Header = (props: Props) => {
  return (
    <Background>
      <MaxWidth>
        <StyledSidetittel>{props.heading}</StyledSidetittel>
        <Normaltekst>{props.ingress}</Normaltekst>
      </MaxWidth>
    </Background>
  );
};

export default withErrorBoundary(Header);
