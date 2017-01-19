/**
 * Created by Freax on 17-1-19.
 * @blog http://www.myfreax.com
 */
import {app, canvas} from './app'
app.factory('commonFactory', () => {
    return {
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

        getActiveStyle (styleName, object) {
            object = object || canvas.getActiveObject();
            if (!object) return '';
            return (object.getSelectionStyles && object.isEditing)
                ? (object.getSelectionStyles()[styleName] || '')
                : (object[styleName] || '');
        },
        getActiveProp(attr){
            let object = canvas.getActiveObject();
            if (!object) return '';
            return object[attr] || '';
        },
        setActiveProp(attr,value){
            let object = canvas.getActiveObject();
            if (!object) return;
            object.set(attr, value).setCoords();
            canvas.renderAll();
        },
        capitalize(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
});