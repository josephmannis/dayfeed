import { NewsFeed } from "../lib/client/types";
import { v4 } from "uuid";

export const everythingFeed: NewsFeed = {
    id: v4(),
    name: 'Everything',
    country: 'us',
    includedKeywords: [],
    excludedKeywords: [],
    language: 'en',
    sources: [],
    topic: undefined
}