import React, { useContext } from 'react';
import { Card, Text, Heading, Table, Strong, Badge, Pane } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../DataContext';

const Dashboard = () => {
  const { accountDetail, pipelineData } = useContext(DataContext);
  const history = useHistory();

  return (
    <Pane display="flex" justifyContent="center">
      <Card
        padding={50}
        border="default"
        elevation={3}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
        boxSizing="border-box"
        width={300}
      >
        <Heading size={700} marginBottom={16}>
          Dashboard
        </Heading>
        <Text size={500}>
          {`${accountDetail.user.firstName} ${accountDetail.user.lastName}`}
        </Text>
        <Text size={300} marginTop={4}>
          {accountDetail.user.company.companyName}
        </Text>
        <Text size={300} marginTop={4}>
          {accountDetail.user.email}
        </Text>
      </Card>
      <Card
        padding={50}
        border="default"
        elevation={3}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        marginLeft={16}
      >
        <Strong
          size={500}
          marginBottom={16}
          cursor="pointer"
          onClick={() => history.push('/pipelines')}
        >
          Pipelines
        </Strong>
        <Table>
          <Table.Body height={240} width={600}>
            {pipelineData.map(p => (
              <Table.Row
                key={p.id}
                textAlign="left"
                isSelectable
                onSelect={() => history.push(`/pipelines/${p.id}`)}
              >
                <Table.TextCell>{p.name}</Table.TextCell>
                <Table.TextCell>
                  <Badge color={p.isRunning ? 'green' : 'neutral'}>
                    {p.isRunning ? 'RUNNING' : 'NOT RUNNING'}
                  </Badge>
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </Pane>
  );
};

export default Dashboard;
