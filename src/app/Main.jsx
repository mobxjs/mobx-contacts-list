/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observable} from 'mobx';
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

import {ContactsBar} from './components/contacts-bar';
import {ContactView} from './components/contact-view';
import {TagView} from './components/tag-view';
import DevTools from 'mobx-react-devtools';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 20,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

@observer
class Main extends React.Component {

  @observable viewState = {
      selectedContact: null,
      selectedTag: null,
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <DevTools />
          <ContactsBar
              contactsStore={this.props.contactsStore}
              tagsStore={this.props.tagsStore}
              viewState={this.viewState}
          />
          { this.viewState.selectedContact
            ? <ContactView contact={this.viewState.selectedContact} tagsStore={this.props.tagsStore}/>
            : this.viewState.selectedTag
              ? <TagView tag={this.viewState.selectedTag} />
              : <span>"Please select a contact or tag"</span>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
