import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.body;
      const { Accounts } = await dbCon();
      await Accounts.findOne({ _id: token })
        .then((account) => {
          if (account) {
            res.status(200).json({
              status: true,
              accid: account._id,
              picture: account.picture,
              email: account.email,
              mobile: account.mobile,
              firstname: account.firstname,
              lastname: account.lastname,
              role: account.role,
              accountType: account.accountType,
              country: account.country,
              enabled: account.enabled,
            });
          } else {
            res.status(404).json({ status: 0, err: 'Account not found' });
          }
        })
        .catch(catcher);
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
