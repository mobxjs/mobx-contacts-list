/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observable, toJSON} from 'mobx';
import {observer} from 'mobx-react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import LeftNav from 'material-ui/lib/left-nav';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';

@observer
export class ContactView extends React.Component {
    @observable firstNameValue;
    @observable lastNameValue;

    componentWillMount() {
        this.resetInputValues();
    }

  render() {
    const {contact} = this.props;
    console.dir(toJSON(contact));
    return  <Card style={{ margin: 40, marginLeft: 460 }}>
        <CardTitle
          title={contact.displayName}
          subtitle={contact.username}
        />
        <CardText>
          <Avatar src={contact.picture.large} size={120} />
          <br/>
          <TextField
              floatingLabelText="First name"
              value={this.firstNameValue}
              onChange={e => this.firstNameValue =  e.target.value}
          />
          <TextField
              floatingLabelText="Last name"
              value={this.lastNameValue}
              onChange={e => this.lastNameValue = e.target.value}
          />
          <br/>
          <h2>Tags</h2>
          <p>{ contact.tags.map(tag => tag.name).join(", ")}</p>
          <AutoComplete
              floatingLabelText="Add tag"
              dataSource={this.props.tagsStore.tags.map(tag => tag.name)}
              onNewRequest={value => contact.addTag(value)}
          />

        </CardText>
        <CardActions>
          <FlatButton label="Save" primary={true} onClick={this.onSave} />
          <FlatButton label="Cancel" onClick={this.onCancel} />
        </CardActions>
      </Card>
  }

  onSave = () => {
      this.props.contact.updateFirstName(this.firstNameValue);
      this.props.contact.updateLastName(this.lastNameValue);
  }

  onCancel = () => {
      this.resetInputValues();
  }

  resetInputValues() {
      this.firstNameValue = this.props.contact.firstName;
      this.lastNameValue = this.props.contact.lastName;
  }
}
