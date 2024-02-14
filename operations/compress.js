import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { ERROR_MESSAGES } from '../constants/index.js';
import { getCorrectPath } from '../utils/index.js';

const handleStreamError = (readStream, writeStream, outputPath, errorMessage) => {
  console.error(errorMessage);
  readStream.destroy();
  writeStream.destroy();
  unlink(outputPath, () => {});
};

export const compress = async(pathToInputFile, pathToOutputFile) => {
  const normalizedInputPath = getCorrectPath(pathToInputFile);
  const normalizedOutputPath = getCorrectPath(pathToOutputFile);

    const readStream = createReadStream(normalizedInputPath, { flags: 'r' });
    const writeStream = createWriteStream(normalizedOutputPath, { flags: 'wx' });
    const brotliStream = createBrotliCompress();

    readStream.on('error', (error) => {
      handleStreamError(readStream, writeStream, normalizedOutputPath, `${ERROR_MESSAGES.OPERATION_FAILED}. Error reading input file: ${error}`);
    })

    writeStream.on('error', (error) => {
      handleStreamError(readStream, writeStream, normalizedOutputPath, `${ERROR_MESSAGES.OPERATION_FAILED}. Error reading output file: ${error}`);
    })

    readStream.pipe(brotliStream).pipe(writeStream);

}
export const decompress = (pathToInputFile, pathToOutputFile) => {
  const normalizedInputPath = getCorrectPath(pathToInputFile);
  const normalizedOutputPath = getCorrectPath(pathToOutputFile);

  const readStream = createReadStream(normalizedInputPath, { flags: 'r' });
  const writeStream = createWriteStream(normalizedOutputPath, { flags: 'wx' });
  const brotliStream = createBrotliDecompress();

  readStream.on('error', (error) => {
    handleStreamError(readStream, writeStream, normalizedOutputPath, `${ERROR_MESSAGES.OPERATION_FAILED}. Error reading input file: ${error}`);
  });

  writeStream.on('error', (error) => {
    handleStreamError(readStream, writeStream, normalizedOutputPath, `${ERROR_MESSAGES.OPERATION_FAILED}. Error reading outputs file: ${error}`);
  });
  
  readStream.pipe(brotliStream).pipe(writeStream);
}