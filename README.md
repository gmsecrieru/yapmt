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

If you'd like to seed the database, simply run:
```bash
$ YAPMT_SEED_DB=1 ./run.sh
```
Please notice that this will only work if `project` collection is empty.
