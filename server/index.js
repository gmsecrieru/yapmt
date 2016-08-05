import { Meteor } from 'meteor/meteor';

import { Project, Task } from '/imports/api/project/collections';

// import project publication for client-server data sync
import '/imports/api/project/server/publications';

Meteor.startup(() => {
  // seed database on request (only if empty)
  if (process.env.YAPMT_SEED_DB && !Project.find().count()) {
    console.log('[yapmt] seeding DB...');
    const nowMoment = require('moment')();

    const projects = [
      {
        name: 'Project One',
        tasks: [
          { description: 'Create base project', due_date: new Date(nowMoment.add(10, 'days').toISOString()), owner: 'John', completed: false },
          { description: 'List projects', due_date: new Date(nowMoment.add(12, 'days').toISOString()), owner: 'George', completed: false },
          { description: 'Define styles and other stuff', due_date: new Date(nowMoment.add(15, 'days').toISOString()), owner: 'Jane', completed: false }
        ]
      },
      {
        name: 'New website',
        tasks: [
          { description: 'Hire designer', due_date: new Date(nowMoment.toISOString()), owner: 'Harry', completed: true },
          { description: 'Approve new layout', due_date: new Date(nowMoment.add(1, 'days').toISOString()), owner: 'Stan', completed: true },
          { description: 'Implement front-end assets', due_date: new Date(nowMoment.add(5, 'days').toISOString()), owner: 'Donna', completed: false },
          { description: 'Deploy final version', due_date: new Date(nowMoment.add(10, 'days').toISOString()), owner: 'Donna', completed: false }
        ]
      }
    ]

    projects.forEach((item) => {
      try {
        const { name, tasks } = item;
        const id = Project.insert({ name });
        if (id) {
          tasks.forEach((task) => {
            Task.insert({ ...task, 'project_id': id });
          });
        }
        console.log('[yapmt] added project _id =', id);
      } catch (e) {
        console.log('[yapmt] error during insert: ', e);
      }
    });
  }
});
