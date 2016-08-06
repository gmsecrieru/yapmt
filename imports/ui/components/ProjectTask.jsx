import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { Task } from '/imports/api/project/collections';

export default class ProjectTask extends React.Component {

  constructor() {
    super();

    this.handleComplete = this.handleComplete.bind(this);
  }

  render() {
    const { task } = this.props;
    const { description, owner, completed } = task;
    const momentDueDate = moment(task.due_date);

    const classes = [
      'project-task',
      { completed },
      { late: !completed && momentDueDate.isBefore(moment(), 'day') }
    ];

    const [
      matchTerm,
      labelDate = momentDueDate.format('M/D')
    ] = momentDueDate.calendar().match(/(today|tomorrow|yesterday)/i) || [];

    return (
      <div className={ classNames(classes) }>
        <input type="checkbox" name="completed" checked={ completed } onChange={ this.handleComplete } />
        <label>{ `${description}, @${owner}, ${labelDate}` }</label>
      </div>
    );
  }

  handleComplete(e) {
    Task.update(this.props.task._id, { $set: { completed: e.target.checked } });
  }
}
