/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

@observer
export class TagView extends React.Component {
	@observable tag;

	componentWillMount() {
		this.resetTag(this.props);
	}

	componentWillReceiveProps(newProps) {
		this.resetTag(newProps);
	}

	render() {
		return <Card>
			<CardTitle
				title={`Tag ${this.tag.name}`}
				/>
			<CardText>
				<TextField
					floatingLabelText="Tag name"
					value={this.tag.name}
					onChange={this.onChangeTagName}
					/>
			</CardText>
		</Card>
	}

	@action resetTag(props) {
		this.tag = props.tag;
	}

	@action	onChangeTagName = (e) => {
		this.tag.name = e.target.value;
	}
}
