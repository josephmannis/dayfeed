import React from 'react';
import { NewsArticle } from '../../../lib/client/types';
import Article from '../article/Article';


interface IDisconnectedNewsFeedProps {
    articles: NewsArticle[];
}

const DisconnectedNewsFeed: React.FC<IDisconnectedNewsFeedProps> = props => {
    const { articles } = props;
    return (
        <div className='flex flex-column w100'>
            { articles.length > 0 ? articles.map((a,i) => <Article article={a} key={i}/>) : 'No results.'}
        </div>
    )
}

export default DisconnectedNewsFeed;