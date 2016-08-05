import React from 'react';
import ReactDOM from 'react-dom';

import NewProjectOverlay from '/imports/ui/components/NewProjectOverlay.jsx';

export default class CreateNewProject extends React.Component {
  constructor() {
    super();

    this.handleNewProject = this.handleNewProject.bind(this);
  }

  render() {
    return (
      <div className="create-new-project">
        <a className="create-new-project__action" title="create new project" onClick={ this.handleNewProject }>Add project</a>
      </div>
    );
  }

  handleNewProject(e) {
    e.preventDefault();

    ReactDOM.render(
      <NewProjectOverlay />,
      document.getElementById('new-project-overlay-container')
    );
  }
}
