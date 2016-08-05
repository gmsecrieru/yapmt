import { Meteor } from 'meteor/meteor';

import { Project, Task } from '/imports/api/project/collections';

export const projectList = Meteor.publish('projectList', () => {
  return Project.find();
});

export const projectById = Meteor.publish('projectById', (id) => {
  return Project.find({ _id: id });
});

export const tasksByProjectId = Meteor.publish('tasksByProjectId', (id) => {
  return Task.find({ project_id: id }, { sort: { due_date: 1 } });
});
