import React from 'react';
import { Page, Content, Header, Title } from '../../templates/page';
import FeedEditor from '../../organisms/feed-editor/FeedEditor';
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
                    <FeedEditor/>
                </FeedProvider>
            </Content>
        </Page>
    )
}

export default FeedPage;