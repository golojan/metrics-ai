import mongoose from "mongoose";

import Schools from "./src/schools.model";
import Accounts from "./src/accounts.model";
import Connections from "./src/connections.model";
import Owners from "./src/owners.model";
import Roles from "./src/roles.model";
import Indicators from "./src/indicators.model";
import Memberships from "./src/memberships.model";
import Lecturers from "./src/lecturers.model";
import Students from "./src/students.model";
import Faculties from "./src/faculties.model";
import Departments from "./src/departments.model";
import SchoolFaculties from "./src/school-faculties.model";
import SchoolDepartments from "./src/school-departments.model";
import PostFeeds from "./src/posts.model";
import PostFeedComments from "./src/comments.model";
import UserReactions from "./src/reactions.model";
import MRCs from "./src/mrcs.model";

const { MONGOOSE_URI } = process.env;

export const dbCon = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(MONGOOSE_URI as string)
    .then(() => {
      console.log("Mongoose Connection Established");
    })
    .catch((err) => console.log(err));
  return {
    Schools,
    Accounts,
    Connections,
    Owners,
    Roles,
    Indicators,
    Memberships,
    Lecturers,
    Students,
    Faculties,
    Departments,
    SchoolFaculties,
    SchoolDepartments,
    PostFeeds,
    PostFeedComments,
    UserReactions,
    MRCs,
  };
};
