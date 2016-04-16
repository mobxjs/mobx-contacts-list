import React, {Component} from 'react';
import {observer} from 'mobx-react';

import List from 'material-ui/lib/lists/list';
import Subheader from 'material-ui/lib/Subheader';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import RaisedButton from 'material-ui/lib/raised-button';

import ContactEntryView from './contact-entry-view';

@observer
export class ContactsOverview extends Component {
	render() {
		const {contactStore, viewState, stateNavigator} = this.props;
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
					stateNavigator={stateNavigator}
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
