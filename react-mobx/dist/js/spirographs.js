'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _class3, _class4;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import DevTools from 'mobx-react-devtools';


var SpirographPanels = (0, _mobxReact.observer)(_class = function (_React$Component) {
    _inherits(SpirographPanels, _React$Component);

    function SpirographPanels() {
        _classCallCheck(this, SpirographPanels);

        return _possibleConstructorReturn(this, (SpirographPanels.__proto__ || Object.getPrototypeOf(SpirographPanels)).apply(this, arguments));
    }

    _createClass(SpirographPanels, [{
        key: 'getPanels',
        value: function getPanels() {
            var _this2 = this;

            var panels = this.props.store.panels;

            return _lodash2.default.map(panels, function (panel, i) {
                return _react2.default.createElement(Panel, { store: _this2.props.store, panel: panel, key: i });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'ol',
                    { id: 'spirographs' },
                    this.getPanels()
                )
            );
        }
    }]);

    return SpirographPanels;
}(_react2.default.Component)) || _class;

var Panel = (0, _mobxReact.observer)(_class2 = function (_React$Component2) {
    _inherits(Panel, _React$Component2);

    function Panel() {
        _classCallCheck(this, Panel);

        return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
    }

    _createClass(Panel, [{
        key: 'getTab',
        value: function getTab() {
            if (this.props.panel.currTab === 'general') {
                return _react2.default.createElement(GeneralTab, this.props);
            } else {
                return _react2.default.createElement(StylesTab, this.props);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var currTab = this.props.panel.currTab;

            var generalTabClass = currTab === 'general' ? 'selected' : '';
            var stylesTabClass = currTab === 'styles' ? 'selected' : '';

            return _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'spiro-tabs' },
                    _react2.default.createElement(
                        'div',
                        { className: 'spiro-controls' },
                        _react2.default.createElement(
                            'a',
                            { href: '#', className: 'destroy', title: 'Close this panel' },
                            'x'
                        )
                    ),
                    _react2.default.createElement(
                        'ol',
                        null,
                        _react2.default.createElement(
                            'li',
                            { className: generalTabClass },
                            _react2.default.createElement(
                                'a',
                                { href: '#', 'data-tab': 'general' },
                                'General'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: stylesTabClass },
                            _react2.default.createElement(
                                'a',
                                { href: '#', 'data-tab': 'styles' },
                                'Styles'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'tabContent' },
                    _react2.default.createElement(
                        'div',
                        { className: 'well' },
                        this.getTab()
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'well well-small' },
                    _react2.default.createElement('span', { className: 'spinner' }),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn-small btn-primary actionButton' },
                        'Draw \xBB'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'canvasWrapper' },
                    _react2.default.createElement('canvas', { className: 'spiroCanvas' })
                )
            );
        }
    }]);

    return Panel;
}(_react2.default.Component)) || _class2;

var GeneralTab = (0, _mobxReact.observer)(_class3 = function (_React$Component3) {
    _inherits(GeneralTab, _React$Component3);

    function GeneralTab() {
        _classCallCheck(this, GeneralTab);

        return _possibleConstructorReturn(this, (GeneralTab.__proto__ || Object.getPrototypeOf(GeneralTab)).apply(this, arguments));
    }

    _createClass(GeneralTab, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _props$panel = this.props.panel,
                id = _props$panel.id,
                innerCircleSizePercentage = _props$panel.innerCircleSizePercentage,
                pointFromCenterPercentage = _props$panel.pointFromCenterPercentage,
                speed = _props$panel.speed;


            return _react2.default.createElement(
                'table',
                { className: 'table' },
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'innerCircleSizePercentage' + id },
                                'Inner Circle Size'
                            )
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement('input', { type: 'range', className: 'innerCircleSizePercentage', id: 'innerCircleSizePercentage' + id,
                                value: innerCircleSizePercentage, min: '1', max: '99', onChange: function onChange(e) {
                                    _this5.props.panel.innerCircleSizePercentage = e.target.value;
                                } }),
                            _react2.default.createElement(
                                'ol',
                                { className: 'rangeTip' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipLeft' },
                                    'Small'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipRight' },
                                    'Large'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'pointFromCenterPercentage' + id },
                                'Point from Center'
                            )
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement('input', { type: 'range', className: 'pointFromCenterPercentage', id: 'pointFromCenterPercentage' + id,
                                value: pointFromCenterPercentage, min: '1', max: '99' }),
                            _react2.default.createElement(
                                'ol',
                                { className: 'rangeTip' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipLeft' },
                                    'Small'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipRight' },
                                    'Large'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'speed' + id },
                                'Speed'
                            )
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement('input', { type: 'range', className: 'speed', id: 'speed' + id, value: speed, min: '10', max: '300' }),
                            _react2.default.createElement(
                                'ol',
                                { className: 'rangeTip' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipLeft' },
                                    'Slow'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipRight' },
                                    'Fast'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return GeneralTab;
}(_react2.default.Component)) || _class3;

var StylesTab = (0, _mobxReact.observer)(_class4 = function (_React$Component4) {
    _inherits(StylesTab, _React$Component4);

    function StylesTab() {
        _classCallCheck(this, StylesTab);

        return _possibleConstructorReturn(this, (StylesTab.__proto__ || Object.getPrototypeOf(StylesTab)).apply(this, arguments));
    }

    _createClass(StylesTab, [{
        key: 'render',
        value: function render() {
            var _props$panel2 = this.props.panel,
                id = _props$panel2.id,
                lineThickness = _props$panel2.lineThickness,
                lineTransparency = _props$panel2.lineTransparency,
                lineColorHex = _props$panel2.lineColorHex;


            return _react2.default.createElement(
                'table',
                { className: 'table' },
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'lineThickness<%= cid %>' },
                                'Line Thickness'
                            )
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement('input', { type: 'range', className: 'lineThickness', id: 'lineThickness' + id, value: lineThickness,
                                min: '1', step: '1', max: '10' }),
                            _react2.default.createElement(
                                'ol',
                                { className: 'rangeTip' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipLeft' },
                                    'Thin'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipRight' },
                                    'Thick'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'lineTransparency' + id },
                                'Line Transparency'
                            )
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement('input', { type: 'range', className: 'lineTransparency', id: 'lineTransparency' + id, value: lineTransparency,
                                min: '0.01', step: '0.01', max: '1' }),
                            _react2.default.createElement(
                                'ol',
                                { className: 'rangeTip' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipLeft' },
                                    'Transparent'
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'rangeTipRight' },
                                    'Solid'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'lineColour' + id },
                                'Line Colour'
                            )
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'cpicker input-append color', 'data-color': lineColorHex, 'data-color-format': 'hex', id: 'lineColour' + id },
                                _react2.default.createElement('input', { type: 'text', className: 'span2', value: lineColorHex }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'add-on' },
                                    _react2.default.createElement('i', { style: { backgroundColor: lineColorHex } })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return StylesTab;
}(_react2.default.Component)) || _class4;

exports.default = SpirographPanels;
//# sourceMappingURL=spirographs.js.map
