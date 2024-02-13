import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { normalize } from 'node:path';
import { ERROR_MESSAGES } from '../constants/index.js';

export const compress = (pathToInputFile, pathToOutputFile) => {
  try {
    const normalizedInputPath = normalize(pathToInputFile);
    const normalizedOutputPath = normalize(pathToOutputFile);
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
      console.log('File compressed successfully');
    });
  }
  catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}
export const decompress = (pathToInputFile, pathToOutputFile) => {
  try {
    const normalizedInputPath = normalize(pathToInputFile);
    const normalizedOutputPath = normalize(pathToOutputFile);
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
      console.log('File decompressed successfully');
    });
  }
  catch (error) {
    console.log(`${ERROR_MESSAGES.OPERATION_FAILED}: ${error}`)
  }
}