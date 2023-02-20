import { NextApiRequest, NextApiResponse } from 'next';
import {
  ResponseFunctions,
  AccountTypes,
  AccountRoles,
} from '../../../libs/interfaces';
import { dbCon } from '../../../libs/models';

import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Accounts } = await dbCon();

      // Encrypt Password//
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('admin', salt);
      // Encrypt Password//

      const account = await Accounts.create({
        schoolId: '63c7ca3d019a5de4d1ce206d',
        accountType: AccountTypes.ADMIN,
        username: 'appadmin',
        email: 'agu.chux@gmail.com',
        firstname: 'Agu',
        lastname: 'Chux',
        mobile: '07068573376',
        role: AccountRoles.VC,
        enabled: true,
        password: hashedPassword,
      }).catch(catcher);

      if (account) {
        res.status(200).json({
          status: true,
          accid: account._id,
          schoolid: account.schoolId,
        });
      } else {
        res
          .status(400)
          .json({ status: false, err: 'Failed to create Account' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
