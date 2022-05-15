/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createServerlessApp = /* GraphQL */ `
  mutation CreateServerlessApp(
    $input: CreateServerlessAppInput!
    $condition: ModelServerlessAppConditionInput
  ) {
    createServerlessApp(input: $input, condition: $condition) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
export const updateServerlessApp = /* GraphQL */ `
  mutation UpdateServerlessApp(
    $input: UpdateServerlessAppInput!
    $condition: ModelServerlessAppConditionInput
  ) {
    updateServerlessApp(input: $input, condition: $condition) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
export const deleteServerlessApp = /* GraphQL */ `
  mutation DeleteServerlessApp(
    $input: DeleteServerlessAppInput!
    $condition: ModelServerlessAppConditionInput
  ) {
    deleteServerlessApp(input: $input, condition: $condition) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
