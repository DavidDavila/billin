import { readFileSync } from 'fs';
import { formatCsv } from '../utils/utils';
import { FILE_FOLDER_LOCATION } from './importer.conf';
import { FileExtension } from './models/file-type/file-type.model';
import { InvoiceLiterals } from './models/result/fields.result.model';
import { InitialResult, Result } from './models/result/result.model';
import { isCorrectField } from './validators/ok.validators';


export class Importer {
  async import(filePath: FileExtension): Promise<any> {
    const systemPath: string = FILE_FOLDER_LOCATION + filePath;
    let file: string;
    console.log(
      'remove this line when you use the filePath variable',                                        // filePath is not a variable, its a param
      filePath,
    );

    return new Promise<Result>((resolve, reject) => {                                               //It is not necessary to return a promise because everything is synchronous, but it is returned due to test requirements. 

      try {
        file = readFileSync(systemPath, 'utf8');
      } catch (error) {
        reject(`The file is not in ${ systemPath }`);
      }

      const jsFile: Object[] = formatCsv(file, InvoiceLiterals);

      let result: Result = InitialResult;                                                            //Borrar initial Result David

      const validatedInvoice: Object[] =
        jsFile.map((invoiceObject: { [key: string]: any }) => {                                     //key is string type and not [key: keyof OK_Result] becouse is not guaranteed
          Object.keys(invoiceObject)
            .forEach((key: any) => {
              const goodFormatField: boolean = isCorrectField(key, invoiceObject[key])
              if (!goodFormatField) {
                invoiceObject[key] = null;
              }
            })
          return invoiceObject
        })

      console.log(validatedInvoice)

      resolve(result)
    })
  }


}

const c = new Importer();
c.import('import-with-errors.csv')