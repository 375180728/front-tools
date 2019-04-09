import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';

export function initUI() {
  window.UI = {};
	window.UI.Modal = Modal;
	window.UI.message = message;
}