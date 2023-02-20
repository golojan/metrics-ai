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
      const { facultyId, facultyName, facultyCode, facultyDescription } =
        req.body;
      const { SchoolFaculties, Faculties } = await dbCon();

      if (facultyId) {
        //Edit existing faculty
        const faculty = await SchoolFaculties.findOne({
          schoolId: schoolId,
          facultyId: facultyId,
        }).catch(catcher);
        if (faculty) {
          res.status(200).json({
            status: true,
            ...faculty,
          });
        } else {
          const created = await SchoolFaculties.create({
            schoolId: schoolId,
            facultyId: facultyId,
            facultyName: facultyName,
            facultyCode: facultyCode,
            facultyDescription: facultyDescription ? facultyDescription : '',
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
        //Create new faculty globally and add to school
        const created = await Faculties.create({
          name: facultyName,
          shortname: facultyCode,
          description: facultyDescription ? facultyDescription : '',
        }).catch(catcher);
        if (created) {
          // Add faculty to school
          const createdSchoolFaculty = await SchoolFaculties.create({
            schoolId: schoolId,
            facultyId: created._id,
            facultyName: facultyName,
            facultyCode: facultyCode,
            facultyDescription: facultyDescription ? facultyDescription : '',
          }).catch(catcher);
          if (createdSchoolFaculty) {
            res.status(200).json({
              status: true,
              ...createdSchoolFaculty,
            });
          } else {
            res
              .status(404)
              .json({ status: false, err: 'Faculty creation failed' });
          }
        } else {
          res
            .status(404)
            .json({ status: false, err: 'Faculty creation failed' });
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
