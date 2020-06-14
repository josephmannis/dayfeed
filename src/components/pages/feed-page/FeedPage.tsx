import React from 'react';
import { Page, Content, Header, Title } from '../../templates/page';
import FeedManager from '../../organisms/feed-manager/FeedManager';
import { Link } from 'react-router-dom';


interface IFeedPageProps {

}

const FeedPage: React.FC<IFeedPageProps> = props => {
    return (
        <Page>
            <Content>
                <Header>
                    <Link to={'/'}>Back to home</Link> <Title>manage feeds</Title>
                </Header>
                <FeedManager/>
            </Content>
        </Page>
    )
}

export default FeedPage;