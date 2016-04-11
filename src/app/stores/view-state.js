import {observable, when} from 'mobx';

const CONTACT_PATH = "#!contact/";
const TAG_PATH = "#!tag/"

/**
 * Class responsible for routing and general UI state, which is mainly:
 * what element is currently selected?
 */
export class ViewState {
	@observable selectedContact = null;
	@observable selectedTag = null;

	constructor(contactStore, tagStore) {
		this.contactStore = contactStore;
		this.tagStore = tagStore;

		// Inspired by: http://jamesknelson.com/simple-routing-redux-react/
		// Using react-router would work as well though.
		window.addEventListener('hashchange', this.onHashChange, false);
		
		// Interpret initial hash once the data has loaded
		when(
			() => contactStore.hasLoadedInitialData,
			() => this.onHashChange()
		)
	}

	onHashChange = () => {
		const hash = window.location.hash;
		if (hash.indexOf(CONTACT_PATH) === 0) {
			this.selectContact(this.contactStore.findContactByName(hash.substr(CONTACT_PATH.length)));
		} else if (hash.indexOf(TAG_PATH) === 0) {
			this.selectTag(this.tagStore.findTagByName(hash.substr(TAG_PATH.length)));
		} else {
			this.selectNothing();
		}
	}

	selectContact = (contact) => {
		if (!contact)
			return void this.selectNothing();
		window.history.pushState(null, contact.username, CONTACT_PATH + contact.username);
		this.selectedContact = contact;
		this.selectedTag = null;
	}

	selectTag = (tag) => {
		if (!tag)
			return void this.selectNothing();
		window.history.pushState(null, tag.name, TAG_PATH + tag.name);
		this.selectedContact = null;
		this.selectedTag = tag;
	}

	selectNothing = () => {
		window.history.pushState(null, null, '#');
		this.selectedContact = null;
		this.selectedTag = null;
	}
}