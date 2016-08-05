import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

class ProjectBox extends React.Component {

  constructor() {
    super();

    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  render() {
    const { project } = this.props;
    const { tasks = [] } = project;

    return (
      <div className="project-box" onClick={ this.handleBoxClick }>
        <div className="project-box__content">
          <h3>{ project.name }</h3>
          <small>{ `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}` }</small>
        </div>
        <div className="project-box__actions">
          <i>Remove</i>
        </div>
      </div>
    );
  }

  handleBoxClick(e) {
    if (!e.target.matches('i')) {
      return FlowRouter.go('project-by-id', { id: this.props.project._id });
    }
  }

}

ProjectBox.propTypes = {
  project: React.PropTypes.object.isRequired
}

export default ProjectBox;
