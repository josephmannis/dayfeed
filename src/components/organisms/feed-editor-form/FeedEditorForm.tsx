import React from 'react';
import { NewsFeed } from '../../../lib/client/types';


interface IFeedEditorFormProps {
    feed: NewsFeed;
    onFeedChanged: (feed: NewsFeed) => void;
}

const FeedEditorForm: React.FC<IFeedEditorFormProps> = props => {
    return (
        <div></div>
    )
}

export default FeedEditorForm;