import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Heading,
  TextInput,
  Button,
  SidebarTab,
  Pane,
  Table,
  CornerDialog,
} from 'evergreen-ui';
import queryString from 'querystring';
import { BACKEND_URL, URL_ENCODED } from '../../Constants';
import { DataContext } from '../../DataContext';

const Modules = () => {
  const { formData, schedulerData, emailData, fetchDataContext } = useContext(
    DataContext,
  );
  const [active, setActive] = useState('forms');
  const [data, setData] = useState(formData);
  const [cornerActive, setCornerActive] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const history = useHistory();

  useEffect(() => {
    setData(formData);
    setActive('forms');
  }, [formData]);

  const handleSubmit = async close => {
    if (moduleName.length === 0) {
      alert(`Module Name can't be empty`);
      return;
    }

    let bodyReq = { name: moduleName };
    if (active === 'forms') bodyReq.form_data = {};

    bodyReq = queryString.stringify(bodyReq);

    let url = '';
    if (active === 'forms') url = 'form';
    else if (active === 'schedulers') url = 'scheduler';
    else if (active === 'emails') url = 'email-template';
    else {
      console.error('Active not in the list');
      return;
    }

    const response = await fetch(`${BACKEND_URL}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': URL_ENCODED,
      },
      credentials: 'include',
      body: bodyReq,
    });

    const bodyResp = await response.json();

    if (response.ok) {
      alert('Post Successful');
      fetchDataContext('modules');
    } else {
      alert(bodyResp?.message);
    }

    setModuleName('');
    close();
  };

  const handleNew = () => {
    if (active === 'forms') {
      history.push('/forms/new');
    } else if (active === 'emails') {
      history.push('/emails/new');
    }
  };

  const handleSelect = id => {
    if (active === 'forms') {
      history.push(`forms/${id}`);
    } else if (active === 'emails') {
      history.push(`/emails/${id}`);
    }
  };

  const capitalFirst = word => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  };

  const handleSelectTab = key => {
    setActive(key.toLowerCase());
    if (key === 'Emails') {
      setData(emailData);
    } else if (key === 'Schedulers') {
      setData(schedulerData);
    } else if (key === 'Forms') {
      setData(formData);
    } else {
      setData([]);
    }
  };

  return (
    <Pane display="flex" justifyContent="center">
      <CornerDialog
        isShown={cornerActive}
        onCloseComplete={() => setCornerActive(false)}
        preventBodyScrolling
        hasClose={false}
        confirmLabel="Submit"
        onConfirm={close => handleSubmit(close)}
      >
        <Pane>
          <Heading>
            Create a new {capitalFirst(active).substring(0, active.length - 1)}
          </Heading>
          <TextInput
            name="module-name"
            placeholder="Module Name"
            marginTop={16}
            marginBottom={16}
            onChange={e => setModuleName(e.target.value)}
          />
        </Pane>
      </CornerDialog>

      <Pane
        background="tint2"
        padding={20}
        display="flex"
        flexDirection="column"
        width="10vw"
        alignItems="flex-start"
      >
        <Heading marginBottom={20}>Modules</Heading>
        {['Forms', 'Emails', 'Schedulers'].map(tab => (
          <SidebarTab
            key={tab}
            is="a"
            href="#"
            id={tab}
            isSelected={active === tab.toLowerCase()}
            textAlign="left"
            onSelect={() => handleSelectTab(tab)}
          >
            {tab}
          </SidebarTab>
        ))}
      </Pane>

      <Pane border="default" display="flex" flexDirection="column">
        <Pane textAlign="left" margin={16}>
          <Heading size={700} marginBottom={8}>
            {capitalFirst(active)}
          </Heading>
          <Button onClick={handleNew}>+ Add New</Button>
        </Pane>
        <Table width="50vw">
          <Table.Head>
            <Table.SearchHeaderCell />
            <Table.TextHeaderCell>Number of Pipelines</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height="50vh">
            {data.map(item => (
              <Table.Row
                key={item.id}
                isSelectable
                onSelect={() => handleSelect(item.id)}
              >
                <Table.TextCell textAlign="left">{item.name}</Table.TextCell>
                <Table.TextCell>{item.numberOfPipelines}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
};

export default Modules;
