import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const domain = req.body.domain;
      const { Schools } = await dbCon();
      const school = await Schools.findOne({ domain: domain }).catch(catcher);
      if (school) {
        res.status(200).json({
          status: true,
          domain: domain,
          schoolId: school._id,
          data: school,
        });
      } else {
        res.status(400).json({ status: false });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
