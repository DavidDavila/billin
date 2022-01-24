import { Error_Result, KO_Result } from './ko.result.model';
import { OK_Result } from './ok.result.model';


export interface Result {
  ok: OK_Result[],
  ko: KO_Result[]
}

export const InitialResult: Result = { ok: [], ko: [] }

export interface ControlInvoice {
  data: Object,
  errors: (Error_Result | null)[]
}