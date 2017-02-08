import angular from 'angular'
import fabric from 'fabric'

export let app = angular .module('App', []);
export let canvas = new fabric.Canvas('fabric');
let xArray = [];
let YArray = [];

for(let i = 0;i < 90;i++){
    xArray.push(new fabric.Line([1440, 0, 0, 0], {
        left: 0,
        top: 10*i,
        stroke: '#f7f7f7',
        selectable:false
    }));
}

for(let k = 0;k < 144;k++){
    YArray.push(new fabric.Line([0, 0, 0, 900], {
        left: 10*k,
        top: 0,
        stroke: '#f7f7f7',
        selectable:false
    }));
}


let optionsGroup = new fabric.Group(YArray.concat(xArray),{selectable:false});

let redLine = new fabric.Line([0, 0, 0, 0], {
    left: 0,
    top: 0,
    stroke: 'red',
    selectable: false,
    auxiliary: true
});


canvas.add(optionsGroup);
canvas.add(redLine);
