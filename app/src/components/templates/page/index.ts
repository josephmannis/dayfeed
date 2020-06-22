import styled from "styled-components";
import devices from "../../../css/var/breakpoints";

export const Page = styled.div.attrs({className: 'flex justify-center'})``

export const Content = styled.div.attrs({className: 'flex flex-column'})`
    width: 40%;
    
    @media ${devices.laptopL} {
        width: 60%;
    }

    @media ${devices.tablet} {
        width: 80%;
    }
`

export const Title = styled.h1.attrs({className: 'ml3'})`
    font-size: 2.45em;
`

export const Header = styled.div.attrs({className: 'flex justify-between mb5 mt4 items-center'})``

export const NavGroup = styled.div.attrs({className: 'flex items-center'})``