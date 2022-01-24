import { OK_Result } from './ok.result.model';

export enum Error_Message {
  Invalid = 'invalid',
  Required = 'required',
}

export interface Error_Result {
  property: keyof OK_Result,
  message: Error_Message,
}

export interface KO_Result {
  line: number,
  errors: Error_Result[]
}