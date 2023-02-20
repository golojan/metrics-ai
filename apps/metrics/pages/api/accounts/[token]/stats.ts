import { ResponseFunctions } from '../../../../libs/interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { Accounts } = await dbCon();
      const account = await Accounts.aggregate([
        {
          $match: {
            _id: token,
          },
        },
        {
          $project: {
            _id: 0,
            firstname: 1,
            lastname: 1,
          },
        },
      ]).catch(catcher);
      console.log(account);
      // if (account[0]) {
      //   res.status(200).json({ status: true, account: account[0] });
      // } else {
      //   res.status(200).json({ status: false, err: 'No Account Found' });
      // }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
