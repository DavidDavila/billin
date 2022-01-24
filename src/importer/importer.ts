import { readFileSync } from 'fs';
import { formatCsv } from '../utils/utils';
import { FILE_FOLDER_LOCATION } from './importer.conf';
import { FileExtension } from './models/file-type/file-type.model';
import { InvoiceLiterals } from './models/result/fields.result.model';
import { KO_Result } from './models/result/ko.result.model';
import { OK_Result } from './models/result/ok.result.model';
import { ControlInvoice, Result } from './models/result/result.model';
import { findErrors } from './validators/ok.validators';


export class Importer {
  async import(filePath: FileExtension): Promise<any> {
    const systemPath: string = FILE_FOLDER_LOCATION + filePath;
    let file: string;
    console.log(
      'remove this line when you use the filePath variable',                                        // filePath is not a variable, its a param
      filePath,
    );

    return new Promise<Result>((resolve, reject) => {                                               //It is not necessary to return a promise, everything is synchronous, but it is returned due to test requirements. 

      try {
        file = readFileSync(systemPath, 'utf8');
      } catch (error) {
        reject(`The file is not in ${ systemPath }`);
      }

      const jsFile: Object[] = formatCsv(file, InvoiceLiterals);

      const validatedInvoice: ControlInvoice[] =
        jsFile.map((invoiceObject: { [key: string]: any }) => {
          return {
            data: invoiceObject,
            errors: [
              ...Object.keys(invoiceObject)
                .map((key: string) => findErrors(key as keyof OK_Result, invoiceObject[key]))           //key is could be whatever string, but on findErrors where are looking for specific object keys
                .filter(err => err)
            ]
          }
        })

      let result: Result = {
        ok: validatedInvoice.filter((invoiceResume: ControlInvoice) => !invoiceResume.errors.length).map(invoice => invoice.data) as OK_Result[],
        ko: validatedInvoice
          .map((invoice, index: number) =>
          ({
            line: index + 1,
            errors: invoice.errors
          })
          )
          .filter(noErrors => noErrors.errors.length) as KO_Result[],
      }

      resolve(result)
    })
  }


}
