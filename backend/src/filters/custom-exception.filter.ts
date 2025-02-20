import { BadRequestException, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch(BadRequestException)
export class GraphQlErrorFilter implements GqlExceptionFilter {
  catch(exception: any) {
    const response = exception.getResponse();

    if (typeof response === 'object') {
      throw new ApolloError('Validation error', 'VALIDATION_ERROR', response);
    } else {
      throw new ApolloError('Bad request');
    }
  }
}
