import React from 'react';
import { _ } from 'meteor/underscore';

import MainLayout from './layouts/MainLayout.jsx';

class App extends React.Component {

  render() {
    const props = Object.assign({}, _.omit(this.props, ['view', 'layout']));
    return <this.props.layout {...props} view={ this.props.view } />
  }

}

App.propTypes = {
  layout: React.PropTypes.func,
  view: React.PropTypes.func.isRequired
};

App.defaultProps = {
  layout: MainLayout
};

export default App;
