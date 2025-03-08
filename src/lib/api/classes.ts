import { gql } from "@apollo/client";

export interface ICourse {
    course: {
        subject: string;
        number: string;
    };
}

export interface GetCoursesResponse {
    catalog: ICourse[];
}

export const GET_COURSES = gql`
    query Catalog($year: Int!, $semester: Semester!) {
        catalog(year: $year, semester: $semester) {
            course {
                subject
                number
            }
        }
    }
`;