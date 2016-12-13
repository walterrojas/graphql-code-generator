import {GraphQLInterfaceType} from 'graphql/type/definition';
import {GraphQLObjectType} from 'graphql/type/definition';
import {GraphQLField} from 'graphql/type/definition';
import {GraphQLType} from 'graphql/type/definition';

export const isPrimitive = (primitivesMap: any, type: string) => {
  return Object.keys(primitivesMap).map(key => primitivesMap[key]).find(item => item === type);
};

export const shouldSkip = (typeName: string): boolean => {
  return !typeName ||
    typeName.indexOf('__') > -1 ||
    typeName === 'Query' ||
    typeName === 'Mutation' ||
    typeName === 'Subscription';
};

export const isRequired = (type: GraphQLType): boolean => {
  return (type.toString()).indexOf('!') > -1;
};

export const isArray = (type: GraphQLType): boolean => {
  return (type.toString()).indexOf('[') > -1;
};

export const getTypeName = (primitivesMap: any, type: GraphQLType) => {
  const name = (type.toString()).replace(/[\[\]!]/g, '');

  if (primitivesMap[name]) {
    return primitivesMap[name];
  }
  else {
    return name;
  }
};

export function getFieldDef(parentType, fieldAST): GraphQLField<any, any> {
  const name = fieldAST.name.value;

  if (parentType instanceof GraphQLObjectType ||
    parentType instanceof GraphQLInterfaceType) {
    return parentType.getFields()[name];
  }
}