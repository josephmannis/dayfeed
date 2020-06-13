export type NewsArticle = {
    title: string;
    id: string;
    description: string;
    imageUrl: string;
    articleUrl: string;
    sourceName: string;
}

export type Tag = {
    text: string;
}

export type NewsFeed = {
    id: string;
    name: string;
    country?: string;
    includedKeywords: string[];
    excludedKeywords: string[];
    optionalKeywords: string[];
    language?: string;
    sources: NewsSource[];
    topic?: string;
}

export type NewsSource = {
    id: string;
    name: string;
}