import type { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '../../../../libs/models';
import { ResponseFunctions } from '../../../../libs/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const schoolId = req.query.schoolId as string;
      const { lecturers, students, school, name, allschools } = req.body;
      const { Schools } = await dbCon();
      const saved = await Schools.findOneAndUpdate(
        { _id: schoolId },
        {
          $push: {
            history: {
              name: name,
              lecturers: lecturers,
              students: students,
              googlePresence: school.googlePresence,
              citations: school.citations,
              hindex: school.hindex,
              i10hindex: school.i10hindex,
              allschools: allschools,
            },
          },
        }
      ).catch(catcher);
      if (saved) {
        res.status(200).json({
          status: true,
          data: saved,
        });
      } else {
        res.status(404).json({ status: false, err: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
