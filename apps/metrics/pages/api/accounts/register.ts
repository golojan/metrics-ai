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
      const {
        mrcId,
        regId,
        username,
        accountType,
        firstname,
        lastname,
        middlename,
        email,
        gender,
        password,
        schoolId,
        facultyId,
        departmentId,
        birthday,
      } = req.body;
      const { Accounts, MRCs } = await dbCon();

      // Encrypt Password//
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Encrypt Password//

      const created = await Accounts.create({
        username: username,
        mrcId: mrcId,
        staffNumber: regId,
        email: email,
        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        accountType: accountType,
        gender: gender,
        passwordKey: password,
        password: hashedPassword,
        schoolId: schoolId,
        departmentId: departmentId,
        facultyId: facultyId,
        birthday: birthday,
      }).catch(catcher);
      if (created) {
        // Update MRCS //
        MRCs.findOneAndUpdate(
          { mrcId: created.mrcId },
          {
            mrcUsed: true,
            enabled: false,
          }
        )
          .then((updated) => {
            res
              .status(200)
              .json({ status: true, token: created._id, mrcId: updated.mrcId });
          })
          .catch(catcher);
        return;
      } else {
        res.status(404).json({ status: false, err: 'Error creating account' });
        return;
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
