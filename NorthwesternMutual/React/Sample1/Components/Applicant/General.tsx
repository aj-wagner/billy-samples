import React, { FC } from 'react';
import { Pane, Card, Heading, Text, Table, Spinner } from 'evergreen-ui';
import { firstRow, secondRow } from './styles';

interface Props {
  email: string;
  firstName: string;
  lastName: string;
  loading: boolean;
}

const GeneralInfo: FC<Props> = ({ email, firstName, lastName, loading }) => {
  const renderContent = () => {
    if (loading) {
      return <Spinner marginY="auto" />;
    }

    return (
      <>
        <Pane>
          <Heading size={800}>
            {firstName} {lastName}
          </Heading>
          <Text>{email}</Text>
        </Pane>
        <Pane display="flex">
          <Table.Body width="400px">
            <Table.Row className={firstRow}>
              <Table.TextCell>
                <Heading size={700}>2 days ago</Heading>
                <Text size={300}>Last profile updated</Text>
              </Table.TextCell>
              <Table.TextCell>
                <Heading size={700}>Oct 17, 2019</Heading>
                <Text size={300}>First entered database</Text>
              </Table.TextCell>
            </Table.Row>
            <Table.Row className={secondRow}>
              <Table.TextCell>
                <Heading size={700}>2</Heading>
                <Text size={300}># of pipelines</Text>
              </Table.TextCell>
              <Table.TextCell>
                <Heading size={700}>2 days ago</Heading>
                <Text size={300}>Last profile updated</Text>
              </Table.TextCell>
            </Table.Row>
          </Table.Body>
        </Pane>
      </>
    );
  };

  return (
    <Card
      paddingY="3.125rem"
      display="flex"
      justifyContent="space-around"
      elevation={3}
      border="default"
      marginY="1rem"
      height="13.375rem"
    >
      {renderContent()}
    </Card>
  );
};

export default GeneralInfo;
