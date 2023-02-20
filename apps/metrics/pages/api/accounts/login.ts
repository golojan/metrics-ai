import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../libs/models';
import { ResponseFunctions } from '../../../libs/interfaces';
import bcrypt from 'bcryptjs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username, password } = req.body;
      const { Accounts } = await dbCon();
      await Accounts.findOne({
        email: username,
      })
        .then((account: any) => {
          if (account._id) {
            const isPasswordValid = bcrypt.compareSync(
              password,
              account.password
            );
            if (isPasswordValid) {
              res.status(200).json({
                status: true,
                token: account._id,
                username: account.username,
                schoolId: account.schoolId,
              });
            } else {
              res.status(400).json({ status: false });
            }
          } else {
            res.status(400).json({ status: false });
          }
        })
        .catch(catcher);
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
