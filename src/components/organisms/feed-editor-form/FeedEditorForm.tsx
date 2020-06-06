import React from 'react';
import { NewsFeed } from '../../../lib/client/types';
import { Form, FormHeader } from './styled';


interface IFeedEditorFormProps {
    feed: NewsFeed;
    onFeedChanged: (feed: NewsFeed) => void;
}

const FeedEditorForm: React.FC<IFeedEditorFormProps> = props => {
    const {feed, onFeedChanged} = props;
    return (
        <Form>
            <FormHeader>
                <h2>{feed.name}</h2>
            </FormHeader>
        </Form>
    )
}

export default FeedEditorForm;