import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
  TitleContainer,
  CollectionPreviewContainer,
  PreviewContainer
} from "./collection-preview.styles";
import { withRouter } from "react-router-dom";

export const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <TitleContainer title={`View ${title} Collection`} onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
