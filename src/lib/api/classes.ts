import { gql } from "@apollo/client";

export interface ICourse {
    subject: string;
    number: string;
    title: string;
}

export interface GetCoursesResponse {
    courses: ICourse[];
}

export const GET_COURSES = gql`
    query Catalog($year: Int!, $semester: Semester!) {
        catalog(year: $year, semester: $semester) {
            course {
            subject
            number
            title
            }
        }
    }
`;