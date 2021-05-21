import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { Card, Heading, TextInput, Button, Pane, toaster } from 'evergreen-ui';
import Logo from '../../Assets/logo.png';
import { BACKEND_URL } from '../../Constants';
import fetcher from '../../Helpers/fetcher';
import { DataContext } from '../../DataContext';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fetchDataContext } = useContext(DataContext);

  const handleLogin = async e => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert("Email/Password can't be empty");
      return;
    }
    const data = {
      username: email,
      password,
    };

    const response = await fetcher(`${BACKEND_URL}/authorize`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      fetchDataContext('all');
      history.push('/dashboard');
    } else {
      toaster.danger('Something went wrong when logging in');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        flexDirection="column"
      >
        <Pane display="flex" justifyContent="center" marginBottom={40}>
          <img src={Logo} height={50} alt="Piper Logo" />
        </Pane>

        <Card
          padding={50}
          border="default"
          elevation={3}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="column"
          boxSizing="border-box"
          background="white"
        >
          <Heading size={700} marginBottom={16}>
            Login
          </Heading>
          <TextInput
            name="text-input-name"
            placeholder="email"
            marginTop={16}
            marginBottom={16}
            onChange={e => setEmail(e.target.value)}
          />
          <TextInput
            name="text-input-name"
            placeholder="password"
            type="password"
            marginBottom={16}
            onChange={e => setPassword(sha256(e.target.value))}
          />
          <Button type="submit">Log In</Button>
        </Card>
      </Pane>
    </form>
  );
};

export default Login;
