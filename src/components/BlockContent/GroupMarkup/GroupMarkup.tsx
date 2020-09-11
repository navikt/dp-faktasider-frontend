import * as React from 'react';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import Utkast from '../utkast/Utkast';
import H2GroupMarkup from './H2GroupMarkup';
import H3GroupMarkup from './H3GroupMarkup';
import H4GroupMarkup from './H4GroupMarkup';
import VisFor from '../VisFor/VisFor';
import VisPaaSide from '../VisFor/VisPaaSide';
import withErrorBoundary from '../../withErrorBoundary';

interface Props {
  node: Group;
}

function getContent(group: Group) {
  switch (group.style) {
    case 'h2':
      return <H2GroupMarkup {...group} />;
    case 'h3':
      return <H3GroupMarkup {...group} />;
    case 'h4':
      return <H4GroupMarkup {...group} />;
    default:
      throw Error(`Ukjent gruppe: ${group.style}`);
  }
}

function GroupMarkup(props: Props) {
  const visPaaSider = props.node.blockConfig?.visPaaSider;
  const visFor = props.node.blockConfig?.visFor;

  return (
    <VisPaaSide visPaaSider={visPaaSider}>
      <Utkast erUtkast={!!props.node.blockConfig?.erUtkast}>
        <VisFor visForConfig={visFor}>{getContent(props.node)}</VisFor>
      </Utkast>
    </VisPaaSide>
  );
}

export default withErrorBoundary(GroupMarkup, 'GroupMarkup');
