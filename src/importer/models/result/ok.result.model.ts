import { DateStr_Field_Result } from './fields.result.model';

export interface OK_Result {
  code: string,
  issuedDate: DateStr_Field_Result,
  ownerName: string,
  contactName: string,
  subtotal: number,
  taxes: number,
  total: number,
  status: string,
}