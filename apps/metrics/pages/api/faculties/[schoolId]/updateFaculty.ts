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
      const { SchoolFaculties } = await dbCon();
      const updated = await SchoolFaculties.findOneAndUpdate(
        {
          facultyId: facultyId,
          schoolId: schoolId,
        },
        {
          facultyName: facultyName,
          facultyCode: facultyCode,
          facultyDescription: facultyDescription,
        }
      ).catch(catcher);
      if (updated) {
        res.status(200).json({
          status: true,
          ...updated,
        });
      } else {
        res.status(404).json({ status: false, err: 'Faculty Updating failed' });
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
