(self.webpackChunk=self.webpackChunk||[]).push([[419],{83832:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": function() { return /* binding */ PageLoading; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1413);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45987);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75081);


var _excluded = ["isLoading", "pastDelay", "timedOut", "error", "retry"];


var PageLoading = function PageLoading(_ref) {
  var isLoading = _ref.isLoading,
    pastDelay = _ref.pastDelay,
    timedOut = _ref.timedOut,
    error = _ref.error,
    retry = _ref.retry,
    reset = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    style: {
      paddingBlockStart: 100,
      textAlign: 'center'
    },
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)({
      size: "large"
    }, reset))
  });
};


//# sourceURL=webpack:///./node_modules/@ant-design/pro-layout/es/components/PageLoading/index.js?`)},76509:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": function() { return /* binding */ RouteContext; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

var RouteContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

//# sourceURL=webpack:///./node_modules/@ant-design/pro-layout/es/context/RouteContext.js?`)},73964:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "_Y": function() { return /* binding */ ProConfigProvider; },
  "L_": function() { return /* binding */ ProProvider; }
});

// UNUSED EXPORTS: ConfigConsumer, arEGIntl, caESIntl, createIntl, deDEIntl, default, enGBIntl, enUSIntl, esESIntl, faIRIntl, frFRIntl, hrHRIntl, idIDIntl, intlMap, intlMapKeys, itITIntl, jaJPIntl, koKRIntl, lighten, mnMNIntl, msMYIntl, operationUnit, plPLIntl, proTheme, ptBRIntl, resetComponent, ruRUIntl, setAlpha, srRSIntl, trTRIntl, useIntl, useStyle, useToken, viVNIntl, zhCNIntl, zhTWIntl

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(74902);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(97685);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(45987);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(1413);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(37762);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/@ant-design/cssinjs/es/index.js + 26 modules
var es = __webpack_require__(65178);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/index.js + 4 modules
var config_provider = __webpack_require__(58720);
// EXTERNAL MODULE: ./node_modules/antd/es/locale/zh_CN.js + 5 modules
var zh_CN = __webpack_require__(45188);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/swr/core/dist/index.mjs + 1 modules
var dist = __webpack_require__(59734);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/ar_EG.js
/* harmony default export */ var ar_EG = ({
  moneySymbol: '$',
  form: {
    lightFilter: {
      more: '\u0627\u0644\u0645\u0632\u064A\u062F',
      clear: '\u0646\u0638\u0641',
      confirm: '\u062A\u0623\u0643\u064A\u062F',
      itemUnit: '\u0639\u0646\u0627\u0635\u0631'
    }
  },
  tableForm: {
    search: '\u0627\u0628\u062D\u062B',
    reset: '\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646',
    submit: '\u0627\u0631\u0633\u0627\u0644',
    collapsed: '\u0645\u064F\u0642\u0644\u0635',
    expand: '\u0645\u064F\u0648\u0633\u0639',
    inputPlaceholder: '\u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u0625\u062F\u062E\u0627\u0644',
    selectPlaceholder: '\u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u0625\u062E\u062A\u064A\u0627\u0631'
  },
  alert: {
    clear: '\u0646\u0638\u0641',
    selected: '\u0645\u062D\u062F\u062F',
    item: '\u0639\u0646\u0635\u0631'
  },
  pagination: {
    total: {
      range: ' ',
      total: '\u0645\u0646',
      item: '\u0639\u0646\u0627\u0635\u0631'
    }
  },
  tableToolBar: {
    leftPin: '\u062B\u0628\u062A \u0639\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631',
    rightPin: '\u062B\u0628\u062A \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646',
    noPin: '\u0627\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u062B\u0628\u064A\u062A',
    leftFixedTitle: '\u0644\u0635\u0642 \u0639\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631',
    rightFixedTitle: '\u0644\u0635\u0642 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646',
    noFixedTitle: '\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0625\u0644\u0635\u0627\u0642',
    reset: '\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646',
    columnDisplay: '\u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629',
    columnSetting: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A',
    fullScreen: '\u0648\u0636\u0639 \u0643\u0627\u0645\u0644 \u0627\u0644\u0634\u0627\u0634\u0629',
    exitFullScreen: '\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0648\u0636\u0639 \u0643\u0627\u0645\u0644 \u0627\u0644\u0634\u0627\u0634\u0629',
    reload: '\u062A\u062D\u062F\u064A\u062B',
    density: '\u0627\u0644\u0643\u062B\u0627\u0641\u0629',
    densityDefault: '\u0627\u0641\u062A\u0631\u0627\u0636\u064A',
    densityLarger: '\u0623\u0643\u0628\u0631',
    densityMiddle: '\u0648\u0633\u0637',
    densitySmall: '\u0645\u062F\u0645\u062C'
  },
  stepsForm: {
    next: '\u0627\u0644\u062A\u0627\u0644\u064A',
    prev: '\u0627\u0644\u0633\u0627\u0628\u0642',
    submit: '\u0623\u0646\u0647\u0649'
  },
  loginForm: {
    submitText: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644'
  },
  editableTable: {
    action: {
      save: '\u0623\u0646\u0642\u0630',
      cancel: '\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0623\u0645\u0631',
      delete: '\u062D\u0630\u0641',
      add: '\u0625\u0636\u0627\u0641\u0629 \u0635\u0641 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A'
    }
  },
  switch: {
    open: '\u0645\u0641\u062A\u0648\u062D',
    close: '\u063A\u0644\u0642'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/ca_ES.js
/* harmony default export */ var ca_ES = ({
  moneySymbol: '\u20AC',
  form: {
    lightFilter: {
      more: 'M\xE9s',
      clear: 'Netejar',
      confirm: 'Confirmar',
      itemUnit: 'Elements'
    }
  },
  tableForm: {
    search: 'Cercar',
    reset: 'Netejar',
    submit: 'Enviar',
    collapsed: 'Expandir',
    expand: 'Col\xB7lapsar',
    inputPlaceholder: 'Introdu\xEFu valor',
    selectPlaceholder: 'Seleccioneu valor'
  },
  alert: {
    clear: 'Netejar',
    selected: 'Seleccionat',
    item: 'Article'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'de',
      item: 'articles'
    }
  },
  tableToolBar: {
    leftPin: "Pin a l'esquerra",
    rightPin: 'Pin a la dreta',
    noPin: 'Sense Pin',
    leftFixedTitle: "Fixat a l'esquerra",
    rightFixedTitle: 'Fixat a la dreta',
    noFixedTitle: 'Sense fixar',
    reset: 'Reiniciar',
    columnDisplay: 'Mostrar Columna',
    columnSetting: 'Configuraci\xF3',
    fullScreen: 'Pantalla Completa',
    exitFullScreen: 'Sortir Pantalla Completa',
    reload: 'Refrescar',
    density: 'Densitat',
    densityDefault: 'Per Defecte',
    densityLarger: 'Llarg',
    densityMiddle: 'Mitj\xE0',
    densitySmall: 'Compacte'
  },
  stepsForm: {
    next: 'Seg\xFCent',
    prev: 'Anterior',
    submit: 'Finalizar'
  },
  loginForm: {
    submitText: 'Entrar'
  },
  editableTable: {
    action: {
      save: 'Guardar',
      cancel: 'Cancel\xB7lar',
      delete: 'Eliminar',
      add: 'afegir una fila de dades'
    }
  },
  switch: {
    open: 'obert',
    close: 'tancat'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/de_DE.js
/* harmony default export */ var de_DE = ({
  moneySymbol: '\u20AC',
  form: {
    lightFilter: {
      more: 'Mehr',
      clear: 'Zur\xFCcksetzen',
      confirm: 'Best\xE4tigen',
      itemUnit: 'Eintr\xE4ge'
    }
  },
  tableForm: {
    search: 'Suchen',
    reset: 'Zur\xFCcksetzen',
    submit: 'Absenden',
    collapsed: 'Zeige mehr',
    expand: 'Zeige weniger',
    inputPlaceholder: 'Bitte eingeben',
    selectPlaceholder: 'Bitte ausw\xE4hlen'
  },
  alert: {
    clear: 'Zur\xFCcksetzen',
    selected: 'Ausgew\xE4hlt',
    item: 'Eintrag'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'von',
      item: 'Eintr\xE4gen'
    }
  },
  tableToolBar: {
    leftPin: 'Links anheften',
    rightPin: 'Rechts anheften',
    noPin: 'Nicht angeheftet',
    leftFixedTitle: 'Links fixiert',
    rightFixedTitle: 'Rechts fixiert',
    noFixedTitle: 'Nicht fixiert',
    reset: 'Zur\xFCcksetzen',
    columnDisplay: 'Angezeigte Reihen',
    columnSetting: 'Einstellungen',
    fullScreen: 'Vollbild',
    exitFullScreen: 'Vollbild verlassen',
    reload: 'Aktualisieren',
    density: 'Abstand',
    densityDefault: 'Standard',
    densityLarger: 'Gr\xF6\xDFer',
    densityMiddle: 'Mittel',
    densitySmall: 'Kompakt'
  },
  stepsForm: {
    next: 'Weiter',
    prev: 'Zur\xFCck',
    submit: 'Abschlie\xDFen'
  },
  loginForm: {
    submitText: 'Anmelden'
  },
  editableTable: {
    action: {
      save: 'Retten',
      cancel: 'Abbrechen',
      delete: 'L\xF6schen',
      add: 'Hinzuf\xFCgen einer Datenzeile'
    }
  },
  switch: {
    open: 'offen',
    close: 'schlie\xDFen'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/en_GB.js
/* harmony default export */ var en_GB = ({
  moneySymbol: '\xA3',
  form: {
    lightFilter: {
      more: 'More',
      clear: 'Clear',
      confirm: 'Confirm',
      itemUnit: 'Items'
    }
  },
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select'
  },
  alert: {
    clear: 'Clear',
    selected: 'Selected',
    item: 'Item'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'of',
      item: 'items'
    }
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact'
  },
  stepsForm: {
    next: 'Next',
    prev: 'Previous',
    submit: 'Finish'
  },
  loginForm: {
    submitText: 'Login'
  },
  editableTable: {
    action: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      add: 'add a row of data'
    }
  },
  switch: {
    open: 'open',
    close: 'close'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/en_US.js
/* harmony default export */ var en_US = ({
  moneySymbol: '$',
  deleteThisLine: 'Delete this line',
  copyThisLine: 'Copy this line',
  form: {
    lightFilter: {
      more: 'More',
      clear: 'Clear',
      confirm: 'Confirm',
      itemUnit: 'Items'
    }
  },
  tableForm: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select'
  },
  alert: {
    clear: 'Clear',
    selected: 'Selected',
    item: 'Item'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'of',
      item: 'items'
    }
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact'
  },
  stepsForm: {
    next: 'Next',
    prev: 'Previous',
    submit: 'Finish'
  },
  loginForm: {
    submitText: 'Login'
  },
  editableTable: {
    onlyOneLineEditor: 'Only one line can be edited',
    action: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      add: 'add a row of data'
    }
  },
  switch: {
    open: 'open',
    close: 'close'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/es_ES.js
/* harmony default export */ var es_ES = ({
  moneySymbol: '\u20AC',
  form: {
    lightFilter: {
      more: 'M\xE1s',
      clear: 'Limpiar',
      confirm: 'Confirmar',
      itemUnit: 'art\xEDculos'
    }
  },
  tableForm: {
    search: 'Buscar',
    reset: 'Limpiar',
    submit: 'Submit',
    collapsed: 'Expandir',
    expand: 'Colapsar',
    inputPlaceholder: 'Ingrese valor',
    selectPlaceholder: 'Seleccione valor'
  },
  alert: {
    clear: 'Limpiar',
    selected: 'Seleccionado',
    item: 'Articulo'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'de',
      item: 'art\xEDculos'
    }
  },
  tableToolBar: {
    leftPin: 'Pin a la izquierda',
    rightPin: 'Pin a la derecha',
    noPin: 'Sin Pin',
    leftFixedTitle: 'Fijado a la izquierda',
    rightFixedTitle: 'Fijado a la derecha',
    noFixedTitle: 'Sin Fijar',
    reset: 'Reiniciar',
    columnDisplay: 'Mostrar Columna',
    columnSetting: 'Configuraci\xF3n',
    fullScreen: 'Pantalla Completa',
    exitFullScreen: 'Salir Pantalla Completa',
    reload: 'Refrescar',
    density: 'Densidad',
    densityDefault: 'Por Defecto',
    densityLarger: 'Largo',
    densityMiddle: 'Medio',
    densitySmall: 'Compacto'
  },
  stepsForm: {
    next: 'Siguiente',
    prev: 'Anterior',
    submit: 'Finalizar'
  },
  loginForm: {
    submitText: 'Entrar'
  },
  editableTable: {
    action: {
      save: 'Guardar',
      cancel: 'Descartar',
      delete: 'Borrar',
      add: 'a\xF1adir una fila de datos'
    }
  },
  switch: {
    open: 'abrir',
    close: 'cerrar'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/fa_IR.js
/* harmony default export */ var fa_IR = ({
  moneySymbol: '\u062A\u0648\u0645\u0627\u0646',
  form: {
    lightFilter: {
      more: '\u0628\u06CC\u0634\u062A\u0631',
      clear: '\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646',
      confirm: '\u062A\u0627\u06CC\u06CC\u062F',
      itemUnit: '\u0645\u0648\u0631\u062F'
    }
  },
  tableForm: {
    search: '\u062C\u0633\u062A\u062C\u0648',
    reset: '\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC',
    submit: '\u062A\u0627\u06CC\u06CC\u062F',
    collapsed: '\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631',
    expand: '\u0646\u0645\u0627\u06CC\u0634 \u06A9\u0645\u062A\u0631',
    inputPlaceholder: '\u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u062F',
    selectPlaceholder: '\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F'
  },
  alert: {
    clear: '\u067E\u0627\u06A9 \u0633\u0627\u0632\u06CC',
    selected: '\u0627\u0646\u062A\u062E\u0627\u0628',
    item: '\u0645\u0648\u0631\u062F'
  },
  pagination: {
    total: {
      range: ' ',
      total: '\u0627\u0632',
      item: '\u0645\u0648\u0631\u062F'
    }
  },
  tableToolBar: {
    leftPin: '\u0633\u0646\u062C\u0627\u0642 \u0628\u0647 \u0686\u067E',
    rightPin: '\u0633\u0646\u062C\u0627\u0642 \u0628\u0647 \u0631\u0627\u0633\u062A',
    noPin: '\u0633\u0646\u062C\u0627\u0642 \u0646\u0634\u062F\u0647',
    leftFixedTitle: '\u062B\u0627\u0628\u062A \u0634\u062F\u0647 \u062F\u0631 \u0686\u067E',
    rightFixedTitle: '\u062B\u0627\u0628\u062A \u0634\u062F\u0647 \u062F\u0631 \u0631\u0627\u0633\u062A',
    noFixedTitle: '\u0634\u0646\u0627\u0648\u0631',
    reset: '\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC',
    columnDisplay: '\u0646\u0645\u0627\u06CC\u0634 \u0647\u0645\u0647',
    columnSetting: '\u062A\u0646\u0638\u06CC\u0645\u0627\u062A',
    fullScreen: '\u062A\u0645\u0627\u0645 \u0635\u0641\u062D\u0647',
    exitFullScreen: '\u062E\u0631\u0648\u062C \u0627\u0632 \u062D\u0627\u0644\u062A \u062A\u0645\u0627\u0645 \u0635\u0641\u062D\u0647',
    reload: '\u062A\u0627\u0632\u0647 \u0633\u0627\u0632\u06CC',
    density: '\u062A\u0631\u0627\u06A9\u0645',
    densityDefault: '\u067E\u06CC\u0634 \u0641\u0631\u0636',
    densityLarger: '\u0628\u0632\u0631\u06AF',
    densityMiddle: '\u0645\u062A\u0648\u0633\u0637',
    densitySmall: '\u06A9\u0648\u0686\u06A9'
  },
  stepsForm: {
    next: '\u0628\u0639\u062F\u06CC',
    prev: '\u0642\u0628\u0644\u06CC',
    submit: '\u0627\u062A\u0645\u0627\u0645'
  },
  loginForm: {
    submitText: '\u0648\u0631\u0648\u062F'
  },
  editableTable: {
    action: {
      save: '\u0630\u062E\u06CC\u0631\u0647',
      cancel: '\u0644\u063A\u0648',
      delete: '\u062D\u0630\u0641',
      add: '\u06CC\u06A9 \u0631\u062F\u06CC\u0641 \u062F\u0627\u062F\u0647 \u0627\u0636\u0627\u0641\u0647 \u06A9\u0646\u06CC\u062F'
    }
  },
  switch: {
    open: '\u0628\u0627\u0632',
    close: '\u0646\u0632\u062F\u06CC\u06A9'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/fr_FR.js
/* harmony default export */ var fr_FR = ({
  moneySymbol: '\u20AC',
  form: {
    lightFilter: {
      more: 'Plus',
      clear: 'Effacer',
      confirm: 'Confirmer',
      itemUnit: 'Items'
    }
  },
  tableForm: {
    search: 'Rechercher',
    reset: 'R\xE9initialiser',
    submit: 'Envoyer',
    collapsed: 'Agrandir',
    expand: 'R\xE9duire',
    inputPlaceholder: 'Entrer une valeur',
    selectPlaceholder: 'S\xE9lectionner une valeur'
  },
  alert: {
    clear: 'R\xE9initialiser',
    selected: 'S\xE9lectionn\xE9',
    item: 'Item'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'sur',
      item: '\xE9l\xE9ments'
    }
  },
  tableToolBar: {
    leftPin: '\xC9pingler \xE0 gauche',
    rightPin: '\xC9pingler \xE0 gauche',
    noPin: 'Sans \xE9pingle',
    leftFixedTitle: 'Fixer \xE0 gauche',
    rightFixedTitle: 'Fixer \xE0 droite',
    noFixedTitle: 'Non fix\xE9',
    reset: 'R\xE9initialiser',
    columnDisplay: 'Affichage colonne',
    columnSetting: 'R\xE9glages',
    fullScreen: 'Plein \xE9cran',
    exitFullScreen: 'Quitter Plein \xE9cran',
    reload: 'Rafraichir',
    density: 'Densit\xE9',
    densityDefault: 'Par d\xE9faut',
    densityLarger: 'Larger',
    densityMiddle: 'Moyenne',
    densitySmall: 'Compacte'
  },
  stepsForm: {
    next: 'Suivante',
    prev: 'Pr\xE9c\xE9dente',
    submit: 'Finaliser'
  },
  loginForm: {
    submitText: 'Se connecter'
  },
  editableTable: {
    action: {
      save: 'Sauvegarder',
      cancel: 'Annuler',
      delete: 'Supprimer',
      add: 'ajouter une ligne de donn\xE9es'
    }
  },
  switch: {
    open: 'ouvert',
    close: 'pr\xE8s'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/hr_HR.js
/* harmony default export */ var hr_HR = ({
  moneySymbol: 'kn',
  form: {
    lightFilter: {
      more: 'Vi\u0161e',
      clear: 'O\u010Disti',
      confirm: 'Potvrdi',
      itemUnit: 'Stavke'
    }
  },
  tableForm: {
    search: 'Pretra\u017Ei',
    reset: 'Poni\u0161ti',
    submit: 'Potvrdi',
    collapsed: 'Ra\u0161iri',
    expand: 'Skupi',
    inputPlaceholder: 'Unesite',
    selectPlaceholder: 'Odaberite'
  },
  alert: {
    clear: 'O\u010Disti',
    selected: 'Odaberi',
    item: 'stavke'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'od',
      item: 'stavke'
    }
  },
  tableToolBar: {
    leftPin: 'Prika\u010Di lijevo',
    rightPin: 'Prika\u010Di desno',
    noPin: 'Bez prika\u010Denja',
    leftFixedTitle: 'Fiksiraj lijevo',
    rightFixedTitle: 'Fiksiraj desno',
    noFixedTitle: 'Bez fiksiranja',
    reset: 'Resetiraj',
    columnDisplay: 'Prikaz stupaca',
    columnSetting: 'Postavke',
    fullScreen: 'Puni zaslon',
    exitFullScreen: 'Iza\u0111i iz punog zaslona',
    reload: 'Ponovno u\u010Ditaj',
    density: 'Veli\u010Dina',
    densityDefault: 'Zadano',
    densityLarger: 'Veliko',
    densityMiddle: 'Srednje',
    densitySmall: 'Malo'
  },
  stepsForm: {
    next: 'Sljede\u0107i',
    prev: 'Prethodni',
    submit: 'Kraj'
  },
  loginForm: {
    submitText: 'Prijava'
  },
  editableTable: {
    action: {
      save: 'Spremi',
      cancel: 'Odustani',
      delete: 'Obri\u0161i',
      add: 'dodajte red podataka'
    }
  },
  switch: {
    open: 'otvori',
    close: 'zatvori'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/id_ID.js
/* harmony default export */ var id_ID = ({
  moneySymbol: 'RP',
  form: {
    lightFilter: {
      more: 'Lebih',
      clear: 'Hapus',
      confirm: 'Konfirmasi',
      itemUnit: 'Unit'
    }
  },
  tableForm: {
    search: 'Cari',
    reset: 'Atur ulang',
    submit: 'Kirim',
    collapsed: 'Lebih sedikit',
    expand: 'Lebih banyak',
    inputPlaceholder: 'Masukkan pencarian',
    selectPlaceholder: 'Pilih'
  },
  alert: {
    clear: 'Hapus',
    selected: 'Dipilih',
    item: 'Butir'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'Dari',
      item: 'Butir'
    }
  },
  tableToolBar: {
    leftPin: 'Pin kiri',
    rightPin: 'Pin kanan',
    noPin: 'Tidak ada pin',
    leftFixedTitle: 'Rata kiri',
    rightFixedTitle: 'Rata kanan',
    noFixedTitle: 'Tidak tetap',
    reset: 'Atur ulang',
    columnDisplay: 'Tampilan kolom',
    columnSetting: 'Pengaturan',
    fullScreen: 'Layar penuh',
    exitFullScreen: 'Keluar layar penuh',
    reload: 'Atur ulang',
    density: 'Kerapatan',
    densityDefault: 'Standar',
    densityLarger: 'Lebih besar',
    densityMiddle: 'Sedang',
    densitySmall: 'Rapat'
  },
  stepsForm: {
    next: 'Selanjutnya',
    prev: 'Sebelumnya',
    submit: 'Selesai'
  },
  loginForm: {
    submitText: 'Login'
  },
  editableTable: {
    action: {
      save: 'simpan',
      cancel: 'batal',
      delete: 'hapus',
      add: 'Tambahkan baris data'
    }
  },
  switch: {
    open: 'buka',
    close: 'tutup'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/it_IT.js
/* harmony default export */ var it_IT = ({
  moneySymbol: '\u20AC',
  form: {
    lightFilter: {
      more: 'pi\xF9',
      clear: 'pulisci',
      confirm: 'conferma',
      itemUnit: 'elementi'
    }
  },
  tableForm: {
    search: 'Filtra',
    reset: 'Pulisci',
    submit: 'Invia',
    collapsed: 'Espandi',
    expand: 'Contrai',
    inputPlaceholder: 'Digita',
    selectPlaceholder: 'Seleziona'
  },
  alert: {
    clear: 'Rimuovi',
    selected: 'Selezionati',
    item: 'elementi'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'di',
      item: 'elementi'
    }
  },
  tableToolBar: {
    leftPin: 'Fissa a sinistra',
    rightPin: 'Fissa a destra',
    noPin: 'Ripristina posizione',
    leftFixedTitle: 'Fissato a sinistra',
    rightFixedTitle: 'Fissato a destra',
    noFixedTitle: 'Non fissato',
    reset: 'Ripristina',
    columnDisplay: 'Disposizione colonne',
    columnSetting: 'Impostazioni',
    fullScreen: 'Modalit\xE0 schermo intero',
    exitFullScreen: 'Esci da modalit\xE0 schermo intero',
    reload: 'Ricarica',
    density: 'Grandezza tabella',
    densityDefault: 'predefinito',
    densityLarger: 'Grande',
    densityMiddle: 'Media',
    densitySmall: 'Compatta'
  },
  stepsForm: {
    next: 'successivo',
    prev: 'precedente',
    submit: 'finisci'
  },
  loginForm: {
    submitText: 'Accedi'
  },
  editableTable: {
    action: {
      save: 'salva',
      cancel: 'annulla',
      delete: 'Delete',
      add: 'add a row of data'
    }
  },
  switch: {
    open: 'open',
    close: 'chiudi'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/ja_JP.js
/* harmony default export */ var ja_JP = ({
  moneySymbol: '\xA5',
  form: {
    lightFilter: {
      more: '\u3082\u3063\u3068',
      clear: '\u660E\u78BA',
      confirm: '\u78BA\u8A8D',
      itemUnit: '\u9805\u76EE'
    }
  },
  tableForm: {
    search: '\u691C\u7D22',
    reset: '\u30EA\u30BB\u30C3\u30C8',
    submit: '\u63D0\u4EA4',
    collapsed: '\u5C55\u958B',
    expand: '\u53CE\u7D0D',
    inputPlaceholder: '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044',
    selectPlaceholder: '\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044'
  },
  alert: {
    clear: '\u30AF\u30EA\u30A2',
    selected: '\u9078\u629E\u3057\u305F',
    item: '\u9805\u76EE'
  },
  pagination: {
    total: {
      range: '\u8A18\u4E8B',
      total: '/\u5408\u8A08',
      item: ' '
    }
  },
  tableToolBar: {
    leftPin: '\u5DE6\u306B\u56FA\u5B9A',
    rightPin: '\u53F3\u306B\u56FA\u5B9A',
    noPin: '\u30AD\u30E3\u30F3\u30BB\u30EB',
    leftFixedTitle: '\u5DE6\u306B\u56FA\u5B9A\u3055\u308C\u305F\u9805\u76EE',
    rightFixedTitle: '\u53F3\u306B\u56FA\u5B9A\u3055\u308C\u305F\u9805\u76EE',
    noFixedTitle: '\u56FA\u5B9A\u3055\u308C\u3066\u306A\u3044\u9805\u76EE',
    reset: '\u30EA\u30BB\u30C3\u30C8',
    columnDisplay: '\u8868\u793A\u5217',
    columnSetting: '\u5217\u8868\u793A\u8A2D\u5B9A',
    fullScreen: '\u30D5\u30EB\u30B9\u30AF\u30EA\u30FC\u30F3',
    exitFullScreen: '\u7D42\u4E86',
    reload: '\u66F4\u65B0',
    density: '\u884C\u9AD8',
    densityDefault: '\u30C7\u30D5\u30A9\u30EB\u30C8',
    densityLarger: '\u9ED8\u8BA4',
    densityMiddle: '\u4E2D',
    densitySmall: '\u5C0F'
  },
  stepsForm: {
    next: '\u6B21\u306E\u30B9\u30C6\u30C3\u30D7',
    prev: '\u524D',
    submit: '\u9001\u4FE1'
  },
  loginForm: {
    submitText: '\u30ED\u30B0\u30A4\u30F3'
  },
  editableTable: {
    action: {
      save: '\u6551\u3046',
      cancel: '\u30AD\u30E3\u30F3\u30BB\u30EB',
      delete: '\u524A\u9664',
      add: '1\u884C\u306E\u30C7\u30FC\u30BF\u3092\u8FFD\u52A0\u3057\u307E\u3059'
    }
  },
  switch: {
    open: '\u30AA\u30FC\u30D7\u30F3',
    close: '\u8FD1\u3044'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/ko_KR.js
/* harmony default export */ var ko_KR = ({
  moneySymbol: '\u20A9',
  form: {
    lightFilter: {
      more: '\uB354\uBCF4\uAE30',
      clear: '\uCDE8\uC18C',
      confirm: '\uD655\uC778',
      itemUnit: '\uAC74\uC218'
    }
  },
  tableForm: {
    search: '\uC870\uD68C',
    reset: '\uCD08\uAE30\uD654',
    submit: '\uC81C\uCD9C',
    collapsed: '\uD655\uC7A5',
    expand: '\uB2EB\uAE30',
    inputPlaceholder: '\uC785\uB825\uD574 \uC8FC\uC138\uC694',
    selectPlaceholder: '\uC120\uD0DD\uD574 \uC8FC\uC138\uC694'
  },
  alert: {
    clear: '\uCDE8\uC18C',
    selected: '\uC120\uD0DD',
    item: '\uAC74'
  },
  pagination: {
    total: {
      range: ' ',
      total: '/ \uCD1D',
      item: '\uAC74'
    }
  },
  tableToolBar: {
    leftPin: '\uC67C\uCABD\uC73C\uB85C \uD540',
    rightPin: '\uC624\uB978\uCABD\uC73C\uB85C \uD540',
    noPin: '\uD540 \uC81C\uAC70',
    leftFixedTitle: '\uC67C\uCABD\uC73C\uB85C \uACE0\uC815',
    rightFixedTitle: '\uC624\uB978\uCABD\uC73C\uB85C \uACE0\uC815',
    noFixedTitle: '\uBE44\uACE0\uC815',
    reset: '\uCD08\uAE30\uD654',
    columnDisplay: '\uCEEC\uB7FC \uD45C\uC2DC',
    columnSetting: '\uC124\uC815',
    fullScreen: '\uC804\uCCB4 \uD654\uBA74',
    exitFullScreen: '\uC804\uCCB4 \uD654\uBA74 \uCDE8\uC18C',
    reload: '\uB2E4\uC2DC \uC77D\uAE30',
    density: '\uC5EC\uBC31',
    densityDefault: '\uAE30\uBCF8',
    densityLarger: '\uB9CE\uC740 \uC5EC\uBC31',
    densityMiddle: '\uC911\uAC04 \uC5EC\uBC31',
    densitySmall: '\uC881\uC740 \uC5EC\uBC31'
  },
  stepsForm: {
    next: '\uB2E4\uC74C',
    prev: '\uC774\uC804',
    submit: '\uC885\uB8CC'
  },
  loginForm: {
    submitText: '\uB85C\uADF8\uC778'
  },
  editableTable: {
    action: {
      save: '\uC800\uC7A5',
      cancel: '\uCDE8\uC18C',
      delete: '\uC0AD\uC81C',
      add: '\uB370\uC774\uD130 \uD589 \uCD94\uAC00'
    }
  },
  switch: {
    open: '\uC5F4',
    close: '\uAC00\uAE4C \uC6B4'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/mn_MN.js
/* harmony default export */ var mn_MN = ({
  moneySymbol: '\u20AE',
  form: {
    lightFilter: {
      more: '\u0418\u043B\u04AF\u04AF',
      clear: '\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445',
      confirm: '\u0411\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0443\u0443\u043B\u0430\u0445',
      itemUnit: '\u041D\u044D\u0433\u0436\u04AF\u04AF\u0434'
    }
  },
  tableForm: {
    search: '\u0425\u0430\u0439\u0445',
    reset: '\u0428\u0438\u043D\u044D\u0447\u043B\u044D\u0445',
    submit: '\u0418\u043B\u0433\u044D\u044D\u0445',
    collapsed: '\u04E8\u0440\u0433\u04E9\u0442\u0433\u04E9\u0445',
    expand: '\u0425\u0443\u0440\u0430\u0430\u0445',
    inputPlaceholder: '\u0423\u0442\u0433\u0430 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443',
    selectPlaceholder: '\u0423\u0442\u0433\u0430 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443'
  },
  alert: {
    clear: '\u0426\u044D\u0432\u044D\u0440\u043B\u044D\u0445',
    selected: '\u0421\u043E\u043D\u0433\u043E\u0433\u0434\u0441\u043E\u043D',
    item: '\u041D\u044D\u0433\u0436'
  },
  pagination: {
    total: {
      range: ' ',
      total: '\u041D\u0438\u0439\u0442',
      item: '\u043C\u04E9\u0440'
    }
  },
  tableToolBar: {
    leftPin: '\u0417\u04AF\u04AF\u043D \u0442\u0438\u0439\u0448 \u0431\u044D\u0445\u043B\u044D\u0445',
    rightPin: '\u0411\u0430\u0440\u0443\u0443\u043D \u0442\u0438\u0439\u0448 \u0431\u044D\u0445\u043B\u044D\u0445',
    noPin: '\u0411\u044D\u0445\u043B\u044D\u0445\u0433\u04AF\u0439',
    leftFixedTitle: '\u0417\u04AF\u04AF\u043D \u0437\u044D\u0440\u044D\u0433\u0446\u04AF\u04AF\u043B\u044D\u0445',
    rightFixedTitle: '\u0411\u0430\u0440\u0443\u0443\u043D \u0437\u044D\u0440\u044D\u0433\u0446\u04AF\u04AF\u043B\u044D\u0445',
    noFixedTitle: '\u0417\u044D\u0440\u044D\u0433\u0446\u04AF\u04AF\u043B\u044D\u0445\u0433\u04AF\u0439',
    reset: '\u0428\u0438\u043D\u044D\u0447\u043B\u044D\u0445',
    columnDisplay: '\u0411\u0430\u0433\u0430\u043D\u0430\u0430\u0440 \u0445\u0430\u0440\u0443\u0443\u043B\u0430\u0445',
    columnSetting: '\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E',
    fullScreen: '\u0411\u04AF\u0442\u044D\u043D \u0434\u044D\u043B\u0433\u044D\u0446\u044D\u044D\u0440',
    exitFullScreen: '\u0411\u04AF\u0442\u044D\u043D \u0434\u044D\u043B\u0433\u044D\u0446 \u0446\u0443\u0446\u043B\u0430\u0445',
    reload: '\u0428\u0438\u043D\u044D\u0447\u043B\u044D\u0445',
    density: '\u0425\u044D\u043C\u0436\u044D\u044D',
    densityDefault: '\u0425\u044D\u0432\u0438\u0439\u043D',
    densityLarger: '\u0422\u043E\u043C',
    densityMiddle: '\u0414\u0443\u043D\u0434',
    densitySmall: '\u0416\u0438\u0436\u0438\u0433'
  },
  stepsForm: {
    next: '\u0414\u0430\u0440\u0430\u0430\u0445',
    prev: '\u04E8\u043C\u043D\u04E9\u0445',
    submit: '\u0414\u0443\u0443\u0441\u0433\u0430\u0445'
  },
  loginForm: {
    submitText: '\u041D\u044D\u0432\u0442\u0440\u044D\u0445'
  },
  editableTable: {
    action: {
      save: '\u0425\u0430\u0434\u0433\u0430\u043B\u0430\u0445',
      cancel: '\u0426\u0443\u0446\u043B\u0430\u0445',
      delete: '\u0423\u0441\u0442\u0433\u0430\u0445',
      add: '\u041C\u04E9\u0440 \u043D\u044D\u043C\u044D\u0445'
    }
  },
  switch: {
    open: '\u041D\u044D\u044D\u0445',
    close: '\u0425\u0430\u0430\u0445'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/ms_MY.js
/* harmony default export */ var ms_MY = ({
  moneySymbol: 'RM',
  form: {
    lightFilter: {
      more: 'Lebih banyak',
      clear: 'Jelas',
      confirm: 'Mengesahkan',
      itemUnit: 'Item'
    }
  },
  tableForm: {
    search: 'Cari',
    reset: 'Menetapkan semula',
    submit: 'Hantar',
    collapsed: 'Kembang',
    expand: 'Kuncup',
    inputPlaceholder: 'Sila masuk',
    selectPlaceholder: 'Sila pilih'
  },
  alert: {
    clear: 'Padam',
    selected: 'Dipilih',
    item: 'Item'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'daripada',
      item: 'item'
    }
  },
  tableToolBar: {
    leftPin: 'Pin ke kiri',
    rightPin: 'Pin ke kanan',
    noPin: 'Tidak pin',
    leftFixedTitle: 'Tetap ke kiri',
    rightFixedTitle: 'Tetap ke kanan',
    noFixedTitle: 'Tidak Tetap',
    reset: 'Menetapkan semula',
    columnDisplay: 'Lajur',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Keluar Full Screen',
    reload: 'Muat Semula',
    density: 'Densiti',
    densityDefault: 'Biasa',
    densityLarger: 'Besar',
    densityMiddle: 'Tengah',
    densitySmall: 'Kecil'
  },
  stepsForm: {
    next: 'Seterusnya',
    prev: 'Sebelumnya',
    submit: 'Selesai'
  },
  loginForm: {
    submitText: 'Log Masuk'
  },
  editableTable: {
    action: {
      save: 'Simpan',
      cancel: 'Membatalkan',
      delete: 'Menghapuskan',
      add: 'tambah baris data'
    }
  },
  switch: {
    open: 'Terbuka',
    close: 'Tutup'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/pl_PL.js
/* harmony default export */ var pl_PL = ({
  moneySymbol: 'z\u0142',
  form: {
    lightFilter: {
      more: 'Wi\u0119cej',
      clear: 'Wyczy\u015B\u0107',
      confirm: 'Potwierd\u017A',
      itemUnit: 'Ilo\u015B\u0107'
    }
  },
  tableForm: {
    search: 'Szukaj',
    reset: 'Reset',
    submit: 'Zatwierd\u017A',
    collapsed: 'Poka\u017C wiecej',
    expand: 'Poka\u017C mniej',
    inputPlaceholder: 'Prosz\u0119 poda\u0107',
    selectPlaceholder: 'Prosz\u0119 wybra\u0107'
  },
  alert: {
    clear: 'Wyczy\u015B\u0107',
    selected: 'Wybrane',
    item: 'Wpis'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'z',
      item: 'Wpis\xF3w'
    }
  },
  tableToolBar: {
    leftPin: 'Przypnij do lewej',
    rightPin: 'Przypnij do prawej',
    noPin: 'Odepnij',
    leftFixedTitle: 'Przypi\u0119te do lewej',
    rightFixedTitle: 'Przypi\u0119te do prawej',
    noFixedTitle: 'Nieprzypi\u0119te',
    reset: 'Reset',
    columnDisplay: 'Wy\u015Bwietlane wiersze',
    columnSetting: 'Ustawienia',
    fullScreen: 'Pe\u0142en ekran',
    exitFullScreen: 'Zamknij pe\u0142en ekran',
    reload: 'Od\u015Bwie\u017C',
    density: 'Odst\u0119p',
    densityDefault: 'Standard',
    densityLarger: 'Wiekszy',
    densityMiddle: 'Sredni',
    densitySmall: 'Kompaktowy'
  },
  stepsForm: {
    next: 'Weiter',
    prev: 'Zur\xFCck',
    submit: 'Abschlie\xDFen'
  },
  loginForm: {
    submitText: 'Zaloguj si\u0119'
  },
  editableTable: {
    action: {
      save: 'Zapisa\u0107',
      cancel: 'Anuluj',
      delete: 'Usun\u0105\u0107',
      add: 'dodawanie wiersza danych'
    }
  },
  switch: {
    open: 'otwiera\u0107',
    close: 'zamyka\u0107'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/pt_BR.js
/* harmony default export */ var pt_BR = ({
  moneySymbol: 'R$',
  form: {
    lightFilter: {
      more: 'Mais',
      clear: 'Limpar',
      confirm: 'Confirmar',
      itemUnit: 'Itens'
    }
  },
  tableForm: {
    search: 'Filtrar',
    reset: 'Limpar',
    submit: 'Confirmar',
    collapsed: 'Expandir',
    expand: 'Colapsar',
    inputPlaceholder: 'Por favor insira',
    selectPlaceholder: 'Por favor selecione'
  },
  alert: {
    clear: 'Limpar',
    selected: 'Selecionado(s)',
    item: 'Item(s)'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'de',
      item: 'itens'
    }
  },
  tableToolBar: {
    leftPin: 'Fixar \xE0 esquerda',
    rightPin: 'Fixar \xE0 direita',
    noPin: 'Desfixado',
    leftFixedTitle: 'Fixado \xE0 esquerda',
    rightFixedTitle: 'Fixado \xE0 direita',
    noFixedTitle: 'N\xE3o fixado',
    reset: 'Limpar',
    columnDisplay: 'Mostrar Coluna',
    columnSetting: 'Configura\xE7\xF5es',
    fullScreen: 'Tela Cheia',
    exitFullScreen: 'Sair da Tela Cheia',
    reload: 'Atualizar',
    density: 'Densidade',
    densityDefault: 'Padr\xE3o',
    densityLarger: 'Largo',
    densityMiddle: 'M\xE9dio',
    densitySmall: 'Compacto'
  },
  stepsForm: {
    next: 'Pr\xF3ximo',
    prev: 'Anterior',
    submit: 'Enviar'
  },
  loginForm: {
    submitText: 'Entrar'
  },
  editableTable: {
    action: {
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Apagar',
      add: 'adicionar uma linha de dados'
    }
  },
  switch: {
    open: 'abrir',
    close: 'fechar'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/ru_RU.js
/* harmony default export */ var ru_RU = ({
  moneySymbol: '\u20BD',
  form: {
    lightFilter: {
      more: '\u0415\u0449\u0435',
      clear: '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C',
      confirm: '\u041E\u041A',
      itemUnit: '\u041F\u043E\u0437\u0438\u0446\u0438\u0438'
    }
  },
  tableForm: {
    search: '\u041D\u0430\u0439\u0442\u0438',
    reset: '\u0421\u0431\u0440\u043E\u0441',
    submit: '\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C',
    collapsed: '\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C',
    expand: '\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C',
    inputPlaceholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435',
    selectPlaceholder: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435'
  },
  alert: {
    clear: '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C',
    selected: '\u0412\u044B\u0431\u0440\u0430\u043D\u043E',
    item: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432'
  },
  pagination: {
    total: {
      range: ' ',
      total: '\u0438\u0437',
      item: '\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432'
    }
  },
  tableToolBar: {
    leftPin: '\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0441\u043B\u0435\u0432\u0430',
    rightPin: '\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u0430',
    noPin: '\u041E\u0442\u043A\u0440\u0435\u043F\u0438\u0442\u044C',
    leftFixedTitle: '\u0417\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E \u0441\u043B\u0435\u0432\u0430',
    rightFixedTitle: '\u0417\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E \u0441\u043F\u0440\u0430\u0432\u0430',
    noFixedTitle: '\u041D\u0435 \u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E',
    reset: '\u0421\u0431\u0440\u043E\u0441',
    columnDisplay: '\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u043B\u0431\u0446\u0430',
    columnSetting: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438',
    fullScreen: '\u041F\u043E\u043B\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D',
    exitFullScreen: '\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043F\u043E\u043B\u043D\u043E\u044D\u043A\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430',
    reload: '\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C',
    density: '\u0420\u0430\u0437\u043C\u0435\u0440',
    densityDefault: '\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E',
    densityLarger: '\u0411\u043E\u043B\u044C\u0448\u043E\u0439',
    densityMiddle: '\u0421\u0440\u0435\u0434\u043D\u0438\u0439',
    densitySmall: '\u0421\u0436\u0430\u0442\u044B\u0439'
  },
  stepsForm: {
    next: '\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439',
    prev: '\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439',
    submit: '\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C'
  },
  loginForm: {
    submitText: '\u0412\u0445\u043E\u0434'
  },
  editableTable: {
    action: {
      save: '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C',
      cancel: '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C',
      delete: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C',
      add: '\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u044F\u0434 \u0434\u0430\u043D\u043D\u044B\u0445'
    }
  },
  switch: {
    open: '\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u0447\u0435\u043C\u043F\u0438\u043E\u043D\u0430\u0442 \u043C\u0438\u0440\u0430 \u043F\u043E \u0442\u0435\u043D\u043D\u0438\u0441\u0443',
    close: '\u041F\u043E \u0430\u0434\u0440\u0435\u0441\u0443:'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/sr_RS.js
/* harmony default export */ var sr_RS = ({
  moneySymbol: 'RSD',
  form: {
    lightFilter: {
      more: 'Vi\u0161e',
      clear: 'O\u010Disti',
      confirm: 'Potvrdi',
      itemUnit: 'Stavke'
    }
  },
  tableForm: {
    search: 'Prona\u0111i',
    reset: 'Resetuj',
    submit: 'Po\u0161alji',
    collapsed: 'Pro\u0161iri',
    expand: 'Skupi',
    inputPlaceholder: 'Molimo unesite',
    selectPlaceholder: 'Molimo odaberite'
  },
  alert: {
    clear: 'O\u010Disti',
    selected: 'Odabrano',
    item: 'Stavka'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'od',
      item: 'stavki'
    }
  },
  tableToolBar: {
    leftPin: 'Zaka\u010Di levo',
    rightPin: 'Zaka\u010Di desno',
    noPin: 'Nije zaka\u010Deno',
    leftFixedTitle: 'Fiksirano levo',
    rightFixedTitle: 'Fiksirano desno',
    noFixedTitle: 'Nije fiksirano',
    reset: 'Resetuj',
    columnDisplay: 'Prikaz kolona',
    columnSetting: 'Pode\u0161avanja',
    fullScreen: 'Pun ekran',
    exitFullScreen: 'Zatvori pun ekran',
    reload: 'Osve\u017Ei',
    density: 'Veli\u010Dina',
    densityDefault: 'Podrazumevana',
    densityLarger: 'Ve\u0107a',
    densityMiddle: 'Srednja',
    densitySmall: 'Kompaktna'
  },
  stepsForm: {
    next: 'Dalje',
    prev: 'Nazad',
    submit: 'Gotovo'
  },
  loginForm: {
    submitText: 'Prijavi se'
  },
  editableTable: {
    action: {
      save: 'Sa\u010Duvaj',
      cancel: 'Poni\u0161ti',
      delete: 'Obri\u0161i',
      add: 'dodajte red podataka'
    }
  },
  switch: {
    open: '\u041E\u0442\u0432\u043E\u0440\u0438\u0442\u0435',
    close: '\u0417\u0430\u0442\u0432\u043E\u0440\u0438\u0442\u0435'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/tr_TR.js
/* harmony default export */ var tr_TR = ({
  moneySymbol: '\u20BA',
  form: {
    lightFilter: {
      more: 'Daha Fazla',
      clear: 'Temizle',
      confirm: 'Onayla',
      itemUnit: '\xD6\u011Feler'
    }
  },
  tableForm: {
    search: 'Filtrele',
    reset: 'S\u0131f\u0131rla',
    submit: 'G\xF6nder',
    collapsed: 'Daha fazla',
    expand: 'Daha az',
    inputPlaceholder: 'Filtrelemek i\xE7in bir de\u011Fer girin',
    selectPlaceholder: 'Filtrelemek i\xE7in bir de\u011Fer se\xE7in'
  },
  alert: {
    clear: 'Temizle',
    selected: 'Se\xE7ili',
    item: '\xD6\u011Fe'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'Toplam',
      item: '\xD6\u011Fe'
    }
  },
  tableToolBar: {
    leftPin: 'Sola sabitle',
    rightPin: 'Sa\u011Fa sabitle',
    noPin: 'Sabitlemeyi kald\u0131r',
    leftFixedTitle: 'Sola sabitlendi',
    rightFixedTitle: 'Sa\u011Fa sabitlendi',
    noFixedTitle: 'Sabitlenmedi',
    reset: 'S\u0131f\u0131rla',
    columnDisplay: 'Kolon G\xF6r\xFCn\xFCm\xFC',
    columnSetting: 'Ayarlar',
    fullScreen: 'Tam Ekran',
    exitFullScreen: 'Tam Ekrandan \xC7\u0131k',
    reload: 'Yenile',
    density: 'Kal\u0131nl\u0131k',
    densityDefault: 'Varsay\u0131lan',
    densityLarger: 'B\xFCy\xFCk',
    densityMiddle: 'Orta',
    densitySmall: 'K\xFC\xE7\xFCk'
  },
  stepsForm: {
    next: 'S\u0131radaki',
    prev: '\xD6nceki',
    submit: 'G\xF6nder'
  },
  loginForm: {
    submitText: 'Giri\u015F Yap'
  },
  editableTable: {
    action: {
      save: 'Kaydet',
      cancel: 'Vazge\xE7',
      delete: 'Sil',
      add: 'foegje in rige gegevens ta'
    }
  },
  switch: {
    open: 'a\xE7\u0131k',
    close: 'kapatmak'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/vi_VN.js
/* harmony default export */ var vi_VN = ({
  moneySymbol: '\u20AB',
  form: {
    lightFilter: {
      more: 'Nhi\u1EC1u h\u01A1n',
      clear: 'Trong',
      confirm: 'X\xE1c nh\u1EADn',
      itemUnit: 'M\u1EE5c'
    }
  },
  tableForm: {
    search: 'T\xECm ki\u1EBFm',
    reset: 'L\xE0m l\u1EA1i',
    submit: 'G\u1EEDi \u0111i',
    collapsed: 'M\u1EDF r\u1ED9ng',
    expand: 'Thu g\u1ECDn',
    inputPlaceholder: 'nh\u1EADp d\u1EEF li\u1EC7u',
    selectPlaceholder: 'Vui l\xF2ng ch\u1ECDn'
  },
  alert: {
    clear: 'X\xF3a',
    selected: '\u0111\xE3 ch\u1ECDn',
    item: 'm\u1EE5c'
  },
  pagination: {
    total: {
      range: ' ',
      total: 'tr\xEAn',
      item: 'm\u1EB7t h\xE0ng'
    }
  },
  tableToolBar: {
    leftPin: 'Ghim tr\xE1i',
    rightPin: 'Ghim ph\u1EA3i',
    noPin: 'B\u1ECF ghim',
    leftFixedTitle: 'C\u1ED1 \u0111\u1ECBnh tr\xE1i',
    rightFixedTitle: 'C\u1ED1 \u0111\u1ECBnh ph\u1EA3i',
    noFixedTitle: 'Ch\u01B0a c\u1ED1 \u0111\u1ECBnh',
    reset: 'L\xE0m l\u1EA1i',
    columnDisplay: 'C\u1ED9t hi\u1EC3n th\u1ECB',
    columnSetting: 'C\u1EA5u h\xECnh',
    fullScreen: 'Ch\u1EBF \u0111\u1ED9 to\xE0n m\xE0n h\xECnh',
    exitFullScreen: 'Tho\xE1t ch\u1EBF \u0111\u1ED9 to\xE0n m\xE0n h\xECnh',
    reload: 'L\xE0m m\u1EDBi',
    density: 'M\u1EADt \u0111\u1ED9 hi\u1EC3n th\u1ECB',
    densityDefault: 'M\u1EB7c \u0111\u1ECBnh',
    densityLarger: 'M\u1EB7c \u0111\u1ECBnh',
    densityMiddle: 'Trung b\xECnh',
    densitySmall: 'Ch\u1EADt'
  },
  stepsForm: {
    next: 'Sau',
    prev: 'Tr\u01B0\u1EDBc',
    submit: 'K\u1EBFt th\xFAc'
  },
  loginForm: {
    submitText: '\u0110\u0103ng nh\u1EADp'
  },
  editableTable: {
    action: {
      save: 'C\u1EE9u',
      cancel: 'H\u1EE7y',
      delete: 'X\xF3a',
      add: 'th\xEAm m\u1ED9t h\xE0ng d\u1EEF li\u1EC7u'
    }
  },
  switch: {
    open: 'm\u1EDF',
    close: '\u0111\xF3ng'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/zh_CN.js
/* harmony default export */ var locale_zh_CN = ({
  moneySymbol: '\uFFE5',
  deleteThisLine: '\u5220\u9664\u6B64\u884C',
  copyThisLine: '\u590D\u5236\u6B64\u884C',
  form: {
    lightFilter: {
      more: '\u66F4\u591A\u7B5B\u9009',
      clear: '\u6E05\u9664',
      confirm: '\u786E\u8BA4',
      itemUnit: '\u9879'
    }
  },
  tableForm: {
    search: '\u67E5\u8BE2',
    reset: '\u91CD\u7F6E',
    submit: '\u63D0\u4EA4',
    collapsed: '\u5C55\u5F00',
    expand: '\u6536\u8D77',
    inputPlaceholder: '\u8BF7\u8F93\u5165',
    selectPlaceholder: '\u8BF7\u9009\u62E9'
  },
  alert: {
    clear: '\u53D6\u6D88\u9009\u62E9',
    selected: '\u5DF2\u9009\u62E9',
    item: '\u9879'
  },
  pagination: {
    total: {
      range: '\u7B2C',
      total: '\u6761/\u603B\u5171',
      item: '\u6761'
    }
  },
  tableToolBar: {
    leftPin: '\u56FA\u5B9A\u5728\u5217\u9996',
    rightPin: '\u56FA\u5B9A\u5728\u5217\u5C3E',
    noPin: '\u4E0D\u56FA\u5B9A',
    leftFixedTitle: '\u56FA\u5B9A\u5728\u5DE6\u4FA7',
    rightFixedTitle: '\u56FA\u5B9A\u5728\u53F3\u4FA7',
    noFixedTitle: '\u4E0D\u56FA\u5B9A',
    reset: '\u91CD\u7F6E',
    columnDisplay: '\u5217\u5C55\u793A',
    columnSetting: '\u5217\u8BBE\u7F6E',
    fullScreen: '\u5168\u5C4F',
    exitFullScreen: '\u9000\u51FA\u5168\u5C4F',
    reload: '\u5237\u65B0',
    density: '\u5BC6\u5EA6',
    densityDefault: '\u6B63\u5E38',
    densityLarger: '\u9ED8\u8BA4',
    densityMiddle: '\u4E2D\u7B49',
    densitySmall: '\u7D27\u51D1'
  },
  stepsForm: {
    next: '\u4E0B\u4E00\u6B65',
    prev: '\u4E0A\u4E00\u6B65',
    submit: '\u63D0\u4EA4'
  },
  loginForm: {
    submitText: '\u767B\u5F55'
  },
  editableTable: {
    onlyOneLineEditor: '\u53EA\u80FD\u540C\u65F6\u7F16\u8F91\u4E00\u884C',
    action: {
      save: '\u4FDD\u5B58',
      cancel: '\u53D6\u6D88',
      delete: '\u5220\u9664',
      add: '\u6DFB\u52A0\u4E00\u884C\u6570\u636E'
    }
  },
  switch: {
    open: '\u6253\u5F00',
    close: '\u5173\u95ED'
  }
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/locale/zh_TW.js
/* harmony default export */ var zh_TW = ({
  moneySymbol: 'NT$',
  deleteThisLine: '\u522A\u9664\u6B64\u884C',
  copyThisLine: '\u8907\u88FD\u6B64\u884C',
  form: {
    lightFilter: {
      more: '\u66F4\u591A\u7BE9\u9078',
      clear: '\u6E05\u9664',
      confirm: '\u78BA\u8A8D',
      itemUnit: '\u9805'
    }
  },
  tableForm: {
    search: '\u67E5\u8A62',
    reset: '\u91CD\u7F6E',
    submit: '\u63D0\u4EA4',
    collapsed: '\u5C55\u958B',
    expand: '\u6536\u8D77',
    inputPlaceholder: '\u8ACB\u8F38\u5165',
    selectPlaceholder: '\u8ACB\u9078\u64C7'
  },
  alert: {
    clear: '\u53D6\u6D88\u9078\u64C7',
    selected: '\u5DF2\u9078\u64C7',
    item: '\u9805'
  },
  pagination: {
    total: {
      range: '\u7B2C',
      total: '\u689D/\u7E3D\u5171',
      item: '\u689D'
    }
  },
  tableToolBar: {
    leftPin: '\u56FA\u5B9A\u5230\u5DE6\u908A',
    rightPin: '\u56FA\u5B9A\u5230\u53F3\u908A',
    noPin: '\u4E0D\u56FA\u5B9A',
    leftFixedTitle: '\u56FA\u5B9A\u5728\u5DE6\u5074',
    rightFixedTitle: '\u56FA\u5B9A\u5728\u53F3\u5074',
    noFixedTitle: '\u4E0D\u56FA\u5B9A',
    reset: '\u91CD\u7F6E',
    columnDisplay: '\u5217\u5C55\u793A',
    columnSetting: '\u5217\u8A2D\u7F6E',
    fullScreen: '\u5168\u5C4F',
    exitFullScreen: '\u9000\u51FA\u5168\u5C4F',
    reload: '\u5237\u65B0',
    density: '\u5BC6\u5EA6',
    densityDefault: '\u6B63\u5E38',
    densityLarger: '\u9ED8\u8A8D',
    densityMiddle: '\u4E2D\u7B49',
    densitySmall: '\u7DCA\u6E4A'
  },
  stepsForm: {
    next: '\u4E0B\u4E00\u6B65',
    prev: '\u4E0A\u4E00\u6B65',
    submit: '\u5B8C\u6210'
  },
  loginForm: {
    submitText: '\u767B\u5165'
  },
  editableTable: {
    onlyOneLineEditor: '\u53EA\u80FD\u540C\u6642\u7DE8\u8F2F\u4E00\u884C',
    action: {
      save: '\u4FDD\u5B58',
      cancel: '\u53D6\u6D88',
      delete: '\u522A\u9664',
      add: '\u65B0\u589E\u4E00\u884C\u8CC7\u6599'
    }
  },
  switch: {
    open: '\u6253\u958B',
    close: '\u95DC\u9589'
  }
});
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-provider/es/useStyle/index.js
var useStyle = __webpack_require__(98082);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/typing/layoutToken.js


var getLayoutDesignToken = function getLayoutDesignToken(designTokens, antdToken) {
  var _finalDesignTokens$si, _finalDesignTokens$pa, _finalDesignTokens$pa2;
  var finalDesignTokens = (0,objectSpread2/* default */.Z)({}, designTokens);
  return (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({
    bgLayout: "linear-gradient(".concat(antdToken.colorBgContainer, ", ").concat(antdToken.colorBgLayout, " 28%)"),
    colorTextAppListIcon: antdToken.colorTextSecondary,
    appListIconHoverBgColor: finalDesignTokens === null || finalDesignTokens === void 0 ? void 0 : (_finalDesignTokens$si = finalDesignTokens.sider) === null || _finalDesignTokens$si === void 0 ? void 0 : _finalDesignTokens$si.colorBgMenuItemSelected,
    colorBgAppListIconHover: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.04),
    colorTextAppListIconHover: antdToken.colorTextBase
  }, finalDesignTokens), {}, {
    header: (0,objectSpread2/* default */.Z)({
      colorBgHeader: (0,useStyle/* setAlpha */.uK)(antdToken.colorBgElevated, 0.6),
      colorHeaderTitle: antdToken.colorText,
      colorBgMenuItemHover: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.03),
      colorBgMenuItemSelected: 'transparent',
      colorTextMenuSelected: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.95),
      colorBgRightActionsItemHover: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.03),
      colorTextRightActionsItem: antdToken.colorTextTertiary,
      heightLayoutHeader: 56,
      colorTextMenu: antdToken.colorTextSecondary,
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextMenuActive: antdToken.colorText
    }, finalDesignTokens.header),
    sider: (0,objectSpread2/* default */.Z)({
      paddingInlineLayoutMenu: 8,
      paddingBlockLayoutMenu: 0,
      colorBgCollapsedButton: antdToken.colorBgElevated,
      colorTextCollapsedButtonHover: antdToken.colorTextSecondary,
      colorTextCollapsedButton: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.25),
      colorMenuBackground: 'transparent',
      colorBgMenuItemCollapsedHover: 'rgba(90, 75, 75, 0.03)',
      colorBgMenuItemCollapsedSelected: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.04),
      colorMenuItemDivider: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.06),
      colorBgMenuItemHover: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.03),
      colorBgMenuItemSelected: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.04),
      colorTextMenuItemHover: antdToken.colorText,
      colorTextMenuSelected: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.95),
      colorTextMenuActive: antdToken.colorText,
      colorTextMenu: antdToken.colorTextSecondary,
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextSubMenuSelected: (0,useStyle/* setAlpha */.uK)(antdToken.colorTextBase, 0.95)
    }, finalDesignTokens.sider),
    pageContainer: (0,objectSpread2/* default */.Z)({
      colorBgPageContainer: 'transparent',
      paddingInlinePageContainerContent: ((_finalDesignTokens$pa = finalDesignTokens.pageContainer) === null || _finalDesignTokens$pa === void 0 ? void 0 : _finalDesignTokens$pa.marginInlinePageContainerContent) || 40,
      paddingBlockPageContainerContent: ((_finalDesignTokens$pa2 = finalDesignTokens.pageContainer) === null || _finalDesignTokens$pa2 === void 0 ? void 0 : _finalDesignTokens$pa2.marginBlockPageContainerContent) || 24,
      colorBgPageContainerFixed: '#fff'
    }, finalDesignTokens.pageContainer)
  });
};
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-provider/es/useStyle/token.js
var useStyle_token = __webpack_require__(67804);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(71002);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/utils/merge.js


var merge = function merge() {
  var obj = {};
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }
  var il = rest.length;
  var key;
  var i = 0;
  for (; i < il; i += 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (key in rest[i]) {
      if (rest[i].hasOwnProperty(key)) {
        if ((0,esm_typeof/* default */.Z)(obj[key]) === 'object' && (0,esm_typeof/* default */.Z)(rest[i][key]) === 'object' && obj[key] !== undefined && obj[key] !== null && !Array.isArray(obj[key]) && !Array.isArray(rest[i][key])) {
          obj[key] = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, obj[key]), rest[i][key]);
        } else {
          obj[key] = rest[i][key];
        }
      }
    }
  }
  return obj;
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-provider/es/index.js





var _excluded = ["locale", "getPrefixCls"],
  _excluded2 = ["locale", "theme"];


































/**
 * \u5B89\u5168\u7684\u4ECE\u4E00\u4E2A\u5BF9\u8C61\u4E2D\u8BFB\u53D6\u76F8\u5E94\u7684\u503C
 * @param source
 * @param path
 * @param defaultValue
 * @returns
 */
function get(source, path, defaultValue) {
  // a[3].b -> a.3.b
  var paths = path.replace(/\\[(\\d+)\\]/g, '.$1').split('.');
  var result = source;
  var message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  var _iterator = (0,createForOfIteratorHelper/* default */.Z)(paths),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var p = _step.value;
      message = Object(result)[p];
      result = Object(result)[p];
      if (message === undefined) {
        return defaultValue;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return message;
}
/**
 * \u521B\u5EFA\u4E00\u4E2A\u56FD\u9645\u5316\u7684\u64CD\u4F5C\u51FD\u6570
 *
 * @param locale
 * @param localeMap
 */
var createIntl = function createIntl(locale, localeMap) {
  return {
    getMessage: function getMessage(id, defaultMessage) {
      return get(localeMap, id, defaultMessage) || defaultMessage;
    },
    locale: locale
  };
};
var mnMNIntl = createIntl('mn_MN', mn_MN);
var arEGIntl = createIntl('ar_EG', ar_EG);
var zhCNIntl = createIntl('zh_CN', locale_zh_CN);
var enUSIntl = createIntl('en_US', en_US);
var enGBIntl = createIntl('en_GB', en_GB);
var viVNIntl = createIntl('vi_VN', vi_VN);
var itITIntl = createIntl('it_IT', it_IT);
var jaJPIntl = createIntl('ja_JP', ja_JP);
var esESIntl = createIntl('es_ES', es_ES);
var caESIntl = createIntl('ca_ES', ca_ES);
var ruRUIntl = createIntl('ru_RU', ru_RU);
var srRSIntl = createIntl('sr_RS', sr_RS);
var msMYIntl = createIntl('ms_MY', ms_MY);
var zhTWIntl = createIntl('zh_TW', zh_TW);
var frFRIntl = createIntl('fr_FR', fr_FR);
var ptBRIntl = createIntl('pt_BR', pt_BR);
var koKRIntl = createIntl('ko_KR', ko_KR);
var idIDIntl = createIntl('id_ID', id_ID);
var deDEIntl = createIntl('de_DE', de_DE);
var faIRIntl = createIntl('fa_IR', fa_IR);
var trTRIntl = createIntl('tr_TR', tr_TR);
var plPLIntl = createIntl('pl_PL', pl_PL);
var hrHRIntl = createIntl('hr_', hr_HR);
var intlMap = {
  'mn-MN': mnMNIntl,
  'ar-EG': arEGIntl,
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'en-GB': enGBIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'ja-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ca-ES': caESIntl,
  'ru-RU': ruRUIntl,
  'sr-RS': srRSIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
  'fr-FR': frFRIntl,
  'pt-BR': ptBRIntl,
  'ko-KR': koKRIntl,
  'id-ID': idIDIntl,
  'de-DE': deDEIntl,
  'fa-IR': faIRIntl,
  'tr-TR': trTRIntl,
  'pl-PL': plPLIntl,
  'hr-HR': hrHRIntl
};
var intlMapKeys = Object.keys(intlMap);

/* Creating a context object with the default values. */
var ProConfigContext = /*#__PURE__*/react.createContext({
  intl: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, zhCNIntl), {}, {
    locale: 'default'
  }),
  valueTypeMap: {},
  theme: useStyle_token.emptyTheme,
  hashed: true,
  dark: false,
  token: useStyle_token.defaultToken
});
var ConfigConsumer = ProConfigContext.Consumer;
/**
 * \u6839\u636E antd \u7684 key \u6765\u627E\u5230\u7684 locale \u63D2\u4EF6\u7684 key
 *
 * @param localeKey
 */

var findIntlKeyByAntdLocaleKey = function findIntlKeyByAntdLocaleKey(localeKey) {
  if (!localeKey) {
    return 'zh-CN';
  }
  var localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find(function (intlKey) {
    var LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  });
};
/**
 * \u7EC4\u4EF6\u89E3\u9664\u6302\u8F7D\u540E\u6E05\u7A7A\u4E00\u4E0B cache
 * @date 2022-11-28
 * @returns null
 */
var CacheClean = function CacheClean() {
  var _useSWRConfig = (0,dist/* useSWRConfig */.kY)(),
    cache = _useSWRConfig.cache;
  (0,react.useEffect)(function () {
    return function () {
      // is a map
      // @ts-ignore
      cache.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
var ConfigProVidContainer = function ConfigProVidContainer(props) {
  var _proTheme$useToken;
  var children = props.children,
    dark = props.dark,
    valueTypeMap = props.valueTypeMap,
    _props$autoClearCache = props.autoClearCache,
    autoClearCache = _props$autoClearCache === void 0 ? false : _props$autoClearCache,
    propsToken = props.token,
    prefixCls = props.prefixCls;
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    locale = _useContext.locale,
    getPrefixCls = _useContext.getPrefixCls,
    restConfig = (0,objectWithoutProperties/* default */.Z)(_useContext, _excluded);
  var tokenContext = (_proTheme$useToken = useStyle/* proTheme.useToken */.Ow.useToken) === null || _proTheme$useToken === void 0 ? void 0 : _proTheme$useToken.call(useStyle/* proTheme */.Ow);
  var containerDomRef = (0,react.useRef)(null);
  var proProvide = (0,react.useContext)(ProConfigContext);
  /**
   * pro \u7684 \u7C7B
   * @type {string}
   * @example .ant-pro
   */
  var proComponentsCls = prefixCls ? ".".concat(prefixCls) : ".".concat(getPrefixCls(), "-pro");
  var antCls = '.' + getPrefixCls();
  var salt = "".concat(proComponentsCls);
  /**
   * \u5408\u5E76\u4E00\u4E0Btoken\uFF0C\u4E0D\u7136\u5BFC\u81F4\u5D4C\u5957 token \u5931\u6548
   */
  var proLayoutTokenMerge = (0,react.useMemo)(function () {
    return getLayoutDesignToken(propsToken || {}, tokenContext.token || useStyle_token.defaultToken);
  }, [propsToken, tokenContext.token]);
  var proProvideValue = (0,react.useMemo)(function () {
    var _proProvide$intl;
    var localeName = locale === null || locale === void 0 ? void 0 : locale.locale;
    var key = findIntlKeyByAntdLocaleKey(localeName);
    // antd \u7684 key \u5B58\u5728\u7684\u65F6\u5019\u4EE5 antd \u7684\u4E3A\u4E3B
    var intl = localeName && ((_proProvide$intl = proProvide.intl) === null || _proProvide$intl === void 0 ? void 0 : _proProvide$intl.locale) === 'default' ? intlMap[key] : proProvide.intl || intlMap[key];
    return (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, proProvide), {}, {
      dark: dark !== null && dark !== void 0 ? dark : proProvide.dark,
      token: merge(proProvide.token, tokenContext.token, {
        proComponentsCls: proComponentsCls,
        antCls: antCls,
        themeId: tokenContext.theme.id,
        layout: proLayoutTokenMerge
      }),
      intl: intl || zhCNIntl
    });
  }, [locale === null || locale === void 0 ? void 0 : locale.locale, proProvide, dark, tokenContext.token, tokenContext.theme.id, proComponentsCls, antCls, proLayoutTokenMerge]);
  var finalToken = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, proProvideValue.token || {}), {}, {
    proComponentsCls: proComponentsCls
  });
  var _useCacheToken = (0,es/* useCacheToken */.fp)(tokenContext.theme, [tokenContext.token, finalToken !== null && finalToken !== void 0 ? finalToken : {}], {
      salt: salt
    }),
    _useCacheToken2 = (0,slicedToArray/* default */.Z)(_useCacheToken, 2),
    token = _useCacheToken2[0],
    nativeHashId = _useCacheToken2[1];
  var hashId = (0,react.useMemo)(function () {
    var _process$env$NODE_ENV;
    if (props.hashed === false) {
      return '';
    }
    if (proProvide.hashed === false) return '';
    if (((_process$env$NODE_ENV = "production") === null || _process$env$NODE_ENV === void 0 ? void 0 : _process$env$NODE_ENV.toLowerCase()) !== 'test') return nativeHashId;
    return '';
  }, [nativeHashId, proProvide.hashed, props.hashed]);
  var configProviderDom = (0,react.useMemo)(function () {
    var _process$env$NODE_ENV2;
    var themeConfig = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, restConfig.theme), {}, {
      hashId: hashId,
      hashed: ((_process$env$NODE_ENV2 = "production") === null || _process$env$NODE_ENV2 === void 0 ? void 0 : _process$env$NODE_ENV2.toLowerCase()) !== 'test' && props.hashed !== false && proProvide.hashed !== false
    });
    var provide = (0,jsx_runtime.jsx)(config_provider/* default */.ZP, (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, restConfig), {}, {
      theme: (0,objectSpread2/* default */.Z)({}, themeConfig),
      children: (0,jsx_runtime.jsx)(ProConfigContext.Provider, {
        value: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, proProvideValue), {}, {
          valueTypeMap: valueTypeMap || (proProvideValue === null || proProvideValue === void 0 ? void 0 : proProvideValue.valueTypeMap),
          token: token,
          containerDomRef: containerDomRef,
          theme: tokenContext.theme,
          hashed: props.hashed,
          hashId: hashId
        }),
        children: (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
          children: [autoClearCache && (0,jsx_runtime.jsx)(CacheClean, {}), children]
        })
      })
    }));
    return (0,jsx_runtime.jsx)("div", {
      ref: containerDomRef,
      className: "".concat(prefixCls || (getPrefixCls === null || getPrefixCls === void 0 ? void 0 : getPrefixCls('pro')) || 'ant-pro').concat(hashId ? ' ' + hashId : ''),
      children: provide
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoClearCache, children, getPrefixCls, hashId, locale, proProvideValue, token]);
  if (!autoClearCache) return configProviderDom;
  return (0,jsx_runtime.jsx)(dist/* SWRConfig */.J$, {
    value: {
      provider: function provider() {
        return new Map();
      }
    },
    children: configProviderDom
  });
};
var ProConfigProvider = function ProConfigProvider(props) {
  var needDeps = props.needDeps,
    dark = props.dark,
    token = props.token;
  var proProvide = (0,react.useContext)(ProConfigContext);
  var _useContext2 = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    locale = _useContext2.locale,
    theme = _useContext2.theme,
    rest = (0,objectWithoutProperties/* default */.Z)(_useContext2, _excluded2);
  // \u662F\u4E0D\u662F\u4E0D\u9700\u8981\u6E32\u67D3 provide
  var isNullProvide = needDeps && proProvide.hashId !== undefined && Object.keys(props).sort().join('-') === 'children-needDeps';
  if (isNullProvide) return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: props.children
  });
  var mergeAlgorithm = function mergeAlgorithm() {
    var isDark = dark !== null && dark !== void 0 ? dark : proProvide.dark;
    if (isDark && !Array.isArray(theme === null || theme === void 0 ? void 0 : theme.algorithm)) {
      return [useStyle/* proTheme.darkAlgorithm */.Ow.darkAlgorithm, theme === null || theme === void 0 ? void 0 : theme.algorithm].filter(Boolean);
    }
    if (isDark && Array.isArray(theme === null || theme === void 0 ? void 0 : theme.algorithm)) {
      return [useStyle/* proTheme.darkAlgorithm */.Ow.darkAlgorithm].concat((0,toConsumableArray/* default */.Z)((theme === null || theme === void 0 ? void 0 : theme.algorithm) || [])).filter(Boolean);
    }
    return theme === null || theme === void 0 ? void 0 : theme.algorithm;
  };
  // \u81EA\u52A8\u6CE8\u5165 antd \u7684\u914D\u7F6E
  var configProvider = (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, rest), {}, {
    locale: locale || zh_CN/* default */.Z,
    theme: (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, theme), {}, {
      algorithm: mergeAlgorithm()
    })
  });
  return (0,jsx_runtime.jsx)(config_provider/* default */.ZP, (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, configProvider), {}, {
    children: (0,jsx_runtime.jsx)(ConfigProVidContainer, (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, props), {}, {
      token: token
    }))
  }));
};
/**
 * It returns the intl object from the context if it exists, otherwise it returns the intl object for
 * the current locale
 * @returns The return value of the function is the intl object.
 */
function useIntl() {
  var _useContext3 = useContext(AntdConfigProvider.ConfigContext),
    locale = _useContext3.locale;
  var _useContext4 = useContext(ProConfigContext),
    intl = _useContext4.intl;
  if (intl && intl.locale !== 'default') {
    return intl || zhCNIntl;
  }
  if (locale === null || locale === void 0 ? void 0 : locale.locale) {
    return intlMap[findIntlKeyByAntdLocaleKey(locale.locale)] || zhCNIntl;
  }
  return zhCNIntl;
}
var ProProvider = ProConfigContext;
ProProvider.displayName = 'ProProvider';

/* harmony default export */ var pro_provider_es = ((/* unused pure expression or super */ null && (ProConfigContext)));

//# sourceURL=webpack:///./node_modules/@ant-design/pro-provider/es/index.js_+_25_modules?`)},98082:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nd": function() { return /* binding */ operationUnit; },
/* harmony export */   "Ow": function() { return /* binding */ proTheme; },
/* harmony export */   "Wf": function() { return /* binding */ resetComponent; },
/* harmony export */   "Xj": function() { return /* binding */ useStyle; },
/* harmony export */   "uK": function() { return /* binding */ setAlpha; }
/* harmony export */ });
/* unused harmony exports lighten, useToken */
/* harmony import */ var _ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65178);
/* harmony import */ var _ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10274);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92195);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58720);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(73964);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67804);







/**
 * \u628A\u4E00\u4E2A\u989C\u8272\u8BBE\u7F6E\u4E00\u4E0B\u900F\u660E\u5EA6
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {0-1}
 * @returns rgba {string}
 */
var setAlpha = function setAlpha(baseColor, alpha) {
  return new _ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_2__/* .TinyColor */ .C(baseColor).setAlpha(alpha).toRgbString();
};
/**
 * \u628A\u4E00\u4E2A\u989C\u8272\u4FEE\u6539\u4E00\u4E9B\u660E\u5EA6
 * @example (#000, 50) => #808080
 * @param baseColor {string}
 * @param brightness {0-100}
 * @returns hexColor {string}
 */
var lighten = function lighten(baseColor, brightness) {
  var instance = new TinyColor(baseColor);
  return instance.lighten(brightness).toHexString();
};
var genTheme = function genTheme() {
  if (typeof antd__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z === 'undefined' || !antd__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z) return _token__WEBPACK_IMPORTED_MODULE_4__;
  return antd__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z;
};
var proTheme = genTheme();
var useToken = proTheme.useToken;
var resetComponent = function resetComponent(token) {
  return {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    listStyle: 'none'
  };
};
var operationUnit = function operationUnit(token) {
  return {
    // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
    // And Typography use this to generate link style which should not do this.
    color: token.colorLink,
    outline: 'none',
    cursor: 'pointer',
    transition: "color ".concat(token.motionDurationSlow),
    '&:focus, &:hover': {
      color: token.colorLinkHover
    },
    '&:active': {
      color: token.colorLinkActive
    }
  };
};
/**
 * \u5C01\u88C5\u4E86\u4E00\u4E0B antd \u7684 useStyle\uFF0C\u652F\u6301\u4E86\u4E00\u4E0Bantd@4
 * @param componentName {string} \u7EC4\u4EF6\u7684\u540D\u5B57
 * @param styleFn {GenerateStyle} \u751F\u6210\u6837\u5F0F\u7684\u51FD\u6570
 * @returns {UseStyleResult}
 */
function useStyle(componentName, styleFn) {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_index__WEBPACK_IMPORTED_MODULE_5__/* .ProProvider */ .L_),
    _useContext$token = _useContext.token,
    token = _useContext$token === void 0 ? {} : _useContext$token,
    _useContext$hashId = _useContext.hashId,
    hashId = _useContext$hashId === void 0 ? '' : _useContext$hashId,
    theme = _useContext.theme;
  var _useContext2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(antd__WEBPACK_IMPORTED_MODULE_6__/* ["default"].ConfigContext */ .ZP.ConfigContext),
    getPrefixCls = _useContext2.getPrefixCls;
  token.antCls = ".".concat(getPrefixCls());
  return {
    wrapSSR: (0,_ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__/* .useStyleRegister */ .xy)({
      theme: theme,
      token: token,
      hashId: hashId,
      path: [componentName]
    }, function () {
      return styleFn(token);
    }),
    hashId: hashId
  };
}

//# sourceURL=webpack:///./node_modules/@ant-design/pro-provider/es/useStyle/index.js?`)},67804:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compactAlgorithm": function() { return /* binding */ compactAlgorithm; },
/* harmony export */   "darkAlgorithm": function() { return /* binding */ darkAlgorithm; },
/* harmony export */   "defaultAlgorithm": function() { return /* binding */ defaultAlgorithm; },
/* harmony export */   "defaultToken": function() { return /* binding */ defaultToken; },
/* harmony export */   "emptyTheme": function() { return /* binding */ emptyTheme; },
/* harmony export */   "hashCode": function() { return /* binding */ hashCode; },
/* harmony export */   "token": function() { return /* binding */ token; },
/* harmony export */   "useToken": function() { return /* binding */ useToken; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1413);
/* harmony import */ var _ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65178);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92195);

var _theme$defaultAlgorit;


var defaultToken = {
  blue: '#1677ff',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#F5222D',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff7875',
  colorInfo: '#1677ff',
  colorTextBase: '#000',
  colorBgBase: '#fff',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontSize: 14,
  lineWidth: 1,
  lineType: 'solid',
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  motionEaseInQuint: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  borderRadius: 4,
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  controlHeight: 32,
  zIndexBase: 0,
  zIndexPopupBase: 1000,
  opacityImage: 1,
  wireframe: false,
  'blue-1': '#e6f4ff',
  'blue-2': '#bae0ff',
  'blue-3': '#91caff',
  'blue-4': '#69b1ff',
  'blue-5': '#4096ff',
  'blue-6': '#1677ff',
  'blue-7': '#0958d9',
  'blue-8': '#003eb3',
  'blue-9': '#002c8c',
  'blue-10': '#001d66',
  'purple-1': '#f9f0ff',
  'purple-2': '#efdbff',
  'purple-3': '#d3adf7',
  'purple-4': '#b37feb',
  'purple-5': '#9254de',
  'purple-6': '#722ed1',
  'purple-7': '#531dab',
  'purple-8': '#391085',
  'purple-9': '#22075e',
  'purple-10': '#120338',
  'cyan-1': '#e6fffb',
  'cyan-2': '#b5f5ec',
  'cyan-3': '#87e8de',
  'cyan-4': '#5cdbd3',
  'cyan-5': '#36cfc9',
  'cyan-6': '#13c2c2',
  'cyan-7': '#08979c',
  'cyan-8': '#006d75',
  'cyan-9': '#00474f',
  'cyan-10': '#002329',
  'green-1': '#f6ffed',
  'green-2': '#d9f7be',
  'green-3': '#b7eb8f',
  'green-4': '#95de64',
  'green-5': '#73d13d',
  'green-6': '#52c41a',
  'green-7': '#389e0d',
  'green-8': '#237804',
  'green-9': '#135200',
  'green-10': '#092b00',
  'magenta-1': '#fff0f6',
  'magenta-2': '#ffd6e7',
  'magenta-3': '#ffadd2',
  'magenta-4': '#ff85c0',
  'magenta-5': '#f759ab',
  'magenta-6': '#eb2f96',
  'magenta-7': '#c41d7f',
  'magenta-8': '#9e1068',
  'magenta-9': '#780650',
  'magenta-10': '#520339',
  'pink-1': '#fff0f6',
  'pink-2': '#ffd6e7',
  'pink-3': '#ffadd2',
  'pink-4': '#ff85c0',
  'pink-5': '#f759ab',
  'pink-6': '#eb2f96',
  'pink-7': '#c41d7f',
  'pink-8': '#9e1068',
  'pink-9': '#780650',
  'pink-10': '#520339',
  'red-1': '#fff1f0',
  'red-2': '#ffccc7',
  'red-3': '#ffa39e',
  'red-4': '#ff7875',
  'red-5': '#ff4d4f',
  'red-6': '#f5222d',
  'red-7': '#cf1322',
  'red-8': '#a8071a',
  'red-9': '#820014',
  'red-10': '#5c0011',
  'orange-1': '#fff7e6',
  'orange-2': '#ffe7ba',
  'orange-3': '#ffd591',
  'orange-4': '#ffc069',
  'orange-5': '#ffa940',
  'orange-6': '#fa8c16',
  'orange-7': '#d46b08',
  'orange-8': '#ad4e00',
  'orange-9': '#873800',
  'orange-10': '#612500',
  'yellow-1': '#feffe6',
  'yellow-2': '#ffffb8',
  'yellow-3': '#fffb8f',
  'yellow-4': '#fff566',
  'yellow-5': '#ffec3d',
  'yellow-6': '#fadb14',
  'yellow-7': '#d4b106',
  'yellow-8': '#ad8b00',
  'yellow-9': '#876800',
  'yellow-10': '#614700',
  'volcano-1': '#fff2e8',
  'volcano-2': '#ffd8bf',
  'volcano-3': '#ffbb96',
  'volcano-4': '#ff9c6e',
  'volcano-5': '#ff7a45',
  'volcano-6': '#fa541c',
  'volcano-7': '#d4380d',
  'volcano-8': '#ad2102',
  'volcano-9': '#871400',
  'volcano-10': '#610b00',
  'geekblue-1': '#f0f5ff',
  'geekblue-2': '#d6e4ff',
  'geekblue-3': '#adc6ff',
  'geekblue-4': '#85a5ff',
  'geekblue-5': '#597ef7',
  'geekblue-6': '#2f54eb',
  'geekblue-7': '#1d39c4',
  'geekblue-8': '#10239e',
  'geekblue-9': '#061178',
  'geekblue-10': '#030852',
  'gold-1': '#fffbe6',
  'gold-2': '#fff1b8',
  'gold-3': '#ffe58f',
  'gold-4': '#ffd666',
  'gold-5': '#ffc53d',
  'gold-6': '#faad14',
  'gold-7': '#d48806',
  'gold-8': '#ad6800',
  'gold-9': '#874d00',
  'gold-10': '#613400',
  'lime-1': '#fcffe6',
  'lime-2': '#f4ffb8',
  'lime-3': '#eaff8f',
  'lime-4': '#d3f261',
  'lime-5': '#bae637',
  'lime-6': '#a0d911',
  'lime-7': '#7cb305',
  'lime-8': '#5b8c00',
  'lime-9': '#3f6600',
  'lime-10': '#254000',
  colorText: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
  colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
  colorFill: 'rgba(0, 0, 0, 0.15)',
  colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
  colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
  colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',
  colorBgLayout: '#f5f5f5',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
  colorBorder: '#d9d9d9',
  colorBorderSecondary: '#f0f0f0',
  colorPrimaryBg: '#e6f4ff',
  colorPrimaryBgHover: '#bae0ff',
  colorPrimaryBorder: '#91caff',
  colorPrimaryBorderHover: '#69b1ff',
  colorPrimaryHover: '#4096ff',
  colorPrimaryActive: '#0958d9',
  colorPrimaryTextHover: '#4096ff',
  colorPrimaryText: '#1677ff',
  colorPrimaryTextActive: '#0958d9',
  colorSuccessBg: '#f6ffed',
  colorSuccessBgHover: '#d9f7be',
  colorSuccessBorder: '#b7eb8f',
  colorSuccessBorderHover: '#95de64',
  colorSuccessHover: '#95de64',
  colorSuccessActive: '#389e0d',
  colorSuccessTextHover: '#73d13d',
  colorSuccessText: '#52c41a',
  colorSuccessTextActive: '#389e0d',
  colorErrorBg: '#fff2f0',
  colorErrorBgHover: '#fff1f0',
  colorErrorBorder: '#ffccc7',
  colorErrorBorderHover: '#ffa39e',
  colorErrorHover: '#ffa39e',
  colorErrorActive: '#d9363e',
  colorErrorTextHover: '#ff7875',
  colorErrorText: '#ff4d4f',
  colorErrorTextActive: '#d9363e',
  colorWarningBg: '#fffbe6',
  colorWarningBgHover: '#fff1b8',
  colorWarningBorder: '#ffe58f',
  colorWarningBorderHover: '#ffd666',
  colorWarningHover: '#ffd666',
  colorWarningActive: '#d48806',
  colorWarningTextHover: '#ffc53d',
  colorWarningText: '#faad14',
  colorWarningTextActive: '#d48806',
  colorInfoBg: '#e6f4ff',
  colorInfoBgHover: '#bae0ff',
  colorInfoBorder: '#91caff',
  colorInfoBorderHover: '#69b1ff',
  colorInfoHover: '#69b1ff',
  colorInfoActive: '#0958d9',
  colorInfoTextHover: '#4096ff',
  colorInfoText: '#1677ff',
  colorInfoTextActive: '#0958d9',
  colorBgMask: 'rgba(0, 0, 0, 0.45)',
  colorWhite: '#fff',
  sizeXXL: 48,
  sizeXL: 32,
  sizeLG: 24,
  sizeMD: 20,
  sizeMS: 16,
  size: 16,
  sizeSM: 12,
  sizeXS: 8,
  sizeXXS: 4,
  controlHeightSM: 24,
  controlHeightXS: 16,
  controlHeightLG: 40,
  motionDurationFast: '0.1s',
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',
  fontSizes: [12, 14, 16, 20, 24, 30, 38, 46, 56, 68],
  lineHeights: [1.6666666666666667, 1.5714285714285714, 1.5, 1.4, 1.3333333333333333, 1.2666666666666666, 1.2105263157894737, 1.173913043478261, 1.1428571428571428, 1.1176470588235294],
  lineWidthBold: 2,
  borderRadiusXS: 1,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  borderRadiusOuter: 4,
  colorLink: '#1677ff',
  colorLinkHover: '#69b1ff',
  colorLinkActive: '#0958d9',
  colorFillContent: 'rgba(0, 0, 0, 0.06)',
  colorFillContentHover: 'rgba(0, 0, 0, 0.15)',
  colorFillAlter: 'rgba(0, 0, 0, 0.02)',
  colorBgContainerDisabled: 'rgba(0, 0, 0, 0.04)',
  colorBorderBg: '#ffffff',
  colorSplit: 'rgba(5, 5, 5, 0.06)',
  colorTextPlaceholder: 'rgba(0, 0, 0, 0.25)',
  colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
  colorTextHeading: 'rgba(0, 0, 0, 0.88)',
  colorTextLabel: 'rgba(0, 0, 0, 0.65)',
  colorTextDescription: 'rgba(0, 0, 0, 0.45)',
  colorTextLightSolid: '#fff',
  colorHighlight: '#ff7875',
  colorBgTextHover: 'rgba(0, 0, 0, 0.06)',
  colorBgTextActive: 'rgba(0, 0, 0, 0.15)',
  colorIcon: 'rgba(0, 0, 0, 0.45)',
  colorIconHover: 'rgba(0, 0, 0, 0.88)',
  colorErrorOutline: 'rgba(255, 38, 5, 0.06)',
  colorWarningOutline: 'rgba(255, 215, 5, 0.1)',
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,
  fontSizeIcon: 12,
  lineHeight: 1.5714285714285714,
  lineHeightLG: 1.5,
  lineHeightSM: 1.6666666666666667,
  lineHeightHeading1: 1.2105263157894737,
  lineHeightHeading2: 1.2666666666666666,
  lineHeightHeading3: 1.3333333333333333,
  lineHeightHeading4: 1.4,
  lineHeightHeading5: 1.5,
  controlOutlineWidth: 2,
  controlInteractiveSize: 16,
  controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
  controlItemBgActive: '#e6f4ff',
  controlItemBgActiveHover: '#bae0ff',
  controlItemBgActiveDisabled: 'rgba(0, 0, 0, 0.15)',
  controlTmpOutline: 'rgba(0, 0, 0, 0.02)',
  controlOutline: 'rgba(5, 145, 255, 0.1)',
  fontWeightStrong: 600,
  opacityLoading: 0.65,
  linkDecoration: 'none',
  linkHoverDecoration: 'none',
  linkFocusDecoration: 'none',
  controlPaddingHorizontal: 12,
  controlPaddingHorizontalSM: 8,
  paddingXXS: 4,
  paddingXS: 8,
  paddingSM: 12,
  padding: 16,
  paddingMD: 20,
  paddingLG: 24,
  paddingXL: 32,
  paddingContentHorizontalLG: 24,
  paddingContentVerticalLG: 16,
  paddingContentHorizontal: 16,
  paddingContentVertical: 12,
  paddingContentHorizontalSM: 16,
  paddingContentVerticalSM: 8,
  marginXXS: 4,
  marginXS: 8,
  marginSM: 12,
  margin: 16,
  marginMD: 20,
  marginLG: 24,
  marginXL: 32,
  marginXXL: 48,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  screenXS: 480,
  screenXSMin: 480,
  screenXSMax: 479,
  screenSM: 576,
  screenSMMin: 576,
  screenSMMax: 575,
  screenMD: 768,
  screenMDMin: 768,
  screenMDMax: 767,
  screenLG: 992,
  screenLGMin: 992,
  screenLGMax: 991,
  screenXL: 1200,
  screenXLMin: 1200,
  screenXLMax: 1199,
  screenXXL: 1600,
  screenXXLMin: 1600,
  screenXXLMax: 1599,
  boxShadowPopoverArrow: '3px 3px 7px rgba(0, 0, 0, 0.1)',
  boxShadowCard: '0 1px 2px -2px rgba(0, 0, 0, 0.16),0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)',
  boxShadowDrawerRight: '-6px 0 16px 0 rgba(0, 0, 0, 0.08),-3px 0 6px -4px rgba(0, 0, 0, 0.12),-9px 0 28px 8px rgba(0, 0, 0, 0.05)',
  boxShadowDrawerLeft: '6px 0 16px 0 rgba(0, 0, 0, 0.08),3px 0 6px -4px rgba(0, 0, 0, 0.12),9px 0 28px 8px rgba(0, 0, 0, 0.05)',
  boxShadowDrawerUp: '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  boxShadowDrawerDown: '0 -6px 16px 0 rgba(0, 0, 0, 0.08),0 -3px 6px -4px rgba(0, 0, 0, 0.12),0 -9px 28px 8px rgba(0, 0, 0, 0.05)',
  boxShadowTabsOverflowLeft: 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)',
  boxShadowTabsOverflowRight: 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)',
  boxShadowTabsOverflowTop: 'inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)',
  boxShadowTabsOverflowBottom: 'inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)',
  _tokenKey: '19w80ff',
  _hashId: 'css-dev-only-do-not-override-i2zu9q'
};
var hashCode = function hashCode(str) {
  var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (var i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
// @ts-ignore
var emptyTheme = (0,_ant_design_cssinjs__WEBPACK_IMPORTED_MODULE_0__/* .createTheme */ .jG)(function (token) {
  return token;
});
var token = {
  theme: emptyTheme,
  token: (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({}, defaultToken), antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : (_theme$defaultAlgorit = antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultAlgorithm */ .Z.defaultAlgorithm) === null || _theme$defaultAlgorit === void 0 ? void 0 : _theme$defaultAlgorit.call(antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultSeed */ .Z.defaultSeed)),
  hashId: "pro-".concat(hashCode(JSON.stringify(defaultToken)))
};
var useToken = function useToken() {
  return token;
};
var darkAlgorithm = function darkAlgorithm() {
  var _theme$defaultAlgorit2;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({}, defaultToken), antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : (_theme$defaultAlgorit2 = antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultAlgorithm */ .Z.defaultAlgorithm) === null || _theme$defaultAlgorit2 === void 0 ? void 0 : _theme$defaultAlgorit2.call(antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultSeed */ .Z.defaultSeed));
};
var defaultAlgorithm = function defaultAlgorithm() {
  var _theme$defaultAlgorit3;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({}, defaultToken), antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : (_theme$defaultAlgorit3 = antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultAlgorithm */ .Z.defaultAlgorithm) === null || _theme$defaultAlgorit3 === void 0 ? void 0 : _theme$defaultAlgorit3.call(antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultSeed */ .Z.defaultSeed));
};
var compactAlgorithm = function compactAlgorithm() {
  var _theme$defaultAlgorit4;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({}, defaultToken), antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : (_theme$defaultAlgorit4 = antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultAlgorithm */ .Z.defaultAlgorithm) === null || _theme$defaultAlgorit4 === void 0 ? void 0 : _theme$defaultAlgorit4.call(antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === null || antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z === void 0 ? void 0 : antd__WEBPACK_IMPORTED_MODULE_2__/* ["default"].defaultSeed */ .Z.defaultSeed));
};

//# sourceURL=webpack:///./node_modules/@ant-design/pro-provider/es/useStyle/token.js?`)},12044:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": function() { return /* binding */ isBrowser; }
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(34155);
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
var isBrowser = function isBrowser() {
  if (false) {}
  return typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.matchMedia !== 'undefined' && !isNode;
};

//# sourceURL=webpack:///./node_modules/@ant-design/pro-utils/es/isBrowser/index.js?`)},8367:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "C": function() { return /* binding */ es_avatar; }
});

// UNUSED EXPORTS: Group

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(94184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/rc-resize-observer/es/index.js + 4 modules
var es = __webpack_require__(48555);
// EXTERNAL MODULE: ./node_modules/rc-util/es/ref.js
var es_ref = __webpack_require__(42550);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/context.js
var context = __webpack_require__(53124);
;// CONCATENATED MODULE: ./node_modules/antd/es/_util/hooks/useForceUpdate.js

function useForceUpdate() {
  const [, forceUpdate] = react.useReducer(x => x + 1, 0);
  return forceUpdate;
}
// EXTERNAL MODULE: ./node_modules/antd/es/theme/internal.js + 2 modules
var internal = __webpack_require__(64049);
;// CONCATENATED MODULE: ./node_modules/antd/es/_util/responsiveObserver.js


const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const getResponsiveMap = token => ({
  xs: \`(max-width: \${token.screenXSMax}px)\`,
  sm: \`(min-width: \${token.screenSM}px)\`,
  md: \`(min-width: \${token.screenMD}px)\`,
  lg: \`(min-width: \${token.screenLG}px)\`,
  xl: \`(min-width: \${token.screenXL}px)\`,
  xxl: \`(min-width: \${token.screenXXL}px)\`
});
/**
 * Ensures that the breakpoints token are valid, in good order
 * For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
 */
const validateBreakpoints = token => {
  const indexableToken = token;
  const revBreakpoints = [].concat(responsiveArray).reverse();
  revBreakpoints.forEach((breakpoint, i) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = \`screen\${breakpointUpper}Min\`;
    const screen = \`screen\${breakpointUpper}\`;
    if (!(indexableToken[screenMin] <= indexableToken[screen])) {
      throw new Error(\`\${screenMin}<=\${screen} fails : !(\${indexableToken[screenMin]}<=\${indexableToken[screen]})\`);
    }
    if (i < revBreakpoints.length - 1) {
      const screenMax = \`screen\${breakpointUpper}Max\`;
      if (!(indexableToken[screen] <= indexableToken[screenMax])) {
        throw new Error(\`\${screen}<=\${screenMax} fails : !(\${indexableToken[screen]}<=\${indexableToken[screenMax]})\`);
      }
      const nextBreakpointUpperMin = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = \`screen\${nextBreakpointUpperMin}Min\`;
      if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
        throw new Error(\`\${screenMax}<=\${nextScreenMin} fails : !(\${indexableToken[screenMax]}<=\${indexableToken[nextScreenMin]})\`);
      }
    }
  });
  return token;
};
function useResponsiveObserver() {
  const [, token] = (0,internal/* useToken */.dQ)();
  const responsiveMap = getResponsiveMap(validateBreakpoints(token));
  // To avoid repeat create instance, we add \`useMemo\` here.
  return react.useMemo(() => {
    const subscribers = new Map();
    let subUid = -1;
    let screens = {};
    return {
      matchHandlers: {},
      dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach(func => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func) {
        if (!subscribers.size) this.register();
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken) {
        subscribers.delete(paramToken);
        if (!subscribers.size) this.unregister();
      },
      unregister() {
        Object.keys(responsiveMap).forEach(screen => {
          const matchMediaQuery = responsiveMap[screen];
          const handler = this.matchHandlers[matchMediaQuery];
          handler === null || handler === void 0 ? void 0 : handler.mql.removeListener(handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
      },
      register() {
        Object.keys(responsiveMap).forEach(screen => {
          const matchMediaQuery = responsiveMap[screen];
          const listener = _ref => {
            let {
              matches
            } = _ref;
            this.dispatch(Object.assign(Object.assign({}, screens), {
              [screen]: matches
            }));
          };
          const mql = window.matchMedia(matchMediaQuery);
          mql.addListener(listener);
          this.matchHandlers[matchMediaQuery] = {
            mql,
            listener
          };
          listener(mql);
        });
      },
      responsiveMap
    };
  }, [token]);
}
;// CONCATENATED MODULE: ./node_modules/antd/es/grid/hooks/useBreakpoint.js



function useBreakpoint() {
  let refreshOnChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  const screensRef = (0,react.useRef)({});
  const forceUpdate = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();
  (0,react.useEffect)(() => {
    const token = responsiveObserver.subscribe(supportScreens => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  return screensRef.current;
}
/* harmony default export */ var hooks_useBreakpoint = (useBreakpoint);
;// CONCATENATED MODULE: ./node_modules/antd/es/avatar/SizeContext.js

const SizeContext = /*#__PURE__*/react.createContext('default');
const SizeContextProvider = _ref => {
  let {
    children,
    size
  } = _ref;
  const originSize = react.useContext(SizeContext);
  return /*#__PURE__*/react.createElement(SizeContext.Provider, {
    value: size || originSize
  }, children);
};
/* harmony default export */ var avatar_SizeContext = (SizeContext);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/genComponentStyleHook.js
var genComponentStyleHook = __webpack_require__(67968);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/statistic.js
var statistic = __webpack_require__(45503);
// EXTERNAL MODULE: ./node_modules/antd/es/style/index.js
var style = __webpack_require__(14747);
;// CONCATENATED MODULE: ./node_modules/antd/es/avatar/style/index.js


const genBaseStyle = token => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    avatarSizeBase,
    avatarSizeLG,
    avatarSizeSM,
    avatarFontSizeBase,
    avatarFontSizeLG,
    avatarFontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType
  } = token;
  // Avatar size style
  const avatarSizeStyle = (size, fontSize, radius) => ({
    width: size,
    height: size,
    lineHeight: \`\${size - lineWidth * 2}px\`,
    borderRadius: '50%',
    [\`&\${componentCls}-square\`]: {
      borderRadius: radius
    },
    [\`\${componentCls}-string\`]: {
      position: 'absolute',
      left: {
        _skip_check_: true,
        value: '50%'
      },
      transformOrigin: '0 center'
    },
    [\`&\${componentCls}-icon\`]: {
      fontSize,
      [\`> \${iconCls}\`]: {
        margin: 0
      }
    }
  });
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, (0,style/* resetComponent */.Wf)(token)), {
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      color: avatarColor,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
      background: avatarBg,
      border: \`\${lineWidth}px \${lineType} transparent\`,
      [\`&-image\`]: {
        background: 'transparent'
      },
      [\`\${antCls}-image-img\`]: {
        display: 'block'
      }
    }), avatarSizeStyle(avatarSizeBase, avatarFontSizeBase, borderRadius)), {
      [\`&-lg\`]: Object.assign({}, avatarSizeStyle(avatarSizeLG, avatarFontSizeLG, borderRadiusLG)),
      [\`&-sm\`]: Object.assign({}, avatarSizeStyle(avatarSizeSM, avatarFontSizeSM, borderRadiusSM)),
      '> img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    })
  };
};
const genGroupStyle = token => {
  const {
    componentCls,
    avatarGroupBorderColor,
    avatarGroupSpace
  } = token;
  return {
    [\`\${componentCls}-group\`]: {
      display: 'inline-flex',
      [\`\${componentCls}\`]: {
        borderColor: avatarGroupBorderColor
      },
      [\`> *:not(:first-child)\`]: {
        marginInlineStart: avatarGroupSpace
      }
    }
  };
};
/* harmony default export */ var avatar_style = ((0,genComponentStyleHook/* default */.Z)('Avatar', token => {
  const {
    colorTextLightSolid,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    fontSize,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading3,
    marginXS,
    colorBorderBg,
    colorTextPlaceholder
  } = token;
  const avatarToken = (0,statistic/* merge */.TS)(token, {
    avatarBg: colorTextPlaceholder,
    avatarColor: colorTextLightSolid,
    avatarSizeBase: controlHeight,
    avatarSizeLG: controlHeightLG,
    avatarSizeSM: controlHeightSM,
    avatarFontSizeBase: Math.round((fontSizeLG + fontSizeXL) / 2),
    avatarFontSizeLG: fontSizeHeading3,
    avatarFontSizeSM: fontSize,
    avatarGroupSpace: -marginXS,
    avatarGroupBorderColor: colorBorderBg
  });
  return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/avatar/avatar.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};










const InternalAvatar = (props, ref) => {
  const groupSize = react.useContext(avatar_SizeContext);
  const [scale, setScale] = react.useState(1);
  const [mounted, setMounted] = react.useState(false);
  const [isImgExist, setIsImgExist] = react.useState(true);
  const avatarNodeRef = react.useRef(null);
  const avatarChildrenRef = react.useRef(null);
  const avatarNodeMergeRef = (0,es_ref/* composeRef */.sQ)(ref, avatarNodeRef);
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const setScaleParam = () => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale
    const nodeWidth = avatarNodeRef.current.offsetWidth;
    // denominator is 0 is no meaning
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      const {
        gap = 4
      } = props;
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
      }
    }
  };
  react.useEffect(() => {
    setMounted(true);
  }, []);
  react.useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);
  react.useEffect(() => {
    setScaleParam();
  }, [props.gap]);
  const handleImgLoadError = () => {
    const {
      onError
    } = props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };
  const {
      prefixCls: customizePrefixCls,
      shape = 'circle',
      size: customSize = 'default',
      src,
      srcSet,
      icon,
      className,
      alt,
      draggable,
      children,
      crossOrigin
    } = props,
    others = __rest(props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "alt", "draggable", "children", "crossOrigin"]);
  const size = customSize === 'default' ? groupSize : customSize;
  const needResponsive = Object.keys(typeof size === 'object' ? size || {} : {}).some(key => ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(key));
  const screens = hooks_useBreakpoint(needResponsive);
  const responsiveSizeStyle = react.useMemo(() => {
    if (typeof size !== 'object') {
      return {};
    }
    const currentBreakpoint = responsiveArray.find(screen => screens[screen]);
    const currentSize = size[currentBreakpoint];
    return currentSize ? {
      width: currentSize,
      height: currentSize,
      lineHeight: \`\${currentSize}px\`,
      fontSize: icon ? currentSize / 2 : 18
    } : {};
  }, [screens, size]);
   false ? 0 : void 0;
  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const [wrapSSR, hashId] = avatar_style(prefixCls);
  const sizeCls = classnames_default()({
    [\`\${prefixCls}-lg\`]: size === 'large',
    [\`\${prefixCls}-sm\`]: size === 'small'
  });
  const hasImageElement = /*#__PURE__*/react.isValidElement(src);
  const classString = classnames_default()(prefixCls, sizeCls, {
    [\`\${prefixCls}-\${shape}\`]: !!shape,
    [\`\${prefixCls}-image\`]: hasImageElement || src && isImgExist,
    [\`\${prefixCls}-icon\`]: !!icon
  }, className, hashId);
  const sizeStyle = typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: \`\${size}px\`,
    fontSize: icon ? size / 2 : 18
  } : {};
  let childrenToRender;
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = /*#__PURE__*/react.createElement("img", {
      src: src,
      draggable: draggable,
      srcSet: srcSet,
      onError: handleImgLoadError,
      alt: alt,
      crossOrigin: crossOrigin
    });
  } else if (hasImageElement) {
    childrenToRender = src;
  } else if (icon) {
    childrenToRender = icon;
  } else if (mounted || scale !== 1) {
    const transformString = \`scale(\${scale}) translateX(-50%)\`;
    const childrenStyle = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString
    };
    const sizeChildrenStyle = typeof size === 'number' ? {
      lineHeight: \`\${size}px\`
    } : {};
    childrenToRender = /*#__PURE__*/react.createElement(es/* default */.Z, {
      onResize: setScaleParam
    }, /*#__PURE__*/react.createElement("span", {
      className: \`\${prefixCls}-string\`,
      ref: avatarChildrenRef,
      style: Object.assign(Object.assign({}, sizeChildrenStyle), childrenStyle)
    }, children));
  } else {
    childrenToRender = /*#__PURE__*/react.createElement("span", {
      className: \`\${prefixCls}-string\`,
      style: {
        opacity: 0
      },
      ref: avatarChildrenRef
    }, children);
  }
  // The event is triggered twice from bubbling up the DOM tree.
  // see https://codesandbox.io/s/kind-snow-9lidz
  delete others.onError;
  delete others.gap;
  return wrapSSR( /*#__PURE__*/react.createElement("span", Object.assign({}, others, {
    style: Object.assign(Object.assign(Object.assign({}, sizeStyle), responsiveSizeStyle), others.style),
    className: classString,
    ref: avatarNodeMergeRef
  }), childrenToRender));
};
const Avatar = /*#__PURE__*/react.forwardRef(InternalAvatar);
if (false) {}
/* harmony default export */ var avatar = (Avatar);
// EXTERNAL MODULE: ./node_modules/rc-util/es/Children/toArray.js
var toArray = __webpack_require__(50344);
// EXTERNAL MODULE: ./node_modules/antd/es/popover/index.js + 3 modules
var popover = __webpack_require__(74627);
// EXTERNAL MODULE: ./node_modules/antd/es/_util/reactNode.js
var reactNode = __webpack_require__(96159);
;// CONCATENATED MODULE: ./node_modules/antd/es/avatar/group.js









const Group = props => {
  const {
    getPrefixCls,
    direction
  } = react.useContext(context/* ConfigContext */.E_);
  const {
    prefixCls: customizePrefixCls,
    className = '',
    maxCount,
    maxStyle,
    size
  } = props;
  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const groupPrefixCls = \`\${prefixCls}-group\`;
  const [wrapSSR, hashId] = avatar_style(prefixCls);
  const cls = classnames_default()(groupPrefixCls, {
    [\`\${groupPrefixCls}-rtl\`]: direction === 'rtl'
  }, className, hashId);
  const {
    children,
    maxPopoverPlacement = 'top',
    maxPopoverTrigger = 'hover'
  } = props;
  const childrenWithProps = (0,toArray/* default */.Z)(children).map((child, index) => (0,reactNode/* cloneElement */.Tm)(child, {
    key: \`avatar-key-\${index}\`
  }));
  const numOfChildren = childrenWithProps.length;
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount);
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push( /*#__PURE__*/react.createElement(popover/* default */.Z, {
      key: "avatar-popover-key",
      content: childrenHidden,
      trigger: maxPopoverTrigger,
      placement: maxPopoverPlacement,
      overlayClassName: \`\${groupPrefixCls}-popover\`
    }, /*#__PURE__*/react.createElement(avatar, {
      style: maxStyle
    }, \`+\${numOfChildren - maxCount}\`)));
    return wrapSSR( /*#__PURE__*/react.createElement(SizeContextProvider, {
      size: size
    }, /*#__PURE__*/react.createElement("div", {
      className: cls,
      style: props.style
    }, childrenShow)));
  }
  return wrapSSR( /*#__PURE__*/react.createElement(SizeContextProvider, {
    size: size
  }, /*#__PURE__*/react.createElement("div", {
    className: cls,
    style: props.style
  }, childrenWithProps)));
};
/* harmony default export */ var group = (Group);
;// CONCATENATED MODULE: ./node_modules/antd/es/avatar/index.js



const avatar_Avatar = avatar;
avatar_Avatar.Group = group;
/* harmony default export */ var es_avatar = (avatar_Avatar);

//# sourceURL=webpack:///./node_modules/antd/es/avatar/index.js_+_7_modules?`)},74627:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ popover; }
});

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(94184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/context.js
var context = __webpack_require__(53124);
// EXTERNAL MODULE: ./node_modules/antd/es/tooltip/index.js + 5 modules
var tooltip = __webpack_require__(59068);
;// CONCATENATED MODULE: ./node_modules/antd/es/_util/getRenderPropValue.js
const getRenderPropValue = propValue => {
  if (!propValue) {
    return null;
  }
  if (typeof propValue === 'function') {
    return propValue();
  }
  return propValue;
};
// EXTERNAL MODULE: ./node_modules/antd/es/_util/motion.js
var motion = __webpack_require__(33603);
// EXTERNAL MODULE: ./node_modules/rc-tooltip/es/index.js + 2 modules
var es = __webpack_require__(43763);
// EXTERNAL MODULE: ./node_modules/antd/es/style/motion/zoom.js
var zoom = __webpack_require__(50438);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/interface/presetColors.js
var presetColors = __webpack_require__(8796);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/genComponentStyleHook.js
var genComponentStyleHook = __webpack_require__(67968);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/statistic.js
var statistic = __webpack_require__(45503);
// EXTERNAL MODULE: ./node_modules/antd/es/style/index.js
var style = __webpack_require__(14747);
// EXTERNAL MODULE: ./node_modules/antd/es/style/placementArrow.js
var placementArrow = __webpack_require__(97414);
;// CONCATENATED MODULE: ./node_modules/antd/es/popover/style/index.js




const genBaseStyle = token => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    width,
    fontWeightStrong,
    popoverPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG: borderRadius,
    zIndexPopup,
    marginXS,
    colorBgElevated
  } = token;
  return [{
    [componentCls]: Object.assign(Object.assign({}, (0,style/* resetComponent */.Wf)(token)), {
      position: 'absolute',
      top: 0,
      // use \`left\` to fix https://github.com/ant-design/ant-design/issues/39195
      left: {
        _skip_check_: true,
        value: 0
      },
      zIndex: zIndexPopup,
      fontWeight: 'normal',
      whiteSpace: 'normal',
      textAlign: 'start',
      cursor: 'auto',
      userSelect: 'text',
      '--antd-arrow-background-color': colorBgElevated,
      '&-rtl': {
        direction: 'rtl'
      },
      '&-hidden': {
        display: 'none'
      },
      [\`\${componentCls}-content\`]: {
        position: 'relative'
      },
      [\`\${componentCls}-inner\`]: {
        backgroundColor: popoverBg,
        backgroundClip: 'padding-box',
        borderRadius,
        boxShadow: boxShadowSecondary,
        padding: popoverPadding
      },
      [\`\${componentCls}-title\`]: {
        minWidth: width,
        marginBottom: marginXS,
        color: colorTextHeading,
        fontWeight: fontWeightStrong
      },
      [\`\${componentCls}-inner-content\`]: {
        color: popoverColor
      }
    })
  },
  // Arrow Style
  (0,placementArrow/* default */.ZP)(token, {
    colorBg: 'var(--antd-arrow-background-color)'
  }),
  // Pure Render
  {
    [\`\${componentCls}-pure\`]: {
      position: 'relative',
      maxWidth: 'none',
      [\`\${componentCls}-content\`]: {
        display: 'inline-block'
      }
    }
  }];
};
const genColorStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: presetColors/* PresetColors.map */.i.map(colorKey => {
      const lightColor = token[\`\${colorKey}-6\`];
      return {
        [\`&\${componentCls}-\${colorKey}\`]: {
          '--antd-arrow-background-color': lightColor,
          [\`\${componentCls}-inner\`]: {
            backgroundColor: lightColor
          },
          [\`\${componentCls}-arrow\`]: {
            background: 'transparent'
          }
        }
      };
    })
  };
};
const genWireframeStyle = token => {
  const {
    componentCls,
    lineWidth,
    lineType,
    colorSplit,
    paddingSM,
    controlHeight,
    fontSize,
    lineHeight,
    padding
  } = token;
  const titlePaddingBlockDist = controlHeight - Math.round(fontSize * lineHeight);
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;
  return {
    [componentCls]: {
      [\`\${componentCls}-inner\`]: {
        padding: 0
      },
      [\`\${componentCls}-title\`]: {
        margin: 0,
        padding: \`\${popoverTitlePaddingBlockTop}px \${popoverPaddingHorizontal}px \${popoverTitlePaddingBlockBottom}px\`,
        borderBottom: \`\${lineWidth}px \${lineType} \${colorSplit}\`
      },
      [\`\${componentCls}-inner-content\`]: {
        padding: \`\${paddingSM}px \${popoverPaddingHorizontal}px\`
      }
    }
  };
};
/* harmony default export */ var popover_style = ((0,genComponentStyleHook/* default */.Z)('Popover', token => {
  const {
    colorBgElevated,
    colorText,
    wireframe
  } = token;
  const popoverToken = (0,statistic/* merge */.TS)(token, {
    popoverBg: colorBgElevated,
    popoverColor: colorText,
    popoverPadding: 12 // Fixed Value
  });

  return [genBaseStyle(popoverToken), genColorStyle(popoverToken), wireframe && genWireframeStyle(popoverToken), (0,zoom/* initZoomMotion */._y)(popoverToken, 'zoom-big')];
}, _ref => {
  let {
    zIndexPopupBase
  } = _ref;
  return {
    zIndexPopup: zIndexPopupBase + 30,
    width: 177
  };
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/popover/PurePanel.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};






const getOverlay = (prefixCls, title, content) => {
  if (!title && !content) return undefined;
  return /*#__PURE__*/react.createElement(react.Fragment, null, title && /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-title\`
  }, getRenderPropValue(title)), /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-inner-content\`
  }, getRenderPropValue(content)));
};
function RawPurePanel(props) {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = 'top',
    title,
    content,
    children
  } = props;
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()(hashId, prefixCls, \`\${prefixCls}-pure\`, \`\${prefixCls}-placement-\${placement}\`, className),
    style: style
  }, /*#__PURE__*/react.createElement(es/* Popup */.G, Object.assign({}, props, {
    className: hashId,
    prefixCls: prefixCls
  }), children || getOverlay(prefixCls, title, content)));
}
function PurePanel(props) {
  const {
      prefixCls: customizePrefixCls
    } = props,
    restProps = __rest(props, ["prefixCls"]);
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapSSR, hashId] = popover_style(prefixCls);
  return wrapSSR( /*#__PURE__*/react.createElement(RawPurePanel, Object.assign({}, restProps, {
    prefixCls: prefixCls,
    hashId: hashId
  })));
}
;// CONCATENATED MODULE: ./node_modules/antd/es/popover/index.js
var popover_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







// CSSINJS

const Overlay = _ref => {
  let {
    title,
    content,
    prefixCls
  } = _ref;
  if (!title && !content) {
    return null;
  }
  return /*#__PURE__*/react.createElement(react.Fragment, null, title && /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-title\`
  }, getRenderPropValue(title)), /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-inner-content\`
  }, getRenderPropValue(content)));
};
const Popover = /*#__PURE__*/react.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      title,
      content,
      overlayClassName,
      placement = 'top',
      trigger = 'hover',
      mouseEnterDelay = 0.1,
      mouseLeaveDelay = 0.1,
      overlayStyle = {}
    } = props,
    otherProps = popover_rest(props, ["prefixCls", "title", "content", "overlayClassName", "placement", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle"]);
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapSSR, hashId] = popover_style(prefixCls);
  const rootPrefixCls = getPrefixCls();
  const overlayCls = classnames_default()(overlayClassName, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement(tooltip/* default */.Z, Object.assign({
    placement: placement,
    trigger: trigger,
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    overlayStyle: overlayStyle
  }, otherProps, {
    prefixCls: prefixCls,
    overlayClassName: overlayCls,
    ref: ref,
    overlay: /*#__PURE__*/react.createElement(Overlay, {
      prefixCls: prefixCls,
      title: title,
      content: content
    }),
    transitionName: (0,motion/* getTransitionName */.mL)(rootPrefixCls, 'zoom-big', otherProps.transitionName),
    "data-popover-inject": true
  })));
});
if (false) {}
Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
/* harmony default export */ var popover = (Popover);

//# sourceURL=webpack:///./node_modules/antd/es/popover/index.js_+_3_modules?`)},99559:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ skeleton; }
});

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(94184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/context.js
var context = __webpack_require__(53124);
// EXTERNAL MODULE: ./node_modules/rc-util/es/omit.js
var omit = __webpack_require__(98423);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Element.js


const Element = props => {
  const {
    prefixCls,
    className,
    style,
    size,
    shape
  } = props;
  const sizeCls = classnames_default()({
    [\`\${prefixCls}-lg\`]: size === 'large',
    [\`\${prefixCls}-sm\`]: size === 'small'
  });
  const shapeCls = classnames_default()({
    [\`\${prefixCls}-circle\`]: shape === 'circle',
    [\`\${prefixCls}-square\`]: shape === 'square',
    [\`\${prefixCls}-round\`]: shape === 'round'
  });
  const sizeStyle = react.useMemo(() => typeof size === 'number' ? {
    width: size,
    height: size,
    lineHeight: \`\${size}px\`
  } : {}, [size]);
  return /*#__PURE__*/react.createElement("span", {
    className: classnames_default()(prefixCls, sizeCls, shapeCls, className),
    style: Object.assign(Object.assign({}, sizeStyle), style)
  });
};
/* harmony default export */ var skeleton_Element = (Element);
// EXTERNAL MODULE: ./node_modules/@ant-design/cssinjs/es/index.js + 26 modules
var es = __webpack_require__(65178);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/genComponentStyleHook.js
var genComponentStyleHook = __webpack_require__(67968);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/statistic.js
var statistic = __webpack_require__(45503);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/style/index.js


const skeletonClsLoading = new es/* Keyframes */.E4(\`ant-skeleton-loading\`, {
  '0%': {
    transform: 'translateX(-37.5%)'
  },
  '100%': {
    transform: 'translateX(37.5%)'
  }
});
const genSkeletonElementCommonSize = size => ({
  height: size,
  lineHeight: \`\${size}px\`
});
const genSkeletonElementAvatarSize = size => Object.assign({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonColor = token => ({
  position: 'relative',
  // fix https://github.com/ant-design/ant-design/issues/36444
  // https://monshin.github.io/202109/css/safari-border-radius-overflow-hidden/
  /* stylelint-disable-next-line property-no-vendor-prefix,value-no-vendor-prefix */
  zIndex: 0,
  overflow: 'hidden',
  background: 'transparent',
  '&::after': {
    position: 'absolute',
    top: 0,
    insetInlineEnd: '-150%',
    bottom: 0,
    insetInlineStart: '-150%',
    background: token.skeletonLoadingBackground,
    animationName: skeletonClsLoading,
    animationDuration: token.skeletonLoadingMotionDuration,
    animationTimingFunction: 'ease',
    animationIterationCount: 'infinite',
    content: '""'
  }
});
const genSkeletonElementInputSize = size => Object.assign({
  width: size * 5,
  minWidth: size * 5
}, genSkeletonElementCommonSize(size));
const genSkeletonElementAvatar = token => {
  const {
    skeletonAvatarCls,
    color,
    controlHeight,
    controlHeightLG,
    controlHeightSM
  } = token;
  return {
    [\`\${skeletonAvatarCls}\`]: Object.assign({
      display: 'inline-block',
      verticalAlign: 'top',
      background: color
    }, genSkeletonElementAvatarSize(controlHeight)),
    [\`\${skeletonAvatarCls}\${skeletonAvatarCls}-circle\`]: {
      borderRadius: '50%'
    },
    [\`\${skeletonAvatarCls}\${skeletonAvatarCls}-lg\`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
    [\`\${skeletonAvatarCls}\${skeletonAvatarCls}-sm\`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
  };
};
const genSkeletonElementInput = token => {
  const {
    controlHeight,
    borderRadiusSM,
    skeletonInputCls,
    controlHeightLG,
    controlHeightSM,
    color
  } = token;
  return {
    [\`\${skeletonInputCls}\`]: Object.assign({
      display: 'inline-block',
      verticalAlign: 'top',
      background: color,
      borderRadius: borderRadiusSM
    }, genSkeletonElementInputSize(controlHeight)),
    [\`\${skeletonInputCls}-lg\`]: Object.assign({}, genSkeletonElementInputSize(controlHeightLG)),
    [\`\${skeletonInputCls}-sm\`]: Object.assign({}, genSkeletonElementInputSize(controlHeightSM))
  };
};
const genSkeletonElementImageSize = size => Object.assign({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonElementImage = token => {
  const {
    skeletonImageCls,
    imageSizeBase,
    color,
    borderRadiusSM
  } = token;
  return {
    [\`\${skeletonImageCls}\`]: Object.assign(Object.assign({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'top',
      background: color,
      borderRadius: borderRadiusSM
    }, genSkeletonElementImageSize(imageSizeBase * 2)), {
      [\`\${skeletonImageCls}-path\`]: {
        fill: '#bfbfbf'
      },
      [\`\${skeletonImageCls}-svg\`]: Object.assign(Object.assign({}, genSkeletonElementImageSize(imageSizeBase)), {
        maxWidth: imageSizeBase * 4,
        maxHeight: imageSizeBase * 4
      }),
      [\`\${skeletonImageCls}-svg\${skeletonImageCls}-svg-circle\`]: {
        borderRadius: '50%'
      }
    }),
    [\`\${skeletonImageCls}\${skeletonImageCls}-circle\`]: {
      borderRadius: '50%'
    }
  };
};
const genSkeletonElementButtonShape = (token, size, buttonCls) => {
  const {
    skeletonButtonCls
  } = token;
  return {
    [\`\${buttonCls}\${skeletonButtonCls}-circle\`]: {
      width: size,
      minWidth: size,
      borderRadius: '50%'
    },
    [\`\${buttonCls}\${skeletonButtonCls}-round\`]: {
      borderRadius: size
    }
  };
};
const genSkeletonElementButtonSize = size => Object.assign({
  width: size * 2,
  minWidth: size * 2
}, genSkeletonElementCommonSize(size));
const genSkeletonElementButton = token => {
  const {
    borderRadiusSM,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    color
  } = token;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
    [\`\${skeletonButtonCls}\`]: Object.assign({
      display: 'inline-block',
      verticalAlign: 'top',
      background: color,
      borderRadius: borderRadiusSM,
      width: controlHeight * 2,
      minWidth: controlHeight * 2
    }, genSkeletonElementButtonSize(controlHeight))
  }, genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls)), {
    [\`\${skeletonButtonCls}-lg\`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightLG))
  }), genSkeletonElementButtonShape(token, controlHeightLG, \`\${skeletonButtonCls}-lg\`)), {
    [\`\${skeletonButtonCls}-sm\`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightSM))
  }), genSkeletonElementButtonShape(token, controlHeightSM, \`\${skeletonButtonCls}-sm\`));
};
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    skeletonAvatarCls,
    skeletonTitleCls,
    skeletonParagraphCls,
    skeletonButtonCls,
    skeletonInputCls,
    skeletonImageCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    color,
    padding,
    marginSM,
    borderRadius,
    skeletonTitleHeight,
    skeletonBlockRadius,
    skeletonParagraphLineHeight,
    controlHeightXS,
    skeletonParagraphMarginTop
  } = token;
  return {
    [\`\${componentCls}\`]: {
      display: 'table',
      width: '100%',
      [\`\${componentCls}-header\`]: {
        display: 'table-cell',
        paddingInlineEnd: padding,
        verticalAlign: 'top',
        // Avatar
        [\`\${skeletonAvatarCls}\`]: Object.assign({
          display: 'inline-block',
          verticalAlign: 'top',
          background: color
        }, genSkeletonElementAvatarSize(controlHeight)),
        [\`\${skeletonAvatarCls}-circle\`]: {
          borderRadius: '50%'
        },
        [\`\${skeletonAvatarCls}-lg\`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
        [\`\${skeletonAvatarCls}-sm\`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
      },
      [\`\${componentCls}-content\`]: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'top',
        // Title
        [\`\${skeletonTitleCls}\`]: {
          width: '100%',
          height: skeletonTitleHeight,
          background: color,
          borderRadius: skeletonBlockRadius,
          [\`+ \${skeletonParagraphCls}\`]: {
            marginBlockStart: controlHeightSM
          }
        },
        // paragraph
        [\`\${skeletonParagraphCls}\`]: {
          padding: 0,
          '> li': {
            width: '100%',
            height: skeletonParagraphLineHeight,
            listStyle: 'none',
            background: color,
            borderRadius: skeletonBlockRadius,
            '+ li': {
              marginBlockStart: controlHeightXS
            }
          }
        },
        [\`\${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))\`]: {
          width: '61%'
        }
      },
      [\`&-round \${componentCls}-content\`]: {
        [\`\${skeletonTitleCls}, \${skeletonParagraphCls} > li\`]: {
          borderRadius
        }
      }
    },
    [\`\${componentCls}-with-avatar \${componentCls}-content\`]: {
      // Title
      [\`\${skeletonTitleCls}\`]: {
        marginBlockStart: marginSM,
        [\`+ \${skeletonParagraphCls}\`]: {
          marginBlockStart: skeletonParagraphMarginTop
        }
      }
    },
    // Skeleton element
    [\`\${componentCls}\${componentCls}-element\`]: Object.assign(Object.assign(Object.assign(Object.assign({
      display: 'inline-block',
      width: 'auto'
    }, genSkeletonElementButton(token)), genSkeletonElementAvatar(token)), genSkeletonElementInput(token)), genSkeletonElementImage(token)),
    // Skeleton Block Button, Input
    [\`\${componentCls}\${componentCls}-block\`]: {
      width: '100%',
      [\`\${skeletonButtonCls}\`]: {
        width: '100%'
      },
      [\`\${skeletonInputCls}\`]: {
        width: '100%'
      }
    },
    // With active animation
    [\`\${componentCls}\${componentCls}-active\`]: {
      [\`
        \${skeletonTitleCls},
        \${skeletonParagraphCls} > li,
        \${skeletonAvatarCls},
        \${skeletonButtonCls},
        \${skeletonInputCls},
        \${skeletonImageCls}
      \`]: Object.assign({}, genSkeletonColor(token))
    }
  };
};
// ============================== Export ==============================
/* harmony default export */ var skeleton_style = ((0,genComponentStyleHook/* default */.Z)('Skeleton', token => {
  const {
    componentCls
  } = token;
  const skeletonToken = (0,statistic/* merge */.TS)(token, {
    skeletonAvatarCls: \`\${componentCls}-avatar\`,
    skeletonTitleCls: \`\${componentCls}-title\`,
    skeletonParagraphCls: \`\${componentCls}-paragraph\`,
    skeletonButtonCls: \`\${componentCls}-button\`,
    skeletonInputCls: \`\${componentCls}-input\`,
    skeletonImageCls: \`\${componentCls}-image\`,
    imageSizeBase: token.controlHeight * 1.5,
    skeletonTitleHeight: token.controlHeight / 2,
    skeletonBlockRadius: token.borderRadiusSM,
    skeletonParagraphLineHeight: token.controlHeight / 2,
    skeletonParagraphMarginTop: token.marginLG + token.marginXXS,
    borderRadius: 100,
    skeletonLoadingBackground: \`linear-gradient(90deg, \${token.color} 25%, \${token.colorGradientEnd} 37%, \${token.color} 63%)\`,
    skeletonLoadingMotionDuration: '1.4s'
  });
  return [genBaseStyle(skeletonToken)];
}, token => {
  const {
    colorFillContent,
    colorFill
  } = token;
  return {
    color: colorFillContent,
    colorGradientEnd: colorFill
  };
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Avatar.js






const SkeletonAvatar = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    active,
    shape = 'circle',
    size = 'default'
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = skeleton_style(prefixCls);
  const otherProps = (0,omit/* default */.Z)(props, ['prefixCls', 'className']);
  const cls = classnames_default()(prefixCls, \`\${prefixCls}-element\`, {
    [\`\${prefixCls}-active\`]: active
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: cls
  }, /*#__PURE__*/react.createElement(skeleton_Element, Object.assign({
    prefixCls: \`\${prefixCls}-avatar\`,
    shape: shape,
    size: size
  }, otherProps))));
};
/* harmony default export */ var Avatar = (SkeletonAvatar);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Button.js






const SkeletonButton = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    active,
    block = false,
    size = 'default'
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = skeleton_style(prefixCls);
  const otherProps = (0,omit/* default */.Z)(props, ['prefixCls']);
  const cls = classnames_default()(prefixCls, \`\${prefixCls}-element\`, {
    [\`\${prefixCls}-active\`]: active,
    [\`\${prefixCls}-block\`]: block
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: cls
  }, /*#__PURE__*/react.createElement(skeleton_Element, Object.assign({
    prefixCls: \`\${prefixCls}-button\`,
    size: size
  }, otherProps))));
};
/* harmony default export */ var Button = (SkeletonButton);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(1413);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/DotChartOutlined.js
// This icon file is generated automatically.
var DotChartOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z" } }] }, "name": "dot-chart", "theme": "outlined" };
/* harmony default export */ var asn_DotChartOutlined = (DotChartOutlined);

// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/components/AntdIcon.js + 3 modules
var AntdIcon = __webpack_require__(93771);
;// CONCATENATED MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/DotChartOutlined.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var DotChartOutlined_DotChartOutlined = function DotChartOutlined(props, ref) {
  return /*#__PURE__*/react.createElement(AntdIcon/* default */.Z, (0,objectSpread2/* default */.Z)((0,objectSpread2/* default */.Z)({}, props), {}, {
    ref: ref,
    icon: asn_DotChartOutlined
  }));
};
DotChartOutlined_DotChartOutlined.displayName = 'DotChartOutlined';
/* harmony default export */ var icons_DotChartOutlined = (/*#__PURE__*/react.forwardRef(DotChartOutlined_DotChartOutlined));
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Node.js





const SkeletonNode = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    active,
    children
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = skeleton_style(prefixCls);
  const cls = classnames_default()(prefixCls, \`\${prefixCls}-element\`, {
    [\`\${prefixCls}-active\`]: active
  }, hashId, className);
  const content = children !== null && children !== void 0 ? children : /*#__PURE__*/react.createElement(icons_DotChartOutlined, null);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: cls
  }, /*#__PURE__*/react.createElement("div", {
    className: classnames_default()(\`\${prefixCls}-image\`, className),
    style: style
  }, content)));
};
/* harmony default export */ var Node = (SkeletonNode);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Image.js




const path = 'M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z';
const SkeletonImage = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    active
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = skeleton_style(prefixCls);
  const cls = classnames_default()(prefixCls, \`\${prefixCls}-element\`, {
    [\`\${prefixCls}-active\`]: active
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: cls
  }, /*#__PURE__*/react.createElement("div", {
    className: classnames_default()(\`\${prefixCls}-image\`, className),
    style: style
  }, /*#__PURE__*/react.createElement("svg", {
    viewBox: "0 0 1098 1024",
    xmlns: "http://www.w3.org/2000/svg",
    className: \`\${prefixCls}-image-svg\`
  }, /*#__PURE__*/react.createElement("path", {
    d: path,
    className: \`\${prefixCls}-image-path\`
  })))));
};
/* harmony default export */ var Image = (SkeletonImage);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Input.js






const SkeletonInput = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    active,
    block,
    size = 'default'
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = skeleton_style(prefixCls);
  const otherProps = (0,omit/* default */.Z)(props, ['prefixCls']);
  const cls = classnames_default()(prefixCls, \`\${prefixCls}-element\`, {
    [\`\${prefixCls}-active\`]: active,
    [\`\${prefixCls}-block\`]: block
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: cls
  }, /*#__PURE__*/react.createElement(skeleton_Element, Object.assign({
    prefixCls: \`\${prefixCls}-input\`,
    size: size
  }, otherProps))));
};
/* harmony default export */ var Input = (SkeletonInput);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(74902);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Paragraph.js



const Paragraph = props => {
  const getWidth = index => {
    const {
      width,
      rows = 2
    } = props;
    if (Array.isArray(width)) {
      return width[index];
    }
    // last paragraph
    if (rows - 1 === index) {
      return width;
    }
    return undefined;
  };
  const {
    prefixCls,
    className,
    style,
    rows
  } = props;
  const rowList = (0,toConsumableArray/* default */.Z)(Array(rows)).map((_, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  react.createElement("li", {
    key: index,
    style: {
      width: getWidth(index)
    }
  }));
  return /*#__PURE__*/react.createElement("ul", {
    className: classnames_default()(prefixCls, className),
    style: style
  }, rowList);
};
/* harmony default export */ var skeleton_Paragraph = (Paragraph);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Title.js
/* eslint-disable jsx-a11y/heading-has-content */


const Title = _ref => {
  let {
    prefixCls,
    className,
    width,
    style
  } = _ref;
  return /*#__PURE__*/react.createElement("h3", {
    className: classnames_default()(prefixCls, className),
    style: Object.assign({
      width
    }, style)
  });
};
/* harmony default export */ var skeleton_Title = (Title);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/Skeleton.js












function getComponentProps(prop) {
  if (prop && typeof prop === 'object') {
    return prop;
  }
  return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    // Square avatar
    return {
      size: 'large',
      shape: 'square'
    };
  }
  return {
    size: 'large',
    shape: 'circle'
  };
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return {
      width: '38%'
    };
  }
  if (hasAvatar && hasParagraph) {
    return {
      width: '50%'
    };
  }
  return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
  const basicProps = {};
  // Width
  if (!hasAvatar || !hasTitle) {
    basicProps.width = '61%';
  }
  // Rows
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  } else {
    basicProps.rows = 2;
  }
  return basicProps;
}
const Skeleton = props => {
  const {
    prefixCls: customizePrefixCls,
    loading,
    className,
    style,
    children,
    avatar = false,
    title = true,
    paragraph = true,
    active,
    round
  } = props;
  const {
    getPrefixCls,
    direction
  } = react.useContext(context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapSSR, hashId] = skeleton_style(prefixCls);
  if (loading || !('loading' in props)) {
    const hasAvatar = !!avatar;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;
    // Avatar
    let avatarNode;
    if (hasAvatar) {
      const avatarProps = Object.assign(Object.assign({
        prefixCls: \`\${prefixCls}-avatar\`
      }, getAvatarBasicProps(hasTitle, hasParagraph)), getComponentProps(avatar));
      // We direct use SkeletonElement as avatar in skeleton internal.
      avatarNode = /*#__PURE__*/react.createElement("div", {
        className: \`\${prefixCls}-header\`
      }, /*#__PURE__*/react.createElement(skeleton_Element, Object.assign({}, avatarProps)));
    }
    let contentNode;
    if (hasTitle || hasParagraph) {
      // Title
      let $title;
      if (hasTitle) {
        const titleProps = Object.assign(Object.assign({
          prefixCls: \`\${prefixCls}-title\`
        }, getTitleBasicProps(hasAvatar, hasParagraph)), getComponentProps(title));
        $title = /*#__PURE__*/react.createElement(skeleton_Title, Object.assign({}, titleProps));
      }
      // Paragraph
      let paragraphNode;
      if (hasParagraph) {
        const paragraphProps = Object.assign(Object.assign({
          prefixCls: \`\${prefixCls}-paragraph\`
        }, getParagraphBasicProps(hasAvatar, hasTitle)), getComponentProps(paragraph));
        paragraphNode = /*#__PURE__*/react.createElement(skeleton_Paragraph, Object.assign({}, paragraphProps));
      }
      contentNode = /*#__PURE__*/react.createElement("div", {
        className: \`\${prefixCls}-content\`
      }, $title, paragraphNode);
    }
    const cls = classnames_default()(prefixCls, {
      [\`\${prefixCls}-with-avatar\`]: hasAvatar,
      [\`\${prefixCls}-active\`]: active,
      [\`\${prefixCls}-rtl\`]: direction === 'rtl',
      [\`\${prefixCls}-round\`]: round
    }, className, hashId);
    return wrapSSR( /*#__PURE__*/react.createElement("div", {
      className: cls,
      style: style
    }, avatarNode, contentNode));
  }
  return typeof children !== 'undefined' ? children : null;
};
Skeleton.Button = Button;
Skeleton.Avatar = Avatar;
Skeleton.Input = Input;
Skeleton.Image = Image;
Skeleton.Node = Node;
if (false) {}
/* harmony default export */ var skeleton_Skeleton = (Skeleton);
;// CONCATENATED MODULE: ./node_modules/antd/es/skeleton/index.js

/* harmony default export */ var skeleton = (skeleton_Skeleton);

//# sourceURL=webpack:///./node_modules/antd/es/skeleton/index.js_+_12_modules?`)},75081:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ spin; }
});

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(94184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: ./node_modules/throttle-debounce/esm/index.js
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
 *                                            are most useful.
 * @param {Function} callback -               A function to be executed after delay milliseconds. The \`this\` context and all arguments are passed through,
 *                                            as-is, to \`callback\` when the throttled-function is executed.
 * @param {object} [options] -              An object to configure options.
 * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every \`delay\` milliseconds
 *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
 *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
 *                                            \`delay\` milliseconds, the internal counter is reset).
 * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
 *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
 *                                            callback will never executed if both noLeading = true and noTrailing = true.
 * @param {boolean} [options.debounceMode] - If \`debounceMode\` is true (at begin), schedule \`clear\` to execute after \`delay\` ms. If \`debounceMode\` is
 *                                            false (at end), schedule \`callback\` to execute after \`delay\` ms.
 *
 * @returns {Function} A new, throttled, function.
 */
function throttle (delay, callback, options) {
  var _ref = options || {},
      _ref$noTrailing = _ref.noTrailing,
      noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing,
      _ref$noLeading = _ref.noLeading,
      noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading,
      _ref$debounceMode = _ref.debounceMode,
      debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * \`callback\` is executed at the proper times in \`throttle\` and \`end\`
   * debounce modes.
   */


  var timeoutID;
  var cancelled = false; // Keep track of the last time \`callback\` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel(options) {
    var _ref2 = options || {},
        _ref2$upcomingOnly = _ref2.upcomingOnly,
        upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;

    clearExistingTimeout();
    cancelled = !upcomingOnly;
  }
  /*
   * The \`wrapper\` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which \`callback\`
   * is executed.
   */


  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute \`callback\` and update the \`lastExec\` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If \`debounceMode\` is true (at begin) this is used to clear the flag
     * to allow future \`callback\` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (!noLeading && debounceMode && !timeoutID) {
      /*
       * Since \`wrapper\` is being called for the first time and
       * \`debounceMode\` is true (at begin), execute \`callback\`
       * and noLeading != true.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        /*
         * In throttle mode with noLeading, if \`delay\` time has
         * been exceeded, update \`lastExec\` and schedule \`callback\`
         * to execute after \`delay\` ms.
         */
        lastExec = Date.now();

        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        /*
         * In throttle mode without noLeading, if \`delay\` time has been exceeded, execute
         * \`callback\`.
         */
        exec();
      }
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since \`delay\` time has not been
       * exceeded, schedule \`callback\` to execute \`delay\` ms after most
       * recent execution.
       *
       * If \`debounceMode\` is true (at begin), schedule \`clear\` to execute
       * after \`delay\` ms.
       *
       * If \`debounceMode\` is false (at end), schedule \`callback\` to
       * execute after \`delay\` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

/* eslint-disable no-undefined */
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param {Function} callback -          A function to be executed after delay milliseconds. The \`this\` context and all arguments are passed through, as-is,
 *                                        to \`callback\` when the debounced-function is executed.
 * @param {object} [options] -           An object to configure options.
 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed \`delay\` milliseconds
 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                        (After the throttled-function has not been called for \`delay\` milliseconds, the internal counter is reset).
 *
 * @returns {Function} A new, debounced function.
 */

function debounce (delay, callback, options) {
  var _ref = options || {},
      _ref$atBegin = _ref.atBegin,
      atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;

  return throttle(delay, callback, {
    debounceMode: atBegin !== false
  });
}


//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/rc-util/es/omit.js
var omit = __webpack_require__(98423);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/context.js
var context = __webpack_require__(53124);
// EXTERNAL MODULE: ./node_modules/antd/es/_util/reactNode.js
var reactNode = __webpack_require__(96159);
// EXTERNAL MODULE: ./node_modules/@ant-design/cssinjs/es/index.js + 26 modules
var es = __webpack_require__(65178);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/genComponentStyleHook.js
var genComponentStyleHook = __webpack_require__(67968);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/statistic.js
var statistic = __webpack_require__(45503);
// EXTERNAL MODULE: ./node_modules/antd/es/style/index.js
var style = __webpack_require__(14747);
;// CONCATENATED MODULE: ./node_modules/antd/es/spin/style/index.js



const antSpinMove = new es/* Keyframes */.E4('antSpinMove', {
  to: {
    opacity: 1
  }
});
const antRotate = new es/* Keyframes */.E4('antRotate', {
  to: {
    transform: 'rotate(405deg)'
  }
});
const genSpinStyle = token => ({
  [\`\${token.componentCls}\`]: Object.assign(Object.assign({}, (0,style/* resetComponent */.Wf)(token)), {
    position: 'absolute',
    display: 'none',
    color: token.colorPrimary,
    textAlign: 'center',
    verticalAlign: 'middle',
    opacity: 0,
    transition: \`transform \${token.motionDurationSlow} \${token.motionEaseInOutCirc}\`,
    '&-spinning': {
      position: 'static',
      display: 'inline-block',
      opacity: 1
    },
    '&-nested-loading': {
      position: 'relative',
      [\`> div > \${token.componentCls}\`]: {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        zIndex: 4,
        display: 'block',
        width: '100%',
        height: '100%',
        maxHeight: token.contentHeight,
        [\`\${token.componentCls}-dot\`]: {
          position: 'absolute',
          top: '50%',
          insetInlineStart: '50%',
          margin: -token.spinDotSize / 2
        },
        [\`\${token.componentCls}-text\`]: {
          position: 'absolute',
          top: '50%',
          width: '100%',
          paddingTop: (token.spinDotSize - token.fontSize) / 2 + 2,
          textShadow: \`0 1px 2px \${token.colorBgContainer}\` // FIXME: shadow
        },

        [\`&\${token.componentCls}-show-text \${token.componentCls}-dot\`]: {
          marginTop: -(token.spinDotSize / 2) - 10
        },
        '&-sm': {
          [\`\${token.componentCls}-dot\`]: {
            margin: -token.spinDotSizeSM / 2
          },
          [\`\${token.componentCls}-text\`]: {
            paddingTop: (token.spinDotSizeSM - token.fontSize) / 2 + 2
          },
          [\`&\${token.componentCls}-show-text \${token.componentCls}-dot\`]: {
            marginTop: -(token.spinDotSizeSM / 2) - 10
          }
        },
        '&-lg': {
          [\`\${token.componentCls}-dot\`]: {
            margin: -(token.spinDotSizeLG / 2)
          },
          [\`\${token.componentCls}-text\`]: {
            paddingTop: (token.spinDotSizeLG - token.fontSize) / 2 + 2
          },
          [\`&\${token.componentCls}-show-text \${token.componentCls}-dot\`]: {
            marginTop: -(token.spinDotSizeLG / 2) - 10
          }
        }
      },
      [\`\${token.componentCls}-container\`]: {
        position: 'relative',
        transition: \`opacity \${token.motionDurationSlow}\`,
        '&::after': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          zIndex: 10,
          width: '100%',
          height: '100%',
          background: token.colorBgContainer,
          opacity: 0,
          transition: \`all \${token.motionDurationSlow}\`,
          content: '""',
          pointerEvents: 'none'
        }
      },
      [\`\${token.componentCls}-blur\`]: {
        clear: 'both',
        opacity: 0.5,
        userSelect: 'none',
        pointerEvents: 'none',
        [\`&::after\`]: {
          opacity: 0.4,
          pointerEvents: 'auto'
        }
      }
    },
    // tip
    // ------------------------------
    [\`&-tip\`]: {
      color: token.spinDotDefault
    },
    // dots
    // ------------------------------
    [\`\${token.componentCls}-dot\`]: {
      position: 'relative',
      display: 'inline-block',
      fontSize: token.spinDotSize,
      width: '1em',
      height: '1em',
      '&-item': {
        position: 'absolute',
        display: 'block',
        width: (token.spinDotSize - token.marginXXS / 2) / 2,
        height: (token.spinDotSize - token.marginXXS / 2) / 2,
        backgroundColor: token.colorPrimary,
        borderRadius: '100%',
        transform: 'scale(0.75)',
        transformOrigin: '50% 50%',
        opacity: 0.3,
        animationName: antSpinMove,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationDirection: 'alternate',
        '&:nth-child(1)': {
          top: 0,
          insetInlineStart: 0
        },
        '&:nth-child(2)': {
          top: 0,
          insetInlineEnd: 0,
          animationDelay: '0.4s'
        },
        '&:nth-child(3)': {
          insetInlineEnd: 0,
          bottom: 0,
          animationDelay: '0.8s'
        },
        '&:nth-child(4)': {
          bottom: 0,
          insetInlineStart: 0,
          animationDelay: '1.2s'
        }
      },
      '&-spin': {
        transform: 'rotate(45deg)',
        animationName: antRotate,
        animationDuration: '1.2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
      }
    },
    // Sizes
    // ------------------------------
    // small
    [\`&-sm \${token.componentCls}-dot\`]: {
      fontSize: token.spinDotSizeSM,
      i: {
        width: (token.spinDotSizeSM - token.marginXXS / 2) / 2,
        height: (token.spinDotSizeSM - token.marginXXS / 2) / 2
      }
    },
    // large
    [\`&-lg \${token.componentCls}-dot\`]: {
      fontSize: token.spinDotSizeLG,
      i: {
        width: (token.spinDotSizeLG - token.marginXXS) / 2,
        height: (token.spinDotSizeLG - token.marginXXS) / 2
      }
    },
    [\`&\${token.componentCls}-show-text \${token.componentCls}-text\`]: {
      display: 'block'
    }
  })
});
// ============================== Export ==============================
/* harmony default export */ var spin_style = ((0,genComponentStyleHook/* default */.Z)('Spin', token => {
  const spinToken = (0,statistic/* merge */.TS)(token, {
    spinDotDefault: token.colorTextDescription,
    spinDotSize: token.controlHeightLG / 2,
    spinDotSizeSM: token.controlHeightLG * 0.35,
    spinDotSizeLG: token.controlHeight
  });
  return [genSpinStyle(spinToken)];
}, {
  contentHeight: 400
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/spin/index.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};







const SpinSizes = (/* unused pure expression or super */ null && (['small', 'default', 'large']));
// Render indicator
let defaultIndicator = null;
function renderIndicator(prefixCls, props) {
  const {
    indicator
  } = props;
  const dotClassName = \`\${prefixCls}-dot\`;
  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }
  if ((0,reactNode/* isValidElement */.l$)(indicator)) {
    return (0,reactNode/* cloneElement */.Tm)(indicator, {
      className: classnames_default()(indicator.props.className, dotClassName)
    });
  }
  if ((0,reactNode/* isValidElement */.l$)(defaultIndicator)) {
    return (0,reactNode/* cloneElement */.Tm)(defaultIndicator, {
      className: classnames_default()(defaultIndicator.props.className, dotClassName)
    });
  }
  return /*#__PURE__*/react.createElement("span", {
    className: classnames_default()(dotClassName, \`\${prefixCls}-dot-spin\`)
  }, /*#__PURE__*/react.createElement("i", {
    className: \`\${prefixCls}-dot-item\`
  }), /*#__PURE__*/react.createElement("i", {
    className: \`\${prefixCls}-dot-item\`
  }), /*#__PURE__*/react.createElement("i", {
    className: \`\${prefixCls}-dot-item\`
  }), /*#__PURE__*/react.createElement("i", {
    className: \`\${prefixCls}-dot-item\`
  }));
}
function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}
const Spin = props => {
  const {
      spinPrefixCls: prefixCls,
      spinning: customSpinning = true,
      delay = 0,
      className,
      size = 'default',
      tip,
      wrapperClassName,
      style,
      children,
      hashId
    } = props,
    restProps = __rest(props, ["spinPrefixCls", "spinning", "delay", "className", "size", "tip", "wrapperClassName", "style", "children", "hashId"]);
  const [spinning, setSpinning] = react.useState(() => customSpinning && !shouldDelay(customSpinning, delay));
  react.useEffect(() => {
    const updateSpinning = debounce(delay, () => {
      setSpinning(customSpinning);
    });
    updateSpinning();
    return () => {
      var _a;
      (_a = updateSpinning === null || updateSpinning === void 0 ? void 0 : updateSpinning.cancel) === null || _a === void 0 ? void 0 : _a.call(updateSpinning);
    };
  }, [delay, customSpinning]);
  const isNestedPattern = react.useMemo(() => typeof children !== 'undefined', [children]);
  const {
    direction
  } = react.useContext(context/* ConfigContext */.E_);
  const spinClassName = classnames_default()(prefixCls, {
    [\`\${prefixCls}-sm\`]: size === 'small',
    [\`\${prefixCls}-lg\`]: size === 'large',
    [\`\${prefixCls}-spinning\`]: spinning,
    [\`\${prefixCls}-show-text\`]: !!tip,
    [\`\${prefixCls}-rtl\`]: direction === 'rtl'
  }, className, hashId);
  const containerClassName = classnames_default()(\`\${prefixCls}-container\`, {
    [\`\${prefixCls}-blur\`]: spinning
  });
  // fix https://fb.me/react-unknown-prop
  const divProps = (0,omit/* default */.Z)(restProps, ['indicator', 'prefixCls']);
  const spinElement = /*#__PURE__*/react.createElement("div", Object.assign({}, divProps, {
    style: style,
    className: spinClassName,
    "aria-live": "polite",
    "aria-busy": spinning
  }), renderIndicator(prefixCls, props), tip ? /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-text\`
  }, tip) : null);
  if (isNestedPattern) {
    return /*#__PURE__*/react.createElement("div", Object.assign({}, divProps, {
      className: classnames_default()(\`\${prefixCls}-nested-loading\`, wrapperClassName, hashId)
    }), spinning && /*#__PURE__*/react.createElement("div", {
      key: "loading"
    }, spinElement), /*#__PURE__*/react.createElement("div", {
      className: containerClassName,
      key: "container"
    }, children));
  }
  return spinElement;
};
const SpinFC = props => {
  const {
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = react.useContext(context/* ConfigContext */.E_);
  const spinPrefixCls = getPrefixCls('spin', customizePrefixCls);
  const [wrapSSR, hashId] = spin_style(spinPrefixCls);
  const spinClassProps = Object.assign(Object.assign({}, props), {
    spinPrefixCls,
    hashId
  });
  return wrapSSR( /*#__PURE__*/react.createElement(Spin, Object.assign({}, spinClassProps)));
};
SpinFC.setDefaultIndicator = indicator => {
  defaultIndicator = indicator;
};
if (false) {}
/* harmony default export */ var spin = (SpinFC);

//# sourceURL=webpack:///./node_modules/antd/es/spin/index.js_+_2_modules?`)},92195:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ theme; }
});

// EXTERNAL MODULE: ./node_modules/antd/es/theme/internal.js + 2 modules
var internal = __webpack_require__(64049);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/themes/default/index.js + 5 modules
var themes_default = __webpack_require__(67164);
// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/colors/es/index.js + 1 modules
var es = __webpack_require__(78589);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/themes/seed.js
var seed = __webpack_require__(2790);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/themes/shared/genColorMapToken.js
var genColorMapToken = __webpack_require__(57);
// EXTERNAL MODULE: ./node_modules/@ctrl/tinycolor/dist/module/index.js
var dist_module = __webpack_require__(10274);
;// CONCATENATED MODULE: ./node_modules/antd/es/theme/themes/dark/colorAlgorithm.js

const getAlphaColor = (baseColor, alpha) => new dist_module/* TinyColor */.C(baseColor).setAlpha(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
  const instance = new dist_module/* TinyColor */.C(baseColor);
  return instance.lighten(brightness).toHexString();
};
;// CONCATENATED MODULE: ./node_modules/antd/es/theme/themes/dark/colors.js


const generateColorPalettes = baseColor => {
  const colors = (0,es/* generate */.R_)(baseColor, {
    theme: 'dark'
  });
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[6],
    6: colors[5],
    7: colors[4],
    8: colors[6],
    9: colors[5],
    10: colors[4]
    // 8: colors[9],
    // 9: colors[8],
    // 10: colors[7],
  };
};

const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || '#000';
  const colorTextBase = textBaseColor || '#fff';
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),
    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),
    colorBgElevated: getSolidColor(colorBgBase, 12),
    colorBgContainer: getSolidColor(colorBgBase, 8),
    colorBgLayout: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getSolidColor(colorBgBase, 26),
    colorBorder: getSolidColor(colorBgBase, 26),
    colorBorderSecondary: getSolidColor(colorBgBase, 19)
  };
};
;// CONCATENATED MODULE: ./node_modules/antd/es/theme/themes/dark/index.js





