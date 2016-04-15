import React from 'react';
import {observer} from 'mobx-react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';
import Avatar from 'material-ui/lib/avatar';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import {TagsOverview} from './tags-overview';

export const ContactsOverview = observer(({contactStore, viewState}) =>
	<List>
		<Subheader>Contacts</Subheader>
		<RaisedButton
			label="Add Contact"
			primary={true}
			onClick={() => contactStore.createRandomContact() }
			style={{ marginLeft: 12 }}
		/>
		{ contactStore.isLoading
			? 	<RefreshIndicator
					size={40}
					left={10}
					top={0}
					status="loading"
					style={loaderStyle}
			 	/>
			: 	null
		}
		{ contactStore.getContacts().map(contact =>
			<ContactEntryView
				contact={contact}
				key={contact.id}
				viewState={viewState}
			/>
		) }
	</List>
);

const ContactEntryView = observer(({contact, viewState}) =>
	<ListItem
		onClick={() => viewState.selectContact(contact) }
		className={`contact ${viewState.selection === contact ? 'selected' : ''}`}
	>
		<Avatar src={contact.picture.thumbnail} className="avatar"/>
		{contact.displayName}
		<br/>
		{contact.tags.map(tag => <input
			key={tag.id}
			onClick={(e) => {
				e.stopPropagation();
				viewState.selectTag(tag)
			} }
			type="button"
			value={tag.name}
			className="tag-preview"
		/>)}
	</ListItem>
);

const loaderStyle = {
	position: 'relative',
    float: 'right',
    marginRight: 30
}