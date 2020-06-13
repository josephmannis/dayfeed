import styled from "styled-components";
import { TextButton } from "../../atoms/button/Button";

export const Editor = styled.div.attrs({className: 'flex flex-column'})``
export const Header = styled.div.attrs({className: 'w100 pv2 pl3 bb b--dark-gray'})``
export const EditorPanels = styled.div.attrs({className: 'flex'})``
export const Sidebar = styled.div.attrs({className: 'flex flex-column w30 br b--dark-gray'})``
export const EditorWrapper = styled.div.attrs({className: 'pv4 pl4 w-100'})``

interface ICellProps {
    selected: boolean;
}
export const Cell = styled.div.attrs({className: 'pv4 pr6 pl3 bb b--dark-gray hover-bg-light-gray bg-animate'})<ICellProps>`
    font-weight: ${props => props.selected ? 'bolder' : 'normal'};
`
export const NewFeedButton = styled(TextButton)`
    padding: 2em 3em 2em 1em;
    white-space: nowrap;
`