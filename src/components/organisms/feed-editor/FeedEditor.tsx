import React from 'react';
import { Editor, Header, EditorPanels, Sidebar, Cell, EditorWrapper } from './styled';
import { NewsFeed } from '../../../lib/client/types';
import FeedEditorForm from '../feed-editor-form/FeedEditorForm';
import { SourceCountryOptions, LanguageOptions } from '../../../lib/api/types';
import _ from 'lodash';



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

    const [feeds, setFeeds] = React.useState<NewsFeed[]>([fake, fake2])
    const [selectedFeed, setSelected] = React.useState<number>(0);

    const updateFeed = (feed: NewsFeed) => {
        console.log(feed.id)
        const newFeeds = feeds.map(f => {
            if (f.id === feed.id) {
                return feed;
            }
            return f;
        })
        setFeeds(newFeeds);
    }

    return (
        <Editor>
            <Header>
                <h3>Feed Name</h3>
            </Header>
            <EditorPanels>
                <Sidebar>
                    {feeds.map((f,i) => <Cell key={i} selected={feeds[selectedFeed].id === f.id} onClick={() => {console.log(i); setSelected(i)}}>{f.name}</Cell>)}
                </Sidebar>
                <EditorWrapper>
                    { feeds.length > 0 ? <FeedEditorForm sourceOptions={[]} countryOptions={SourceCountryOptions.slice()} languageOptions={LanguageOptions.slice()} feed={feeds[selectedFeed]} onFeedChanged={updateFeed}/> : 'You have no Feeds! Create a new one 🌞'}
                </EditorWrapper>
            </EditorPanels>
        </Editor>
    )
}

export default FeedEditor;