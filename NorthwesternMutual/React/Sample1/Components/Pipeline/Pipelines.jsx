import React, { useContext } from 'react';
import { Card, Button, Table, Strong, Badge, Icon, Pane } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../DataContext';

const Pipelines = () => {
  const history = useHistory();
  const { pipelineData } = useContext(DataContext);

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
        marginLeft={16}
      >
        <Strong size={500} marginBottom={16}>
          Pipelines
        </Strong>
        <Button
          marginBottom={16}
          onClick={() => history.push('/pipelines/new')}
        >
          + Add New Pipeline
        </Button>
        <Table>
          <Table.Body height={240} width={800}>
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
                <Table.TextCell>
                  <Icon icon="edit" size={16} />
                  <Icon marginLeft={24} icon="more" size={16} />
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </Pane>
  );
};

export default Pipelines;
