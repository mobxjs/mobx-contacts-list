import React from 'react';
import ReactDOM from 'react-dom';
import {ContactView} from './components/contact-view';
import {TagView} from './components/tag-view';
import {StateNavigator} from 'navigation';

export function createStateNavigator(contactStore, tagStore, viewState) {
    const stateNavigator = new StateNavigator([
        {key: 'home', route: ''},
        {key: 'contact', route: 'contact/{name}'},
        {key: 'tag', route: 'tag/{name}'}
    ]);

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
    return stateNavigator;
}