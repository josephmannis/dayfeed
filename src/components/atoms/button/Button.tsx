import styled from "styled-components";
import { colors } from "../../../css/var/color";

export const Button = styled.button`
    background-color: ${colors.primary};
    color: white;
    padding: .75em 2.5em;
    text-transform: upcase;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: bolder;
    width: fit-content;
    height: fit-content;
    transition: all .2s ease-in-out;

    &:hover {
        box-shadow: 0 0 30px rgba(253, 77, 77, 0.15);
    }
`