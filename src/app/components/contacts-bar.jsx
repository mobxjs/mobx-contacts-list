/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
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
import Subheader from 'material-ui/lib/Subheader';

@observer
export class ContactsBar extends React.Component {
        componentWillMount() {
            this.props.contactsStore.loadContacts();
        }

  render() {
      const store = this.props.contactsStore;
      const tags = this.props.tagsStore;
      const viewState = this.props.viewState;
	return (
	  <div style={{ height: '100vh', position: 'fixed', 'backgroundColor': 'white', width: 400, zIndex: 10 }}>
		<List>
          <Subheader>Contacts</Subheader>
		  {store.contacts.map(contact => <ContactEntryView
              contact={contact}
              key={contact.id}
              onSelect={this.onSelectContact}
              onSelectTag={this.onSelectTag}
              isSelected={viewState.selectedContact === contact}
          />)}
          {store.isLoading
            ? <RefreshIndicator
                  size={40}
                  left={10}
                  top={0}
                  status="loading"
                  style={{
                display: 'inline-block',
                position: 'relative',
                margin: 12,
              }} />
            : null
          }
          <Subheader>Tags</Subheader>
          <TagsOverview tagsStore={tags} onSelectTag={this.onSelectTag}/>
		</List>
		<RaisedButton label="Add Contact" primary={true} style={{margin: 12}} onClick={() => store.createRandomContact()}/>

	  </div>
  )
  }

  onSelectContact = (contact) => {
      this.props.viewState.selectedContact = contact;
      this.props.viewState.selectedTag = null;
  }

  onSelectTag = (tag) => {
      this.props.viewState.selectedContact = null;
      this.props.viewState.selectedTag = tag;
  }
}

const ContactEntryView = observer(({contact, onSelect, isSelected, onSelectTag}) =>
    <ListItem
      secondaryTextLines={2}
      onClick={() => onSelect(contact)}
      leftAvatar={
        <Avatar src={contact.picture.thumbnail} />
      }
      primaryText={contact.displayName}
      secondaryText={
          contact.tags.map(tag => <FlatButton
              key={tag.id}
              label={tag.name}
              onClick={(e) => {
                  e.stopPropagation();
                  onSelectTag(tag)
              }}
          />)
      }
      style={{backgroundColor: isSelected ? 'rgba(0,0,0,0.2)' : null}}
    />
);

const TagsOverview = observer(({tagsStore, onSelectTag}) => <List>{tagsStore.tags.map(tag => <ListItem
    key={tag.id}
    primaryText={tag.name}
    onClick={() => onSelectTag(tag)}
/>)}</List>);
