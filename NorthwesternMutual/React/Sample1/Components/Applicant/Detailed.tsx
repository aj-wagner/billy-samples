import React, { FC } from 'react';
import { Pane, Card, Table, Heading, Text, Spinner } from 'evergreen-ui';
import { unsetBorderBottom } from '../styles';
import { ProfileDetail } from './types';

interface Props {
  loading: boolean;
  profile: ProfileDetail;
}

const DetailedInfo: FC<Props> = ({ loading, profile }) => {
  const renderBody = () => {
    if (loading) {
      return <Spinner marginX="auto" marginY="3rem" />;
    }

    return (
      <Table.Body>
        {profile.metadatas.map(data => (
          <Table.Row
            key={data.metadata.key}
            className={unsetBorderBottom}
            width="400px"
          >
            <Table.TextCell>
              <Heading>{data.metadata.label}</Heading>
            </Table.TextCell>
            <Table.TextCell>
              <Text>{data.value}</Text>
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  };

  return (
    <Pane marginY="2rem">
      <Heading size={800}>Additional Information</Heading>
      <Card
        paddingY="0.5rem"
        paddingX="1rem"
        display="flex"
        elevation={3}
        border="default"
        marginY="1rem"
      >
        {renderBody()}
      </Card>
    </Pane>
  );
};

export default DetailedInfo;
