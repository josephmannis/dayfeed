import React from 'react';
import { NewsFeed } from '../../../lib/client/types';
import { Form, FormHeader, FeedTitle, EditorInput, NameInput } from './styled';
import { TextButton } from '../../atoms/button/Button';
import EditorSection from '../../molecules/editor-section/EditorSection';
import { CopyProvider } from '../../../strings/strings';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

interface IFeedEditorFormProps {
    feed: NewsFeed;
    onFeedChanged: (feed: NewsFeed) => void;
}

type Selected = {
    label: string;
    value: string;
}

const FeedEditorForm: React.FC<IFeedEditorFormProps> = props => {    
    const {feed, onFeedChanged} = props;

    const [requiredKeywords, setRequired] = React.useState<string[]>(feed.includedKeywords);
    const [optionalKeywords, setOptional] = React.useState<string[]>(feed.optionalKeywords);
    const [excludedKeywords, setExcluded] = React.useState<string[]>(feed.excludedKeywords);

    const [sources, setSources] = React.useState<string[]>(feed.sources);
    const [topic, setTopic] = React.useState<string>('');

    const [country, setCountry] = React.useState<string>(feed.country);
    const [language, setLanguage] = React.useState<string>(feed.language);
    
    const [feedName, setFeedname] = React.useState<string>(feed.name);


    React.useEffect(() => {
        console.table([requiredKeywords, optionalKeywords, excludedKeywords, sources, topic, country, language, feedName])
    }, [requiredKeywords, optionalKeywords, sources, topic, country, language, feedName])

    const getValues = (options: Selected[]) => options.map(o => o.value);

    return (
        <Form>
            <FormHeader>
                <NameInput defaultValue={feed.name} onChange={(e) => setFeedname(e.target.value)}/>
                <TextButton onClick={() => window.alert('delete feed')}>{`🗑  Delete Feed`}</TextButton>
            </FormHeader>
            <EditorSection title={CopyProvider.EDITOR_KEYWORDS_SECTION_TITLE} body={CopyProvider.EDITOR_KEYWORDS_SECTION_BODY}>
                <EditorInput>
                    <h4>Required</h4>
                    <CreatableSelect isMulti onChange={(s) => setRequired(getValues(s as Selected[]))}/>
                </EditorInput>
                
                <EditorInput>
                    <h4>Optional</h4>
                    <CreatableSelect isMulti onChange={(s) => setOptional(getValues(s as Selected[]))}/>
                </EditorInput>

                <EditorInput>
                    <h4>Excluded</h4>
                    <CreatableSelect isMulti onChange={(s) => setExcluded(getValues(s as Selected[]))}/>
                </EditorInput>
            </EditorSection>
            <EditorSection title={CopyProvider.EDITOR_CONTENT_SECTION_TITLE} body={CopyProvider.EDITOR_CONTENT_SECTION_BODY}>
                <EditorInput>
                    <h4>Sources</h4>
                    <CreatableSelect isMulti onChange={(s) => setSources(getValues(s as Selected[]))}/>
                </EditorInput>

                <EditorInput>
                    <h4>Topic</h4>
                    <Select onChange={(s) => setTopic((s as Selected).value)}/>
                </EditorInput>
            </EditorSection>
            <EditorSection title={CopyProvider.EDITOR_LOCALE_SECTION_TITLE} body={CopyProvider.EDITOR_LOCALE_SECTION_BODY}>
                <EditorInput>
                    <h4>Country</h4>
                    <Select onChange={(s) => setCountry((s as Selected).value)}/>
                </EditorInput>

                <EditorInput>
                    <h4>Language</h4>
                    <Select onChange={(s) => setLanguage((s as Selected).value)}/>
                </EditorInput>
            </EditorSection>
        </Form>
    )
}

export default FeedEditorForm;