import { SanityBlock } from '../utils/richTextUtils/richTextTypes';
import { guid } from 'nav-frontend-js-utils';

export function createSanityBlock(text: string, style: string): SanityBlock {
  const key = guid().substr(0, 8);

  return {
    _type: 'block',
    _key: key,
    style: style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: key + '0',
        text: text,
        marks: [],
      },
    ],
  };
}
