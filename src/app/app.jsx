import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main';

import {ContactStore} from './stores/contact-store';
import {TagStore} from './stores/tag-store';

//Needed for onTouchTap
injectTapEventPlugin();

const tagStore = new TagStore();
const contactStore = new ContactStore(tagStore);

ReactDOM.render(
	<Main
		contactStore={contactStore}
		tagStore={tagStore}
	/>,
	document.getElementById('app')
);
