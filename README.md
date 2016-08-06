# Yet Another Project Management Tool

## Requirements
- NodeJS v4
- MongoDB 3.2
- Meteor 1.4

## How to run it
- Quick & painless:
```bash
# install meteor
$ curl https://install.meteor.com/ | sh
# head into application dir and go for it it!
$ cd yapmt
$ chmod +x run.sh && ./run.sh
```

## YAPMT & MongoDB & Meteor
Meteor's default MongoDB instance runs on port 3001 in case you would like to query it. Keep in mind that this is only available while the application is running. If you would like to point this application to another MongoDB instance, you need to tweak a few environment defaults, e.g.:

```bash
$ export MONGO_URL=mongodb://[user]:[pwd]@[server]:[port]/[db_name]
$ export MONGO_OPLOG_URL=mongodb://[user]:[pwd]@[server]:[port]/local
$ ./run.sh
```

If you'd like to seed the database, you can set `YAPMT_SEED_DB` variable, e.g.:
```bash
$ YAPMT_SEED_DB=1 ./run.sh
```
Please keep in mind this will only work if `project` collection is empty.
