import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class Embassies extends React.Component {

  state = {
    data: null,
  }

  render () {
    const { data, errors } = this.state;

    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={this.props.item.img} />
        </ListItemAvatar>
        <ListItemText
          primary={this.props.item.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body1"
                color="textPrimary"
              >
                {this.props.item.address}
              </Typography>
              <br />
              <Typography
                component="span"
                variant="caption"
                color="textPrimary"
              >
                {`${this.props.item.insc} Inscrições`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }
}

export default Embassies;