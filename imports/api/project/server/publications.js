import { Meteor } from 'meteor/meteor';

import { Project } from '/imports/api/project/collections';

export const projectList = Meteor.publish('projectList', () => {
  return Project.find();
});
