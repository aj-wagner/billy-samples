interface DatabaseApplicantResult {
  id: string;
  name?: string;
  fields: DatabaseApplicantField[];
  applicants: DatabaseApplicantPerson[];
}

interface DatabaseApplicantField {
  id?: string;
  metadata?: {
    key?: string;
    label?: string;
  };
}

interface DatabaseApplicantPerson {
  id?: string;
  applicantId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  value?: object;
}
