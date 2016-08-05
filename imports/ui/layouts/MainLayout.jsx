import React from 'react';
import { _ } from 'meteor/underscore';

class MainLayout extends React.Component {

  render() {
    const props = Object.assign({}, _.omit(this.props, ['view', 'viewProps']), this.props.viewProps);

    return (
      <div className="main-layout">
        <this.props.view {...props} />
      </div>
    );
  }

}

MainLayout.propTypes = {
  view: React.PropTypes.func.isRequired
}

MainLayout.defaultProps = {
  viewProps: {}
}

export default MainLayout