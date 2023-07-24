import mongoose from "mongoose";
import chalk from "chalk";
// mogodb connection >>>>>>>>>>>>>>>>>>>>>>>>>
const url = "mongodb://localhost:27017/trainproject";
const connectionDb = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("not connected to mongo db");
      } else {
        console.log(chalk.green("successfully connected to mongodb"));
      }
    }
  );
};
// mogodb connection >>>>>>>>>>>>>>>>>>>>>>>>>
export default connectionDb;
