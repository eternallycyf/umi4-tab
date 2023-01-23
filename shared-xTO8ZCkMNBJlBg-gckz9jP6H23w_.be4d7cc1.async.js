"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[596],{47356:function(__unused_webpack_module,exports){eval(`
// This icon file is generated automatically.
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ArrowLeftOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" } }] }, "name": "arrow-left", "theme": "outlined" };
exports["default"] = ArrowLeftOutlined;


//# sourceURL=webpack:///./node_modules/@ant-design/icons-svg/lib/asn/ArrowLeftOutlined.js?`)},44149:function(__unused_webpack_module,exports){eval(`
// This icon file is generated automatically.
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ArrowRightOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z" } }] }, "name": "arrow-right", "theme": "outlined" };
exports["default"] = ArrowRightOutlined;


//# sourceURL=webpack:///./node_modules/@ant-design/icons-svg/lib/asn/ArrowRightOutlined.js?`)},77404:function(module,exports,__webpack_require__){eval(`
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports["default"] = void 0;
  
  var _ArrowLeftOutlined = _interopRequireDefault(__webpack_require__(85317));
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _default = _ArrowLeftOutlined;
  exports["default"] = _default;
  module.exports = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/ArrowLeftOutlined.js?`)},86056:function(module,exports,__webpack_require__){eval(`
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports["default"] = void 0;
  
  var _ArrowRightOutlined = _interopRequireDefault(__webpack_require__(91724));
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _default = _ArrowRightOutlined;
  exports["default"] = _default;
  module.exports = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/ArrowRightOutlined.js?`)},92074:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = __webpack_require__(64836);
var _typeof = __webpack_require__(18698);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _objectSpread2 = _interopRequireDefault(__webpack_require__(42122));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(27424));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(38416));
var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(70215));
var React = _interopRequireWildcard(__webpack_require__(67294));
var _classnames = _interopRequireDefault(__webpack_require__(94184));
var _Context = _interopRequireDefault(__webpack_require__(98399));
var _IconBase = _interopRequireDefault(__webpack_require__(95160));
var _twoTonePrimaryColor = __webpack_require__(46768);
var _utils = __webpack_require__(72479);
var _excluded = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Initial setting
// should move it to antd main repo?
(0, _twoTonePrimaryColor.setTwoToneColor)('#1890ff');
var Icon = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;
  var className = props.className,
    icon = props.icon,
    spin = props.spin,
    rotate = props.rotate,
    tabIndex = props.tabIndex,
    onClick = props.onClick,
    twoToneColor = props.twoToneColor,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var _React$useContext = React.useContext(_Context.default),
    _React$useContext$pre = _React$useContext.prefixCls,
    prefixCls = _React$useContext$pre === void 0 ? 'anticon' : _React$useContext$pre,
    rootClassName = _React$useContext.rootClassName;
  var classString = (0, _classnames.default)(rootClassName, prefixCls, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === 'loading'), _classNames), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;
  var _normalizeTwoToneColo = (0, _utils.normalizeTwoToneColors)(twoToneColor),
    _normalizeTwoToneColo2 = (0, _slicedToArray2.default)(_normalizeTwoToneColo, 2),
    primaryColor = _normalizeTwoToneColo2[0],
    secondaryColor = _normalizeTwoToneColo2[1];
  return /*#__PURE__*/React.createElement("span", (0, _objectSpread2.default)((0, _objectSpread2.default)({
    role: "img",
    "aria-label": icon.name
  }, restProps), {}, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), /*#__PURE__*/React.createElement(_IconBase.default, {
    icon: icon,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = _twoTonePrimaryColor.getTwoToneColor;
Icon.setTwoToneColor = _twoTonePrimaryColor.setTwoToneColor;
var _default = Icon;
exports["default"] = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/components/AntdIcon.js?`)},98399:function(__unused_webpack_module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = __webpack_require__(67294);
var IconContext = /*#__PURE__*/(0, _react.createContext)({});
var _default = IconContext;
exports["default"] = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/components/Context.js?`)},95160:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = __webpack_require__(64836);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(70215));
var _objectSpread2 = _interopRequireDefault(__webpack_require__(42122));
var _utils = __webpack_require__(72479);
var _excluded = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
    secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || (0, _utils.getSecondaryColor)(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return (0, _objectSpread2.default)({}, twoToneColorPalette);
}
var IconBase = function IconBase(props) {
  var icon = props.icon,
    className = props.className,
    onClick = props.onClick,
    style = props.style,
    primaryColor = props.primaryColor,
    secondaryColor = props.secondaryColor,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || (0, _utils.getSecondaryColor)(primaryColor)
    };
  }
  (0, _utils.useInsertStyles)();
  (0, _utils.warning)((0, _utils.isIconDefinition)(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!(0, _utils.isIconDefinition)(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === 'function') {
    target = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return (0, _utils.generate)(target.icon, "svg-".concat(target.name), (0, _objectSpread2.default)({
    className: className,
    onClick: onClick,
    style: style,
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  }, restProps));
};
IconBase.displayName = 'IconReact';
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
var _default = IconBase;
exports["default"] = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/components/IconBase.js?`)},46768:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = __webpack_require__(64836);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getTwoToneColor = getTwoToneColor;
exports.setTwoToneColor = setTwoToneColor;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(27424));
var _IconBase = _interopRequireDefault(__webpack_require__(95160));
var _utils = __webpack_require__(72479);
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = (0, _utils.normalizeTwoToneColors)(twoToneColor),
    _normalizeTwoToneColo2 = (0, _slicedToArray2.default)(_normalizeTwoToneColo, 2),
    primaryColor = _normalizeTwoToneColo2[0],
    secondaryColor = _normalizeTwoToneColo2[1];
  return _IconBase.default.setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = _IconBase.default.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/components/twoTonePrimaryColor.js?`)},85317:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = __webpack_require__(64836);
var _typeof = __webpack_require__(18698);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _objectSpread2 = _interopRequireDefault(__webpack_require__(42122));
var React = _interopRequireWildcard(__webpack_require__(67294));
var _ArrowLeftOutlined = _interopRequireDefault(__webpack_require__(47356));
var _AntdIcon = _interopRequireDefault(__webpack_require__(92074));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

var ArrowLeftOutlined = function ArrowLeftOutlined(props, ref) {
  return /*#__PURE__*/React.createElement(_AntdIcon.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
    ref: ref,
    icon: _ArrowLeftOutlined.default
  }));
};
ArrowLeftOutlined.displayName = 'ArrowLeftOutlined';
var _default = /*#__PURE__*/React.forwardRef(ArrowLeftOutlined);
exports["default"] = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/icons/ArrowLeftOutlined.js?`)},91724:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = __webpack_require__(64836);
var _typeof = __webpack_require__(18698);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _objectSpread2 = _interopRequireDefault(__webpack_require__(42122));
var React = _interopRequireWildcard(__webpack_require__(67294));
var _ArrowRightOutlined = _interopRequireDefault(__webpack_require__(44149));
var _AntdIcon = _interopRequireDefault(__webpack_require__(92074));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

