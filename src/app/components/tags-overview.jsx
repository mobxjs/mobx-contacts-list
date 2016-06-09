import React from 'react';
import {observer} from 'mobx-react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const TagOverviewEntry = observer(({tag, viewState}) => <ListItem
	primaryText={tag.name}
	onClick={() => viewState.selectTag(tag) }
	className={viewState.selection === tag ? 'selected' : null}
/>)

export const TagsOverview = observer(({tagStore, viewState}) =>
	<List>
		<Subheader>Tags</Subheader>
		{ tagStore.tags.map(tag =>
			<TagOverviewEntry key={tag.id} tag={tag} viewState={viewState} />
		) }
	</List>
);