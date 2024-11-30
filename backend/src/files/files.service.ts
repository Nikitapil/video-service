import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class FilesService {
  async saveFile(file: FileUpload): Promise<string> {
    const fileWaited = await file;
    const fileName = `${Date.now()}${fileWaited.filename}`;
    const filePath = `/files/${fileName}`;
    const stream = fileWaited.createReadStream();
    const outputPath = `public${filePath}`;

    if (!existsSync('public/files')) {
      mkdirSync('public/files', { recursive: true });
    }

    const writeStream = createWriteStream(outputPath);
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return filePath;
  }
}
