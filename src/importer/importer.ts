import { readFileSync } from 'fs';
import { csv2Json } from '../utils/utils';
import { FILE_FOLDER_LOCATION } from './importer.conf';
import { FileExtension } from './models/file-type/file-type.model';
import { InitialResult, Result } from './models/result/result.model';


export class Importer {
  async import(filePath: FileExtension): Promise<any> {
    const systemPath: string = FILE_FOLDER_LOCATION + filePath;
    let file: string;
    console.log(
      'remove this line when you use the filePath variable', // filePath is not a variable, its a param
      filePath,
    );

    return new Promise<Result>((resolve, reject) => { //It is not necessary to return a promise because everything is synchronous, but it is returned due to test requirements. 

      try {
        file = readFileSync(systemPath, 'utf8');
      } catch (error) {
        reject(`The file is not in ${ systemPath }`)
      }

      let jsonFile: any = csv2Json(file);
      console.log(jsonFile)
      let result: Result = InitialResult;
      resolve(result)
    })
  }


}

const c = new Importer();
c.import('import-with-errors.csv')