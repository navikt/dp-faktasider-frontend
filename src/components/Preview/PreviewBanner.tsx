import { Checkbox } from "nav-frontend-skjema";
import React from "react";
import styled from "styled-components/macro";
import { usePreviewContext } from "./previewContext";

const Style = styled.div`
  background-color: hsl(0, 100%, 38%, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.3rem;
  padding: 1rem;
  width: 25rem;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-9rem, 0rem) rotate(-45deg);
  z-index: 1000;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-top: 0.5rem;
`;

function PreviewBanner() {
  const [context, dispatch] = usePreviewContext();

  if (!context.previewMode) {
    return null;
  }

  return (
    <Style>
      <div>Preview</div>
      <div>{context.dataset}</div>
      {context.dataset === "production" && (
        <StyledCheckbox
          label="Show drafts"
          checked={context.showDrafts}
          onChange={() => dispatch({ showDrafts: !context.showDrafts })}
        />
      )}
    </Style>
  );
}

export default PreviewBanner;
