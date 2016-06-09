import React, {Component} from 'react';
import {observer} from 'mobx-react';

import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';

import ContactEntryView from './contact-entry-view';

@observer
export class ContactsOverview extends Component {
	render() {
		const {contactStore, viewState} = this.props;
		return <List>
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
	}
}

const loaderStyle = {
	position: 'relative',
    float: 'right',
    marginRight: 30
}
