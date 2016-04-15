/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

@observer
export class TagView extends React.Component {
	render() {
		const {tag} = this.props;
		return <Card>
			<CardTitle
				title={`Tag ${tag.name}`}
				/>
			<CardText>
				<TextField
					floatingLabelText="Tag name"
					value={tag.name}
					onChange={e => tag.name = e.target.value }
					/>
			</CardText>
		</Card>
	}
}
