import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Button,
  Checkbox,
  Combobox,
  CrossIcon,
  DuplicateIcon,
  EditIcon,
  Pane,
  Strong,
  TextInput,
} from 'evergreen-ui';
import { Row, Col } from 'react-flexbox-grid';
import AnimateHeight from 'react-animate-height';
import { useFormContext } from './context';

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  color: 'black',
  textAlign: 'left',
  cursor: 'move',
};

const elementProperties = {
  checkbox: ['label', 'options'],
  file: ['label', 'placeholder'],
  header: ['label'],
  paragraph: ['content'],
  radio: ['label', 'value', 'options'],
  select: ['label', 'options'],
  text: ['required', 'label', 'placeholder', 'description'],
  textarea: ['required', 'label', 'placeholder'],
};

const FormElement = ({ element, elementObj, index, id, moveElement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showIcons, setShowIcons] = useState('0');
  const [selectedName, setSelectedName] = useState('');
  const [customName, setCustomName] = useState('');
  const ref = useRef(null);
  const {
    formBuilderData,
    fieldNames,
    updateElements,
    addElement,
    deleteElement,
  } = useFormContext();
  const [, drop] = useDrop({
    accept: 'element',
    hover(item, monitor) {
      if (!ref.current) {
        return false;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return false;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return false;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return false;
      }
      // Time to actually perform the action
      moveElement(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'element', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const addOption = () => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].options.push({
      label: '',
      value: '',
    });
    updateElements(newFormBuilderData);
  };

  const handleEditComponent = () => {
    setIsExpanded(!isExpanded);
    setShowIcons('0');
  };

  const handleOnChange = (value, property) => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index][property] = value;
    updateElements(newFormBuilderData);
  };

  const handleOnChangeOptions = (value, ind, property) => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].options[ind][property] = value;
    updateElements(newFormBuilderData);
  };

  const handleDeleteOption = ind => {
    const newFormBuilderData = [...formBuilderData];
    newFormBuilderData[index].options.splice(ind, 1);
    updateElements(newFormBuilderData);
  };

  const getElementProperties = () => {
    const properties = [];
    if (
      ['checkbox', 'radio', 'select', 'text', 'textarea'].includes(
        elementObj.type,
      )
    ) {
      properties.push(
        <Pane textAlign="right" key={`name-${id}`}>
          <Row>
            <Col md={4}>
              <Strong>name</Strong>
            </Col>
            <Col md={8}>
              <Combobox
                openOnFocus
                width="100%"
                items={['+ add new', ...fieldNames]}
                onChange={selected => setSelectedName(selected)}
                placeholder="FIRSTNAME"
              />
              {selectedName === '+ add new' ? (
                <TextInput
                  width="100%"
                  placeholder="Enter custom name here"
                  value={customName}
                  onChange={e => setCustomName(e.target.value.toUpperCase())}
                />
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Pane>,
      );
    }
    elementProperties[elementObj.type].forEach(property => {
      if (property === 'options') {
        if (['checkbox', 'radio', 'select'].includes(elementObj.type)) {
          properties.push(
            <Pane textAlign="right" key={`elProps-options-${id}`}>
              <Row>
                <Col md={4}>
                  <Strong>options</Strong>
                </Col>
                <Col md={8} />
              </Row>
              {elementObj.options.map((option, ind) => {
                return (
                  <Row key={`elProps-options-${id}-${ind}`}>
                    <Col md={4} />
                    <Col md={4}>
                      <TextInput
                        width="100%"
                        placeholder="label (e.g. John Doe)"
                        value={option.label}
                        onChange={e =>
                          handleOnChangeOptions(e.target.value, ind, 'label')
                        }
                      />
                    </Col>
                    <Col md={3}>
                      <TextInput
                        width="100%"
                        placeholder="value (e.g. johnDoe)"
                        value={option.value}
                        onChange={e =>
                          handleOnChangeOptions(e.target.value, ind, 'value')
                        }
                      />
                    </Col>
                    <Col md={1}>
                      <Button
                        appearance="minimal"
                        padding={0}
                        intent="danger"
                        onClick={() => handleDeleteOption(ind)}
                      >
                        <CrossIcon />
                      </Button>
                    </Col>
                  </Row>
                );
              })}
              <Row>
                <Col md={4}>
                  <Button onClick={() => addOption()}>Add Options</Button>
                </Col>
                <Col md={8} />
              </Row>
            </Pane>,
          );
        }

        // TODO: will revisit if a better solution is found
        // properties.push(
        //   <Pane textAlign="right" key={`elProps-options-${id}`}>
        //     <Row>
        //       <Col md={4}>
        //         <Strong>options</Strong>
        //       </Col>
        //       <Col md={8} />
        //     </Row>
        //     {elementObj.options.map((option, ind) => {
        //       return (
        //         <Pane textAlign="right" key={`elProps-options-${id}-${ind}`}>
        //           <Row>
        //             <Col md={4}>
        //               <Strong>Checkbox {ind + 1}</Strong>
        //             </Col>
        //             <Col md={4}>
        //               <TextInput
        //                 width="100%"
        //                 placeholder="label (e.g. John Doe)"
        //                 value={option.label}
        //                 onChange={e =>
        //                   handleOnChangeOptions(e.target.value, ind, 'label')
        //                 }
        //               />
        //             </Col>
        //             <Col md={3}>
        //               <TextInput
        //                 width="100%"
        //                 placeholder="value (e.g. johnDoe)"
        //                 value={option.value}
        //                 onChange={e =>
        //                   handleOnChangeOptions(e.target.value, ind, 'value')
        //                 }
        //               />
        //             </Col>
        //             <Col md={1}>
        //               <Button
        //                 appearance="minimal"
        //                 padding={0}
        //                 intent="danger"
        //                 onClick={() => handleDeleteOption(ind)}
        //               >
        //                 <CrossIcon />
        //               </Button>
        //             </Col>
        //           </Row>
        //           <Row>
        //             <Col md={4}>
        //               <Strong>Checkbox {ind + 1} Name</Strong>
        //             </Col>
        //             <Col md={8}>
        //               <Combobox
        //                 openOnFocus
        //                 width="100%"
        //                 items={['+ add new', ...fieldNames]}
        //                 onChange={selected => setSelectedName(selected)}
        //                 placeholder="FIRSTNAME"
        //               />
        //               {selectedName === '+ add new' ? (
        //                 <TextInput
        //                   width="100%"
        //                   placeholder="Enter custom name here"
        //                   value={customName}
        //                   onChange={e =>
        //                     setCustomName(e.target.value.toUpperCase())
        //                   }
        //                 />
        //               ) : (
        //                 ''
        //               )}
        //             </Col>
        //           </Row>
        //         </Pane>
        //       );
        //     })}
        //     <Row>
        //       <Col md={4}>
        //         <Button onClick={() => addOption()}>Add Options</Button>
        //       </Col>
        //       <Col md={8} />
        //     </Row>
        //   </Pane>,
        // );
        // }
      } else {
        properties.push(
          <Pane textAlign="right" key={`elProps-${property}-${id}`}>
            <Row>
              <Col md={4}>
                <Strong>{property}</Strong>
              </Col>
              <Col md={8}>
                {property === 'required' ? (
                  <Checkbox
                    checked={elementObj[property]}
                    onChange={e => handleOnChange(e.target.checked, property)}
                  />
                ) : (
                  <TextInput
                    width="100%"
                    value={elementObj[property]}
                    onChange={e => handleOnChange(e.target.value, property)}
                  />
                )}
              </Col>
            </Row>
          </Pane>,
        );
      }
    });
    return properties;
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      onMouseEnter={() => setShowIcons('1')}
      onMouseLeave={() => setShowIcons('0')}
    >
      <Pane
        position="relative"
        float="right"
        top="-.75rem"
        right="-.75rem"
        opacity={showIcons}
      >
        <Button
          appearance="minimal"
          height={24}
          intent="danger"
          onClick={() => deleteElement(index)}
        >
          <CrossIcon />
        </Button>
        <Button
          appearance="minimal"
          height={24}
          onClick={() => handleEditComponent()}
        >
          <EditIcon />
        </Button>
        <Button
          appearance="minimal"
          height={24}
          intent="success"
          onClick={() => addElement(elementObj, index)}
        >
          <DuplicateIcon />
        </Button>
      </Pane>
      {element}
      <AnimateHeight duration={500} height={isExpanded ? 'auto' : 0}>
        {getElementProperties()}
        <Pane
          display="flex"
          justifyContent="center"
          marginTop=".5rem"
          marginBottom="-.5rem"
        >
          <Button
            height={24}
            appearance="minimal"
            onClick={() => handleEditComponent()}
          >
            Close
          </Button>
        </Pane>
      </AnimateHeight>
    </div>
  );
};

export default FormElement;
