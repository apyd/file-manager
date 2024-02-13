import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { normalize, isAbsolute, join } from 'node:path';
import { cwd } from 'node:process';
import { ERROR_MESSAGES } from '../constants/index.js';

export const compress = (pathToInputFile, pathToOutputFile) => {
  try {
    const currentPath = cwd()
    const inputFilePath = isAbsolute(pathToInputFile) ? pathToInputFile : join(currentPath, pathToInputFile)
    const normalizedInputPath = normalize(inputFilePath)
    const outputFilePath = isAbsolute(pathToOutputFile) ? pathToOutputFile : join(currentPath, pathToOutputFile)
    const normalizedOutputPath = normalize(outputFilePath);
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
  try {
    const currentPath = cwd()
    const inputFilePath = isAbsolute(pathToInputFile) ? pathToInputFile : join(currentPath, pathToInputFile)
    const normalizedInputPath = normalize(inputFilePath)
    const outputFilePath = isAbsolute(pathToOutputFile) ? pathToOutputFile : join(currentPath, pathToOutputFile)
    const normalizedOutputPath = normalize(outputFilePath);
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