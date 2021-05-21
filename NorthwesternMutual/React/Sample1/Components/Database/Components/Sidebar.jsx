import React from 'react';
import { SidebarTab, Pane, Heading, Button } from 'evergreen-ui';
import { ALL_APPLICANTS_FIELDS } from '../constants';

const Sidebar = ({ databaseData, activeIndex, onClick, onSelect }) => {
  const applicantList = [ALL_APPLICANTS_FIELDS, ...databaseData];
  return (
    <>
      <Pane
        background="tint2"
        padding={20}
        display="flex"
        flexDirection="column"
        width="25vw"
        height="80vh"
        alignItems="flex-start"
        overflowY="scroll"
      >
        <Heading marginBottom={16}>Database</Heading>
        <Button
          iconBefore="add"
          marginBottom={16}
          onClick={() => onClick(true)}
        >
          Add New Database
        </Button>

        <Heading marginBottom={16}>Users</Heading>
        {['All Users'].map((tab, index) => (
          <SidebarTab
            key={index * 3 + 0}
            is="a"
            href="#"
            id={tab}
            isSelected={activeIndex === index * 3 + 0}
            onSelect={() => onSelect(index * 3 + 0, tab)}
            textAlign="left"
          >
            {tab}
          </SidebarTab>
        ))}

        <Heading marginTop={24} marginBottom={16}>
          Interviewers
        </Heading>
        {[].map((tab, index) => (
          <SidebarTab
            key={index * 3 + 1}
            is="a"
            href="#"
            id={tab}
            isSelected={activeIndex === index * 3 + 1}
            onSelect={() => onSelect(index * 3 + 1, tab)}
            textAlign="left"
          >
            {tab}
          </SidebarTab>
        ))}

        <Heading marginTop={24} marginBottom={16}>
          Applicants
        </Heading>
        {applicantList.map(item => {
          return (
            <SidebarTab
              key={item.id}
              is="a"
              href="#"
              id={item.id}
              isSelected={activeIndex === item.id}
              onSelect={() => onSelect(item.id, item.id)}
              textAlign="left"
            >
              {item.name}
            </SidebarTab>
          );
        })}
      </Pane>
    </>
  );
};

export default Sidebar;
