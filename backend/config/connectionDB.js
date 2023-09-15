import mongoose from "mongoose";
import chalk from "chalk";
// mogodb connection >>>>>>>>>>>>>>>>>>>>>>>>>

const connectionDb = () => {
  mongoose.connect(
    process.env.URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(chalk.bgWhite.red("not connected to mongo db"));
      } else {
        console.log(chalk.green("successfully connected to mongodb"));
      }
    }
  );
};
// mogodb connection >>>>>>>>>>>>>>>>>>>>>>>>>
export default connectionDb;
