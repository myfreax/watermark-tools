import angular from 'angular'
import fabric from 'fabric'

export let app = angular .module('App', []);
export let canvas = new fabric.Canvas('fabric');


for(let i = 0;i < 90;i++){
    canvas.add(new fabric.Line([1440, 0, 0, 0], {
        left: 0,
        top: 10*i,
        stroke: '#f7f7f7',
        selectable:false
    }));
}

for(let k = 0;k < 144;k++){
    canvas.add(new fabric.Line([0, 0, 0, 900], {
        left: 10*k,
        top: 0,
        stroke: '#f7f7f7',
        selectable:false

    }));
}


canvas.add(new fabric.Text('hello world', {
    top: 200,
    left: 500
}));