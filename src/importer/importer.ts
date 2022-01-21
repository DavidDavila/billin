import { readFileSync } from 'fs';
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

    try {
      file = readFileSync(systemPath, 'utf8');
    } catch (error) {
      throw `The file is not in ${ systemPath }`
    }
    console.log(file)

    let result: Result = InitialResult;
    return result
  }

}

const c = new Importer();
c.import('import-success.csv')