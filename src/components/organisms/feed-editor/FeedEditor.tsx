import React from 'react';
import { Editor, Header, EditorPanels, Sidebar, Cell } from './styled';
import { NewsFeed } from '../../../lib/client/types';



const FeedEditor: React.FC = props => {
    const [selectedFeedId, setSelected] = React.useState<string |undefined>(feeds.length > 0 ? feeds[0].id : undefined);

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

    return (
        <Editor>
            <Header>
                <h3>Feed Name</h3>
            </Header>
            <EditorPanels>
                <Sidebar>
                    {feeds.map((f,i) => <Cell selected={selectedFeedId === f.id} onClick={() => setSelected(f.id)}>{f.name}</Cell>)}
                </Sidebar>
                <div>
                    HI
                </div>
            </EditorPanels>
        </Editor>
    )
}

export default FeedEditor;