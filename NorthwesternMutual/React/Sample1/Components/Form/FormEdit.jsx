import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Dialog,
  Icon,
  Pane,
  SideSheet,
  Strong,
  TextInputField,
  toaster,
} from 'evergreen-ui';
import { BACKEND_URL } from '../../Constants';

import FormBuilder from './FormBuilder';
import { DataContext } from '../../DataContext';
import { FormProvider } from './context';
import fetcher from '../../Helpers/fetcher';

const FormEdit = () => {
  const { fetchDataContext } = useContext(DataContext);
  const [formName, setFormName] = useState('');
  const [formBuilderData, setFormBuilderData] = useState([]);
  const [fieldNames, setFieldNames] = useState([]);
  const [sideActive, setSideActive] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);

  const { fid } = useParams();
  const history = useHistory();

  const getContents = useCallback(async () => {
    const response = await fetcher(`${BACKEND_URL}/form/${fid}`, {
      method: 'GET',
    });
    if (response?.is_error) {
      toaster.danger('Fetcher returns error');
      console.log(response);
    } else {
      setFormName(response.data.name);
      setFormBuilderData(response.data.formData || []);
    }

    const response2 = await fetcher(`${BACKEND_URL}/database/item/keys`, {
      method: 'GET',
    });
    if (response?.is_error) {
      toaster.danger('Fetcher returns error');
      console.log(response2);
    } else {
      setFieldNames(response2.data.map(field => field.key));
    }
  }, [fid]);

  useEffect(() => {
    if (fid !== 'new') {
      getContents();
    } else {
      setFormName('New Form');
    }
  }, [fid, getContents]);

  const getNewId = () => {
    if (formBuilderData.length === 0) return 0;
    return Math.max(...formBuilderData.map(item => item.id)) + 1;
  };

  const addElement = (elementObj, index) => {
    const newelementObj = {
      ...elementObj,
      id: getNewId(),
    };
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData.splice(
      index || newFormBuilderData.length,
      0,
      newelementObj,
    );
    setFormBuilderData(newFormBuilderData);
  };

  const deleteElement = index => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData.splice(index, 1);
    setFormBuilderData(newFormBuilderData);
  };

  const clearElements = () => {
    setFormBuilderData([]);
    setIsDialogShown(false);
  };

  const updateElements = newFormBuilderData => {
    setFormBuilderData(newFormBuilderData);
  };

  const openClearDialog = () => {
    setIsDialogShown(true);
  };

  const handleSubmit = async () => {
    if (fid !== 'new') {
      const response = await fetcher(`${BACKEND_URL}/form/${fid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: formName,
          formData: formBuilderData,
        }),
      });

      if (response?.is_error) {
        toaster.danger('Fetcher returns error');
        console.log(response);
      } else {
        toaster.success('Form saved!');
        fetchDataContext('form');
      }
    } else {
      const response = await fetcher(`${BACKEND_URL}/form`, {
        method: 'POST',
        body: JSON.stringify({
          name: formName,
          formData: formBuilderData,
        }),
      });

      if (response?.is_error) {
        toaster.danger('Fetcher returns error');
      } else {
        toaster.success('Form created!');
        fetchDataContext('form');
      }
    }
  };

  return (
    <FormProvider
      formBuilderData={formBuilderData}
      fieldNames={fieldNames}
      addElement={addElement}
      deleteElement={deleteElement}
      updateElements={updateElements}
    >
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
              onChange={e => setFormName(e.target.value)}
              value={formName}
            />
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
          <Icon
            icon="arrow-left"
            color="disabled"
            cursor="pointer"
            marginBottom={16}
            size={16}
            onClick={() => history.push('/modules')}
          />
          <Strong size={500} marginBottom={16}>
            {formName}
          </Strong>
          <Button
            iconBefore="cog"
            marginBottom={16}
            onClick={() => setSideActive(true)}
          >
            Edit Info
          </Button>
          <Button
            iconBefore="document-open"
            marginBottom={16}
            onClick={() => history.push(`/forms/${fid}/preview`)}
          >
            Preview Form
          </Button>
          <Pane width="100%" paddingBottom={40} marginBottom={16}>
            <FormBuilder openClearDialog={openClearDialog} />
          </Pane>
          <Button
            iconBefore="floppy-disk"
            appearance="primary"
            onClick={() => handleSubmit()}
          >
            Save Template
          </Button>
        </Card>
        <Dialog
          isShown={isDialogShown}
          title="Clear All Elements"
          intent="danger"
          onCloseComplete={() => setIsDialogShown(false)}
          onConfirm={() => clearElements()}
          confirmLabel="Clear Elements"
        >
          Are you sure you want to clear all elements?
        </Dialog>
      </Pane>
    </FormProvider>
  );
};

export default FormEdit;
