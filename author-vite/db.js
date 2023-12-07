import { MongoClient } from "mongodb";

let dbConnection;

export default function connectToDb(cb) {
  MongoClient.connect("mongodb://localhost:27017/league")
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb();
    });
}

export function getDb() {
  return dbConnection;
}
