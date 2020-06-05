import React from 'react';
import getNewsService from '../../../service/news';
import { NewsQuery } from '../../../lib/api/types';
import { NewsArticle } from '../../../lib/client/types';


interface IHomePageProps {

}

const HomePage: React.FC<IHomePageProps> = props => {
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
                        sourceName: a.author ? a.author : 'Unknown source'
                    }
                })
            )).catch(error => setError(error))
        }

        fetchFeed()
    }, [])

    if (error) {
        return (
            <div>
                Failed to load results: {error}
            </div>
        )
    }

    return (
        <div>
            {articles.length}
        </div>
    )
}

export default HomePage;