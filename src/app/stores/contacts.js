import * as superagent from 'superagent';
import {observable, computed} from "mobx";
import tagsStore from './tags';

class Contact {
    id;
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

    @computed get displayName() {
        const cfl = capitalizeFirstLetter;
        return `${cfl(this.title)}. ${cfl(this.firstName)} ${cfl(this.lastName)}`;
    }

    constructor(id, name, username, picture) {
        this.id = id;
        this.title = name.title;
        this.firstName = name.first;
        this.lastName = name.last;
        this.username = username;
        this.picture = picture;
    }

    addTag(name) {
        this.tags.push(tagsStore.findOrCreateTag(name));
    }

    updateFirstName(firstName) {
        this.firstName = firstName;
    }

    updateLastName(lastName) {
        this.lastName = lastName;
    }
}

class ContactStore {
    @observable contacts = [];
    @observable pendingRequestCount = 0;

    @computed get isLoading() {
        return this.pendingRequestCount > 0;
    }

    createRandomContact() {
        this.pendingRequestCount++;
        setTimeout(() => {
            superagent
                .get('https://randomuser.me/api/')
                .set('Accept', 'application/json')
                .end((error, results) => {
                    if (error)
                        console.error(error);
                    else {
                        const data = results.body.results[0].user;
                        const contact = new Contact(data.dob, data.name, data.username, data.picture)
                        contact.addTag('random-user');
                        this.contacts.push(contact);
                        this.pendingRequestCount--;
                    }
                });
        }, /*100*/0); // additional delay, for fun
    }

    loadContacts() {
        for (let i = 0; i < 3; i++)
            this.createRandomContact();
    }

    getContacts() {
        return contacts.slice();
    }
}

export default new ContactStore();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
