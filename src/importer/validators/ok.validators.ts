import { Status_Field_Result } from '../models/result/fields.result.model';

const OK_Result_Validation: { [key: string]: Function } = {
  code: (code: any) => typeof (code) === 'string',
  issuedDate: (issuedDate: any) => new Date(issuedDate),
  ownerName: (code: any) => typeof (code) === 'string',
  contactName: (code: any) => typeof (code) === 'string',
  subtotal: (code: any) => typeof (code) === 'number',
  taxes: (code: any) => typeof (code) === 'number',
  total: (code: any) => typeof (code) === 'number',
  status: (status: any) => Object.values(Status_Field_Result).includes(status)
};


export const isCorrectField = (key: string, value: any) => {
  const validateFunction = OK_Result_Validation;
  try {
    return (validateFunction[key](value));
  } catch (error) {                                                                  //Unknow object param. TO DO: Add this error to errors.ts
    console.error('Unknow object param', key, value);
    return false;
  }
}




