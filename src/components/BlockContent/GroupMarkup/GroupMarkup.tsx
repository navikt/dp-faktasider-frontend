import * as React from 'react';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import Utkast from '../Utkast';
import H2GroupMarkup from './H2GroupMarkup';
import H3GroupMarkup from './H3GroupMarkup';
import H4GroupMarkup from './H4GroupMarkup';
import VisFor from '../VisFor/VisFor';
import { ConditionalWrapper } from '../../ConditionalWrapper';
import VisPaaSide from '../VisFor/VisPaaSide';

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
    <ConditionalWrapper
      condition={!!visPaaSider}
      wrapper={(children) => <VisPaaSide visPaaSider={visPaaSider} children={children} />}
    >
      <ConditionalWrapper condition={!!visFor} wrapper={(children) => <VisFor visFor={visFor} children={children} />}>
        <ConditionalWrapper
          condition={!!props.node.blockConfig?.erUtkast}
          wrapper={(children) => <Utkast children={children} />}
        >
          {getContent(props.node)}
        </ConditionalWrapper>
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
}

export default GroupMarkup;
