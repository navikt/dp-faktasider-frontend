export const dataWithNestedTranslations = {
  first: {
    _type: 'localeRichText',
    no: [
      {
        second: {
          _type: 'localeRichText',
          no: [
            {
              _type: 'block',
              children: [
                {
                  text: 'Dette er en test',
                },
              ],
              style: 'h2',
            },
          ],
        },
      },
    ],
  },
};
