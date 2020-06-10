import React from 'react';
import { NewsFeed } from '../../../lib/client/types';
import { Form, FormHeader, FeedTitle } from './styled';
import { TextButton } from '../../atoms/button/Button';


interface IFeedEditorFormProps {
    feed: NewsFeed;
    onFeedChanged: (feed: NewsFeed) => void;
}

const FeedEditorForm: React.FC<IFeedEditorFormProps> = props => {
    const {feed, onFeedChanged} = props;
    return (
        <Form>
            <FormHeader>
                <FeedTitle>{feed.name}</FeedTitle>
                <TextButton onClick={() => window.alert('delete feed')}>{`🗑  Delete Feed`}</TextButton>
            </FormHeader>
        </Form>
    )
}

export default FeedEditorForm;