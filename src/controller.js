import fabric from 'fabric'
import {app, canvas} from './app'
import {supportedFonts} from 'detect-font';

import './factory'
import './directive'

app.controller('canvasCtrl', ['$scope', 'commonFactory', ($scope, commonFactory) => {
    //初始化tab的值
    $scope.tab = 1;

    $scope.getText = () => {
        return commonFactory.getActiveProp('text');
    };

    $scope.setText = value => {
        return commonFactory.setActiveProp('text',value);
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
        return commonFactory.setActiveStyle('lineHeight', parseInt(value)/10);
    };

    $scope.getCharSpacing = () => {
        return commonFactory.getActiveStyle('charSpacing');
    };

    $scope.setCharSpacing = value => {
        return commonFactory.setActiveStyle('charSpacing',parseInt(value))
    };

    $scope.getFill = () => {
        return commonFactory.getActiveStyle('fill')
    };

    $scope.setFill = value => {
        return commonFactory.setActiveStyle('fill',value)
    };

    $scope.getStroke = () => {
        return commonFactory.getActiveStyle('stroke')
    };

    $scope.setStroke = value => {
        return commonFactory.setActiveStyle('stroke',value)
    };


    $scope.getBgColor = () => {
        return commonFactory.getActiveStyle('backgroundColor')
    };

    $scope.setBgColor = value => {
        return commonFactory.setActiveStyle('backgroundColor',value)
    };


    $scope.getTextAlign = function() {
        return commonFactory.capitalize(commonFactory.getActiveProp('textAlign'));
    };


    $scope.setTextAlign = function(value) {
        return commonFactory.setActiveProp('textAlign', value.toLowerCase());
    };


    $scope.getTextBgColor = function() {
        return commonFactory.getActiveProp('textBackgroundColor');
    };


    $scope.setTextBgColor = function(value) {
        return commonFactory.setActiveProp('textBackgroundColor', value);
    };

    function updateScope() {
        $scope.tab = 2;
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    }

    canvas
        .on('object:selected', updateScope)
        .on('group:selected', updateScope)
        .on('path:created', updateScope)
        .on('selection:cleared', updateScope);
}]);

