import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ErrorInfo } from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import SlideDown from './SlideDown';
import styled from 'styled-components/macro';
import { loggError } from '../utils/logging';

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
    loggError(`Feil i ${this.props.boundaryName}`, { errorInfo, msg: error.message, name: error.name });
  }

  render() {
    if (this.state.hasError) {
      const stackTrace = this.state.errorInfo?.componentStack;
      const errormsg = this.state.error?.message;
      const info = this.props.boundaryName;

      return (
        <div>
          <AlertStripeFeil>
            Beklager, det skjedde en teknisk feil.
            {(stackTrace || errormsg) && (
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
