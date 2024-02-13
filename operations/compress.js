import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

export const compress = (pathToInputFile, pathToOutputFile) => {
  const readStream = createReadStream(pathToInputFile);
  const writeStream = createWriteStream(pathToOutputFile);
  const brotliStream = createBrotliCompress();

  readStream.pipe(brotliStream).pipe(writeStream);
}
export const decompress = (pathToInputFile, pathToOutputFile) => {
  const readStream = createReadStream(pathToInputFile);
  const writeStream = createWriteStream(pathToOutputFile);
  const brotliStream = createBrotliDecompress();

  readStream.pipe(brotliStream).pipe(writeStream);
}