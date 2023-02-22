import { ResponseFunctions, AccountTypes } from '../../../../libs/interfaces';

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
            accountType: AccountTypes.LECTURER,
          },
        },
        {
          $project: {
            schoolId: 1,
            accountType: 1,
            gender: 1,
            membershipType: 1,
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
              $concat: ['$firstname', ' ', '$middlename', ' ', '$lastname'],
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
          $addFields: {
            highestTotal: {
              $max: '$total',
            },
          },
        },
        {
          $addFields: {
            highestCitationsPerCapita: {
              $max: '$citationsPerCapita',
            },
          },
        },
        {
          $addFields: {
            highestHindexPerCapita: {
              $max: '$hindexPerCapita',
            },
          },
        },
        {
          $addFields: {
            highestiI10hindexPerCapita: {
              $max: '$i10hindexPerCapita',
            },
          },
        },
        {
          $addFields: {
            citationsByWeight: {
              $multiply: [
                '$citationsPerCapita',
                { $divide: ['$highestCitationsPerCapita', 100] },
              ],
            },
          },
        },
        {
          $addFields: {
            hindexByWeight: {
              $multiply: [
                '$hindexPerCapita',
                { $divide: ['$highestHindexPerCapita', 100] },
              ],
            },
          },
        },
        {
          $addFields: {
            i10hindexByWeight: {
              $multiply: [
                '$i10hindexPerCapita',
                { $divide: ['$highestiI10hindexPerCapita', 100] },
              ],
            },
          },
        },
        {
          $addFields: {
            rank: {
              $cond: {
                if: {
                  $eq: ['$highestTotal', 0],
                },
                then: 0,
                else: {
                  $multiply: [{ $divide: ['$total', '$highestTotal'] }, 100],
                },
              },
            },
          },
        },
        {
          $addFields: {
            totalWeighted: {
              $avg: [
                '$citationsByWeight',
                '$hindexByWeight',
                '$i10hindexByWeight',
              ],
            },
          },
        },
        {
          $addFields: {
            highestTotalWeighted: {
              $max: '$totalWeighted',
            },
          },
        },
        {
          $addFields: {
            rankWeighted: {
              $cond: {
                if: {
                  $eq: ['$highestTotalWeighted', 0],
                },
                then: 0,
                else: {
                  $multiply: [
                    { $divide: ['$totalWeighted', '$highestTotalWeighted'] },
                    100,
                  ],
                },
              },
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
