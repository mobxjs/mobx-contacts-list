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
	<List>
		<ListItem
			secondaryTextLines={2}
			onClick={() => viewState.selectContact(contact) }
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
						viewState.selectTag(tag)
					} }
				/>)
			}
			style={{ backgroundColor: viewState.selectContact === contact ? 'rgba(0,0,0,0.2)' : null }}
		/>
	</List>
);

const loaderStyle = {
	position: 'relative',
    float: 'right',
    marginRight: 30
}