import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Project = new Mongo.Collection('project');
Project.attachSchema(new SimpleSchema({
  name: { type: String }
}));
export { Project };

const Task = new Mongo.Collection('task');
Task.attachSchema(new SimpleSchema({
  'project_id': { type: String },
  'description': { type: String },
  'due_date': { type: Date },
  'owner': { type: String },
  'completed': { type: Boolean },

}));
export { Task }

export default {
  Project,
  Task
};
