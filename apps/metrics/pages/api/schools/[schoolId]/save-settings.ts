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
      const {
        citationsWeight,
        hindexWeight,
        i10hindexWeight,
        googlePresenceWeight,
        internationalStaffWeight,
        internationalStudentsWeight,
        internationalCollaborationWeight,
        graduationOutputWeight,
        fullProfessorsWeight,
        phdStudentsWeight,
        accreditationWeight,
        teacherStudentRatioWeight,
        femaleStaffWeight,
        femaleStudentsWeight,
        profsReadersWeight,
        seniorLecturersWeight,
        otherLecturersWeight,
      } = req.body;

      const newSettings = {
        citationsWeight: citationsWeight,
        hindexWeight: hindexWeight,
        i10hindexWeight: i10hindexWeight,
        googlePresenceWeight: googlePresenceWeight,
        internationalStaffWeight: internationalStaffWeight,
        internationalStudentsWeight: internationalStudentsWeight,
        internationalCollaborationWeight: internationalCollaborationWeight,
        graduationOutputWeight: graduationOutputWeight,
        fullProfessorsWeight: fullProfessorsWeight,
        phdStudentsWeight: phdStudentsWeight,
        accreditationWeight: accreditationWeight,
        teacherStudentRatioWeight: teacherStudentRatioWeight,
        femaleStaffWeight: femaleStaffWeight,
        femaleStudentsWeight: femaleStudentsWeight,
        profsReadersWeight: profsReadersWeight,
        seniorLecturersWeight: seniorLecturersWeight,
        otherLecturersWeight: otherLecturersWeight,
      };
      const { Schools } = await dbCon();
      const saved = await Schools.findOneAndUpdate(
        { _id: schoolId },
        {
          settings: newSettings,
        }
      ).catch(catcher);
      if (saved) {
        res.status(200).json({
          status: true,
          ...saved,
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
