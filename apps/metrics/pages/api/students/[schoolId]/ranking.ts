import {
  ResponseFunctions,
  AccountTypes,
  SchoolSettingsType,
} from '../../../../libs/interfaces';

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
      const { schoolId } = req.query;
      const { Accounts } = await dbCon();

      const lecturers = await Accounts.aggregate([
        {
          $match: {
            schoolId: schoolId,
            accountType: AccountTypes.STUDENT,
          },
        },
        {
          $project: {
            schoolId: 1,
            facultyId: 1,
            departmentId: 1,
            picture: 1,
            username: 1,
            email: 1,
            mobile: 1,
            firstname: 1,
            lastname: 1,
            googlePresence: 1,
            firstPublicationYear: 1,
            lastPublicationYear: 1,
            totalPublications: 1,
            searchMetadata: 1,
            fullname: {
              $concat: ['$firstname', ' ', '$lastname'],
            },
            citations: 1,
            hindex: 1,
            i10hindex: 1,
            citationsPerCapita: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$citations', 0] },
                    { $eq: ['$totalPublications', 0] },
                  ],
                },
                then: 0,
                else: {
                  $divide: ['$citations', '$totalPublications'],
                },
              },
            },
            hindexPerCapita: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$hindex', 0] },
                    { $eq: ['$firstPublicationYear', 0] },
                  ],
                },
                then: 0,
                else: {
                  $divide: [
                    '$hindex',
                    {
                      $subtract: [
                        { $year: new Date() },
                        '$firstPublicationYear',
                      ],
                    },
                  ],
                },
              },
            },
            i10hindexPerCapita: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ['$i10hindex', 0] },
                    { $eq: ['$firstPublicationYear', 0] },
                  ],
                },
                then: 0,
                else: {
                  $divide: [
                    '$i10hindex',
                    {
                      $subtract: [
                        { $year: new Date() },
                        '$firstPublicationYear',
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            schoolId: 1,
            facultyId: 1,
            departmentId: 1,
            picture: 1,
            username: 1,
            email: 1,
            mobile: 1,
            firstname: 1,
            lastname: 1,
            googlePresence: 1,
            firstPublicationYear: 1,
            lastPublicationYear: 1,
            totalPublications: 1,
            searchMetadata: 1,
            fullname: 1,
            citations: 1,
            hindex: 1,
            i10hindex: 1,
            citationsPerCapita: 1,
            hindexPerCapita: 1,
            i10hindexPerCapita: 1,
          },
        },
        {
          $addFields: {
            total: {
              $avg: [
                '$citationsPerCapita',
                '$hindexPerCapita',
                '$i10hindexPerCapita',
              ],
            },
          },
        },
        {
          $project: {
            schoolId: 1,
            facultyId: 1,
            departmentId: 1,
            picture: 1,
            username: 1,
            email: 1,
            mobile: 1,
            firstname: 1,
            lastname: 1,
            googlePresence: 1,
            firstPublicationYear: 1,
            lastPublicationYear: 1,
            totalPublications: 1,
            searchMetadata: 1,
            fullname: 1,
            citations: 1,
            hindex: 1,
            i10hindex: 1,
            citationsPerCapita: 1,
            hindexPerCapita: 1,
            i10hindexPerCapita: 1,
            total: 1,
          },
        },
        {
          $addFields: {
            highestTotal: {
              $max: '$total',
            },
          },
        },
        {
          $addFields: {
            rank: {
              $multiply: [{ $divide: ['$total', '$highestTotal'] }, 100],
            },
          },
        },
      ]).catch(catcher);

      if (lecturers) {
        res.status(200).json({
          status: true,
          data: lecturers,
        });
      } else {
        return res
          .status(400)
          .json({ status: false, error: 'No Statistics returned' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
