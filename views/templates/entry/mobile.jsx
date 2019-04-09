import React from 'react';
import { render } from 'react-dom';
import Root from '../roots/mobile';
import configureStore from '../../store/configureStore';
import { initContext } from '../../helpers/depend';

initContext();
const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));

// 热更新
if (module.hot) {
  module.hot.accept();
}
