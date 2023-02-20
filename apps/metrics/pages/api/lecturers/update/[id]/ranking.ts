import {
  Gender,
  LecturerLevel,
  LecturerType,
  ResponseFunctions,
} from '../../../../../libs/interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../../libs/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { citations, hindex, i10hindex } = req.body;
      console.log(req.body);

      const { Lecturers } = await dbCon();

      const updated = await Lecturers.updateOne(
        { _id: id },
        {
          citations: citations,
          hindex: hindex,
          i10hindex: i10hindex,
        }
      );
      if (updated) {
        res.status(200).json({
          status: true,
          data: updated,
        });
      } else {
        res.status(400).json({ status: false, error: 'No Ranking updated' });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(404)
        .json({ status: false, err: 'Only POST Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
