import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Paragraph } from 'evergreen-ui';
import update from 'immutability-helper';
import FormElement from './FormElement';
import { useFormContext } from './context';
import { renderElement } from './FormPreview';

const style = {
  width: 'calc(100% - 2rem - 2px)',
  height: 'calc(100% - 2rem - 2px)',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '2rem',
  lineHeight: 'normal',
  float: 'left',
  overflow: 'scroll',
};

const solidBorderStyle = {
  border: '2px solid black',
};

const dashedBorderStyle = {
  border: '2px dashed black',
};

export const FormContainer = () => {
  const { formBuilderData, updateElements } = useFormContext();

  const moveElement = useCallback(
    (dragIndex, hoverIndex) => {
      if (!dragIndex && dragIndex !== 0) return false;
      const dragElement = formBuilderData[dragIndex];
      const updateElement = update(formBuilderData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      });
      updateElements(updateElement);
    },
    [formBuilderData, updateElements],
  );
  const onChangeCheckbox = (checked, index, ind) => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].options[ind].checked = checked;
    updateElements(newFormBuilderData);
  };
  const onChangeRadio = (value, index) => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].value = value;
    updateElements(newFormBuilderData);
  };
  const [{ isOver }, drop] = useDrop({
    accept: 'element',
    drop: () => ({ name: 'FormContainer' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={
        isOver
          ? { ...style, ...solidBorderStyle }
          : { ...style, ...dashedBorderStyle }
      }
    >
      {formBuilderData.length > 0 ? (
        formBuilderData.map((compObject, i) => {
          return (
            <FormElement
              key={compObject.id}
              element={renderElement(
                compObject,
                i,
                onChangeCheckbox,
                onChangeRadio,
              )}
              elementObj={compObject}
              index={i}
              id={compObject.id}
              moveElement={moveElement}
            />
          );
        })
      ) : (
        <Paragraph>Drag an element from the right to this area</Paragraph>
      )}
    </div>
  );
};
