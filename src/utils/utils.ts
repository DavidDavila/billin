

export function formatCsv(csvData: string, enumLiterals?: any): Object[] {                     //literals optional parameter. Convert the field title of the csv to a custom param of the result object

  const sentences = csvData.split(/\n|\r/g).filter((line: string) => line);
  const titles: string[] = sentences[0].split(/;/g);
  sentences.shift()                                                                           //Deleting titles from csv content

  return sentences.reduce((acc: any[], sentence: string) => {
    const lineCsv: any = {};                                                                  // Declared "any" because it can use for other uses case;
    sentence
      .split(/;/g)
      .forEach((value: string, index: number) => {
        const title: string = titles[index].trim();
        const objectKey: string = enumLiterals ? enumLiterals[title] : title;                   //Checking if need change titles
        lineCsv[objectKey] = value ? Number(Number(value).toFixed(1)) || value.trim() : null;   // Rounding decimals like requierements
      })
    return [...acc, lineCsv];
  }, []);
}
