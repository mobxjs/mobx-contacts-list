import React from 'react';
import {observer} from 'mobx-react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';

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