import {
  ResponseFunctions,
  AccountTypes,
  MembershipTypes,
} from '../../../../libs/interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';

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

      const students = await Accounts.aggregate([
        {
          $match: {
            schoolId: schoolId,
            accountType: AccountTypes.STUDENT,
          },
        },
        {
          $group: {
            _id: '$_id',
            citations: { $sum: '$citations' },
            hindex: { $sum: '$hindex' },
            i10hindex: { $sum: '$i10hindex' },
            totalPublications: { $sum: '$totalPublications' },
            firstPublicationYear: { $min: '$firstPublicationYear' },
            lastPublicationYear: { $max: '$lastPublicationYear' },
            highestCitations: { $max: '$citations' },
            highestHindex: { $max: '$hindex' },
            highestI10hindex: { $max: '$i10hindex' },
            highestTotalPublications: { $max: '$totalPublications' },
            lowestCitations: { $min: '$citations' },
            lowestHindex: { $min: '$hindex' },
            lowestI10hindex: { $min: '$i10hindex' },
            lowestTotalPublications: { $min: '$totalPublications' },
            totalStaff: { $sum: 1 },
            totalStaffWithGooglePresence: {
              $sum: {
                $cond: [
                  {
                    $or: [
                      { $gt: ['$citations', 0] },
                      { $gt: ['$hindex', 0] },
                      { $gt: ['$i10hindex', 0] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            totalStaffWithOutGooglePresence: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ['$citations', 0] },
                      { $eq: ['$hindex', 0] },
                      { $eq: ['$i10hindex', 0] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            internationalStaff: {
              $sum: {
                $cond: [
                  { $eq: ['$membershipType', MembershipTypes.INTERNATIONAL] },
                  1,
                  0,
                ],
              },
            },
            localStaff: {
              $sum: {
                $cond: [
                  { $eq: ['$membershipType', MembershipTypes.LOCAL] },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]).catch(catcher);
      if (students[0]) {
        res.status(200).json({
          status: true,
          count: students[0].totalStaff,
          citations: students[0].citations,
          hindex: students[0].hindex,
          i10hindex: students[0].i10hindex,
          totalPublications: students[0].totalPublications,
          firstPublicationYear: students[0].firstPublicationYear,
          lastPublicationYear: students[0].lastPublicationYear,
          totalStaff: students[0].totalStaff,
          totalStaffWithGooglePresence:
            students[0].totalStaffWithGooglePresence,
          totalStaffWithOutGooglePresence:
            students[0].totalStaffWithOutGooglePresence,
          internationalStaff: students[0].internationalStaff,
          localStaff: students[0].localStaff,
          highestCitations: students[0].highestCitations,
          highestHindex: students[0].highestHindex,
          highestI10hindex: students[0].highestI10hindex,
          highestTotalPublications: students[0].highestTotalPublications,
          lowestCitations: students[0].lowestCitations,
          lowestHindex: students[0].lowestHindex,
          lowestI10hindex: students[0].lowestI10hindex,
          lowestTotalPublications: students[0].lowestTotalPublications,
        });
      } else {
        res
          .status(400)
          .json({ status: false, error: 'No Statistics returned' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
