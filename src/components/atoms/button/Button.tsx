import styled, { css } from "styled-components";
import { colors } from "../../../css/var/color";

const buttonStyle = css`
    padding: .75em 2.5em;
    text-transform: upcase;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: bolder;
    width: fit-content;
    height: fit-content;
    transition: all .2s ease-in-out;    
`

export const Button = styled.button`
    ${buttonStyle};
    background-color: ${colors.primary};
    color: white;

    &:hover {
        box-shadow: 0 0 30px rgba(253, 77, 77, 0.15);
    }
`

export const TextButton = styled.button`
    ${buttonStyle};
    color: ${colors.primary};
    background-color: transparent;
    font-weight: normal;
    text-align: center;
    padding: 0;


    &:hover {
       font-weight: bolder;
    }
`