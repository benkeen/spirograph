'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spirograph = function (_React$Component) {
    _inherits(Spirograph, _React$Component);

    function Spirograph() {
        _classCallCheck(this, Spirograph);

        return _possibleConstructorReturn(this, (Spirograph.__proto__ || Object.getPrototypeOf(Spirograph)).apply(this, arguments));
    }

    _createClass(Spirograph, [{
        key: 'draw',
        value: function draw() {
            this.theta = 0;
            this.max = this._getMaxLoops(); // figure out when we need to stop looping

            var currView = this;
            this.interval = setInterval(function () {
                currView.nextLine();
            }, 30);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('section', null);
        }
    }]);

    return Spirograph;
}(_react2.default.Component);

exports.default = Spirograph;
//# sourceMappingURL=spirograph.js.map
