enum AceptedExtensions {
  Csv = 'csv'
}
export type FileExtension = `${ string | number }.${ AceptedExtensions }`;
