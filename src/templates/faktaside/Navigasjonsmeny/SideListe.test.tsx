import React from 'react';
import { render } from '../../../testUtils/customized-testing-library';
import SideListe from './SideListe';

describe('Sideliste', () => {
  test('lister opp alle tilgjengelige sider', () => {
    const result = render(<SideListe />);
    console.log(result);
  });
});
