/**
 * Created by Freax on 17-1-19.
 * @blog http://www.myfreax.com
 */
import {app, canvas} from './app'
app.factory('commonFactory', () => {
    return {
		/**
         * 设置活动元素风格
		 * @param styleName
		 * @param value
		 * @param object
		 */
		setActiveStyle (styleName, value, object) {
            object = object || canvas.getActiveObject();
            if (!object) return;

            if (object.setSelectionStyles && object.isEditing) {
                let style = {};
                style[styleName] = value;
                object.setSelectionStyles(style);
                object.setCoords();
            }
            else {
                object.set(styleName, value);
            }
            object.setCoords();
            canvas.renderAll();
        },

		/**
         * 获取活动元素风格
		 * @param styleName
		 * @param object
		 * @returns {*}
		 */
		getActiveStyle (styleName, object) {
            object = object || canvas.getActiveObject();
            if (!object) return '';
            return (object.getSelectionStyles && object.isEditing)
                ? (object.getSelectionStyles()[styleName] || '')
                : (object[styleName] || '');
        },

		/**
         * 获取活动元素属性
		 * @param attr
		 * @returns {*}
		 */
		getActiveProp(attr){
            let object = canvas.getActiveObject();
            if (!object) return '';
            return object[attr] || '';
        },

		/**
         * 设置活动元素的属性
		 * @param attr
		 * @param value
		 */
		setActiveProp(attr,value){
            let object = canvas.getActiveObject();
            if (!object) return;
            object.set(attr, value).setCoords();
            canvas.renderAll();
        },

		/***
         * 转换为大写
		 * @param string
		 * @returns {string}
		 */
		capitalize(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
});