import React from 'react';
import { Page, Content, Header, Title, NavGroup } from '../../templates/page';
import FeedManager from '../../organisms/feed-manager/FeedManager';
import { Link } from 'react-router-dom';
import { BackArrowIcon } from '../../atoms/icon/BackArrow';


interface IFeedPageProps {

}

const FeedPage: React.FC<IFeedPageProps> = props => {
    return (
        <Page>
            <Content>
                <Header>
                    <NavGroup>
                        <Link to={'/'}><BackArrowIcon/></Link> <Title>manage feeds</Title>
                    </NavGroup>
                </Header>
                <FeedManager/>
            </Content>
        </Page>
    )
}

export default FeedPage;