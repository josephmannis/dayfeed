import styled from "styled-components";

export const Feeds = styled.div.attrs({className: 'flex flex-column w100 justify-center'})`
    article:first-child {
        border-top-width: 0;
    }
`