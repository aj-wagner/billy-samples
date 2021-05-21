import React from 'react';
import { Button, Pane } from 'evergreen-ui';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormContainer } from './FormContainer';
import Element from './Element';

const FormBuilder = ({ openClearDialog }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Pane
        display="flex"
        justifyContent="center"
        background="tint2"
        height={480}
      >
        <Pane border="muted" marginRight={16} width="75%">
          <FormContainer />
        </Pane>
        <Pane flex={1}>
          <Pane flex={1}>
            <Element label="Checkbox Group" icon="form" value="checkbox" />
            <Element label="File Upload" icon="upload" value="file" />
            <Element label="Header" icon="header" value="header" />
            <Element label="Paragraph" icon="paragraph" value="paragraph" />
            <Element label="Radio Group" icon="property" value="radio" />
            <Element label="Select" icon="th" value="select" />
            <Element label="Text Area" icon="application" value="textarea" />
            <Element label="Text Field" icon="text-highlight" value="text" />
          </Pane>
          <Pane flex={1} marginTop={16}>
            <Button marginRight={16} onClick={() => openClearDialog()}>
              Clear
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </DndProvider>
  );
};

export default FormBuilder;
