import React, { FC } from 'react';
import { Pane, Heading, Card, Strong } from 'evergreen-ui';
import ProgressBar from '../ProgressBar';

const ActivePipeline: FC = () => {
  return (
    <Pane marginY="2rem">
      <Heading size={800}>Active Pipelines</Heading>
      <Card
        elevation={3}
        padding={24}
        marginY="2rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Pane>
          <Pane>
            <Strong size={500}>UI/UX Designer</Strong>
          </Pane>
          <Pane>
            <Strong size={300}>Call Screening</Strong>
          </Pane>
        </Pane>
        <Pane>
          <ProgressBar progress={45} />
        </Pane>
      </Card>
      <Card
        elevation={3}
        padding={24}
        marginY="2rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Pane>
          <Pane>
            <Strong size={500}>Creative Marketing Specialist</Strong>
          </Pane>
          <Pane>
            <Strong size={300}>Basic Marketing Assessment</Strong>
          </Pane>
        </Pane>
        <Pane>
          <ProgressBar progress={70} />
        </Pane>
      </Card>
    </Pane>
  );
};

export default ActivePipeline;
