import React from 'react';
import { EditorSectionHeader, SectionBody, SectionInputs, EditorSectionWrapper } from './styled';


interface IEditorSectionProps {
    title: string;
    body: string;
}

const EditorSection: React.FC<IEditorSectionProps> = props => {
    const {title, body} = props;
    return (  
        <EditorSectionWrapper>
            <EditorSectionHeader>{title}</EditorSectionHeader>
            <SectionBody>{body}</SectionBody>
            <SectionInputs>
                {props.children}
            </SectionInputs>
        </EditorSectionWrapper>
    )
}

export default EditorSection;