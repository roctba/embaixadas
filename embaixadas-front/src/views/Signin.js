import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { signin } from '../API.js';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "teste@teste.com",
        password: "123456",
      },
      errors: {},
      openMessage: false,
      message: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token) {
      this.props.history.push('/embassies');
    }
  }

  handleChange = e =>
  this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if(Object.keys(errors).length === 0) {
      let user = Object.assign({}, this.state.data);
      delete user.confirmPassword;
      signin(user).then((data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        this.props.history.push('/embassies');
      }).catch((err) => {
        this.setState({
          openMessage: true, message: err.response.data
        });
      });
    }
  };

  handleClose() {
    this.setState({ openMessage: false, message: null });
  }

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = "Email inválido";
    if (!data.password) errors.password = "Informa sua senha";
    return errors;
  };

  render () {
    const { data, errors } = this.state;

    return (
      <Container maxWidth="sm">
        <Box p={4}>
          <Grid
            spacing={1}
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ height: '100vh' }}
          >

            <Grid item>
              <Box>
                <img
                  alt="logo"
                  height="56" width="56"
                  src="https://previews.123rf.com/images/glopphy/glopphy1205/glopphy120500052/13750039-hands-union-teamwork-logo.jpg"
                  />
              </Box>
            </Grid>

            <Grid item>
              <Box pb={4}>
                <Typography
                  component="span"
                  variant="overline"
                  color="textPrimary"
                >
                  EMBAIXADAS | GV
                </Typography>
              </Box>
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
              <Box pt={4}>
                <ButtonGroup fullWidth aria-label="full width button">
                  <Button onClick={this.onSubmit} size="large" variant="contained" color="primary">
                    ENTRAR
                  </Button>
                </ButtonGroup>
                
                <Box my={2} alignItems="center">
                  <Link component={RouterLink} to="/register">
                    Não tenho cadastro
                  </Link>
                </Box>
              </Box>
            </Grid>

          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.openMessage}
            message={<span>{this.state.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="secondary"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Box>
      </Container>
    );
  }
}

export default Signin;