const derivative = (token, mapToken) => {
  const colorPalettes = Object.keys(seed/* defaultPresetColors */.M).map(colorKey => {
    const colors = (0,es/* generate */.R_)(token[colorKey], {
      theme: 'dark'
    });
    return new Array(10).fill(1).reduce((prev, _, i) => {
      prev[\`\${colorKey}-\${i + 1}\`] = colors[i];
      return prev;
    }, {});
  }).reduce((prev, cur) => {
    prev = Object.assign(Object.assign({}, prev), cur);
    return prev;
  }, {});
  const mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : (0,themes_default/* default */.Z)(token);
  return Object.assign(Object.assign(Object.assign({}, mergedMapToken), colorPalettes), (0,genColorMapToken/* default */.Z)(token, {
    generateColorPalettes: generateColorPalettes,
    generateNeutralColorPalettes: generateNeutralColorPalettes
  }));
};
/* harmony default export */ var dark = (derivative);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/themes/shared/genControlHeight.js
var genControlHeight = __webpack_require__(372);
;// CONCATENATED MODULE: ./node_modules/antd/es/theme/themes/compact/genCompactSizeMapToken.js
function genSizeMapToken(token) {
  const {
    sizeUnit,
    sizeStep
  } = token;
  const compactSizeStep = sizeStep - 2;
  return {
    sizeXXL: sizeUnit * (compactSizeStep + 10),
    sizeXL: sizeUnit * (compactSizeStep + 6),
    sizeLG: sizeUnit * (compactSizeStep + 2),
    sizeMD: sizeUnit * (compactSizeStep + 2),
    sizeMS: sizeUnit * (compactSizeStep + 1),
    size: sizeUnit * compactSizeStep,
    sizeSM: sizeUnit * compactSizeStep,
    sizeXS: sizeUnit * (compactSizeStep - 1),
    sizeXXS: sizeUnit * (compactSizeStep - 1)
  };
}
// EXTERNAL MODULE: ./node_modules/antd/es/theme/themes/shared/genFontMapToken.js + 1 modules
var genFontMapToken = __webpack_require__(98378);
;// CONCATENATED MODULE: ./node_modules/antd/es/theme/themes/compact/index.js




const compact_derivative = (token, mapToken) => {
  const mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : (0,themes_default/* default */.Z)(token);
  const fontSize = mergedMapToken.fontSizeSM; // Smaller size font-size as base
  const controlHeight = mergedMapToken.controlHeight - 4;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mergedMapToken), genSizeMapToken(mapToken !== null && mapToken !== void 0 ? mapToken : token)), (0,genFontMapToken/* default */.Z)(fontSize)), {
    // controlHeight
    controlHeight
  }), (0,genControlHeight/* default */.Z)(Object.assign(Object.assign({}, mergedMapToken), {
    controlHeight
  })));
};
/* harmony default export */ var compact = (compact_derivative);
;// CONCATENATED MODULE: ./node_modules/antd/es/theme/index.js
/* eslint-disable import/prefer-default-export */




// ZombieJ: We export as object to user but array in internal.
// This is used to minimize the bundle size for antd package but safe to refactor as object also.
// Please do not export internal \`useToken\` directly to avoid something export unexpected.
/** Get current context Design Token. Will be different if you are using nest theme config. */
function useToken() {
  const [theme, token, hashId] = (0,internal/* useToken */.dQ)();
  return {
    theme,
    token,
    hashId
  };
}
/* harmony default export */ var theme = ({
  /** @private Test Usage. Do not use in production. */
  defaultConfig: internal/* defaultConfig */.u_,
  /** Default seedToken */
  defaultSeed: internal/* defaultConfig.token */.u_.token,
  useToken,
  defaultAlgorithm: themes_default/* default */.Z,
  darkAlgorithm: dark,
  compactAlgorithm: compact
});

//# sourceURL=webpack:///./node_modules/antd/es/theme/index.js_+_5_modules?`)},97435:function(__unused_webpack_module,__webpack_exports__){"use strict";eval(`function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  var shallowCopy = Object.assign({}, obj);

  for (var i = 0; i < fields.length; i += 1) {
    var key = fields[i];
    delete shallowCopy[key];
  }

  return shallowCopy;
}

/* harmony default export */ __webpack_exports__["Z"] = (omit);

//# sourceURL=webpack:///./node_modules/omit.js/es/index.js?`)},19158:function(__unused_webpack_module,exports){"use strict";eval(`

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = canUseDom;
function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

//# sourceURL=webpack:///./node_modules/rc-util/lib/Dom/canUseDom.js?`)},45520:function(__unused_webpack_module,exports){"use strict";eval(`

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.call = call;
exports["default"] = void 0;
exports.note = note;
exports.noteOnce = noteOnce;
exports.resetWarned = resetWarned;
exports.warning = warning;
exports.warningOnce = warningOnce;
/* eslint-disable no-console */
var warned = {};
function warning(valid, message) {
  // Support uglify
  if (false) {}
}
function note(valid, message) {
  // Support uglify
  if (false) {}
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
var _default = warningOnce;
/* eslint-enable */
exports["default"] = _default;

//# sourceURL=webpack:///./node_modules/rc-util/lib/warning.js?`)},64836:function(module){eval(`function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/interopRequireDefault.js?`)},59734:function(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__){"use strict";eval(`
// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J$": function() { return /* binding */ dist_SWRConfig; },
  "ZP": function() { return /* binding */ useSWR; },
  "kY": function() { return /* reexport */ useSWRConfig; }
});

// UNUSED EXPORTS: mutate, preload, unstable_serialize

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(61688);
;// CONCATENATED MODULE: ./node_modules/swr/_internal/dist/index.mjs


// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const noop = ()=>{};
// Using noop() as the undefined value as undefined can be replaced
// by something else. Prettier ignore and extra parentheses are necessary here
// to ensure that tsc doesn't remove the __NOINLINE__ comment.
// prettier-ignore
const UNDEFINED = /*#__NOINLINE__*/ noop();
const OBJECT = Object;
const isUndefined = (v)=>v === UNDEFINED;
const isFunction = (v)=>typeof v == 'function';
const mergeObjects = (a, b)=>({
        ...a,
        ...b
    });
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>cache.get(key) || EMPTY_CACHE,
        // Setter
        (info)=>{
            const prev = cache.get(key);
            state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
        },
        // Subscriber
        state[6]
    ];
};

// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();
// counter of the key
let counter = 0;
// A stable hash implementation that supports:
// - Fast and ensures unique hash properties
// - Handles unserializable values
// - Handles object key ordering
// - Generates short results
//
// This is not a serialization function, and the result is not guaranteed to be
// parsable.
const stableHash = (arg)=>{
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
        // Object/function, not null/date/regexp. Use WeakMap to store the id first.
        // If it's already hashed, directly return the result.
        result = table.get(arg);
        if (result) return result;
        // Store the hash first for circular reference detection before entering the
        // recursive \`stableHash\` calls.
        // For other objects like set and map, we use this id directly as the hash.
        result = ++counter + '~';
        table.set(arg, result);
        if (constructor == Array) {
            // Array.
            result = '@';
            for(index = 0; index < arg.length; index++){
                result += stableHash(arg[index]) + ',';
            }
            table.set(arg, result);
        }
        if (constructor == OBJECT) {
            // Object, sort keys.
            result = '#';
            const keys = OBJECT.keys(arg).sort();
            while(!isUndefined(index = keys.pop())){
                if (!isUndefined(arg[index])) {
                    result += index + ':' + stableHash(arg[index]) + ',';
                }
            }
            table.set(arg, result);
        }
    } else {
        result = isDate ? arg.toJSON() : type == 'symbol' ? arg.toString() : type == 'string' ? JSON.stringify(arg) : '' + arg;
    }
    return result;
};

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on \`navigator.onLine\`.
 * As a workaround, we always assume it's online on the first load, and change
 * the status upon \`online\` or \`offline\` events.
 */ let online = true;
const isOnline = ()=>online;
// For node and React Native, \`add/removeEventListener\` doesn't exist on window.
const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
] : [
    noop,
    noop
];
const isVisible = ()=>{
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== 'hidden';
};
const initFocus = (callback)=>{
    // focus revalidate
    if (isDocumentDefined) {
        document.addEventListener('visibilitychange', callback);
    }
    onWindowEvent('focus', callback);
    return ()=>{
        if (isDocumentDefined) {
            document.removeEventListener('visibilitychange', callback);
        }
        offWindowEvent('focus', callback);
    };
};
const initReconnect = (callback)=>{
    // revalidate on reconnected
    const onOnline = ()=>{
        online = true;
        callback();
    };
    // nothing to revalidate, just update the status
    const onOffline = ()=>{
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return ()=>{
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
const preset = {
    isOnline,
    isVisible
};
const defaultConfigOptions = {
    initFocus,
    initReconnect
};

const IS_REACT_LEGACY = !react.useId;
const IS_SERVER = !isWindowDefined || 'Deno' in window;
// Polyfill requestAnimationFrame
const rAF = (f)=>hasRequestAnimationFrame() ? window['requestAnimationFrame'](f) : setTimeout(f, 1);
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = IS_SERVER ? react.useEffect : react.useLayoutEffect;
// This assignment is to extend the Navigator type to use effectiveType.
const navigatorConnection = typeof navigator !== 'undefined' && navigator.connection;
// Adjust the config based on slow connection status (<= 70Kbps).
const slowConnection = !IS_SERVER && navigatorConnection && ([
    'slow-2g',
    '2g'
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);

const dist_serialize = (key)=>{
    if (isFunction(key)) {
        try {
            key = key();
        } catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    // Use the original key as the argument of fetcher. This can be a string or an
    // array of values.
    const args = key;
    // If key is not falsy, or not an empty array, hash it.
    key = typeof key == 'string' ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : '';
    return [
        key,
        args
    ];
};

// Global timestamp.
let __timestamp = 0;
const getTimestamp = ()=>++__timestamp;

const FOCUS_EVENT = 0;
const RECONNECT_EVENT = 1;
const MUTATE_EVENT = 2;

var constants = {
  __proto__: null,
  FOCUS_EVENT: FOCUS_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT,
  MUTATE_EVENT: MUTATE_EVENT
};

async function internalMutate(...args) {
    const [cache, _key, _data, _opts] = args;
    // When passing as a boolean, it's explicitly used to disable/enable
    // revalidation.
    const options = mergeObjects({
        populateCache: true,
        throwOnError: true
    }, typeof _opts === 'boolean' ? {
        revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const revalidate = options.revalidate !== false;
    const rollbackOnError = (error)=>{
        return typeof rollbackOnErrorOption === 'function' ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    // If the second argument is a key filter, return the mutation results for all
    // filtered keys.
    if (isFunction(_key)) {
        const keyFilter = _key;
        const matchedKeys = [];
        const it = cache.keys();
        for(let keyIt = it.next(); !keyIt.done; keyIt = it.next()){
            const key = keyIt.value;
            if (// Skip the special useSWRInfinite keys.
            !key.startsWith('$inf$') && keyFilter(cache.get(key)._k)) {
                matchedKeys.push(key);
            }
        }
        return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
        // Serialize key
        const [key] = dist_serialize(_k);
        if (!key) return;
        const [get, set] = createCacheHelper(cache, key);
        const [EVENT_REVALIDATORS, MUTATION, FETCH] = SWRGlobalState.get(cache);
        const revalidators = EVENT_REVALIDATORS[key];
        const startRevalidate = ()=>{
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
                if (revalidators && revalidators[0]) {
                    return revalidators[0](MUTATE_EVENT).then(()=>get().data);
                }
            }
            return get().data;
        };
        // If there is no new data provided, revalidate the key with current state.
        if (args.length < 3) {
            // Revalidate and broadcast state.
            return startRevalidate();
        }
        let data = _data;
        let error;
        // Update global timestamps.
        const beforeMutationTs = getTimestamp();
        MUTATION[key] = [
            beforeMutationTs,
            0
        ];
        const hasOptimisticData = !isUndefined(optimisticData);
        const state = get();
        // \`displayedData\` is the current value on screen. It could be the optimistic value
        // that is going to be overridden by a \`committedData\`, or get reverted back.
        // \`committedData\` is the validated value that comes from a fetch or mutation.
        const displayedData = state.data;
        const currentData = state._c;
        const committedData = isUndefined(currentData) ? displayedData : currentData;
        // Do optimistic data update.
        if (hasOptimisticData) {
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData) : optimisticData;
            // When we set optimistic data, backup the current committedData data in \`_c\`.
            set({
                data: optimisticData,
                _c: committedData
            });
        }
        if (isFunction(data)) {
            // \`data\` is a function, call it passing current cache value.
            try {
                data = data(committedData);
            } catch (err) {
                // If it throws an error synchronously, we shouldn't update the cache.
                error = err;
            }
        }
        // \`data\` is a promise/thenable, resolve the final data first.
        if (data && isFunction(data.then)) {
            // This means that the mutation is async, we need to check timestamps to
            // avoid race conditions.
            data = await data.catch((err)=>{
                error = err;
            });
            // Check if other mutations have occurred since we've started this mutation.
            // If there's a race we don't update cache or broadcast the change,
            // just return the data.
            if (beforeMutationTs !== MUTATION[key][0]) {
                if (error) throw error;
                return data;
            } else if (error && hasOptimisticData && rollbackOnError(error)) {
                // Rollback. Always populate the cache in this case but without
                // transforming the data.
                populateCache = true;
                data = committedData;
                // Reset data to be the latest committed data, and clear the \`_c\` value.
                set({
                    data,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    data = populateCache(data, committedData);
                }
                // Only update cached data if there's no error. Data can be \`undefined\` here.
                set({
                    data,
                    _c: UNDEFINED
                });
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        const res = await startRevalidate();
        // The mutation and revalidation are ended, we can clear it since the data is
        // not an optimistic value anymore.
        set({
            _c: UNDEFINED
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return populateCache ? res : data;
    }
}

const revalidateAllKeys = (revalidators, type)=>{
    for(const key in revalidators){
        if (revalidators[key][0]) revalidators[key][0](type);
    }
};
const initCache = (provider, options)=>{
    // The global state for a specific provider will be used to deduplicate
    // requests and store listeners. As well as a mutate function that is bound to
    // the cache.
    // The provider's global state might be already initialized. Let's try to get the
    // global state associated with the provider first.
    if (!SWRGlobalState.has(provider)) {
        const opts = mergeObjects(defaultConfigOptions, options);
        // If there's no global state bound to the provider, create a new one with the
        // new mutate function.
        const EVENT_REVALIDATORS = {};
        const mutate = internalMutate.bind(UNDEFINED, provider);
        let unmount = noop;
        const subscriptions = {};
        const subscribe = (key, callback)=>{
            const subs = subscriptions[key] || [];
            subscriptions[key] = subs;
            subs.push(callback);
            return ()=>subs.splice(subs.indexOf(callback), 1);
        };
        const setter = (key, value, prev)=>{
            provider.set(key, value);
            const subs = subscriptions[key];
            if (subs) {
                for(let i = subs.length; i--;){
                    subs[i](prev, value);
                }
            }
        };
        const initProvider = ()=>{
            if (!SWRGlobalState.has(provider)) {
                // Update the state if it's new, or if the provider has been extended.
                SWRGlobalState.set(provider, [
                    EVENT_REVALIDATORS,
                    {},
                    {},
                    {},
                    mutate,
                    setter,
                    subscribe
                ]);
                if (!IS_SERVER) {
                    // When listening to the native events for auto revalidations,
                    // we intentionally put a delay (setTimeout) here to make sure they are
                    // fired after immediate JavaScript executions, which can be
                    // React's state updates.
                    // This avoids some unnecessary revalidations such as
                    // https://github.com/vercel/swr/issues/1680.
                    const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
                    const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
                    unmount = ()=>{
                        releaseFocus && releaseFocus();
                        releaseReconnect && releaseReconnect();
                        // When un-mounting, we need to remove the cache provider from the state
                        // storage too because it's a side-effect. Otherwise, when re-mounting we
                        // will not re-register those event listeners.
                        SWRGlobalState.delete(provider);
                    };
                }
            }
        };
        initProvider();
        // This is a new provider, we need to initialize it and setup DOM events
        // listeners for \`focus\` and \`reconnect\` actions.
        // We might want to inject an extra layer on top of \`provider\` in the future,
        // such as key serialization, auto GC, etc.
        // For now, it's just a \`Map\` interface without any modifications.
        return [
            provider,
            mutate,
            initProvider,
            unmount
        ];
    }
    return [
        provider,
        SWRGlobalState.get(provider)[4]
    ];
};

// error retry
const onErrorRetry = (_, __, config, revalidate, opts)=>{
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    // Exponential backoff
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
        return;
    }
    setTimeout(revalidate, timeout, opts);
};
const compare = (currentData, newData)=>stableHash(currentData) == stableHash(newData);
// Default cache provider
const [cache, mutate] = initCache(new Map());
// Default config
const defaultConfig = mergeObjects({
    // events
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 10000 : 5000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: slowConnection ? 5000 : 3000,
    // providers
    compare,
    isPaused: ()=>false,
    cache,
    mutate,
    fallback: {}
}, // use web preset by default
preset);

const mergeConfigs = (a, b)=>{
    // Need to create a new object to avoid mutating the original here.
    const v = mergeObjects(a, b);
    // If two configs are provided, merge their \`use\` and \`fallback\` options.
    if (b) {
        const { use: u1 , fallback: f1  } = a;
        const { use: u2 , fallback: f2  } = b;
        if (u1 && u2) {
            v.use = u1.concat(u2);
        }
        if (f1 && f2) {
            v.fallback = mergeObjects(f1, f2);
        }
    }
    return v;
};

const SWRConfigContext = (0,react.createContext)({});
const SWRConfig = (props)=>{
    const { value  } = props;
    const parentConfig = (0,react.useContext)(SWRConfigContext);
    const isFunctionalConfig = isFunction(value);
    const config = (0,react.useMemo)(()=>isFunctionalConfig ? value(parentConfig) : value, [
        isFunctionalConfig,
        parentConfig,
        value
    ]);
    // Extend parent context values and middleware.
    const extendedConfig = (0,react.useMemo)(()=>isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
        isFunctionalConfig,
        parentConfig,
        config
    ]);
    // Should not use the inherited provider.
    const provider = config && config.provider;
    // Use a lazy initialized state to create the cache on first access.
    const [cacheContext] = (0,react.useState)(()=>provider ? initCache(provider(extendedConfig.cache || cache), config) : UNDEFINED);
    // Override the cache if a new provider is given.
    if (cacheContext) {
        extendedConfig.cache = cacheContext[0];
        extendedConfig.mutate = cacheContext[1];
    }
    // Unsubscribe events.
    useIsomorphicLayoutEffect(()=>{
        if (cacheContext) {
            cacheContext[2] && cacheContext[2]();
            return cacheContext[3];
        }
    }, []);
    return (0,react.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
        value: extendedConfig
    }));
};

// @ts-expect-error
const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
const use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
const setupDevTools = ()=>{
    if (enableDevtools) {
        // @ts-expect-error
        window.__SWR_DEVTOOLS_REACT__ = react;
    }
};

const normalize = (args)=>{
    return isFunction(args[1]) ? [
        args[0],
        args[1],
        args[2] || {}
    ] : [
        args[0],
        null,
        (args[1] === null ? args[2] : args[1]) || {}
    ];
};

const useSWRConfig = ()=>{
    return mergeObjects(defaultConfig, (0,react.useContext)(SWRConfigContext));
};

const preload = (key_, fetcher)=>{
    const key = dist_serialize(key_)[0];
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(key_);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const key = dist_serialize(key_)[0];
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            const req = PRELOAD[key];
            if (req) {
                delete PRELOAD[key];
                return req;
            }
            return fetcher_(...args);
        });
        return useSWRNext(key_, fetcher, config);
    };

const BUILT_IN_MIDDLEWARE = use.concat(middleware);

// It's tricky to pass generic types as parameters, so we just directly override
// the types here.
const withArgs = (hook)=>{
    return function useSWRArgs(...args) {
        // Get the default and inherited configuration.
        const fallbackConfig = useSWRConfig();
        // Normalize arguments.
        const [key, fn, _config] = normalize(args);
        // Merge configurations.
        const config = mergeConfigs(fallbackConfig, _config);
        // Apply middleware
        let next = hook;
        const { use  } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

/**
 * An implementation of state with dependency-tracking.
 */ const useStateWithDeps = (state)=>{
    const rerender = useState({})[1];
    const unmountedRef = useRef(false);
    const stateRef = useRef(state);
    // If a state property (data, error, or isValidating) is accessed by the render
    // function, we mark the property as a dependency so if it is updated again
    // in the future, we trigger a rerender.
    // This is also known as dependency-tracking.
    const stateDependenciesRef = useRef({
        data: false,
        error: false,
        isValidating: false
    });
    /**
   * @param payload To change stateRef, pass the values explicitly to setState:
   * @example
   * \`\`\`js
   * setState({
   *   isValidating: false
   *   data: newData // set data to newData
   *   error: undefined // set error to undefined
   * })
   *
   * setState({
   *   isValidating: false
   *   data: undefined // set data to undefined
   *   error: err // set error to err
   * })
   * \`\`\`
   */ const setState = useCallback((payload)=>{
        let shouldRerender = false;
        const currentState = stateRef.current;
        for(const _ in payload){
            const k = _;
            // If the property has changed, update the state and mark rerender as
            // needed.
            if (currentState[k] !== payload[k]) {
                currentState[k] = payload[k];
                // If the property is accessed by the component, a rerender should be
                // triggered.
                if (stateDependenciesRef.current[k]) {
                    shouldRerender = true;
                }
            }
        }
        if (shouldRerender && !unmountedRef.current) {
            if (IS_REACT_LEGACY) {
                rerender({});
            } else {
                React.startTransition(()=>rerender({}));
            }
        }
    }, // config.suspense isn't allowed to change during the lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    useIsomorphicLayoutEffect(()=>{
        unmountedRef.current = false;
        return ()=>{
            unmountedRef.current = true;
        };
    });
    return [
        stateRef,
        stateDependenciesRef.current,
        setState
    ];
};

// Add a callback function to a list of keyed callback functions and return
// the unsubscribe function.
const subscribeCallback = (key, callbacks, callback)=>{
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return ()=>{
        const index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
            // O(1): faster than splice
            keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
            keyedRevalidators.pop();
        }
    };
};

// Create a custom hook with a middleware
const withMiddleware = (useSWR, middleware)=>{
    return (...args)=>{
        const [key, fn, config] = normalize(args);
        const uses = (config.use || []).concat(middleware);
        return useSWR(key, fn, {
            ...config,
            use: uses
        });
    };
};

setupDevTools();



;// CONCATENATED MODULE: ./node_modules/swr/core/dist/index.mjs





const WITH_DEDUPE = {
    dedupe: true
};
const useSWRHandler = (_key, fetcher, config)=>{
    const { cache , compare , suspense , fallbackData , revalidateOnMount , refreshInterval , refreshWhenHidden , refreshWhenOffline , keepPreviousData  } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH] = SWRGlobalState.get(cache);
    // \`key\` is the identifier of the SWR \`data\` state, \`keyInfo\` holds extra
    // states such as \`error\` and \`isValidating\` inside,
    // all of them are derived from \`_key\`.
    // \`fnArg\` is the argument/arguments parsed from the key, which will be passed
    // to the fetcher.
    const [key, fnArg] = dist_serialize(_key);
    // If it's the initial render of this hook.
    const initialMountedRef = (0,react.useRef)(false);
    // If the hook is unmounted already. This will be used to prevent some effects
    // to be called after unmounting.
    const unmountedRef = (0,react.useRef)(false);
    // Refs to keep the key and config.
    const keyRef = (0,react.useRef)(key);
    const fetcherRef = (0,react.useRef)(fetcher);
    const configRef = (0,react.useRef)(config);
    const getConfig = ()=>configRef.current;
    const isActive = ()=>getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache] = createCacheHelper(cache, key);
    const stateDependencies = (0,react.useRef)({}).current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fallback = isUndefined(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current)=>{
        let equal = true;
        for(const _ in stateDependencies){
            const t = _;
            if (!compare(current[t], prev[t])) {
                if (t === 'data' && isUndefined(prev[t])) {
                    if (!compare(current[t], returnedData)) {
                        equal = false;
                    }
                } else {
                    equal = false;
                }
            }
        }
        return equal;
    };
    const getSnapshot = (0,react.useMemo)(()=>{
        const shouldStartRequest = (()=>{
            if (!key) return false;
            if (!fetcher) return false;
            // If \`revalidateOnMount\` is set, we take the value directly.
            if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
            // If it's paused, we skip revalidation.
            if (getConfig().isPaused()) return false;
            if (suspense) return false;
            return true;
        })();
        const getSelectedCache = ()=>{
            const state = getCache();
            // We only select the needed fields from the state.
            const snapshot = mergeObjects(state);
            delete snapshot._k;
            if (!shouldStartRequest) {
                return snapshot;
            }
            return {
                isValidating: true,
                isLoading: true,
                ...snapshot
            };
        };
        let memorizedSnapshot = getSelectedCache();
        return ()=>{
            const snapshot = getSelectedCache();
            return isEqual(snapshot, memorizedSnapshot) ? memorizedSnapshot : memorizedSnapshot = snapshot;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cache,
        key
    ]);
    // Get the current state that SWR should return.
    const cached = (0,shim.useSyncExternalStore)((0,react.useCallback)((callback)=>subscribeCache(key, (prev, current)=>{
            if (!isEqual(prev, current)) callback();
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        cache,
        key
    ]), getSnapshot, getSnapshot);
    const isInitialMount = !initialMountedRef.current;
    const cachedData = cached.data;
    const data = isUndefined(cachedData) ? fallback : cachedData;
    const error = cached.error;
    // Use a ref to store previously returned data. Use the initial data as its initial value.
    const laggyDataRef = (0,react.useRef)(data);
    const returnedData = keepPreviousData ? isUndefined(cachedData) ? laggyDataRef.current : cachedData : data;
    // - Suspense mode and there's stale data for the initial render.
    // - Not suspense mode and there is no fallback data and \`revalidateIfStale\` is enabled.
    // - \`revalidateIfStale\` is enabled but \`data\` is not defined.
    const shouldDoInitialRevalidation = (()=>{
        // If \`revalidateOnMount\` is set, we take the value directly.
        if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
        // If it's paused, we skip revalidation.
        if (getConfig().isPaused()) return false;
        // Under suspense mode, it will always fetch on render if there is no
        // stale data so no need to revalidate immediately mount it again.
        // If data exists, only revalidate if \`revalidateIfStale\` is true.
        if (suspense) return isUndefined(data) ? false : config.revalidateIfStale;
        // If there is no stale data, we need to revalidate when mount;
        // If \`revalidateIfStale\` is set to true, we will always revalidate.
        return isUndefined(data) || config.revalidateIfStale;
    })();
    // Resolve the default validating state:
    // If it's able to validate, and it should revalidate when mount, this will be true.
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    // The revalidation function is a carefully crafted wrapper of the original
    // \`fetcher\`, to correctly handle the many edge cases.
    const revalidate = (0,react.useCallback)(async (revalidateOpts)=>{
        const currentFetcher = fetcherRef.current;
        if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
            return false;
        }
        let newData;
        let startAt;
        let loading = true;
        const opts = revalidateOpts || {};
        // If there is no ongoing concurrent request, or \`dedupe\` is not set, a
        // new request should be initiated.
        const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
        /*
         For React 17
         Do unmount check for calls:
         If key has changed during the revalidation, or the component has been
         unmounted, old dispatch and old event callbacks should not take any
         effect

        For React 18
        only check if key has changed
        https://github.com/reactwg/react-18/discussions/82
      */ const callbackSafeguard = ()=>{
            if (IS_REACT_LEGACY) {
                return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
            }
            return key === keyRef.current;
        };
        // The final state object when the request finishes.
        const finalState = {
            isValidating: false,
            isLoading: false
        };
        const finishRequestAndUpdateState = ()=>{
            setCache(finalState);
        };
        const cleanupState = ()=>{
            // Check if it's still the same request before deleting it.
            const requestInfo = FETCH[key];
            if (requestInfo && requestInfo[1] === startAt) {
                delete FETCH[key];
            }
        };
        // Start fetching. Change the \`isValidating\` state, update the cache.
        const initialState = {
            isValidating: true
        };
        // It is in the \`isLoading\` state, if and only if there is no cached data.
        // This bypasses fallback data and laggy data.
        if (isUndefined(getCache().data)) {
            initialState.isLoading = true;
        }
        try {
            if (shouldStartNewRequest) {
                setCache(initialState);
                // If no cache is being rendered currently (it shows a blank page),
                // we trigger the loading slow event.
                if (config.loadingTimeout && isUndefined(getCache().data)) {
                    setTimeout(()=>{
                        if (loading && callbackSafeguard()) {
                            getConfig().onLoadingSlow(key, config);
                        }
                    }, config.loadingTimeout);
                }
                // Start the request and save the timestamp.
                // Key must be truthy if entering here.
                FETCH[key] = [
                    currentFetcher(fnArg),
                    getTimestamp()
                ];
            }
            [newData, startAt] = FETCH[key];
            newData = await newData;
            if (shouldStartNewRequest) {
                // If the request isn't interrupted, clean it up after the
                // deduplication interval.
                setTimeout(cleanupState, config.dedupingInterval);
            }
            // If there're other ongoing request(s), started after the current one,
            // we need to ignore the current one to avoid possible race conditions:
            //   req1------------------>res1        (current one)
            //        req2---------------->res2
            // the request that fired later will always be kept.
            // The timestamp maybe be \`undefined\` or a number
            if (!FETCH[key] || FETCH[key][1] !== startAt) {
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Clear error.
            finalState.error = UNDEFINED;
            // If there're other mutations(s), that overlapped with the current revalidation:
            // case 1:
            //   req------------------>res
            //       mutate------>end
            // case 2:
            //         req------------>res
            //   mutate------>end
            // case 3:
            //   req------------------>res
            //       mutate-------...---------->
            // we have to ignore the revalidation result (res) because it's no longer fresh.
            // meanwhile, a new revalidation should be triggered when the mutation ends.
            const mutationInfo = MUTATION[key];
            if (!isUndefined(mutationInfo) && // case 1
            (startAt <= mutationInfo[0] || // case 2
            startAt <= mutationInfo[1] || // case 3
            mutationInfo[1] === 0)) {
                finishRequestAndUpdateState();
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Deep compare with the latest state to avoid extra re-renders.
            // For local state, compare and assign.
            const cacheData = getCache().data;
            // Since the compare fn could be custom fn
            // cacheData might be different from newData even when compare fn returns True
            finalState.data = compare(cacheData, newData) ? cacheData : newData;
            // Trigger the successful callback if it's the original request.
            if (shouldStartNewRequest) {
                if (callbackSafeguard()) {
                    getConfig().onSuccess(newData, key, config);
                }
            }
        } catch (err) {
            cleanupState();
            const currentConfig = getConfig();
            const { shouldRetryOnError  } = currentConfig;
            // Not paused, we continue handling the error. Otherwise, discard it.
            if (!currentConfig.isPaused()) {
                // Get a new error, don't use deep comparison for errors.
                finalState.error = err;
                // Error event and retry logic. Only for the actual request, not
                // deduped ones.
                if (shouldStartNewRequest && callbackSafeguard()) {
                    currentConfig.onError(err, key, currentConfig);
                    if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
                        if (isActive()) {
                            // If it's inactive, stop. It will auto-revalidate when
                            // refocusing or reconnecting.
                            // When retrying, deduplication is always enabled.
                            currentConfig.onErrorRetry(err, key, currentConfig, revalidate, {
                                retryCount: (opts.retryCount || 0) + 1,
                                dedupe: true
                            });
                        }
                    }
                }
            }
        }
        // Mark loading as stopped.
        loading = false;
        // Update the current hook's state.
        finishRequestAndUpdateState();
        return true;
    }, // \`setState\` is immutable, and \`eventsCallback\`, \`fnArg\`, and
    // \`keyValidating\` are depending on \`key\`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // \`fn\` and \`config\` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // \`useSWR('key', () => fetch('/api/'), { suspense: true })\`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        key,
        cache
    ]);
    // Similar to the global mutate but bound to the current cache and key.
    // \`cache\` isn't allowed to change during the lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const boundMutate = (0,react.useCallback)(// Use callback to make sure \`keyRef.current\` returns latest result every time
    (...args)=>{
        return internalMutate(cache, keyRef.current, ...args);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // The logic for updating refs.
    useIsomorphicLayoutEffect(()=>{
        fetcherRef.current = fetcher;
        configRef.current = config;
        // Handle laggy data updates. If there's cached data of the current key,
        // it'll be the correct reference.
        if (!isUndefined(cachedData)) {
            laggyDataRef.current = cachedData;
        }
    });
    // After mounted or key changed.
    useIsomorphicLayoutEffect(()=>{
        if (!key) return;
        const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
        // Expose revalidators to global event listeners. So we can trigger
        // revalidation from the outside.
        let nextFocusRevalidatedAt = 0;
        const onRevalidate = (type)=>{
            if (type == constants.FOCUS_EVENT) {
                const now = Date.now();
                if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
                    nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
                    softRevalidate();
                }
            } else if (type == constants.RECONNECT_EVENT) {
                if (getConfig().revalidateOnReconnect && isActive()) {
                    softRevalidate();
                }
            } else if (type == constants.MUTATE_EVENT) {
                return revalidate();
            }
            return;
        };
        const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
        // Mark the component as mounted and update corresponding refs.
        unmountedRef.current = false;
        keyRef.current = key;
        initialMountedRef.current = true;
        // Keep the original key in the cache.
        setCache({
            _k: fnArg
        });
        // Trigger a revalidation.
        if (shouldDoInitialRevalidation) {
            if (isUndefined(data) || IS_SERVER) {
                // Revalidate immediately.
                softRevalidate();
            } else {
                // Delay the revalidate if we have data to return so we won't block
                // rendering.
                rAF(softRevalidate);
            }
        }
        return ()=>{
            // Mark it as unmounted.
            unmountedRef.current = true;
            unsubEvents();
        };
    }, [
        key
    ]);
    // Polling
    useIsomorphicLayoutEffect(()=>{
        let timer;
        function next() {
            // Use the passed interval
            // ...or invoke the function with the updated data to get the interval
            const interval = isFunction(refreshInterval) ? refreshInterval(data) : refreshInterval;
            // We only start the next interval if \`refreshInterval\` is not 0, and:
            // - \`force\` is true, which is the start of polling
            // - or \`timer\` is not 0, which means the effect wasn't canceled
            if (interval && timer !== -1) {
                timer = setTimeout(execute, interval);
            }
        }
        function execute() {
            // Check if it's OK to execute:
            // Only revalidate when the page is visible, online, and not errored.
            if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
                revalidate(WITH_DEDUPE).then(next);
            } else {
                // Schedule the next interval to check again.
                next();
            }
        }
        next();
        return ()=>{
            if (timer) {
                clearTimeout(timer);
                timer = -1;
            }
        };
    }, [
        refreshInterval,
        refreshWhenHidden,
        refreshWhenOffline,
        key
    ]);
    // Display debug info in React DevTools.
    (0,react.useDebugValue)(returnedData);
    // In Suspense mode, we can't return the empty \`data\` state.
    // If there is an \`error\`, the \`error\` needs to be thrown to the error boundary.
    // If there is no \`error\`, the \`revalidation\` promise needs to be thrown to
    // the suspense boundary.
    if (suspense && isUndefined(data) && key) {
        // SWR should throw when trying to use Suspense on the server with React 18,
        // without providing any initial data. See:
        // https://github.com/vercel/swr/issues/1832
        if (!IS_REACT_LEGACY && IS_SERVER) {
            throw new Error('Fallback data is required when using suspense in SSR.');
        }
        // Always update fetcher and config refs even with the Suspense mode.
        fetcherRef.current = fetcher;
        configRef.current = config;
        unmountedRef.current = false;
        throw isUndefined(error) ? revalidate(WITH_DEDUPE) : error;
    }
    return {
        mutate: boundMutate,
        get data () {
            stateDependencies.data = true;
            return returnedData;
        },
        get error () {
            stateDependencies.error = true;
            return error;
        },
        get isValidating () {
            stateDependencies.isValidating = true;
            return isValidating;
        },
        get isLoading () {
            stateDependencies.isLoading = true;
            return isLoading;
        }
    };
};
const dist_SWRConfig = OBJECT.defineProperty(SWRConfig, 'defaultValue', {
    value: defaultConfig
});
const unstable_serialize = (key)=>serialize(key)[0];
/**
 * A hook to fetch data.
 *
 * @link https://swr.vercel.app
 * @example
 * \`\`\`jsx
 * import useSWR from 'swr'
 * function Profile() {
 *   const { data, error } = useSWR('/api/user', fetcher)
 *   if (error) return <div>failed to load</div>
 *   if (!data) return <div>loading...</div>
 *   return <div>hello {data.name}!</div>
 * }
 * \`\`\`
 */ var useSWR = withArgs(useSWRHandler);

// useSWR




//# sourceURL=webpack:///./node_modules/swr/core/dist/index.mjs_+_1_modules?`)}}]);
