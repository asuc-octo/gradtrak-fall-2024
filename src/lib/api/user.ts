import { gql } from "@apollo/client";

export interface IGradtrakUser {
  email: string;
  student: boolean;
}

export const READ_USER = gql`
  query GetUser {
    user {
      email
      student
      bookmarkedCourses {
        title
        subject
        number
      }
      bookmarkedClasses {
        title
        subject
        number
        courseNumber
        year
        semester
      }
    }
  }
`