import styled from "styled-components";
import arrowIcon from '../../../assets/icons/arrow_ic.svg';
import sunIcon from '../../../assets/icons/sun_ic.svg';
import happySunIcon from '../../../assets/icons/happysun_ic.svg';
import failedIcon from '../../../assets/icons/failed_ic.svg';

export type IconType = 'back-arrow' | 'sun' | 'happy-sun' | 'sad-sun';

const mapIconToType = (type: IconType) => {
    switch(type) {
        case "back-arrow":
            return arrowIcon
        case "sun":
            return sunIcon
        case "happy-sun":
            return happySunIcon
        case "sad-sun":
            return failedIcon
        default:
            throw new Error('Invalid icon type.')
    }
}

interface IconProps {
    type: IconType;
}

const Icon = styled.img.attrs((props: IconProps) => ({src: mapIconToType(props.type)}))<IconProps>`
    height: 100%;
`
export default Icon;