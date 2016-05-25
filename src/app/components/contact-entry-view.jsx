import React, {Component} from 'react';
import {observer} from 'mobx-react';

import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

const ContactEntryView = ({contact, viewState}) => (
	<ListItem
		onClick={() => viewState.selectContact(contact) }
		className={`contact ${viewState.isSelected(contact) ? 'selected' : ''}`}
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

export default observer(ContactEntryView);