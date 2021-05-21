import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'evergreen-ui';

const TableItem = ({ activeFields, data }) => {
  return (
    <Link to={`/applicant/${data.id}`} style={{ textDecoration: 'none' }}>
      <Table.Row>
        <Table.TextCell>{data?.firstName || ''}</Table.TextCell>
        <Table.TextCell>{data?.lastName || ''}</Table.TextCell>
        <Table.TextCell>{data?.email || ''}</Table.TextCell>
        {activeFields.map(item => {
          const key = item?.metadata?.key || '';
          return (
            data?.value?.[key] && (
              <Table.TextCell key={item.id}>{data.value[key]}</Table.TextCell>
            )
          );
        })}
      </Table.Row>
    </Link>
  );
};

export default TableItem;
