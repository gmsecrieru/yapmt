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
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
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
          onKeyUp={ this.handleOnKeyUp }
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

    // escape key
    if (keyCode === 27) {
      return this.tearDownComponent();
    } else if (keyCode === 13) { // enter key
      e.preventDefault();
      return false;
    }
  }

  tearDownComponent() {
    Session.set('addNewTask', false);
  }

  createNewTask(value = '') {
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
      const momentDueDate = moment(dueDate, 'M/D');
      if (momentDueDate.isValid()) {
        task.due_date = new Date(momentDueDate.toISOString());
      } else {
        return false;
      }
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

  handleOnKeyUp(e) {
    const { keyCode } = e;
    const { selectionStart, selectionEnd, value } = e.target;
    const hasContentSelected = selectionStart !== selectionEnd;

    switch (keyCode) {

      // delete/backspace
      case 8:
      case 46:
        break;

      // enter key
      case 13:
        e.preventDefault();
        // move cursor to the end if there is any selected content
        if (hasContentSelected) {
          e.target.value = '';
          e.target.value = value;
        } else if (value && this.createNewTask(value)) { // otherwise attempt to save task
          e.target.value = '';
        }
        break;

      // autocomplete logic
      default:
        const cursorAtTheEndAndContentNotSelected = !hasContentSelected && selectionStart === value.length;
        const [
          matchTerm,
          matchOwner = ''
        ] = value.match(/,\s?\@([^ ,]+)$/) || [];

        // tries autocomplete only if cursor is at the end of the textarea
        if (matchOwner && cursorAtTheEndAndContentNotSelected) {
          const collection = require('/imports/api/project/collections/client').OwnerNames;
          const record = collection.findOne({ name: new RegExp(`^${matchOwner}`, 'i') }, { sort: { name: 1 }});

          // replace regexp match with first matching document
          if (record) {
            const newValue = value.replace(new RegExp(`${matchOwner}$`), record.name);
            e.target.value = newValue;
            e.target.selectionStart = value.length;
            e.target.selectionEnd = newValue.length;
          }
        }
        break;
    }
  }

}
