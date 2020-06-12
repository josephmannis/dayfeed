import React from 'react';
import { NewsFeed, NewsSource } from '../../../lib/client/types';
import { Editor, Header, EditorInput, NameInput } from './styled';
import { TextButton } from '../../atoms/button/Button';
import EditorSection from '../../molecules/editor-section/EditorSection';
import { CopyProvider } from '../../../strings/strings';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

interface IFeedEditorFormProps {
    feed: NewsFeed;
    sourceOptions: NewsSource[];
    countryOptions: string[];
    languageOptions: string[];
    topicOptions: string[];
    onFeedChanged: (feed: NewsFeed) => void;
    onFeedDeleted: (feed: NewsFeed) => void;
}

type Selected = {
    label: string;
    value: string;
}

const FeedEditor: React.FC<IFeedEditorFormProps> = props => {    
    const {feed, onFeedDeleted, sourceOptions, countryOptions, languageOptions, topicOptions, onFeedChanged} = props;

    const setRequired = (keywords: string[]) => {
        updateFeed({
            ...feed,
            includedKeywords: keywords
        })
    }
    const setOptional = (keywords: string[]) => {
        updateFeed({
            ...feed,
            optionalKeywords: keywords
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
    const setTopic = (topic: string) => {
        updateFeed({
            ...feed,
            topic: topic
        })
    }
    const setCountry = (country: string) => {
        updateFeed({
            ...feed,
            country: country
        })
    }
    const setLanguage = (language: string) => {
        updateFeed({
            ...feed,
            language: language
        })
    }
    const setFeedname = (name: string) => {
        updateFeed({
            ...feed,
            name: name
        })
    }

    const updateFeed = (feed: NewsFeed) => {
        console.log("???")

        onFeedChanged(feed)}

    const getValues = (options?: Selected[]) => options ? options.map(o => o.value) : [];
    const getSelected = (options?: string[]) => options ? options.map(o => {return {label: o, value: o}}) : []

    const sourcesToSelects = (sources: NewsSource[]) => sources.map(s => { return {label: s.name, value: s.id} }) 
    const selectStyleAttrs = {
        components: { 
            DropdownIndicator:() => null, 
            IndicatorSeparator:() => null
        }
    }

    return (
        <Editor>
            <Header>
                <NameInput value={feed.name} onChange={(e) => setFeedname(e.target.value)}/>
                <TextButton onClick={() => onFeedDeleted(feed)}>{`🗑  Delete Feed`}</TextButton>
            </Header>
            <EditorSection title={CopyProvider.EDITOR_KEYWORDS_SECTION_TITLE} body={CopyProvider.EDITOR_KEYWORDS_SECTION_BODY}>
                <EditorInput>
                    <h4>Required</h4>
                    <CreatableSelect {...selectStyleAttrs} value={getSelected(feed.includedKeywords)} isMulti onChange={(s) => setRequired(getValues(s as Selected[]))}/>
                </EditorInput>
                
                <EditorInput>
                    <h4>Optional</h4>
                    <CreatableSelect {...selectStyleAttrs} value={getSelected(feed.optionalKeywords)} isMulti onChange={(s) => setOptional(getValues(s as Selected[]))}/>
                </EditorInput>

                <EditorInput>
                    <h4>Excluded</h4>
                    <CreatableSelect {...selectStyleAttrs} value={getSelected(feed.excludedKeywords)} isMulti onChange={(s) => setExcluded(getValues(s as Selected[]))}/>
                </EditorInput>
            </EditorSection>
            <EditorSection title={CopyProvider.EDITOR_CONTENT_SECTION_TITLE} body={CopyProvider.EDITOR_CONTENT_SECTION_BODY}>
                <EditorInput>
                    <h4>Sources</h4>
                    <Select isMulti options={sourcesToSelects(sourceOptions)} value={sourcesToSelects(feed.sources)} onChange={(s) => setSources((s as Selected[]).map(select => { return {name: select.label, id: select.value} }))}/>
                </EditorInput>

                <EditorInput>
                    <h4>Topic</h4>
                    <Select options={getSelected(topicOptions)} onChange={(s) => setTopic((s as Selected).value)}/>
                </EditorInput>
            </EditorSection>
            <EditorSection title={CopyProvider.EDITOR_LOCALE_SECTION_TITLE} body={CopyProvider.EDITOR_LOCALE_SECTION_BODY}>
                <EditorInput>
                    <h4>Country</h4>
                    <Select options={getSelected(countryOptions)} value={{label: feed.country, value: feed.country}} onChange={(s) => setCountry((s as Selected).value)}/>
                </EditorInput>

                <EditorInput>
                    <h4>Language</h4>
                    <Select  options={getSelected(languageOptions)} value={{label: feed.language, value: feed.language}} onChange={(s) => setLanguage((s as Selected).value)}/>
                </EditorInput>
            </EditorSection>
        </Editor>
    )
}

export default FeedEditor;