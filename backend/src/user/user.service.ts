import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as process from 'node:process';
import { createWriteStream } from 'fs';
import { GetUsersDto } from './dto/get-users.dto';
import { safeUserSelect } from '../common/db-selects/safe-user-select';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // TODO filter private user fields and not return posts
  getUsers(dto?: GetUsersDto) {
    const { search } = dto || {};
    return this.prismaService.user.findMany({
      where: {
        fullname: {
          contains: search || '',
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: dto.take,
      skip: dto.skip,
      select: safeUserSelect
    });
  }

  async updateProfile(userId: number, data: UpdateProfileDto) {
    return this.prismaService.user.update({
      where: { id: userId },
      data
    });
  }

  async storeImageAndGetUrl(file: FileUpload) {
    const { createReadStream, filename } = file;

    const uniqueFilename = `${uuidv4()}_${filename}`;

    const imagePath = join(process.cwd(), 'public', uniqueFilename);

    const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;

    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));

    await new Promise((resolve, reject) => {
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });

    return imageUrl;
  }
}
