// import { check, body } from 'express-validator'

// export const validateNewPipeline = [
//   // Pipeline name shouldn't be empty
//   check('name').not().isEmpty().withMessage('Cannot be empty'),

//   // Description must be a string
//   check('description').optional().isString().withMessage('Must be a string'),

//   // IsRunning must be a boolean
//   check('isRunning').optional().isBoolean().withMessage('Must be a boolean'),

//   // Check if data is valid
//   body('data').toArray().isArray().withMessage('Must be array of objects'),

//   // Check if object inside data is valid
//   check('data.*.type').isString().withMessage('Must be a string'),
//   check('data.*.moduleId').isInt().withMessage('Must be a number'),
// ]

// export const validateUpdatePipeline = [
//   // Pipeline name shouldn't be empty
//   check('name').not().isEmpty().withMessage('Cannot be empty'),

//   // Description must be a string
//   check('description').optional().isString().withMessage('Must be a string'),

//   // IsRunning must be a boolean
//   check('isRunning').optional().isBoolean().withMessage('Must be a boolean'),

//   // Check if data is valid
//   body('data').toArray().isArray().withMessage('Must be array of objects'),

//   // Check if object inside data is valid
//   check('data.*.type').isString().withMessage('Must be a string'),
//   check('data.*.moduleId').isInt().withMessage('Must be a number'),
// ]
