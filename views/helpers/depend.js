import * as _ from 'lodash';
import * as $ from './unit';
import { bindActionCreators } from 'redux';
import * as baseAction from '../actions/baseAction';
import * as userAction from '../actions/userAction';
import * as blogAction from '../actions/blogAction';

export function initContext() {
	window._ = _;
	window.$ = $;
  window.bindActionCreators = bindActionCreators;
  window.baseAction = baseAction;
  window.userAction = userAction;
  window.blogAction = blogAction;
}
