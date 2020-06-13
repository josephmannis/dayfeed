import React from 'react';
import NewsFeed from '../../../connector/organisms/news-feed/NewsFeed';
import { Button } from '../../atoms/button/Button';
import { Page, Header, Content, Title } from '../../templates/page';
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {
    return (
        <Page>
            <Content>
                <Header>
                    <Title>☼ dayfeed</Title>
                    <Link to='/manage'>
                        <Button>✎ Manage Feeds</Button>
                    </Link>
                </Header>
                <NewsFeed/>
            </Content>
        </Page>
    )
}

export default HomePage;