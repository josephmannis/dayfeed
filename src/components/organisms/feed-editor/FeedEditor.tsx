import React from 'react';
import { Editor, Header, EditorPanels, Sidebar, Cell } from './styled';


interface IFeedEditorProps {

}

const FeedEditor: React.FC<IFeedEditorProps> = props => {
    return (
        <Editor>
            <Header>
                <h3>Feed Name</h3>
            </Header>
            <EditorPanels>
                <Sidebar>
                    <Cell onClick={() => window.alert('hi')} selected>Top Headlines</Cell>
                    <Cell selected={false}>Cybersecurity</Cell>
                </Sidebar>
                <div>
                    HI
                </div>
            </EditorPanels>
        </Editor>
    )
}

export default FeedEditor;