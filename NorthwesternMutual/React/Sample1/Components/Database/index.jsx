import React, { useState, useContext, useEffect } from 'react';
import { Pane, toaster } from 'evergreen-ui';
import fetcher from '../../Helpers/fetcher';
import { BACKEND_URL } from '../../Constants';
import { DataContext } from '../../DataContext';
import Sidebar from './Components/Sidebar';
import AddNewDatabaseDialog from './Components/AddNewDatabaseDialog';
import { DEFAULT_DATABASE_FIELDS, ALL_APPLICANTS_FIELDS } from './constants';
import Content from './Components/Content';

function Database() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDatabaseType, setNewDatabaseType] = useState('applicant');
  const [newDatabaseFields, setNewDatabaseFields] = useState([
    ...DEFAULT_DATABASE_FIELDS,
  ]);
  const [newDatabaseFieldName, setNewDatabaseFieldName] = useState('');
  const [newDatabaseFieldKey, setNewDatabaseFieldKey] = useState('');
  const [newDatabaseName, setNewDatabaseName] = useState('');

  const [invalidName, setInvalidName] = useState(false);
  const [invalidKey, setInvalidKey] = useState(false);
  const [invalidDBName, setInvalidDBName] = useState(false);

  const [activeData, setActiveData] = useState([]);
  const [activeFields, setActiveFields] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [applicantGeneralInfo, setApplicantGeneralInfo] = useState([]);
  const [isAllApplicant, setIsAllApplicant] = useState(false);
  const { databaseData, fetchDataContext } = useContext(DataContext);

  // On mount, fetch general info
  useEffect(() => {
    const fetchGeneralInfo = async () => {
      try {
        const data = await fetcher(`${BACKEND_URL}/applicants`);
        setApplicantGeneralInfo(data?.data || []);
      } catch (e) {
        console.error('[Database][GetGeneralInfo]', e.message);
      }
    };

    fetchGeneralInfo();
  }, []);

  const handleNewDatabaseField = () => {
    let errorFlag = false;

    if (newDatabaseFields.map(item => item.key).includes(newDatabaseFieldKey)) {
      toaster.danger(`Field Key: ${newDatabaseFieldKey} already exists!`);
      setInvalidKey(true);
      setTimeout(() => setInvalidKey(false), 2000);
      errorFlag = true;
    }

    if (newDatabaseFieldKey.length === 0) {
      toaster.danger('Field Key cannot be empty!', { duration: 2 });
      setInvalidKey(true);
      setTimeout(() => setInvalidKey(false), 2000);
      errorFlag = true;
    }

    if (newDatabaseFieldName.length === 0) {
      toaster.danger('Field Name cannot be empty!', { duration: 2 });
      setInvalidName(true);
      setTimeout(() => setInvalidName(false), 2000);
      errorFlag = true;
    }

    if (errorFlag) return;

    const temp = newDatabaseFields;
    temp.push({ label: newDatabaseFieldName, key: newDatabaseFieldKey });
    setNewDatabaseFieldKey('');
    setNewDatabaseFieldName('');
    setNewDatabaseFields(temp);
  };

  const handleSubmitNewDatabase = async close => {
    if (newDatabaseName.length === 0) {
      toaster.danger('Database name cannot be empty!', { duration: 2 });
      setInvalidDBName(true);
      setTimeout(() => setInvalidDBName(false), 2000);
      return;
    }

    const response = await fetcher(`${BACKEND_URL}/database`, {
      method: 'POST',
      body: JSON.stringify({
        name: newDatabaseName,
        fields: newDatabaseFields,
      }),
    });

    if (response?.is_error) {
      console.error('Fetcher returns error');
      toaster.danger('Something went wrong :(');
    } else {
      toaster.success('Database Submitted!');
      fetchDataContext('database');

      setNewDatabaseFields([...DEFAULT_DATABASE_FIELDS]);
      setNewDatabaseFieldKey('');
      setNewDatabaseFieldName('');
      setNewDatabaseName('');
      setNewDatabaseType('applicant');
      close();
    }
  };

  const handleKeyField = val => {
    if (/^[a-zA-Z]*$/.test(val[val.length - 1])) {
      setNewDatabaseFieldKey(val.toUpperCase());
    }
  };

  const handleTabSelect = (i, key) => {
    setActiveIndex(i);

    if (key === 'All Users') {
      setActiveFields(['First Name', 'Last Name', 'Email', 'Permissions']);
      return;
    }

    const dataNeeded = databaseData.find(item => item.id === key) || [];
    if (key === 'All Applicants') {
      setIsAllApplicant(true);
      setActiveFields(ALL_APPLICANTS_FIELDS.fields);
    } else {
      setIsAllApplicant(false);
      setActiveFields(dataNeeded.fields || []);
    }

    setActiveData(dataNeeded || []);
  };

  return (
    <Pane display="flex" justifyContent="center">
      {/* Add new database */}
      <AddNewDatabaseDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        invalidName={invalidName}
        invalidDBName={invalidDBName}
        invalidKey={invalidKey}
        newDatabaseName={newDatabaseName}
        newDatabaseType={newDatabaseType}
        newDatabaseFieldKey={newDatabaseFieldKey}
        newDatabaseFieldName={newDatabaseFieldName}
        newDatabaseFields={newDatabaseFields}
        setNewDatabaseName={setNewDatabaseName}
        setNewDatabaseType={setNewDatabaseType}
        setNewDatabaseFieldName={setNewDatabaseFieldName}
        handleSubmitNewDatabase={handleSubmitNewDatabase}
        handleNewDatabaseField={handleNewDatabaseField}
        handleKeyField={handleKeyField}
      />

      {/* Sidebar section */}
      <Sidebar
        databaseData={databaseData}
        activeIndex={activeIndex}
        onClick={setDialogOpen}
        onSelect={handleTabSelect}
      />

      {/* Table content section */}
      <Content
        activeFields={activeFields || []}
        applicants={activeData.applicants || []}
        applicantGeneralInfo={applicantGeneralInfo || []}
        isAllApplicant={isAllApplicant}
      />
    </Pane>
  );
}

export default Database;
