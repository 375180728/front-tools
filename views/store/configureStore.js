import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import http from '../middleware/http';
import relations from '../middleware/relations';
import rootReducer from '../reducers';
import async from '../middleware/async';

export default function configureStore(initialState) {
  var composeMiddleware;

  if (window.devToolsExtension) {
    composeMiddleware = compose(
      applyMiddleware(thunk, async, relations, http),
      window.devToolsExtension()
    );
  } else {
    composeMiddleware = compose(applyMiddleware(thunk, async, relations, http));
  }

  return createStore(rootReducer, initialState, composeMiddleware);
}
