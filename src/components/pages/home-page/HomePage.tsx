import React from 'react';
import NewsFeed from '../../../connector/organisms/news-feed/NewsFeed';
import { Page, Content, Header, Title } from './styled';
import { Button } from '../../atoms/button/Button';


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