import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Schools } = await dbCon();
      const schools = await Schools.find({ enabled: true }).catch(catcher);
      if (schools) {
        res.status(200).json({
          status: true,
          data: schools,
        });
      } else {
        res.status(404).json({ status: false, err: 'School not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
