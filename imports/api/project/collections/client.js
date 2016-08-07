import { Mongo } from 'meteor/mongo';

export const OwnerNames = new Mongo.Collection('ownerNames');

export default {
  OwnerNames
};
