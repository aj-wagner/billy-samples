import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Text,
  TextInputField,
  Button,
  Strong,
  Icon,
  Pane,
  SideSheet,
  Label,
  SelectMenu,
  Spinner,
  toaster,
} from 'evergreen-ui';
import { BACKEND_URL } from '../../Constants';

import TextEditorDraft from './TextEditorDraft';
import { DataContext } from '../../DataContext';
import fetcher from '../../Helpers/fetcher';

const EmailEdit = () => {
  const { databaseData, fetchDataContext } = useContext(DataContext);
  const [emailName, setEmailName] = useState('');
  const [subject, setSubject] = useState('');
  const [databaseRef, setDatabaseRef] = useState({ name: '', fields: [] });
  const [sideActive, setSideActive] = useState(false);
  const [emailContent, setEmailContent] = useState({ init: true });
  const [dbQueue, setDbQueue] = useState({ waiting: false, db: {} });

  const { eid } = useParams();

  const getContents = useCallback(async () => {
    const response = await fetcher(`${BACKEND_URL}/email-template/${eid}`, {
      method: 'GET',
    });

    if (response?.is_error) {
      toaster.danger('Fetcher returns error');
      console.log(response);
    } else {
      setEmailName(response.data.name);
      setSubject(response.data.subject);
      setEmailContent(response.data.content);
      setDbQueue({ waiting: true, id: response.data.database.id });
    }
  }, [eid]);

  useEffect(() => {
    if (eid !== 'new') {
      getContents();
    } else {
      setEmailName('New Email');
    }
  }, [eid, getContents]);

  useEffect(() => {
    let initDatabase = true;

    if (initDatabase && databaseData.length > 0) {
      initDatabase = false;
      if (dbQueue.waiting) {
        for (let i = 0; i < databaseData.length; i++) {
          if (dbQueue.id === databaseData[i].id) {
            setDatabaseRef(databaseData[i]);
            setDbQueue({ waiting: false, db: {} });
            break;
          }
        }
      } else {
        setDatabaseRef(databaseData[0]);
      }
    }
  }, [databaseData, dbQueue.id, dbQueue.waiting]);

  // const handleChange = e => {
  //   setEmailContent(e.target.getContent());
  // };

  const handleDbSelect = (obj, ind) => {
    const { id } = obj;
    for (let i = 0; i < databaseData.length; i++) {
      if (databaseData[i].id === id) {
        setDatabaseRef(databaseData[i]);
      }
    }
  };

  const handleSubmit = async () => {
    if (eid !== 'new') {
      const response = await fetcher(`${BACKEND_URL}/email-template/${eid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          emailName,
          databaseRefId: databaseRef.id,
          emailSubject: subject,
          emailContent,
        }),
      });

      if (response?.is_error) {
        toaster.danger('Fetcher returns error');
        console.log(response);
      } else {
        toaster.success('Email saved!');
        fetchDataContext('email');
      }
    } else {
      const response = await fetcher(`${BACKEND_URL}/email-template`, {
        method: 'POST',
        body: JSON.stringify({
          emailName,
          databaseRefId: databaseRef.id,
          emailSubject: subject,
          emailContent,
        }),
      });

      if (response?.is_error) {
        toaster.danger('Fetcher returns error');
      } else {
        toaster.success('Email created!');
        fetchDataContext('email');
      }
    }
  };

  return (
    <Pane display="flex" justifyContent="center">
      <SideSheet
        isShown={sideActive}
        onCloseComplete={() => setSideActive(false)}
        title="Edit Info"
        preventBodyScrolling
      >
        <Pane display="flex" flexDirection="column" padding={40}>
          <TextInputField
            label="Form Name"
            placeholder="Form Name"
            marginTop={16}
            marginBottom={16}
            onChange={e => setEmailName(e.target.value)}
            value={emailName}
          />
          <Label display="block">Database Reference</Label>
          <SelectMenu
            hasTitle={false}
            hasFilter={false}
            title="Select Database"
            options={databaseData.map(item => ({
              label: item.name,
              value: item,
            }))}
            selected={databaseRef.name}
            onSelect={item => handleDbSelect(item.value)}
          >
            <Button>{databaseRef.name || 'Select DB...'}</Button>
          </SelectMenu>
        </Pane>
      </SideSheet>
      <Card
        padding={50}
        border="default"
        elevation={3}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        wordWrap="normal"
        width="60vw"
        marginLeft={16}
      >
        <Strong size={500} marginBottom={16}>
          {emailName}
        </Strong>
        <Pane marginBottom={16} display="flex" alignItems="center">
          <Icon color="default" icon="database" size={16} />
          {databaseRef.name === '' ? (
            <Spinner size={16} marginLeft={8} />
          ) : (
            <Text marginLeft={8}>{databaseRef.name}</Text>
          )}
        </Pane>

        <Button
          iconBefore="cog"
          marginBottom={16}
          onClick={() => setSideActive(true)}
        >
          Edit Info
        </Button>

        <TextInputField
          label="Subject"
          placeholder="Enter email subject here..."
          marginTop={16}
          marginBottom={16}
          width="100%"
          onChange={e => setSubject(e.target.value)}
          value={subject}
          border="default"
        />
        <Pane width="100%" marginBottom={16}>
          <TextEditorDraft
            setEmailContent={setEmailContent}
            databaseRef={databaseRef}
            emailContent={emailContent}
            eid={eid}
          />
        </Pane>
        <Button
          iconBefore="floppy-disk"
          appearance="primary"
          onClick={handleSubmit}
        >
          Save Template
        </Button>
      </Card>
    </Pane>
  );
};

export default EmailEdit;
