import React from 'react';
import { Pane, TabNavigation, Tab } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import Logo from '../Assets/logo.png';

const Navbar = () => {
  return (
    <Pane
      background="white"
      borderBottom="default"
      width="100vw"
      marginBottom={40}
      paddingTop={30}
      paddingBottom={20}
      paddingLeft="20vw"
      paddingRight="20vw"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to="/dashboard">
        <img src={Logo} alt="Logo" height={35} />
      </Link>

      <TabNavigation background="tint2">
        {['Dashboard', 'Pipelines', 'Modules', 'Database'].map(tab => (
          <Link
            to={`/${tab.toLowerCase()}`}
            style={{ textDecoration: 'none' }}
            key={tab}
          >
            <Tab
              key={tab}
              href="#"
              id={tab}
              isSelected={
                window.location.pathname.substr(1) === tab.toLowerCase()
              }
            >
              {tab}
            </Tab>
          </Link>
        ))}
      </TabNavigation>
    </Pane>
  );
};

export default Navbar;
