import styled from "styled-components";
import { TextButton } from "../../atoms/button/Button";

export const NewFeedButton = styled(TextButton)`
    white-space: nowrap;
`
export const Editor = styled.div.attrs({className: 'flex flex-column'})``
export const Header = styled.div.attrs({className: 'w100 pv2 ph3 bb b--dark-gray flex flex-row justify-between items-center'})``
export const EditorPanels = styled.div.attrs({className: 'flex flex-wrap-m flex-nowrap'})``
export const Sidebar = styled.div.attrs({className: 'flex flex-column br b--dark-gray dn-m'})`
    min-width: 30%;
    ${NewFeedButton} {
        padding: 2em 0 0 1em;
    }
`
export const EditorWrapper = styled.div.attrs({className: 'pv4 pl0-m pl4'})``

interface ICellProps {
    selected?: boolean;
}
export const Cell = styled.div.attrs({className: 'pv4 pr4 pl3 w-100 bb b--dark-gray hover-bg-light-gray bg-animate'})<ICellProps>`
    font-weight: ${props => props.selected ? 'bolder' : 'normal'};
    word-break: break-all;
    & p {
       margin: 0; 
    }
`

export const FeedSelect = styled.div.attrs({className: 'w-100 pt4 di-m dn'})``