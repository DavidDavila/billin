import { readFileSync } from 'fs';
import { formatCsv } from '../utils/utils';
import { FILE_FOLDER_LOCATION } from './importer.conf';
import { DefaultEncoding, DefaultEncodingModel } from './models/file/file-encode.model';
import { FileExtension } from './models/file/file-type.model';
import { InvoiceLiterals } from './models/result/fields.result.model';
import { KO_Result } from './models/result/ko.result.model';
import { OK_Result } from './models/result/ok.result.model';
import { ControlInvoice, Result } from './models/result/result.model';
import { findErrors } from './validators/ok.validators';


export class Importer {

  file: string;
  systemPath: string;
  jsFile: Object[];
  validatedInvoice: ControlInvoice[];

  constructor(filePath?: FileExtension) {
    if (filePath) {
      this.systemPath = FILE_FOLDER_LOCATION + filePath;
      this.import();
    }
  }

  async import(filePath?: FileExtension, encodeOptions: DefaultEncodingModel = DefaultEncoding): Promise<Result> {

    this.systemPath = FILE_FOLDER_LOCATION + filePath;

    console.log(
      'remove this line when you use the filePath variable',                                        // filePath is not a variable, its a param
      filePath,
    );

    return new Promise<Result>((resolve, reject) => {                                               // It is not necessary to return a promise, everything is synchronous, but it is returned due to test requirements. 

      try {
        this.file = readFileSync(this.systemPath, encodeOptions);
      } catch (error) {
        reject(`The file is not in ${ this.systemPath }`);
      }

      this.jsFile = this.formatThisCsv();                                                            // Transform string to Json and aply custom keys if it is needed

      this.validatedInvoice = this.validateCsvObject();                                                // Extract errors if exists.


      let result: Result = {
        ok: this.validatedInvoice
          .filter((invoiceResume: ControlInvoice) => !invoiceResume.errors.length)
          .map(invoice => invoice.data) as OK_Result[],

        ko: this.validatedInvoice
          .map((invoice, index: number) =>
          ({
            line: index + 1,
            errors: invoice.errors
          })
          )
          .filter(noErrors => noErrors.errors.length) as KO_Result[],
      }

      resolve(result);
    })
  }

  validateCsvObject(jsFile: Object[] = this.jsFile): ControlInvoice[] {
    return jsFile.map((invoiceObject: { [key: string]: any }) => {
      return {
        data: invoiceObject,
        errors: [
          ...Object.keys(invoiceObject)
            .map((key: string) => findErrors(key as keyof OK_Result, invoiceObject[key]))           //key is could be whatever string, but on findErrors where are looking for specific object keys
            .filter(err => err)
        ]
      }
    })
  }

  formatThisCsv(file: string = this.file): Object[] {
    return formatCsv(file, InvoiceLiterals);                                                     //Literals are optionals.Its apply when you want change the keys of the returned Json
  }

}
