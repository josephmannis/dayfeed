import { Category, Language, SourceCountry, Source, SortOrder, NewsQuery, HeadlineQuery, HeadlineCountry, ArticleResponse, CachedRequest } from "../../lib/api/types";

type location = 'top-headlines' | 'everything' | 'sources';

const getBaseUrl = (loc: location) => `/${loc}?`

const defualtHeadlineCountry: HeadlineCountry = 'us'
const CACHE_TIME = 3.6e+6 // 1 hour

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

function buildUrl(location: location, query: NewsQuery & HeadlineQuery, pageSize: number, page: number, sortOrder?: SortOrder): string {
    const { language, sources, category, country} = query;
    let url = 
        `${language ? `&language=${language}` : ''}` +
        `${sortOrder ? `&sortBy=${sortOrder}` : ''}` +
        `${page ? `&page=${page}` : ''}` +
        `${pageSize ? `&pageSize=${pageSize}` : ''}` +
        `${getKeywordString(query)}`;

    if (sources.length > 0) {
        url = `${url}&sources=${sources.join(',')}`
    } else {
        url = `${url}${category ? `&category=${category}` : ''}&country=${country ? country : defualtHeadlineCountry}`
    }

    url = url.replace('&', '')
    return `${getBaseUrl(location)}${url}`;
}

function getSources(category?: Category, language?: Language, country?: SourceCountry): Promise<Source[]> {
    let url = getBaseUrl('sources');
    url = `${url}${category ? `&category=${category}` : ''}${language ? `&language=${language}` : ''}${country ? `&country=${country}` : ''}`
    
    return cachedFetch(url)
        .then(res => res.json())
        .then(res => res.sources)
        .catch(error => error)
}

function searchAllArticles(query: NewsQuery, pageSize: number, page: number, sortOrder?: SortOrder): Promise<ArticleResponse> {
    return getArticles('everything', query, pageSize, page, sortOrder);
}

function searchTopHeadlines(query: HeadlineQuery, pageSize: number, page: number): Promise<ArticleResponse> {
    return getArticles('top-headlines', query, pageSize, page);
}

function getArticles(location: location, query: NewsQuery | HeadlineQuery, pageSize: number, page: number, sortOrder?: SortOrder): Promise<ArticleResponse> {
    let url = buildUrl(location, query, pageSize, page, sortOrder);
    return cachedFetch(url)
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

function cachedFetch(url: string): Promise<Response> {
    let cached = checkCache(url);
    if (cached) return Promise.resolve(cached)

    return fetch(
        url, 
        { 
            headers: { 
                'Authorization': `Bearer ${process.env.REACT_APP_NEWSAPI_KEY}` 
            } 
        })
        .then(res => {
            if (res.ok) cacheRequest(url, res);
            return res;
        })
}

function checkCache(url: string): Response | undefined {
    const cached = localStorage.getItem(url);
    
    if (cached) {
        let parsed: CachedRequest = JSON.parse(cached);
        if (new Date().getTime() > parsed.expiry) {
            localStorage.removeItem(url)
        } else {
            return new Response(new Blob([parsed.response]));
        }
    }

    return undefined;
}

function cacheRequest(url: string, response: Response) {
    response.clone().text().then(data => {
        let responseData: CachedRequest = {
            response: data,
            expiry: new Date().getTime() + CACHE_TIME
        }
        localStorage.setItem(url, JSON.stringify(responseData))
    });
}