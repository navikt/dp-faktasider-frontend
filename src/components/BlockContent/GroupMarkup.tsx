import * as React from 'react';
import { Group } from '../../utils/richTextUtils/richTextTypes';
import Utkast from './Utkast';
import H2GroupMarkup from './H2GroupMarkup';
import H3GroupMarkup from './H3GroupMarkup';
import H4GroupMarkup from './H4GroupMarkup';

interface Props {
  node: Group;
}

function getContent(group: Group) {
  switch (group.groupType) {
    case 'h2':
      return <H2GroupMarkup {...group} />;
    case 'h3':
      return <H3GroupMarkup {...group} />;
    case 'h4':
      return <H4GroupMarkup {...group} />;
    default:
      throw Error(`Ukjent gruppe: ${group.groupType}`);
  }
}

function GroupMarkup(props: Props) {
  if (props.node?.erUtkast) {
    return <Utkast>{getContent(props.node)}</Utkast>;
  }

  return getContent(props.node);
}

export default GroupMarkup;
