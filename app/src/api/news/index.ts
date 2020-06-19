import { Category, Language, SourceCountry, Source, SortOrder, NewsQuery, HeadlineQuery, HeadlineCountry, ArticleResponse, CachedRequest } from "../../lib/api/types";

type location = 'top-headlines' | 'everything' | 'sources';

const getBaseUrl = (loc: location) => `https://newsapi.org/v2/${loc}?`
const getBaseLocalUrl = (loc: location) => `/${loc}?`

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

function getSources(category?: Category, language?: Language, country?: SourceCountry): Promise<Source[]> {
    let url = getBaseLocalUrl('sources');
    url = `${url}${category ? `&category=${category}` : ''}${language ? `&language=${language}` : ''}${country ? `&country=${country}` : ''}`
    
    return cachedFetch(url)
        .then(res => res.json())
        .then(res => res.sources)
        .catch(error => error)
}

function searchAllArticles(query: NewsQuery, pageSize: number, page: number, sortOrder?: SortOrder): Promise<ArticleResponse> {
    let url = getBaseUrl('everything')
    url = `${url}${getKeywordString(query)}`

    return cachedFetch(url)
    .then(res => res.json())
    .then(articles => articles)
    .catch(error => {console.log(error); throw error})
}

function searchTopHeadlines(query: HeadlineQuery, pageSize: number, page: number): Promise<ArticleResponse> {
    const {category, language, country, sources} = query;
    let url = getBaseUrl('top-headlines')
    if (sources.length > 0) {
        url = `${url}&sources=${sources.join(',')}`
    } else {
        url = `${url}${category ? `&category=${category}` : ''}&country=${country ? country : defualtHeadlineCountry}`
    }
    url = `${url}${language ? `&language=${language}` : ''}`
    url = `${url}${getKeywordString(query)}`
    url = url.replace('&', '')

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