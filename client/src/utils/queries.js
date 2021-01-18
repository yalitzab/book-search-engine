
import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedBooks {
                authors
                bookId
                title
                description
                image
                link
            }
        }
    }
`;