import React from 'react';
import { Editor, Header, EditorPanels, Sidebar, Cell, EditorWrapper } from './styled';
import { NewsFeed, NewsSource } from '../../../lib/client/types';
import FeedEditorForm from '../feed-editor-form/FeedEditorForm';
import { SourceCountryOptions, LanguageOptions, CategoryOptions, Category, Language, SourceCountry } from '../../../lib/api/types';
import getNewsService from '../../../service/news';
import { useFeedState, useFeedDispatch } from '../../../state/feedContext';


const FeedEditor: React.FC = props => {
    const [sources, setSources] = React.useState<NewsSource[]>([]);
    const [selectedFeed, setSelected] = React.useState<number>(0);
    const { feeds } = useFeedState();
    const dispatch = useFeedDispatch();
    
    React.useEffect(() => {
        async function getSources() {
            let feed = feeds[selectedFeed];
            let service = getNewsService();
            // FIXME Seems unsafe
            service.getSources(feed.topic as Category, feed.language as Language, feed.country as SourceCountry)
            .then(res => {
                let sources: NewsSource[] = []
                console.log(res)
                res.forEach(s => { if (s.id && s.name) sources.push({name: s.name, id: s.id}) })
                setSources(sources);
            })
        }

        getSources()
    }, [selectedFeed]);

    const updateFeed = (feed: NewsFeed) => dispatch({type: 'update', payload: { feed: feed }})

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
                    { feeds.length > 0 ? <FeedEditorForm sourceOptions={sources} countryOptions={SourceCountryOptions.slice()} topicOptions={CategoryOptions.slice()} languageOptions={LanguageOptions.slice()} feed={feeds[selectedFeed]} onFeedChanged={updateFeed}/> : 'You have no Feeds! Create a new one 🌞'}
                </EditorWrapper>
            </EditorPanels>
        </Editor>
    )
}

export default FeedEditor;