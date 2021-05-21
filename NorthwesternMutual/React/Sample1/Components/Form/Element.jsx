import React from 'react';
import { useDrag } from 'react-dnd';
import { Button } from 'evergreen-ui';
import { useFormContext } from './context';

const Element = ({ label, icon, value }) => {
  const { formBuilderData, addElement } = useFormContext();
  const [{ isDragging }, drag] = useDrag({
    item: { label, type: 'element' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        let element;
        if (value === 'checkbox') {
          element = {
            type: 'checkbox',
            label: 'Select all that apply',
            options: [
              {
                label: 'options-1',
                value: 'options_1',
                checked: true,
                indeterminate: false,
                name: 'abc',
              },
            ],
          };
        } else if (value === 'file') {
          element = {
            type: 'file',
            placeholder: 'Select the file here!',
            required: false,
            label: 'File Upload',
          };
        } else if (value === 'header') {
          element = {
            type: 'header',
            label: 'Header',
          };
        } else if (value === 'paragraph') {
          element = {
            type: 'paragraph',
            content: 'Paragraph',
          };
        } else if (value === 'radio') {
          element = {
            type: 'radio',
            label: 'Radio Button',
            value: 'options_1',
            options: [
              {
                label: 'options-1',
                value: 'options_1',
              },
              {
                label: 'options-2',
                value: 'options_2',
              },
              {
                label: 'options-3',
                value: 'options_3',
              },
            ],
          };
        } else if (value === 'select') {
          element = {
            type: 'select',
            label: 'Select',
            options: [
              {
                label: 'options-1',
                value: 'options_1',
              },
              {
                label: 'options-2',
                value: 'options_2',
              },
              {
                label: 'options-3',
                value: 'options_3',
              },
            ],
          };
        } else if (value === 'text') {
          element = {
            type: 'text',
            label: 'Text Field',
            required: false,
            placeholder: '',
            description: '',
          };
        } else if (value === 'textarea') {
          element = {
            type: 'textarea',
            label: 'Text Area',
            required: false,
            placeholder: '',
          };
        }
        addElement(element, formBuilderData.length);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={drag} style={{ opacity }}>
      <Button width="100%" iconBefore={icon} cursor="move">
        {label}
      </Button>
    </div>
  );
};

export default Element;
