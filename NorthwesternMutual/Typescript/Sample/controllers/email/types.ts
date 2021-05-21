// New/Update Email Template
export interface EmailTemplateBody {
  emailName: string;
  emailSubject: string;
  databaseRefId: string;
  emailContent: object;
}
