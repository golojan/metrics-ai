import { Gender, LecturerType } from '../../../../libs/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions } from '../../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { Departments } = await dbCon();

      const department = await Departments.findOne({
        _id: id,
      }).catch(catcher);
      if (department) {
        res.status(200).json({
          status: true,
          data: department,
        });
      } else {
        res.status(400).json({ status: false, data: {} });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
