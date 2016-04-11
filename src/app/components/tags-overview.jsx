import React from 'react';
import {observer} from 'mobx-react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Subheader from 'material-ui/lib/Subheader';

export const TagsOverview = observer(({tagStore, viewState}) =>
	<List>
		<Subheader>Tags</Subheader>
		{ tagStore.tags.map(tag =>
			<ListItem
				key={tag.id}
				primaryText={tag.name}
				onClick={() => viewState.selectTag(tag) }
				style={{ backgroundColor: viewState.selectTag === tag ? 'rgba(0,0,0,0.2)' : null }}
			/>
		) }
	</List>
);