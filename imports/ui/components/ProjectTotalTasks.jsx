import React from 'react';

class ProjectTotalTasks extends React.Component {
  render() {
    const { total } = this.props;

    return <small>{ `${total} ${total === 1 ? 'task' : 'tasks'}` }</small>
  }
}

ProjectTotalTasks.defaultProps = {
  total: 0
}

export default ProjectTotalTasks
