import { Meteor } from 'meteor/meteor';

import { Project, Task } from '/imports/api/project/collections';

export const projectList = Meteor.publish('projectList', () => {
  return Project.find({}, { sort: { name: 1 }});
});

export const projectById = Meteor.publish('projectById', (id) => {
  return Project.find({ _id: id });
});

export const tasksByProjectId = Meteor.publish('tasksByProjectId', (id) => {
  return Task.find({ project_id: id }, { sort: { due_date: 1 } });
});

export const ownerNames = Meteor.publish('ownerNames', function(id) {
  const sub = this;
  const cursor = Task.find({}, { sort: { owner: 1 }, fields: { owner: 1 } });
  cursor.observe({
    added(doc) {
      sub.added('ownerNames', doc._id, { name: doc.owner })
    }
  });

  return cursor;
});
