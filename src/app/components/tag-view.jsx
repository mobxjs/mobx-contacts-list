/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observable, toJSON} from 'mobx';
import {observer} from 'mobx-react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import LeftNav from 'material-ui/lib/left-nav';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';

@observer
export class TagView extends React.Component {
  render() {

    const {tag} = this.props;
    return  <Card style={{ margin: 40, marginLeft: 460 }}>
        <CardTitle
          title={`Tag ${tag.name}`}
        />
        <CardText>
          <TextField
              floatingLabelText="Tag name"
              defaultValue={tag.name}
              onChange={e => tag.name = e.target.value }
          />
        </CardText>
      </Card>
  }
}
