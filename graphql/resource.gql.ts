import gql from "graphql-tag";
import { Sorts } from "../enums/sorts.enum";

export const RESOURCE_DATA = gql`
  fragment ResourceData on Resource {
    id,
    name,
    description,
    icon {
      publicUrl,
    }
    content,
    language,
    platform,
    categoryType,
    type,
    enable,
    images {
      id,
      image {
        publicUrl,
      },
    },
    packages {
      id,
      url,
      type,
      version,
      system,
      createdAt,
      language,
      size,
    },
    categories {
      id,
      name,
    },
    downloads,
    likes,
    createdAt,
  }
`;

export const GET_RESOURCE = gql`
  query getResource($id: ID!) {
    Resource(where: {id: $id}) {
      ...ResourceData
    }
  }
  ${RESOURCE_DATA}
`;

const getSortField = (sort: Sorts = Sorts.LATEST) => {
    switch (sort) {
        case Sorts.LIKE:
            return 'likes';
        case Sorts.DOWNLOAD:
            return 'downloads';
        case Sorts.LATEST:
        case Sorts.RECOMMEND:
        case Sorts.COMMENT:
        default:
            return 'createdAt';
    }
}

export const GET_LATEST_RESOURCES = (sort: Sorts = Sorts.LATEST) => gql`
  query getResources($type: String, $platform: String, $language: String, $categoryId: ID, $categoryType: ResourceCategoryTypeType) {
    allResources(where: {
      type: $type, 
      platform: $platform, 
      language: $language, 
      enable: true, 
      ${sort === Sorts.RECOMMEND ? 'recommend: true,' : ''}
      categoryType: $categoryType,
      categories_some: {id: $categoryId}
    }, sortBy: [${getSortField(sort)}_DESC]) {
      ...ResourceData
    }
  }
  ${RESOURCE_DATA}
`;
