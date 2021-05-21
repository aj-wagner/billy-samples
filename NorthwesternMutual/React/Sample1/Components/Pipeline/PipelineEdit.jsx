import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  Text,
  Heading,
  TextInputField,
  Button,
  Textarea,
  Strong,
  Badge,
  Icon,
  Pane,
  Paragraph,
  Dialog,
  SideSheet,
  Label,
} from 'evergreen-ui';
import PipelineEditModule from './PipelineEditModule';
import { BACKEND_URL, URL_ENCODED, CONTENT_JSON } from '../../Constants';
import { DataContext } from '../../DataContext';

const PipelineEdit = () => {
  const [dialogActive, setDialogActive] = useState(false);
  const [sideActive, setSideActive] = useState(false);
  const [data, setData] = useState([]);
  const { formData, schedulerData, emailData, databaseData } = useContext(
    DataContext,
  );
  const [pipelineName, setPipelineName] = useState('');
  const [pipelineDesc, setPipelineDesc] = useState('');
  const { pid } = useParams();
  const history = useHistory();

  const handlePipelineDataFetch = pipelineData => {
    const tempData = [];
    for (let i = 0; i < pipelineData.length; i++) {
      const obj = {};
      if (pipelineData[i].form) {
        obj.type = 'form';
        obj.name = pipelineData[i].form.name;
        obj.moduleId = pipelineData[i].form.id;
      } else if (pipelineData[i].scheduler) {
        obj.type = 'scheduler';
        obj.name = pipelineData[i].scheduler.name;
        obj.moduleId = pipelineData[i].scheduler.id;
      } else if (pipelineData[i].emailTemplate) {
        obj.type = 'email';
        obj.name = pipelineData[i].emailTemplate.name;
        obj.moduleId = pipelineData[i].emailTemplate.id;
      }
      tempData.push(obj);
    }

    setData(tempData);
  };

  const fetchData = useCallback(async () => {
    if (pid === 'new') {
      setPipelineName('New Pipeline');
      setPipelineDesc(
        'This pipeline does this and that. We aim to gather this many people for this position to further expedite those projects',
      );
      setSideActive(true);
      return;
    }

    const response4 = await fetch(`${BACKEND_URL}/pipeline/${pid}`, {
      method: 'GET',
      headers: {
        'Content-Type': URL_ENCODED,
      },
      credentials: 'include',
    });

    const bodyResp4 = await response4.json();

    if (response4.ok) {
      setPipelineName(bodyResp4.data.name);
      setPipelineDesc(bodyResp4.data.description);
      handlePipelineDataFetch(bodyResp4.data.pipelineItems);
    } else {
      console.error(bodyResp4);
    }
  }, [pid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddModule = (item, type) => {
    const newData = data;
    newData.push({ name: item.name, type, moduleId: item.id });
    setData(newData);
    setDialogActive(false);
  };

  const handleNewPost = async payload => {
    const response = await fetch(`${BACKEND_URL}/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_JSON,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const bodyResp = await response.json();

    if (response.ok) {
      alert(`Posted! ${bodyResp.insert_id}`);
      history.push(`/pipelines/${bodyResp.insert_id}`);
    } else {
      console.error(bodyResp);
    }
  };

  const handlePatchPost = async payload => {
    const response = await fetch(`${BACKEND_URL}/pipeline/${pid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': CONTENT_JSON,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const bodyResp = await response.json();

    if (response.ok) {
      alert('Updated!');
    } else {
      console.error(bodyResp);
    }
  };

  const handlePost = () => {
    const payload = {};
    payload.name = pipelineName;
    payload.description = pipelineDesc;
    payload.isRunning = false;
    payload.data = data;

    if (pid === 'new') {
      handleNewPost(payload);
    } else {
      handlePatchPost(payload);
    }
  };

  const handleDeleteModule = name => {
    let id = -1;
    for (let i = 0; i < data.length; i++) {
      if (name === data[i].name) {
        id = i;
      }
    }

    if (id !== -1) {
      const newData = data.slice();
      newData.splice(id, 1);
      setData(newData);
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
            onChange={e => setPipelineName(e.target.value)}
            value={pipelineName}
          />
          <Label display="block">Form Description</Label>
          <Textarea
            placeholder="Form Description"
            marginTop={4}
            marginBottom={16}
            onChange={e => setPipelineDesc(e.target.value)}
            value={pipelineDesc}
          />
        </Pane>
      </SideSheet>
      <Dialog
        isShown={dialogActive}
        onCloseComplete={() => setDialogActive(false)}
        title="Add a Module"
        preventBodyScrolling
        hasFooter={false}
      >
        <Pane
          display="flex"
          alignItems="center"
          textAlign="left"
          paddingLeft={16}
          paddingBottom={16}
        >
          <Icon icon="form" color="default" size={16} />
          <Heading marginLeft={16}>Forms</Heading>
        </Pane>
        {formData.map(item => (
          <Card
            onClick={() => handleAddModule(item, 'form')}
            cursor="pointer"
            border="default"
            background="tint1"
            padding={16}
            marginBottom={8}
          >
            <Text>{item.name}</Text>
          </Card>
        ))}

        <Pane display="flex" alignItems="center" textAlign="left" padding={16}>
          <Icon icon="calendar" color="default" size={16} />
          <Heading marginLeft={16}>Scheduler</Heading>
        </Pane>
        {schedulerData.map(item => (
          <Card
            onClick={() => handleAddModule(item, 'scheduler')}
            cursor="pointer"
            border="default"
            background="tint1"
            padding={16}
            marginBottom={8}
          >
            <Text>{item.name}</Text>
          </Card>
        ))}

        <Pane display="flex" alignItems="center" textAlign="left" padding={16}>
          <Icon icon="database" color="default" size={16} />
          <Heading marginLeft={16}>Database</Heading>
        </Pane>
        {databaseData.map(item => (
          <Card
            onClick={() =>
              handleAddModule({ name: item.name, id: -1 }, 'database')
            }
            cursor="pointer"
            border="default"
            background="tint1"
            padding={16}
            marginBottom={8}
          >
            <Text>{item.name}</Text>
          </Card>
        ))}

        <Pane display="flex" alignItems="center" textAlign="left" padding={16}>
          <Icon icon="envelope" color="default" size={16} />
          <Heading marginLeft={16}>Email Templates</Heading>
        </Pane>
        {emailData.map(item => (
          <Card
            onClick={() => handleAddModule(item, 'email')}
            cursor="pointer"
            border="default"
            background="tint1"
            padding={16}
            marginBottom={8}
          >
            <Text>{item.name}</Text>
          </Card>
        ))}

        <Pane display="flex" alignItems="center" textAlign="left" padding={16}>
          <Icon icon="build" color="default" size={16} />
          <Heading marginLeft={16}>Utility</Heading>
        </Pane>
        <Card
          onClick={() =>
            handleAddModule({ name: '7 Days', moduleId: -1 }, 'delay')
          }
          cursor="pointer"
          border="default"
          background="tint1"
          padding={16}
          marginBottom={8}
          display="flex"
          alignItems="center"
        >
          <Icon icon="time" color="default" size={16} />
          <Text marginLeft={16}>Delay</Text>
        </Card>
        <Card
          onClick={() =>
            handleAddModule({ name: 'Action Required', moduleId: -1 }, 'action')
          }
          cursor="pointer"
          border="default"
          background="tint1"
          padding={16}
          marginBottom={8}
          display="flex"
          alignItems="center"
        >
          <Icon icon="confirm" color="default" size={16} />
          <Text marginLeft={16}>Action Required</Text>
        </Card>
      </Dialog>

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
        <Icon
          icon="arrow-left"
          color="disabled"
          cursor="pointer"
          marginBottom={16}
          size={16}
          onClick={() => history.push('/pipelines')}
        />
        <Strong size={500} marginBottom={16}>
          {pipelineName}
        </Strong>
        <Pane display="flex" marginBottom={16}>
          <Badge color="neutral">NOT RUNNING</Badge>
          <Text color="muted" marginLeft={8} size={300}>
            15 minutes ago
          </Text>
        </Pane>
        <Paragraph marginBottom={16} textAlign="left">
          {pipelineDesc}
        </Paragraph>

        <Button
          iconBefore="cog"
          marginBottom={16}
          onClick={() => setSideActive(true)}
        >
          Edit Info
        </Button>

        {data.map(item => (
          <PipelineEditModule
            name={item.name}
            type={item.type}
            func_delete={handleDeleteModule}
          />
        ))}

        <Pane
          onClick={() => setDialogActive(true)}
          background="tint2"
          border="default"
          width="100%"
          height={80}
          textAlign="left"
          padding={16}
          display="flex"
          alignItems="center"
          cursor="pointer"
        >
          <Icon icon="add" color="muted" marginRight={16} size={16} />{' '}
          <Text color="muted"> add new module</Text>
        </Pane>

        <Button
          appearance="primary"
          marginTop={16}
          onClick={() => handlePost()}
        >
          Save
        </Button>
      </Card>
    </Pane>
  );
};

export default PipelineEdit;
