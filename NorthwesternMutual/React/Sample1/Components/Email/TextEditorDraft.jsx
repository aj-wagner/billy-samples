import React, { useEffect, useState, useRef } from 'react';
import { Pane, SelectMenu, IconButton } from 'evergreen-ui';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

const iconDictionary = {
  Bold: 'bold',
  Italic: 'italic',
  Underline: 'underline',
  Strikethrough: 'strikethrough',
  Code: 'code',
  'Heading One': 'header-one',
  'Heading Two': 'header-two',
  Blockquote: 'citation',
  'Unordered List': 'properties',
  'Ordered List': 'numbered-list',
  Field: 'clean',
};

const inlineStyleButtons = [
  {
    value: 'Bold',
    style: 'BOLD',
  },

  {
    value: 'Italic',
    style: 'ITALIC',
  },

  {
    value: 'Underline',
    style: 'UNDERLINE',
  },

  {
    value: 'Strikethrough',
    style: 'STRIKETHROUGH',
  },

  {
    value: 'Code',
    style: 'CODE',
  },

  {
    value: 'Field',
    style: 'FIELD',
  },
];

const blockTypeButtons = [
  {
    value: 'Heading One',
    block: 'header-one',
  },

  {
    value: 'Heading Two',
    block: 'header-two',
  },

  {
    value: 'Blockquote',
    block: 'blockquote',
  },

  {
    value: 'Unordered List',
    block: 'unordered-list-item',
  },

  {
    value: 'Ordered List',
    block: 'ordered-list-item',
  },
];

const customStyleMap = {
  FIELD: {
    backgroundColor: 'rgb(182, 236, 240)',
  },
};

const TextEditorDraft = ({
  eid,
  emailContent,
  setEmailContent,
  databaseRef,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [init, setInit] = useState(true);
  const editorRef = useRef(null);

  const handleKeyCommand = (command, currState) => {
    const newState = RichUtils.handleKeyCommand(currState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  useEffect(() => {
    if (eid !== 'new' && init) {
      if (emailContent?.init) return;
      setInit(false);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(emailContent)),
      );
    } else if (eid === 'new' && init) {
      setInit(false);
    }
  }, [init, eid, emailContent]);

  // useEffect(()=>{
  //   // console.log(props.databaseRef);
  // }, [props.databaseRef]);

  useEffect(() => {
    if (!init) setEmailContent(convertToRaw(editorState.getCurrentContent()));
  }, [init, setEmailContent, editorState]);

  const insertText = obj => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    let ncs;
    if (selection.isCollapsed()) {
      ncs = Modifier.insertText(
        contentState,
        selection,
        `##${obj.value.key}##`,
      );
    } else {
      ncs = Modifier.replaceText(
        contentState,
        selection,
        `##${obj.value.key}##`,
      );
    }

    const es = EditorState.push(editorState, ncs, 'insert-fragment');
    editorRef.current.focus();
    console.log(es);
    setEditorState(es);
  };

  const toggleInlineStyle = event => {
    event.preventDefault();

    const style = event.currentTarget.getAttribute('data-style');
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = event => {
    event.preventDefault();

    const block = event.currentTarget.getAttribute('data-block');
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const renderInlineStyleButton = (value, style) => {
    return (
      <IconButton
        appearance={
          editorState.getCurrentInlineStyle().has(style) ? 'primary' : 'minimal'
        }
        intent={
          editorState.getCurrentInlineStyle().has(style) ? 'white' : 'none'
        }
        icon={iconDictionary[value]}
        key={style}
        value={value}
        data-style={style}
        onMouseDown={toggleInlineStyle}
      />
    );
  };

  const renderBlockButton = (value, block) => {
    return (
      <IconButton
        appearance="minimal"
        icon={iconDictionary[value]}
        key={block}
        value={value}
        data-block={block}
        onMouseDown={toggleBlockType}
      />
    );
  };

  return (
    <Pane>
      <Pane border="default" display="flex" padding="8px" marginBottom={16}>
        <Pane display="flex" paddingRight={8} borderRight="default">
          {inlineStyleButtons.map(button => {
            return renderInlineStyleButton(button.value, button.style);
          })}
        </Pane>
        <Pane
          display="flex"
          paddingLeft={8}
          paddingRight={8}
          borderRight="default"
        >
          {blockTypeButtons.map(button => {
            return renderBlockButton(button.value, button.block);
          })}
        </Pane>
        <SelectMenu
          hasTitle={false}
          hasFilter={false}
          title="Select name"
          options={
            databaseRef.name === ''
              ? []
              : databaseRef.fields.map(item => ({
                  label: item.metadata.label,
                  value: item.metadata,
                }))
          }
          onSelect={item => insertText(item)}
        >
          <IconButton appearance="minimal" icon="cube-add" marginLeft={8} />
        </SelectMenu>
      </Pane>

      <Pane
        border="default"
        padding="8px"
        marginBottom={16}
        onClick={() => editorRef.current.focus()}
        height="30vh"
        overflowY="scroll"
      >
        <Editor
          ref={editorRef}
          customStyleMap={customStyleMap}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </Pane>
    </Pane>
  );
};

export default TextEditorDraft;
