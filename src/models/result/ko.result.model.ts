import { OK_Result } from './ok.result.model';

enum Error_Message {
  Invalid = 'Invalid',
  Required = 'Required',
}

interface Error_Result {
  property: keyof OK_Result,
  message: Error_Message,
}

export interface KO_Result {
  line: number,
  errors: Error_Result[]
}