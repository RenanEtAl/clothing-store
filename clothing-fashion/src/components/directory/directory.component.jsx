import React from "react";
import { connect } from "react-redux";
import MenuItem from "../menu-item/menu-item.component";
import { createStructuredSelector } from "reselect";

import "./directory.styles.scss";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

const Directory = ({ sections }) => (
  //   <div className='directory-menu'>
  //     {this.state.sections.map(({ title, imageUrl, id, size }) => (
  //       <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
  //     ))}
  //   </div>

  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
