import styled from "styled-components";
import { colors } from "../../../css/var/color";

export const Editor = styled.div.attrs({className: 'flex flex-column'})``
export const Header = styled.div.attrs({className: 'flex justify-between mb4'})``
export const FeedTitle = styled.h3.attrs({className: 'mt0'})``
export const EditorInput = styled.div.attrs({className: 'flex w-100 flex-column'})``
export const NameInput = styled.input.attrs({className: 'bg-transparent bn'})`
  font-family: 'Libre Baskerville', serif;
  font-weight: bolder;
  font-size: 1.25em;
  transition: all .1s ease-in-out;
  &:focus, &:hover {
      background-color: ${colors.input};
      padding: .35em;
      border-radius: 6px;
  }
`