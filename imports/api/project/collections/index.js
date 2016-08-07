import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Disclaimer:
 *
 * For simplicity's sake, we are allowing these operations to be performed
 * on the client-side with no particular restriction (e.g. logged user, ACLs etc.),
 * thus afore mentioned operations will be sync'ed with the server automatically.
 */
const collectionInteractionRules = {
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
}

const Project = new Mongo.Collection('project');
Project.attachSchema(new SimpleSchema({
  name: { type: String }
}));
Project.allow(Object.assign({}, collectionInteractionRules));

export { Project };

const Task = new Mongo.Collection('task');
Task.attachSchema(new SimpleSchema({
  'project_id': { type: String },
  'description': { type: String },
  'due_date': { type: Date },
  'owner': { type: String },
  'completed': { type: Boolean }
}));
Task.allow(Object.assign({}, collectionInteractionRules));

export { Task }

export default {
  Project,
  Task
};
