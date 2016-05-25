import * as superagent from 'superagent';
import {observable, computed, action} from "mobx";

export class Tag {
    id;
    @observable name;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class TagStore {
    @observable tags = [];
    tagId = 0;

	@action findOrCreateTag(name: string) {
        let tag = this.tags.find(tag => tag.name === name);
        if (tag)
            return tag;
        tag = new Tag(++this.tagId, name);
        this.tags.push(tag);
        return tag;
    }

    findTagByName(name) {
        return this.tags.find(tag => tag.name === name);
    }
}

export function isTag(object) {
	return object instanceof Tag;
}