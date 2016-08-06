import React from 'react';
import ReactDOM from 'react-dom';
import _s from 'underscore.string';
import autosize from 'autosize';
import moment from 'moment';

import { Task } from '/imports/api/project/collections';

export default class NewProjectTask extends React.Component {
  constructor() {
    super();

    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.tearDownComponent = this.tearDownComponent.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
  }

  componentDidMount() {
    const taskInput = ReactDOM.findDOMNode(this.refs.taskInput);
    taskInput.focus();
    taskInput.scrollIntoView();
    autosize(taskInput);
  }

  render() {
    return (
      <div className="project-task project-task__new-task">
        <input type="checkbox" name="completed" />
        <textarea
          name="task"
          placeholder="type new task, @owner, M/d"
          ref="taskInput"
          onBlur={ this.handleOnBlur }
          onKeyDown={ this.handleOnKeyDown }
        />
      </div>
    );
  }

  handleOnBlur(e) {
    const { value } = e.target;
    if (!value) {
      this.tearDownComponent();
    }
  }

  handleOnKeyDown(e) {
    const { keyCode } = e;
    const { value } = e.target;
    console.log('[handleOnKeyDown]', keyCode, value);

    // escape key
    if (keyCode === 27) {
      return this.tearDownComponent();
    } else if (keyCode === 13 && value) { // enter key
      e.preventDefault();
      if (this.createNewTask(value)) {
        e.target.value = '';
      }
    }
  }

  tearDownComponent() {
    Session.set('addNewTask', false);
  }

  createNewTask(value = '') {
    console.log('[createNewTask]', value);
    // this regex allows descriptions with @ and commas
    const [
      matchTerm,
      ...taskData
    ] = _s.stripTags(value.replace(/(\n|\r)/g, '')).match(/^(.+)\s?,\s?\@([^ ,]+)\s?,\s?(\d{1,2}\/\d{1,2}|tomorrow)$/) || [];

    if (!taskData.length) {
      return false;
    }

    const [
      description,
      owner,
      dueDate
    ] = taskData;

    const task = { description, owner, completed: false };
    if (dueDate === 'tomorrow') {
      task.due_date = new Date(moment().add(1, 'day').toISOString());
    } else {
      task.due_date = new Date(moment(dueDate, 'M/D').toISOString());
    }

    task.project_id = this.props.project_id;

    let taskId;
    try {
      taskId = Task.insert(task);
    } catch (e) {
      toastr.error('Error while adding task.');
    }

    return taskId;
  }
}
