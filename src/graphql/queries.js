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

export const REPOSITORY = gql `
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $repositoryOwnerName: String!
    $repositoryName: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        ownerName: $repositoryOwnerName
        repositoryName: $repositoryName
        rating: $rating
        text: $review
      }
    ) {
      repositoryId
    }
  }
`;

export const SIGNUP = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
      id
    }
  }
`;
