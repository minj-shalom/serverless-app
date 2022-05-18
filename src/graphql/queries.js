/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServerlessApp = /* GraphQL */ `
  query GetServerlessApp($id: ID!) {
    getServerlessApp(id: $id) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
export const listServerlessApps = /* GraphQL */ `
  query ListServerlessApps(
    $filter: ModelServerlessAppFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServerlessApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
