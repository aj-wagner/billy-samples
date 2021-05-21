# API

## User

### Signup

```
POST /User/signup
```

##### REQUEST

```
body: {
    email: STRING,
    password: STRING,
    matchedPassword: STRING,
    dob: MM/DD/YYYY,
    username: STRING,
    phoneNumber: NUMBER
}
```

##### RESPONSE

```
{
    status: 400,
    error: "Failed to create user"
},
{
    status: 200,
    success `User ${user._id} has been successfully created`
}
```

### Signin

```
POST /User/signin
```

##### REQUEST

```
body: {
    password: STRING,
    username: STRING
}
```

##### RESPONSE

```
{
    status: 400,
    error: "Could not log in user"
}
{
    status: 200,
    success `User ${user._id} succesfully logged in`
}
```

### CheckForm

```
POST /User/checkForm
```

##### REQUEST

```
body: {
    email: STRING,
    password: STRING,
    matchedPassword: STRING,
    username: STRING,
    phoneNumber: NUMBER
}
```

##### RESPONSE

```
{
    status: 400,
    error: {
        usernameErr,
        emailErr,
        passwordErr,
        phoneNumberErr
    }
}
{
    status: 200,
    success `Form validated`
}
```
