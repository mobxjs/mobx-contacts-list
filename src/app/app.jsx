import React from 'react';
import ReactDOM from 'react-dom';
import {when} from 'mobx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main';

import {ContactStore} from './stores/contact-store';
import {TagStore} from './stores/tag-store';
import {ViewState} from './stores/view-state';
import {createStateNavigator} from './router';

//Needed for onTouchTap
injectTapEventPlugin();

const tagStore = new TagStore();
const contactStore = new ContactStore(tagStore);
const viewState = new ViewState();
const stateNavigator = createStateNavigator(contactStore, tagStore, viewState);

ReactDOM.render(
	<Main
		contactStore={contactStore}
		tagStore={tagStore}
		viewState={viewState}
		stateNavigator={stateNavigator}
	/>,
	document.getElementById('app')
);

contactStore.loadContacts();
when(
	() => contactStore.hasLoadedInitialData,
	() => stateNavigator.start()
)
