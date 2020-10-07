import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class LoginForm extends React.Component {
  state = {
    register: false,
    username: "",
    password: "",
    password2: "",
    loginErrors: [],
    registerErrors: [],
    passwordDB: "root",
  };
  // Przerobic te dwie funkcje na jedna uniwersalna
  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onHandleRegister() {
    this.setState({
      register: !this.state.register,
    });
  }

  handleLoginCheck = () => {
    // Sprawdzenie po stronie serwera czy login pasusuje z haslem i puscic dalej
    axios
      .post(`${this.props.adress}/users/check`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data === "ok") {
          this.props.handleLoggedUser(this.state.username);

          this.props.downloadTasks();
        }
      });
  };

  render() {
    return (
      <>
        {this.state.register === false ? (
          <form margin={"normal"} noValidate autoComplete="off">
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="login"
                  label="Nazwa uzytkownika"
                  onChange={this.handleUsername}
                  value={this.state.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Haslo"
                  type="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                  value={this.state.password}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  color="inherit"
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  onClick={() => this.onHandleRegister()}
                >
                  Nie masz jeszcze konta?
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  //   onClick={() => this.props.handleLogged()}
                  onClick={this.handleLoginCheck}
                >
                  Zaloguj sie
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <form margin={"normal"} noValidate autoComplete="off">
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <TextField autoFocus id="login" label="Nazwa uzytkownika" />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Haslo"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password_2"
                  label="Powtorz haslo"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  color="inherit"
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  onClick={() => this.onHandleRegister()}
                >
                  Posiadasz juz konto?
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button variant="outlined" color="primary">
                  Zarejestruj sie
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
