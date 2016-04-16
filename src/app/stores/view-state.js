import {observable} from 'mobx';
/**
 * Class responsible for the currently selected element
 */
export class ViewState {
	@observable selection = null;
}