import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';

class Signin extends React.Component {

  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  }

  handleChange = e =>
  this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
 };

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = "Email inválido";
    if (!data.password) errors.password = "Informa sua senha";
    return errors;
};

  render () {
    const { data, errors } = this.state;

    return (
      <Grid
        spacing={1}
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >

        <Grid item>
          <Box p={5}>Image</Box>
        </Grid>

        <Grid item>
          <FormControl fullWidth error={errors.email !== undefined}>
            <TextField
              id="signin-email"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={this.handleChange}
              error={errors.email !== undefined}
              fullWidth
            />
            <FormHelperText>{errors.email}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={errors.password !== undefined}>
            <TextField
              id="signin-password"
              type="password"
              label="Senha"
              name="password"
              value={data.password}
              onChange={this.handleChange}
              error={errors.password !== undefined}
              
            />
            <FormHelperText>{errors.password}</FormHelperText>
          </FormControl>

        </Grid>

        <Grid item>
          <Box>
            <Button onClick={this.onSubmit} fullWidth size="large" variant="contained" color="primary">
              ENTRAR
            </Button>
          </Box>
          
          <Box my={2} alignItems="center">
            <Link component={RouterLink} to="/register">
              Não tenho cadastro
            </Link>
          </Box>
        </Grid>

      </Grid>
    );
  }
}

export default Signin;