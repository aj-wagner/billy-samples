import React from 'react';
import { Heading, Badge, Icon, Pane } from 'evergreen-ui';

const PipelineEditModule = ({ type, name, func_delete }) => {
  const dictionaryIcon = {
    delay: 'time',
    form: 'form',
    database: 'database',
    scheduler: 'calendar',
    email: 'envelope',
    action: 'confirm',
  };

  return (
    <Pane
      marginBottom={8}
      border="default"
      width="100%"
      height={80}
      textAlign="left"
      padding={16}
      display="flex"
      justifyContent="space-between"
    >
      <Pane display="flex" alignItems="center">
        <Icon
          icon={dictionaryIcon[type]}
          color="default"
          marginRight={16}
          size={16}
        />
        <Heading marginRight={16}>{name}</Heading>
        <Badge size={300}>{type}</Badge>
      </Pane>
      <Pane display="flex" alignItems="center" paddingRight={16}>
        <Icon
          icon="cross"
          color="muted"
          cursor="pointer"
          size={16}
          onClick={() => func_delete(name)}
        />
      </Pane>
    </Pane>
  );
};

export default PipelineEditModule;
