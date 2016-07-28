/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

@observer
export class ContactView extends React.Component {
	@observable firstNameValue;
	@observable lastNameValue;
	@observable autoSave;
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
				children={<span style={{ float: "left", marginLeft: "43%" }}>
					Auto Save: <Toggle style={{ width: "auto", float: "right" }} defaultToggled={contact.autoSave} onToggle={this.onToggle} />
				</span>}
			/>
			<CardText>
				<Avatar src={contact.picture.large} size={120} />
				<br/>
				<TextField
					floatingLabelText="First name"
					value={this.firstNameValue}
					onChange={this.onChangeFirstName}
				/>
				<TextField
					floatingLabelText="Last name"
					value={this.lastNameValue}
					onChange={this.onChangeLastName}
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
				<FlatButton label="Save" primary={true} onClick={this.onSave} disabled={this.autoSave} />
			</CardActions>
		</Card>
	}

	@action	onChangeFirstName = (e) => {
		this.firstNameValue = e.target.value;
		this.autoSave && this.onSave();
	}

	@action	onChangeLastName = (e) => {
		this.lastNameValue = e.target.value;
		this.autoSave && this.onSave();
	}

	@action	onToggle = (e, disabled) => {
		this.autoSave = disabled;
		this.onSave();
	}

	@action	onDelete = () => {
		this.props.viewState.selectNothing();
		this.props.contact.delete();
	}

	@action	onSave = () => {
		this.props.contact.updateFirstName(this.firstNameValue);
		this.props.contact.updateLastName(this.lastNameValue);
		this.props.contact.updateAutoSave(this.autoSave);
	}

	@action	onCancel = () => {
		this.resetInputValues(this.props);
	}

	getAvailableTags = () => this.props.contact.getAvailableTags().map(tag => tag.name);

	@action	onSelectTag = (value) => {
		this.props.contact.addTag(value);
		this.autoSave && this.onSave();
		this.tagId++;
	}

	@action	resetInputValues(props) {
		this.firstNameValue = props.contact.firstName;
		this.lastNameValue = props.contact.lastName;
		this.autoSave = props.contact.autoSave;
		this.tagId++;
	}
}
