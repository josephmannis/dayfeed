import React from 'react';
import { Editor, Header, EditorPanels, Sidebar, Cell, EditorWrapper, NewFeedButton } from './styled';
import { NewsFeed, NewsSource } from '../../../lib/client/types';
import FeedEditor from '../feed-editor/FeedEditor';
import { SourceCountryOptions, LanguageOptions, CategoryOptions, Category, Language, SourceCountry } from '../../../lib/api/types';
import getNewsService from '../../../api/news';
import { useFeedState, useFeedDispatch } from '../../../state/feedContext';
import { v4 } from 'uuid';


const FeedManager: React.FC = props => {
    const [sources, setSources] = React.useState<NewsSource[]>([]);
    const [selectedFeed, setSelected] = React.useState<number>(0);
    const { feeds } = useFeedState();
    const dispatch = useFeedDispatch();
    
    React.useEffect(() => {
        async function getSources() {
            let feed = feeds[selectedFeed];
            let service = getNewsService();
            service.getSources(
                feed ? feed.topic as Category : undefined,
                feed ? feed.language as Language : undefined,
                feed ? feed.country as SourceCountry : undefined)
            .then(res => {
                let sources: NewsSource[] = []
                res.forEach(s => { if (s.id && s.name) sources.push({name: s.name, id: s.id}) })
                setSources(sources);
            })
        }

        getSources()
    }, [selectedFeed, feeds]);

    const updateFeed = (feed: NewsFeed) => dispatch({type: 'update', payload: {feed: feed}})

    const onFeedAdded = () => {
        let newFeed: NewsFeed = {
            id: v4(),
            name: 'New Feed',
            includedKeywords: [],
            optionalKeywords: [],
            excludedKeywords: [],
            sources: []
        }
        dispatch({type: 'add', payload: {feed: newFeed}})
    }

    const onFeedDeleted = (feed: NewsFeed) => dispatch({type: 'remove', payload: {feed: feed}})

    return (
        <Editor>
            <Header>
                <h3>Feeds</h3>
            </Header>
            <EditorPanels>
                <Sidebar>
                    {feeds.map((f,i) => <Cell key={i} selected={feeds[selectedFeed].id === f.id} onClick={() => {console.log(i); setSelected(i)}}>{f.name}</Cell>)}
                    <NewFeedButton onClick={onFeedAdded}>+ New Feed</NewFeedButton>
                </Sidebar>
                <EditorWrapper>
                    { feeds.length > 0 ? 
                        <FeedEditor 
                            onFeedChanged={updateFeed}
                            onFeedDeleted={onFeedDeleted} 
                            feed={feeds[selectedFeed]} 
                            sourceOptions={sources} 
                            countryOptions={SourceCountryOptions.slice()} 
                            topicOptions={CategoryOptions.slice()} 
                            languageOptions={LanguageOptions.slice()} 
                        /> 
                    : 'You have no Feeds! Create a new one 🌞'}
                </EditorWrapper>
            </EditorPanels>
        </Editor>
    )
}

export default FeedManager;