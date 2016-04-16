import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main';
import {ContactView} from './components/contact-view';
import {TagView} from './components/tag-view';
import {StateNavigator} from 'navigation';
import {when} from 'mobx';

import {ContactStore} from './stores/contact-store';
import {TagStore} from './stores/tag-store';
import {ViewState} from './stores/view-state';

//Needed for onTouchTap
injectTapEventPlugin();

const tagStore = new TagStore();
const contactStore = new ContactStore(tagStore);
const viewState = new ViewState();
const stateNavigator = new StateNavigator([
    {key: 'home', route: ''},
    {key: 'contact', route: 'contact/{name}'},
    {key: 'tag', route: 'tag/{name}'}
]);
contactStore.loadContacts();

ReactDOM.render(
	<Main
		contactStore={contactStore}
		tagStore={tagStore}
        viewState={viewState}
        stateNavigator={stateNavigator}
	/>,
	document.getElementById('app')
);

stateNavigator.states.home.navigated = () => {
    ReactDOM.render(
        <span>Please select a contact or tag</span>,
        document.getElementById('content')
    );
}

stateNavigator.states.contact.navigated = (data) => {
    viewState.selection = contactStore.findContactByName(data.name);
    ReactDOM.render(
        <ContactView
            contact={viewState.selection}
            stateNavigator={stateNavigator}
        />,
        document.getElementById('content')
    );
}

stateNavigator.states.tag.navigated = (data) => {
    viewState.selection = tagStore.findTagByName(data.name);
    ReactDOM.render(
        <TagView tag={viewState.selection} />,
        document.getElementById('content')
    );
}

when(
    () => contactStore.hasLoadedInitialData,
    () => stateNavigator.start()
)
