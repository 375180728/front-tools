import React from 'react';
import { render } from 'react-dom';
import Root from '../roots/default';
import configureStore from '../../store/configureStore';
import { initContext } from '../../helpers/depend';
import { initUI } from '../../helpers/pc-depend';

initContext();
initUI();
const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));

// 热更新
if (module.hot) {
  module.hot.accept();
}
