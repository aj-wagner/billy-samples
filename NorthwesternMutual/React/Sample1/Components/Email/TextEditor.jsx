import React, { useEffect, useState, useCallback } from 'react';
import { Heading, Pane, Button } from 'evergreen-ui';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ databaseRef, handleChange }) => {
  const [dbref, setDbref] = useState(databaseRef);
  const [name, setName] = useState('kevin');

  const [textInit, setTextInit] = useState({
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image',
      'charmap print preview anchor help',
      'searchreplace visualblocks code',
      'insertdatetime media table paste wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic | \
      alignleft aligncenter alignright | \
      bullist numlist outdent indent | addCustomField',

    setup: editor => {
      editor.ui.registry.addMenuButton('addCustomField', {
        text: name,
        fetch: callback => {
          // var items = [
          //   {type: 'menuitem', text: 'First Name', onAction:()=>{editor.insertContent('&nbsp;${FIRSTNAME}')}},
          //   {type: 'menuitem', text: 'Last Name', onAction:()=>{editor.insertContent('&nbsp;${LASTNAME}')}},
          //   {type: 'menuitem', text: 'Email', onAction:()=>{editor.insertContent('&nbsp;${EMAIL}')}},
          //   {type: 'menuitem', text: 'Application ID', onAction:()=>{editor.insertContent('&nbsp;${APPID}')}}
          // ];

          const items = dbref.fields.map(item => ({
            type: 'menuitem',
            text: item.label,
            onAction: () => {
              editor.insertContent(`$nbsp;\${${item.key}}`);
            },
          }));
          callback(items);
        },
      });
    },
  });
  const [textEditor, setTextEditor] = useState(
    <Editor
      init={textInit}
      apiKey="uju07oq4kunyylelodlq9bpwydd7oig6p9nfsbigeusucqsg"
      onChange={handleChange}
    />,
  );

  const a = ['a', 'b', 'c', 'd', 'e'];
  let count = 0;

  const getProps = useCallback(() => {
    return databaseRef;
  }, [databaseRef]);

  const getFields = useCallback(() => {
    setTextInit({
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image',
        'charmap print preview anchor help',
        'searchreplace visualblocks code',
        'insertdatetime media table paste wordcount',
      ],
      toolbar:
        'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | addCustomField',

      setup: editor => {
        editor.ui.registry.addMenuButton('addCustomField', {
          text: 'Add Custom Field',
          fetch: callback => {
            // var items = [
            //   {type: 'menuitem', text: 'First Name', onAction:()=>{editor.insertContent('&nbsp;${FIRSTNAME}')}},
            //   {type: 'menuitem', text: 'Last Name', onAction:()=>{editor.insertContent('&nbsp;${LASTNAME}')}},
            //   {type: 'menuitem', text: 'Email', onAction:()=>{editor.insertContent('&nbsp;${EMAIL}')}},
            //   {type: 'menuitem', text: 'WOOOY ID', onAction:()=>{editor.insertContent('&nbsp;${APPID}')}}
            // ];

            const items2 = databaseRef.fields.map(item => ({
              type: 'menuitem',
              text: item.label,
              onAction: () => {
                editor.insertContent(`$nbsp;\${${item.key}}`);
              },
            }));
            count++;
            if (count > 4) count = 0;
            callback(items2);
          },
        });
      },
    });
  }, []);

  useEffect(() => {
    getFields();
    getProps();
    setDbref(databaseRef);
    setTextEditor(
      <Editor
        init={textInit}
        apiKey="uju07oq4kunyylelodlq9bpwydd7oig6p9nfsbigeusucqsg"
        onChange={handleChange}
      />,
    );
  }, [getFields, getProps, handleChange, textInit, databaseRef]);

  return (
    <Pane>
      <Heading>{databaseRef.name}</Heading>
      {textEditor}
      <Button onClick={() => setName('Jon')}>BUTTON</Button>
    </Pane>
  );
};

export default TextEditor;
