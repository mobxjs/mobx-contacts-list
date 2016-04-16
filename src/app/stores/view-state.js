import {observable, when, autorun} from 'mobx';
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
}