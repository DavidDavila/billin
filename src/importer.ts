import { FileExtension } from './models/file-type';

export class Importer {
  async import(filePath: FileExtension): Promise<any> {
    console.log(
      'remove this line when you use the filePath variable',
      filePath,
    );

    return {
      ok: [],
      ko: [],
    };
  }
}

const c = new Importer;
c.import('wfwef.csv')