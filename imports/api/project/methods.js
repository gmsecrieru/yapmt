import { Meteor } from 'meteor/meteor';

import { Project, Task } from '/imports/api/project/collections';

Meteor.methods({
  'project:remove'(id) {
    try {
      Project.remove({ _id: id })
      Task.remove({ project_id: id })
    } catch (e) {
      throw new Meteor.Error('Error while removing project');
    }

    return true;
  }
});
