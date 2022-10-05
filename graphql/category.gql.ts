import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
query getCategories($type: ResourceCategoryTypeType!) {
  allResourceCategories(where: {type: $type}) {
    id,
    name,
    type,
  }
}
`;
