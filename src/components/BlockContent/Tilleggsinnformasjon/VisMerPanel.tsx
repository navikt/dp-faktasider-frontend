import * as React from "react";
import { ReactNode } from "react";
import styled, { css } from "styled-components/macro";
import ChevronButton from "../../ChevronButton";
import { useTranslation } from "react-i18next";
import { Collapse } from "react-collapse";
import useUniqueId from "../../../utils/useUniqueId";

const Content = styled.div<{ isOpen: boolean }>`
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  ${(props) =>
    !props.isOpen &&
    css`
      max-height: 3rem;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3rem;
        max-height: 3rem;
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        pointer-events: none;
      }
    `};
`;

const StyledChevronButton = styled(ChevronButton)`
  margin-top: 1rem;
`;

interface Props {
  children: ReactNode;
  open: boolean;
  toggle: () => void;
}

function VisMerPanel(props: Props) {
  const { t } = useTranslation("global");
  const id = useUniqueId("vis-mer-panel-innhold");

  return (
    <>
      <Collapse isOpened={true}>
        <Content isOpen={props.open} aria-hidden={!props.open} id={id}>
          {props.children}
        </Content>
      </Collapse>
      <StyledChevronButton
        aria-controls={id}
        className="lenke"
        open={props.open}
        title={props.open ? t("visMindre") : t("visMer")}
        onClick={props.toggle}
      />
    </>
  );
}

export default VisMerPanel;
