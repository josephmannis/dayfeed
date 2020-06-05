import React from 'react';
import { NewsArticle } from '../../../lib/client/types';
import { Content, Wrapper, Title, Source, ArticleSnippet, ArticleImage } from './styled';


interface IArticleProps {
    article: NewsArticle;
}

const Article: React.FC<IArticleProps> = props => {
    const { title, id, description, imageUrl, articleUrl, sourceName } = props.article;
    let articleTitle = title.substring(0,  title.lastIndexOf('-'))
    return (
        <Wrapper>
            <ArticleImage src={imageUrl}/>
            <Content>
                <Title><a href={articleUrl} target='_blank'>{articleTitle}</a></Title>
                <ArticleSnippet>
                    <Source>{sourceName} — </Source> 
                    {description}
                </ArticleSnippet>
            </Content>
        </Wrapper>
    )
}

export default Article;