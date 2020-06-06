import React from 'react';
import { Page, Content, Header, Title } from '../../templates/page';
import FeedEditor from '../../organisms/feed-editor/FeedEditor';


interface IFeedPageProps {

}

const FeedPage: React.FC<IFeedPageProps> = props => {
    return (
        <Page>
            <Content>
                <Header>
                    <Title>manage feeds</Title>
                </Header>
                <FeedEditor/>
            </Content>
        </Page>
    )
}

export default FeedPage;