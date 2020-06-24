import React from 'react';
import Icon, { IconType } from '../../atoms/icon/Icon';
import { Caption, IconPair } from './styled';


interface ITextIconProps {
    type: IconType;
    text: string;
}

const TextIcon: React.FC<ITextIconProps> = props => {
    const {type, text} = props;
    return (
        <IconPair>
            <Icon type={type}/>
            <Caption>
                {text}
            </Caption>
        </IconPair>
    )
}

export default TextIcon;