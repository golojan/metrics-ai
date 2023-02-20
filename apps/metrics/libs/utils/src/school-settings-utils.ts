// Get settings from school Db
export const getSchoolSettings = async (schoolId: string) => {
  const response = await fetch(`/api/schools/${schoolId}/settings`);
  const settings = await response.json();
  return settings;
};
