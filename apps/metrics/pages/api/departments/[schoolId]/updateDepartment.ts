import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions } from '../../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { _id, departmentName, departmentCode, departmentDescription } =
        req.body;

      const { SchoolDepartments } = await dbCon();
      const saved = await SchoolDepartments.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          departmentName: departmentName,
          departmentCode: departmentCode,
          departmentDescription: departmentDescription,
        }
      ).catch(catcher);
      if (saved) {
        res.status(200).json({
          status: true,
          ...saved,
        });
      } else {
        res
          .status(404)
          .json({ status: false, err: 'Department Updating failed' });
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
