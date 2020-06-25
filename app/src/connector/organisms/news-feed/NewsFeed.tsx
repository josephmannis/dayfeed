import React from 'react';
import getNewsService from '../../../api/news';
import { Category, Language, HeadlineQuery, HeadlineCountry } from '../../../lib/api/types';
import { NewsArticle } from '../../../lib/client/types';
import DisconnectedNewsFeed from '../../../components/organisms/news-feed/NewsFeed';
import { useFeedState } from '../../../state/feedContext';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { SelectTheme, FeedSelectStyle } from '../../../components/molecules/select/Select';
import TextIcon from '../../../components/molecules/text-icon/TextIcon';
import { CopyProvider } from '../../../assets/strings/strings';
import { FeedSelect, FeedWrapper } from './styled';


const NewsFeed: React.FC = () => {
    const [articles, setArticles] = React.useState<NewsArticle[]>([])
    const [error, setError] = React.useState<string | undefined>(undefined);
    const { feeds } = useFeedState();
    const [selectedFeed, setSelected] = React.useState(0);
    const selectStyleAttrs = {
        components: { 
            DropdownIndicator:() => null, 
            IndicatorSeparator:() => null,
            ...makeAnimated(),
        },
        styles: {
            input: (provided: any, state: any) => ({
                ...provided,
                fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
            })
        }
    }

    React.useEffect(() => {
        async function fetchFeed() { 
            let newsSerivce = getNewsService();
            let feed = feeds[selectedFeed];

            let query: HeadlineQuery = {
                requiredKeywords: feed.includedKeywords,
                optionalKeywords: feed.optionalKeywords,
                excludedKeywords: feed.excludedKeywords,
                category: feed.topic ? feed.topic as Category : undefined,
                language: feed.language ? feed.language as Language : undefined,
                country: feed.country ? feed.country as HeadlineCountry : undefined,
                sources: feed.sources.map(s => s.id)
            }
            return newsSerivce.searchTopHeadlines(query, 30, 1)
        }

        fetchFeed()
            .then(res => setArticles(
                res.articles.map(a => {
                    return {
                        title: a.title ? a.title : 'Failed to load title',
                        id: a.url ? a.url : '',
                        description: a.description ? a.description : 'No description provided.',
                        imageUrl: a.urlToImage && a.urlToImage !== 'null' ? a.urlToImage : 'https://k12cit.com/assets/images/missing.png',
                        articleUrl: a.url ? a.url : '',
                        sourceName: a.source?.name ? a.source?.name : 'Unknown source'
                    }
                })
            )).catch(error => setError('Failed to fetch feed.'))
    }, [selectedFeed, feeds])

    return (
        <>
            <FeedSelect>
                {feeds.length !== 0 &&
                    <Select {...selectStyleAttrs}
                        theme={theme => SelectTheme(theme)}
                        styles={FeedSelectStyle}
                        value={{label: feeds[selectedFeed].name, value: selectedFeed}}
                        options={feeds.map((f, i) => {return {label: f.name, value: i}})}
                        onChange={(s) => setSelected((s as {label: string, value: number}).value)}
                    />
                }
            </FeedSelect>
            <FeedWrapper error={error !== undefined || articles.length === 0}>
                { error ? 
                    <TextIcon 
                        type={feeds.length === 0 ? 'happy-sun' : 'sad-sun'} 
                        text={feeds.length === 0 ? CopyProvider.NEWS_FEED_NO_FEEDS : CopyProvider.NEWS_FEED_ERROR}
                    /> : 
                    <DisconnectedNewsFeed articles={articles}/> 
                }
            </FeedWrapper>
        </>
    )
}

export default NewsFeed;