import React from 'react';
import moment from 'moment';

class ProjectStatus extends React.Component {
  render() {
    const { tasks } = this.props;
    const {
      completed,
      late,
      total
    } = tasks.reduce((memo, item) => {
      if (item.completed) {
        memo.completed++
      } else if (moment(item.due_date).isBefore(moment(), 'day')) {
        memo.late++
      }

      return memo;
    }, { completed: 0, late: 0, total: tasks.length });

    return (
      <div className="project-status">
        <span className="project-status--completed">{ completed }</span>
        / <span className="project-status--late">{ late }</span>
        / <span className="project-status--total">{ total }</span>
      </div>
    );
  }
}

ProjectStatus.propTypes = {
  tasks: React.PropTypes.array
}

ProjectStatus.deaultProps = {
  tasks: []
}

export default ProjectStatus;
