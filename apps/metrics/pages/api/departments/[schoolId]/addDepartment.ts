import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions } from '../../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const {
        facultyId,
        departmentId,
        departmentName,
        departmentCode,
        departmentDescription,
      } = req.body;

      const { SchoolDepartments, Departments } = await dbCon();

      if (departmentId) {
        //Edit existing department
        const department = await SchoolDepartments.findOne({
          schoolId: schoolId,
          departmentId: departmentId,
          facultyId: facultyId,
        }).catch(catcher);
        if (department) {
          res.status(200).json({
            status: true,
            ...department,
          });
        } else {
          const created = await SchoolDepartments.create({
            schoolId: schoolId,
            facultyId: facultyId,
            departmentId: departmentId,
            departmentName: departmentName,
            departmentCode: departmentCode,
            departmentDescription: departmentDescription
              ? departmentDescription
              : '',
          }).catch(catcher);
          if (created) {
            res.status(200).json({
              status: true,
              ...created,
            });
          } else {
            res
              .status(404)
              .json({ status: false, err: 'Faculty creation failed' });
          }
        }
      } else {
        //Create new department globally and add to school
        const created = await Departments.create({
          name: departmentName,
          shortname: departmentCode,
          description: departmentDescription ? departmentDescription : '',
        }).catch(catcher);
        if (created) {
          // Add department to school
          const createdSchoolDepartment = await SchoolDepartments.create({
            schoolId: schoolId,
            facultyId: facultyId,
            departmentId: created._id,
            departmentName: departmentName,
            departmentCode: departmentCode,
            departmentDescription: departmentDescription
              ? departmentDescription
              : '',
          }).catch(catcher);
          if (createdSchoolDepartment) {
            res.status(200).json({
              status: true,
              ...createdSchoolDepartment,
            });
          } else {
            res
              .status(404)
              .json({ status: false, err: 'Department creation failed' });
          }
        } else {
          res
            .status(404)
            .json({ status: false, err: 'Department creation failed' });
        }
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only POST Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
