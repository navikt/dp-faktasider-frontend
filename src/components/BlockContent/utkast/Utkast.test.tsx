import React from 'react';
import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';
import BlockContent from '../BlockContent';
import { render } from '../../../testUtils/customized-testing-library';
import { utkastTestData } from './Utkast.testdata';

describe('utkast', () => {
  const parsedInnhold = parseRichText(utkastTestData);

  test('dersom hele teksten i et bulletpoint er merket som utkast skal bulletpointet ikke vises', () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    const listepunkter = result.getAllByRole('listitem');
    expect(listepunkter).toHaveLength(1);
  });

  test('Dersom tekst er merket med utkast skal den ikke vises', () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    expect(result.queryByText('Frittstående utkast')).toBeNull();
  });

  test('tekst som ikke er merket med utkast skal vises', () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    result.getByText('Frittstående tekst');
  });

  test('Dersom en hel overskrift er merket med utkast skal hele bolken skjules', () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    expect(result.queryByText('Overskrift utkast')).toBeNull();
    expect(result.queryByText('Påfølgende innhold')).toBeNull();
  });
});
