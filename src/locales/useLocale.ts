import { useFaktasideProps } from '../templates/faktaside/FaktasideContext';

export const useLocale = () => {
  return useFaktasideProps().pageContext.lang;
};
