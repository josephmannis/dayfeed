import React from 'react';
import NewsFeed from '../../../connector/organisms/news-feed/NewsFeed';
import { Button } from '../../atoms/button/Button';
import { Page, Header, Content, Title, NavGroup } from '../../templates/page';
import { Link } from 'react-router-dom';
import { SunIcon } from '../../atoms/icon/Sun';


const HomePage: React.FC = () => {
    return (
        <Page>
            <Content>
                <Header>
                    <NavGroup>
                        <a href='/'>
                            <SunIcon/>
                        </a>
                        <Title>dayfeed</Title>
                    </NavGroup>
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