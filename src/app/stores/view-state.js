import {observable, when, autorun, action, computed} from 'mobx';
import {isContact} from './contact-store';
import {isTag} from './tag-store';

const CONTACT_PATH = "#!contact/";
const TAG_PATH = "#!tag/"

/**
 * Class responsible for routing and general UI state, which is mainly:
 * what element is currently selected?
 */
export class ViewState {
	@observable selection = null;
	processingHashChange = false;

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
		
		// When selection changes, push to history
		autorun(() => {
			if (isContact(this.selection))
				this.pushHistory(CONTACT_PATH + this.selection.username);
			else if (isTag(this.selection))
				this.pushHistory(TAG_PATH + this.selection.name);
			else
				this.pushHistory('#');
		})
	}

	isSelected(contact) {
		return computed(() => this.selection === contact).get();
	}

	@action	selectContact = (contact) => {
		this.selection = contact;
	}

	@action	selectTag = (tag) => {
		this.selection = tag;
	}

	@action	selectNothing = () => {
		this.selection = null;
	}

	@action	onHashChange = () => {
		const hash = window.location.hash;
		this.processingHashChange = true; // prevent adding new history entry!
		if (hash.indexOf(CONTACT_PATH) === 0) {
			this.selectContact(this.contactStore.findContactByName(hash.substr(CONTACT_PATH.length)));
		} else if (hash.indexOf(TAG_PATH) === 0) {
			this.selectTag(this.tagStore.findTagByName(hash.substr(TAG_PATH.length)));
		} else {
			this.selectNothing();
		}
		this.processingHashChange = false;
	}

	pushHistory(path) {
		if (!this.processingHashChange) {
			window.history.pushState(null, null, path);
		}
	}
}