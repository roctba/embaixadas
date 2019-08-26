import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import validator from 'validator';
import InputMask from 'react-input-mask';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { register } from '../API.js';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        terms: false,
      },
      errors: {},
      openMessage: false,
      message: null,
      disableButton: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const user = localStorage.getItem("user");

    if(user) {
      const data = JSON.parse(user);
      data.password = "";
      data.confirmPassword = "";

      this.setState({ data, disableButton: true });
    }
  }

  handleChange(e) {
    if(e.target.name !== "terms"){
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value || e.target.checked }
      });
    } else {
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.checked }
      });
    }
  }

  handleClose() {
    this.setState({ openMessage: false, message: null });
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if(this.state.data.terms !== true) {
      this.setState({ openMessage: true, message: 'Vocẽ não aceitou os termos!' });
      return;
    }

    if(Object.keys(errors).length === 0) {
      let user = Object.assign({}, this.state.data);
      delete user.confirmPassword;
      register(user).then((data) => {
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

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = "Email inválido";
    if (!data.firstName) errors.firstName = "Informe seu nome";
    if (!data.lastName) errors.lastName = "Informe seu sobrenome";
    if (!data.password) errors.password = "Informe uma senha";
    if (data.confirmPassword !== data.password) errors.confirmPassword = "Confirmação de senha inválido";
    return errors;
  };

  render () {
    const { data, errors } = this.state;

    return (
      <Container maxWidth="sm">
        <Box p={5}>
          
          <Grid
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
                  my={5}/>
              </Box>
            </Grid>

            <Grid item>
              <Box component="div" mb={4}>
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
              <FormControl fullWidth error={errors.firstName !== undefined}>
                <TextField
                  label="NOME"
                  name="firstName"
                  value={data.firstName}
                  onChange={this.handleChange}
                  error={errors.firstName !== undefined}
                />
                <FormHelperText>{errors.firstName}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={errors.lastName !== undefined}>
                <TextField
                  label="SOBRENOME"
                  name="lastName"
                  value={data.lastName}
                  onChange={this.handleChange}
                  error={errors.lastName !== undefined}
                />
                <FormHelperText>{errors.lastName}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={errors.email !== undefined}>
                <TextField
                  type="email"
                  label="EMAIL"
                  name="email"
                  value={data.email}
                  onChange={this.handleChange}
                  error={errors.email !== undefined}
                />
                <FormHelperText>{errors.email}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={errors.phone !== undefined}>
                <TextField
                  label="TELEFONE"
                  name="phone"
                  value={data.phone}
                  onChange={this.handleChange}
                  error={errors.phone !== undefined}
                  >
                  <InputMask mask="(0)999 999 99 99" maskChar=" " />
                </TextField>
                <FormHelperText>{errors.phone}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={errors.password !== undefined}>
                <TextField
                  label="SENHA"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={this.handleChange}
                  error={errors.password !== undefined}
                  />
                <FormHelperText>{errors.password}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={errors.confirmPassword !== undefined}>
                <TextField
                  label="CONFIRMAR SENHA"
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={this.handleChange}
                  error={errors.confirmPassword !== undefined}
                  />
                <FormHelperText>{errors.confirmPassword}</FormHelperText>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.terms}
                    onChange={this.handleChange}
                    name="terms"
                    value={data.terms}
                    color="primary"
                  />
                }
                label="Aceitar os termos de uso"
              />
            </Grid>

            <Grid item>
              <Box mt={4}>
                <Button
                  fullWidth onClick={this.onSubmit}
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={this.state.disableButton}
                >
                  CADASTRAR
                </Button>
              </Box>
            </Grid>

          </Grid>
        </Box>

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
      </Container>
    );
  }
}

export default Register;