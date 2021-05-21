import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Card,
  Checkbox,
  FilePicker,
  Heading,
  Icon,
  Paragraph,
  Pane,
  RadioGroup,
  Select,
  Strong,
  TextareaField,
  TextInputField,
  toaster,
} from 'evergreen-ui';
import { BACKEND_URL } from '../../Constants';

import fetcher from '../../Helpers/fetcher';

// TODO: move out later
const renderElement = (elementObj, index, onChangeCheckbox, onChangeRadio) => {
  let element;
  // prepare which element to render based on the type
  if (elementObj.type === 'checkbox') {
    element = (
      <Pane>
        <Paragraph>{elementObj.label}</Paragraph>
        {elementObj.options.map((option, ind) => (
          <Checkbox
            key={`checkbox-${elementObj.id}-${ind}`}
            label={option.label}
            value={option.value}
            checked={option.checked}
            indeterminate={option.indeterminate}
            onChange={e => onChangeCheckbox(e.target.checked, index, ind)}
          />
        ))}
      </Pane>
    );
  } else if (elementObj.type === 'file') {
    element = (
      <Pane>
        <Paragraph>{elementObj.label}</Paragraph>
        <FilePicker
          placeholder={elementObj.placeholder}
          required={elementObj.required}
        />
      </Pane>
    );
  } else if (elementObj.type === 'header') {
    element = <Heading is="h1">{elementObj.label}</Heading>;
  } else if (elementObj.type === 'paragraph') {
    element = <Paragraph>{elementObj.content}</Paragraph>;
  } else if (elementObj.type === 'radio') {
    element = (
      <RadioGroup
        label={elementObj.label}
        value={elementObj.value}
        options={elementObj.options}
        onChange={value => onChangeRadio(value, index)}
      />
    );
  } else if (elementObj.type === 'select') {
    element = (
      <Pane>
        <Paragraph>{elementObj.label}</Paragraph>
        <Select width={240} onChange={() => {}}>
          {elementObj.options.map((option, ind) => {
            return elementObj.value === option.value ? (
              <option
                selected
                key={`select-${elementObj.id}-${ind}`}
                value={option.value}
              >
                {option.label}
              </option>
            ) : (
              <option
                key={`select-${elementObj.id}-${ind}`}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </Select>
      </Pane>
    );
  } else if (elementObj.type === 'text') {
    element = (
      <TextInputField
        label={elementObj.label}
        marginBottom={0}
        placeholder={elementObj.placeholder}
        description={elementObj.description}
        required={elementObj.required}
      />
    );
  } else if (elementObj.type === 'textarea') {
    element = (
      <TextareaField
        label={elementObj.label}
        placeholder={elementObj.placeholder}
        marginBottom={0}
        required={elementObj.required}
      />
    );
  } else {
    return false;
  }
  return element;
};

const FormPreview = () => {
  const [formName, setFormName] = useState('');
  const [formBuilderData, setFormBuilderData] = useState([]);

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
  }, [fid]);

  useEffect(() => {
    if (fid !== 'new') {
      getContents();
    }
  }, [fid, getContents]);
  const onChangeCheckbox = (checked, index, ind) => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].options[ind].checked = checked;
    setFormBuilderData(newFormBuilderData);
  };
  const onChangeRadio = (value, index) => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].value = value;
    setFormBuilderData(newFormBuilderData);
  };

  return (
    <Pane display="flex" justifyContent="center">
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
          onClick={() => history.push(`/forms/${fid}`)}
        />
        <Strong size={500} marginBottom={16}>
          {formName}
        </Strong>
        <Pane border width="100%" padding={40} marginBottom={16}>
          {formBuilderData.length > 0 &&
            formBuilderData.map((compObject, i) => {
              return (
                <Pane key={compObject.id} marginBottom={16}>
                  {renderElement(
                    compObject,
                    i,
                    onChangeCheckbox,
                    onChangeRadio,
                  )}
                </Pane>
              );
            })}
        </Pane>
      </Card>
    </Pane>
  );
};

export { FormPreview as default, renderElement };
