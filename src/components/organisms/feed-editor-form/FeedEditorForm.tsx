import React from 'react';
import { NewsFeed, NewsSource } from '../../../lib/client/types';
import { Form, FormHeader, EditorInput, NameInput } from './styled';
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

}

type Selected = {
    label: string;
    value: string;
}

const FeedEditorForm: React.FC<IFeedEditorFormProps> = props => {    
    const {feed, sourceOptions, countryOptions, languageOptions, topicOptions, onFeedChanged} = props;

    const [requiredKeywords, setRequired] = React.useState<string[]>(feed.includedKeywords);
    const [optionalKeywords, setOptional] = React.useState<string[]>(feed.optionalKeywords);
    const [excludedKeywords, setExcluded] = React.useState<string[]>(feed.excludedKeywords);

    const [sources, setSources] = React.useState<NewsSource[]>(feed.sources);
    const [topic, setTopic] = React.useState<string>('');

    const [country, setCountry] = React.useState<string>(feed.country);
    const [language, setLanguage] = React.useState<string>(feed.language);
    
    const [feedName, setFeedname] = React.useState<string>(feed.name);


    React.useEffect(() => {
        onFeedChanged({
            id: feed.id,
            name: feedName,
            country: country,
            includedKeywords: requiredKeywords,
            excludedKeywords: excludedKeywords,
            optionalKeywords: optionalKeywords,
            language: language,
            sources: sources,
            topic: topic
        })
    }, [requiredKeywords, optionalKeywords, sources, topic, country, language, feedName])

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
        <Form onSubmit={(e) => {e.preventDefault(); return false}}>
            <FormHeader>
                <NameInput value={feed.name} onChange={(e) => {e.preventDefault(); setFeedname(e.target.value)}}/>
                <TextButton onClick={(e) => {e.preventDefault(); window.alert('delete feed')}}>{`🗑  Delete Feed`}</TextButton>
            </FormHeader>
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
                    <Select isMulti options={sourcesToSelects(sourceOptions)} value={sourcesToSelects(sources)} onChange={(s) => setSources((s as Selected[]).map(select => { return {name: select.label, id: select.value} }))}/>
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
        </Form>
    )
}

export default FeedEditorForm;