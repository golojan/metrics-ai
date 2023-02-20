import { Gender, LecturerType } from '../../../../libs/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions } from '../../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { SchoolDepartments } = await dbCon();

      const gs_results: any = await SchoolDepartments.aggregate([
        { $match: { schoolId: String(schoolId) } },
        {
          $group: {
            _id: '$schoolId',
            totalAccounts: { $sum: 1 },
            totalAccreditations: {
              $sum: {
                $cond: [{ $eq: ['$fullAccreditation', true] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: '$_id',
            totalAccounts: 1,
            totalAccreditations: 1,
          },
        },
        {
          $project: {
            _id: 0,
            totalAccounts: 1,
            totalAccreditations: 1,
            fullAccreditation: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$totalAccounts', 0] },
                    { $eq: ['$totalAccreditations', 0] },
                  ],
                },
                then: 0,
                else: {
                  $multiply: [
                    {
                      $divide: ['$totalAccreditations', '$totalAccounts'],
                    },
                    100,
                  ],
                },
              },
            },
            total: {
              $avg: [
                '$citationsPerCapita',
                '$hindexPerCapita',
                '$i10hindexPerCapita',
              ],
            },
          },
        },
      ]).catch(catcher);
      if (gs_results[0]) {
        res.status(200).json({
          status: true,
          totalAccounts: gs_results[0].totalAccounts,
          totalAccreditations: gs_results[0].totalAccreditations,
          fullAccreditation: gs_results[0].fullAccreditation,
        });
      } else {
        res.status(200).json({
          status: true,
          totalAccounts: 0,
          totalAccreditations: 0,
          fullAccreditation: 0,
        });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
