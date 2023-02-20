import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions } from '../../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const {
        firstname,
        lastname,
        middlename,
        aboutMe,
        gender,
        birthday,
        mobile,
        departmentId,
      } = req.body;

      console.log(mobile);

      const { Accounts } = await dbCon();
      const account = await Accounts.findOneAndUpdate(
        { _id: token },
        {
          firstname: firstname,
          lastname: lastname,
          mobile: mobile,
          middlename: middlename,
          aboutMe: aboutMe,
          gender: gender,
          birthday: birthday,
          departmentId: departmentId,
        }
      ).catch(catcher);

      if (account) {
        res.status(200).json({ status: true, token: account._id });
      } else {
        res.status(400).json({ status: false, err: 'Account Not Found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
