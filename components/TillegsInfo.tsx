import * as React from 'react';
import BlockContentPreview from './BlockContentPreview';
import styled from 'styled-components';

export const TillegsInfoIkon = () => <>‍📎️</>;

const Tittel = styled.p`
  font-weight: bold;
`;

interface Props {
  title: string;
  blocks: any;
}

const TillegsInfo = (props: Props) => (
  <BlockContentPreview
    label={
      <>
        <TillegsInfoIkon /> Tilleggsinfo
      </>
    }
    color="mistyrose"
    before={<Tittel>{props.title}</Tittel>}
    blocks={props.blocks}
  />
);

export default TillegsInfo;
