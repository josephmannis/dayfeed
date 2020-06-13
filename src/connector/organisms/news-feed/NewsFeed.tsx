import React from 'react';
import getNewsService from '../../../api/news';
import { NewsQuery } from '../../../lib/api/types';
import { NewsArticle } from '../../../lib/client/types';
import DisconnectedNewsFeed from '../../../components/organisms/news-feed/NewsFeed';


const NewsFeed: React.FC = () => {
    const [articles, setArticles] = React.useState<NewsArticle[]>([])
    const [error, setError] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        async function fetchFeed() { 
            let newsSerivce = getNewsService();
            let query: NewsQuery = {
                requiredKeywords: [],
                optionalKeywords: [],
                excludedKeywords: []
            }
            newsSerivce.searchTopHeadlines(query, 30, 1)
            .then(res => setArticles(
                res.articles.map(a => {
                    console.log(a)
                    return {
                        title: a.title ? a.title : 'Failed to load title',
                        id: a.url ? a.url : '',
                        description: a.description ? a.description : 'Failed to load description.',
                        imageUrl: a.urlToImage ? a.urlToImage : 'https://via.placeholder.com/166',
                        articleUrl: a.url ? a.url : '',
                        sourceName: a.source?.name ? a.source?.name : 'Unknown source'
                    }
                })
            )).catch(error => {console.log(error); setError('Failed to fetch feed.')})
        }

        fetchFeed()
    }, [])

    if (error) {
        return (
            <>
                {error}
            </>
        )
    }

    return (<DisconnectedNewsFeed articles={articles}/>)
}

export default NewsFeed;