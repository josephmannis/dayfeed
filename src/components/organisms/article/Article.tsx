import React from 'react';
import { NewsArticle } from '../../../lib/client/types';
import { Content, Wrapper, Title, Source, ArticleSnippet, ArticleImage } from './styled';
import { url } from 'inspector';


interface IArticleProps {
    article: NewsArticle;
}

const Article: React.FC<IArticleProps> = props => {
    const { title, id, description, imageUrl, articleUrl, sourceName } = props.article;
    return (
        <Wrapper>
            <ArticleImage src={imageUrl}/>
            <Content>
                <Title><a href={articleUrl} target='_blank' rel="noopener noreferrer">{title}</a></Title>
                <ArticleSnippet>
                    <Source>{sourceName} — </Source> 
                    {description}
                </ArticleSnippet>
            </Content>
        </Wrapper>
    )
}

export default Article;