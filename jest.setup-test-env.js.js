import 'jest-styled-components';

const JSutils = require('nav-frontend-js-utils');
JSutils.guid = jest.fn(() => 'Helt tilfeldig ID');
