'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _desc2, _value2, _class3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

var _mobx = require('mobx');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Store = (_class = function () {
    function Store() {
        var _this = this;

        _classCallCheck(this, Store);

        _initDefineProp(this, 'panels', _descriptor, this);

        _initDefineProp(this, 'windowHeight', _descriptor2, this);

        _initDefineProp(this, 'windowWidth', _descriptor3, this);

        (0, _jquery2.default)(window).resize(function () {
            _this.updateWindowDimensions();
        });
    }

    _createClass(Store, [{
        key: 'updateWindowDimensions',
        value: function updateWindowDimensions() {
            this.windowHeight = (0, _jquery2.default)(window).height();
            this.windowWidth = (0, _jquery2.default)(window).width();
        }
    }, {
        key: 'addPanel',
        value: function addPanel(params) {
            this.panels.push(new Panel(this, params));
        }
    }, {
        key: 'removePanel',
        value: function removePanel(panel) {
            this.panels.splice(this.panels.indexOf(panel), 1);
        }
    }]);

    return Store;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'panels', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'windowHeight', [_mobx.observable], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'windowWidth', [_mobx.observable], {
    enumerable: true,
    initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'removePanel', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'removePanel'), _class.prototype)), _class);
var Panel = (_class3 = function Panel(store, params) {
    var _this2 = this;

    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _nodeUuid2.default.v4();

    _classCallCheck(this, Panel);

    this.id = null;

    _initDefineProp(this, 'currTab', _descriptor4, this);

    _initDefineProp(this, 'innerCircleSizePercentage', _descriptor5, this);

    _initDefineProp(this, 'pointFromCenterPercentage', _descriptor6, this);

    _initDefineProp(this, 'speed', _descriptor7, this);

    _initDefineProp(this, 'lineThickness', _descriptor8, this);

    _initDefineProp(this, 'lineTransparency', _descriptor9, this);

    _initDefineProp(this, 'lineColorHex', _descriptor10, this);

    _initDefineProp(this, 'lineColor', _descriptor11, this);

    _initDefineProp(this, 'outerRadiusInPixels', _descriptor12, this);

    _initDefineProp(this, 'innerRadiusInPixels', _descriptor13, this);

    _initDefineProp(this, 'pointFromCenterInPixels', _descriptor14, this);

    this.store = store;
    this.id = id;

    _lodash2.default.each(Object.keys(params), function (key) {
        _this2[key] = params[key];
    });
} // immutable

, (_descriptor4 = _applyDecoratedDescriptor(_class3.prototype, 'currTab', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, 'innerCircleSizePercentage', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 50;
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class3.prototype, 'pointFromCenterPercentage', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 50;
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class3.prototype, 'speed', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 150;
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class3.prototype, 'lineThickness', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 1;
    }
}), _descriptor9 = _applyDecoratedDescriptor(_class3.prototype, 'lineTransparency', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 0.5;
    }
}), _descriptor10 = _applyDecoratedDescriptor(_class3.prototype, 'lineColorHex', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '#0044cc';
    }
}), _descriptor11 = _applyDecoratedDescriptor(_class3.prototype, 'lineColor', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return {
            r: 50,
            g: 150,
            b: 255
        };
    }
}), _descriptor12 = _applyDecoratedDescriptor(_class3.prototype, 'outerRadiusInPixels', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor13 = _applyDecoratedDescriptor(_class3.prototype, 'innerRadiusInPixels', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor14 = _applyDecoratedDescriptor(_class3.prototype, 'pointFromCenterInPixels', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class3);

// return a singleton store

exports.default = new Store();
//# sourceMappingURL=store.js.map
