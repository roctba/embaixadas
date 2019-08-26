import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Embassy from '../components/Embassy';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { getEmbassies } from '../API.js';

class Embassies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errors: {},
    }

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if(!token) {
      this.props.history.push('/');
    }

    getEmbassies().then((data) => {
      this.setState({ data });
    }).catch((err) => {
      this.setState({
        openMessage: true, message: err.response.data
      });
    });
  }

  renderItem(item){
    return (<Embassy key={item.name} item={item} />)
  }

  handleClose() {
    this.setState({ openMessage: false, message: null });
  }

  render () {
    const { data } = this.state;

    return (
      <Container maxWidth="sm">
        <Box p={4}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
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
              <Box component="div" my={1}>
                <Typography
                  component="span"
                  variant="overline"
                  color="textPrimary"
                >
                  SUAS EMBAIXADAS
                </Typography>
              </Box>
            </Grid>

            <Grid item>
              <List>
                {data.map(this.renderItem)}
              </List>
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

export default Embassies;