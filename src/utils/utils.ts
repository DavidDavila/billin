import { OK_Result } from '../importer/models/result/ok.result.model';

export function csv2Json(csvData: string): OK_Result[] {

  const sentences = csvData.split(/\n|\r/g).filter((line: string) => line);

  const headers: (keyof OK_Result)[] = sentences[0].split(/;/g) as (keyof OK_Result)[];
  sentences.shift() //Deleting headers from csv content
  return sentences.reduce((acc: any[], sentence: string) => {

    const invoice: any = {}; // Declared "any" because OK_RESULT is not guaranteed;

    sentence.split(/;/g).forEach((value: string, index: number) => {
      const title: keyof OK_Result = headers[index];
      invoice[title] = value ? Number(Number(value).toFixed(2)) || value.trim() : null;
    })

    return [...acc, invoice];
  }, []);
}

export function isOK(obj: any): obj is OK_Result {
  return obj.foo !== undefined
}