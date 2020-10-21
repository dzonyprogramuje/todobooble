import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Box from '@material-ui/core/Box';

class LoginForm extends React.Component {
  state = {
    register: false,
    username: "",
    password: "",
    password2: "",
    loginErrors: [],
    registerErrors: [],
    passwordDB: "root",
    messages: [
      "Podana nazwa uzytkownika nie istnieje",
      "Dane do zalogowania sa niepoprawne",
      "Podane hasla nie sa identyczne",
      "Podana nazwa uzytkownika juz istnieje",
      "Twoje konto zostalo poprawnie utworzone",
      "Zostales pomyslnie zalogowany",
      "Uzupelnij poprawnie wszystkie pola",
    ],
  };

  // Przerobic te dwie funkcje na jedna uniwersalna
  handleUsername = (e) => {
    this.setState({
      username: e.target.value.toLowerCase(),
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value.toLowerCase(),
    });
  };
  handlePassword2 = (e) => {
    this.setState({
      password2: e.target.value.toLowerCase(),
    });
  };

  onHandleRegister() {
    this.setState({
      register: !this.state.register,
    });
  }

  handleLoginCheck = () => {
    // Sprawdzenie po stronie serwera czy login pasusuje z haslem i puscic dalej

    if (this.state.username !== "" && this.state.password !== "") {
      axios
        .post(`${this.props.adress}/users/check`, {
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          if (res.data === "ok") {
            this.props.handleLoggedUser(this.state.username);

            this.props.downloadTasks();

            this.props.handleAlert("success", this.state.messages[5]);
          } else {
            this.props.handleAlert("error", this.state.messages[1]);
          }
        });
    } else {
      this.props.handleAlert("warning", this.state.messages[6]);
    }
  };

  newAccount = () => {
    if (
      this.state.username !== "" &&
      this.state.password !== "" &&
      this.state.password2 !== ""
    ) {
      if (this.state.password == this.state.password2) {
        axios
          .post(`${this.props.adress}/users/new`, {
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            this.onHandleRegister();
            // this.props.handleLoggedUser(this.state.username);
            // this.props.downloadTasks();
          });
      } else {
        this.props.handleAlert("warning", this.state.messages[2]);
      }
    } else {
      this.props.handleAlert("warning", this.state.messages[6]);
    }
  };

  onHandleForgot = () => {
    const mailjet = require('node-mailjet')
      .connect('ab3beb7e8d82fa8e393a1987c0e8cb4d', 'ca7619059e4b2903a04e62783c7e7376');
    const request = mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": "dzonyprogramuje@gmail.com",
              "Name": "Dzony"
            },
            "To": [
              {
                "Email": "dzonyprogramuje@gmail.com",
                "Name": "Dzony"
              }
            ],
            "Subject": "Greetings from Mailjet.",
            "TextPart": "My first Mailjet email",
            "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
            "CustomID": "AppGettingStartedTest"
          }
        ]
      });

    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })


  }

  render() {
    return (
      <>
        {this.state.register === false ? (
          <form margin={"normal"} noValidate autoComplete="off">
            <Grid
              container
              spacing={2}
              direction="column"
              style={{ marginTop: 10 }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  autoFocus
                  fullWidth
                  id="login"
                  label="Nazwa uzytkownika"
                  onChange={this.handleUsername}
                  value={this.state.username}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth

                  id="password"
                  label="Haslo"
                  type="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                  value={this.state.password}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Link
                  component='button'
                  color="inherit"
                  variant="subtitle2"
                  display="block"
                  onClick={() => this.onHandleRegister()}
                >
                  Nie masz jeszcze konta?
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  style={{ cursor: 'pointer' }}
                  color="inherit"
                  variant="subtitle2"
                  display="block"
                  onClick={() => this.onHandleForgot()}
                >
                  Zapomniales hasla?
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Button
                  color='primary'
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  //   onClick={() => this.props.handleLogged()}
                  onClick={this.handleLoginCheck}
                >
                  <Box p={'0 30px'}>Zaloguj sie</Box>
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
            <form margin={"normal"} noValidate autoComplete="off">
              <Grid
                container
                direction="column"
                spacing={2}
                style={{ marginTop: 10 }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    autoFocus
                    fullWidth

                    id="login"
                    label="Nazwa uzytkownika"
                    onChange={this.handleUsername}
                    value={this.state.username}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth

                    id="password"
                    label="Haslo"
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handlePassword}
                    value={this.state.password}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth

                    id="password_2"
                    label="Powtorz haslo"
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handlePassword2}
                    value={this.state.password2}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Link
                    component='button'
                    color="inherit"
                    variant="subtitle2"
                    display="block"
                    onClick={() => this.onHandleRegister()}
                  >
                    Posiadasz juz konto?
                </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4} >
                  <Button
                    variant="contained"
                    color='primary'
                    startIcon={<PlayArrowIcon />}
                    onClick={this.newAccount}
                  >
                    <Box p={'0 20px'}>Zarejestruj sie</Box>
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
      </>
    );
  }
}

export default LoginForm;
