import styled from "styled-components";
import { colors } from "../../../css/var/color";

export const EditorSectionWrapper = styled.div.attrs({className: 'pv4 bb b--gray'})``;

export const EditorSectionHeader = styled.h4`
  font-family: 'Libre Baskerville', serif;
  margin: 0;
`

export const SectionBody = styled.p`
    color: ${colors.textLight};
    white-space: pre-wrap;
`

export const SectionInputs = styled.div.attrs({className: 'flex flex-nowrap'})`
  & > *:last-child {
    margin-right: 0;
  }

  & > * {
    margin-right: 1em;
  }
`