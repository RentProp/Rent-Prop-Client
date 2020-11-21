import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.scss';
import rootSaga from './store/sagas';
import rootReducer from './store/reducers';
import Chat from './chat';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

const store = createStore(
    rootReducer,
    enhancer
);

sagaMiddleware.run(rootSaga);

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );


const ChatIndex = () => {
  return (
    <div style ={{   justifyContent: "left", WebKitScrollBar: "none", fontSize: "10px"}}>
    <Provider store={store}>
        <Chat />
    </Provider>
    </div>
  );
}

export default ChatIndex;