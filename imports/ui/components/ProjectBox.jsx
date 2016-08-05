import React from 'react';

class ProjectBox extends React.Component {
  render() {
    const { project } = this.props;
    const { tasks = [] } = project;

    return (
      <div className="project-box">
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
}

ProjectBox.propTypes = {
  project: React.PropTypes.object.isRequired
}

export default ProjectBox;
