import { Category, Language, SourceCountry, Source, SortOrder, Article, NewsQuery, HeadlineQuery } from "../../lib/api/types";

type location = 'top-headlines' | 'everything' | 'sources';

const getBaseUrl = (loc: location) => `https://newsapi.org/v2/${loc}?apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`

export interface INewsService {
    getSources: (category?: Category, language?: Language, country?: SourceCountry) => Promise<Source[]>
    searchAllArticles: (query: NewsQuery, pageSize: number, page: number, sortOrder?: SortOrder) => Promise<Article[]>
    searchTopHeadlines: (query: HeadlineQuery, pageSize: number, page: number) => Promise<Article[]>
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

    return fetch(url)
        .then(res => res.json())
        .then(sources => sources)
        .catch(error => error)
}

function searchAllArticles(query: NewsQuery, pageSize: number, page: number, sortOrder?: SortOrder): Promise<Article[]> {
    let url = getBaseUrl('everything')

    return fetch(url)
    .then(res => res.json())
    .then(sources => sources)
    .catch(error => error)
}

function searchTopHeadlines(query: HeadlineQuery, pageSize: number, page: number): Promise<Article[]> {
    let url = getBaseUrl('top-headlines')

    return fetch(url)
    .then(res => res.json())
    .then(sources => sources)
    .catch(error => error)
}