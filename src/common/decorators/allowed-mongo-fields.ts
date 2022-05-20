import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { REGEX_MONGO_FIELD_NAME } from 'nestjs-keyset-paginator';

export const AllowedMongoFields = (
  fields: string[],
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'allowedMongoFields',
      target: object.constructor,
      propertyName: propertyName,
      // constraints: [property],
      options: {
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (fields.length > 0) {
            return fields.includes(value);
          }
          return true;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          if (fields.length > 0)
            return `${propertyName} must be equal to ${fields}`;
          else
            return `${propertyName} must be string with matching regex ${REGEX_MONGO_FIELD_NAME}`;
        },
      },
    });
  };
};
