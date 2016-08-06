import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import React from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

import NewProjectOverlay from '/imports/ui/components/NewProjectOverlay.jsx';

export default class ActionBar extends React.Component {
  constructor() {
    super();

    this.handleNewProject = this.handleNewProject.bind(this);
    this.handleProjectsList = this.handleProjectsList.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
  }

  render() {
    const { id } = this.props;
    const actions = [];
    if (id) {
      actions.push({
        className: 'action-bar__action action-bar__action--list',
        title: 'Back to list',
        onClick: this.handleProjectsList
      });
      actions.push({
        className: 'action-bar__action action-bar__action--task',
        title: 'Add task',
        onClick: this.handleNewTask
      });
    }

    return (
      <div className="action-bar">
        {
          actions.map((item, index) => {
            return <a key={ index } {...item}>{ item.title }</a>;
          })
        }
        <a className="action-bar__action action-bar__action--project" title="create new project" onClick={ this.handleNewProject }>Add project</a>
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

  handleProjectsList(e) {
    FlowRouter.go('index');
  }

  handleNewTask(e) {
    Session.set('addNewTask', true);
  }

}
