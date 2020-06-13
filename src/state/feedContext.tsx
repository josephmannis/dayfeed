import React from 'react';
import { useStorageReducer } from 'react-storage-hooks';
import { NewsFeed } from '../lib/client/types';

/**
 * This is how we manage the global state of the contact list. If you're familiar with Redux, this is similar, just without all the boilerplate.
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively/
 * 
 * This is an excellent article on React Context. 
 */

type Action = {type: 'add', payload: {feed: NewsFeed}} | {type: 'remove', payload: {feed: NewsFeed}} | {type: 'update', payload: {feed: NewsFeed}};
type Dispatch = (action: Action) => void;
type State = {feeds: NewsFeed[]};
type FeedProviderProps = {children: React.ReactNode};

const FeedContext = React.createContext<State | undefined>(undefined);
const FeedDispatchContext = React.createContext<Dispatch | undefined>(undefined);


function feedReducer(state: State, action: Action) {
    switch (action.type) {
        case 'add': {
            return { feeds: [...state.feeds, action.payload.feed]};
        }
        case 'remove': {
            return {feeds: state.feeds.filter(p => p.id !== action.payload.feed.id)}
        }
        case 'update': {
            const { feed } = action.payload;

            return { 
                feeds: state.feeds.map(f => {
                        if (f.id === feed.id) return feed;
                        return f;
                    }
                )
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`);
        }
    }
}

function FeedProvider({children}: FeedProviderProps) {
    // This persists the state to local storage
    const [state, dispatch] = useStorageReducer(localStorage, 'FEED_LIST', feedReducer, { feeds: [] });
    
    return (
        <FeedContext.Provider value={state}>
            <FeedDispatchContext.Provider value={dispatch}>
                {children}
            </FeedDispatchContext.Provider>
        </FeedContext.Provider>
    )
}


function useFeedState() {
    const context = React.useContext(FeedContext);

    if (context === undefined) {
        throw new Error('useContactListState must be used within a FeedProvider');
    }

    return context;
}


function useFeedDispatch() {
    const context = React.useContext(FeedDispatchContext);

    if (context === undefined) {
        throw new Error('useFeedState must be used within a FeedProvider');
    }

    return context;
}

export { FeedProvider, useFeedState, useFeedDispatch }