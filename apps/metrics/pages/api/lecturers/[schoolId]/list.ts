import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions, AccountTypes } from '../../../../libs/interfaces';

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
      const { schoolId } = req.query;
      const { Accounts } = await dbCon();
      const lecturers = await Accounts.find({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
      }).catch(catcher);
      if (lecturers) {
        res.status(200).json({
          status: true,
          data: lecturers,
        });
      } else {
        res.status(404).json({ status: false, err: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
