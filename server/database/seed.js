// use front-tools;
db.createCollection("auths");
db.createCollection("users");
db.createCollection("cases");
db.createCollection("blogs");

db.createUser({
  user: "root",
  pwd: "3d9612ad3cfcf07f0b0cd2b5c3ffabf8",
  roles: [{role: "root", db: "admin"}]
})

db.createUser({
  user: "psx",
  pwd: "d1fdd9764212a7e4ce78cff0b9f5b99a",
  roles: [{role: "readWrite", db: "front-tools"}]
})