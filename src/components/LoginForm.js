import React from "react";

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

  onHandleRegister() {
    this.setState({
      register: !this.state.register,
    });
  }

  handleLoginCheck() {
    this.props.handleLogged();
  }

  render() {
    return (
      <>
        {this.state.register == 0 ? (
          <form margin={"normal"} noValidate autoComplete="off">
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="standard-required"
                  label="Nazwa uzytkownika"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-required"
                  label="Haslo"
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
                  Nie masz jeszcze konta?
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
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
                <TextField
                  autoFocus
                  id="standard-required"
                  label="Nazwa uzytkownika"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-required"
                  label="Haslo"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="standard-required"
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
