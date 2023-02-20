import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const mrcId = req.body.mrcId;
      const { MRCs } = await dbCon();
      const mrcs = await MRCs.findOne({ mrcId: mrcId }).catch(catcher);
      if (mrcs) {
        res.status(200).json({
          status: true,
          data: mrcs,
        });
      } else {
        res.status(400).json({ status: false, error: 'MRCID does not exist' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
