
type location = 'top-headlines' | 'everything' | 'sources';

const getBaseUrl = (loc: location) => `https://newsapi.org/v2/${loc}?apiKey=${process.env.REACT_APP_NEWSAPI_KEY}/`
export const hi = () => {

}