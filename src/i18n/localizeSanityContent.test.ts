import localizeSanityContent from './localizeSanityContent';
import { dataWithNestedTranslations } from './testData/dataWithNestedTranslations';

test('localizeSanityContent should localize nested translations', () => {
  const localizedContent = localizeSanityContent(dataWithNestedTranslations, 'no');
  expect(dataWithNestedTranslations.first['no'][0].second['no']).toEqual(localizedContent.first[0].second);
});
