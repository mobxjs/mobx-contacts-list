/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import DevTools from 'mobx-react-devtools';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';

import {ViewState} from '../stores/view-state';
import {isTag} from '../stores/tag-store';
import {isContact} from '../stores/contact-store';

import {ContactsOverview} from './contacts-overview';
import {TagsOverview} from './tags-overview';
import {ContactView} from './contact-view';
import {TagView} from './tag-view';

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500
	}
});

@observer
class Main extends React.Component {
	componentWillMount() {
		this.props.contactStore.loadContacts();
		this.viewState = new ViewState(this.props.contactStore, this.props.tagStore);
	}

	render() {
		const {contactStore, tagStore, viewState} = this.props;

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<DevTools />
					<Card className="sidebar">
						<CardTitle title="My Contacts" />
						<ContactsOverview contactStore={contactStore} viewState={viewState} />
						<TagsOverview tagStore={tagStore} viewState={viewState} />
					</Card>
					<div id="content" className="content">
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Main;
