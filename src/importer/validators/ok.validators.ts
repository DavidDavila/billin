import { Status_Field_Result } from '../models/result/fields.result.model';
import { Error_Message, Error_Result } from '../models/result/ko.result.model';
import { OK_Result } from '../models/result/ok.result.model';

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


export const findErrors = (property: keyof OK_Result, value: any, validateSystem: { [key: string]: Function } = OK_Result_Validation): Error_Result | null => {     //Sorry for this spagetthi line :)
  if (!value) {
    return {
      property,
      message: Error_Message.Required
    }
  }
  try {
    if (!validateSystem[property](value)) {
      return {
        property,
        message: Error_Message.Invalid
      }
    }
    return null;
  } catch (error) {                                                                  //Unknow object param. TO DO: Add this error to errors.ts
    console.error('Unknow object param', property, value);
    return {
      property,
      message: Error_Message.Invalid
    }
  }
}




