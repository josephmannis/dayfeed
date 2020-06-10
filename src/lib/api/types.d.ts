export type NewsQuery = {
    category?: Category;
    language?: Language;
    requiredKeywords: string[];
    optionalKeywords: string[];
    excludedKeywords: string[];
}

export type HeadlineQuery = NewsQuery & {
    country?: HeadlineCountry;
}

export type ArticleResponse = {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type Article = {
    source?: Source;
    author?: string;
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string;
}

export type ArticleSource = {
    id?: string;
    name?: string;
}

export type Source = ArticleSource & {
    description: string;
    url: string;
    category: Category;
    language: Language;
    country: SourceCountry;
} 

export const CategoryOptions = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'] as const;
export type Categories = typeof CategoryOptions;
export type Category = typeof Categories[number];

export const LanguageOptions = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh'] as const;
export type Languages = typeof LanguageOptions;
export type Language = Languages[number];

export const HeadlineCountryOptions = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'] as const;
export type HeadlineCountries = typeof SourceCountryOptions;
export type HeadlineCountry = SourceCountries[number];

export const SourceCountryOptions = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'] as const;
export type SourceCountries = typeof SourceCountryOptions;
export type SourceCountry = SourceCountries[number];

export type Status = 'ok' | 'error';

export const SortOrderOptions = ['relevancy', 'popularity', 'publishedAt', 'relevancy'] as const;
export type SortOrders = typeof SortOrderOptions;
export type SortOrder = SortOrders[number];