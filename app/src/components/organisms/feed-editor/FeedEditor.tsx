import React from 'react';
import { NewsFeed, NewsSource, Selected } from '../../../lib/client/types';
import { Editor, Header, EditorInput, NameInput } from './styled';
import { TextButton } from '../../atoms/button/Button';
import EditorSection from '../../molecules/editor-section/EditorSection';
import { CopyProvider } from '../../../assets/strings/strings';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { baseSelectAttrs } from '../../molecules/select/Select';

interface IFeedEditorFormProps {
    feed: NewsFeed;
    sourceOptions: NewsSource[];
    countryOptions: string[];
    languageOptions: string[];
    topicOptions: string[];
    onFeedChanged: (feed: NewsFeed) => void;
    onFeedDeleted: (feed: NewsFeed) => void;
}

const FeedEditor: React.FC<IFeedEditorFormProps> = props => {    
    const {feed, onFeedDeleted, sourceOptions, countryOptions, languageOptions, topicOptions, onFeedChanged} = props;

    const setRequired = (keywords: string[]) => {
        updateFeed({
            ...feed,
            includedKeywords: keywords
        })
    }
    const setExcluded = (keywords: string[]) => {
        updateFeed({
            ...feed,
            excludedKeywords: keywords
        })
    }
    const setSources = (sources: NewsSource[]) => {
        updateFeed({
            ...feed,
            sources: sources
        })
    }
    const setTopic = (topic: Selected | null) => updateAndResetSources('topic', topic)
    const setCountry = (country: Selected | null) => updateAndResetSources('country', country)
    const setLanguage = (language: Selected | null) => updateAndResetSources('language', language)
    const setFeedname = (name: string) => {
        updateFeed({
            ...feed,
            name: name
        })
    }

    const updateAndResetSources = <T extends keyof Pick<NewsFeed, 'country' | 'topic' | 'language'>>(feedField: T, selectItem: Selected | null) => {
        let value = selectItem ? selectItem.value : undefined
        let updated = {
            ...feed,
            sources: value !== feed[feedField] ? [] : feed.sources
        }

        updated[feedField] = value

        updateFeed(updated)
    }

    const updateFeed = (feed: NewsFeed) => onFeedChanged(feed)

    const getValues = (options?: Selected[]) => options ? options.map(o => o.value) : [];
    const getSelected = (options?: string[]) => options ? options.map(o => {return {label: o, value: o}}) : []
    const toSelected = (option?: string) => { return { label: option ? option : 'Select...', value: option } }
    const animatedComponents = makeAnimated();

    const sourcesToSelects = (sources: NewsSource[]) => sources.map(s => { return {label: s.name, value: s.id} }) 

    return (
        <Editor>
            <Header>
                <NameInput value={feed.name} onChange={(e) => setFeedname(e.target.value)}/>
                <TextButton onClick={() => onFeedDeleted(feed)}>{`🗑  Delete Feed`}</TextButton>
            </Header>
            <EditorSection title={CopyProvider.EDITOR_KEYWORDS_SECTION_TITLE} body={CopyProvider.EDITOR_KEYWORDS_SECTION_BODY}>
                <EditorInput>
                    <h4>Required</h4>
                    <CreatableSelect {...baseSelectAttrs} placeholder={CopyProvider.EDITOR_NO_KEYWORDS} noOptionsMessage={() => CopyProvider.EDITOR_NO_KEYWORDS} value={getSelected(feed.includedKeywords)} isMulti onChange={(s) => setRequired(getValues(s as Selected[]))}/>
                </EditorInput>

                <EditorInput>
                    <h4>Excluded</h4>
                    <CreatableSelect {...baseSelectAttrs} placeholder={CopyProvider.EDITOR_NO_KEYWORDS} noOptionsMessage={() => CopyProvider.EDITOR_NO_KEYWORDS} value={getSelected(feed.excludedKeywords)} isMulti onChange={(s) => setExcluded(getValues(s as Selected[]))}/>
                </EditorInput>
            </EditorSection>
            <EditorSection title={CopyProvider.EDITOR_CONTENT_SECTION_TITLE} body={CopyProvider.EDITOR_CONTENT_SECTION_BODY}>
                <EditorInput>
                    <h4>Sources</h4>
                    <Select isMulti components={animatedComponents} options={sourcesToSelects(sourceOptions)} value={sourcesToSelects(feed.sources)} onChange={(s) => setSources((s as Selected[]) ? (s as Selected[]).map(select => { return {name: select.label, id: select.value} }) : [])}/>
                </EditorInput>

                <EditorInput>
                    <h4>Topic</h4>
                    <Select isClearable options={getSelected(topicOptions)} value={toSelected(feed.topic)} onChange={(s) => setTopic((s as Selected))}/>
                </EditorInput>
            </EditorSection>
            <EditorSection title={CopyProvider.EDITOR_LOCALE_SECTION_TITLE} body={CopyProvider.EDITOR_LOCALE_SECTION_BODY}> 
                <EditorInput>
                    <h4>Country</h4>
                    <Select isClearable options={getSelected(countryOptions)} value={toSelected(feed.country)} onChange={(s) => setCountry((s as Selected))}/>
                </EditorInput>

                <EditorInput>
                    <h4>Language</h4>
                    <Select isClearable options={getSelected(languageOptions)} value={toSelected(feed.language)} onChange={(s) => setLanguage((s as Selected))}/>
                </EditorInput>
            </EditorSection>
        </Editor>
    )
}

export default FeedEditor;