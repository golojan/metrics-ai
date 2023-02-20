import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';
import { getCookie } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const domain = getCookie('domain', { req, res });
      const { Lecturers } = await dbCon();
      const count = await Lecturers.countDocuments({ domain: domain }).catch(
        catcher
      );
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
