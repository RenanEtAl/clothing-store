import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {GlobalStyle} from './global.styles'
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import CheckoutPage from "./pages/checkout/checkout.component";
// sending data to firebase
//import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]); 

  return (
    <div>
      <Header />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: user => dispatch(checkUserSession(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// for sending data to firebase
//   unsubscribeFromAuth = null;
//const { setCurrentUser, collectionsArray } = this.props;

// this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//   if (userAuth) {
//     const userRef = await createUserProfileDocument(userAuth);

//     userRef.onSnapshot(snapShot => {
//       setCurrentUser({
//         id: snapShot.id,
//         ...snapShot.data()
//       });
//     });
//   }

//   setCurrentUser(userAuth);
//   // sending data to firebase
//   //addCollectionAndDocuments(
//   //  "collections",
//   // sending shop data to firebase
//   //collectionsArray.map(({ title, items }) => ({ title, items }))
//   //collectionsArray
//   //);
// });
