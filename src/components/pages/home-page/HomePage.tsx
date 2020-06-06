import React from 'react';
import NewsFeed from '../../../connector/organisms/news-feed/NewsFeed';
import { Button } from '../../atoms/button/Button';
import { Page, Header, Content, Title } from '../../templates/page';


const HomePage: React.FC = () => {
    return (
        <Page>
            <Content>
                <Header>
                    <Title>☼ dayfeed</Title>
                    <Button onClick={() => window.alert('make feeeeeeeeeed')}>+ New Feed</Button>
                </Header>
                <NewsFeed/>
            </Content>
        </Page>
    )
}

export default HomePage;