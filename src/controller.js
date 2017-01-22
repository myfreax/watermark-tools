import fabric from 'fabric'
import {app, canvas} from './app'
import FontFaceObserver from 'fontfaceobserver'
import fontsConfig from './config/font'
import './factory'
import './directive'

let fontCache = [];

app.controller('canvasCtrl', ['$scope', 'commonFactory', ($scope, commonFactory) => {


    let world = new fabric.Text('world', {
        top: 0,
        left: 0,
        hasControls: false
    });

    let hello = new fabric.Text('hello', {
        top: 50,
        left: 40,
        hasControls: false

    });

    let excl = new fabric.Text('!!', {
        top: 100,
        left: 10,
        hasControls: false

    });


    canvas.add(world, hello, excl);


    console.info('高度', world.getHeight());   //高度
    console.info('宽度', world.getWidth());    //宽度
    console.info('对象元素中心，与canvas的对象无关，是自身的中点', world.getCenterPoint());  //对象元素中心，与canvas的对象无关，是自身的中点
    console.info('获取与顶部的距离', world.getLeft()); //获取与顶部的距离
    console.info('获取与左边的距离', world.getTop());  //获取与左边的距离
    console.info('getCanvasHeight', canvas.getHeight());
    console.info('getCanvasWidth', canvas.getWidth());

    function updateScope(options) {
        console.info('这个点鼠标第二次点击的坐标点', canvas.getPointer(options.e));// 这个点鼠标第二次点击的坐标点
        $scope.tab = 2;
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    }


    function findDuplicates(data) {
        let result = [];
        data.forEach(function (element, index) {
            if (data.indexOf(element, index + 2) > -1) {
                if (result.indexOf(element) === -1) {
                    result.push(element);
                }
            }
        });
        return result;
    }

    canvas
        .on('object:selected', updateScope)
        .on('group:selected', updateScope)
        .on('path:created', updateScope)
        .on('selection:cleared', updateScope);

    canvas.on('object:moving', (options) => {
        //计算五个点的位置，上左，上右，下左，下右,中心点
        console.info('left', 'top', options.target.getLeft(), options.target.getTop());
        console.info('中点', options.target.getLeft() + options.target.getWidth() / 2, options.target.getTop() + options.target.getHeight() / 2);
        console.info('上左', options.target.getLeft(), options.target.getTop());
        let points = [];
        let ele = canvas.getObjects();
        console.info(ele);

        for (let i = 0; i < ele.length; i++) {
            points.push(ele[i].getLeft(), ele[i].getTop());
        }

        console.info(points);
        let dup = findDuplicates(points);
        let line = null;

        //查找点
        if(dup.length > 0){
            let firstPos = points.indexOf(dup[0]);
            let sedPos = points.lastIndexOf(dup[0]);
            console.info('indexOf',points[firstPos],firstPos%2===0?points[firstPos+1]:points[firstPos-1]);
            console.info('lastIndexOf',points[sedPos],sedPos%2===0?points[sedPos+1]:points[sedPos-1]);

            //  画线
            if (firstPos%2===0){
                // 这条线应该在全局共享，方便查找移除
                 line = new fabric.Line([0, 0, 0, 900], {
                    left: points[firstPos],
                    top: 0,
                    stroke: 'red',
                    selectable:false
                });
                console.info('画x轴的偏移线',{
                    left: points[firstPos],
                    top: 0,
                    stroke: 'red',
                    selectable:false
                })
            }else{
                 line = new fabric.Line([1440, 0, 0, 0], {
                    left: 0,
                    top: points[firstPos],
                    stroke: 'red',
                    selectable:false
                });
                console.info('画y轴的偏移线', {
                    left: 0,
                    top: points[firstPos],
                    stroke: 'red',
                    selectable:false
                })
            }
            canvas.add(line);
            //canvas.remove(line);


        }

    });


    canvas.on('object:scaling', options => {
        console.info('中点', options.target.getCenterPoint());
        console.info('width', options.target.getWidth());
        console.info('height', options.target.getHeight());
    });


    //初始化tab的值
    $scope.tab = 1;

    $scope.fonts = fontsConfig;

    $scope.getText = () => {
        return commonFactory.getActiveProp('text');
    };

    $scope.setText = value => {
        return commonFactory.setActiveProp('text', value);
    };


    $scope.addText = () => {
        if ($scope.info) {
            canvas.add(new fabric.Text($scope.info, {
                top: Math.random() * 200,
                left: Math.random() * 100,
            }));
            $scope.info = '';
        }
    };


    $scope.getFontSize = () => {
        return commonFactory.getActiveStyle('fontSize');
    };

    $scope.setFontSize = (value) => {
        commonFactory.setActiveStyle('fontSize', parseInt(value, 10));
    };


    $scope.getLineHeight = () => {
        return commonFactory.getActiveStyle('lineHeight');
    };

    $scope.setLineHeight = value => {
        return commonFactory.setActiveStyle('lineHeight', parseInt(value) / 10);
    };

    $scope.getCharSpacing = () => {
        return commonFactory.getActiveStyle('charSpacing');
    };

    $scope.setCharSpacing = value => {
        return commonFactory.setActiveStyle('charSpacing', parseInt(value))
    };

    $scope.getFill = () => {
        return commonFactory.getActiveStyle('fill')
    };

    $scope.setFill = value => {
        return commonFactory.setActiveStyle('fill', value)
    };

    $scope.getStroke = () => {
        return commonFactory.getActiveStyle('stroke')
    };

    $scope.setStroke = value => {
        return commonFactory.setActiveStyle('stroke', value)
    };


    $scope.getBgColor = () => {
        return commonFactory.getActiveStyle('backgroundColor')
    };

    $scope.setBgColor = value => {
        return commonFactory.setActiveStyle('backgroundColor', value)
    };


    $scope.getTextAlign = function () {
        return commonFactory.capitalize(commonFactory.getActiveProp('textAlign'));
    };


    $scope.setTextAlign = function (value) {
        return commonFactory.setActiveProp('textAlign', value.toLowerCase());
    };


    $scope.getTextBgColor = function () {
        return commonFactory.getActiveProp('textBackgroundColor');
    };


    $scope.setTextBgColor = function (value) {
        return commonFactory.setActiveProp('textBackgroundColor', value);
    };


    $scope.getFontFamily = function () {
        return commonFactory.getActiveProp('fontFamily').toLowerCase();
    };

    $scope.setFontFamily = value => {
        let font = new FontFaceObserver(value);
        font.load().then(function () {
            fontCache.push(value);
            return commonFactory.setActiveProp('fontFamily', value.toLowerCase());
        }).catch((err) => {
            console.info(err);
        });
    };

    $scope.getOpacity = function () {
        return commonFactory.getActiveStyle('opacity') * 100;
    };


    $scope.setOpacity = function (value) {
        commonFactory.setActiveStyle('opacity', parseInt(value, 10) / 100);
    };
}])
;


