import { Category, Language, SourceCountry, Source, SortOrder, Article, NewsQuery, HeadlineQuery, HeadlineCountry, ArticleResponse } from "../../lib/api/types";

type location = 'top-headlines' | 'everything' | 'sources';

const getBaseUrl = (loc: location) => `https://newsapi.org/v2/${loc}?apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`
const defualtHeadlineCountry: HeadlineCountry = 'us'


export interface INewsService {
    getSources: (category?: Category, language?: Language, country?: SourceCountry) => Promise<Source[]>
    searchAllArticles: (query: NewsQuery, pageSize: number, page: number, sortOrder?: SortOrder) => Promise<ArticleResponse>
    searchTopHeadlines: (query: HeadlineQuery, pageSize: number, page: number) => Promise<ArticleResponse>
}

export default function getNewsService(): INewsService {
    return {
        getSources: getSources,
        searchAllArticles: searchAllArticles,
        searchTopHeadlines: searchTopHeadlines
    }
}

function getSources(category?: Category, language?: Language, country?: SourceCountry): Promise<Source[]> {
    let url = getBaseUrl('sources');
    url = `${url}${category ? `&category=${category}` : ''}${language ? `&language=${language}` : ''}${country ? `&country=${country}` : ''}`
    console.log(url)
    return fetch(url)
        .then(res => res.json())
        .then(res => res.sources)
        .catch(error => error)
}

function searchAllArticles(query: NewsQuery, pageSize: number, page: number, sortOrder?: SortOrder): Promise<ArticleResponse> {
    let url = getBaseUrl('everything')
    url = `${url}${getKeywordString(query)}`
    console.log(url)

    return fetch(url)
    .then(res => res.json())
    .then(articles => articles)
    .catch(error => {console.log(error); throw error})
}

function searchTopHeadlines(query: HeadlineQuery, pageSize: number, page: number): Promise<ArticleResponse> {
    let url = getBaseUrl('top-headlines')
    url = `${url}${getKeywordString(query)}`
    url = `${url}&country=${query.country ? query.country : defualtHeadlineCountry}`
    console.log(url)
    return fetch(url)
    .then(res => res.json())
    .then(sources => sources)
    .catch(error => error)
}

function getKeywordString(query: NewsQuery | HeadlineQuery): string {
    let requiredKeywords = query.requiredKeywords.join('AND');
    let optionalKeywords = query.optionalKeywords.join('OR');
    let excludedKeywords = query.excludedKeywords.join('NOT');

    if (requiredKeywords === '' && optionalKeywords === '' && excludedKeywords === '') return ''
    return encodeURI(`&q=${requiredKeywords}${optionalKeywords}${excludedKeywords}`)
}