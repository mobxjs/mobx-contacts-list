/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';

@observer
export class ContactView extends React.Component {
	@observable firstNameValue;
	@observable lastNameValue;
	@observable tagId = 0; // AutoComplete has no reset api, abuse react keys..

	componentWillMount() {
		this.resetInputValues(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.resetInputValues(nextProps);
	}

	render() {
		const {contact} = this.props;
		return <Card>
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
					onChange={e => this.firstNameValue = e.target.value}
				/>
				<TextField
					floatingLabelText="Last name"
					value={this.lastNameValue}
					onChange={e => this.lastNameValue = e.target.value}
				/>
				<br/>
				<h2>Tags</h2>
				<p>{ contact.tags.map(tag => tag.name).join(", ") }</p>
				<AutoComplete
					floatingLabelText="Add tag"
					key={this.tagId}
					dataSource={this.getAvailableTags()}
					onNewRequest={this.onSelectTag}
				/>

			</CardText>
			<CardActions>
				<FlatButton label="Delete" onClick={this.onDelete} />
				<FlatButton label="Cancel" onClick={this.onCancel} />
				<FlatButton label="Save" primary={true} onClick={this.onSave} />
			</CardActions>
		</Card>
	}

	onDelete = () => {
		this.props.stateNavigator.navigate('home');
		this.props.contact.delete();
	}

	onSave = () => {
		this.props.contact.updateFirstName(this.firstNameValue);
		this.props.contact.updateLastName(this.lastNameValue);
	}

	onCancel = () => {
		this.resetInputValues();
	}

	getAvailableTags = () => this.props.contact.getAvailableTags().map(tag => tag.name);

	onSelectTag = (value) => {
		this.props.contact.addTag(value); 
		this.tagId++;
	}

	resetInputValues(props) {
		this.firstNameValue = props.contact.firstName;
		this.lastNameValue = props.contact.lastName;
		this.tagId++;
	}
}
