import styled from "styled-components";

export const Editor = styled.div.attrs({className: 'flex flex-column'})``
export const Header = styled.div.attrs({className: 'w100 pv2 pl3 bb b--light-gray'})``
export const EditorPanels = styled.div.attrs({className: 'flex'})``
export const Sidebar = styled.div.attrs({className: 'flex flex-column w30 br b--light-gray'})``

interface ICellProps {
    selected: boolean;
}
export const Cell = styled.div.attrs({className: 'pv4  pr6 pl3 bb b--light-gray hover-bg-light-gray bg-animate'})<ICellProps>`
    font-weight: ${props => props.selected ? 'bolder' : 'normal'};
`