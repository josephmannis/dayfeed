import React from 'react';
import { Editor, Header, EditorPanels, Sidebar, Cell, EditorWrapper } from './styled';
import { NewsFeed } from '../../../lib/client/types';
import FeedEditorForm from '../feed-editor-form/FeedEditorForm';



const FeedEditor: React.FC = props => {
    const fake: NewsFeed = {
        id: 'fakefeed1',
        name: 'Top Headlines',
        country: 'us',
        excludedKeywords: ['sad'],
        includedKeywords: ['happy'],
        optionalKeywords: ['indifferent'],
        language: 'en',
        sources: ['joe annis']
    }

    const fake2: NewsFeed = {
        id: 'fakefeed2',
        name: 'Cybersecurity',
        country: 'us',
        excludedKeywords: ['insecure'],
        includedKeywords: ['secure'],
        optionalKeywords: ['super'],
        language: 'en',
        sources: ['wired']
    }

    const feeds = [fake, fake2]
    const [selectedFeed, setSelected] = React.useState<NewsFeed | undefined>(feeds.length > 0 ? feeds[0] : undefined);


    return (
        <Editor>
            <Header>
                <h3>Feed Name</h3>
            </Header>
            <EditorPanels>
                <Sidebar>
                    {feeds.map((f,i) => <Cell key={i} selected={selectedFeed?.id === f.id} onClick={() => setSelected(f)}>{f.name}</Cell>)}
                </Sidebar>
                <EditorWrapper>
                    { selectedFeed ? <FeedEditorForm feed={selectedFeed} onFeedChanged={(f) => console.log('updated')}/> : 'You have no Feeds! Create a new one 🌞'}
                </EditorWrapper>
            </EditorPanels>
        </Editor>
    )
}

export default FeedEditor;