import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ErrorInfo } from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import SlideDown from './SlideDown';
import styled from 'styled-components/macro';
import { loggError } from '../utils/logging';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { isDevelopment } from '../utils/environment';

interface Props {
  boundaryName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const StyledSlideDown = styled(SlideDown)`
  padding-top: 0.5rem;
`;

const StyledTekstomrade = styled(Tekstomrade)`
  padding-top: 0.5rem;
`;

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    loggError(error, { errorInfo, boundaryName: this.props.boundaryName });
  }

  render() {
    if (this.state.hasError) {
      const stackTrace = this.state.errorInfo?.componentStack;
      const errormsg = this.state.error?.message;
      const info = this.props.boundaryName;

      return (
        <div>
          <AlertStripeFeil>
            <Normaltekst>Beklager, det skjedde en teknisk feil.</Normaltekst>
            <EtikettLiten>
              Feilen blir automatisk rapportert og vi jobber med å løse den så raskt som mulig. Prøv igjen om litt.
            </EtikettLiten>
            {isDevelopment() && (stackTrace || errormsg) && (
              <StyledSlideDown title="Info - feilsøking">
                <StyledTekstomrade>{errormsg || ''}</StyledTekstomrade>
                <StyledTekstomrade>{info || ''}</StyledTekstomrade>
                <StyledTekstomrade>{stackTrace || ''}</StyledTekstomrade>
              </StyledSlideDown>
            )}
          </AlertStripeFeil>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
