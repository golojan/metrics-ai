import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';
import validator from 'validator';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username } = req.body;
      if (validator.contains(username, '@')) {
        res.status(400).json({ status: false, error: 'Invalid Username' });
        return;
      }
      const { Accounts } = await dbCon();
      await Accounts.findOne({
        username: username,
      })
        .then((account) => {
          if (account) {
            res.status(200).json({ status: true, error: 'Username Exists' });
            return;
          } else {
            res.status(400).json({ status: false, error: 'Username id free' });
            return;
          }
        })
        .catch(catcher);
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
