import * as superagent from 'superagent';
import {observable, computed, autorunAsync, action} from "mobx";

const STORAGE_PREFIX = "mobx-contacts.";

class Contact {
	@observable title;
	@observable firstName;
	@observable lastName;
	@observable username;

	@observable picture = {
		thumbnail: null,
		medium: null,
		large: null,
	};

	@observable tags = [];
	@observable isDeleted = false;

	_saveHandle;

	constructor(store, id, name, username, picture) {
		this.store = store;
		this.id = id;
		this.title = name.title;
		this.firstName = name.first;
		this.lastName = name.last;
		this.username = username;
		this.picture = picture;

		// automatically store item in local storage, debounce each second
		this._saveHandle = autorunAsync(() => {
			window.localStorage.setItem(STORAGE_PREFIX + this.id, JSON.stringify(this.asJSON));
		}, 1000);
	}

	@computed get displayName() {
		const cfl = capitalizeFirstLetter;
		return `${cfl(this.title)}. ${cfl(this.firstName)} ${cfl(this.lastName)}`;
	}

	@computed get asJSON() {
		return {
			id: this.id,
			username: this.username,
			name: {
				title: this.title,
				first: this.firstName,
				last: this.lastName,
			},
			picture: this.picture,
			tags: this.tags.map(tag => tag.name),
		}
	}

	getAvailableTags() {
		return this.store.tagStore.tags.filter(tag => this.tags.indexOf(tag) === -1);
	}

	@action	addTag(name) {
		this.tags.push(this.store.tagStore.findOrCreateTag(name));
	}

	@action	updateFirstName(firstName) {
		this.firstName = firstName;
	}

	@action	updateLastName(lastName) {
		this.lastName = lastName;
	}

	@action	delete() {
		this._saveHandle(); // stop saving future changes
		this.store.removeContact(this);
	}
}

export class ContactStore {
	tagStore;
	@observable contacts = [];
	@observable pendingRequestCount = 0;
	@observable hasLoadedInitialData = false;

	constructor(tagStore) {
		this.tagStore = tagStore;
	}

	@computed get isLoading() {
		return this.pendingRequestCount > 0;
	}

	@action	createRandomContact() {
		this.pendingRequestCount++;
		superagent
			.get('https://randomuser.me/api/')
			.set('Accept', 'application/json')
			.end(action("createRandomContact-callback", (error, results) => {
				if (error)
					console.error(error);
				else {
					const data = JSON.parse(results.text).results[0];
					const contact = new Contact(this, data.dob, data.name, data.login.username, data.picture)
					contact.addTag('random-user');
					this.contacts.push(contact);
					this.pendingRequestCount--;
				}
			}));
	}

	@action	loadContacts() {
		for (let i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i);
			if (key.indexOf(STORAGE_PREFIX) === 0) {
				const json = JSON.parse(window.localStorage.getItem(key));
				const contact = new Contact(this, json.id, json.name, json.username, json.picture);
				json.tags.forEach(tagName => contact.addTag(tagName));
				this.contacts.push(contact);
			}
		}

		// Create random contacts if there are none
		if (this.contacts.length === 0)
			for (let i = 0; i < 3; i++)
				this.createRandomContact();
		
		this.hasLoadedInitialData = true;
	}

	@action	removeContact(contact) {
		window.localStorage.removeItem(STORAGE_PREFIX + contact.id);
		this.contacts.remove(contact);
	}

	getContacts() {
		return this.contacts.slice();
	}

	findContactByName(name) {
		return this.contacts.find(contact => contact.username === name);
	}

}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isContact(object) {
	return object instanceof Contact;
}