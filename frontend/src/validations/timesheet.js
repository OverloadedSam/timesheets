import * as yup from 'yup';

const schema = yup.object().shape({
  projectName: yup
    .string()
    .min(2)
    .max(64)
    .trim()
    .required()
    .label('Project Name'),
  date: yup.date().required().label('Date'),
  employee: yup.string().min(24).max(24).required().label('Employee ID'),
});

export const findMyTimeSheetSchema = yup.object().shape({
  startDate: yup.date().required().label('Start Date'),
  endDate: yup
    .date()
    .required()
    .label('End Date')
    .test({
      name: 'min',
      exclusive: false,
      params: { startTime: yup.ref('startTime') },
      message: ({ label }) => {
        return `${label} can't be less than Start Date}`;
      },
      test: (value, testContext) => {
        const startTime = new Date(testContext.parent.startDate);

        return value > startTime;
      },
    }),
});

export const timesheetTaskSchema = yup.object().shape({
  hour: yup.number().min(0).max(23).label('Hour'),
  minute: yup.number().min(0).max(59).label('Minute'),
  description: yup.string().min(2).max(2048).required().label('Description'),
  remarks: yup.string().min(2).max(2048).required().label('Remarks'),
});

export default schema;
