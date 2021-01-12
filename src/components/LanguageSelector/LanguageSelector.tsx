import React, { ChangeEvent, useState } from "react";
import styled from "styled-components/macro";
import { Select } from "nav-frontend-skjema";
import { theme } from "../../styles/theme";
import { pxToRem } from "../../styles/utils";
import { useLocale } from "../../i18n/LocaleContext";
import { useLocation } from "react-use";
import { isDevelopment, isProduction } from "../../utils/environment";
import withErrorBoundary from "../withErrorBoundary";

const Style = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${theme.colors.bakgrunn};
  border-bottom: 0.1rem solid #bbb;
  padding: 1rem;
`;

const StyledSelect = styled(Select)`
  width: ${pxToRem(230)};
  label {
    ${theme.visuallyHidden};
  }
  margin: 0;
`;

const LanguageSelector = () => {
  const lang = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (isProduction() || isDevelopment()) {
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    if (lang !== newLanguage) {
      // @ts-ignore
      navigate(location.pathname?.replace(`/${lang}/`, `/${newLanguage}/`) || "");
    }
    setOpen(!open);
  };

  return (
    <Style>
      <StyledSelect label="Velg språk" onChange={handleChange} value={lang}>
        <option value="" disabled>
          Velg språk
        </option>
        <option value="no">Norsk</option>
        <option value="en">English</option>
      </StyledSelect>
    </Style>
  );
};

export default withErrorBoundary(LanguageSelector, "LanguageSelector");
