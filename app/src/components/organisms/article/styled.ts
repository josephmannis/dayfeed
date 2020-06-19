import styled from "styled-components";
import { colors } from "../../../css/var/color";


export const Wrapper = styled.article.attrs({className: 'flex justify-start pv4 bt b--light-gray'})``

export const Content = styled.div.attrs({className: 'flex flex-column'})``

export const Title = styled.h3.attrs({className: 'mv0'})`
    font-size: 1.5em;
    &:hover {
        & a {
            color: ${colors.primary};
        }
    }

    & a {
        transition: all .2s ease-in-out;
        text-decoration: none;
        color: black;
    }
`

export const ArticleSnippet = styled.p`
    color: ${colors.textLight};
    line-height: 1.55;
`

export const Source = styled.span`
    font-weight: bold;
    color: ${colors.primary};
`

export const ArticleImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-right: 2em;
`