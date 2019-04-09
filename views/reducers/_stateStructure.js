import { getCookie } from '../helpers/unit';

/**
 * 基础状态树结构
 * @type {Object}
 */
export const stateStructure = {
	base: {},
	user: {
		sessid: getCookie('auth')
	},
	blog: {},
	case: {}
}