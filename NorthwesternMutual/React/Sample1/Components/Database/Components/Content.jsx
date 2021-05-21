import React from 'react';
import { Heading, Pane, Table, Button, IconButton, Text } from 'evergreen-ui';
import TableItem from './TableItem';

const Content = ({
  activeFields,
  applicants,
  applicantGeneralInfo,
  isAllApplicant,
}) => {
  const contentData = isAllApplicant ? applicantGeneralInfo : applicants;

  const renderTableContent = () => {
    if (!contentData || !contentData.length) {
      return (
        <Table.Row display="flex" justifyContent="center" alignItems="center">
          <Text color="rgba(67, 90, 111, 0.3)">No Data Available</Text>
        </Table.Row>
      );
    }

    // Return item
    return contentData.map(item => (
      <TableItem key={item} data={item} activeFields={activeFields} />
    ));
  };

  return (
    <Pane border="default">
      <Table width="60vw">
        <Table.Head>
          <Table.SearchHeaderCell />
        </Table.Head>

        <Table.Head>
          {activeFields.map(item => (
            <Table.TextHeaderCell>
              {item?.metadata?.label || ''}
            </Table.TextHeaderCell>
          ))}
        </Table.Head>

        <Table.Body height="60vh" borderBottom="default">
          {renderTableContent()}
        </Table.Body>
        <Pane
          display="flex"
          justifyContent="center"
          width="100%"
          marginTop={16}
        >
          <IconButton appearance="minimal" icon="arrow-left" disabled />
          <Button appearance="primary">1</Button>
          <Button appearance="minimal">2</Button>
          <Button appearance="minimal">3</Button>
          <Heading userSelect="none">. . .</Heading>
          <Button appearance="minimal">10</Button>
          <IconButton appearance="minimal" icon="arrow-right" />
        </Pane>
      </Table>
    </Pane>
  );
};

export default Content;
