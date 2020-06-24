import React from 'react';
import { NewsArticle } from '../../../lib/client/types';
import Article from '../article/Article';
import TextIcon from '../../molecules/text-icon/TextIcon';
import { CopyProvider } from '../../../assets/strings/strings';


interface IDisconnectedNewsFeedProps {
    articles: NewsArticle[];
}

const DisconnectedNewsFeed: React.FC<IDisconnectedNewsFeedProps> = props => {
    const { articles } = props;
    return (
        <div className='flex flex-column w100'>
            { articles.length > 0 ? articles.map((a,i) => <Article article={a} key={i}/>) : <TextIcon type='sad-sun' text={CopyProvider.NEWS_FEED_NO_ARTICLES}/>}
        </div>
    )
}

export default DisconnectedNewsFeed;