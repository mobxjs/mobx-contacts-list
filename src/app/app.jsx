import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './main'; // Our custom react component

import {ContactStore} from './stores/contacts';
import {TagStore} from './stores/tags';

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
