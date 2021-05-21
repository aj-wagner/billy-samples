import React from 'react';
import {
  Heading,
  Pane,
  Table,
  Button,
  Dialog,
  RadioGroup,
  TextInput,
  Text,
} from 'evergreen-ui';

const AddNewDatabaseDialog = ({
  dialogOpen,
  setDialogOpen,
  invalidName,
  invalidDBName,
  invalidKey,
  newDatabaseName,
  newDatabaseType,
  newDatabaseFields,
  newDatabaseFieldName,
  newDatabaseFieldKey,
  setNewDatabaseName,
  setNewDatabaseType,
  setNewDatabaseFieldName,
  handleSubmitNewDatabase,
  handleNewDatabaseField,
  handleKeyField,
}) => {
  return (
    <Dialog
      isShown={dialogOpen}
      title="Add New Database"
      onCloseComplete={() => setDialogOpen(false)}
      onConfirm={close => handleSubmitNewDatabase(close)}
      confirmLabel="Submit"
    >
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        marginBottom={16}
      >
        <Text>Database Name</Text>
        <TextInput
          isInvalid={invalidDBName}
          placeholder="Employee Database"
          value={newDatabaseName}
          onChange={e => setNewDatabaseName(e.target.value)}
        />
      </Pane>
      <RadioGroup
        label="Database Type"
        value={newDatabaseType}
        options={[
          { label: 'Applicant Database', value: 'applicant' },
          { label: 'Interviewer Database', value: 'interviewer' },
        ]}
        onChange={value => setNewDatabaseType(value)}
        marginBottom={16}
      />
      <Heading marginBottom={8}>Fields</Heading>
      <Pane
        background="blueTint"
        padding={16}
        border
        borderRadius="5px"
        marginBottom={16}
      >
        <Pane marginBottom={8} display="flex" alignItems="flex-start">
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            marginRight={16}
          >
            <Text>Field Name</Text>
            <TextInput
              isInvalid={invalidName}
              placeholder="First Name"
              value={newDatabaseFieldName}
              onChange={e => setNewDatabaseFieldName(e.target.value)}
              width={200}
            />
          </Pane>

          <Pane
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            marginRight={16}
          >
            <Text>Field Key</Text>
            <TextInput
              isInvalid={invalidKey}
              placeholder="FIRSTNAME"
              value={newDatabaseFieldKey}
              onChange={e => handleKeyField(e.target.value)}
              width={200}
            />
          </Pane>
        </Pane>
        <Button iconBefore="add" onClick={handleNewDatabaseField}>
          Add Field
        </Button>
      </Pane>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Field Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Field Key</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {newDatabaseFields.map((item, i) => (
            <Table.Row key={i}>
              <Table.TextCell>{item.label}</Table.TextCell>
              <Table.TextCell>{item.key}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Dialog>
  );
};

export default AddNewDatabaseDialog;
