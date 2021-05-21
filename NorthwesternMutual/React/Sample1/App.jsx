import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Pane, Text, Icon, Tooltip, Position, Strong } from 'evergreen-ui';

import { BACKEND_URL, RELEASE_NAME, RELEASE_VERSION } from './Constants';
import { DataContext } from './DataContext';
import Routes from './Routes';
import fetcher from './Helpers/fetcher';

const App = () => {
  const [redirectTo, setRedirectTo] = useState('');
  const [pipelineData, setPipelineData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [schedulerData, setSchedulerData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [databaseData, setDatabaseData] = useState([]);
  const [accountDetail, setAccountDetail] = useState({
    user: {
      firstName: '',
      lastName: '',
      company: { companyName: '', id: -1 },
      email: '',
    },
  });

  const fetchData = useCallback(async (url, _setData) => {
    const response = await fetcher(`${BACKEND_URL}/${url}`, {
      method: 'GET',
    });

    if (response?.is_error) {
      console.error('Fetcher returns error');
      if (url === 'account/detail') setRedirectTo('login');
    } else if (url === 'account/detail') {
      _setData(response);
      setRedirectTo('dashboard');
    } else _setData(response.data);
  }, []);

  const fetchDataContext = useCallback(
    action => {
      switch (action) {
        case 'all':
          fetchData('pipeline', setPipelineData);
          fetchData('form', setFormData);
          fetchData('scheduler', setSchedulerData);
          fetchData('email-template', setEmailData);
          fetchData('account/detail', setAccountDetail);
          fetchData('database', setDatabaseData);
          break;
        case 'database':
          fetchData('database', setDatabaseData);
          break;
        case 'accountdetail':
          fetchData('account/detail', setAccountDetail);
          break;
        case 'pipeline':
          fetchData('pipeline', setPipelineData);
          break;
        case 'modules':
          fetchData('form', setFormData);
          fetchData('scheduler', setSchedulerData);
          fetchData('email-template', setEmailData);
          break;
        case 'form':
          fetchData('form', setFormData);
          break;
        case 'scheduler':
          fetchData('scheduler', setSchedulerData);
          break;
        case 'email':
          fetchData('email-template', setEmailData);
          break;
        default:
          break;
      }
    },
    [fetchData],
  );

  useEffect(() => {
    fetchDataContext('all');
  }, [fetchDataContext]);

  const renderContent = () => {
    return (
      <Text margin={8}>
        <Strong>{RELEASE_NAME}</Strong> -{RELEASE_VERSION}
      </Text>
    );
  };

  return (
    <Pane>
      <Tooltip
        content={renderContent()}
        appearance="card"
        position={Position.LEFT}
      >
        <Icon
          size={16}
          icon="info-sign"
          position="absolute"
          right={32}
          bottom={32}
          color="muted"
        />
      </Tooltip>
      <DataContext.Provider
        value={{
          pipelineData,
          formData,
          schedulerData,
          emailData,
          accountDetail,
          databaseData,
          fetchDataContext,
        }}
      >
        <Routes redirectTo={redirectTo} />
      </DataContext.Provider>
    </Pane>
  );
};

export default App;
