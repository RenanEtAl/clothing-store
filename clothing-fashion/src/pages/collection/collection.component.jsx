import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from "./collection.styles";

const CollectionPage = ({ collection }) => {
  //console.log('collectionpage', collection);
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

// second optional parameter - props of the component that we are wrapping in to connect
const mapStateToProps = (state, ownProps) => ({
  // match comes from the route component
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
