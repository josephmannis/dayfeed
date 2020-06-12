import React from 'react';
import { Page, Content, Header, Title } from '../../templates/page';
import FeedManager from '../../organisms/feed-manager/FeedManager';
import { FeedProvider } from '../../../state/feedContext';


interface IFeedPageProps {

}

const FeedPage: React.FC<IFeedPageProps> = props => {
    return (
        <Page>
            <Content>
                <Header>
                    <Title>manage feeds</Title>
                </Header>
                <FeedProvider>
                    <FeedManager/>
                </FeedProvider>
            </Content>
        </Page>
    )
}

export default FeedPage;