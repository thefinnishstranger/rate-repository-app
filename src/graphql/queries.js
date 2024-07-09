import { gql } from "@apollo/client"

export const FETCH_REPOSITORIES = gql `
query Repositories {
    repositories {
      totalCount
      edges {
        node {
          id
          fullName
          language
          description
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
        }
      }
    }
  }
`

export const LOGIN = gql `
mutation authenticate($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`

export const ME = gql `
{
  me {
    id
    username
  }
}
`