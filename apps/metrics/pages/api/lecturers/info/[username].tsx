import {
  Gender,
  LecturerLevel,
  LecturerType,
  ResponseFunctions,
} from '../../../../libs/interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username } = req.query;
      const { Lecturers } = await dbCon();
      const lecturer = await Lecturers.findOne({ username: username });
      console.log(lecturer);
      if (lecturer) {
        res.status(200).json({
          status: true,
          data: lecturer,
        });
      } else {
        res.status(400).json({ status: false, error: 'No Lecturer Found' });
      }
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(404)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
