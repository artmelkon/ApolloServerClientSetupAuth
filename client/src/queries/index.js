import {gql} from '@apollo/client';

export const USER_REGISTER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      password
      token
    }
  }
`;
export const USER_LOGIN = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      _id
      username
      email
      password
      token
    }
  }
`;
