export enum Status_Field_Result {
  Draft = 'draft',
  Issued = 'issued'
}

//export type DateStr_Field_Result = `${ number }-${ number }-${ number }`          //ts-Jest see it like an error but typescript accept it
export type DateStr_Field_Result = string;

export enum InvoiceLiterals {
  'Invoice Code' = 'code',
  'Issued Date' = 'issuedDate',
  'Owner Name' = 'ownerName',
  'Contact Name' = 'contactName',
  'Subtotal' = 'subtotal',
  'Taxes' = 'taxes',
  'Total' = 'total',
  'Status' = 'status',
}