var ArrowRightOutlined = function ArrowRightOutlined(props, ref) {
  return /*#__PURE__*/React.createElement(_AntdIcon.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
    ref: ref,
    icon: _ArrowRightOutlined.default
  }));
};
ArrowRightOutlined.displayName = 'ArrowRightOutlined';
var _default = /*#__PURE__*/React.forwardRef(ArrowRightOutlined);
exports["default"] = _default;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/icons/ArrowRightOutlined.js?`)},72479:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = __webpack_require__(64836);
var _typeof3 = __webpack_require__(18698);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.generate = generate;
exports.getSecondaryColor = getSecondaryColor;
exports.iconStyles = void 0;
exports.isIconDefinition = isIconDefinition;
exports.normalizeAttrs = normalizeAttrs;
exports.normalizeTwoToneColors = normalizeTwoToneColors;
exports.useInsertStyles = exports.svgBaseProps = void 0;
exports.warning = warning;
var _objectSpread2 = _interopRequireDefault(__webpack_require__(42122));
var _typeof2 = _interopRequireDefault(__webpack_require__(18698));
var _colors = __webpack_require__(92138);
var _react = _interopRequireWildcard(__webpack_require__(67294));
var _warning = _interopRequireDefault(__webpack_require__(45520));
var _dynamicCSS = __webpack_require__(93399);
var _Context = _interopRequireDefault(__webpack_require__(98399));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function warning(valid, message) {
  (0, _warning.default)(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return (0, _typeof2.default)(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && ((0, _typeof2.default)(target.icon) === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];
    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/_react.default.createElement(node.tag, (0, _objectSpread2.default)({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }
  return /*#__PURE__*/_react.default.createElement(node.tag, (0, _objectSpread2.default)((0, _objectSpread2.default)({
    key: key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function (child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return (0, _colors.generate)(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
var svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};
exports.svgBaseProps = svgBaseProps;
var iconStyles = "\\n.anticon {\\n  display: inline-block;\\n  color: inherit;\\n  font-style: normal;\\n  line-height: 0;\\n  text-align: center;\\n  text-transform: none;\\n  vertical-align: -0.125em;\\n  text-rendering: optimizeLegibility;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\n\\n.anticon > * {\\n  line-height: 1;\\n}\\n\\n.anticon svg {\\n  display: inline-block;\\n}\\n\\n.anticon::before {\\n  display: none;\\n}\\n\\n.anticon .anticon-icon {\\n  display: block;\\n}\\n\\n.anticon[tabindex] {\\n  cursor: pointer;\\n}\\n\\n.anticon-spin::before,\\n.anticon-spin {\\n  display: inline-block;\\n  -webkit-animation: loadingCircle 1s infinite linear;\\n  animation: loadingCircle 1s infinite linear;\\n}\\n\\n@-webkit-keyframes loadingCircle {\\n  100% {\\n    -webkit-transform: rotate(360deg);\\n    transform: rotate(360deg);\\n  }\\n}\\n\\n@keyframes loadingCircle {\\n  100% {\\n    -webkit-transform: rotate(360deg);\\n    transform: rotate(360deg);\\n  }\\n}\\n";
exports.iconStyles = iconStyles;
var useInsertStyles = function useInsertStyles() {
  var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;
  var _useContext = (0, _react.useContext)(_Context.default),
    csp = _useContext.csp;
  (0, _react.useEffect)(function () {
    (0, _dynamicCSS.updateCSS)(styleStr, '@ant-design-icons', {
      prepend: true,
      csp: csp
    });
  }, []);
};
exports.useInsertStyles = useInsertStyles;

//# sourceURL=webpack:///./node_modules/@ant-design/icons/lib/utils.js?`)},5439:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "T": function() { return /* reexport */ components_Page; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread2.js
var objectSpread2 = __webpack_require__(42122);
var objectSpread2_default = /*#__PURE__*/__webpack_require__.n(objectSpread2);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(94184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/rc-util/es/omit.js
var omit = __webpack_require__(98423);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/context.js
var context = __webpack_require__(53124);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/SizeContext.js
var SizeContext = __webpack_require__(97647);
// EXTERNAL MODULE: ./node_modules/antd/es/skeleton/index.js + 12 modules
var skeleton = __webpack_require__(99559);
// EXTERNAL MODULE: ./node_modules/antd/es/tabs/index.js + 25 modules
var es_tabs = __webpack_require__(86873);
;// CONCATENATED MODULE: ./node_modules/antd/es/card/Grid.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



const Grid = _a => {
  var {
      prefixCls,
      className,
      hoverable = true
    } = _a,
    props = __rest(_a, ["prefixCls", "className", "hoverable"]);
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefix = getPrefixCls('card', prefixCls);
  const classString = classnames_default()(\`\${prefix}-grid\`, className, {
    [\`\${prefix}-grid-hoverable\`]: hoverable
  });
  return /*#__PURE__*/react.createElement("div", Object.assign({}, props, {
    className: classString
  }));
};
/* harmony default export */ var card_Grid = (Grid);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/genComponentStyleHook.js
var genComponentStyleHook = __webpack_require__(67968);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/statistic.js
var statistic = __webpack_require__(45503);
// EXTERNAL MODULE: ./node_modules/antd/es/style/index.js
var style = __webpack_require__(14747);
;// CONCATENATED MODULE: ./node_modules/antd/es/card/style/index.js


// ============================== Styles ==============================
// ============================== Head ==============================
const genCardHeadStyle = token => {
  const {
    antCls,
    componentCls,
    cardHeadHeight,
    cardPaddingBase,
    cardHeadTabsMarginBottom
  } = token;
  return Object.assign(Object.assign({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: cardHeadHeight,
    marginBottom: -1,
    padding: \`0 \${cardPaddingBase}px\`,
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG,
    background: 'transparent',
    borderBottom: \`\${token.lineWidth}px \${token.lineType} \${token.colorBorderSecondary}\`,
    borderRadius: \`\${token.borderRadiusLG}px \${token.borderRadiusLG}px 0 0\`
  }, (0,style/* clearFix */.dF)()), {
    '&-wrapper': {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    '&-title': Object.assign(Object.assign({
      display: 'inline-block',
      flex: 1
    }, style/* textEllipsis */.vS), {
      [\`
          > \${componentCls}-typography,
          > \${componentCls}-typography-edit-content
        \`]: {
        insetInlineStart: 0,
        marginTop: 0,
        marginBottom: 0
      }
    }),
    [\`\${antCls}-tabs-top\`]: {
      clear: 'both',
      marginBottom: cardHeadTabsMarginBottom,
      color: token.colorText,
      fontWeight: 'normal',
      fontSize: token.fontSize,
      '&-bar': {
        borderBottom: \`\${token.lineWidth}px \${token.lineType} \${token.colorBorderSecondary}\`
      }
    }
  });
};
// ============================== Grid ==============================
const genCardGridStyle = token => {
  const {
    cardPaddingBase,
    colorBorderSecondary,
    cardShadow,
    lineWidth
  } = token;
  return {
    width: '33.33%',
    padding: cardPaddingBase,
    border: 0,
    borderRadius: 0,
    boxShadow: \`
      \${lineWidth}px 0 0 0 \${colorBorderSecondary},
      0 \${lineWidth}px 0 0 \${colorBorderSecondary},
      \${lineWidth}px \${lineWidth}px 0 0 \${colorBorderSecondary},
      \${lineWidth}px 0 0 0 \${colorBorderSecondary} inset,
      0 \${lineWidth}px 0 0 \${colorBorderSecondary} inset;
    \`,
    transition: \`all \${token.motionDurationMid}\`,
    '&-hoverable:hover': {
      position: 'relative',
      zIndex: 1,
      boxShadow: cardShadow
    }
  };
};
// ============================== Actions ==============================
const genCardActionsStyle = token => {
  const {
    componentCls,
    iconCls,
    cardActionsLiMargin,
    cardActionsIconSize,
    colorBorderSecondary
  } = token;
  return Object.assign(Object.assign({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    background: token.colorBgContainer,
    borderTop: \`\${token.lineWidth}px \${token.lineType} \${colorBorderSecondary}\`,
    display: 'flex',
    borderRadius: \`0 0 \${token.borderRadiusLG}px \${token.borderRadiusLG}px \`
  }, (0,style/* clearFix */.dF)()), {
    '& > li': {
      margin: cardActionsLiMargin,
      color: token.colorTextDescription,
      textAlign: 'center',
      '> span': {
        position: 'relative',
        display: 'block',
        minWidth: token.cardActionsIconSize * 2,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        cursor: 'pointer',
        '&:hover': {
          color: token.colorPrimary,
          transition: \`color \${token.motionDurationMid}\`
        },
        [\`a:not(\${componentCls}-btn), > \${iconCls}\`]: {
          display: 'inline-block',
          width: '100%',
          color: token.colorTextDescription,
          lineHeight: \`\${token.fontSize * token.lineHeight}px\`,
          transition: \`color \${token.motionDurationMid}\`,
          '&:hover': {
            color: token.colorPrimary
          }
        },
        [\`> \${iconCls}\`]: {
          fontSize: cardActionsIconSize,
          lineHeight: \`\${cardActionsIconSize * token.lineHeight}px\`
        }
      },
      '&:not(:last-child)': {
        borderInlineEnd: \`\${token.lineWidth}px \${token.lineType} \${colorBorderSecondary}\`
      }
    }
  });
};
// ============================== Meta ==============================
const genCardMetaStyle = token => Object.assign(Object.assign({
  margin: \`-\${token.marginXXS}px 0\`,
  display: 'flex'
}, (0,style/* clearFix */.dF)()), {
  '&-avatar': {
    paddingInlineEnd: token.padding
  },
  '&-detail': {
    overflow: 'hidden',
    flex: 1,
    '> div:not(:last-child)': {
      marginBottom: token.marginXS
    }
  },
  '&-title': Object.assign({
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG
  }, style/* textEllipsis */.vS),
  '&-description': {
    color: token.colorTextDescription
  }
});
// ============================== Inner ==============================
const genCardTypeInnerStyle = token => {
  const {
    componentCls,
    cardPaddingBase,
    colorFillAlter
  } = token;
  return {
    [\`\${componentCls}-head\`]: {
      padding: \`0 \${cardPaddingBase}px\`,
      background: colorFillAlter,
      '&-title': {
        fontSize: token.fontSize
      }
    },
    [\`\${componentCls}-body\`]: {
      padding: \`\${token.padding}px \${cardPaddingBase}px\`
    }
  };
};
// ============================== Loading ==============================
const genCardLoadingStyle = token => {
  const {
    componentCls
  } = token;
  return {
    overflow: 'hidden',
    [\`\${componentCls}-body\`]: {
      userSelect: 'none'
    }
  };
};
// ============================== Basic ==============================
const genCardStyle = token => {
  const {
    componentCls,
    cardShadow,
    cardHeadPadding,
    colorBorderSecondary,
    boxShadow,
    cardPaddingBase
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, (0,style/* resetComponent */.Wf)(token)), {
      position: 'relative',
      background: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      [\`&:not(\${componentCls}-bordered)\`]: {
        boxShadow
      },
      [\`\${componentCls}-head\`]: genCardHeadStyle(token),
      [\`\${componentCls}-extra\`]: {
        // https://stackoverflow.com/a/22429853/3040605
        marginInlineStart: 'auto',
        color: '',
        fontWeight: 'normal',
        fontSize: token.fontSize
      },
      [\`\${componentCls}-body\`]: Object.assign({
        padding: cardPaddingBase,
        borderRadius: \` 0 0 \${token.borderRadiusLG}px \${token.borderRadiusLG}px\`
      }, (0,style/* clearFix */.dF)()),
      [\`\${componentCls}-grid\`]: genCardGridStyle(token),
      [\`\${componentCls}-cover\`]: {
        '> *': {
          display: 'block',
          width: '100%'
        },
        img: {
          borderRadius: \`\${token.borderRadiusLG}px \${token.borderRadiusLG}px 0 0\`
        }
      },
      [\`\${componentCls}-actions\`]: genCardActionsStyle(token),
      [\`\${componentCls}-meta\`]: genCardMetaStyle(token)
    }),
    [\`\${componentCls}-bordered\`]: {
      border: \`\${token.lineWidth}px \${token.lineType} \${colorBorderSecondary}\`,
      [\`\${componentCls}-cover\`]: {
        marginTop: -1,
        marginInlineStart: -1,
        marginInlineEnd: -1
      }
    },
    [\`\${componentCls}-hoverable\`]: {
      cursor: 'pointer',
      transition: \`box-shadow \${token.motionDurationMid}, border-color \${token.motionDurationMid}\`,
      '&:hover': {
        borderColor: 'transparent',
        boxShadow: cardShadow
      }
    },
    [\`\${componentCls}-contain-grid\`]: {
      [\`\${componentCls}-body\`]: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      [\`&:not(\${componentCls}-loading) \${componentCls}-body\`]: {
        marginBlockStart: -token.lineWidth,
        marginInlineStart: -token.lineWidth,
        padding: 0
      }
    },
    [\`\${componentCls}-contain-tabs\`]: {
      [\`> \${componentCls}-head\`]: {
        [\`\${componentCls}-head-title, \${componentCls}-extra\`]: {
          paddingTop: cardHeadPadding
        }
      }
    },
    [\`\${componentCls}-type-inner\`]: genCardTypeInnerStyle(token),
    [\`\${componentCls}-loading\`]: genCardLoadingStyle(token),
    [\`\${componentCls}-rtl\`]: {
      direction: 'rtl'
    }
  };
};
// ============================== Size ==============================
const genCardSizeStyle = token => {
  const {
    componentCls,
    cardPaddingSM,
    cardHeadHeightSM
  } = token;
  return {
    [\`\${componentCls}-small\`]: {
      [\`> \${componentCls}-head\`]: {
        minHeight: cardHeadHeightSM,
        padding: \`0 \${cardPaddingSM}px\`,
        fontSize: token.fontSize,
        [\`> \${componentCls}-head-wrapper\`]: {
          [\`> \${componentCls}-extra\`]: {
            fontSize: token.fontSize
          }
        }
      },
      [\`> \${componentCls}-body\`]: {
        padding: cardPaddingSM
      }
    },
    [\`\${componentCls}-small\${componentCls}-contain-tabs\`]: {
      [\`> \${componentCls}-head\`]: {
        [\`\${componentCls}-head-title, \${componentCls}-extra\`]: {
          minHeight: cardHeadHeightSM,
          paddingTop: 0,
          display: 'flex',
          alignItems: 'center'
        }
      }
    }
  };
};
// ============================== Export ==============================
/* harmony default export */ var card_style = ((0,genComponentStyleHook/* default */.Z)('Card', token => {
  const cardToken = (0,statistic/* merge */.TS)(token, {
    cardShadow: token.boxShadowCard,
    cardHeadHeight: token.fontSizeLG * token.lineHeightLG + token.padding * 2,
    cardHeadHeightSM: token.fontSize * token.lineHeight + token.paddingXS * 2,
    cardHeadPadding: token.padding,
    cardPaddingBase: token.paddingLG,
    cardHeadTabsMarginBottom: -token.padding - token.lineWidth,
    cardActionsLiMargin: \`\${token.paddingSM}px 0\`,
    cardActionsIconSize: token.fontSize,
    cardPaddingSM: 12 // Fixed padding.
  });

  return [
  // Style
  genCardStyle(cardToken),
  // Size
  genCardSizeStyle(cardToken)];
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/card/Card.js
var Card_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};









function getAction(actions) {
  const actionList = actions.map((action, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  react.createElement("li", {
    style: {
      width: \`\${100 / actions.length}%\`
    },
    key: \`action-\${index}\`
  }, /*#__PURE__*/react.createElement("span", null, action)));
  return actionList;
}
const Card = /*#__PURE__*/react.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = react.useContext(context/* ConfigContext */.E_);
  const size = react.useContext(SizeContext/* default */.Z);
  const onTabChange = key => {
    var _a;
    (_a = props.onTabChange) === null || _a === void 0 ? void 0 : _a.call(props, key);
  };
  const isContainGrid = () => {
    let containGrid;
    react.Children.forEach(props.children, element => {
      if (element && element.type && element.type === card_Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  };
  const {
      prefixCls: customizePrefixCls,
      className,
      extra,
      headStyle = {},
      bodyStyle = {},
      title,
      loading,
      bordered = true,
      size: customizeSize,
      type,
      cover,
      actions,
      tabList,
      children,
      activeTabKey,
      defaultActiveTabKey,
      tabBarExtraContent,
      hoverable,
      tabProps = {}
    } = props,
    others = Card_rest(props, ["prefixCls", "className", "extra", "headStyle", "bodyStyle", "title", "loading", "bordered", "size", "type", "cover", "actions", "tabList", "children", "activeTabKey", "defaultActiveTabKey", "tabBarExtraContent", "hoverable", "tabProps"]);
  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const [wrapSSR, hashId] = card_style(prefixCls);
  const loadingBlock = /*#__PURE__*/react.createElement(skeleton/* default */.Z, {
    loading: true,
    active: true,
    paragraph: {
      rows: 4
    },
    title: false
  }, children);
  const hasActiveTabKey = activeTabKey !== undefined;
  const extraProps = Object.assign(Object.assign({}, tabProps), {
    [hasActiveTabKey ? 'activeKey' : 'defaultActiveKey']: hasActiveTabKey ? activeTabKey : defaultActiveTabKey,
    tabBarExtraContent
  });
  let head;
  const tabs = tabList && tabList.length ? /*#__PURE__*/react.createElement(es_tabs/* default */.Z, Object.assign({
    size: "large"
  }, extraProps, {
    className: \`\${prefixCls}-head-tabs\`,
    onChange: onTabChange,
    items: tabList.map(item => {
      var _a;
      return {
        label: item.tab,
        key: item.key,
        disabled: (_a = item.disabled) !== null && _a !== void 0 ? _a : false
      };
    })
  })) : null;
  if (title || extra || tabs) {
    head = /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-head\`,
      style: headStyle
    }, /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-head-wrapper\`
    }, title && /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-head-title\`
    }, title), extra && /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-extra\`
    }, extra)), tabs);
  }
  const coverDom = cover ? /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-cover\`
  }, cover) : null;
  const body = /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-body\`,
    style: bodyStyle
  }, loading ? loadingBlock : children);
  const actionDom = actions && actions.length ? /*#__PURE__*/react.createElement("ul", {
    className: \`\${prefixCls}-actions\`
  }, getAction(actions)) : null;
  const divProps = (0,omit/* default */.Z)(others, ['onTabChange']);
  const mergedSize = customizeSize || size;
  const classString = classnames_default()(prefixCls, {
    [\`\${prefixCls}-loading\`]: loading,
    [\`\${prefixCls}-bordered\`]: bordered,
    [\`\${prefixCls}-hoverable\`]: hoverable,
    [\`\${prefixCls}-contain-grid\`]: isContainGrid(),
    [\`\${prefixCls}-contain-tabs\`]: tabList && tabList.length,
    [\`\${prefixCls}-\${mergedSize}\`]: mergedSize,
    [\`\${prefixCls}-type-\${type}\`]: !!type,
    [\`\${prefixCls}-rtl\`]: direction === 'rtl'
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("div", Object.assign({
    ref: ref
  }, divProps, {
    className: classString
  }), head, coverDom, body, actionDom));
});
/* harmony default export */ var card_Card = (Card);
;// CONCATENATED MODULE: ./node_modules/antd/es/card/Meta.js
var Meta_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



const Meta = props => {
  const {
      prefixCls: customizePrefixCls,
      className,
      avatar,
      title,
      description
    } = props,
    others = Meta_rest(props, ["prefixCls", "className", "avatar", "title", "description"]);
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const classString = classnames_default()(\`\${prefixCls}-meta\`, className);
  const avatarDom = avatar ? /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-meta-avatar\`
  }, avatar) : null;
  const titleDom = title ? /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-meta-title\`
  }, title) : null;
  const descriptionDom = description ? /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-meta-description\`
  }, description) : null;
  const MetaDetail = titleDom || descriptionDom ? /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-meta-detail\`
  }, titleDom, descriptionDom) : null;
  return /*#__PURE__*/react.createElement("div", Object.assign({}, others, {
    className: classString
  }), avatarDom, MetaDetail);
};
/* harmony default export */ var card_Meta = (Meta);
;// CONCATENATED MODULE: ./node_modules/antd/es/card/index.js



const es_card_Card = card_Card;
es_card_Card.Grid = card_Grid;
es_card_Card.Meta = card_Meta;
if (false) {}
/* harmony default export */ var card = (es_card_Card);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(45987);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var esm_objectSpread2 = __webpack_require__(1413);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(71002);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-provider/es/index.js + 25 modules
var es = __webpack_require__(73964);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/index.js + 4 modules
var config_provider = __webpack_require__(58720);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(15671);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(43144);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(32531);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(73568);
// EXTERNAL MODULE: ./node_modules/rc-resize-observer/es/index.js + 4 modules
var rc_resize_observer_es = __webpack_require__(48555);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(74902);
// EXTERNAL MODULE: ./node_modules/rc-util/es/raf.js
var raf = __webpack_require__(75164);
;// CONCATENATED MODULE: ./node_modules/antd/es/_util/throttleByAnimationFrame.js


function throttleByAnimationFrame(fn) {
  let requestId;
  const later = args => () => {
    requestId = null;
    fn.apply(void 0, (0,toConsumableArray/* default */.Z)(args));
  };
  const throttled = function () {
    if (requestId == null) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      requestId = (0,raf/* default */.Z)(later(args));
    }
  };
  throttled.cancel = () => {
    raf/* default.cancel */.Z.cancel(requestId);
    requestId = null;
  };
  return throttled;
}
/* harmony default export */ var _util_throttleByAnimationFrame = (throttleByAnimationFrame);
;// CONCATENATED MODULE: ./node_modules/antd/es/affix/style/index.js

// ============================== Shared ==============================
const genSharedAffixStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexPopup
    }
  };
};
// ============================== Export ==============================
/* harmony default export */ var affix_style = ((0,genComponentStyleHook/* default */.Z)('Affix', token => {
  const affixToken = (0,statistic/* merge */.TS)(token, {
    zIndexPopup: token.zIndexBase + 10
  });
  return [genSharedAffixStyle(affixToken)];
}));
// EXTERNAL MODULE: ./node_modules/rc-util/es/Dom/addEventListener.js
var addEventListener = __webpack_require__(64019);
;// CONCATENATED MODULE: ./node_modules/antd/es/affix/utils.js

function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : {
    top: 0,
    bottom: window.innerHeight
  };
}
function getFixedTop(placeholderReact, targetRect, offsetTop) {
  if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}
function getFixedBottom(placeholderReact, targetRect, offsetBottom) {
  if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}
// ======================== Observer ========================
const TRIGGER_EVENTS = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
let observerEntities = [];
function getObserverEntities() {
  // Only used in test env. Can be removed if refactor.
  return observerEntities;
}
function addObserveTarget(target, affix) {
  if (!target) {
    return;
  }
  let entity = observerEntities.find(item => item.target === target);
  if (entity) {
    entity.affixList.push(affix);
  } else {
    entity = {
      target,
      affixList: [affix],
      eventHandlers: {}
    };
    observerEntities.push(entity);
    // Add listener
    TRIGGER_EVENTS.forEach(eventName => {
      entity.eventHandlers[eventName] = (0,addEventListener/* default */.Z)(target, eventName, () => {
        entity.affixList.forEach(targetAffix => {
          targetAffix.lazyUpdatePosition();
        });
      });
    });
  }
}
function removeObserveTarget(affix) {
  const observerEntity = observerEntities.find(oriObserverEntity => {
    const hasAffix = oriObserverEntity.affixList.some(item => item === affix);
    if (hasAffix) {
      oriObserverEntity.affixList = oriObserverEntity.affixList.filter(item => item !== affix);
    }
    return hasAffix;
  });
  if (observerEntity && observerEntity.affixList.length === 0) {
    observerEntities = observerEntities.filter(item => item !== observerEntity);
    // Remove listener
    TRIGGER_EVENTS.forEach(eventName => {
      const handler = observerEntity.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }
}
;// CONCATENATED MODULE: ./node_modules/antd/es/affix/index.js












function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
var AffixStatus;
(function (AffixStatus) {
  AffixStatus[AffixStatus["None"] = 0] = "None";
  AffixStatus[AffixStatus["Prepare"] = 1] = "Prepare";
})(AffixStatus || (AffixStatus = {}));
let Affix = /*#__PURE__*/function (_React$Component) {
  (0,inherits/* default */.Z)(Affix, _React$Component);
  var _super = (0,createSuper/* default */.Z)(Affix);
  function Affix() {
    var _this;
    (0,classCallCheck/* default */.Z)(this, Affix);
    _this = _super.apply(this, arguments);
    _this.state = {
      status: AffixStatus.None,
      lastAffix: false,
      prevTarget: null
    };
    _this.getOffsetTop = () => {
      const {
        offsetBottom,
        offsetTop
      } = _this.props;
      return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
    };
    _this.getOffsetBottom = () => _this.props.offsetBottom;
    _this.savePlaceholderNode = node => {
      _this.placeholderNode = node;
    };
    _this.saveFixedNode = node => {
      _this.fixedNode = node;
    };
    // =================== Measure ===================
    _this.measure = () => {
      const {
        status,
        lastAffix
      } = _this.state;
      const {
        onChange
      } = _this.props;
      const targetFunc = _this.getTargetFunc();
      if (status !== AffixStatus.Prepare || !_this.fixedNode || !_this.placeholderNode || !targetFunc) {
        return;
      }
      const offsetTop = _this.getOffsetTop();
      const offsetBottom = _this.getOffsetBottom();
      const targetNode = targetFunc();
      if (!targetNode) {
        return;
      }
      const newState = {
        status: AffixStatus.None
      };
      const targetRect = getTargetRect(targetNode);
      const placeholderReact = getTargetRect(_this.placeholderNode);
      const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
      const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);
      if (placeholderReact.top === 0 && placeholderReact.left === 0 && placeholderReact.width === 0 && placeholderReact.height === 0) {
        return;
      }
      if (fixedTop !== undefined) {
        newState.affixStyle = {
          position: 'fixed',
          top: fixedTop,
          width: placeholderReact.width,
          height: placeholderReact.height
        };
        newState.placeholderStyle = {
          width: placeholderReact.width,
          height: placeholderReact.height
        };
      } else if (fixedBottom !== undefined) {
        newState.affixStyle = {
          position: 'fixed',
          bottom: fixedBottom,
          width: placeholderReact.width,
          height: placeholderReact.height
        };
        newState.placeholderStyle = {
          width: placeholderReact.width,
          height: placeholderReact.height
        };
      }
      newState.lastAffix = !!newState.affixStyle;
      if (onChange && lastAffix !== newState.lastAffix) {
        onChange(newState.lastAffix);
      }
      _this.setState(newState);
    };
    // @ts-ignore TS6133
    _this.prepareMeasure = () => {
      // event param is used before. Keep compatible ts define here.
      _this.setState({
        status: AffixStatus.Prepare,
        affixStyle: undefined,
        placeholderStyle: undefined
      });
      // Test if \`updatePosition\` called
      if (false) {}
    };
    _this.updatePosition = _util_throttleByAnimationFrame(() => {
      _this.prepareMeasure();
    });
    _this.lazyUpdatePosition = _util_throttleByAnimationFrame(() => {
      const targetFunc = _this.getTargetFunc();
      const {
        affixStyle
      } = _this.state;
      // Check position change before measure to make Safari smooth
      if (targetFunc && affixStyle) {
        const offsetTop = _this.getOffsetTop();
        const offsetBottom = _this.getOffsetBottom();
        const targetNode = targetFunc();
        if (targetNode && _this.placeholderNode) {
          const targetRect = getTargetRect(targetNode);
          const placeholderReact = getTargetRect(_this.placeholderNode);
          const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
          const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);
          if (fixedTop !== undefined && affixStyle.top === fixedTop || fixedBottom !== undefined && affixStyle.bottom === fixedBottom) {
            return;
          }
        }
      }
      // Directly call prepare measure since it's already throttled.
      _this.prepareMeasure();
    });
    return _this;
  }
  (0,createClass/* default */.Z)(Affix, [{
    key: "getTargetFunc",
    value: function getTargetFunc() {
      const {
        getTargetContainer
      } = this.context;
      const {
        target
      } = this.props;
      if (target !== undefined) {
        return target;
      }
      return getTargetContainer !== null && getTargetContainer !== void 0 ? getTargetContainer : getDefaultTarget;
    }
    // Event handler
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      const targetFunc = this.getTargetFunc();
      if (targetFunc) {
        // [Legacy] Wait for parent component ref has its value.
        // We should use target as directly element instead of function which makes element check hard.
        this.timeout = setTimeout(() => {
          addObserveTarget(targetFunc(), this);
          // Mock Event object.
          this.updatePosition();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      const {
        prevTarget
      } = this.state;
      const targetFunc = this.getTargetFunc();
      const newTarget = (targetFunc === null || targetFunc === void 0 ? void 0 : targetFunc()) || null;
      if (prevTarget !== newTarget) {
        removeObserveTarget(this);
        if (newTarget) {
          addObserveTarget(newTarget, this);
          // Mock Event object.
          this.updatePosition();
        }
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          prevTarget: newTarget
        });
      }
      if (prevProps.offsetTop !== this.props.offsetTop || prevProps.offsetBottom !== this.props.offsetBottom) {
        this.updatePosition();
      }
      this.measure();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      removeObserveTarget(this);
      this.updatePosition.cancel();
      // https://github.com/ant-design/ant-design/issues/22683
      this.lazyUpdatePosition.cancel();
    }
    // =================== Render ===================
  }, {
    key: "render",
    value: function render() {
      const {
        affixStyle,
        placeholderStyle
      } = this.state;
      const {
        affixPrefixCls,
        rootClassName,
        children
      } = this.props;
      const className = classnames_default()({
        [rootClassName]: !!affixStyle,
        [affixPrefixCls]: !!affixStyle
      });
      let props = (0,omit/* default */.Z)(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange', 'affixPrefixCls', 'rootClassName']);
      // Omit this since \`onTestUpdatePosition\` only works on test.
      if (false) {}
      return /*#__PURE__*/react.createElement(rc_resize_observer_es/* default */.Z, {
        onResize: this.updatePosition
      }, /*#__PURE__*/react.createElement("div", Object.assign({}, props, {
        ref: this.savePlaceholderNode
      }), affixStyle && /*#__PURE__*/react.createElement("div", {
        style: placeholderStyle,
        "aria-hidden": "true"
      }), /*#__PURE__*/react.createElement("div", {
        className: className,
        ref: this.saveFixedNode,
        style: affixStyle
      }, /*#__PURE__*/react.createElement(rc_resize_observer_es/* default */.Z, {
        onResize: this.updatePosition
      }, children))));
    }
  }]);
  return Affix;
}(react.Component);
Affix.contextType = context/* ConfigContext */.E_;
const AffixFC = /*#__PURE__*/react.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const affixPrefixCls = getPrefixCls('affix', customizePrefixCls);
  const [wrapSSR, hashId] = affix_style(affixPrefixCls);
  const AffixProps = Object.assign(Object.assign({}, props), {
    affixPrefixCls,
    rootClassName: hashId
  });
  return wrapSSR( /*#__PURE__*/react.createElement(Affix, Object.assign({}, AffixProps, {
    ref: ref
  })));
});
if (false) {}
/* harmony default export */ var affix = (AffixFC);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-layout/es/context/RouteContext.js
var context_RouteContext = __webpack_require__(76509);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-utils/es/isBrowser/index.js
var isBrowser = __webpack_require__(12044);
// EXTERNAL MODULE: ./node_modules/omit.js/es/index.js
var omit_js_es = __webpack_require__(97435);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(73935);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-provider/es/useStyle/index.js
var useStyle = __webpack_require__(98082);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/FooterToolbar/style/index.js



var genFooterToolBarStyle = function genFooterToolBarStyle(token) {
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    position: 'fixed',
    insetInlineEnd: 0,
    bottom: 0,
    zIndex: 99,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingInline: 24,
    paddingBlock: 0,
    boxSizing: 'border-box',
    lineHeight: '64px',
    /* A way to reset the style of the component. */
    backgroundColor: (0,useStyle/* setAlpha */.uK)(token.colorBgElevated, 0.6),
    borderBlockStart: "1px solid ".concat(token.colorSplit),
    '-webkit-backdrop-filter': 'blur(8px)',
    backdropFilter: 'blur(8px)',
    color: token.colorText,
    transition: 'all 0.2s ease 0s',
    '&-left': {
      flex: 1,
      color: token.colorText
    },
    '&-right': {
      color: token.colorText,
      '> *': {
        marginInlineEnd: 8,
        '&:last-child': {
          marginBlock: 0,
          marginInline: 0
        }
      }
    }
  });
};
function style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutFooterToolbar', function (token) {
    var proCardToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genFooterToolBarStyle(proCardToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/FooterToolbar/style/stylish.js



function useStylish(prefixCls, _ref) {
  var stylish = _ref.stylish;
  return (0,useStyle/* useStyle */.Xj)('ProLayoutFooterToolbarStylish', function (token) {
    var stylishToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    if (!stylish) return [];
    return [(0,defineProperty/* default */.Z)({}, "".concat(stylishToken.componentCls), stylish === null || stylish === void 0 ? void 0 : stylish(stylishToken))];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/FooterToolbar/index.js



var _excluded = ["children", "className", "extra", "portalDom", "style", "renderContent"];

/* eslint-disable react-hooks/exhaustive-deps */










var FooterToolbar = function FooterToolbar(props) {
  var children = props.children,
    className = props.className,
    extra = props.extra,
    _props$portalDom = props.portalDom,
    portalDom = _props$portalDom === void 0 ? true : _props$portalDom,
    style = props.style,
    renderContent = props.renderContent,
    restProps = (0,objectWithoutProperties/* default */.Z)(props, _excluded);
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls,
    getTargetContainer = _useContext.getTargetContainer;
  var _useContext2 = (0,react.useContext)(es/* ProProvider */.L_),
    containerDomRef = _useContext2.containerDomRef;
  var prefixCls = props.prefixCls || getPrefixCls('pro');
  var baseClassName = "".concat(prefixCls, "-footer-bar");
  var _useStyle = style_useStyle(baseClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var value = (0,react.useContext)(context_RouteContext/* RouteContext */.X);
  var width = (0,react.useMemo)(function () {
    var hasSiderMenu = value.hasSiderMenu,
      isMobile = value.isMobile,
      siderWidth = value.siderWidth;
    if (!hasSiderMenu) {
      return undefined;
    }
    // 0 or undefined
    if (!siderWidth) {
      return '100%';
    }
    return isMobile ? '100%' : "calc(100% - ".concat(siderWidth, "px)");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.collapsed, value.hasSiderMenu, value.isMobile, value.siderWidth]);
  var containerDom = (0,react.useMemo)(function () {
    // \u53EA\u8BFB\u53D6\u4E00\u6B21\u5C31\u884C\u4E86\uFF0C\u4E0D\u7136\u603B\u662F\u7684\u6E32\u67D3
    return (getTargetContainer === null || getTargetContainer === void 0 ? void 0 : getTargetContainer()) || (containerDomRef === null || containerDomRef === void 0 ? void 0 : containerDomRef.current) || document.body;
  }, []);
  var stylish = useStylish("".concat(baseClassName, ".").concat(baseClassName, "-stylish"), {
    stylish: props.stylish
  });
  var dom = (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)("div", {
      className: "".concat(baseClassName, "-left ").concat(hashId),
      children: extra
    }), (0,jsx_runtime.jsx)("div", {
      className: "".concat(baseClassName, "-right ").concat(hashId),
      children: children
    })]
  });
  /** \u544A\u8BC9 props \u662F\u5426\u5B58\u5728 footerBar */
  (0,react.useEffect)(function () {
    if (!value || !(value === null || value === void 0 ? void 0 : value.setHasFooterToolbar)) {
      return function () {};
    }
    value === null || value === void 0 ? void 0 : value.setHasFooterToolbar(true);
    return function () {
      var _value$setHasFooterTo;
      value === null || value === void 0 ? void 0 : (_value$setHasFooterTo = value.setHasFooterToolbar) === null || _value$setHasFooterTo === void 0 ? void 0 : _value$setHasFooterTo.call(value, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var renderDom = (0,jsx_runtime.jsx)("div", (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    className: classnames_default()(className, hashId, baseClassName, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-stylish"), !!props.stylish)),
    style: (0,esm_objectSpread2/* default */.Z)({
      width: width
    }, style)
  }, (0,omit_js_es/* default */.Z)(restProps, ['prefixCls'])), {}, {
    children: renderContent ? renderContent((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), value), {}, {
      leftWidth: width
    }), dom) : dom
  }));
  var ssrDom = !(0,isBrowser/* isBrowser */.j)() || !portalDom ? renderDom : /*#__PURE__*/(0,react_dom.createPortal)(renderDom, containerDom, baseClassName);
  return stylish.wrapSSR(wrapSSR((0,jsx_runtime.jsx)(react.Fragment, {
    children: ssrDom
  }, baseClassName)));
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GridContent/style.js



var genGridContentStyle = function genGridContentStyle(token) {
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    width: '100%',
    '&-wide': {
      maxWidth: 1152,
      margin: '0 auto'
    }
  });
};
function GridContent_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutGridContent', function (token) {
    var GridContentToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genGridContentStyle(GridContentToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GridContent/index.js







/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 *
 * @param props
 */
var GridContent = function GridContent(props) {
  var value = (0,react.useContext)(context_RouteContext/* RouteContext */.X);
  var children = props.children,
    propsContentWidth = props.contentWidth,
    propsClassName = props.className,
    style = props.style;
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var prefixCls = props.prefixCls || getPrefixCls('pro');
  var contentWidth = propsContentWidth || value.contentWidth;
  var className = "".concat(prefixCls, "-grid-content");
  var _useStyle = GridContent_style_useStyle(className),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var isWide = contentWidth === 'Fixed';
  return wrapSSR((0,jsx_runtime.jsx)("div", {
    className: classnames_default()(className, hashId, propsClassName, (0,defineProperty/* default */.Z)({}, "".concat(className, "-wide"), isWide)),
    style: style,
    children: (0,jsx_runtime.jsx)("div", {
      className: "".concat(prefixCls, "-grid-content-children ").concat(hashId),
      children: children
    })
  }));
};

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(97685);
// EXTERNAL MODULE: ./node_modules/@ant-design/icons/ArrowLeftOutlined.js
var ArrowLeftOutlined = __webpack_require__(77404);
var ArrowLeftOutlined_default = /*#__PURE__*/__webpack_require__.n(ArrowLeftOutlined);
// EXTERNAL MODULE: ./node_modules/@ant-design/icons/ArrowRightOutlined.js
var ArrowRightOutlined = __webpack_require__(86056);
var ArrowRightOutlined_default = /*#__PURE__*/__webpack_require__.n(ArrowRightOutlined);
// EXTERNAL MODULE: ./node_modules/rc-util/es/Children/toArray.js
var toArray = __webpack_require__(50344);
// EXTERNAL MODULE: ./node_modules/antd/es/menu/index.js + 12 modules
var menu = __webpack_require__(20693);
// EXTERNAL MODULE: ./node_modules/antd/es/_util/reactNode.js
var reactNode = __webpack_require__(96159);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/DownOutlined.js
// This icon file is generated automatically.
var DownOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" } }] }, "name": "down", "theme": "outlined" };
/* harmony default export */ var asn_DownOutlined = (DownOutlined);

// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/components/AntdIcon.js + 3 modules
var AntdIcon = __webpack_require__(93771);
;// CONCATENATED MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/DownOutlined.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var DownOutlined_DownOutlined = function DownOutlined(props, ref) {
  return /*#__PURE__*/react.createElement(AntdIcon/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    ref: ref,
    icon: asn_DownOutlined
  }));
};
DownOutlined_DownOutlined.displayName = 'DownOutlined';
/* harmony default export */ var icons_DownOutlined = (/*#__PURE__*/react.forwardRef(DownOutlined_DownOutlined));
// EXTERNAL MODULE: ./node_modules/antd/es/dropdown/dropdown.js + 6 modules
var dropdown = __webpack_require__(65657);
;// CONCATENATED MODULE: ./node_modules/antd/es/breadcrumb/BreadcrumbItem.js
var BreadcrumbItem_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





const BreadcrumbItem = props => {
  const {
      prefixCls: customizePrefixCls,
      separator = '/',
      children,
      menu,
      overlay,
      dropdownProps
    } = props,
    restProps = BreadcrumbItem_rest(props, ["prefixCls", "separator", "children", "menu", "overlay", "dropdownProps"]);
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  // Warning for deprecated usage
  if (false) {}
  /** If overlay is have Wrap a Dropdown */
  const renderBreadcrumbNode = breadcrumbItem => {
    if (menu || overlay) {
      return /*#__PURE__*/react.createElement(dropdown/* default */.Z, Object.assign({
        menu: menu,
        overlay: overlay,
        placement: "bottom"
      }, dropdownProps), /*#__PURE__*/react.createElement("span", {
        className: \`\${prefixCls}-overlay-link\`
      }, breadcrumbItem, /*#__PURE__*/react.createElement(icons_DownOutlined, null)));
    }
    return breadcrumbItem;
  };
  let link;
  if ('href' in restProps) {
    link = /*#__PURE__*/react.createElement("a", Object.assign({
      className: \`\${prefixCls}-link\`
    }, restProps), children);
  } else {
    link = /*#__PURE__*/react.createElement("span", Object.assign({
      className: \`\${prefixCls}-link\`
    }, restProps), children);
  }
  // wrap to dropDown
  link = renderBreadcrumbNode(link);
  if (children !== undefined && children !== null) {
    return /*#__PURE__*/react.createElement("li", null, link, separator && /*#__PURE__*/react.createElement("span", {
      className: \`\${prefixCls}-separator\`
    }, separator));
  }
  return null;
};
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
/* harmony default export */ var breadcrumb_BreadcrumbItem = (BreadcrumbItem);
;// CONCATENATED MODULE: ./node_modules/antd/es/breadcrumb/BreadcrumbSeparator.js


const BreadcrumbSeparator = _ref => {
  let {
    children
  } = _ref;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('breadcrumb');
  return /*#__PURE__*/react.createElement("span", {
    className: \`\${prefixCls}-separator\`
  }, children || '/');
};
BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
/* harmony default export */ var breadcrumb_BreadcrumbSeparator = (BreadcrumbSeparator);
;// CONCATENATED MODULE: ./node_modules/antd/es/breadcrumb/style/index.js


const genBreadcrumbStyle = token => {
  const {
    componentCls,
    iconCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, (0,style/* resetComponent */.Wf)(token)), {
      color: token.breadcrumbBaseColor,
      fontSize: token.breadcrumbFontSize,
      [iconCls]: {
        fontSize: token.breadcrumbIconFontSize
      },
      ol: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
        listStyle: 'none'
      },
      a: Object.assign({
        color: token.breadcrumbLinkColor,
        transition: \`color \${token.motionDurationMid}\`,
        padding: \`0 \${token.paddingXXS}px\`,
        borderRadius: token.borderRadiusSM,
        height: token.lineHeight * token.fontSize,
        display: 'inline-block',
        marginInline: -token.marginXXS,
        '&:hover': {
          color: token.breadcrumbLinkColorHover,
          backgroundColor: token.colorBgTextHover
        }
      }, (0,style/* genFocusStyle */.Qy)(token)),
      [\`li:last-child\`]: {
        color: token.breadcrumbLastItemColor,
        [\`& > \${componentCls}-separator\`]: {
          display: 'none'
        }
      },
      [\`\${componentCls}-separator\`]: {
        marginInline: token.breadcrumbSeparatorMargin,
        color: token.breadcrumbSeparatorColor
      },
      [\`\${componentCls}-link\`]: {
        [\`
          > \${iconCls} + span,
          > \${iconCls} + a
        \`]: {
          marginInlineStart: token.marginXXS
        }
      },
      [\`\${componentCls}-overlay-link\`]: {
        borderRadius: token.borderRadiusSM,
        height: token.lineHeight * token.fontSize,
        display: 'inline-block',
        padding: \`0 \${token.paddingXXS}px\`,
        marginInline: -token.marginXXS,
        [\`> \${iconCls}\`]: {
          marginInlineStart: token.marginXXS,
          fontSize: token.fontSizeIcon
        },
        '&:hover': {
          color: token.breadcrumbLinkColorHover,
          backgroundColor: token.colorBgTextHover,
          a: {
            color: token.breadcrumbLinkColorHover
          }
        },
        a: {
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      },
      // rtl style
      [\`&\${token.componentCls}-rtl\`]: {
        direction: 'rtl'
      }
    })
  };
};
// ============================== Export ==============================
/* harmony default export */ var breadcrumb_style = ((0,genComponentStyleHook/* default */.Z)('Breadcrumb', token => {
  const BreadcrumbToken = (0,statistic/* merge */.TS)(token, {
    breadcrumbBaseColor: token.colorTextDescription,
    breadcrumbFontSize: token.fontSize,
    breadcrumbIconFontSize: token.fontSize,
    breadcrumbLinkColor: token.colorTextDescription,
    breadcrumbLinkColorHover: token.colorText,
    breadcrumbLastItemColor: token.colorText,
    breadcrumbSeparatorMargin: token.marginXS,
    breadcrumbSeparatorColor: token.colorTextDescription
  });
  return [genBreadcrumbStyle(BreadcrumbToken)];
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/breadcrumb/Breadcrumb.js

var Breadcrumb_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};










function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(new RegExp(\`:(\${paramsKeys})\`, 'g'), (replacement, key) => params[key] || replacement);
  return name;
}
function defaultItemRender(route, params, routes, paths) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? /*#__PURE__*/react.createElement("span", null, name) : /*#__PURE__*/react.createElement("a", {
    href: \`#/\${paths.join('/')}\`
  }, name);
}
const getPath = (path, params) => {
  path = (path || '').replace(/^\\//, '');
  Object.keys(params).forEach(key => {
    path = path.replace(\`:\${key}\`, params[key]);
  });
  return path;
};
const addChildPath = (paths, childPath, params) => {
  const originalPaths = (0,toConsumableArray/* default */.Z)(paths);
  const path = getPath(childPath || '', params);
  if (path) {
    originalPaths.push(path);
  }
  return originalPaths;
};
const Breadcrumb_Breadcrumb = _a => {
  var {
      prefixCls: customizePrefixCls,
      separator = '/',
      style,
      className,
      routes,
      children,
      itemRender = defaultItemRender,
      params = {}
    } = _a,
    restProps = Breadcrumb_rest(_a, ["prefixCls", "separator", "style", "className", "routes", "children", "itemRender", "params"]);
  const {
    getPrefixCls,
    direction
  } = react.useContext(context/* ConfigContext */.E_);
  let crumbs;
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  const [wrapSSR, hashId] = breadcrumb_style(prefixCls);
  if (routes && routes.length > 0) {
    // generated by route
    const paths = [];
    crumbs = routes.map(route => {
      const path = getPath(route.path, params);
      if (path) {
        paths.push(path);
      }
      // generated overlay by route.children
      let overlay;
      if (route.children && route.children.length) {
        overlay = /*#__PURE__*/react.createElement(menu/* default */.Z, {
          items: route.children.map(child => ({
            key: child.path || child.breadcrumbName,
            label: itemRender(child, params, routes, addChildPath(paths, child.path, params))
          }))
        });
      }
      const itemProps = {
        separator
      };
      if (overlay) {
        itemProps.overlay = overlay;
      }
      return /*#__PURE__*/react.createElement(breadcrumb_BreadcrumbItem, Object.assign({}, itemProps, {
        key: path || route.breadcrumbName
      }), itemRender(route, params, routes, paths));
    });
  } else if (children) {
    crumbs = (0,toArray/* default */.Z)(children).map((element, index) => {
      if (!element) {
        return element;
      }
       false ? 0 : void 0;
      return (0,reactNode/* cloneElement */.Tm)(element, {
        separator,
        key: index
      });
    });
  }
  const breadcrumbClassName = classnames_default()(prefixCls, {
    [\`\${prefixCls}-rtl\`]: direction === 'rtl'
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("nav", Object.assign({
    className: breadcrumbClassName,
    style: style
  }, restProps), /*#__PURE__*/react.createElement("ol", null, crumbs)));
};
Breadcrumb_Breadcrumb.Item = breadcrumb_BreadcrumbItem;
Breadcrumb_Breadcrumb.Separator = breadcrumb_BreadcrumbSeparator;
if (false) {}
/* harmony default export */ var breadcrumb_Breadcrumb = (Breadcrumb_Breadcrumb);
;// CONCATENATED MODULE: ./node_modules/antd/es/breadcrumb/index.js

/* harmony default export */ var es_breadcrumb = (breadcrumb_Breadcrumb);
// EXTERNAL MODULE: ./node_modules/antd/es/avatar/index.js + 7 modules
var es_avatar = __webpack_require__(8367);
// EXTERNAL MODULE: ./node_modules/antd/es/space/index.js + 2 modules
var space = __webpack_require__(2885);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageHeader/style/index.js



var textOverflowEllipsis = function textOverflowEllipsis() {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  };
};
var genPageHeaderStyle = function genPageHeaderStyle(token) {
  var _extra, _objectSpread4;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, useStyle/* resetComponent */.Wf === null || useStyle/* resetComponent */.Wf === void 0 ? void 0 : (0,useStyle/* resetComponent */.Wf)(token)), {}, (_objectSpread4 = {
    position: 'relative',
    backgroundColor: token.pageHeaderBgGhost,
    paddingBlock: token.pageHeaderPaddingVertical + 2,
    paddingInline: token.pageHeaderPadding,
    '& &-has-breadcrumb': {
      paddingBlockStart: token.pageHeaderPaddingBreadCrumb
    },
    '& &-has-footer': {
      paddingBlockEnd: 0
    },
    '& &-back': (0,defineProperty/* default */.Z)({
      marginInlineEnd: token.margin,
      fontSize: 16,
      lineHeight: 1,
      '&-button': (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
        fontSize: 16
      }, useStyle/* operationUnit */.Nd === null || useStyle/* operationUnit */.Nd === void 0 ? void 0 : (0,useStyle/* operationUnit */.Nd)(token)), {}, {
        color: token.pageHeaderColorBack,
        cursor: 'pointer'
      })
    }, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: 0
    })
  }, (0,defineProperty/* default */.Z)(_objectSpread4, "& ".concat('ant', "-divider-vertical"), {
    height: 14,
    marginBlock: 0,
    marginInline: token.marginSM,
    verticalAlign: 'middle'
  }), (0,defineProperty/* default */.Z)(_objectSpread4, "& &-breadcrumb + &-heading", {
    marginBlockStart: token.marginXS
  }), (0,defineProperty/* default */.Z)(_objectSpread4, '& &-heading', {
    display: 'flex',
    justifyContent: 'space-between',
    '&-left': {
      display: 'flex',
      alignItems: 'center',
      marginBlock: token.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      overflow: 'hidden'
    },
    '&-title': (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      marginInlineEnd: token.marginSM,
      marginBlockEnd: 0,
      color: token.colorTextHeading,
      fontWeight: 600,
      fontSize: token.pageHeaderFontSizeHeaderTitle,
      lineHeight: token.controlHeight + 'px'
    }, textOverflowEllipsis()), {}, (0,defineProperty/* default */.Z)({}, "".concat(token.componentCls, "-rlt &"), {
      marginInlineEnd: 0,
      marginInlineStart: token.marginSM
    })),
    '&-avatar': (0,defineProperty/* default */.Z)({
      marginInlineEnd: token.marginSM
    }, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: token.marginSM
    }),
    '&-tags': (0,defineProperty/* default */.Z)({}, "".concat(token.componentCls, "-rlt &"), {
      float: 'right'
    }),
    '&-sub-title': (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      marginInlineEnd: token.marginSM,
      color: token.colorTextSecondary,
      fontSize: token.pageHeaderFontSizeHeaderSubTitle,
      lineHeight: token.lineHeight
    }, textOverflowEllipsis()), {}, (0,defineProperty/* default */.Z)({}, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: 12
    })),
    '&-extra': (_extra = {
      marginBlock: token.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      whiteSpace: 'nowrap',
      '> *': (0,defineProperty/* default */.Z)({
        'white-space': 'unset'
      }, "".concat(token.componentCls, "-rlt &"), {
        marginInlineEnd: token.marginSM,
        marginInlineStart: 0
      })
    }, (0,defineProperty/* default */.Z)(_extra, "".concat(token.componentCls, "-rlt &"), {
      float: 'left'
    }), (0,defineProperty/* default */.Z)(_extra, '*:first-child', (0,defineProperty/* default */.Z)({}, "".concat(token.componentCls, "-rlt &"), {
      marginInlineEnd: 0
    })), _extra)
  }), (0,defineProperty/* default */.Z)(_objectSpread4, '&-content', {
    paddingBlockStart: token.pageHeaderPaddingContentPadding
  }), (0,defineProperty/* default */.Z)(_objectSpread4, '&-footer', {
    marginBlockStart: token.margin
  }), (0,defineProperty/* default */.Z)(_objectSpread4, '&-compact &-heading', {
    flexWrap: 'wrap'
  }), (0,defineProperty/* default */.Z)(_objectSpread4, '&-wide', {
    maxWidth: 1152,
    margin: '0 auto'
  }), (0,defineProperty/* default */.Z)(_objectSpread4, '&-rtl', {
    direction: 'rtl'
  }), _objectSpread4)));
};
function PageHeader_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutPageHeader', function (token) {
    var proCardToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      pageHeaderBgGhost: 'transparent',
      pageHeaderPadding: 16,
      pageHeaderPaddingVertical: 4,
      pageHeaderPaddingBreadCrumb: token.paddingSM,
      pageHeaderColorBack: token.colorTextHeading,
      pageHeaderFontSizeHeaderTitle: token.fontSizeHeading4,
      pageHeaderFontSizeHeaderSubTitle: 14,
      pageHeaderPaddingContentPadding: token.paddingSM
    });
    return [genPageHeaderStyle(proCardToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageHeader/index.js












var renderBack = function renderBack(prefixCls, hashId, backIcon, onBack) {
  if (!backIcon || !onBack) {
    return null;
  }
  return (0,jsx_runtime.jsx)("div", {
    className: "".concat(prefixCls, "-back ").concat(hashId),
    children: (0,jsx_runtime.jsx)("div", {
      role: "button",
      onClick: function onClick(e) {
        onBack === null || onBack === void 0 ? void 0 : onBack(e);
      },
      className: "".concat(prefixCls, "-back-button ").concat(hashId),
      "aria-label": "back",
      children: backIcon
    })
  });
};
var renderBreadcrumb = function renderBreadcrumb(breadcrumb, prefixCls) {
  var _breadcrumb$routes;
  if (!((_breadcrumb$routes = breadcrumb.routes) === null || _breadcrumb$routes === void 0 ? void 0 : _breadcrumb$routes.length)) return null;
  return (0,jsx_runtime.jsx)(es_breadcrumb, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, breadcrumb), {}, {
    className: classnames_default()("".concat(prefixCls, "-breadcrumb"), breadcrumb.className)
  }));
};
var getBackIcon = function getBackIcon(props) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ltr';
  if (props.backIcon !== undefined) {
    return props.backIcon;
  }
  return direction === 'rtl' ? (0,jsx_runtime.jsx)((ArrowRightOutlined_default()), {}) : (0,jsx_runtime.jsx)((ArrowLeftOutlined_default()), {});
};
var renderTitle = function renderTitle(prefixCls, props) {
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ltr';
  var hashId = arguments.length > 3 ? arguments[3] : undefined;
  var title = props.title,
    avatar = props.avatar,
    subTitle = props.subTitle,
    tags = props.tags,
    extra = props.extra,
    onBack = props.onBack;
  var headingPrefixCls = "".concat(prefixCls, "-heading");
  var hasHeading = title || subTitle || tags || extra;
  // If there is nothing, return a null
  if (!hasHeading) {
    return null;
  }
  var backIcon = getBackIcon(props, direction);
  var backIconDom = renderBack(prefixCls, hashId, backIcon, onBack);
  var hasTitle = backIconDom || avatar || hasHeading;
  return (0,jsx_runtime.jsxs)("div", {
    className: headingPrefixCls + ' ' + hashId,
    children: [hasTitle && (0,jsx_runtime.jsxs)("div", {
      className: "".concat(headingPrefixCls, "-left ").concat(hashId),
      children: [backIconDom, avatar && (0,jsx_runtime.jsx)(es_avatar/* default */.C, (0,esm_objectSpread2/* default */.Z)({
        className: classnames_default()("".concat(headingPrefixCls, "-avatar"), hashId, avatar.className)
      }, avatar)), title && (0,jsx_runtime.jsx)("span", {
        className: "".concat(headingPrefixCls, "-title ").concat(hashId),
        title: typeof title === 'string' ? title : undefined,
        children: title
      }), subTitle && (0,jsx_runtime.jsx)("span", {
        className: "".concat(headingPrefixCls, "-sub-title ").concat(hashId),
        title: typeof subTitle === 'string' ? subTitle : undefined,
        children: subTitle
      }), tags && (0,jsx_runtime.jsx)("span", {
        className: "".concat(headingPrefixCls, "-tags ").concat(hashId),
        children: tags
      })]
    }), extra && (0,jsx_runtime.jsx)("span", {
      className: "".concat(headingPrefixCls, "-extra ").concat(hashId),
      children: (0,jsx_runtime.jsx)(space/* default */.Z, {
        children: extra
      })
    })]
  });
};
var renderFooter = function renderFooter(prefixCls, footer, hashId) {
  if (footer) {
    return (0,jsx_runtime.jsx)("div", {
      className: "".concat(prefixCls, "-footer ").concat(hashId),
      children: footer
    });
  }
  return null;
};
var renderChildren = function renderChildren(prefixCls, children, hashId) {
  return (0,jsx_runtime.jsx)("div", {
    className: "".concat(prefixCls, "-content ").concat(hashId),
    children: children
  });
};
var PageHeader = function PageHeader(props) {
  var _breadcrumbRender, _classNames;
  var _React$useState = react.useState(false),
    _React$useState2 = (0,slicedToArray/* default */.Z)(_React$useState, 2),
    compact = _React$useState2[0],
    updateCompact = _React$useState2[1];
  var onResize = function onResize(_ref) {
    var width = _ref.width;
    updateCompact(width < 768);
  };
  var _React$useContext = react.useContext(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    style = props.style,
    footer = props.footer,
    children = props.children,
    breadcrumb = props.breadcrumb,
    breadcrumbRender = props.breadcrumbRender,
    customizeClassName = props.className,
    contentWidth = props.contentWidth;
  var prefixCls = getPrefixCls('page-header', customizePrefixCls);
  var _useStyle = PageHeader_style_useStyle(prefixCls),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var getDefaultBreadcrumbDom = function getDefaultBreadcrumbDom() {
    if (breadcrumb === null || breadcrumb === void 0 ? void 0 : breadcrumb.routes) {
      return renderBreadcrumb(breadcrumb, prefixCls);
    }
    return null;
  };
  var defaultBreadcrumbDom = getDefaultBreadcrumbDom();
  var isBreadcrumbComponent = breadcrumb && 'props' in breadcrumb;
  // support breadcrumbRender function
  var breadcrumbRenderDomFromProps = (_breadcrumbRender = breadcrumbRender === null || breadcrumbRender === void 0 ? void 0 : breadcrumbRender((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    prefixCls: prefixCls
  }), defaultBreadcrumbDom)) !== null && _breadcrumbRender !== void 0 ? _breadcrumbRender : defaultBreadcrumbDom;
  var breadcrumbDom = isBreadcrumbComponent ? breadcrumb : breadcrumbRenderDomFromProps;
  var className = classnames_default()(prefixCls, hashId, customizeClassName, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-has-breadcrumb"), !!breadcrumbDom), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-has-footer"), !!footer), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-compact"), compact), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-wide"), contentWidth === 'Fixed'), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-ghost"), true), _classNames));
  var title = renderTitle(prefixCls, props, direction, hashId);
  var childDom = children && renderChildren(prefixCls, children, hashId);
  var footerDom = renderFooter(prefixCls, footer, hashId);
  if (!breadcrumbDom && !title && !footerDom && !childDom) {
    return null;
  }
  return wrapSSR((0,jsx_runtime.jsx)(rc_resize_observer_es/* default */.Z, {
    onResize: onResize,
    children: (0,jsx_runtime.jsxs)("div", {
      className: className,
      style: style,
      children: [breadcrumbDom, title, childDom, footerDom]
    })
  }));
};

// EXTERNAL MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageLoading/index.js
var PageLoading = __webpack_require__(83832);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/WaterMark/index.js






/**
 * \u8FD4\u56DE\u5F53\u524D\u663E\u793A\u8BBE\u5907\u7684\u7269\u7406\u50CF\u7D20\u5206\u8FA8\u7387\u4E0ECSS\u50CF\u7D20\u5206\u8FA8\u7387\u4E4B\u6BD4
 *
 * @param context
 * @see api \u6709\u4E9B\u5E9F\u5F03\u4E86\uFF0C\u5176\u5B9E\u7C7B\u578B CanvasRenderingContext2D
 */
var getPixelRatio = function getPixelRatio(context) {
  if (!context) {
    return 1;
  }
  var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
};
var WaterMark = function WaterMark(props) {
  var children = props.children,
    style = props.style,
    className = props.className,
    markStyle = props.markStyle,
    markClassName = props.markClassName,
    _props$zIndex = props.zIndex,
    zIndex = _props$zIndex === void 0 ? 9 : _props$zIndex,
    _props$gapX = props.gapX,
    gapX = _props$gapX === void 0 ? 212 : _props$gapX,
    _props$gapY = props.gapY,
    gapY = _props$gapY === void 0 ? 222 : _props$gapY,
    _props$width = props.width,
    width = _props$width === void 0 ? 120 : _props$width,
    _props$height = props.height,
    height = _props$height === void 0 ? 64 : _props$height,
    _props$rotate = props.rotate,
    rotate = _props$rotate === void 0 ? -22 : _props$rotate,
    image = props.image,
    content = props.content,
    offsetLeft = props.offsetLeft,
    offsetTop = props.offsetTop,
    _props$fontStyle = props.fontStyle,
    fontStyle = _props$fontStyle === void 0 ? 'normal' : _props$fontStyle,
    _props$fontWeight = props.fontWeight,
    fontWeight = _props$fontWeight === void 0 ? 'normal' : _props$fontWeight,
    _props$fontColor = props.fontColor,
    fontColor = _props$fontColor === void 0 ? 'rgba(0,0,0,.15)' : _props$fontColor,
    _props$fontSize = props.fontSize,
    fontSize = _props$fontSize === void 0 ? 16 : _props$fontSize,
    _props$fontFamily = props.fontFamily,
    fontFamily = _props$fontFamily === void 0 ? 'sans-serif' : _props$fontFamily,
    customizePrefixCls = props.prefixCls;
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var prefixCls = getPrefixCls('pro-layout-watermark', customizePrefixCls);
  var wrapperCls = classnames_default()("".concat(prefixCls, "-wrapper"), className);
  var waterMakrCls = classnames_default()(prefixCls, markClassName);
  var _useState = (0,react.useState)(''),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    base64Url = _useState2[0],
    setBase64Url = _useState2[1];
  (0,react.useEffect)(function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var ratio = getPixelRatio(ctx);
    var canvasWidth = "".concat((gapX + width) * ratio, "px");
    var canvasHeight = "".concat((gapY + height) * ratio, "px");
    var canvasOffsetLeft = offsetLeft || gapX / 2;
    var canvasOffsetTop = offsetTop || gapY / 2;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    if (ctx) {
      // \u65CB\u8F6C\u5B57\u7B26 rotate
      ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
      ctx.rotate(Math.PI / 180 * Number(rotate));
      var markWidth = width * ratio;
      var markHeight = height * ratio;
      if (image) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
        img.onload = function () {
          ctx.drawImage(img, 0, 0, markWidth, markHeight);
          setBase64Url(canvas.toDataURL());
        };
      } else if (content) {
        var markSize = Number(fontSize) * ratio;
        ctx.font = "".concat(fontStyle, " normal ").concat(fontWeight, " ").concat(markSize, "px/").concat(markHeight, "px ").concat(fontFamily);
        ctx.fillStyle = fontColor;
        if (Array.isArray(content)) {
          content === null || content === void 0 ? void 0 : content.forEach(function (item, index) {
            return ctx.fillText(item, 0, index * markSize);
          });
        } else {
          ctx.fillText(content, 0, 0);
        }
        setBase64Url(canvas.toDataURL());
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301Canvas');
    }
  }, [gapX, gapY, offsetLeft, offsetTop, rotate, fontStyle, fontWeight, width, height, fontFamily, fontColor, image, content, fontSize]);
  return (0,jsx_runtime.jsxs)("div", {
    style: (0,esm_objectSpread2/* default */.Z)({
      position: 'relative'
    }, style),
    className: wrapperCls,
    children: [children, (0,jsx_runtime.jsx)("div", {
      className: waterMakrCls,
      style: (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
        zIndex: zIndex,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundSize: "".concat(gapX + width, "px"),
        pointerEvents: 'none',
        backgroundRepeat: 'repeat'
      }, base64Url ? {
        backgroundImage: "url('".concat(base64Url, "')")
      } : {}), markStyle)
    })]
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageContainer/style/index.js




var _map = [576, 768, 992, 1200].map(function (bp) {
    return "@media (max-width: ".concat(bp, "px)");
  }),
  _map2 = (0,slicedToArray/* default */.Z)(_map, 4),
  sm = _map2[0],
  md = _map2[1],
  lg = _map2[2],
  xl = _map2[3];
var genPageContainerStyle = function genPageContainerStyle(token) {
  var _token$layout, _token$layout$pageCon, _token$layout2, _token$layout2$pageCo, _token$layout3, _token$layout3$pageCo, _token$layout$pageCon2, _token$layout4, _token$layout4$pageCo, _token$layout$pageCon3, _token$layout5, _token$layout5$pageCo, _token$layout6, _token$layout6$pageCo, _token$layout7, _token$layout7$pageCo, _token$layout$pageCon4, _token$layout8, _token$layout8$pageCo, _extraContent, _token$componentCls;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, (_token$componentCls = {
    position: 'relative',
    '&-children-content': {
      paddingBlock: (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$pageCon = _token$layout.pageContainer) === null || _token$layout$pageCon === void 0 ? void 0 : _token$layout$pageCon.paddingBlockPageContainerContent,
      paddingInline: (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$pageCo = _token$layout2.pageContainer) === null || _token$layout2$pageCo === void 0 ? void 0 : _token$layout2$pageCo.paddingInlinePageContainerContent
    },
    '&-affix': (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-affix"), (0,defineProperty/* default */.Z)({}, "".concat(token.componentCls, "-warp"), {
      backgroundColor: (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$pageCo = _token$layout3.pageContainer) === null || _token$layout3$pageCo === void 0 ? void 0 : _token$layout3$pageCo.colorBgPageContainerFixed,
      transition: 'background-color 0.3s',
      boxShadow: '0 2px 8px #f0f1f2'
    }))
  }, (0,defineProperty/* default */.Z)(_token$componentCls, '& &-warp-page-header', (0,defineProperty/* default */.Z)({
    paddingBlockStart: ((_token$layout$pageCon2 = (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : (_token$layout4$pageCo = _token$layout4.pageContainer) === null || _token$layout4$pageCo === void 0 ? void 0 : _token$layout4$pageCo.paddingBlockPageContainerContent) !== null && _token$layout$pageCon2 !== void 0 ? _token$layout$pageCon2 : 40) / 2,
    paddingBlockEnd: ((_token$layout$pageCon3 = (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : (_token$layout5$pageCo = _token$layout5.pageContainer) === null || _token$layout5$pageCo === void 0 ? void 0 : _token$layout5$pageCo.paddingBlockPageContainerContent) !== null && _token$layout$pageCon3 !== void 0 ? _token$layout$pageCon3 : 40) / 2,
    paddingInlineStart: (_token$layout6 = token.layout) === null || _token$layout6 === void 0 ? void 0 : (_token$layout6$pageCo = _token$layout6.pageContainer) === null || _token$layout6$pageCo === void 0 ? void 0 : _token$layout6$pageCo.paddingInlinePageContainerContent,
    paddingInlineEnd: (_token$layout7 = token.layout) === null || _token$layout7 === void 0 ? void 0 : (_token$layout7$pageCo = _token$layout7.pageContainer) === null || _token$layout7$pageCo === void 0 ? void 0 : _token$layout7$pageCo.paddingInlinePageContainerContent
  }, "& ~ ".concat(token.proComponentsCls, "-grid-content"), (0,defineProperty/* default */.Z)({}, "".concat(token.proComponentsCls, "-page-container-children-content"), {
    paddingBlock: ((_token$layout$pageCon4 = (_token$layout8 = token.layout) === null || _token$layout8 === void 0 ? void 0 : (_token$layout8$pageCo = _token$layout8.pageContainer) === null || _token$layout8$pageCo === void 0 ? void 0 : _token$layout8$pageCo.paddingBlockPageContainerContent) !== null && _token$layout$pageCon4 !== void 0 ? _token$layout$pageCon4 : 24) / 3
  }))), (0,defineProperty/* default */.Z)(_token$componentCls, '&-detail', (0,defineProperty/* default */.Z)({
    display: 'flex'
  }, sm, {
    display: 'block'
  })), (0,defineProperty/* default */.Z)(_token$componentCls, '&-main', {
    width: '100%'
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-row', (0,defineProperty/* default */.Z)({
    display: 'flex',
    width: '100%'
  }, md, {
    display: 'block'
  })), (0,defineProperty/* default */.Z)(_token$componentCls, '&-content', {
    flex: 'auto',
    width: '100%'
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-extraContent', (_extraContent = {
    flex: '0 1 auto',
    minWidth: '242px',
    marginInlineStart: 88,
    textAlign: 'end'
  }, (0,defineProperty/* default */.Z)(_extraContent, xl, {
    marginInlineStart: 44
  }), (0,defineProperty/* default */.Z)(_extraContent, lg, {
    marginInlineStart: 20
  }), (0,defineProperty/* default */.Z)(_extraContent, md, {
    marginInlineStart: 0,
    textAlign: 'start'
  }), (0,defineProperty/* default */.Z)(_extraContent, sm, {
    marginInlineStart: 0
  }), _extraContent)), _token$componentCls));
};
function PageContainer_style_useStyle(prefixCls, componentsToken) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutPageContainer', function (token) {
    var proCardToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    }, componentsToken);
    return [genPageContainerStyle(proCardToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageContainer/style/stylish.js



function stylish_useStylish(prefixCls, _ref) {
  var stylish = _ref.stylish;
  return (0,useStyle/* useStyle */.Xj)('ProLayoutPageContainerStylish', function (token) {
    var stylishToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    if (!stylish) return [];
    return [(0,defineProperty/* default */.Z)({}, token.proComponentsCls, (0,defineProperty/* default */.Z)({}, "".concat(stylishToken.componentCls), stylish === null || stylish === void 0 ? void 0 : stylish(stylishToken)))];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageContainer/index.js




var PageContainer_excluded = ["title", "content", "pageHeaderRender", "header", "prefixedClassName", "extraContent", "childrenContentStyle", "style", "prefixCls", "hashId", "value", "breadcrumbRender"],
  _excluded2 = ["children", "loading", "className", "style", "footer", "affixProps", "token", "fixedHeader", "breadcrumbRender", "footerToolBarProps", "childrenContentStyle"];














function genLoading(spinProps) {
  if ((0,esm_typeof/* default */.Z)(spinProps) === 'object') {
    return spinProps;
  }
  return {
    spinning: spinProps
  };
}
/**
 * Render Footer tabList In order to be compatible with the old version of the PageHeader basically
 * all the functions are implemented.
 */
var PageContainer_renderFooter = function renderFooter(_ref) {
  var tabList = _ref.tabList,
    tabActiveKey = _ref.tabActiveKey,
    onTabChange = _ref.onTabChange,
    hashId = _ref.hashId,
    tabBarExtraContent = _ref.tabBarExtraContent,
    tabProps = _ref.tabProps,
    prefixedClassName = _ref.prefixedClassName;
  if (Array.isArray(tabList) || tabBarExtraContent) {
    return (0,jsx_runtime.jsx)(es_tabs/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      className: "".concat(prefixedClassName, "-tabs ").concat(hashId),
      activeKey: tabActiveKey,
      onChange: function onChange(key) {
        if (onTabChange) {
          onTabChange(key);
        }
      },
      tabBarExtraContent: tabBarExtraContent,
      // @ts-ignore
      items: tabList === null || tabList === void 0 ? void 0 : tabList.map(function (item, index) {
        var _item$key;
        return (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
          label: item.tab
        }, item), {}, {
          key: ((_item$key = item.key) === null || _item$key === void 0 ? void 0 : _item$key.toString()) || (index === null || index === void 0 ? void 0 : index.toString())
        });
      })
    }, tabProps), {}, {
      children: tabList === null || tabList === void 0 ? void 0 : tabList.map(function (item, index) {
        return (0,jsx_runtime.jsx)(es_tabs/* default.TabPane */.Z.TabPane, (0,esm_objectSpread2/* default */.Z)({
          tab: item.tab
        }, item), item.key || index);
      })
    }));
  }
  return null;
};
var renderPageHeader = function renderPageHeader(content, extraContent, prefixedClassName, hashId) {
  if (!content && !extraContent) {
    return null;
  }
  return (0,jsx_runtime.jsx)("div", {
    className: "".concat(prefixedClassName, "-detail ").concat(hashId),
    children: (0,jsx_runtime.jsx)("div", {
      className: "".concat(prefixedClassName, "-main ").concat(hashId),
      children: (0,jsx_runtime.jsxs)("div", {
        className: "".concat(prefixedClassName, "-row ").concat(hashId),
        children: [content && (0,jsx_runtime.jsx)("div", {
          className: "".concat(prefixedClassName, "-content ").concat(hashId),
          children: content
        }), extraContent && (0,jsx_runtime.jsx)("div", {
          className: "".concat(prefixedClassName, "-extraContent ").concat(hashId),
          children: extraContent
        })]
      })
    })
  });
};
/**
 * \u914D\u7F6E\u4E0E\u9762\u5305\u5C51\u76F8\u540C\uFF0C\u53EA\u662F\u589E\u52A0\u4E86\u81EA\u52A8\u6839\u636E\u8DEF\u7531\u8BA1\u7B97\u9762\u5305\u5C51\u7684\u529F\u80FD\u3002\u6B64\u529F\u80FD\u5FC5\u987B\u8981\u5728 ProLayout \u4E2D\u4F7F\u7528\u3002
 *
 * @param props
 * @returns
 */
var ProBreadcrumb = function ProBreadcrumb(props) {
  var value = useContext(RouteContext);
  return _jsx("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    children: _jsx(Breadcrumb, _objectSpread(_objectSpread(_objectSpread({}, value === null || value === void 0 ? void 0 : value.breadcrumb), value === null || value === void 0 ? void 0 : value.breadcrumbProps), props))
  });
};
var memoRenderPageHeader = function memoRenderPageHeader(props) {
  var _breadcrumb$routes;
  var title = props.title,
    content = props.content,
    pageHeaderRender = props.pageHeaderRender,
    header = props.header,
    prefixedClassName = props.prefixedClassName,
    extraContent = props.extraContent,
    childrenContentStyle = props.childrenContentStyle,
    style = props.style,
    prefixCls = props.prefixCls,
    hashId = props.hashId,
    value = props.value,
    breadcrumbRender = props.breadcrumbRender,
    restProps = (0,objectWithoutProperties/* default */.Z)(props, PageContainer_excluded);
  var getBreadcrumbRender = function getBreadcrumbRender() {
    if (!breadcrumbRender) {
      return undefined;
    }
    return breadcrumbRender;
  };
  if (pageHeaderRender === false) {
    return null;
  }
  if (pageHeaderRender) {
    return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [" ", pageHeaderRender((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), value))]
    });
  }
  var pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  var pageHeaderProps = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, value), {}, {
    title: pageHeaderTitle
  }, restProps), {}, {
    footer: PageContainer_renderFooter((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, restProps), {}, {
      hashId: hashId,
      breadcrumbRender: breadcrumbRender,
      prefixedClassName: prefixedClassName
    }))
  }, header);
  var breadcrumb = pageHeaderProps.breadcrumb;
  var noHasBreadCrumb = (!breadcrumb || !(breadcrumb === null || breadcrumb === void 0 ? void 0 : breadcrumb.itemRender) && !(breadcrumb === null || breadcrumb === void 0 ? void 0 : (_breadcrumb$routes = breadcrumb.routes) === null || _breadcrumb$routes === void 0 ? void 0 : _breadcrumb$routes.length)) && !breadcrumbRender;
  if (['title', 'subTitle', 'extra', 'tags', 'footer', 'avatar', 'backIcon'].every(function (item) {
    return !pageHeaderProps[item];
  }) && noHasBreadCrumb && !content && !extraContent) {
    return null;
  }
  return (0,jsx_runtime.jsx)(PageHeader, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, pageHeaderProps), {}, {
    className: "".concat(prefixedClassName, "-warp-page-header ").concat(hashId),
    breadcrumb: breadcrumbRender === false ? undefined : (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, pageHeaderProps.breadcrumb), value.breadcrumbProps),
    breadcrumbRender: getBreadcrumbRender(),
    prefixCls: prefixCls,
    children: (header === null || header === void 0 ? void 0 : header.children) || renderPageHeader(content, extraContent, prefixedClassName, hashId)
  }));
};
var PageContainerBase = function PageContainerBase(props) {
  var _restProps$header2, _classNames, _token$layout, _token$layout$header;
  var children = props.children,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    className = props.className,
    style = props.style,
    footer = props.footer,
    affixProps = props.affixProps,
    propsToken = props.token,
    fixedHeader = props.fixedHeader,
    breadcrumbRender = props.breadcrumbRender,
    footerToolBarProps = props.footerToolBarProps,
    childrenContentStyle = props.childrenContentStyle,
    restProps = (0,objectWithoutProperties/* default */.Z)(props, _excluded2);
  var value = (0,react.useContext)(context_RouteContext/* RouteContext */.X);
  /** \u544A\u8BC9 props \u662F\u5426\u5B58\u5728 footerBar */
  (0,react.useEffect)(function () {
    var _value$setHasPageCont;
    if (!value || !(value === null || value === void 0 ? void 0 : value.setHasPageContainer)) {
      return function () {};
    }
    value === null || value === void 0 ? void 0 : (_value$setHasPageCont = value.setHasPageContainer) === null || _value$setHasPageCont === void 0 ? void 0 : _value$setHasPageCont.call(value, function (num) {
      return num + 1;
    });
    return function () {
      var _value$setHasPageCont2;
      value === null || value === void 0 ? void 0 : (_value$setHasPageCont2 = value.setHasPageContainer) === null || _value$setHasPageCont2 === void 0 ? void 0 : _value$setHasPageCont2.call(value, function (num) {
        return num - 1;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var _useContext = (0,react.useContext)(es/* ProProvider */.L_),
    token = _useContext.token;
  var _useContext2 = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext2.getPrefixCls;
  var prefixCls = props.prefixCls || getPrefixCls('pro');
  var basePageContainer = "".concat(prefixCls, "-page-container");
  var _useStyle = PageContainer_style_useStyle(basePageContainer, propsToken),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var stylish = stylish_useStylish("".concat(basePageContainer, ".").concat(basePageContainer, "-stylish"), {
    stylish: props.stylish
  });
  var memoBreadcrumbRender = (0,react.useMemo)(function () {
    var _restProps$header;
    if (breadcrumbRender == false) return false;
    return breadcrumbRender || (restProps === null || restProps === void 0 ? void 0 : (_restProps$header = restProps.header) === null || _restProps$header === void 0 ? void 0 : _restProps$header.breadcrumbRender);
  }, [breadcrumbRender, restProps === null || restProps === void 0 ? void 0 : (_restProps$header2 = restProps.header) === null || _restProps$header2 === void 0 ? void 0 : _restProps$header2.breadcrumbRender]);
  var pageHeaderDom = memoRenderPageHeader((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, restProps), {}, {
    breadcrumbRender: memoBreadcrumbRender,
    ghost: true,
    hashId: hashId,
    prefixCls: undefined,
    prefixedClassName: basePageContainer,
    value: value
  }));
  var loadingDom = (0,react.useMemo)(function () {
    // \u5F53loading\u65F6\u4E00\u4E2A\u5408\u6CD5\u7684ReactNode\u65F6\uFF0C\u8BF4\u660E\u7528\u6237\u4F7F\u7528\u4E86\u81EA\u5B9A\u4E49loading,\u76F4\u63A5\u8FD4\u56DE\u6539\u81EA\u5B9A\u4E49loading
    if ( /*#__PURE__*/react.isValidElement(loading)) {
      return loading;
    }
    // \u5F53\u4F20\u9012\u8FC7\u6765\u7684\u662F\u5E03\u5C14\u503C\uFF0C\u5E76\u4E14\u4E3Afalse\u65F6\uFF0C\u8BF4\u660E\u4E0D\u9700\u8981\u663E\u793Aloading,\u8FD4\u56DEnull
    if (typeof loading === 'boolean' && !loading) {
      return null;
    }
    // \u5982\u975E\u4E0A\u8FF0\u4E24\u79CD\u60C5\u51B5\uFF0C\u90A3\u4E48\u8981\u4E48\u7528\u6237\u4F20\u4E86\u4E00\u4E2Atrue,\u8981\u4E48\u7528\u6237\u4F20\u4E86loading\u914D\u7F6E\uFF0C\u4F7F\u7528genLoading\u751F\u6210loading\u914D\u7F6E\u540E\u8FD4\u56DEPageLoading
    var spinProps = genLoading(loading);
    // \u5982\u679C\u4F20\u7684\u662Floading\u914D\u7F6E\uFF0C\u4F46spinning\u4F20\u7684\u662Ffalse\uFF0C\u4E5F\u4E0D\u9700\u8981\u663E\u793Aloading
    return spinProps.spinning ? (0,jsx_runtime.jsx)(PageLoading/* PageLoading */.S, (0,esm_objectSpread2/* default */.Z)({}, spinProps)) : null;
  }, [loading]);
  var content = (0,react.useMemo)(function () {
    return children ? (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
      children: (0,jsx_runtime.jsx)("div", {
        className: classnames_default()("".concat(basePageContainer, "-children-content ").concat(hashId)),
        style: childrenContentStyle,
        children: children
      })
    }) : null;
  }, [children, basePageContainer, childrenContentStyle, hashId]);
  var renderContentDom = (0,react.useMemo)(function () {
    // \u53EA\u8981loadingDom\u975E\u7A7A\u6211\u4EEC\u5C31\u6E32\u67D3loadingDom,\u5426\u5219\u6E32\u67D3\u5185\u5BB9
    var dom = loadingDom || content;
    if (props.waterMarkProps || value.waterMarkProps) {
      var waterMarkProps = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, value.waterMarkProps), props.waterMarkProps);
      return (0,jsx_runtime.jsx)(WaterMark, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, waterMarkProps), {}, {
        children: dom
      }));
    }
    return dom;
  }, [props.waterMarkProps, value.waterMarkProps, loadingDom, content]);
  var containerClassName = classnames_default()(basePageContainer, hashId, className, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(basePageContainer, "-with-footer"), footer), (0,defineProperty/* default */.Z)(_classNames, "".concat(basePageContainer, "-with-affix"), fixedHeader && pageHeaderDom), (0,defineProperty/* default */.Z)(_classNames, "".concat(basePageContainer, "-stylish"), !!restProps.stylish), _classNames));
  return stylish.wrapSSR(wrapSSR((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsxs)("div", {
      style: style,
      className: containerClassName,
      children: [fixedHeader && pageHeaderDom ?
      // \u5728 hasHeader \u4E14 fixedHeader \u7684\u60C5\u51B5\u4E0B\uFF0C\u624D\u9700\u8981\u8BBE\u7F6E\u9AD8\u5EA6
      (0,jsx_runtime.jsx)(affix, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
        offsetTop: value.hasHeader && value.fixedHeader ? token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.heightLayoutHeader : 1
      }, affixProps), {}, {
        className: "".concat(basePageContainer, "-affix ").concat(hashId),
        children: (0,jsx_runtime.jsx)("div", {
          className: "".concat(basePageContainer, "-warp ").concat(hashId),
          children: pageHeaderDom
        })
      })) : pageHeaderDom, renderContentDom && (0,jsx_runtime.jsx)(GridContent, {
        children: renderContentDom
      })]
    }), footer && (0,jsx_runtime.jsx)(FooterToolbar, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      stylish: restProps.footerStylish,
      prefixCls: prefixCls
    }, footerToolBarProps), {}, {
      children: footer
    }))]
  })));
};
var PageContainer = function PageContainer(props) {
  return (0,jsx_runtime.jsx)(es/* ProConfigProvider */._Y, {
    needDeps: true,
    children: (0,jsx_runtime.jsx)(PageContainerBase, (0,esm_objectSpread2/* default */.Z)({}, props))
  });
};
var ProPageHeader = function ProPageHeader(props) {
  var value = useContext(RouteContext);
  return memoRenderPageHeader(_objectSpread(_objectSpread({}, props), {}, {
    hashId: '',
    value: value
  }));
};

;// CONCATENATED MODULE: ./src/components/Page/index.tsx





var Page = function Page(props) {
  var loading = props.loading,
    children = props.children,
    hasBreadcrumb = props.hasBreadcrumb;
  var cardProps = {
    id: 'container',
    loading: loading,
    style: {
      marginLeft: 32
    },
    bodyStyle: {
      margin: '24px 24px 24px 32px',
      height: '100vh'
    }
  };
  if (hasBreadcrumb) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(PageContainer, {
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(card, objectSpread2_default()(objectSpread2_default()({}, cardProps), {}, {
        children: children
      }))
    });
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(card, objectSpread2_default()(objectSpread2_default()({}, cardProps), {}, {
    children: children
  }));
};
Page.defaultProps = {
  loading: false,
  hasBreadcrumb: false
};
/* harmony default export */ var components_Page = (/*#__PURE__*/react.memo(Page));
;// CONCATENATED MODULE: ./src/components/index.tsx



//# sourceURL=webpack:///./src/components/index.tsx_+_28_modules?`)},32191:function(__unused_webpack_module,exports){eval(`

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = contains;
function contains(root, n) {
  if (!root) {
    return false;
  }
  // Use native if support
  if (root.contains) {
    return root.contains(n);
  }
  // \`document.contains\` not support with IE11
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

//# sourceURL=webpack:///./node_modules/rc-util/lib/Dom/contains.js?`)},93399:function(__unused_webpack_module,exports,__webpack_require__){eval(`

var _interopRequireDefault = (__webpack_require__(64836)["default"]);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clearContainerCache = clearContainerCache;
exports.injectCSS = injectCSS;
exports.removeCSS = removeCSS;
exports.updateCSS = updateCSS;
var _canUseDom = _interopRequireDefault(__webpack_require__(19158));
var _contains = _interopRequireDefault(__webpack_require__(32191));
var APPEND_ORDER = 'data-rc-order';
var MARK_KEY = "rc-util-key";
var containerCache = new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    mark = _ref.mark;
  if (mark) {
    return mark.startsWith('data-') ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector('head');
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === 'queue') {
    return 'prependQueue';
  }
  return prepend ? 'prepend' : 'append';
}
/**
 * Find style which inject by rc-util
 */
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function (node) {
    return node.tagName === 'STYLE';
  });
}
function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!(0, _canUseDom.default)()) {
    return null;
  }
  var csp = option.csp,
    prepend = option.prepend;
  var styleNode = document.createElement('style');
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
  if (csp === null || csp === void 0 ? void 0 : csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css;
  var container = getContainer(option);
  var firstChild = container.firstChild;
  if (prepend) {
    // If is queue \`prepend\`, it will prepend first style and then append rest style
    if (prepend === 'queue') {
      var existStyle = findStyles(container).filter(function (node) {
        return ['prepend', 'prependQueue'].includes(node.getAttribute(APPEND_ORDER));
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    // Use \`insertBefore\` as \`prepend\`
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var container = getContainer(option);
  return findStyles(container).find(function (node) {
    return node.getAttribute(getMark(option)) === key;
  });
}
function removeCSS(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var existNode = findExistNode(key, option);
  if (existNode) {
    var container = getContainer(option);
    container.removeChild(existNode);
  }
}
/**
 * qiankun will inject \`appendChild\` to insert into other
 */
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);
  // Find real container when not cached or cached container removed
  if (!cachedRealContainer || !(0, _contains.default)(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS('', option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
/**
 * manually clear container cache to avoid global cache in unit testes
 */
function clearContainerCache() {
  containerCache.clear();
}
function updateCSS(css, key) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var container = getContainer(option);
  // Sync real parent
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if (((_option$csp = option.csp) === null || _option$csp === void 0 ? void 0 : _option$csp.nonce) && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}

//# sourceURL=webpack:///./node_modules/rc-util/lib/Dom/dynamicCSS.js?`)}}]);
