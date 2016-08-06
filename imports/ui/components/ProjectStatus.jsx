import React from 'react';
import moment from 'moment';

class ProjectStatus extends React.Component {
  render() {
    const { tasks } = this.props;
    const status = tasks.reduce((memo, item) => {
      if (item.completed) {
        memo.completed++
      } else if (moment(item.due_date).isBefore(moment(), 'day')) {
        memo.late++
      }

      return memo;
    }, { completed: 0, late: 0, total: tasks.length });

    return (
      <div className="project-status">
        <div>Completed: <i>{ status.completed }</i></div>
        <div>Late: <i>{ status.late }</i></div>
        <div>Total: <i>{ status.total }</i></div>
      </div>
    )
  }
}

ProjectStatus.propTypes = {
  tasks: React.PropTypes.array
}

ProjectStatus.deaultProps = {
  tasks: []
}

export default ProjectStatus;
