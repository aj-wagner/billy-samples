import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import {
  Card,
  Heading,
  TextInput,
  Button,
  Combobox,
  Pane,
  toaster,
} from 'evergreen-ui';
import { BACKEND_URL } from '../../Constants';
import Logo from '../../Assets/logo.png';
import fetcher from '../../Helpers/fetcher';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  // Fetch company list
  useEffect(() => {
    const fetchCompanyList = async () => {
      const result = await fetcher(`${BACKEND_URL}/company`);
      setCompanyList(result.data);
    };

    fetchCompanyList();
  }, []);

  const handleSignUp = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password does not match!');
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      companyId: selectedCompany?.id || '',
      password,
    };

    const response = await fetcher(`${BACKEND_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.insertId) {
      history.push('/dashboard');
    } else {
      toaster.danger(response?.response?.message || '');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        flexDirection="column"
      >
        <Pane display="flex" justifyContent="center" marginBottom={40}>
          <img src={Logo} height={50} alt="Piper" />
        </Pane>

        <Card
          padding={50}
          border="default"
          elevation={3}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Heading size={700} marginBottom={8}>
            Sign Up
          </Heading>
          <TextInput
            name="text-input-name"
            placeholder="First Name"
            marginTop={8}
            marginBottom={8}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextInput
            name="text-input-name"
            placeholder="Last Name"
            marginTop={8}
            marginBottom={8}
            onChange={e => setLastName(e.target.value)}
          />
          <TextInput
            name="text-input-name"
            placeholder="Email"
            marginTop={8}
            marginBottom={8}
            onChange={e => setEmail(e.target.value)}
          />
          <Combobox
            marginTop={8}
            marginBottom={8}
            width="100%"
            items={companyList || []}
            itemToString={item => item?.companyName || ''}
            onChange={selected => setSelectedCompany(selected)}
            placeholder="Company"
            autocompleteProps={{
              title: 'Companies',
            }}
          />
          <TextInput
            name="text-input-name"
            placeholder="Password"
            type="password"
            marginTop={8}
            marginBottom={8}
            onChange={e => setPassword(sha256(e.target.value))}
          />
          <TextInput
            name="text-input-name"
            placeholder="Confirm Password"
            type="password"
            marginTop={8}
            marginBottom={8}
            onChange={e => setConfirmPassword(sha256(e.target.value))}
          />
          <Button marginTop={8} type="submit">
            Sign Up
          </Button>
        </Card>
      </Pane>
    </form>
  );
};

export default Signup;
