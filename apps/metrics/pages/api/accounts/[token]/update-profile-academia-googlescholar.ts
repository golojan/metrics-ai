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
      const { googleScholarId, scrap } = req.body;

      const { Accounts } = await dbCon();
      const account = await Accounts.findOneAndUpdate(
        { _id: token },
        {
          picture: scrap.authorMetadata.thumbnail,
          googleScholarId: googleScholarId,
          publications: scrap.publications,
          citations: scrap.citations,
          hindex: scrap.hindex,
          i10hindex: scrap.i10hindex,
          totalPublications: scrap.totalPublications,
          firstPublicationYear: scrap.firstPublicationYear,
          lastPublicationYear: scrap.lastPublicationYear,
          googlePresence: 1,
          lastScrapped: Date.now(),
        }
      ).catch(catcher);

      if (account) {
        res
          .status(200)
          .json({ status: true, googleScholarId: googleScholarId });
      } else {
        res.status(400).json({ status: false, err: 'Account Not Found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
