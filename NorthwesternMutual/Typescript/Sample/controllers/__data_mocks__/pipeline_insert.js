export default {
  name: 'Intern 2020 Pipeline',
  description: 'Serving interns from March until September 2020.',
  userId: 1,
  companyId: 3,
  isRunning: true,
  pipelineData: [
    {
      type: 'form',
      moduleId: 2,
    },
    {
      type: 'scheduler',
      moduleId: 3,
    },
    {
      type: 'form',
      moduleId: 1,
    },
    {
      type: 'email',
      moduleId: 10,
    },
  ],
};
