import fabric from 'fabric'
import {app, canvas} from './app'
import FontFaceObserver from 'fontfaceobserver'
import fontsConfig from './config/font'
import './factory'
import './directive'

let fontCache = [];
app.controller('canvasCtrl', ['$scope', 'commonFactory', ($scope, commonFactory) => {

    //初始化tab的值
    $scope.tab = 1;

    $scope.fonts = fontsConfig;

	/**
     *获取文本
	 */
	$scope.getText = () => commonFactory.getActiveProp('text');

	/**
     * 设置文本
	 * @param value string
	 */
    $scope.setText = value => commonFactory.setActiveProp('text', value);

	/**
     * 添加文本元素
	 */
	$scope.addText = () => {
        if ($scope.info) {
            canvas.add(new fabric.Text($scope.info, {
                top: Math.random() * 200,
                left: Math.random() * 100,
            }));
            $scope.info = '';
        }
    };

	/**
     * 获取字体大小
	 */
	$scope.getFontSize = () => commonFactory.getActiveStyle('fontSize');

	/**
     * 设置字体大小
	 * @param value int
	 */
    $scope.setFontSize = value => {
        commonFactory.setActiveStyle('fontSize', parseInt(value, 10));
    };

	/**
     * 获取行高
	 */
	$scope.getLineHeight = () => commonFactory.getActiveStyle('lineHeight');

	/**
     * 设置行高
	 * @param value
	 * @returns {*}
	 */
    $scope.setLineHeight = value => {
        return commonFactory.setActiveStyle('lineHeight', parseInt(value) / 10);
    };

	/**
     * 获取字体间隔
	 */
	$scope.getCharSpacing = () => commonFactory.getActiveStyle('charSpacing');

	/**
     * 设置字体间隔
	 * @param value
	 * @returns {*}
	 */
    $scope.setCharSpacing = value => {
        return commonFactory.setActiveStyle('charSpacing', parseInt(value))
    };

	/**
     * 获取填充样式
	 */
	$scope.getFill = () => commonFactory.getActiveStyle('fill');

	/**
     *  设置填充央视
	 * @param value #fff
	 * @returns {*}
	 */
    $scope.setFill = value => {
        return commonFactory.setActiveStyle('fill', value)
    };

	/**
     * 获取边框的画线方式
	 */
	$scope.getStroke = () => commonFactory.getActiveStyle('stroke');

	/**
     * 设置边框的画线方式
	 * @param value
	 * @returns {*}
	 */
    $scope.setStroke = value => {
        return commonFactory.setActiveStyle('stroke', value)
    };

	/**
     * 获取背景颜色
	 */
	$scope.getBgColor = () => commonFactory.getActiveStyle('backgroundColor');

	/**
     * 设置背景颜色
	 * @param value
	 * @returns {*}
	 */
	$scope.setBgColor = value => {
        return commonFactory.setActiveStyle('backgroundColor', value)
    };

	/**
     * 获取文本对齐方式
	 */
	$scope.getTextAlign = () => commonFactory.capitalize(commonFactory.getActiveProp('textAlign'));

	/**
     * 设置文本对齐
	 * @param value string
	 */
	$scope.setTextAlign = value => commonFactory.setActiveProp('textAlign', value.toLowerCase());

	/**
     * 获取文本背景颜色
	 */
	$scope.getTextBgColor = () => commonFactory.getActiveProp('textBackgroundColor');

	/**
     * 设置文本背景颜色
	 * @param value #fff
	 */
	$scope.setTextBgColor = value => commonFactory.setActiveProp('textBackgroundColor', value);


	/**
     * 获取字体类型
	 */
	$scope.getFontFamily = () => commonFactory.getActiveProp('fontFamily').toLowerCase();

	/**
     * 设置字体类型
     * 字体是异步加载，并缓存
	 * @param value string
	 */
	$scope.setFontFamily = value => {
        let font = new FontFaceObserver(value);
        font.load().then(() => {
            fontCache.push(value);
            return commonFactory.setActiveProp('fontFamily', value.toLowerCase());
        }).catch((err) => {
            console.info(err);
        });
    };

	/**
     * 获取透明度
	 */
	$scope.getOpacity = () => commonFactory.getActiveStyle('opacity') * 100;


	/**
     * 设置字体透明度
	 * @param value
	 */
    $scope.setOpacity = value => {
        commonFactory.setActiveStyle('opacity', parseInt(value, 10) / 100);
    };

	let world = new fabric.Text('world', {
		top: 0,
		left: 0,
		hasControls: false,

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



	function updateScope(options) {
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
		let points = [];
		let eles = canvas.getObjects();

		for (let i = 2; i < eles.length; i++) {
			points.push(eles[i].getLeft(), eles[i].getTop()); //获取文本的元素的x,y
		}
		let dup = findDuplicates(points);
		//查找点
		if (dup.length > 0) {
			let firstPos = points.indexOf(dup[0]);
			let sedPos = points.lastIndexOf(dup[0]);
			//  画线
			if (firstPos % 2 === 0) {
				eles[1].set('y2', 900);
				eles[1].set('left', points[firstPos]);
			} else {
				eles[1].set('x1', 1440);
				eles[1].set('top', points[firstPos]);
			}

		} else {
			eles[1].set('x1', 0);
			eles[1].set('y2', 0);
			eles[1].set('top', 0);
			eles[1].set('top', 0);
		}
	});
}])
;


