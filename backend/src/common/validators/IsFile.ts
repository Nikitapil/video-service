import { registerDecorator, ValidationOptions } from 'class-validator';

interface IsFileOptions {
  mime: ('video/mp4' | 'image/png' | 'image/jpeg' | 'image/jpg')[];
}

export function IsFile(
  options: IsFileOptions,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const file = await value;
          console.log(file?.mimetype);
          return (
            file?.mimetype && (options?.mime ?? []).includes(file?.mimetype)
          );
        }
      }
    });
  };
}
