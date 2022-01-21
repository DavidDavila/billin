import { KO_Result } from './ko.result.model';
import { OK_Result } from './ok.result.model';


export interface Result {
  ok: OK_Result[],
  ko: KO_Result[]
}