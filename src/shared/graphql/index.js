import { gql } from "8base-react-sdk";

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
    }
  }
`;

export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`;

export const TASK_LIST_QUERY = gql`
  query {
    tasksList {
      items {
        id
        title
        assignee
        completed
        createdAt
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation TaskUpdate($id: ID!, $title: String!, $assignee: String!) {
    taskUpdate(
      filter: { id: $id }
      data: { title: $title, assignee: $assignee }
    ) {
      id
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation TaskDelete($id: ID!) {
    taskDelete(filter: { id: $id }) {
      success
    }
  }
`;
