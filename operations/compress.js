import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { ERROR_MESSAGES } from '../constants/index.js';
import { getCorrectPath } from '../utils/index.js';

export const compress = (pathToInputFile, pathToOutputFile) => {
  const normalizedInputPath = getCorrectPath(pathToInputFile);
  const normalizedOutputPath = getCorrectPath(pathToOutputFile);

  try {
    const readStream = createReadStream(normalizedInputPath);
    const writeStream = createWriteStream(normalizedOutputPath);
    const brotliStream = createBrotliCompress();

    readStream.on('error', (error) => {
      console.error(`${ERROR_MESSAGES.OPERATION_FAILED}. Error reading input file: ${error}`);
    });
  
    writeStream.on('error', (error) => {
      console.error(`${ERROR_MESSAGES.OPERATION_FAILED}. Error writing output file: ${error}`);
    });
  
    readStream.pipe(brotliStream).pipe(writeStream).on('finish', () => {
      console.log(`File compressed successfully under: ${normalizedOutputPath}`);
    });
  }
  catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}
export const decompress = (pathToInputFile, pathToOutputFile) => {
  const normalizedInputPath = getCorrectPath(pathToInputFile);
  const normalizedOutputPath = getCorrectPath(pathToOutputFile);

  try {
    const readStream = createReadStream(normalizedInputPath);
    const writeStream = createWriteStream(normalizedOutputPath);
    const brotliStream = createBrotliDecompress();

    readStream.on('error', (error) => {
      console.error(`${ERROR_MESSAGES.OPERATION_FAILED}. Error reading input file: ${error}`);
    });
  
    writeStream.on('error', (error) => {
      console.error(`${ERROR_MESSAGES.OPERATION_FAILED}. Error writing output file: ${error}`);
    });
  
    readStream.pipe(brotliStream).pipe(writeStream).on('finish', () => {
      console.log(`File compressed successfully under: ${normalizedOutputPath}`);
    });
  }
  catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}