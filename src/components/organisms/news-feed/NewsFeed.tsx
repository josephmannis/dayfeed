import React from 'react';
import { NewsArticle } from '../../../lib/client/types';
import Article from '../article/Article';


interface IDisconnectedNewsFeedProps {
    articles: NewsArticle[];
}

const DisconnectedNewsFeed: React.FC<IDisconnectedNewsFeedProps> = props => {
    return (
        <div className='flex flex-column w100'>
            {props.articles.map((a,i) => <Article article={a} key={i}/>)}
        </div>
    )
}

export default DisconnectedNewsFeed;