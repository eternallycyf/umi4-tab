(self.webpackChunk=self.webpackChunk||[]).push([[301],{16254:function(module){eval(`/**
 * Expose \`pathToRegexp\`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\\\d+)?" => ["test", "\\d+", undefined, "?"]
  // "(\\\\d+)"  => [undefined, undefined, "\\d+", undefined]
  '(?:\\\\:(\\\\w+)(?:\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))?|\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token)

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:\${}()[\\]|/\\\\])/g, '\\\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\\((?!\\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var start = options.start !== false
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = start ? '^' : ''
  var isEndDelimited = tokens.length === 0

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += escapeString(token.prefix) + '(' + capture + ')?'
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?'
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using \`/user/:id\`, \`keys\` will
 * contain \`[{ name: 'id', delimiter: '/', optional: false, repeat: false }]\`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


//# sourceURL=webpack:///./node_modules/@ant-design/pro-layout/node_modules/path-to-regexp/index.js?`)},63781:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";eval(`// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ plugin_layout_Layout; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(27424);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(861);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread2.js
var objectSpread2 = __webpack_require__(42122);
var objectSpread2_default = /*#__PURE__*/__webpack_require__.n(objectSpread2);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__(74704);
var createForOfIteratorHelper_default = /*#__PURE__*/__webpack_require__.n(createForOfIteratorHelper);
// EXTERNAL MODULE: ./src/.umi-production/exports.ts + 20 modules
var _umi_production_exports = __webpack_require__(62030);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
var regeneratorRuntime = __webpack_require__(74165);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(15861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(45987);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var esm_slicedToArray = __webpack_require__(97685);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var esm_objectSpread2 = __webpack_require__(1413);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-provider/es/index.js + 25 modules
var es = __webpack_require__(73964);
// EXTERNAL MODULE: ./node_modules/rc-util/lib/hooks/useMergedState.js
var useMergedState = __webpack_require__(60869);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-utils/es/isBrowser/index.js
var isBrowser = __webpack_require__(12044);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/hooks/useDocumentTitle/index.js


function useDocumentTitle(titleInfo, appDefaultTitle) {
  var titleText = typeof titleInfo.pageName === 'string' ? titleInfo.title : appDefaultTitle;
  (0,react.useEffect)(function () {
    if ((0,isBrowser/* isBrowser */.j)() && titleText) {
      document.title = titleText;
    }
  }, [titleInfo.title, titleText]);
}
// EXTERNAL MODULE: ./node_modules/@umijs/route-utils/es/path-to-regexp.js
var path_to_regexp = __webpack_require__(47930);
;// CONCATENATED MODULE: ./node_modules/@umijs/route-utils/es/sha265.js
/* eslint-disable no-redeclare */

/* eslint-disable no-multi-assign */

/* eslint-disable no-param-reassign */

/* eslint-disable no-return-assign */

/* eslint-disable no-new-wrappers */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-var */

/* eslint-disable no-plusplus */

/* eslint-disable prefer-destructuring */

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable block-scoped-var */

/* eslint-disable vars-on-top */

/* eslint-disable no-bitwise */

/* eslint-disable no-cond-assign */

/*
 * A JavaScript implementation of the SHA256 hash function.
 *
 * FILE:	sha256.js
 * VERSION:	0.8
 * AUTHOR:	Christoph Bichlmeier <informatik@zombiearena.de>
 *
 * NOTE: This version is not tested thoroughly!
 *
 * Copyright (c) 2003, Christoph Bichlmeier
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * ======================================================================
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS
 * OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* SHA256 logical functions */
function rotateRight(n, x) {
  return x >>> n | x << 32 - n;
}

function choice(x, y, z) {
  return x & y ^ ~x & z;
}

function majority(x, y, z) {
  return x & y ^ x & z ^ y & z;
}

function sha256_Sigma0(x) {
  return rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x);
}

function sha256_Sigma1(x) {
  return rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x);
}

function sha256_sigma0(x) {
  return rotateRight(7, x) ^ rotateRight(18, x) ^ x >>> 3;
}

function sha256_sigma1(x) {
  return rotateRight(17, x) ^ rotateRight(19, x) ^ x >>> 10;
}

function sha256_expand(W, j) {
  return W[j & 0x0f] += sha256_sigma1(W[j + 14 & 0x0f]) + W[j + 9 & 0x0f] + sha256_sigma0(W[j + 1 & 0x0f]);
}
/* Hash constant words K: */


var K256 = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
/* global arrays */

var ihash;
var count;
var buffer;
var sha256_hex_digits = '0123456789abcdef';
/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
overflow) */

function safe_add(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/* Initialise the SHA256 computation */


function sha256_init() {
  ihash = new Array(8);
  count = new Array(2);
  buffer = new Array(64);
  count[0] = count[1] = 0;
  ihash[0] = 0x6a09e667;
  ihash[1] = 0xbb67ae85;
  ihash[2] = 0x3c6ef372;
  ihash[3] = 0xa54ff53a;
  ihash[4] = 0x510e527f;
  ihash[5] = 0x9b05688c;
  ihash[6] = 0x1f83d9ab;
  ihash[7] = 0x5be0cd19;
}
/* Transform a 512-bit message block */


function sha256_transform() {
  var a;
  var b;
  var c;
  var d;
  var e;
  var f;
  var g;
  var h;
  var T1;
  var T2;
  var W = new Array(16);
  /* Initialize registers with the previous intermediate value */

  a = ihash[0];
  b = ihash[1];
  c = ihash[2];
  d = ihash[3];
  e = ihash[4];
  f = ihash[5];
  g = ihash[6];
  h = ihash[7];
  /* make 32-bit words */

  for (var i = 0; i < 16; i++) {
    W[i] = buffer[(i << 2) + 3] | buffer[(i << 2) + 2] << 8 | buffer[(i << 2) + 1] << 16 | buffer[i << 2] << 24;
  }

  for (var j = 0; j < 64; j++) {
    T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
    if (j < 16) T1 += W[j];else T1 += sha256_expand(W, j);
    T2 = sha256_Sigma0(a) + majority(a, b, c);
    h = g;
    g = f;
    f = e;
    e = safe_add(d, T1);
    d = c;
    c = b;
    b = a;
    a = safe_add(T1, T2);
  }
  /* Compute the current intermediate hash value */


  ihash[0] += a;
  ihash[1] += b;
  ihash[2] += c;
  ihash[3] += d;
  ihash[4] += e;
  ihash[5] += f;
  ihash[6] += g;
  ihash[7] += h;
}
/* Read the next chunk of data and update the SHA256 computation */


function sha256_update(data, inputLen) {
  var i;
  var index;
  var curpos = 0;
  /* Compute number of bytes mod 64 */

  index = count[0] >> 3 & 0x3f;
  var remainder = inputLen & 0x3f;
  /* Update number of bits */

  if ((count[0] += inputLen << 3) < inputLen << 3) count[1]++;
  count[1] += inputLen >> 29;
  /* Transform as many times as possible */

  for (i = 0; i + 63 < inputLen; i += 64) {
    for (var j = index; j < 64; j++) {
      buffer[j] = data.charCodeAt(curpos++);
    }

    sha256_transform();
    index = 0;
  }
  /* Buffer remaining input */


  for (var _j = 0; _j < remainder; _j++) {
    buffer[_j] = data.charCodeAt(curpos++);
  }
}
/* Finish the computation by operations such as padding */


function sha256_final() {
  var index = count[0] >> 3 & 0x3f;
  buffer[index++] = 0x80;

  if (index <= 56) {
    for (var i = index; i < 56; i++) {
      buffer[i] = 0;
    }
  } else {
    for (var _i = index; _i < 64; _i++) {
      buffer[_i] = 0;
    }

    sha256_transform();

    for (var _i2 = 0; _i2 < 56; _i2++) {
      buffer[_i2] = 0;
    }
  }

  buffer[56] = count[1] >>> 24 & 0xff;
  buffer[57] = count[1] >>> 16 & 0xff;
  buffer[58] = count[1] >>> 8 & 0xff;
  buffer[59] = count[1] & 0xff;
  buffer[60] = count[0] >>> 24 & 0xff;
  buffer[61] = count[0] >>> 16 & 0xff;
  buffer[62] = count[0] >>> 8 & 0xff;
  buffer[63] = count[0] & 0xff;
  sha256_transform();
}
/* Split the internal hash values into an array of bytes */


function sha256_encode_bytes() {
  var j = 0;
  var output = new Array(32);

  for (var i = 0; i < 8; i++) {
    output[j++] = ihash[i] >>> 24 & 0xff;
    output[j++] = ihash[i] >>> 16 & 0xff;
    output[j++] = ihash[i] >>> 8 & 0xff;
    output[j++] = ihash[i] & 0xff;
  }

  return output;
}
/* Get the internal hash as a hex string */


function sha256_encode_hex() {
  var output = new String();

  for (var i = 0; i < 8; i++) {
    for (var j = 28; j >= 0; j -= 4) {
      output += sha256_hex_digits.charAt(ihash[i] >>> j & 0x0f);
    }
  }

  return output;
}
/* Main function: returns a hex string representing the SHA256 value of the
given data */


function digest(data) {
  sha256_init();
  sha256_update(data, data.length);
  sha256_final();
  return sha256_encode_hex();
}

/* harmony default export */ var sha265 = (digest);
;// CONCATENATED MODULE: ./node_modules/@umijs/route-utils/es/transformRoute/transformRoute.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _excluded = ["pro_layout_parentKeys", "children", "icon", "flatMenu", "indexRoute", "routes"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//@ts-ignore


var childrenPropsName = 'routes';
function stripQueryStringAndHashFromPath(url) {
  return url.split('?')[0].split('#')[0];
}
var isUrl = function isUrl(path) {
  if (!path.startsWith('http')) {
    return false;
  }

  try {
    var url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};
var getKeyByPath = function getKeyByPath(item) {
  var path = item.path;

  if (!path || path === '/') {
    // \u5982\u679C\u8FD8\u662F\u6CA1\u6709\uFF0C\u7528\u5BF9\u8C61\u7684hash \u751F\u6210\u4E00\u4E2A
    try {
      return "/".concat(sha265(JSON.stringify(item)));
    } catch (error) {// dom some thing
    }
  }

  return path ? stripQueryStringAndHashFromPath(path) : path;
};
/**
 * \u83B7\u53D6locale\uFF0C\u589E\u52A0\u4E86\u4E00\u4E2A\u529F\u80FD\uFF0C\u5982\u679C locale = false\uFF0C\u5C06\u4E0D\u4F7F\u7528\u56FD\u9645\u5316
 * @param item
 * @param parentName
 */

var getItemLocaleName = function getItemLocaleName(item, parentName) {
  var name = item.name,
      locale = item.locale; // \u5982\u679C\u914D\u7F6E\u4E86 locale \u5E76\u4E14 locale \u4E3A false\u6216 ""

  if ('locale' in item && locale === false || !name) {
    return false;
  }

  return item.locale || "".concat(parentName, ".").concat(name);
};
/**
 * \u5982\u679C\u4E0D\u662F / \u5F00\u5934\u7684\u548C\u7236\u8282\u70B9\u505A\u4E00\u4E0B\u5408\u5E76
 * \u5982\u679C\u662F / \u5F00\u5934\u7684\u4E0D\u4F5C\u4EFB\u4F55\u5904\u7406
 * \u5982\u679C\u662F url \u4E5F\u76F4\u63A5\u8FD4\u56DE
 * @param path
 * @param parentPath
 */


var mergePath = function mergePath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  if (path.endsWith('/*')) {
    return path.replace('/*', '/');
  }

  if ((path || parentPath).startsWith('/')) {
    return path;
  }

  if (isUrl(path)) {
    return path;
  }

  return "/".concat(parentPath, "/").concat(path).replace(/\\/\\//g, '/').replace(/\\/\\//g, '/');
}; // bigfish \u7684\u517C\u5BB9\u51C6\u8BDD


var bigfishCompatibleConversions = function bigfishCompatibleConversions(route, props) {
  var _route$menu = route.menu,
      menu = _route$menu === void 0 ? {} : _route$menu,
      indexRoute = route.indexRoute,
      _route$path = route.path,
      path = _route$path === void 0 ? '' : _route$path;
  var routerChildren = route.children || [];
  var _menu$name = menu.name,
      name = _menu$name === void 0 ? route.name : _menu$name,
      _menu$icon = menu.icon,
      icon = _menu$icon === void 0 ? route.icon : _menu$icon,
      _menu$hideChildren = menu.hideChildren,
      hideChildren = _menu$hideChildren === void 0 ? route.hideChildren : _menu$hideChildren,
      _menu$flatMenu = menu.flatMenu,
      flatMenu = _menu$flatMenu === void 0 ? route.flatMenu : _menu$flatMenu; // \u517C\u5BB9\u5E73\u94FA\u5F0F\u5199\u6CD5
  // \u62FC\u63A5 childrenRoutes, \u5904\u7406\u5B58\u5728 indexRoute \u65F6\u7684\u903B\u8F91

  var childrenList = indexRoute && // \u5982\u679C\u53EA\u6709 redirect,\u4E0D\u7528\u5904\u7406\u7684
  Object.keys(indexRoute).join(',') !== 'redirect' ? [_objectSpread({
    path: path,
    menu: menu
  }, indexRoute)].concat(routerChildren || []) : routerChildren; // \u62FC\u63A5\u8FD4\u56DE\u7684 menu \u6570\u636E

  var result = _objectSpread({}, route);

  if (name) {
    result.name = name;
  }

  if (icon) {
    result.icon = icon;
  }

  if (childrenList && childrenList.length) {
    /** \u5728\u83DC\u5355\u4E2D\u9690\u85CF\u5B50\u9879 */
    if (hideChildren) {
      delete result.children;
      return result;
    } // \u9700\u8981\u91CD\u65B0\u8FDB\u884C\u4E00\u6B21


    var finalChildren = formatter(_objectSpread(_objectSpread({}, props), {}, {
      data: childrenList
    }), route);
    /** \u5728\u83DC\u5355\u4E2D\u53EA\u9690\u85CF\u6B64\u9879\uFF0C\u5B50\u9879\u5F80\u4E0A\u63D0\uFF0C\u4ECD\u65E7\u5C55\u793A */

    if (flatMenu) {
      return finalChildren;
    }

    delete result[childrenPropsName];
  }

  return result;
};

var notNullArray = function notNullArray(value) {
  return Array.isArray(value) && value.length > 0;
};
/**
 *
 * @param props
 * @param parent
 */


function formatter(props) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    path: '/'
  };
  var data = props.data,
      formatMessage = props.formatMessage,
      parentName = props.parentName,
      menuLocale = props.locale;

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.filter(function (item) {
    if (!item) return false;
    if (notNullArray(item.children)) return true;
    if (item.path) return true;
    if (item.originPath) return true;
    if (item.layout) return true; // \u91CD\u5B9A\u5411

    if (item.redirect) return false;
    if (item.unaccessible) return false;
    return false;
  }).filter(function (item) {
    var _item$menu, _item$menu2;

    if ((item === null || item === void 0 ? void 0 : (_item$menu = item.menu) === null || _item$menu === void 0 ? void 0 : _item$menu.name) || (item === null || item === void 0 ? void 0 : item.flatMenu) || (item === null || item === void 0 ? void 0 : (_item$menu2 = item.menu) === null || _item$menu2 === void 0 ? void 0 : _item$menu2.flatMenu)) {
      return true;
    } // \u663E\u793A\u6307\u5B9A\u5728 menu \u4E2D\u9690\u85CF\u8BE5\u9879
    // layout \u63D2\u4EF6\u7684\u529F\u80FD\uFF0C\u5176\u5B9E\u4E0D\u5E94\u8BE5\u5B58\u5728\u7684


    if (item.menu === false) {
      return false;
    }

    return true;
  }).map(function (finallyItem) {
    var item = _objectSpread(_objectSpread({}, finallyItem), {}, {
      path: finallyItem.path || finallyItem.originPath
    });

    if (!item.children && item[childrenPropsName]) {
      item.children = item[childrenPropsName];
      delete item[childrenPropsName];
    } // \u662F\u5426\u6CA1\u6709\u6743\u9650\u67E5\u770B
    // \u8FD9\u6837\u5C31\u4E0D\u4F1A\u663E\u793A\uFF0C\u662F\u4E00\u4E2A\u517C\u5BB9\u6027\u7684\u65B9\u5F0F


    if (item.unaccessible) {
      // eslint-disable-next-line no-param-reassign
      delete item.name;
    }

    if (item.path === '*') {
      item.path = '.';
    }

    if (item.path === '/*') {
      item.path = '.';
    }

    if (!item.path && item.originPath) {
      item.path = item.originPath;
    }

    return item;
  }).map(function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      path: '/'
    };
    var routerChildren = item.children || item[childrenPropsName] || [];
    var path = mergePath(item.path, parent ? parent.path : '/');
    var name = item.name;
    var locale = getItemLocaleName(item, parentName || 'menu'); // if enableMenuLocale use item.name,
    // close menu international

    var localeName = locale !== false && menuLocale !== false && formatMessage && locale ? formatMessage({
      id: locale,
      defaultMessage: name
    }) : name;

    var _parent$pro_layout_pa = parent.pro_layout_parentKeys,
        pro_layout_parentKeys = _parent$pro_layout_pa === void 0 ? [] : _parent$pro_layout_pa,
        children = parent.children,
        icon = parent.icon,
        flatMenu = parent.flatMenu,
        indexRoute = parent.indexRoute,
        routes = parent.routes,
        restParent = _objectWithoutProperties(parent, _excluded);

    var item_pro_layout_parentKeys = new Set([].concat(_toConsumableArray(pro_layout_parentKeys), _toConsumableArray(item.parentKeys || [])));

    if (parent.key) {
      item_pro_layout_parentKeys.add(parent.key);
    }

    var finallyItem = _objectSpread(_objectSpread(_objectSpread({}, restParent), {}, {
      menu: undefined
    }, item), {}, {
      path: path,
      locale: locale,
      key: item.key || getKeyByPath(_objectSpread(_objectSpread({}, item), {}, {
        path: path
      })),
      pro_layout_parentKeys: Array.from(item_pro_layout_parentKeys).filter(function (key) {
        return key && key !== '/';
      })
    });

    if (localeName) {
      finallyItem.name = localeName;
    } else {
      delete finallyItem.name;
    }

    if (finallyItem.menu === undefined) {
      delete finallyItem.menu;
    }

    if (notNullArray(routerChildren)) {
      var formatterChildren = formatter(_objectSpread(_objectSpread({}, props), {}, {
        data: routerChildren,
        parentName: locale || ''
      }), finallyItem);

      if (notNullArray(formatterChildren)) {
        finallyItem.children = formatterChildren;
      }
    }

    return bigfishCompatibleConversions(finallyItem, props);
  }).flat(1);
}
/**
 * \u5220\u9664 hideInMenu \u548C item.name \u4E0D\u5B58\u5728\u7684
 */


var defaultFilterMenuData = function defaultFilterMenuData() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return menuData.filter(function (item) {
    return item && (item.name || notNullArray(item.children)) && !item.hideInMenu && !item.redirect;
  }).map(function (item) {
    var newItem = _objectSpread({}, item);

    var routerChildren = newItem.children || item[childrenPropsName] || [];
    delete newItem[childrenPropsName];

    if (notNullArray(routerChildren) && !newItem.hideChildrenInMenu && routerChildren.some(function (child) {
      return child && !!child.name;
    })) {
      var newChildren = defaultFilterMenuData(routerChildren);
      if (newChildren.length) return _objectSpread(_objectSpread({}, newItem), {}, {
        children: newChildren
      });
    }

    return _objectSpread({}, item);
  }).filter(function (item) {
    return item;
  });
};
/**
 * support pathToRegexp get string
 */


var RouteListMap = /*#__PURE__*/function (_Map) {
  _inherits(RouteListMap, _Map);

  var _super = _createSuper(RouteListMap);

  function RouteListMap() {
    _classCallCheck(this, RouteListMap);

    return _super.apply(this, arguments);
  }

  _createClass(RouteListMap, [{
    key: "get",
    value: function get(pathname) {
      var routeValue;

      try {
        // eslint-disable-next-line no-restricted-syntax
        var _iterator = _createForOfIteratorHelper(this.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            var path = stripQueryStringAndHashFromPath(key);

            if (!isUrl(key) && (0,path_to_regexp/* pathToRegexp */.Bo)(path, []).test(pathname)) {
              routeValue = value;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } catch (error) {
        routeValue = undefined;
      }

      return routeValue;
    }
  }]);

  return RouteListMap;
}( /*#__PURE__*/_wrapNativeSuper(Map));
/**
 * \u83B7\u53D6\u9762\u5305\u5C51\u6620\u5C04
 * @param MenuDataItem[] menuData \u83DC\u5355\u914D\u7F6E
 */


var getBreadcrumbNameMap = function getBreadcrumbNameMap(menuData) {
  // Map is used to ensure the order of keys
  var routerMap = new RouteListMap();

  var flattenMenuData = function flattenMenuData(data, parent) {
    data.forEach(function (menuItem) {
      var routerChildren = menuItem.children || menuItem[childrenPropsName] || [];

      if (notNullArray(routerChildren)) {
        flattenMenuData(routerChildren, menuItem);
      } // Reduce memory usage


      var path = mergePath(menuItem.path, parent ? parent.path : '/');
      routerMap.set(stripQueryStringAndHashFromPath(path), menuItem);
    });
  };

  flattenMenuData(menuData);
  return routerMap;
};

var clearChildren = function clearChildren() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return menuData.map(function (item) {
    var routerChildren = item.children || item[childrenPropsName];

    if (notNullArray(routerChildren)) {
      var newChildren = clearChildren(routerChildren);
      if (newChildren.length) return _objectSpread({}, item);
    }

    var finallyItem = _objectSpread({}, item);

    delete finallyItem[childrenPropsName];
    delete finallyItem.children;
    return finallyItem;
  }).filter(function (item) {
    return item;
  });
};
/**
 * @param routeList \u8DEF\u7531\u914D\u7F6E
 * @param locale \u662F\u5426\u4F7F\u7528\u56FD\u9645\u5316
 * @param formatMessage \u56FD\u9645\u5316\u7684\u7A0B\u5E8F
 * @param ignoreFilter \u662F\u5426\u7B5B\u9009\u6389\u4E0D\u5C55\u793A\u7684 menuItem \u9879\uFF0Cplugin-layout\u9700\u8981\u6240\u6709\u9879\u76EE\u6765\u8BA1\u7B97\u5E03\u5C40\u6837\u5F0F
 * @returns { breadcrumb, menuData}
 */


var transformRoute = function transformRoute(routeList, locale, formatMessage, ignoreFilter) {
  var originalMenuData = formatter({
    data: routeList,
    formatMessage: formatMessage,
    locale: locale
  });
  var menuData = ignoreFilter ? clearChildren(originalMenuData) : defaultFilterMenuData(originalMenuData); // Map type used for internal logic

  var breadcrumb = getBreadcrumbNameMap(originalMenuData);
  return {
    breadcrumb: breadcrumb,
    menuData: menuData
  };
};

/* harmony default export */ var transformRoute_transformRoute = (transformRoute);
;// CONCATENATED MODULE: ./node_modules/@umijs/route-utils/es/getFlatMenus/getFlatMenus.js
function getFlatMenus_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function getFlatMenus_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? getFlatMenus_ownKeys(Object(source), !0).forEach(function (key) { getFlatMenus_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : getFlatMenus_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getFlatMenus_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * \u83B7\u53D6\u6253\u5E73\u7684 menuData
 * \u4EE5 path \u4E3A key
 * @param menuData
 */

var getFlatMenus = function getFlatMenus() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var menus = {};
  menuData.forEach(function (mapItem) {
    var item = getFlatMenus_objectSpread({}, mapItem);

    if (!item || !item.key) {
      return;
    }

    if (!item.children && item[childrenPropsName]) {
      item.children = item[childrenPropsName];
      delete item[childrenPropsName];
    }

    var routerChildren = item.children || [];
    menus[stripQueryStringAndHashFromPath(item.path || item.key || '/')] = getFlatMenus_objectSpread({}, item);
    menus[item.key || item.path || '/'] = getFlatMenus_objectSpread({}, item);

    if (routerChildren) {
      menus = getFlatMenus_objectSpread(getFlatMenus_objectSpread({}, menus), getFlatMenus(routerChildren));
    }
  });
  return menus;
};
/* harmony default export */ var getFlatMenus_getFlatMenus = (getFlatMenus);
;// CONCATENATED MODULE: ./node_modules/@umijs/route-utils/es/getMatchMenu/getMatchMenu.js
//@ts-ignore



var getMenuMatches = function getMenuMatches() {
  var flatMenuKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var path = arguments.length > 1 ? arguments[1] : undefined;
  var exact = arguments.length > 2 ? arguments[2] : undefined;
  return flatMenuKeys.filter(function (item) {
    if (item === '/' && path === '/') {
      return true;
    }

    if (item !== '/' && item !== '/*' && item && !isUrl(item)) {
      var pathKey = stripQueryStringAndHashFromPath(item);

      try {
        // exact
        if (exact) {
          if ((0,path_to_regexp/* pathToRegexp */.Bo)("".concat(pathKey)).test(path)) {
            return true;
          }
        } // /a


        if ((0,path_to_regexp/* pathToRegexp */.Bo)("".concat(pathKey), []).test(path)) {
          return true;
        } // /a/b/b


        if ((0,path_to_regexp/* pathToRegexp */.Bo)("".concat(pathKey, "/(.*)")).test(path)) {
          return true;
        }
      } catch (error) {// console.log(error, path);
      }
    }

    return false;
  }).sort(function (a, b) {
    // \u5982\u679C\u5B8C\u5168\u5339\u914D\u653E\u5230\u6700\u540E\u9762
    if (a === path) {
      return 10;
    }

    if (b === path) {
      return -10;
    }

    return a.substr(1).split('/').length - b.substr(1).split('/').length;
  });
};
/**
 * \u83B7\u53D6\u5F53\u524D\u7684\u9009\u4E2D\u83DC\u5355\u5217\u8868
 * @param pathname
 * @param menuData
 * @returns MenuDataItem[]
 */

var getMatchMenu = function getMatchMenu(pathname, menuData,
/**
 * \u8981\u4E0D\u8981\u5C55\u793A\u5168\u90E8\u7684 key
 */
fullKeys, exact) {
  var flatMenus = getFlatMenus_getFlatMenus(menuData);
  var flatMenuKeys = Object.keys(flatMenus);
  var menuPathKeys = getMenuMatches(flatMenuKeys, pathname || '/', exact);

  if (!menuPathKeys || menuPathKeys.length < 1) {
    return [];
  }

  if (!fullKeys) {
    menuPathKeys = [menuPathKeys[menuPathKeys.length - 1]];
  }

  return menuPathKeys.map(function (menuPathKey) {
    var menuItem = flatMenus[menuPathKey] || {
      pro_layout_parentKeys: '',
      key: ''
    }; // \u53BB\u91CD

    var map = new Map();
    var parentItems = (menuItem.pro_layout_parentKeys || []).map(function (key) {
      if (map.has(key)) {
        return null;
      }

      map.set(key, true);
      return flatMenus[key];
    }).filter(function (item) {
      return item;
    });

    if (menuItem.key) {
      parentItems.push(menuItem);
    }

    return parentItems;
  }).flat(1);
};
/* harmony default export */ var getMatchMenu_getMatchMenu = (getMatchMenu);
;// CONCATENATED MODULE: ./node_modules/@umijs/route-utils/es/index.js



// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/index.js + 4 modules
var config_provider = __webpack_require__(58720);
// EXTERNAL MODULE: ./node_modules/antd/es/layout/layout.js + 2 modules
var layout = __webpack_require__(84321);
// EXTERNAL MODULE: ./node_modules/antd/es/layout/Sider.js + 5 modules
var Sider = __webpack_require__(80335);
;// CONCATENATED MODULE: ./node_modules/antd/es/layout/index.js


const Layout = layout/* default */.ZP;
Layout.Header = layout/* Header */.h4;
Layout.Footer = layout/* Footer */.$_;
Layout.Content = layout/* Content */.VY;
Layout.Sider = Sider/* default */.Z;
/* harmony default export */ var es_layout = (Layout);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(94184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/omit.js/es/index.js
var omit_js_es = __webpack_require__(97435);
// EXTERNAL MODULE: ./node_modules/rc-util/lib/warning.js
var lib_warning = __webpack_require__(45520);
// EXTERNAL MODULE: ./node_modules/swr/core/dist/index.mjs + 1 modules
var dist = __webpack_require__(59734);
;// CONCATENATED MODULE: ./node_modules/use-media-antd-query/es/useMediaQuery.js
function useMediaQuery_slicedToArray(arr, i) { return useMediaQuery_arrayWithHoles(arr) || useMediaQuery_iterableToArrayLimit(arr, i) || useMediaQuery_unsupportedIterableToArray(arr, i) || useMediaQuery_nonIterableRest(); }

function useMediaQuery_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useMediaQuery_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useMediaQuery_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useMediaQuery_arrayLikeToArray(o, minLen); }

function useMediaQuery_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useMediaQuery_iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useMediaQuery_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useMediaQuery(mediaQuery) {
  var isSsr = typeof window === 'undefined';

  var _useState = (0,react.useState)(function () {
    return isSsr ? false : window.matchMedia(mediaQuery).matches;
  }),
      _useState2 = useMediaQuery_slicedToArray(_useState, 2),
      matches = _useState2[0],
      setMatches = _useState2[1];

  (0,react.useLayoutEffect)(function () {
    if (isSsr) {
      return;
    }

    var mediaQueryList = window.matchMedia(mediaQuery);

    var listener = function listener(e) {
      return setMatches(e.matches);
    };

    mediaQueryList.addListener(listener);
    return function () {
      return mediaQueryList.removeListener(listener);
    };
  }, [mediaQuery]);
  return matches;
}
;// CONCATENATED MODULE: ./node_modules/use-media-antd-query/es/index.js
function es_slicedToArray(arr, i) { return es_arrayWithHoles(arr) || es_iterableToArrayLimit(arr, i) || es_unsupportedIterableToArray(arr, i) || es_nonIterableRest(); }

function es_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function es_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return es_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return es_arrayLikeToArray(o, minLen); }

function es_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function es_iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function es_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var MediaQueryEnum = {
  xs: {
    maxWidth: 575,
    matchMedia: '(max-width: 575px)'
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: '(min-width: 576px) and (max-width: 767px)'
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: '(min-width: 768px) and (max-width: 991px)'
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: '(min-width: 992px) and (max-width: 1199px)'
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: '(min-width: 1200px) and (max-width: 1599px)'
  },
  xxl: {
    minWidth: 1600,
    matchMedia: '(min-width: 1600px)'
  }
};
/**
 * loop query screen className
 * Array.find will throw a error
 * \`Rendered more hooks than during the previous render.\`
 * So should use Array.forEach
 */

var getScreenClassName = function getScreenClassName() {
  var className = 'md'; // support ssr

  if (typeof window === 'undefined') {
    return className;
  }

  var mediaQueryKey = Object.keys(MediaQueryEnum).find(function (key) {
    var matchMedia = MediaQueryEnum[key].matchMedia;

    if (window.matchMedia(matchMedia).matches) {
      return true;
    }

    return false;
  });
  className = mediaQueryKey;
  return className;
};

var useMedia = function useMedia() {
  var isMd = useMediaQuery(MediaQueryEnum.md.matchMedia);
  var isLg = useMediaQuery(MediaQueryEnum.lg.matchMedia);
  var isXxl = useMediaQuery(MediaQueryEnum.xxl.matchMedia);
  var isXl = useMediaQuery(MediaQueryEnum.xl.matchMedia);
  var isSm = useMediaQuery(MediaQueryEnum.sm.matchMedia);
  var isXs = useMediaQuery(MediaQueryEnum.xs.matchMedia);

  var _useState = (0,react.useState)(getScreenClassName()),
      _useState2 = es_slicedToArray(_useState, 2),
      colSpan = _useState2[0],
      setColSpan = _useState2[1];

  (0,react.useEffect)(function () {
    if (false) {}

    if (isXxl) {
      setColSpan('xxl');
      return;
    }

    if (isXl) {
      setColSpan('xl');
      return;
    }

    if (isLg) {
      setColSpan('lg');
      return;
    }

    if (isMd) {
      setColSpan('md');
      return;
    }

    if (isSm) {
      setColSpan('sm');
      return;
    }

    if (isXs) {
      setColSpan('xs');
      return;
    }

    setColSpan('md');
  }, [isMd, isLg, isXxl, isXl, isSm, isXs]);
  return colSpan;
};

/* harmony default export */ var use_media_antd_query_es = (useMedia);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/assert/Logo.js

var Logo = function Logo() {
  return (0,jsx_runtime.jsxs)("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 200 200",
    children: [(0,jsx_runtime.jsxs)("defs", {
      children: [(0,jsx_runtime.jsxs)("linearGradient", {
        x1: "62.1023273%",
        y1: "0%",
        x2: "108.19718%",
        y2: "37.8635764%",
        id: "linearGradient-1",
        children: [(0,jsx_runtime.jsx)("stop", {
          stopColor: "#4285EB",
          offset: "0%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#2EC7FF",
          offset: "100%"
        })]
      }), (0,jsx_runtime.jsxs)("linearGradient", {
        x1: "69.644116%",
        y1: "0%",
        x2: "54.0428975%",
        y2: "108.456714%",
        id: "linearGradient-2",
        children: [(0,jsx_runtime.jsx)("stop", {
          stopColor: "#29CDFF",
          offset: "0%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#148EFF",
          offset: "37.8600687%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#0A60FF",
          offset: "100%"
        })]
      }), (0,jsx_runtime.jsxs)("linearGradient", {
        x1: "69.6908165%",
        y1: "-12.9743587%",
        x2: "16.7228981%",
        y2: "117.391248%",
        id: "linearGradient-3",
        children: [(0,jsx_runtime.jsx)("stop", {
          stopColor: "#FA816E",
          offset: "0%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#F74A5C",
          offset: "41.472606%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#F51D2C",
          offset: "100%"
        })]
      }), (0,jsx_runtime.jsxs)("linearGradient", {
        x1: "68.1279872%",
        y1: "-35.6905737%",
        x2: "30.4400914%",
        y2: "114.942679%",
        id: "linearGradient-4",
        children: [(0,jsx_runtime.jsx)("stop", {
          stopColor: "#FA8E7D",
          offset: "0%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#F74A5C",
          offset: "51.2635191%"
        }), (0,jsx_runtime.jsx)("stop", {
          stopColor: "#F51D2C",
          offset: "100%"
        })]
      })]
    }), (0,jsx_runtime.jsx)("g", {
      stroke: "none",
      strokeWidth: 1,
      fill: "none",
      fillRule: "evenodd",
      children: (0,jsx_runtime.jsx)("g", {
        transform: "translate(-20.000000, -20.000000)",
        children: (0,jsx_runtime.jsx)("g", {
          transform: "translate(20.000000, 20.000000)",
          children: (0,jsx_runtime.jsxs)("g", {
            children: [(0,jsx_runtime.jsxs)("g", {
              fillRule: "nonzero",
              children: [(0,jsx_runtime.jsxs)("g", {
                children: [(0,jsx_runtime.jsx)("path", {
                  d: "M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C99.2571609,26.9692191 101.032305,26.9692191 102.20193,28.1378823 L129.985225,55.8983314 C134.193707,60.1033528 141.017005,60.1033528 145.225487,55.8983314 C149.433969,51.69331 149.433969,44.8756232 145.225487,40.6706018 L108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z",
                  fill: "url(#linearGradient-1)"
                }), (0,jsx_runtime.jsx)("path", {
                  d: "M91.5880863,4.17652823 L4.17996544,91.5127728 C-0.519240605,96.2081146 -0.519240605,103.791885 4.17996544,108.487227 L91.5880863,195.823472 C96.2872923,200.518814 103.877304,200.518814 108.57651,195.823472 L145.225487,159.204632 C149.433969,154.999611 149.433969,148.181924 145.225487,143.976903 C141.017005,139.771881 134.193707,139.771881 129.985225,143.976903 L102.20193,171.737352 C101.032305,172.906015 99.2571609,172.906015 98.0875359,171.737352 L28.285908,101.993122 C27.1162831,100.824459 27.1162831,99.050775 28.285908,97.8821118 L98.0875359,28.1378823 C100.999864,25.6271836 105.751642,20.541824 112.729652,19.3524487 C117.915585,18.4685261 123.585219,20.4140239 129.738554,25.1889424 C125.624663,21.0784292 118.571995,14.0340304 108.58055,4.05574592 C103.862049,-0.537986846 96.2692618,-0.500797906 91.5880863,4.17652823 Z",
                  fill: "url(#linearGradient-2)"
                })]
              }), (0,jsx_runtime.jsx)("path", {
                d: "M153.685633,135.854579 C157.894115,140.0596 164.717412,140.0596 168.925894,135.854579 L195.959977,108.842726 C200.659183,104.147384 200.659183,96.5636133 195.960527,91.8688194 L168.690777,64.7181159 C164.472332,60.5180858 157.646868,60.5241425 153.435895,64.7316526 C149.227413,68.936674 149.227413,75.7543607 153.435895,79.9593821 L171.854035,98.3623765 C173.02366,99.5310396 173.02366,101.304724 171.854035,102.473387 L153.685633,120.626849 C149.47715,124.83187 149.47715,131.649557 153.685633,135.854579 Z",
                fill: "url(#linearGradient-3)"
              })]
            }), (0,jsx_runtime.jsx)("ellipse", {
              fill: "url(#linearGradient-4)",
              cx: "100.519339",
              cy: "100.436681",
              rx: "23.6001926",
              ry: "23.580786"
            })]
          })
        })
      })
    })]
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/CopyrightOutlined.js
// This icon file is generated automatically.
var CopyrightOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z" } }] }, "name": "copyright", "theme": "outlined" };
/* harmony default export */ var asn_CopyrightOutlined = (CopyrightOutlined);

// EXTERNAL MODULE: ./node_modules/@ant-design/icons/es/components/AntdIcon.js + 2 modules
var AntdIcon = __webpack_require__(84089);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/icons/CopyrightOutlined.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var CopyrightOutlined_CopyrightOutlined = function CopyrightOutlined(props, ref) {
  return /*#__PURE__*/react.createElement(AntdIcon/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    ref: ref,
    icon: asn_CopyrightOutlined
  }));
};
CopyrightOutlined_CopyrightOutlined.displayName = 'CopyrightOutlined';
/* harmony default export */ var icons_CopyrightOutlined = (/*#__PURE__*/react.forwardRef(CopyrightOutlined_CopyrightOutlined));
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-provider/es/useStyle/index.js
var useStyle = __webpack_require__(98082);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GlobalFooter/style.js



var genFooterToolBarStyle = function genFooterToolBarStyle(token) {
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    marginBlock: 0,
    marginBlockStart: 48,
    marginBlockEnd: 24,
    marginInline: 0,
    paddingBlock: 0,
    paddingInline: 16,
    textAlign: 'center',
    '&-list': {
      marginBlockEnd: 8,
      color: token.colorTextSecondary,
      '&-link': {
        color: token.colorTextSecondary,
        textDecoration: token.linkDecoration
      },
      '*:not(:last-child)': {
        marginInlineEnd: 8,
        '&:hover': {
          color: token.colorText
        }
      }
    },
    '&-copyright': {
      fontSize: '14px',
      color: token.colorText
    }
  });
};
function style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutFooter', function (token) {
    var proCardToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genFooterToolBarStyle(proCardToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GlobalFooter/index.js





var GlobalFooter = function GlobalFooter(_ref) {
  var className = _ref.className,
    prefixCls = _ref.prefixCls,
    links = _ref.links,
    copyright = _ref.copyright,
    style = _ref.style;
  var context = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext);
  var baseClassName = context.getPrefixCls(prefixCls || 'pro-global-footer');
  var _useStyle = style_useStyle(baseClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  if ((links == null || links === false || Array.isArray(links) && links.length === 0) && (copyright == null || copyright === false)) {
    return null;
  }
  return wrapSSR((0,jsx_runtime.jsxs)("div", {
    className: classnames_default()(baseClassName, hashId, className),
    style: style,
    children: [links && (0,jsx_runtime.jsx)("div", {
      className: "".concat(baseClassName, "-list ").concat(hashId),
      children: links.map(function (link) {
        return (0,jsx_runtime.jsx)("a", {
          className: "".concat(baseClassName, "-list-link ").concat(hashId),
          title: link.key,
          target: link.blankTarget ? '_blank' : '_self',
          href: link.href,
          rel: "noreferrer",
          children: link.title
        }, link.key);
      })
    }), copyright && (0,jsx_runtime.jsx)("div", {
      className: "".concat(baseClassName, "-copyright ").concat(hashId),
      children: copyright
    })]
  }));
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/Footer.js






var Footer = es_layout.Footer;
var DefaultFooter = function DefaultFooter(_ref) {
  var links = _ref.links,
    copyright = _ref.copyright,
    style = _ref.style,
    className = _ref.className,
    prefixCls = _ref.prefixCls;
  return (0,jsx_runtime.jsx)(Footer, {
    className: className,
    style: (0,esm_objectSpread2/* default */.Z)({
      padding: 0
    }, style),
    children: (0,jsx_runtime.jsx)(GlobalFooter, {
      links: links,
      prefixCls: prefixCls,
      copyright: copyright === false ? null : (0,jsx_runtime.jsxs)(react.Fragment, {
        children: [(0,jsx_runtime.jsx)(icons_CopyrightOutlined, {}), " ", copyright]
      })
    })
  });
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/Header/style/header.js



var genProLayoutHeaderStyle = function genProLayoutHeaderStyle(token) {
  var _token$layout, _token$layout$header, _token$layout2, _token$layout2$header, _token$layout3, _token$layout3$header;
  return (0,defineProperty/* default */.Z)({}, "".concat(token.proComponentsCls, "-layout"), (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-layout-header").concat(token.componentCls), {
    height: (token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.heightLayoutHeader) || 56,
    lineHeight: "".concat((token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.heightLayoutHeader) || 56, "px"),
    // hitu \u7528\u4E86\u8FD9\u4E2A\u5C5E\u6027\uFF0C\u4E0D\u80FD\u5220\u9664\u54E6 @\u5357\u53D6
    zIndex: 19,
    width: '100%',
    paddingBlock: 0,
    paddingInline: 8,
    borderBlockEnd: "1px solid ".concat(token.colorSplit),
    backgroundColor: (token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$header = _token$layout3.header) === null || _token$layout3$header === void 0 ? void 0 : _token$layout3$header.colorBgHeader) || 'rgba(255, 255, 255, 0.4)',
    WebkitBackdropFilter: 'blur(8px)',
    backdropFilter: 'blur(8px)',
    '&-fixed-header': {
      position: 'fixed',
      insetBlockStart: 0,
      width: '100%',
      zIndex: 100,
      insetInlineEnd: 0
    },
    '&-header-actions': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16',
      cursor: 'pointer',
      '& &-item': {
        paddingBlock: 0,
        paddingInline: 8,
        '&:hover': {
          color: token.colorText
        }
      }
    },
    '&-header-realDark': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 65%)'
    },
    '&-header-actions-header-action': {
      transition: 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
    }
  }));
};
function header_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutHeader', function (token) {
    var ProLayoutHeaderToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProLayoutHeaderStyle(ProLayoutHeaderToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/utils/utils.js

var getOpenKeysFromMenuData = function getOpenKeysFromMenuData(menuData) {
  return (menuData || []).reduce(function (pre, item) {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children || item.routes) {
      var newArray = pre.concat(getOpenKeysFromMenuData(item.children || item.routes) || []);
      return newArray;
    }
    return pre;
  }, []);
};
var themeConfig = {
  techBlue: '#1677FF',
  daybreak: '#1890ff',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekblue: '#2F54EB',
  purple: '#722ED1'
};
/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
function genStringToTheme(val) {
  return val && themeConfig[val] ? themeConfig[val] : val;
}
function clearMenuItem(menusData) {
  return menusData.map(function (item) {
    var children = item.children || [];
    var finalItem = (0,esm_objectSpread2/* default */.Z)({}, item);
    if (!finalItem.children && finalItem.routes) {
      finalItem.children = finalItem.routes;
    }
    if (!finalItem.name || finalItem.hideInMenu) {
      return null;
    }
    if (finalItem && (finalItem === null || finalItem === void 0 ? void 0 : finalItem.children)) {
      if (!finalItem.hideChildrenInMenu && children.some(function (child) {
        return child && child.name && !child.hideInMenu;
      })) {
        return (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, item), {}, {
          children: clearMenuItem(children)
        });
      }
      // children \u4E3A\u7A7A\u5C31\u76F4\u63A5\u5220\u6389
      delete finalItem.children;
    }
    delete finalItem.routes;
    return finalItem;
  }).filter(function (item) {
    return item;
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/MenuOutlined.js
// This icon file is generated automatically.
var MenuOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" } }] }, "name": "menu", "theme": "outlined" };
/* harmony default export */ var asn_MenuOutlined = (MenuOutlined);

;// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/icons/MenuOutlined.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var MenuOutlined_MenuOutlined = function MenuOutlined(props, ref) {
  return /*#__PURE__*/react.createElement(AntdIcon/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    ref: ref,
    icon: asn_MenuOutlined
  }));
};
MenuOutlined_MenuOutlined.displayName = 'MenuOutlined';
/* harmony default export */ var icons_MenuOutlined = (/*#__PURE__*/react.forwardRef(MenuOutlined_MenuOutlined));
// EXTERNAL MODULE: ./node_modules/antd/es/version/index.js + 1 modules
var version = __webpack_require__(67159);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/omitUndefined/index.js
var omitUndefined = function omitUndefined(obj) {
  var newObj = {};
  Object.keys(obj || {}).forEach(function (key) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  if (Object.keys(newObj).length < 1) {
    return undefined;
  }
  return newObj;
};
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(71002);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/compareVersions/index.js


var semver = /^[v^~<>=]*?(\\d+)(?:\\.([x*]|\\d+)(?:\\.([x*]|\\d+)(?:\\.([x*]|\\d+))?(?:-([\\da-z\\-]+(?:\\.[\\da-z\\-]+)*))?(?:\\+[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?)?)?$/i;
/**
 * @param  {string} s
 */
var isWildcard = function isWildcard(s) {
  return s === '*' || s === 'x' || s === 'X';
};
/**
 * @param  {string} v
 */
var tryParse = function tryParse(v) {
  var n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
/**
 * @param  {string|number} a
 * @param  {string|number} b
 */
var forceType = function forceType(a, b) {
  return (0,esm_typeof/* default */.Z)(a) !== (0,esm_typeof/* default */.Z)(b) ? [String(a), String(b)] : [a, b];
};
/**
 * @param  {string} a
 * @param  {string} b
 * @returns number
 */
var compareStrings = function compareStrings(a, b) {
  if (isWildcard(a) || isWildcard(b)) return 0;
  var _forceType = forceType(tryParse(a), tryParse(b)),
    _forceType2 = (0,esm_slicedToArray/* default */.Z)(_forceType, 2),
    ap = _forceType2[0],
    bp = _forceType2[1];
  if (ap > bp) return 1;
  if (ap < bp) return -1;
  return 0;
};
/**
 * @param  {string|RegExpMatchArray} a
 * @param  {string|RegExpMatchArray} b
 * @returns number
 */
var compareSegments = function compareSegments(a, b) {
  for (var i = 0; i < Math.max(a.length, b.length); i++) {
    var r = compareStrings(a[i] || '0', b[i] || '0');
    if (r !== 0) return r;
  }
  return 0;
};
/**
 * @param  {string} version
 * @returns RegExpMatchArray
 */
var validateAndParse = function validateAndParse(version) {
  var _match$shift;
  var match = version.match(semver);
  match === null || match === void 0 ? void 0 : (_match$shift = match.shift) === null || _match$shift === void 0 ? void 0 : _match$shift.call(match);
  return match;
};
/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like \`1.0.0\`, \`1.0\`, \`1\`, and pre-release versions like \`1.0.0-alpha\`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */
var compareVersions = function compareVersions(v1, v2) {
  // validate input and split into segments
  var n1 = validateAndParse(v1);
  var n2 = validateAndParse(v2);
  // pop off the patch
  var p1 = n1.pop();
  var p2 = n2.pop();
  // validate numbers
  var r = compareSegments(n1, n2);
  if (r !== 0) return r;
  if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/compareVersions/openVisibleCompatible.js
/* provided dependency */ var process = __webpack_require__(34155);



var getVersion = function getVersion() {
  var _process, _process$env;
  if (typeof process === 'undefined') return version/* default */.Z;
  return ((_process = process) === null || process === void 0 ? void 0 : (_process$env = {"NVM_INC":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/include/node","npm_package_devDependencies_lint_staged":"^13.0.3","npm_config_leveldown_binary_host_mirror":"https://npm.taobao.org/mirrors/leveldown/v{version}","PYCHARM_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/pycharm.vmoptions","WEBIDE_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/webide.vmoptions","NVMW_NODEJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/node","npm_package_devDependencies_prettier":"^2.7.1","npm_config_couchbase_binary_host_mirror":"https://npm.taobao.org/mirrors/couchbase/v{version}","TERM_PROGRAM":"Apple_Terminal","npm_package_devDependencies_mockjs":"^1.1.0","NODE":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node","NVM_CD_FLAGS":"-q","ANDROID_HOME":"/Users/eternallycyf/Library/Android/sdk","npm_package_devDependencies_typescript":"^4.1.2","npm_package_dependencies__umijs_max":"^4.0.46","npm_config_version_git_tag":"true","INIT_CWD":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab","SHELL":"/bin/zsh","JETBRAINSCLIENT_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/jetbrainsclient.vmoptions","TERM":"xterm-256color","npm_config_flow_bin_binary_host_mirror":"https://npm.taobao.org/mirrors/flow/v","npm_config_zmq_prebuilt_binary_host_mirror":"https://npm.taobao.org/mirrors/zmq-prebuilt/v{version}","npm_config_gl_binary_host_mirror":"https://npm.taobao.org/mirrors/gl/v{version}","TMPDIR":"/var/folders/m3/c9nzstxn6yqf77lz8wcvmq200000gn/T/","GRADLE_HOME":"/Applications/Android Studio.app/Contents/gradle/gradle-5.6.4","npm_config_init_license":"MIT","TERM_PROGRAM_VERSION":"447","npm_config_chromedriver_cdnurl":"https://npm.taobao.org/mirrors/chromedriver","npm_package_scripts_dev":"max dev","npm_config_grpc_node_binary_host_mirror":"https://npm.taobao.org/mirrors","TERM_SESSION_ID":"996E1C36-E010-49D8-A529-265933774FE6","NODIST_IOJS_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_config_sodium_prebuilt_binary_host_mirror":"https://npm.taobao.org/mirrors/sodium-prebuilt/v{version}","npm_package_private":"true","npm_config_registry":"https://registry.npmjs.org/","npm_config_home":"https://npm.taobao.org","npm_config_no_proxy":"registry.npmjs.org","ZSH":"/Users/eternallycyf/.oh-my-zsh","PNPM_HOME":"/Users/eternallycyf/Library/pnpm","npm_package_dependencies__ant_design_icons":"^4.7.0","NVMW_NPM_MIRROR":"https://npm.taobao.org/mirrors/npm","npm_package_readmeFilename":"README.md","npm_package_devDependencies__types_dva":"^1.1.0","USER":"eternallycyf","NVM_DIR":"/Users/eternallycyf/.nvm","npm_package_description":"- \u6700\u5C0F\u590D\u73B0 - \u65E0\u5176\u4ED6\u4E0D\u76F8\u5173\u5185\u5BB9","npm_package_devDependencies__types_react":"^18.0.0","npm_config_phantomjs_cdnurl":"https://npm.taobao.org/mirrors/phantomjs","npm_package_scripts_deploy":"bash ./deploy.sh","IOJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_package_dependencies_redux_persist":"^6.0.0","PHPSTORM_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/phpstorm.vmoptions","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.uDfhnzMC0L/Listeners","npm_package_dependencies_lodash":"^4.17.19","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","npm_config_node_tk5_binary_host_mirror":"https://npm.taobao.org/mirrors/node-tk5/v{version}","npm_config_utp_native_binary_host_mirror":"https://npm.taobao.org/mirrors/utp-native/v{version}","GOLAND_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/goland.vmoptions","npm_execpath":"/usr/local/lib/node_modules/yarn/bin/yarn.js","APPCODE_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/appcode.vmoptions","PAGER":"less","npm_config_hackrf_binary_host_mirror":"https://npm.taobao.org/mirrors/hackrf/v{version}","npm_package_author_name":"eternallycyf","LSCOLORS":"Gxfxcxdxbxegedabagacad","npm_package_devDependencies__types_react_dom":"^18.0.0","PATH":"/var/folders/m3/c9nzstxn6yqf77lz8wcvmq200000gn/T/yarn--1674452187883-0.010524767745134556:/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/.bin:/Users/eternallycyf/.config/yarn/link/node_modules/.bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/libexec/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node_modules/npm/bin/node-gyp-bin:/var/folders/m3/c9nzstxn6yqf77lz8wcvmq200000gn/T/yarn--1674452187489-0.46525508965450535:/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/.bin:/Users/eternallycyf/.config/yarn/link/node_modules/.bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/libexec/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/Library/pnpm:/home/eternallycyf/jdk1.7.0_03/bin:/usr/local/opt/mysql@5.6/bin:/usr/local/opt/redis@4.0/bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/VMware Fusion.app/Contents/Public:/Library/Apple/usr/bin:/Users/eternallycyf/Library/Android/sdk/emulator:/Users/eternallycyf/Library/Android/sdk/tools:/Users/eternallycyf/Library/Android/sdk/tools/bin:/Users/eternallycyf/Library/Android/sdk/platform-tools:/usr/local/Cellar/mysql/8.0.27/bin/:/usr/local/mongodb/bin/:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/usr/local/bin:/Applications/Android Studio.app/Contents/gradle/gradle-5.6.4/bin","npm_config_argv":"{\\"remain\\":[],\\"cooked\\":[\\"run\\",\\"deploy\\"],\\"original\\":[\\"deploy\\"]}","npm_package_devDependencies__types_js_cookie":"^3.0.2","npm_package_scripts_postinstall":"max setup","GH_EMAIL_TOKEN":"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___MY_VMOPTIONS_SHELL_FILE=/Users/eternallycyf/.jetbrains.vmoptions.sh","npm_package_devDependencies_prettier_plugin_packagejson":"^2","__LLVM_PROFILE_RT_INIT_ONCE":"__LLVM_PROFILE_RT_INIT_ONCE","npm_config_https_proxy":"","npm_config_mknod_binary_host_mirror":"https://npm.taobao.org/mirrors/mknod/v{version}","_":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/.bin/cross-env","__CFBundleIdentifier":"com.apple.Terminal","NVM_NODEJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/node","npm_config_sqlite3_binary_site":"https://npm.taobao.org/mirrors/sqlite3","PWD":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab","JAVA_HOME":"/home/eternallycyf/jdk1.7.0_03","NODIST_NODE_MIRROR":"https://npm.taobao.org/mirrors/node","npm_package_devDependencies__types_lodash":"^4.14.191","npm_config_node_sqlite3_binary_host_mirror":"https://npm.taobao.org/mirrors","npm_lifecycle_event":"build:pro","IDEA_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/idea.vmoptions","CLION_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/clion.vmoptions","LANG":"zh_CN.UTF-8","npm_package_name":"","npm_package_scripts_start":"rm -rf ./src/pages/.DS_Store && cross-env NODE_ENV=development max dev","npm_package_scripts_build":"max build","npm_config_version_commit_hooks":"true","npm_config_nodegit_binary_host_mirror":"https://npm.taobao.org/mirrors/nodegit/v{version}/","XPC_FLAGS":"0x0","NODE_ENV":"production","WEBSTORM_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/webstorm.vmoptions","npm_config_bin_links":"true","npm_config_rabin_binary_host_mirror":"https://npm.taobao.org/mirrors/rabin/v{version}","npm_config_wrap_output":"","DATASPELL_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/dataspell.vmoptions","npm_package_dependencies_classnames":"^2.2.6","npm_config_debug_binary_host_mirror":"https://npm.taobao.org/mirrors/node-inspector","npm_config_electron_mirror":"https://npm.taobao.org/mirrors/electron/","XPC_SERVICE_NAME":"0","npm_package_version":"","npm_config_sass_binary_site":"http://npm.taobao.org/mirrors/node-sass","SHLVL":"4","HOME":"/Users/eternallycyf","NVMW_IOJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_config_save_prefix":"^","npm_config_strict_ssl":"true","npm_config_scripts_prepend_node_path":"true","npm_config_NO_PROXY":"registry.npmjs.org","npm_package_devDependencies_husky":"^8.0.1","npm_package_devDependencies_cross_env":"^7.0.3","npm_config_version_git_message":"v%s","npm_package_dependencies_js_cookie":"^3.0.1","npm_config_leveldown_hyper_binary_host_mirror":"https://npm.taobao.org/mirrors/leveldown-hyper/v{version}","npm_config_disturl":"https://npm.taobao.org/dist","LOGNAME":"eternallycyf","LESS":"-R","YARN_WRAP_OUTPUT":"false","npm_package_scripts_format":"prettier --cache --write .","NODEJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/node","npm_lifecycle_script":"cross-env NODE_ENV=production max build","GATEWAY_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/gateway.vmoptions","CLASSPATH":".:/home/eternallycyf/jdk1.7.0_03/lib/dt.jar:/home/eternallycyf/jdk1.7.0_03/lib/tools.jar","npm_package_author_email":"a969475322@gmail.com","DATAGRIP_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/datagrip.vmoptions","NVM_BIN":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin","NVM_IOJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_config_version_git_sign":"","npm_config_ignore_scripts":"","npm_config_user_agent":"yarn/1.22.15 npm/? node/v18.13.0 darwin x64","npm_package_scripts_build_pro":"cross-env NODE_ENV=production max build","JETBRAINS_CLIENT_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/jetbrains_client.vmoptions","RIDER_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/rider.vmoptions","npm_package_scripts_prepare":"husky install","npm_config_git4win_mirror":"https://npm.taobao.org/mirrors/git-for-windows","RUBYMINE_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/rubymine.vmoptions","npm_package_devDependencies_prettier_plugin_organize_imports":"^2","npm_package_dependencies_antd":"^5.0.0","npm_config_init_version":"1.0.0","npm_config_ignore_optional":"","npm_config_fse_binary_host_mirror":"https://npm.taobao.org/mirrors/fsevents","npm_package_scripts_setup":"max setup","npm_config_operadriver_cdnurl":"https://npm.taobao.org/mirrors/operadriver","npm_config_profiler_binary_host_mirror":"https://npm.taobao.org/mirrors/node-inspector/","npm_config_python_mirror":"https://npm.taobao.org/mirrors/python","npm_config_utf_8_validate_binary_host_mirror":"https://npm.taobao.org/mirrors/utf-8-validate/v{version}","npm_config_fuse_bindings_binary_host_mirror":"https://npm.taobao.org/mirrors/fuse-bindings/v{version}","npm_node_execpath":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node","npm_package_dependencies__ant_design_pro_components":"^2.0.1","npm_config_version_tag_prefix":"v","npm_config_puppeteer_download_host":"https://npm.taobao.org/mirrors","UMI_PRESETS":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/@umijs/max/dist/preset.js","UMI_DIR":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/umi","PORT":"8000","BABEL_CACHE":"none"}) === null || _process$env === void 0 ? void 0 : _process$env.ANTD_VERSION) || version/* default */.Z;
};
var openVisibleCompatible = function openVisibleCompatible(open, onOpenChange) {
  var props = compareVersions(getVersion(), '4.23.0') > -1 ? {
    open: open,
    onOpenChange: onOpenChange
  } : {
    visible: open,
    onVisibleChange: onOpenChange
  };
  return omitUndefined(props);
};

// EXTERNAL MODULE: ./node_modules/antd/es/popover/index.js + 3 modules
var popover = __webpack_require__(74627);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/AppsLogo.js

/**
 * \u9ED8\u8BA4\u7684\u5E94\u7528\u5217\u8868\u7684\u56FE\u6807
 *
 */
var AppsLogo = function AppsLogo() {
  return (0,jsx_runtime.jsx)("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 12 12",
    fill: "currentColor",
    "aria-hidden": "true",
    children: (0,jsx_runtime.jsx)("path", {
      d: "M0 0h3v3H0V0zm4.5 0h3v3h-3V0zM9 0h3v3H9V0zM0 4.5h3v3H0v-3zm4.503 0h3v3h-3v-3zM9 4.5h3v3H9v-3zM0 9h3v3H0V9zm4.503 0h3v3h-3V9zM9 9h3v3H9V9z"
    })
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/DefaultContent.js


var DefaultContent = function DefaultContent(props) {
  var appList = props.appList,
    baseClassName = props.baseClassName,
    hashId = props.hashId,
    itemClick = props.itemClick;
  return (0,jsx_runtime.jsx)("div", {
    className: "".concat(baseClassName, "-content ").concat(hashId),
    children: (0,jsx_runtime.jsx)("ul", {
      className: "".concat(baseClassName, "-content-list ").concat(hashId),
      children: appList === null || appList === void 0 ? void 0 : appList.map(function (app, index) {
        var _app$children;
        if (app === null || app === void 0 ? void 0 : (_app$children = app.children) === null || _app$children === void 0 ? void 0 : _app$children.length) {
          return (0,jsx_runtime.jsxs)("div", {
            className: "".concat(baseClassName, "-content-list-item-group ").concat(hashId),
            children: [(0,jsx_runtime.jsx)("div", {
              className: "".concat(baseClassName, "-content-list-item-group-title ").concat(hashId),
              children: app.title
            }), (0,jsx_runtime.jsx)(DefaultContent, {
              hashId: hashId,
              itemClick: itemClick,
              appList: app === null || app === void 0 ? void 0 : app.children,
              baseClassName: baseClassName
            })]
          });
        }
        return (0,jsx_runtime.jsx)("li", {
          className: "".concat(baseClassName, "-content-list-item ").concat(hashId),
          children: (0,jsx_runtime.jsxs)("a", {
            href: itemClick ? 'javascript:;' : app.url,
            onClick: function onClick() {
              return itemClick === null || itemClick === void 0 ? void 0 : itemClick(app);
            },
            target: app.target,
            rel: "noreferrer",
            children: [defaultRenderLogo(app.icon), (0,jsx_runtime.jsxs)("div", {
              children: [(0,jsx_runtime.jsx)("div", {
                children: app.title
              }), app.desc ? (0,jsx_runtime.jsx)("span", {
                children: app.desc
              }) : null]
            })]
          })
        }, index);
      })
    })
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/isUrl/index.js
/**
 * \u5224\u65AD\u662F\u4E0D\u662F\u4E00\u4E2A url
 * @param  {string|undefined} path
 * @returns boolean
 */
var isUrl_isUrl = function isUrl(path) {
  if (!path) return false;
  if (!path.startsWith('http')) {
    return false;
  }
  try {
    var url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/SimpleContent.js


/**
 * simple\u6A21\u5F0F\u6E32\u67D3logo\u7684\u65B9\u5F0F
 *
 * @param logo
 * @param title
 * @returns
 */
var renderLogo = function renderLogo(logo, title) {
  if (logo && typeof logo === 'string' && isUrl_isUrl(logo)) {
    return (0,jsx_runtime.jsx)("img", {
      src: logo,
      alt: "logo"
    });
  }
  if (typeof logo === 'function') {
    return logo();
  }
  if (logo && typeof logo === 'string') {
    return (0,jsx_runtime.jsx)("div", {
      id: "avatarLogo",
      children: logo
    });
  }
  if (!logo && title && typeof title === 'string') {
    var symbol = title.substring(0, 1);
    return (0,jsx_runtime.jsx)("div", {
      id: "avatarLogo",
      children: symbol
    });
  }
  return logo;
};
var SimpleContent = function SimpleContent(props) {
  var appList = props.appList,
    baseClassName = props.baseClassName,
    hashId = props.hashId,
    itemClick = props.itemClick;
  return (0,jsx_runtime.jsx)("div", {
    className: "".concat(baseClassName, "-content ").concat(hashId),
    children: (0,jsx_runtime.jsx)("ul", {
      className: "".concat(baseClassName, "-content-list ").concat(hashId),
      children: appList === null || appList === void 0 ? void 0 : appList.map(function (app, index) {
        var _app$children;
        if (app === null || app === void 0 ? void 0 : (_app$children = app.children) === null || _app$children === void 0 ? void 0 : _app$children.length) {
          return (0,jsx_runtime.jsxs)("div", {
            className: "".concat(baseClassName, "-content-list-item-group ").concat(hashId),
            children: [(0,jsx_runtime.jsx)("div", {
              className: "".concat(baseClassName, "-content-list-item-group-title ").concat(hashId),
              children: app.title
            }), (0,jsx_runtime.jsx)(SimpleContent, {
              hashId: hashId,
              itemClick: itemClick,
              appList: app === null || app === void 0 ? void 0 : app.children,
              baseClassName: baseClassName
            })]
          });
        }
        return (0,jsx_runtime.jsx)("li", {
          className: "".concat(baseClassName, "-content-list-item ").concat(hashId),
          children: (0,jsx_runtime.jsxs)("a", {
            href: itemClick ? 'javascript:;' : app.url,
            onClick: function onClick() {
              return itemClick === null || itemClick === void 0 ? void 0 : itemClick(app);
            },
            target: app.target,
            rel: "noreferrer",
            children: [renderLogo(app.icon, app.title), (0,jsx_runtime.jsx)("div", {
              children: (0,jsx_runtime.jsx)("div", {
                children: app.title
              })
            })]
          })
        }, index);
      })
    })
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/style/default.js

var genAppsLogoComponentsDefaultListStyle = function genAppsLogoComponentsDefaultListStyle(token) {
  return {
    '&-content': {
      maxHeight: 'calc(100vh - 48px)',
      overflow: 'auto',
      '&-list': {
        boxSizing: 'content-box',
        maxWidth: 656,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
        '> *': {
          boxSizing: 'border-box',
          fontFamily: token.fontFamily
        },
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: 328,
          height: 72,
          paddingInline: 16,
          paddingBlock: 16,
          verticalAlign: 'top',
          listStyleType: 'none',
          transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
          borderRadius: token.borderRadius,
          '&-group': {
            marginBottom: 16,
            '&-title': {
              margin: '16px 0 8px 12px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.88)',
              fontSize: 16,
              opacity: 0.85,
              lineHeight: 1.5,
              '&:first-child': {
                marginTop: 12
              }
            }
          },
          '&:hover': {
            backgroundColor: token.colorBgTextHover
          },
          '*': {
            boxSizing: 'border-box',
            fontFamily: token.fontFamily
          },
          '* div': useStyle/* resetComponent */.Wf === null || useStyle/* resetComponent */.Wf === void 0 ? void 0 : (0,useStyle/* resetComponent */.Wf)(token),
          a: {
            display: 'flex',
            height: '100%',
            fontSize: 12,
            textDecoration: 'none',
            '& > img': {
              width: 40,
              height: 40
            },
            '& > div': {
              marginInlineStart: 14,
              color: token.colorTextHeading,
              fontSize: 14,
              lineHeight: '22px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            },
            '& > div > span': {
              color: token.colorTextSecondary,
              fontSize: 12,
              lineHeight: '20px'
            }
          }
        }
      }
    }
  };
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/style/simple.js
var genAppsLogoComponentsSimpleListStyle = function genAppsLogoComponentsSimpleListStyle(token) {
  return {
    '&-content': {
      maxHeight: 'calc(100vh - 48px)',
      overflow: 'auto',
      '&-list': {
        boxSizing: 'border-box',
        maxWidth: 376,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
        '*': {
          boxSizing: 'border-box',
          fontFamily: token.fontFamily
        },
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: 104,
          height: 104,
          marginBlock: 8,
          marginInline: 8,
          paddingInline: 24,
          paddingBlock: 24,
          verticalAlign: 'top',
          listStyleType: 'none',
          transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
          borderRadius: token.borderRadius,
          '&-group': {
            marginBottom: 16,
            '&-title': {
              margin: '16px 0 8px 12px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.88)',
              fontSize: 16,
              opacity: 0.85,
              lineHeight: 1.5,
              '&:first-child': {
                marginTop: 12
              }
            }
          },
          '&:hover': {
            backgroundColor: token.colorBgTextHover
          },
          a: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            fontSize: 12,
            textDecoration: 'none',
            '& > #avatarLogo': {
              width: 40,
              height: 40,
              margin: '0 auto',
              color: token.colorPrimary,
              fontSize: 22,
              lineHeight: '40px',
              textAlign: 'center',
              backgroundImage: 'linear-gradient(180deg, #E8F0FB 0%, #F6F8FC 100%)',
              borderRadius: token.borderRadius
            },
            '& > img': {
              width: 40,
              height: 40
            },
            '& > div': {
              marginBlockStart: 5,
              marginInlineStart: 0,
              color: token.colorTextHeading,
              fontSize: 14,
              lineHeight: '22px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            },
            '& > div > span': {
              color: token.colorTextSecondary,
              fontSize: 12,
              lineHeight: '20px'
            }
          }
        }
      }
    }
  };
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/style/index.js





var genAppsLogoComponentsStyle = function genAppsLogoComponentsStyle(token) {
  var _token$layout, _token$layout2, _token$layout3, _token$layout4, _token$layout5, _popover;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    '&-icon': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingInline: 4,
      paddingBlock: 0,
      fontSize: 14,
      lineHeight: '14px',
      height: 28,
      width: 28,
      cursor: 'pointer',
      color: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : _token$layout.colorTextAppListIcon,
      '&:hover': {
        color: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : _token$layout2.colorTextAppListIconHover,
        backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : _token$layout3.colorBgAppListIconHover
      },
      '&-active': {
        color: token === null || token === void 0 ? void 0 : (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : _token$layout4.colorTextAppListIconHover,
        backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : _token$layout5.colorBgAppListIconHover
      }
    },
    '&-item-title': {
      marginInline: '16px 0 8px 12px',
      fontWeight: 600,
      color: 'rgba(0, 0, 0, 0.88)',
      fontSize: 16,
      opacity: 0.85,
      lineHeight: 1.5,
      '&:first-child': {
        marginBlockStart: 12
      }
    },
    '&-popover': (_popover = {}, (0,defineProperty/* default */.Z)(_popover, "".concat(token.antCls, "-popover-arrow"), {
      display: 'none'
    }), (0,defineProperty/* default */.Z)(_popover, '*', {
      boxSizing: 'border-box',
      fontFamily: token.fontFamily
    }), _popover),
    '&-simple': genAppsLogoComponentsSimpleListStyle(token),
    '&-default': genAppsLogoComponentsDefaultListStyle(token)
  });
};
function AppsLogoComponents_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('AppsLogoComponents', function (token) {
    var proCardToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genAppsLogoComponentsStyle(proCardToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/AppsLogoComponents/index.js












/**
 * \u9ED8\u8BA4\u6E32\u67D3logo\u7684\u65B9\u5F0F\uFF0C\u5982\u679C\u662F\u4E2Astring\uFF0C\u7528img\u3002\u5426\u5219\u76F4\u63A5\u8FD4\u56DE
 *
 * @param logo
 * @returns
 */
var defaultRenderLogo = function defaultRenderLogo(logo) {
  if (typeof logo === 'string') {
    return (0,jsx_runtime.jsx)("img", {
      width: "auto",
      height: 22,
      src: logo,
      alt: "logo"
    });
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};
/**
 * \u76F8\u5173\u54C1\u724C\u989Dicon \u5217\u8868\u3002\u7528\u4E8E\u5C55\u793A\u76F8\u5173\u7684\u54C1\u724C
 *
 * @param props
 * @returns
 */
var AppsLogoComponents = function AppsLogoComponents(props) {
  var _props$appList;
  var appList = props.appList,
    _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'ant-pro' : _props$prefixCls,
    itemClick = props.itemClick;
  var ref = react.useRef(null);
  var baseClassName = "".concat(prefixCls, "-layout-apps");
  var _useStyle = AppsLogoComponents_style_useStyle(baseClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var _useState = (0,react.useState)(false),
    _useState2 = (0,esm_slicedToArray/* default */.Z)(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var popoverContent = (0,react.useMemo)(function () {
    var isSimple = appList === null || appList === void 0 ? void 0 : appList.some(function (app) {
      return !(app === null || app === void 0 ? void 0 : app.desc);
    });
    if (isSimple) {
      return (0,jsx_runtime.jsx)(SimpleContent, {
        hashId: hashId,
        appList: appList,
        itemClick: itemClick,
        baseClassName: "".concat(baseClassName, "-simple")
      });
    }
    return (0,jsx_runtime.jsx)(DefaultContent, {
      hashId: hashId,
      appList: appList,
      itemClick: itemClick,
      baseClassName: "".concat(baseClassName, "-default")
    });
  }, [appList, baseClassName, hashId]);
  if (!(props === null || props === void 0 ? void 0 : (_props$appList = props.appList) === null || _props$appList === void 0 ? void 0 : _props$appList.length)) return null;
  var popoverOpenProps = openVisibleCompatible(undefined, function (openChange) {
    return setOpen(openChange);
  });
  return wrapSSR((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)("div", {
      ref: ref,
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
      }
    }), (0,jsx_runtime.jsx)(popover/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      placement: "bottomRight",
      trigger: ['click'],
      zIndex: 9999,
      arrowPointAtCenter: true
    }, popoverOpenProps), {}, {
      overlayClassName: "".concat(baseClassName, "-popover ").concat(hashId),
      content: popoverContent,
      getPopupContainer: function getPopupContainer() {
        return ref.current || document.body;
      },
      children: (0,jsx_runtime.jsx)("span", {
        onClick: function onClick(e) {
          e.stopPropagation();
        },
        className: classnames_default()("".concat(baseClassName, "-icon"), hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-icon-active"), open)),
        children: (0,jsx_runtime.jsx)(AppsLogo, {})
      })
    }))]
  }));
};
// EXTERNAL MODULE: ./node_modules/antd/es/space/index.js + 2 modules
var space = __webpack_require__(2885);
// EXTERNAL MODULE: ./node_modules/antd/es/avatar/index.js + 7 modules
var es_avatar = __webpack_require__(8367);
// EXTERNAL MODULE: ./node_modules/antd/es/menu/index.js + 12 modules
var es_menu = __webpack_require__(20693);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/Arrow.js

function ArrowSvgIcon() {
  return (0,jsx_runtime.jsx)("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 12 12",
    fill: "currentColor",
    "aria-hidden": "true",
    children: (0,jsx_runtime.jsx)("path", {
      d: "M6.432 7.967a.448.448 0 01-.318.133h-.228a.46.46 0 01-.318-.133L2.488 4.85a.305.305 0 010-.43l.427-.43a.293.293 0 01.42 0L6 6.687l2.665-2.699a.299.299 0 01.426 0l.42.431a.305.305 0 010 .43L6.432 7.967z"
    })
  });
}

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/CollapsedIcon/style.js



var genSiderMenuStyle = function genSiderMenuStyle(token) {
  var _token$layout, _token$layout$sider, _token$layout2, _token$layout2$sider, _token$layout3, _token$layout3$sider;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    position: 'absolute',
    insetBlockStart: '18px',
    zIndex: '101',
    width: '24px',
    height: '24px',
    fontSize: ['14px', '16px'],
    textAlign: 'center',
    borderRadius: '40px',
    insetInlineEnd: '-13px',
    transition: 'transform 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$sider = _token$layout.sider) === null || _token$layout$sider === void 0 ? void 0 : _token$layout$sider.colorTextCollapsedButton,
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$sider = _token$layout2.sider) === null || _token$layout2$sider === void 0 ? void 0 : _token$layout2$sider.colorBgCollapsedButton,
    boxShadow: '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(25,15,15,0.07), 0 0 1px 0 rgba(0,0,0,0.08)',
    '&:hover': {
      color: token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$sider = _token$layout3.sider) === null || _token$layout3$sider === void 0 ? void 0 : _token$layout3$sider.colorTextCollapsedButtonHover,
      boxShadow: '0 4px 16px -4px rgba(0,0,0,0.05), 0 2px 8px -2px rgba(25,15,15,0.07), 0 1px 2px 0 rgba(0,0,0,0.08)'
    },
    '.anticon': {
      fontSize: '14px'
    },
    '& > svg': {
      transition: 'transform  0.3s',
      transform: 'rotate(90deg)'
    },
    '&-collapsed': {
      '& > svg': {
        transform: 'rotate(-90deg)'
      }
    }
  });
};
function CollapsedIcon_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('SiderMenuCollapsedIcon', function (token) {
    var siderMenuToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genSiderMenuStyle(siderMenuToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/CollapsedIcon/index.js



var CollapsedIcon_excluded = ["isMobile", "collapsed"];




var CollapsedIcon = function CollapsedIcon(props) {
  var _classNames;
  var isMobile = props.isMobile,
    collapsed = props.collapsed,
    rest = (0,objectWithoutProperties/* default */.Z)(props, CollapsedIcon_excluded);
  var _useStyle = CollapsedIcon_style_useStyle(props.className),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  if (isMobile && collapsed) return null;
  return wrapSSR((0,jsx_runtime.jsx)("div", (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, rest), {}, {
    className: classnames_default()(props.className, hashId, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(props.className, "-collapsed"), collapsed), (0,defineProperty/* default */.Z)(_classNames, "".concat(props.className, "-is-mobile"), isMobile), _classNames)),
    children: (0,jsx_runtime.jsx)(ArrowSvgIcon, {})
  })));
};
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var esm_toConsumableArray = __webpack_require__(74902);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(43144);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(15671);
// EXTERNAL MODULE: ./node_modules/@ant-design/icons/es/components/Context.js
var Context = __webpack_require__(63017);
// EXTERNAL MODULE: ./node_modules/@ant-design/icons/es/utils.js
var utils = __webpack_require__(41755);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/components/Icon.js



var Icon_excluded = ["className", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children"];




var Icon = /*#__PURE__*/react.forwardRef(function (props, ref) {
  var className = props.className,
    Component = props.component,
    viewBox = props.viewBox,
    spin = props.spin,
    rotate = props.rotate,
    tabIndex = props.tabIndex,
    onClick = props.onClick,
    children = props.children,
    restProps = (0,objectWithoutProperties/* default */.Z)(props, Icon_excluded);
  (0,utils/* warning */.Kp)(Boolean(Component || children), 'Should have \`component\` prop or \`children\`.');
  (0,utils/* useInsertStyles */.C3)();
  var _React$useContext = react.useContext(Context/* default */.Z),
    _React$useContext$pre = _React$useContext.prefixCls,
    prefixCls = _React$useContext$pre === void 0 ? 'anticon' : _React$useContext$pre,
    rootClassName = _React$useContext.rootClassName;
  var classString = classnames_default()(rootClassName, prefixCls, className);
  var svgClassString = classnames_default()((0,defineProperty/* default */.Z)({}, "".concat(prefixCls, "-spin"), !!spin));
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;
  var innerSvgProps = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, utils/* svgBaseProps */.vD), {}, {
    className: svgClassString,
    style: svgStyle,
    viewBox: viewBox
  });
  if (!viewBox) {
    delete innerSvgProps.viewBox;
  }
  // component > children
  var renderInnerNode = function renderInnerNode() {
    if (Component) {
      return /*#__PURE__*/react.createElement(Component, (0,esm_objectSpread2/* default */.Z)({}, innerSvgProps), children);
    }
    if (children) {
      (0,utils/* warning */.Kp)(Boolean(viewBox) || react.Children.count(children) === 1 && /*#__PURE__*/react.isValidElement(children) && react.Children.only(children).type === 'use', 'Make sure that you provide correct \`viewBox\`' + ' prop (default \`0 0 1024 1024\`) to the icon.');
      return /*#__PURE__*/react.createElement("svg", (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, innerSvgProps), {}, {
        viewBox: viewBox
      }), children);
    }
    return null;
  };
  var iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }
  return /*#__PURE__*/react.createElement("span", (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    role: "img"
  }, restProps), {}, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), renderInnerNode());
});
Icon.displayName = 'AntdIcon';
/* harmony default export */ var components_Icon = (Icon);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/components/IconFont.js


var IconFont_excluded = ["type", "children"];


var customCache = new Set();
function isValidCustomScriptUrl(scriptUrl) {
  return Boolean(typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl));
}
function createScriptUrlElements(scriptUrls) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    var script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-namespace', currentScriptUrl);
    if (scriptUrls.length > index + 1) {
      script.onload = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };
      script.onerror = function () {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }
    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}
function create() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var scriptUrl = options.scriptUrl,
    _options$extraCommonP = options.extraCommonProps,
    extraCommonProps = _options$extraCommonP === void 0 ? {} : _options$extraCommonP;
  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (scriptUrl && typeof document !== 'undefined' && typeof window !== 'undefined' && typeof document.createElement === 'function') {
    if (Array.isArray(scriptUrl)) {
      // \u56E0\u4E3Aiconfont\u8D44\u6E90\u4F1A\u628Asvg\u63D2\u5165before\uFF0C\u6240\u4EE5\u524D\u52A0\u8F7D\u76F8\u540Ctype\u4F1A\u8986\u76D6\u540E\u52A0\u8F7D\uFF0C\u4E3A\u4E86\u6570\u7EC4\u8986\u76D6\u987A\u5E8F\uFF0C\u5012\u53D9\u63D2\u5165
      createScriptUrlElements(scriptUrl.reverse());
    } else {
      createScriptUrlElements([scriptUrl]);
    }
  }
  var Iconfont = /*#__PURE__*/react.forwardRef(function (props, ref) {
    var type = props.type,
      children = props.children,
      restProps = (0,objectWithoutProperties/* default */.Z)(props, IconFont_excluded);
    // children > type
    var content = null;
    if (props.type) {
      content = /*#__PURE__*/react.createElement("use", {
        xlinkHref: "#".concat(type)
      });
    }
    if (children) {
      content = children;
    }
    return /*#__PURE__*/react.createElement(components_Icon, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, extraCommonProps), restProps), {}, {
      ref: ref
    }), content);
  });
  Iconfont.displayName = 'Iconfont';
  return Iconfont;
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/isImg/index.js
/** \u5224\u65AD\u662F\u5426\u662F\u56FE\u7247\u94FE\u63A5 */
function isImg(path) {
  return /\\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path);
}
// EXTERNAL MODULE: ./node_modules/antd/es/skeleton/index.js + 12 modules
var skeleton = __webpack_require__(99559);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/defaultSettings.js
var defaultSettings = {
  navTheme: 'light',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  iconfontUrl: '',
  colorPrimary: '#1677FF',
  splitMenus: false
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/style/menu.js



var genProLayoutBaseMenuStyle = function genProLayoutBaseMenuStyle(token) {
  var _token$layout, _token$layout$sider, _collapsed, _collapsed2, _$concat3, _itemTitle, _$concat5;
  return (0,defineProperty/* default */.Z)({}, "".concat(token.componentCls), (_$concat5 = {
    background: 'transparent',
    border: 'none'
  }, (0,defineProperty/* default */.Z)(_$concat5, "".concat(token.componentCls, "-menu-item"), {
    transition: 'none !important'
  }), (0,defineProperty/* default */.Z)(_$concat5, "".concat(token.componentCls, "-submenu-has-icon"), (0,defineProperty/* default */.Z)({}, "> ".concat(token.antCls, "-menu-sub"), {
    paddingInlineStart: 10
  })), (0,defineProperty/* default */.Z)(_$concat5, "&&-collapsed", (_collapsed = {}, (0,defineProperty/* default */.Z)(_collapsed, "".concat(token.antCls, "-menu-item, \\n        ").concat(token.antCls, "-menu-item-group > ").concat(token.antCls, "-menu-item-group-list > ").concat(token.antCls, "-menu-item, \\n        ").concat(token.antCls, "-menu-item-group > ").concat(token.antCls, "-menu-item-group-list > ").concat(token.antCls, "-menu-submenu > ").concat(token.antCls, "-menu-submenu-title, \\n        ").concat(token.antCls, "-menu-submenu > ").concat(token.antCls, "-menu-submenu-title"), {
    paddingInline: '0 !important',
    marginBlock: '4px !important'
  }), (0,defineProperty/* default */.Z)(_collapsed, "".concat(token.antCls, "-menu-item-group > ").concat(token.antCls, "-menu-item-group-list > ").concat(token.antCls, "-menu-submenu-selected > ").concat(token.antCls, "-menu-submenu-title, \\n        ").concat(token.antCls, "-menu-submenu-selected > ").concat(token.antCls, "-menu-submenu-title"), {
    backgroundColor: (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$sider = _token$layout.sider) === null || _token$layout$sider === void 0 ? void 0 : _token$layout$sider.colorBgMenuItemSelected,
    borderRadius: token.borderRadius
  }), (0,defineProperty/* default */.Z)(_collapsed, "".concat(token.componentCls, "-group"), (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-menu-item-group-title"), {
    paddingInline: 0
  })), _collapsed)), (0,defineProperty/* default */.Z)(_$concat5, "".concat(token.componentCls, "-item-icon"), {
    height: '14px',
    width: '14px',
    opacity: '0.85',
    '.anticon': {
      lineHeight: '14px',
      height: '14px'
    }
  }), (0,defineProperty/* default */.Z)(_$concat5, '& &-item-title', (_itemTitle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&-collapsed': (_collapsed2 = {
      flexDirection: 'column',
      justifyContent: 'center'
    }, (0,defineProperty/* default */.Z)(_collapsed2, "".concat(token.componentCls, "-item-text"), {
      maxWidth: '100%'
    }), (0,defineProperty/* default */.Z)(_collapsed2, "".concat(token.componentCls, "-item-text-has-icon"), {
      display: 'none !important'
    }), _collapsed2)
  }, (0,defineProperty/* default */.Z)(_itemTitle, "&".concat(token.componentCls, "-group-item-title"), {
    gap: 4,
    height: 18,
    overflow: 'hidden'
  }), (0,defineProperty/* default */.Z)(_itemTitle, "&".concat(token.componentCls, "-item-collapsed-show-title"), (0,defineProperty/* default */.Z)({
    lineHeight: '16px',
    height: '48px'
  }, "&".concat(token.componentCls, "-item-title-collapsed"), (_$concat3 = {
    display: 'flex'
  }, (0,defineProperty/* default */.Z)(_$concat3, "".concat(token.componentCls, "-item-icon"), {
    height: '16px',
    lineHeight: '16px !important',
    '.anticon': {
      lineHeight: '16px',
      height: '16px'
    }
  }), (0,defineProperty/* default */.Z)(_$concat3, "".concat(token.componentCls, "-item-text"), {
    opacity: '1 !important',
    display: 'inline !important',
    textAlign: 'center',
    fontSize: 12,
    height: 12,
    lineHeight: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    margin: 0,
    padding: 0,
    marginBlockStart: 4
  }), _$concat3))), _itemTitle)), (0,defineProperty/* default */.Z)(_$concat5, '&-group', (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-menu-item-group-title"), {
    fontSize: 12,
    color: token.colorTextLabel,
    '.anticon': {
      marginInlineEnd: 8
    }
  })), (0,defineProperty/* default */.Z)(_$concat5, '&-group-divider', {
    color: token.colorTextSecondary,
    fontSize: 12,
    lineHeight: 20
  }), _$concat5));
};
function menu_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutBaseMenu', function (token) {
    var proLayoutMenuToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProLayoutBaseMenuStyle(proLayoutMenuToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/BaseMenu.js

















var IconFont = create({
  scriptUrl: defaultSettings.iconfontUrl
});
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
var getIcon = function getIcon(icon) {
  var iconPrefixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'icon-';
  var className = arguments.length > 2 ? arguments[2] : undefined;
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl_isUrl(icon) || isImg(icon)) {
      return (0,jsx_runtime.jsx)("img", {
        width: 16,
        src: icon,
        alt: "icon",
        className: className
      }, icon);
    }
    if (icon.startsWith(iconPrefixes)) {
      return (0,jsx_runtime.jsx)(IconFont, {
        type: icon
      });
    }
  }
  return icon;
};
var getMenuTitleSymbol = function getMenuTitleSymbol(title) {
  if (title && typeof title === 'string') {
    var symbol = title.substring(0, 1).toUpperCase();
    return symbol;
  }
  return null;
};
var MenuUtil = /*#__PURE__*/(0,createClass/* default */.Z)(function MenuUtil(props) {
  var _this = this;
  (0,classCallCheck/* default */.Z)(this, MenuUtil);
  this.props = void 0;
  this.getNavMenuItems = function () {
    var menusData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var level = arguments.length > 1 ? arguments[1] : undefined;
    return menusData.map(function (item) {
      return _this.getSubMenuOrItem(item, level);
    }).filter(function (item) {
      return item;
    }).flat(1);
  };
  this.getSubMenuOrItem = function (item, level) {
    var _this$props = _this.props,
      subMenuItemRender = _this$props.subMenuItemRender,
      baseClassName = _this$props.baseClassName,
      prefixCls = _this$props.prefixCls,
      collapsed = _this$props.collapsed,
      menu = _this$props.menu,
      iconPrefixes = _this$props.iconPrefixes,
      layout = _this$props.layout;
    var isGroup = (menu === null || menu === void 0 ? void 0 : menu.type) === 'group' && layout !== 'top';
    var designToken = _this.props.token;
    var name = _this.getIntlName(item);
    var children = (item === null || item === void 0 ? void 0 : item.children) || (item === null || item === void 0 ? void 0 : item.routes);
    var menuType = isGroup && level === 0 ? 'group' : undefined;
    if (Array.isArray(children) && children.length > 0) {
      var _this$props2, _this$props3, _classNames, _this$props4, _this$props5, _classNames3, _designToken$layout, _designToken$layout$s;
      /** Menu \u7B2C\u4E00\u7EA7\u53EF\u4EE5\u6709icon\uFF0C\u6216\u8005 isGroup \u65F6\u7B2C\u4E8C\u7EA7\u522B\u4E5F\u8981\u6709 */
      var shouldHasIcon = level === 0 || isGroup && level === 1;
      //  get defaultTitle by menuItemRender
      var iconDom = getIcon(item.icon, iconPrefixes, "action ".concat(baseClassName, "-icon ").concat((_this$props2 = _this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.hashId));
      /**
       * \u5982\u679C\u6CA1\u6709icon\u5728\u6536\u8D77\u7684\u65F6\u5019\u7528\u9996\u5B57\u6BCD\u4EE3\u66FF
       */
      var defaultIcon = collapsed && shouldHasIcon ? getMenuTitleSymbol(name) : null;
      var defaultTitle = (0,jsx_runtime.jsxs)("div", {
        title: name,
        className: classnames_default()("".concat(baseClassName, "-item-title"), (_this$props3 = _this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.hashId, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-item-title-collapsed"), collapsed), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-group-item-title"), menuType === 'group'), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-item-collapsed-show-title"), (menu === null || menu === void 0 ? void 0 : menu.collapsedShowTitle) && collapsed), _classNames)),
        children: [menuType === 'group' && collapsed ? null : shouldHasIcon && iconDom ? (0,jsx_runtime.jsx)("span", {
          className: "anticon ".concat(baseClassName, "-item-icon ").concat((_this$props4 = _this.props) === null || _this$props4 === void 0 ? void 0 : _this$props4.hashId),
          children: iconDom
        }) : defaultIcon, (0,jsx_runtime.jsx)("span", {
          className: classnames_default()("".concat(baseClassName, "-item-text"), (_this$props5 = _this.props) === null || _this$props5 === void 0 ? void 0 : _this$props5.hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-item-text-has-icon"), menuType !== 'group' && shouldHasIcon && (iconDom || defaultIcon))),
          children: name
        })]
      });
      // subMenu only title render
      var title = subMenuItemRender ? subMenuItemRender((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, item), {}, {
        isUrl: false
      }), defaultTitle, _this.props) : defaultTitle;
      var childrenList = _this.getNavMenuItems(children, level + 1);
      if (isGroup && level === 0 && _this.props.collapsed && !menu.collapsedShowGroupTitle) {
        return childrenList;
      }
      return [{
        type: menuType,
        key: item.key || item.path,
        title: item.tooltip || title,
        label: title,
        onClick: isGroup ? undefined : item.onTitleClick,
        children: childrenList,
        className: classnames_default()((_classNames3 = {}, (0,defineProperty/* default */.Z)(_classNames3, "".concat(baseClassName, "-group"), menuType === 'group'), (0,defineProperty/* default */.Z)(_classNames3, "".concat(baseClassName, "-submenu"), menuType !== 'group'), (0,defineProperty/* default */.Z)(_classNames3, "".concat(baseClassName, "-submenu-has-icon"), menuType !== 'group' && shouldHasIcon && iconDom), _classNames3))
      }, isGroup && level === 0 ? {
        type: 'divider',
        prefixCls: prefixCls,
        className: "".concat(baseClassName, "-divider"),
        key: (item.key || item.path) + '-group-divider',
        style: {
          padding: 0,
          borderBlockEnd: 0,
          margin: _this.props.collapsed ? '4px' : '6px 16px',
          marginBlockStart: _this.props.collapsed ? 4 : 8,
          borderColor: designToken === null || designToken === void 0 ? void 0 : (_designToken$layout = designToken.layout) === null || _designToken$layout === void 0 ? void 0 : (_designToken$layout$s = _designToken$layout.sider) === null || _designToken$layout$s === void 0 ? void 0 : _designToken$layout$s.colorMenuItemDivider
        }
      } : undefined].filter(Boolean);
    }
    return {
      className: "".concat(baseClassName, "-menu-item"),
      title: item.tooltip || name,
      disabled: item.disabled,
      key: item.key || item.path,
      onClick: item.onTitleClick,
      label: _this.getMenuItemPath(item, level)
    };
  };
  this.getIntlName = function (item) {
    var name = item.name,
      locale = item.locale;
    var _this$props6 = _this.props,
      menu = _this$props6.menu,
      formatMessage = _this$props6.formatMessage;
    if (locale && (menu === null || menu === void 0 ? void 0 : menu.locale) !== false) {
      return formatMessage === null || formatMessage === void 0 ? void 0 : formatMessage({
        id: locale,
        defaultMessage: name
      });
    }
    return name;
  };
  this.getMenuItemPath = function (item, level) {
    var _this$props9, _this$props10, _classNames4, _this$props11, _this$props12;
    var itemPath = _this.conversionPath(item.path || '/');
    var _this$props7 = _this.props,
      _this$props7$location = _this$props7.location,
      location = _this$props7$location === void 0 ? {
        pathname: '/'
      } : _this$props7$location,
      isMobile = _this$props7.isMobile,
      onCollapse = _this$props7.onCollapse,
      menuItemRender = _this$props7.menuItemRender,
      iconPrefixes = _this$props7.iconPrefixes;
    // if local is true formatMessage all name\u3002
    var name = _this.getIntlName(item);
    var _this$props8 = _this.props,
      baseClassName = _this$props8.baseClassName,
      menu = _this$props8.menu,
      collapsed = _this$props8.collapsed;
    var isGroup = (menu === null || menu === void 0 ? void 0 : menu.type) === 'group';
    /** Menu \u7B2C\u4E00\u7EA7\u53EF\u4EE5\u6709icon\uFF0C\u6216\u8005 isGroup \u65F6\u7B2C\u4E8C\u7EA7\u522B\u4E5F\u8981\u6709 */
    var hasIcon = level === 0 || isGroup && level === 1;
    var icon = !hasIcon ? null : getIcon(item.icon, iconPrefixes, "".concat(baseClassName, "-icon ").concat((_this$props9 = _this.props) === null || _this$props9 === void 0 ? void 0 : _this$props9.hashId));
    var defaultIcon = collapsed && hasIcon ? getMenuTitleSymbol(name) : null;
    var defaultItem = (0,jsx_runtime.jsxs)("div", {
      className: classnames_default()("".concat(baseClassName, "-item-title"), (_this$props10 = _this.props) === null || _this$props10 === void 0 ? void 0 : _this$props10.hashId, (_classNames4 = {}, (0,defineProperty/* default */.Z)(_classNames4, "".concat(baseClassName, "-item-title-collapsed"), collapsed), (0,defineProperty/* default */.Z)(_classNames4, "".concat(baseClassName, "-item-collapsed-show-title"), (menu === null || menu === void 0 ? void 0 : menu.collapsedShowTitle) && collapsed), _classNames4)),
      children: [icon ? (0,jsx_runtime.jsx)("span", {
        className: "anticon ".concat(baseClassName, "-item-icon ").concat((_this$props11 = _this.props) === null || _this$props11 === void 0 ? void 0 : _this$props11.hashId),
        children: icon
      }) : defaultIcon, (0,jsx_runtime.jsx)("span", {
        className: classnames_default()("".concat(baseClassName, "-item-text"), (_this$props12 = _this.props) === null || _this$props12 === void 0 ? void 0 : _this$props12.hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-item-text-has-icon"), hasIcon && (icon || defaultIcon))),
        children: name
      })]
    }, itemPath);
    var isHttpUrl = isUrl_isUrl(itemPath);
    // Is it a http link
    if (isHttpUrl) {
      var _this$props13, _classNames6, _this$props14, _this$props15;
      defaultItem = (0,jsx_runtime.jsxs)("span", {
        title: name,
        onClick: function onClick() {
          var _window, _window$open;
          (_window = window) === null || _window === void 0 ? void 0 : (_window$open = _window.open) === null || _window$open === void 0 ? void 0 : _window$open.call(_window, itemPath, '_blank');
        },
        className: classnames_default()("".concat(baseClassName, "-item-title"), (_this$props13 = _this.props) === null || _this$props13 === void 0 ? void 0 : _this$props13.hashId, (_classNames6 = {}, (0,defineProperty/* default */.Z)(_classNames6, "".concat(baseClassName, "-item-title-collapsed"), collapsed), (0,defineProperty/* default */.Z)(_classNames6, "".concat(baseClassName, "-item-link"), true), (0,defineProperty/* default */.Z)(_classNames6, "".concat(baseClassName, "-item-collapsed-show-title"), (menu === null || menu === void 0 ? void 0 : menu.collapsedShowTitle) && collapsed), _classNames6)),
        children: [icon ? (0,jsx_runtime.jsx)("span", {
          className: "anticon ".concat(baseClassName, "-item-icon ").concat((_this$props14 = _this.props) === null || _this$props14 === void 0 ? void 0 : _this$props14.hashId),
          children: icon
        }) : defaultIcon, (0,jsx_runtime.jsx)("span", {
          className: classnames_default()("".concat(baseClassName, "-item-text"), (_this$props15 = _this.props) === null || _this$props15 === void 0 ? void 0 : _this$props15.hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-item-text-has-icon"), hasIcon && (icon || defaultIcon))),
          children: name
        })]
      }, itemPath);
    }
    if (menuItemRender) {
      var renderItemProps = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, item), {}, {
        isUrl: isHttpUrl,
        itemPath: itemPath,
        isMobile: isMobile,
        replace: itemPath === location.pathname,
        onClick: function onClick() {
          return onCollapse && onCollapse(true);
        },
        children: undefined
      });
      return menuItemRender(renderItemProps, defaultItem, _this.props);
    }
    return defaultItem;
  };
  this.conversionPath = function (path) {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return "/".concat(path || '').replace(/\\/+/g, '/');
  };
  this.props = props;
});
/**
 * \u751F\u6210openKeys \u7684\u5BF9\u8C61\uFF0C\u56E0\u4E3A\u8BBE\u7F6E\u4E86openKeys \u5C31\u4F1A\u53D8\u6210\u53D7\u63A7\uFF0C\u6240\u4EE5\u9700\u8981\u4E00\u4E2A\u7A7A\u5BF9\u8C61
 *
 * @param BaseMenuProps
 */
var getOpenKeysProps = function getOpenKeysProps(openKeys, _ref) {
  var layout = _ref.layout,
    collapsed = _ref.collapsed;
  var openKeysProps = {};
  if (openKeys && !collapsed && ['side', 'mix'].includes(layout || 'mix')) {
    openKeysProps = {
      openKeys: openKeys
    };
  }
  return openKeysProps;
};
var BaseMenu = function BaseMenu(props) {
  var _classNames8;
  var mode = props.mode,
    className = props.className,
    handleOpenChange = props.handleOpenChange,
    style = props.style,
    menuData = props.menuData,
    prefixCls = props.prefixCls,
    menu = props.menu,
    matchMenuKeys = props.matchMenuKeys,
    iconfontUrl = props.iconfontUrl,
    propsSelectedKeys = props.selectedKeys,
    onSelect = props.onSelect,
    menuRenderType = props.menuRenderType,
    propsOpenKeys = props.openKeys;
  var _useContext = (0,react.useContext)(es/* ProProvider */.L_),
    designToken = _useContext.token;
  var baseClassName = "".concat(prefixCls, "-base-menu");
  // \u7528\u4E8E\u51CF\u5C11 defaultOpenKeys \u8BA1\u7B97\u7684\u7EC4\u4EF6
  var defaultOpenKeysRef = (0,react.useRef)([]);
  var _useMountMergeState = (0,useMergedState/* default */.Z)(menu === null || menu === void 0 ? void 0 : menu.defaultOpenAll),
    _useMountMergeState2 = (0,esm_slicedToArray/* default */.Z)(_useMountMergeState, 2),
    defaultOpenAll = _useMountMergeState2[0],
    setDefaultOpenAll = _useMountMergeState2[1];
  var _useMountMergeState3 = (0,useMergedState/* default */.Z)(function () {
      if (menu === null || menu === void 0 ? void 0 : menu.defaultOpenAll) {
        return getOpenKeysFromMenuData(menuData) || [];
      }
      if (propsOpenKeys === false) {
        return false;
      }
      return [];
    }, {
      value: propsOpenKeys === false ? undefined : propsOpenKeys,
      onChange: handleOpenChange
    }),
    _useMountMergeState4 = (0,esm_slicedToArray/* default */.Z)(_useMountMergeState3, 2),
    openKeys = _useMountMergeState4[0],
    setOpenKeys = _useMountMergeState4[1];
  var _useMountMergeState5 = (0,useMergedState/* default */.Z)([], {
      value: propsSelectedKeys,
      onChange: onSelect ? function (keys) {
        if (onSelect && keys) {
          onSelect(keys);
        }
      } : undefined
    }),
    _useMountMergeState6 = (0,esm_slicedToArray/* default */.Z)(_useMountMergeState5, 2),
    selectedKeys = _useMountMergeState6[0],
    setSelectedKeys = _useMountMergeState6[1];
  (0,react.useEffect)(function () {
    if ((menu === null || menu === void 0 ? void 0 : menu.defaultOpenAll) || propsOpenKeys === false) {
      return;
    }
    if (matchMenuKeys) {
      setOpenKeys(matchMenuKeys);
      setSelectedKeys(matchMenuKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchMenuKeys.join('-')]);
  (0,react.useEffect)(function () {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = create({
        scriptUrl: iconfontUrl
      });
    }
  }, [iconfontUrl]);
  (0,react.useEffect)(function () {
    // if pathname can't match, use the nearest parent's key
    if (matchMenuKeys.join('-') !== (selectedKeys || []).join('-')) {
      setSelectedKeys(matchMenuKeys);
    }
    if (!defaultOpenAll && propsOpenKeys !== false && matchMenuKeys.join('-') !== (openKeys || []).join('-')) {
      var newKeys = matchMenuKeys;
      // \u5982\u679C\u4E0D\u81EA\u52A8\u5173\u95ED\uFF0C\u6211\u9700\u8981\u628A openKeys \u653E\u8FDB\u53BB
      if ((menu === null || menu === void 0 ? void 0 : menu.autoClose) === false) {
        newKeys = Array.from(new Set([].concat((0,esm_toConsumableArray/* default */.Z)(matchMenuKeys), (0,esm_toConsumableArray/* default */.Z)(openKeys || []))));
      }
      setOpenKeys(newKeys);
    } else if ((menu === null || menu === void 0 ? void 0 : menu.ignoreFlatMenu) && defaultOpenAll) {
      // \u5FFD\u7565\u7528\u6237\u624B\u52A8\u6298\u53E0\u8FC7\u7684\u83DC\u5355\u72B6\u6001\uFF0C\u6298\u53E0\u6309\u94AE\u5207\u6362\u4E4B\u540E\u4E5F\u53EF\u5B9E\u73B0\u9ED8\u8BA4\u5C55\u5F00\u6240\u6709\u83DC\u5355
      setOpenKeys(getOpenKeysFromMenuData(menuData));
    } else {
      setDefaultOpenAll(false);
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [matchMenuKeys.join('-')]);
  var openKeysProps = (0,react.useMemo)(function () {
    return getOpenKeysProps(openKeys, props);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [openKeys && openKeys.join(','), props.layout, props.collapsed]);
  var _useStyle = menu_useStyle(baseClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var menuUtils = (0,react.useMemo)(function () {
    return new MenuUtil((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
      token: designToken,
      menuRenderType: menuRenderType,
      baseClassName: baseClassName,
      hashId: hashId
    }));
  }, [props, designToken, menuRenderType, baseClassName, hashId]);
  if (menu === null || menu === void 0 ? void 0 : menu.loading) {
    return (0,jsx_runtime.jsx)("div", {
      style: (mode === null || mode === void 0 ? void 0 : mode.includes('inline')) ? {
        padding: 24
      } : {
        marginBlockStart: 16
      },
      children: (0,jsx_runtime.jsx)(skeleton/* default */.Z, {
        active: true,
        title: false,
        paragraph: {
          rows: (mode === null || mode === void 0 ? void 0 : mode.includes('inline')) ? 6 : 1
        }
      })
    });
  }
  // \u8FD9\u6B21 openKeys === false \u7684\u65F6\u5019\u7684\u60C5\u51B5\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u5E2E\u7528\u6237\u9009\u4E2D\u4E00\u6B21
  // \u7B2C\u4E8C\u6B64\u4E0D\u4F1A\u4F7F\u7528\uFF0C\u6240\u4EE5\u7528\u4E86 defaultOpenKeys
  // \u8FD9\u91CC\u8FD4\u56DE null\uFF0C\u662F\u4E3A\u4E86\u8BA9 defaultOpenKeys \u751F\u6548
  if (props.openKeys === false && !props.handleOpenChange) {
    defaultOpenKeysRef.current = matchMenuKeys;
  }
  var finallyData = props.postMenuData ? props.postMenuData(menuData) : menuData;
  if (finallyData && (finallyData === null || finallyData === void 0 ? void 0 : finallyData.length) < 1) {
    return null;
  }
  return wrapSSR( /*#__PURE__*/(0,react.createElement)(es_menu/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, openKeysProps), {}, {
    key: "Menu",
    mode: mode,
    inlineIndent: 16,
    defaultOpenKeys: defaultOpenKeysRef.current,
    theme: "light",
    selectedKeys: selectedKeys,
    style: (0,esm_objectSpread2/* default */.Z)({
      backgroundColor: 'transparent',
      border: 'none'
    }, style),
    className: classnames_default()(className, hashId, baseClassName, (_classNames8 = {}, (0,defineProperty/* default */.Z)(_classNames8, "".concat(baseClassName, "-horizontal"), mode === 'horizontal'), (0,defineProperty/* default */.Z)(_classNames8, "".concat(baseClassName, "-collapsed"), props.collapsed), _classNames8)),
    items: menuUtils.getNavMenuItems(finallyData, 0),
    onOpenChange: setOpenKeys
  }, props.menuProps)));
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/style/stylish.js



function useStylish(prefixCls, _ref) {
  var stylish = _ref.stylish,
    proLayoutCollapsedWidth = _ref.proLayoutCollapsedWidth;
  return (0,useStyle/* useStyle */.Xj)('ProLayoutSiderMenuStylish', function (token) {
    var siderMenuToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      proLayoutCollapsedWidth: proLayoutCollapsedWidth
    });
    if (!stylish) return [];
    return [(0,defineProperty/* default */.Z)({}, token.proComponentsCls, (0,defineProperty/* default */.Z)({}, "".concat(token.proComponentsCls, "-layout"), (0,defineProperty/* default */.Z)({}, "".concat(siderMenuToken.componentCls), stylish === null || stylish === void 0 ? void 0 : stylish(siderMenuToken))))];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/SiderMenu.js












var SiderMenu_Sider = es_layout.Sider;
/**
 * \u6E32\u67D3 title \u548C logo
 *
 * @param props
 * @param renderKey
 * @returns
 */
var renderLogoAndTitle = function renderLogoAndTitle(props) {
  var renderKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'menuHeaderRender';
  var logo = props.logo,
    title = props.title,
    layout = props.layout;
  var renderFunction = props[renderKey || ''];
  if (renderFunction === false) {
    return null;
  }
  var logoDom = defaultRenderLogo(logo);
  var titleDom = (0,jsx_runtime.jsx)("h1", {
    children: title !== null && title !== void 0 ? title : 'Ant Design Pro'
  });
  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }
  /**
   * \u6536\u8D77\u6765\u65F6\u5019\u76F4\u63A5\u4E0D\u663E\u793A
   */
  if (props.isMobile) {
    return null;
  }
  if (layout === 'mix' && renderKey === 'menuHeaderRender') return false;
  if (props.collapsed) {
    return (0,jsx_runtime.jsx)("a", {
      children: logoDom
    }, "title");
  }
  return (0,jsx_runtime.jsxs)("a", {
    children: [logoDom, titleDom]
  }, "title");
};
var SiderMenu = function SiderMenu(props) {
  var _classNames, _props$menu2, _process$env$NODE_ENV, _token$layout, _token$layout$sider, _token$layout2, _token$layout2$sider, _token$layout3, _token$layout3$sider, _token$layout4, _token$layout4$sider, _token$layout5, _token$layout5$sider, _token$layout6, _token$layout6$sider;
  var collapsed = props.collapsed,
    originCollapsed = props.originCollapsed,
    fixSiderbar = props.fixSiderbar,
    menuFooterRender = props.menuFooterRender,
    _onCollapse = props.onCollapse,
    theme = props.theme,
    siderWidth = props.siderWidth,
    isMobile = props.isMobile,
    onMenuHeaderClick = props.onMenuHeaderClick,
    _props$breakpoint = props.breakpoint,
    breakpoint = _props$breakpoint === void 0 ? 'lg' : _props$breakpoint,
    style = props.style,
    layout = props.layout,
    _props$menuExtraRende = props.menuExtraRender,
    menuExtraRender = _props$menuExtraRende === void 0 ? false : _props$menuExtraRende,
    links = props.links,
    menuContentRender = props.menuContentRender,
    collapsedButtonRender = props.collapsedButtonRender,
    prefixCls = props.prefixCls,
    avatarProps = props.avatarProps,
    rightContentRender = props.rightContentRender,
    actionsRender = props.actionsRender,
    onOpenChange = props.onOpenChange,
    stylish = props.stylish,
    logoStyle = props.logoStyle;
  var _useContext = (0,react.useContext)(es/* ProProvider */.L_),
    hashId = _useContext.hashId;
  var showSiderExtraDom = (0,react.useMemo)(function () {
    if (isMobile) return false;
    if (layout === 'mix') return false;
    return true;
  }, [isMobile, layout]);
  var baseClassName = "".concat(prefixCls, "-sider");
  // \u4E4B\u6240\u4EE5\u8FD9\u6837\u5199\u662F\u4E3A\u4E86\u63D0\u5347\u6837\u5F0F\u4F18\u5148\u7EA7\uFF0C\u4E0D\u7136\u4F1A\u88ABsider \u81EA\u5E26\u7684\u8986\u76D6\u6389
  var stylishClassName = useStylish("".concat(baseClassName, ".").concat(baseClassName, "-stylish"), {
    stylish: stylish,
    proLayoutCollapsedWidth: 64
  });
  var siderClassName = classnames_default()("".concat(baseClassName), hashId, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-fixed"), fixSiderbar), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-collapsed"), props.collapsed), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-layout-").concat(layout), layout && !isMobile), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-light"), theme !== 'dark'), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-mix"), layout === 'mix' && !isMobile), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-stylish"), !!stylish), _classNames));
  var headerDom = renderLogoAndTitle(props);
  var extraDom = menuExtraRender && menuExtraRender(props);
  var menuDom = (0,react.useMemo)(function () {
    return menuContentRender !== false && /*#__PURE__*/(0,react.createElement)(BaseMenu, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
      key: "base-menu",
      mode: "inline",
      handleOpenChange: onOpenChange,
      style: {
        width: '100%'
      },
      className: "".concat(baseClassName, "-menu ").concat(hashId)
    }));
  }, [baseClassName, hashId, menuContentRender, onOpenChange, props]);
  var linksMenuItems = (links || []).map(function (node, index) {
    return {
      className: "".concat(baseClassName, "-link"),
      label: node,
      key: index
    };
  });
  var menuRenderDom = (0,react.useMemo)(function () {
    return menuContentRender ? menuContentRender(props, menuDom) : menuDom;
  }, [menuContentRender, menuDom, props]);
  var avatarDom = (0,react.useMemo)(function () {
    return avatarProps && (0,jsx_runtime.jsxs)(space/* default */.Z, {
      align: "center",
      className: "".concat(baseClassName, "-actions-avatar"),
      children: [(0,jsx_runtime.jsx)(es_avatar/* default */.C, (0,esm_objectSpread2/* default */.Z)({
        size: 28
      }, avatarProps)), avatarProps.title && !collapsed && (0,jsx_runtime.jsx)("span", {
        children: avatarProps.title
      })]
    });
  }, [avatarProps, baseClassName, collapsed]);
  var actionsDom = (0,react.useMemo)(function () {
    if (!actionsRender) return null;
    return (0,jsx_runtime.jsx)(space/* default */.Z, {
      align: "center",
      size: 4,
      direction: collapsed ? 'vertical' : 'horizontal',
      className: classnames_default()(["".concat(baseClassName, "-actions-list"), collapsed && "".concat(baseClassName, "-actions-list-collapsed"), hashId]),
      children: actionsRender === null || actionsRender === void 0 ? void 0 : actionsRender(props).map(function (item, index) {
        return (0,jsx_runtime.jsx)("div", {
          className: "".concat(baseClassName, "-actions-list-item ").concat(hashId),
          children: item
        }, index);
      })
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [actionsRender, baseClassName, collapsed]);
  var appsDom = (0,react.useMemo)(function () {
    return (0,jsx_runtime.jsx)(AppsLogoComponents, {
      itemClick: props.itemClick,
      appList: props.appList,
      prefixCls: props.prefixCls
    });
  }, [props.appList, props.prefixCls]);
  var collapsedDom = (0,react.useMemo)(function () {
    if (collapsedButtonRender === false) return null;
    var dom = (0,jsx_runtime.jsx)(CollapsedIcon, {
      isMobile: isMobile,
      collapsed: originCollapsed,
      className: "".concat(baseClassName, "-collapsed-button"),
      onClick: function onClick() {
        _onCollapse === null || _onCollapse === void 0 ? void 0 : _onCollapse(!originCollapsed);
      }
    });
    if (collapsedButtonRender) return collapsedButtonRender(collapsed, dom);
    return dom;
  }, [collapsedButtonRender, isMobile, originCollapsed, baseClassName, collapsed, _onCollapse]);
  /** \u64CD\u4F5C\u533A\u57DF\u7684dom */
  var actionAreaDom = (0,react.useMemo)(function () {
    if (!avatarDom && !actionsDom) return null;
    return (0,jsx_runtime.jsxs)("div", {
      className: classnames_default()("".concat(baseClassName, "-actions"), hashId, collapsed && "".concat(baseClassName, "-actions-collapsed")),
      children: [avatarDom, actionsDom]
    });
  }, [actionsDom, avatarDom, baseClassName, collapsed, hashId]);
  var collapsedWidth = 60;
  /* Using the useMemo hook to create a CSS class that will hide the menu when the menu is collapsed. */
  var hideMenuWhenCollapsedClassName = (0,react.useMemo)(function () {
    var _props$menu;
    // \u6536\u8D77\u65F6\u5B8C\u5168\u9690\u85CF\u83DC\u5355
    if ((props === null || props === void 0 ? void 0 : (_props$menu = props.menu) === null || _props$menu === void 0 ? void 0 : _props$menu.hideMenuWhenCollapsed) && collapsed) {
      return "".concat(baseClassName, "-hide-menu-collapsed");
    }
    return null;
  }, [baseClassName, collapsed, props === null || props === void 0 ? void 0 : (_props$menu2 = props.menu) === null || _props$menu2 === void 0 ? void 0 : _props$menu2.hideMenuWhenCollapsed]);
  var menuFooterDom = menuFooterRender && (menuFooterRender === null || menuFooterRender === void 0 ? void 0 : menuFooterRender(props));
  var menuDomItems = (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [headerDom && (0,jsx_runtime.jsxs)("div", {
      className: classnames_default()([classnames_default()("".concat(baseClassName, "-logo"), hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-logo-collapsed"), collapsed))]),
      onClick: showSiderExtraDom ? onMenuHeaderClick : undefined,
      id: "logo",
      style: logoStyle,
      children: [headerDom, appsDom]
    }), extraDom && (0,jsx_runtime.jsx)("div", {
      className: classnames_default()(["".concat(baseClassName, "-extra"), !headerDom && "".concat(baseClassName, "-extra-no-logo"), hashId]),
      children: extraDom
    }), (0,jsx_runtime.jsx)("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      },
      children: menuRenderDom
    }), links ? (0,jsx_runtime.jsx)("div", {
      className: "".concat(baseClassName, "-links ").concat(hashId),
      children: (0,jsx_runtime.jsx)(es_menu/* default */.Z, {
        inlineIndent: 16,
        className: "".concat(baseClassName, "-link-menu ").concat(hashId),
        selectedKeys: [],
        openKeys: [],
        theme: "light",
        mode: "inline",
        items: linksMenuItems
      })
    }) : null, showSiderExtraDom && (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [actionAreaDom, rightContentRender ? (0,jsx_runtime.jsx)("div", {
        className: classnames_default()("".concat(baseClassName, "-actions"), hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-actions-collapsed"), collapsed)),
        children: rightContentRender === null || rightContentRender === void 0 ? void 0 : rightContentRender(props)
      }) : null]
    }), menuFooterDom && (0,jsx_runtime.jsx)("div", {
      className: classnames_default()(["".concat(baseClassName, "-footer"), hashId, (0,defineProperty/* default */.Z)({}, "".concat(baseClassName, "-footer-collapsed"), collapsed)]),
      children: menuFooterDom
    })]
  });
  var _useContext2 = (0,react.useContext)(es/* ProProvider */.L_),
    token = _useContext2.token;
  return stylishClassName.wrapSSR((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [fixSiderbar && !isMobile && !hideMenuWhenCollapsedClassName && (0,jsx_runtime.jsx)("div", {
      style: (0,esm_objectSpread2/* default */.Z)({
        width: collapsed ? collapsedWidth : siderWidth,
        overflow: 'hidden',
        flex: "0 0 ".concat(collapsed ? collapsedWidth : siderWidth, "px"),
        maxWidth: collapsed ? collapsedWidth : siderWidth,
        minWidth: collapsed ? collapsedWidth : siderWidth,
        transition: 'all 0.2s ease 0s'
      }, style)
    }), (0,jsx_runtime.jsxs)(SiderMenu_Sider, {
      collapsible: true,
      trigger: null,
      collapsed: collapsed,
      breakpoint: breakpoint === false ? undefined : breakpoint,
      onCollapse: function onCollapse(collapse) {
        if (isMobile) return;
        _onCollapse === null || _onCollapse === void 0 ? void 0 : _onCollapse(collapse);
      },
      collapsedWidth: collapsedWidth,
      style: style,
      theme: "light",
      width: siderWidth,
      className: classnames_default()(siderClassName, hashId, hideMenuWhenCollapsedClassName),
      children: [(0,jsx_runtime.jsx)(config_provider/* default */.ZP, {
        theme: {
          hashed: ((_process$env$NODE_ENV = "production") === null || _process$env$NODE_ENV === void 0 ? void 0 : _process$env$NODE_ENV.toLowerCase()) !== 'test',
          components: {
            Menu: {
              radiusItem: 4,
              colorItemBgSelected: (token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$sider = _token$layout.sider) === null || _token$layout$sider === void 0 ? void 0 : _token$layout$sider.colorBgMenuItemSelected) || 'rgba(0, 0, 0, 0.04)',
              colorItemBgActive: (token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$sider = _token$layout2.sider) === null || _token$layout2$sider === void 0 ? void 0 : _token$layout2$sider.colorBgMenuItemHover) || 'rgba(0, 0, 0, 0.04)',
              colorActiveBarWidth: 0,
              colorActiveBarHeight: 0,
              colorActiveBarBorderSize: 0,
              colorItemText: (token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$sider = _token$layout3.sider) === null || _token$layout3$sider === void 0 ? void 0 : _token$layout3$sider.colorTextMenu) || 'rgba(0, 0, 0, 0.65)',
              colorItemTextHover: (token === null || token === void 0 ? void 0 : (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : (_token$layout4$sider = _token$layout4.sider) === null || _token$layout4$sider === void 0 ? void 0 : _token$layout4$sider.colorTextMenuActive) || 'rgba(0, 0, 0, 0.85)',
              colorItemTextSelected: (token === null || token === void 0 ? void 0 : (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : (_token$layout5$sider = _token$layout5.sider) === null || _token$layout5$sider === void 0 ? void 0 : _token$layout5$sider.colorTextMenuSelected) || 'rgba(0, 0, 0, 1)',
              colorItemBg: 'transparent',
              colorSubItemBg: 'transparent',
              colorBgElevated: (token === null || token === void 0 ? void 0 : (_token$layout6 = token.layout) === null || _token$layout6 === void 0 ? void 0 : (_token$layout6$sider = _token$layout6.sider) === null || _token$layout6$sider === void 0 ? void 0 : _token$layout6$sider.colorBgMenuItemCollapsedElevated) || '#fff'
            }
          }
        },
        children: hideMenuWhenCollapsedClassName ? (0,jsx_runtime.jsx)("div", {
          className: "".concat(baseClassName, "-hide-when-collapsed ").concat(hashId),
          style: {
            height: '100%',
            width: '100%',
            opacity: hideMenuWhenCollapsedClassName ? 0 : 1
          },
          children: menuDomItems
        }) : menuDomItems
      }), collapsedDom]
    })]
  }));
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/hooks/useRefFunction/index.js

var useRefFunction = function useRefFunction(reFunction) {
  var ref = (0,react.useRef)(null);
  ref.current = reFunction;
  return (0,react.useCallback)(function () {
    var _ref$current;
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.call.apply(_ref$current, [ref].concat(rest));
  }, []);
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/hooks/useDebounceFn/index.js




/**
 * \u4E00\u4E2A\u53BB\u6296\u7684 hook\uFF0C\u4F20\u5165\u4E00\u4E2A function\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u53BB\u6296\u540E\u7684 function
 * @param  {(...args:T) => Promise<any>} fn
 * @param  {number} wait?
 */
function useDebounceFn(fn, wait) {
  var callback = useRefFunction(fn);
  var timer = (0,react.useRef)();
  var cancel = (0,react.useCallback)(function () {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);
  var run = (0,react.useCallback)( /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/(0,regeneratorRuntime/* default */.Z)().mark(function _callee2() {
    var _len,
      args,
      _key,
      _args2 = arguments;
    return (0,regeneratorRuntime/* default */.Z)().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = _args2[_key];
          }
          if (!(wait === 0 || wait === undefined)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", callback.apply(void 0, args));
        case 3:
          cancel();
          return _context2.abrupt("return", new Promise(function (resolve) {
            timer.current = setTimeout( /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/(0,regeneratorRuntime/* default */.Z)().mark(function _callee() {
              return (0,regeneratorRuntime/* default */.Z)().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (true) {
                      _context.next = 7;
                      break;
                    }
                    _context.t0 = resolve;
                    _context.next = 4;
                    return callback.apply(void 0, args);
                  case 4:
                    _context.t1 = _context.sent;
                    (0, _context.t0)(_context.t1);
                    return _context.abrupt("return");
                  case 7:
                    _context.t2 = resolve;
                    _context.next = 10;
                    return callback.apply(void 0, args);
                  case 10:
                    _context.t3 = _context.sent;
                    (0, _context.t2)(_context.t3);
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            })), wait);
          }));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })), [callback, cancel, wait]);
  (0,react.useEffect)(function () {
    return cancel;
  }, [cancel]);
  return {
    run: run,
    cancel: cancel
  };
}
// EXTERNAL MODULE: ./node_modules/rc-resize-observer/es/index.js + 4 modules
var rc_resize_observer_es = __webpack_require__(48555);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GlobalHeader/rightContentStyle.js



var genTopNavHeaderStyle = function genTopNavHeaderStyle(token) {
  var _token$layout, _token$layout$header, _token$layout2, _token$layout2$header, _token$layout3, _token$layout3$header;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    '&-header-actions': {
      display: 'flex',
      height: '100%',
      '&-item': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBlock: 0,
        paddingInline: 2,
        color: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.colorTextRightActionsItem,
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: token.borderRadius,
        '> *': {
          paddingInline: 6,
          paddingBlock: 6,
          borderRadius: token.borderRadius,
          '&:hover': {
            backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.colorBgRightActionsItemHover
          }
        }
      },
      '&-avatar': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInlineStart: token.padding,
        paddingInlineEnd: token.padding,
        cursor: 'pointer',
        color: token.colorTextSecondary,
        '> div': {
          height: '44px',
          color: token.colorTextSecondary,
          paddingInline: 8,
          paddingBlock: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '44px',
          borderRadius: token.borderRadius,
          '&:hover': {
            backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$header = _token$layout3.header) === null || _token$layout3$header === void 0 ? void 0 : _token$layout3$header.colorBgRightActionsItemHover
          }
        }
      }
    }
  });
};
function rightContentStyle_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutRightContent', function (token) {
    var proToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genTopNavHeaderStyle(proToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GlobalHeader/RightContent.js






var RightContent_excluded = ["rightContentRender", "avatarProps", "actionsRender", "headerContentRender"],
  _excluded2 = ["title"];








/**
 * \u62BD\u79BB\u51FA\u6765\u662F\u4E3A\u4E86\u9632\u6B62 rightSize \u7ECF\u5E38\u6539\u53D8\u5BFC\u81F4\u83DC\u5355 render
 *
 * @param param0
 */
var RightContent = function RightContent(_ref) {
  var rightContentRender = _ref.rightContentRender,
    avatarProps = _ref.avatarProps,
    actionsRender = _ref.actionsRender,
    headerContentRender = _ref.headerContentRender,
    props = (0,objectWithoutProperties/* default */.Z)(_ref, RightContent_excluded);
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var prefixCls = "".concat(getPrefixCls(), "-pro-global-header");
  var _useStyle = rightContentStyle_useStyle(prefixCls),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var _useState = (0,react.useState)('auto'),
    _useState2 = (0,esm_slicedToArray/* default */.Z)(_useState, 2),
    rightSize = _useState2[0],
    setRightSize = _useState2[1];
  var avatarDom = (0,react.useMemo)(function () {
    if (!avatarProps) return null;
    var title = avatarProps.title,
      rest = (0,objectWithoutProperties/* default */.Z)(avatarProps, _excluded2);
    return [/*#__PURE__*/(0,react.createElement)(es_avatar/* default */.C, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, rest), {}, {
      size: 28,
      key: "avatar"
    })), title ? (0,jsx_runtime.jsx)("span", {
      style: {
        marginInlineStart: 8
      },
      children: title
    }, "name") : undefined];
  }, [avatarProps]);
  var rightActionsRender = function rightActionsRender(restParams) {
    var doms = actionsRender && (actionsRender === null || actionsRender === void 0 ? void 0 : actionsRender(restParams));
    if (!doms && !avatarDom) return null;
    if (!Array.isArray(doms)) doms = [doms];
    return wrapSSR((0,jsx_runtime.jsxs)("div", {
      className: "".concat(prefixCls, "-header-actions ").concat(hashId),
      children: [doms.filter(Boolean).map(function (dom, index) {
        var hideHover = false;
        // \u5982\u679C\u914D\u7F6E\u4E86 hideHover \u5C31\u4E0D\u5C55\u793A hover \u6548\u679C\u4E86
        if ( /*#__PURE__*/react.isValidElement(dom)) {
          var _dom$props;
          hideHover = !!(dom === null || dom === void 0 ? void 0 : (_dom$props = dom.props) === null || _dom$props === void 0 ? void 0 : _dom$props['aria-hidden']);
        }
        return (0,jsx_runtime.jsx)("div", {
          className: classnames_default()("".concat(prefixCls, "-header-actions-item ").concat(hashId), (0,defineProperty/* default */.Z)({}, "".concat(prefixCls, "-header-actions-hover"), !hideHover)),
          children: dom
        }, index);
      }), avatarDom && (0,jsx_runtime.jsx)("span", {
        className: "".concat(prefixCls, "-header-actions-avatar ").concat(hashId),
        children: (0,jsx_runtime.jsx)("div", {
          children: avatarDom
        })
      })]
    }));
  };
  /** \u51CF\u5C11\u4E00\u4E0B\u6E32\u67D3\u7684\u6B21\u6570 */
  var setRightSizeDebounceFn = useDebounceFn( /*#__PURE__*/function () {
    var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/(0,regeneratorRuntime/* default */.Z)().mark(function _callee(width) {
      return (0,regeneratorRuntime/* default */.Z)().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setRightSize(width);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), 160);
  return (0,jsx_runtime.jsx)("div", {
    className: "".concat(prefixCls, "-right-content ").concat(hashId),
    style: {
      minWidth: rightSize,
      height: '100%'
    },
    children: (0,jsx_runtime.jsx)("div", {
      style: {
        height: '100%'
      },
      children: (0,jsx_runtime.jsx)(rc_resize_observer_es/* default */.Z, {
        onResize: function onResize(_ref3) {
          var width = _ref3.width;
          setRightSizeDebounceFn.run(width);
        },
        children: (rightContentRender || rightActionsRender) && (0,jsx_runtime.jsx)("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'flex-end'
          },
          children: (rightContentRender || rightActionsRender)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
            // \u6D4B\u8BD5\u4E13\u7528
            //@ts-ignore
            rightContentSize: rightSize
          }))
        })
      })
    })
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/TopNavHeader/style.js



var style_genTopNavHeaderStyle = function genTopNavHeaderStyle(token) {
  var _token$layout, _token$layout$header, _token$layout2, _token$layout2$header;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    '.anticon': {
      color: 'inherit'
    },
    '&-main': {
      display: 'flex',
      height: '100%',
      paddingInlineStart: '16px',
      '&-left': (0,defineProperty/* default */.Z)({
        display: 'flex',
        alignItems: 'center'
      }, "".concat(token.proComponentsCls, "-layout-apps-icon"), {
        marginInlineEnd: 16,
        marginInlineStart: -8
      })
    },
    '&-wide': {
      maxWidth: 1152,
      margin: '0 auto'
    },
    '&-logo': {
      position: 'relative',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      overflow: 'hidden',
      '> *:first-child': {
        display: 'flex',
        alignItems: 'center',
        minHeight: '22px',
        fontSize: '22px'
      },
      '> *:first-child > img': {
        display: 'inline-block',
        height: '32px',
        verticalAlign: 'middle'
      },
      '> *:first-child > h1': {
        display: 'inline-block',
        marginBlock: 0,
        marginInline: 0,
        lineHeight: '24px',
        marginInlineStart: 6,
        fontWeight: '600',
        fontSize: '16px',
        color: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.colorHeaderTitle,
        verticalAlign: 'top'
      }
    },
    '&-menu': {
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      paddingInline: 6,
      paddingBlock: 6,
      lineHeight: "".concat(((token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.heightLayoutHeader) || 56) - 12, "px")
    }
  });
};
function TopNavHeader_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutTopNavHeader', function (token) {
    var topNavHeaderToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [style_genTopNavHeaderStyle(topNavHeaderToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/TopNavHeader/index.js












var TopNavHeader = function TopNavHeader(props) {
  var _token$layout9, _token$layout9$header, _token$layout10, _token$layout10$heade, _token$layout11, _token$layout11$heade, _token$layout12, _token$layout12$heade, _token$layout13, _token$layout13$heade, _token$layout14, _token$layout14$heade;
  var ref = (0,react.useRef)(null);
  var onMenuHeaderClick = props.onMenuHeaderClick,
    contentWidth = props.contentWidth,
    rightContentRender = props.rightContentRender,
    propsClassName = props.className,
    style = props.style,
    headerContentRender = props.headerContentRender,
    layout = props.layout,
    actionsRender = props.actionsRender;
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var _useContext2 = (0,react.useContext)(es/* ProProvider */.L_),
    token = _useContext2.token;
  var prefixCls = "".concat(props.prefixCls || getPrefixCls('pro'), "-top-nav-header");
  var _useStyle = TopNavHeader_style_useStyle(prefixCls),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var headerDom = renderLogoAndTitle((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    collapsed: false
  }), layout === 'mix' ? 'headerTitleRender' : undefined);
  var contentDom = (0,react.useMemo)(function () {
    var _process$env$NODE_ENV, _token$layout, _token$layout$header, _token$layout2, _token$layout2$header, _token$layout3, _token$layout3$header, _token$layout4, _token$layout4$header, _token$layout5, _token$layout5$header, _token$layout6, _token$layout6$header, _token$layout7, _token$layout7$header, _token$layout8, _token$layout8$header, _props$menuProps;
    var defaultDom = (0,jsx_runtime.jsx)(config_provider/* default */.ZP, {
      theme: {
        hashed: ((_process$env$NODE_ENV = "production") === null || _process$env$NODE_ENV === void 0 ? void 0 : _process$env$NODE_ENV.toLowerCase()) !== 'test',
        components: {
          Menu: {
            colorItemBg: (token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.colorBgHeader) || 'transparent',
            colorSubItemBg: (token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.colorBgHeader) || 'transparent',
            radiusItem: 4,
            colorItemBgSelected: (token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$header = _token$layout3.header) === null || _token$layout3$header === void 0 ? void 0 : _token$layout3$header.colorBgMenuItemSelected) || (token === null || token === void 0 ? void 0 : token.colorBgTextHover),
            colorItemBgActive: (token === null || token === void 0 ? void 0 : (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : (_token$layout4$header = _token$layout4.header) === null || _token$layout4$header === void 0 ? void 0 : _token$layout4$header.colorBgMenuItemHover) || (token === null || token === void 0 ? void 0 : token.colorBgTextHover),
            colorItemBgSelectedHorizontal: (token === null || token === void 0 ? void 0 : (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : (_token$layout5$header = _token$layout5.header) === null || _token$layout5$header === void 0 ? void 0 : _token$layout5$header.colorBgMenuItemSelected) || (token === null || token === void 0 ? void 0 : token.colorBgTextHover),
            colorActiveBarWidth: 0,
            colorActiveBarHeight: 0,
            colorActiveBarBorderSize: 0,
            colorItemText: (token === null || token === void 0 ? void 0 : (_token$layout6 = token.layout) === null || _token$layout6 === void 0 ? void 0 : (_token$layout6$header = _token$layout6.header) === null || _token$layout6$header === void 0 ? void 0 : _token$layout6$header.colorTextMenu) || (token === null || token === void 0 ? void 0 : token.colorTextSecondary),
            colorItemTextHover: (token === null || token === void 0 ? void 0 : (_token$layout7 = token.layout) === null || _token$layout7 === void 0 ? void 0 : (_token$layout7$header = _token$layout7.header) === null || _token$layout7$header === void 0 ? void 0 : _token$layout7$header.colorTextMenuActive) || (token === null || token === void 0 ? void 0 : token.colorText),
            colorItemTextSelected: (token === null || token === void 0 ? void 0 : (_token$layout8 = token.layout) === null || _token$layout8 === void 0 ? void 0 : (_token$layout8$header = _token$layout8.header) === null || _token$layout8$header === void 0 ? void 0 : _token$layout8$header.colorTextMenuSelected) || (token === null || token === void 0 ? void 0 : token.colorTextBase)
          }
        }
      },
      children: (0,jsx_runtime.jsx)(BaseMenu, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
        theme: "light"
      }, props), {}, {
        className: "".concat(prefixCls, "-base-menu ").concat(hashId)
      }, props.menuProps), {}, {
        style: (0,esm_objectSpread2/* default */.Z)({
          width: '100%'
        }, (_props$menuProps = props.menuProps) === null || _props$menuProps === void 0 ? void 0 : _props$menuProps.style),
        collapsed: false,
        menuRenderType: "header",
        mode: "horizontal"
      }))
    });
    if (headerContentRender) {
      return headerContentRender(props, defaultDom);
    }
    return defaultDom;
  }, [token === null || token === void 0 ? void 0 : (_token$layout9 = token.layout) === null || _token$layout9 === void 0 ? void 0 : (_token$layout9$header = _token$layout9.header) === null || _token$layout9$header === void 0 ? void 0 : _token$layout9$header.colorBgHeader, token === null || token === void 0 ? void 0 : (_token$layout10 = token.layout) === null || _token$layout10 === void 0 ? void 0 : (_token$layout10$heade = _token$layout10.header) === null || _token$layout10$heade === void 0 ? void 0 : _token$layout10$heade.colorBgMenuItemSelected, token === null || token === void 0 ? void 0 : (_token$layout11 = token.layout) === null || _token$layout11 === void 0 ? void 0 : (_token$layout11$heade = _token$layout11.header) === null || _token$layout11$heade === void 0 ? void 0 : _token$layout11$heade.colorBgMenuItemHover, token === null || token === void 0 ? void 0 : (_token$layout12 = token.layout) === null || _token$layout12 === void 0 ? void 0 : (_token$layout12$heade = _token$layout12.header) === null || _token$layout12$heade === void 0 ? void 0 : _token$layout12$heade.colorTextMenu, token === null || token === void 0 ? void 0 : (_token$layout13 = token.layout) === null || _token$layout13 === void 0 ? void 0 : (_token$layout13$heade = _token$layout13.header) === null || _token$layout13$heade === void 0 ? void 0 : _token$layout13$heade.colorTextMenuActive, token === null || token === void 0 ? void 0 : (_token$layout14 = token.layout) === null || _token$layout14 === void 0 ? void 0 : (_token$layout14$heade = _token$layout14.header) === null || _token$layout14$heade === void 0 ? void 0 : _token$layout14$heade.colorTextMenuSelected, token === null || token === void 0 ? void 0 : token.colorBgTextHover, token === null || token === void 0 ? void 0 : token.colorTextSecondary, token === null || token === void 0 ? void 0 : token.colorText, token === null || token === void 0 ? void 0 : token.colorTextBase, props, prefixCls, hashId, headerContentRender]);
  return wrapSSR((0,jsx_runtime.jsx)("div", {
    className: classnames_default()(prefixCls, hashId, propsClassName, (0,defineProperty/* default */.Z)({}, "".concat(prefixCls, "-light"), true)),
    style: style,
    children: (0,jsx_runtime.jsxs)("div", {
      ref: ref,
      className: classnames_default()("".concat(prefixCls, "-main"), hashId, (0,defineProperty/* default */.Z)({}, "".concat(prefixCls, "-wide"), contentWidth === 'Fixed')),
      children: [headerDom && (0,jsx_runtime.jsxs)("div", {
        className: classnames_default()("".concat(prefixCls, "-main-left ").concat(hashId)),
        onClick: onMenuHeaderClick,
        children: [(0,jsx_runtime.jsx)(AppsLogoComponents, (0,esm_objectSpread2/* default */.Z)({}, props)), (0,jsx_runtime.jsx)("div", {
          className: "".concat(prefixCls, "-logo ").concat(hashId),
          id: "logo",
          children: headerDom
        }, "logo")]
      }), (0,jsx_runtime.jsx)("div", {
        style: {
          flex: 1
        },
        className: "".concat(prefixCls, "-menu ").concat(hashId),
        children: contentDom
      }), (rightContentRender || actionsRender || props.avatarProps) && (0,jsx_runtime.jsx)(RightContent, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
        rightContentRender: rightContentRender
      }, props), {}, {
        prefixCls: prefixCls
      }))]
    })
  }));
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GlobalHeader/style.js



var genGlobalHeaderStyle = function genGlobalHeaderStyle(token) {
  var _token$layout, _token$layout$header, _token$layout2, _token$layout2$header, _token$layout3, _token$layout3$header, _token$componentCls;
  return (0,defineProperty/* default */.Z)({}, token.componentCls, (_token$componentCls = {
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    marginBlock: 0,
    marginInline: 16,
    height: ((_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.heightLayoutHeader) || 56,
    boxSizing: 'border-box',
    '> a': {
      height: '100%'
    }
  }, (0,defineProperty/* default */.Z)(_token$componentCls, "".concat(token.proComponentsCls, "-layout-apps-icon"), {
    marginInlineEnd: 16
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-collapsed-button', {
    minHeight: '22px',
    color: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.colorHeaderTitle,
    fontSize: '18px',
    marginInlineEnd: '16px'
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-logo', {
    position: 'relative',
    marginInlineEnd: '16px',
    a: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      minHeight: '22px',
      fontSize: '20px'
    },
    img: {
      height: '28px'
    },
    h1: {
      height: '32px',
      marginBlock: 0,
      marginInline: 0,
      marginInlineStart: 8,
      fontWeight: '600',
      color: ((_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$header = _token$layout3.header) === null || _token$layout3$header === void 0 ? void 0 : _token$layout3$header.colorHeaderTitle) || token.colorTextHeading,
      fontSize: '18px',
      lineHeight: '32px'
    },
    '&-mix': {
      display: 'flex',
      alignItems: 'center'
    }
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-logo-mobile', {
    minWidth: '24px',
    marginInlineEnd: 0
  }), _token$componentCls));
};
function GlobalHeader_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayoutGlobalHeader', function (token) {
    var GlobalHeaderToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genGlobalHeaderStyle(GlobalHeaderToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/GlobalHeader/index.js













var GlobalHeader_renderLogo = function renderLogo(menuHeaderRender, logoDom) {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }
  return logoDom;
};
var GlobalHeader = function GlobalHeader(props) {
  var _classNames;
  var isMobile = props.isMobile,
    logo = props.logo,
    collapsed = props.collapsed,
    onCollapse = props.onCollapse,
    rightContentRender = props.rightContentRender,
    menuHeaderRender = props.menuHeaderRender,
    onMenuHeaderClick = props.onMenuHeaderClick,
    propClassName = props.className,
    style = props.style,
    layout = props.layout,
    children = props.children,
    splitMenus = props.splitMenus,
    menuData = props.menuData,
    prefixCls = props.prefixCls;
  var _useContext = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    direction = _useContext.direction;
  var _useContext2 = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    getPrefixCls = _useContext2.getPrefixCls;
  var baseClassName = "".concat(prefixCls || getPrefixCls('pro'), "-global-header");
  var _useStyle = GlobalHeader_style_useStyle(baseClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var className = classnames_default()(propClassName, baseClassName, hashId);
  if (layout === 'mix' && !isMobile && splitMenus) {
    var noChildrenMenuData = (menuData || []).map(function (item) {
      return (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, item), {}, {
        children: undefined,
        routes: undefined
      });
    });
    var clearMenuData = clearMenuItem(noChildrenMenuData);
    return (0,jsx_runtime.jsx)(TopNavHeader, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      mode: "horizontal"
    }, props), {}, {
      splitMenus: false,
      menuData: clearMenuData
    }));
  }
  var logoClassNames = classnames_default()("".concat(baseClassName, "-logo"), hashId, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-logo-rtl"), direction === 'rtl'), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-logo-mix"), layout === 'mix'), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-logo-mobile"), isMobile), _classNames));
  var logoDom = (0,jsx_runtime.jsx)("span", {
    className: logoClassNames,
    children: (0,jsx_runtime.jsx)("a", {
      children: defaultRenderLogo(logo)
    })
  }, "logo");
  return wrapSSR((0,jsx_runtime.jsxs)("div", {
    className: className,
    style: (0,esm_objectSpread2/* default */.Z)({}, style),
    children: [isMobile && (0,jsx_runtime.jsx)("span", {
      className: "".concat(baseClassName, "-collapsed-button ").concat(hashId),
      onClick: function onClick() {
        onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(!collapsed);
      },
      children: (0,jsx_runtime.jsx)(icons_MenuOutlined, {})
    }), isMobile && GlobalHeader_renderLogo(menuHeaderRender, logoDom), layout === 'mix' && !isMobile && (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [(0,jsx_runtime.jsx)(AppsLogoComponents, (0,esm_objectSpread2/* default */.Z)({}, props)), (0,jsx_runtime.jsx)("div", {
        className: logoClassNames,
        onClick: onMenuHeaderClick,
        children: renderLogoAndTitle((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
          collapsed: false
        }), 'headerTitleRender')
      })]
    }), (0,jsx_runtime.jsx)("div", {
      style: {
        flex: 1
      },
      children: children
    }), (rightContentRender || props.actionsRender || props.avatarProps) && (0,jsx_runtime.jsx)(RightContent, (0,esm_objectSpread2/* default */.Z)({
      rightContentRender: rightContentRender
    }, props))]
  }));
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/Header/style/stylish.js



function stylish_useStylish(prefixCls, _ref) {
  var stylish = _ref.stylish,
    proLayoutCollapsedWidth = _ref.proLayoutCollapsedWidth;
  return (0,useStyle/* useStyle */.Xj)('ProLayoutHeaderStylish', function (token) {
    var stylishToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      proLayoutCollapsedWidth: proLayoutCollapsedWidth
    });
    if (!stylish) return [];
    return [(0,defineProperty/* default */.Z)({}, token.proComponentsCls, (0,defineProperty/* default */.Z)({}, "".concat(token.proComponentsCls, "-layout"), (0,defineProperty/* default */.Z)({}, "".concat(stylishToken.componentCls), stylish === null || stylish === void 0 ? void 0 : stylish(stylishToken))))];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/Header/index.js












var Header = es_layout.Header;
var DefaultHeader = function DefaultHeader(props) {
  var _classNames, _process$env$NODE_ENV, _token$layout, _token$layout$header, _token$layout2, _token$layout2$header;
  var isMobile = props.isMobile,
    fixedHeader = props.fixedHeader,
    propsClassName = props.className,
    style = props.style,
    collapsed = props.collapsed,
    prefixCls = props.prefixCls,
    onCollapse = props.onCollapse,
    layout = props.layout,
    headerRender = props.headerRender,
    headerContentRender = props.headerContentRender;
  var _useContext = (0,react.useContext)(es/* ProProvider */.L_),
    token = _useContext.token;
  var renderContent = (0,react.useCallback)(function () {
    var isTop = layout === 'top';
    var clearMenuData = clearMenuItem(props.menuData || []);
    var defaultDom = (0,jsx_runtime.jsx)(GlobalHeader, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      onCollapse: onCollapse
    }, props), {}, {
      menuData: clearMenuData,
      children: headerContentRender && headerContentRender(props, null)
    }));
    if (isTop && !isMobile) {
      defaultDom = (0,jsx_runtime.jsx)(TopNavHeader, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
        mode: "horizontal",
        onCollapse: onCollapse
      }, props), {}, {
        menuData: clearMenuData
      }));
    }
    if (headerRender && typeof headerRender === 'function') {
      return headerRender(props, defaultDom);
    }
    return defaultDom;
  }, [headerContentRender, headerRender, isMobile, layout, onCollapse, props]);
  var needFixedHeader = fixedHeader || layout === 'mix';
  var isTop = layout === 'top';
  var baseClassName = "".concat(prefixCls, "-layout-header");
  var _useStyle = header_useStyle(baseClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var stylish = stylish_useStylish("".concat(baseClassName, ".").concat(baseClassName, "-stylish"), {
    proLayoutCollapsedWidth: 64,
    stylish: props.stylish
  });
  var className = classnames_default()(propsClassName, hashId, baseClassName, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-fixed-header"), needFixedHeader), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-mix"), layout === 'mix'), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-fixed-header-action"), !collapsed), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-top-menu"), isTop), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-header"), true), (0,defineProperty/* default */.Z)(_classNames, "".concat(baseClassName, "-stylish"), !!props.stylish), _classNames));
  if (layout === 'side' && !isMobile) return null;
  return stylish.wrapSSR(wrapSSR((0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: (0,jsx_runtime.jsxs)(config_provider/* default */.ZP
    // @ts-ignore
    , {
      // @ts-ignore
      theme: {
        hashed: ((_process$env$NODE_ENV = "production") === null || _process$env$NODE_ENV === void 0 ? void 0 : _process$env$NODE_ENV.toLowerCase()) !== 'test',
        components: {
          Layout: {
            colorBgHeader: 'transparent',
            colorBgBody: 'transparent'
          }
        }
      },
      children: [needFixedHeader && (0,jsx_runtime.jsx)(Header, {
        style: (0,esm_objectSpread2/* default */.Z)({
          height: (token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.heightLayoutHeader) || 56,
          lineHeight: "".concat((token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.heightLayoutHeader) || 56, "px"),
          backgroundColor: 'transparent',
          zIndex: 19
        }, style)
      }), (0,jsx_runtime.jsx)(Header, {
        className: className,
        style: style,
        children: renderContent()
      })]
    })
  })));
};

// EXTERNAL MODULE: ./node_modules/@ant-design/pro-layout/es/components/PageLoading/index.js
var PageLoading = __webpack_require__(83832);
// EXTERNAL MODULE: ./node_modules/@rc-component/portal/es/index.js + 7 modules
var portal_es = __webpack_require__(54535);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(87462);
// EXTERNAL MODULE: ./node_modules/rc-motion/es/index.js + 11 modules
var rc_motion_es = __webpack_require__(62874);
;// CONCATENATED MODULE: ./node_modules/rc-drawer/es/DrawerPanel.js



var DrawerPanel = function DrawerPanel(props) {
  var prefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    children = props.children,
    containerRef = props.containerRef;
  // =============================== Render ===============================
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: classnames_default()("".concat(prefixCls, "-content"), className),
    style: (0,esm_objectSpread2/* default */.Z)({}, style),
    "aria-modal": "true",
    role: "dialog",
    ref: containerRef
  }, children));
};
if (false) {}
/* harmony default export */ var es_DrawerPanel = (DrawerPanel);
;// CONCATENATED MODULE: ./node_modules/rc-drawer/es/context.js

var DrawerContext = /*#__PURE__*/react.createContext(null);
/* harmony default export */ var context = (DrawerContext);
// EXTERNAL MODULE: ./node_modules/rc-util/es/KeyCode.js
var KeyCode = __webpack_require__(15105);
// EXTERNAL MODULE: ./node_modules/rc-util/es/warning.js
var es_warning = __webpack_require__(80334);
;// CONCATENATED MODULE: ./node_modules/rc-drawer/es/util.js

function parseWidthHeight(value) {
  if (typeof value === 'string' && String(Number(value)) === value) {
    (0,es_warning/* default */.ZP)(false, 'Invalid value type of \`width\` or \`height\` which should be number type instead.');
    return Number(value);
  }
  return value;
}
function warnCheck(props) {
  warning(!('wrapperClassName' in props), "'wrapperClassName' is removed. Please use 'rootClassName' instead.");
}
;// CONCATENATED MODULE: ./node_modules/rc-drawer/es/DrawerPopup.js








// import type ScrollLocker from 'rc-util/lib/Dom/scrollLocker';



var sentinelStyle = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  outline: 'none',
  position: 'absolute'
};
function DrawerPopup(props) {
  var _ref, _pushConfig$distance, _pushConfig, _classNames;
  var prefixCls = props.prefixCls,
    open = props.open,
    placement = props.placement,
    inline = props.inline,
    push = props.push,
    forceRender = props.forceRender,
    autoFocus = props.autoFocus,
    keyboard = props.keyboard,
    rootClassName = props.rootClassName,
    rootStyle = props.rootStyle,
    zIndex = props.zIndex,
    className = props.className,
    style = props.style,
    motion = props.motion,
    width = props.width,
    height = props.height,
    children = props.children,
    contentWrapperStyle = props.contentWrapperStyle,
    mask = props.mask,
    maskClosable = props.maskClosable,
    maskMotion = props.maskMotion,
    maskClassName = props.maskClassName,
    maskStyle = props.maskStyle,
    afterOpenChange = props.afterOpenChange,
    onClose = props.onClose;
  // ================================ Refs ================================
  var panelRef = react.useRef();
  var sentinelStartRef = react.useRef();
  var sentinelEndRef = react.useRef();
  var onPanelKeyDown = function onPanelKeyDown(event) {
    var keyCode = event.keyCode,
      shiftKey = event.shiftKey;
    switch (keyCode) {
      // Tab active
      case KeyCode/* default.TAB */.Z.TAB:
        {
          if (keyCode === KeyCode/* default.TAB */.Z.TAB) {
            if (!shiftKey && document.activeElement === sentinelEndRef.current) {
              var _sentinelStartRef$cur;
              (_sentinelStartRef$cur = sentinelStartRef.current) === null || _sentinelStartRef$cur === void 0 ? void 0 : _sentinelStartRef$cur.focus({
                preventScroll: true
              });
            } else if (shiftKey && document.activeElement === sentinelStartRef.current) {
              var _sentinelEndRef$curre;
              (_sentinelEndRef$curre = sentinelEndRef.current) === null || _sentinelEndRef$curre === void 0 ? void 0 : _sentinelEndRef$curre.focus({
                preventScroll: true
              });
            }
          }
          break;
        }
      // Close
      case KeyCode/* default.ESC */.Z.ESC:
        {
          if (onClose && keyboard) {
            onClose(event);
          }
          break;
        }
    }
  };
  // ========================== Control ===========================
  // Auto Focus
  react.useEffect(function () {
    if (open && autoFocus) {
      var _panelRef$current;
      (_panelRef$current = panelRef.current) === null || _panelRef$current === void 0 ? void 0 : _panelRef$current.focus({
        preventScroll: true
      });
    }
  }, [open, autoFocus]);
  // ============================ Push ============================
  var _React$useState = react.useState(false),
    _React$useState2 = (0,esm_slicedToArray/* default */.Z)(_React$useState, 2),
    pushed = _React$useState2[0],
    setPushed = _React$useState2[1];
  var parentContext = react.useContext(context);
  // Merge push distance
  var pushConfig;
  if (push === false) {
    pushConfig = {
      distance: 0
    };
  } else if (push === true) {
    pushConfig = {};
  } else {
    pushConfig = push || {};
  }
  var pushDistance = (_ref = (_pushConfig$distance = (_pushConfig = pushConfig) === null || _pushConfig === void 0 ? void 0 : _pushConfig.distance) !== null && _pushConfig$distance !== void 0 ? _pushConfig$distance : parentContext === null || parentContext === void 0 ? void 0 : parentContext.pushDistance) !== null && _ref !== void 0 ? _ref : 180;
  var mergedContext = react.useMemo(function () {
    return {
      pushDistance: pushDistance,
      push: function push() {
        setPushed(true);
      },
      pull: function pull() {
        setPushed(false);
      }
    };
  }, [pushDistance]);
  // ========================= ScrollLock =========================
  // Tell parent to push
  react.useEffect(function () {
    if (open) {
      var _parentContext$push;
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$push = parentContext.push) === null || _parentContext$push === void 0 ? void 0 : _parentContext$push.call(parentContext);
    } else {
      var _parentContext$pull;
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$pull = parentContext.pull) === null || _parentContext$pull === void 0 ? void 0 : _parentContext$pull.call(parentContext);
    }
  }, [open]);
  // Clean up
  react.useEffect(function () {
    return function () {
      var _parentContext$pull2;
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$pull2 = parentContext.pull) === null || _parentContext$pull2 === void 0 ? void 0 : _parentContext$pull2.call(parentContext);
    };
  }, []);
  // ============================ Mask ============================
  var maskNode = mask && /*#__PURE__*/react.createElement(rc_motion_es/* default */.Z, (0,esm_extends/* default */.Z)({
    key: "mask"
  }, maskMotion, {
    visible: open
  }), function (_ref2, maskRef) {
    var motionMaskClassName = _ref2.className,
      motionMaskStyle = _ref2.style;
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("".concat(prefixCls, "-mask"), motionMaskClassName, maskClassName),
      style: (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, motionMaskStyle), maskStyle),
      onClick: maskClosable && open ? onClose : undefined,
      ref: maskRef
    });
  });
  // =========================== Panel ============================
  var motionProps = typeof motion === 'function' ? motion(placement) : motion;
  var wrapperStyle = {};
  if (pushed && pushDistance) {
    switch (placement) {
      case 'top':
        wrapperStyle.transform = "translateY(".concat(pushDistance, "px)");
        break;
      case 'bottom':
        wrapperStyle.transform = "translateY(".concat(-pushDistance, "px)");
        break;
      case 'left':
        wrapperStyle.transform = "translateX(".concat(pushDistance, "px)");
        break;
      default:
        wrapperStyle.transform = "translateX(".concat(-pushDistance, "px)");
        break;
    }
  }
  if (placement === 'left' || placement === 'right') {
    wrapperStyle.width = parseWidthHeight(width);
  } else {
    wrapperStyle.height = parseWidthHeight(height);
  }
  var panelNode = /*#__PURE__*/react.createElement(rc_motion_es/* default */.Z, (0,esm_extends/* default */.Z)({
    key: "panel"
  }, motionProps, {
    visible: open,
    forceRender: forceRender,
    onVisibleChanged: function onVisibleChanged(nextVisible) {
      afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(nextVisible);
    },
    removeOnLeave: false,
    leavedClassName: "".concat(prefixCls, "-content-wrapper-hidden")
  }), function (_ref3, motionRef) {
    var motionClassName = _ref3.className,
      motionStyle = _ref3.style;
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()("".concat(prefixCls, "-content-wrapper"), motionClassName),
      style: (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, wrapperStyle), motionStyle), contentWrapperStyle)
    }, /*#__PURE__*/react.createElement(es_DrawerPanel, {
      containerRef: motionRef,
      prefixCls: prefixCls,
      className: className,
      style: style
    }, children));
  });
  // =========================== Render ===========================
  var containerStyle = (0,esm_objectSpread2/* default */.Z)({}, rootStyle);
  if (zIndex) {
    containerStyle.zIndex = zIndex;
  }
  return /*#__PURE__*/react.createElement(context.Provider, {
    value: mergedContext
  }, /*#__PURE__*/react.createElement("div", {
    className: classnames_default()(prefixCls, "".concat(prefixCls, "-").concat(placement), rootClassName, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-open"), open), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-inline"), inline), _classNames)),
    style: containerStyle,
    tabIndex: -1,
    ref: panelRef,
    onKeyDown: onPanelKeyDown
  }, maskNode, /*#__PURE__*/react.createElement("div", {
    tabIndex: 0,
    ref: sentinelStartRef,
    style: sentinelStyle,
    "aria-hidden": "true",
    "data-sentinel": "start"
  }), panelNode, /*#__PURE__*/react.createElement("div", {
    tabIndex: 0,
    ref: sentinelEndRef,
    style: sentinelStyle,
    "aria-hidden": "true",
    "data-sentinel": "end"
  })));
}
;// CONCATENATED MODULE: ./node_modules/rc-drawer/es/Drawer.js






var Drawer = function Drawer(props) {
  var _props$open = props.open,
    open = _props$open === void 0 ? false : _props$open,
    _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-drawer' : _props$prefixCls,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'right' : _props$placement,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
    _props$keyboard = props.keyboard,
    keyboard = _props$keyboard === void 0 ? true : _props$keyboard,
    _props$width = props.width,
    width = _props$width === void 0 ? 378 : _props$width,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? true : _props$mask,
    _props$maskClosable = props.maskClosable,
    maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable,
    getContainer = props.getContainer,
    forceRender = props.forceRender,
    afterOpenChange = props.afterOpenChange,
    destroyOnClose = props.destroyOnClose;
  var _React$useState = react.useState(false),
    _React$useState2 = (0,esm_slicedToArray/* default */.Z)(_React$useState, 2),
    animatedVisible = _React$useState2[0],
    setAnimatedVisible = _React$useState2[1];
  // ============================= Warn =============================
  if (false) {}
  // ============================= Open =============================
  var internalAfterOpenChange = function internalAfterOpenChange(nextVisible) {
    setAnimatedVisible(nextVisible);
    afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(nextVisible);
  };
  // ============================ Render ============================
  if (!forceRender && !animatedVisible && !open && destroyOnClose) {
    return null;
  }
  var drawerPopupProps = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    open: open,
    prefixCls: prefixCls,
    placement: placement,
    autoFocus: autoFocus,
    keyboard: keyboard,
    width: width,
    mask: mask,
    maskClosable: maskClosable,
    inline: getContainer === false,
    afterOpenChange: internalAfterOpenChange
  });
  return /*#__PURE__*/react.createElement(portal_es/* default */.Z, {
    open: open || forceRender || animatedVisible,
    autoDestroy: false,
    getContainer: getContainer,
    autoLock: mask && (open || animatedVisible)
  }, /*#__PURE__*/react.createElement(DrawerPopup, drawerPopupProps));
};
if (false) {}
/* harmony default export */ var es_Drawer = (Drawer);
;// CONCATENATED MODULE: ./node_modules/rc-drawer/es/index.js
// export this package's api

/* harmony default export */ var rc_drawer_es = (es_Drawer);
// EXTERNAL MODULE: ./node_modules/antd/es/config-provider/context.js
var config_provider_context = __webpack_require__(53124);
// EXTERNAL MODULE: ./node_modules/antd/es/form/context.js
var form_context = __webpack_require__(65223);
// EXTERNAL MODULE: ./node_modules/antd/es/_util/motion.js
var motion = __webpack_require__(33603);
// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/CloseOutlined.js + 1 modules
var CloseOutlined = __webpack_require__(84481);
;// CONCATENATED MODULE: ./node_modules/antd/es/drawer/DrawerPanel.js



function DrawerPanel_DrawerPanel(props) {
  const {
    prefixCls,
    title,
    footer,
    extra,
    closable = true,
    closeIcon = /*#__PURE__*/react.createElement(CloseOutlined/* default */.Z, null),
    onClose,
    headerStyle,
    drawerStyle,
    bodyStyle,
    footerStyle,
    children
  } = props;
  const closeIconNode = closable && /*#__PURE__*/react.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    className: \`\${prefixCls}-close\`
  }, closeIcon);
  function renderHeader() {
    if (!title && !closable) {
      return null;
    }
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()(\`\${prefixCls}-header\`, {
        [\`\${prefixCls}-header-close-only\`]: closable && !title && !extra
      }),
      style: headerStyle
    }, /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-header-title\`
    }, closeIconNode, title && /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-title\`
    }, title)), extra && /*#__PURE__*/react.createElement("div", {
      className: \`\${prefixCls}-extra\`
    }, extra));
  }
  function renderFooter() {
    if (!footer) {
      return null;
    }
    const footerClassName = \`\${prefixCls}-footer\`;
    return /*#__PURE__*/react.createElement("div", {
      className: footerClassName,
      style: footerStyle
    }, footer);
  }
  return /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-wrapper-body\`,
    style: Object.assign({}, drawerStyle)
  }, renderHeader(), /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-body\`,
    style: bodyStyle
  }, children), renderFooter());
}
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/genComponentStyleHook.js
var genComponentStyleHook = __webpack_require__(67968);
// EXTERNAL MODULE: ./node_modules/antd/es/theme/util/statistic.js
var statistic = __webpack_require__(45503);
;// CONCATENATED MODULE: ./node_modules/antd/es/drawer/style/motion.js
const genMotionStyle = token => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  const sharedPanelMotion = {
    '&-enter, &-appear, &-leave': {
      '&-start': {
        transition: 'none'
      },
      '&-active': {
        transition: \`all \${motionDurationSlow}\`
      }
    }
  };
  return {
    [componentCls]: {
      // ======================== Mask ========================
      [\`\${componentCls}-mask-motion\`]: {
        '&-enter, &-appear, &-leave': {
          '&-active': {
            transition: \`all \${motionDurationSlow}\`
          }
        },
        '&-enter, &-appear': {
          opacity: 0,
          '&-active': {
            opacity: 1
          }
        },
        '&-leave': {
          opacity: 1,
          '&-active': {
            opacity: 0
          }
        }
      },
      // ======================= Panel ========================
      [\`\${componentCls}-panel-motion\`]: {
        // Left
        '&-left': [sharedPanelMotion, {
          '&-enter, &-appear': {
            '&-start': {
              transform: 'translateX(-100%) !important'
            },
            '&-active': {
              transform: 'translateX(0)'
            }
          },
          '&-leave': {
            transform: 'translateX(0)',
            '&-active': {
              transform: 'translateX(-100%)'
            }
          }
        }],
        // Right
        '&-right': [sharedPanelMotion, {
          '&-enter, &-appear': {
            '&-start': {
              transform: 'translateX(100%) !important'
            },
            '&-active': {
              transform: 'translateX(0)'
            }
          },
          '&-leave': {
            transform: 'translateX(0)',
            '&-active': {
              transform: 'translateX(100%)'
            }
          }
        }],
        // Top
        '&-top': [sharedPanelMotion, {
          '&-enter, &-appear': {
            '&-start': {
              transform: 'translateY(-100%) !important'
            },
            '&-active': {
              transform: 'translateY(0)'
            }
          },
          '&-leave': {
            transform: 'translateY(0)',
            '&-active': {
              transform: 'translateY(-100%)'
            }
          }
        }],
        // Bottom
        '&-bottom': [sharedPanelMotion, {
          '&-enter, &-appear': {
            '&-start': {
              transform: 'translateY(100%) !important'
            },
            '&-active': {
              transform: 'translateY(0)'
            }
          },
          '&-leave': {
            transform: 'translateY(0)',
            '&-active': {
              transform: 'translateY(100%)'
            }
          }
        }]
      }
    }
  };
};
/* harmony default export */ var style_motion = (genMotionStyle);
;// CONCATENATED MODULE: ./node_modules/antd/es/drawer/style/index.js


// =============================== Base ===============================
const genDrawerStyle = token => {
  const {
    componentCls,
    zIndexPopup,
    colorBgMask,
    colorBgElevated,
    motionDurationSlow,
    motionDurationMid,
    padding,
    paddingLG,
    fontSizeLG,
    lineHeightLG,
    lineWidth,
    lineType,
    colorSplit,
    marginSM,
    colorIcon,
    colorIconHover,
    colorText,
    fontWeightStrong,
    drawerFooterPaddingVertical,
    drawerFooterPaddingHorizontal
  } = token;
  const wrapperCls = \`\${componentCls}-content-wrapper\`;
  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      zIndex: zIndexPopup,
      pointerEvents: 'none',
      '&-pure': {
        position: 'relative',
        background: colorBgElevated,
        [\`&\${componentCls}-left\`]: {
          boxShadow: token.boxShadowDrawerLeft
        },
        [\`&\${componentCls}-right\`]: {
          boxShadow: token.boxShadowDrawerRight
        },
        [\`&\${componentCls}-top\`]: {
          boxShadow: token.boxShadowDrawerUp
        },
        [\`&\${componentCls}-bottom\`]: {
          boxShadow: token.boxShadowDrawerDown
        }
      },
      '&-inline': {
        position: 'absolute'
      },
      // ====================== Mask ======================
      [\`\${componentCls}-mask\`]: {
        position: 'absolute',
        inset: 0,
        zIndex: zIndexPopup,
        background: colorBgMask,
        pointerEvents: 'auto'
      },
      // ==================== Content =====================
      [wrapperCls]: {
        position: 'absolute',
        zIndex: zIndexPopup,
        transition: \`all \${motionDurationSlow}\`,
        '&-hidden': {
          display: 'none'
        }
      },
      // Placement
      [\`&-left > \${wrapperCls}\`]: {
        top: 0,
        bottom: 0,
        left: {
          _skip_check_: true,
          value: 0
        },
        boxShadow: token.boxShadowDrawerLeft
      },
      [\`&-right > \${wrapperCls}\`]: {
        top: 0,
        right: {
          _skip_check_: true,
          value: 0
        },
        bottom: 0,
        boxShadow: token.boxShadowDrawerRight
      },
      [\`&-top > \${wrapperCls}\`]: {
        top: 0,
        insetInline: 0,
        boxShadow: token.boxShadowDrawerUp
      },
      [\`&-bottom > \${wrapperCls}\`]: {
        bottom: 0,
        insetInline: 0,
        boxShadow: token.boxShadowDrawerDown
      },
      [\`\${componentCls}-content\`]: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: colorBgElevated,
        pointerEvents: 'auto'
      },
      // ===================== Panel ======================
      [\`\${componentCls}-wrapper-body\`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      },
      // Header
      [\`\${componentCls}-header\`]: {
        display: 'flex',
        flex: 0,
        alignItems: 'center',
        padding: \`\${padding}px \${paddingLG}px\`,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG,
        borderBottom: \`\${lineWidth}px \${lineType} \${colorSplit}\`,
        '&-title': {
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          minWidth: 0,
          minHeight: 0
        }
      },
      [\`\${componentCls}-extra\`]: {
        flex: 'none'
      },
      [\`\${componentCls}-close\`]: {
        display: 'inline-block',
        marginInlineEnd: marginSM,
        color: colorIcon,
        fontWeight: fontWeightStrong,
        fontSize: fontSizeLG,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        textDecoration: 'none',
        background: 'transparent',
        border: 0,
        outline: 0,
        cursor: 'pointer',
        transition: \`color \${motionDurationMid}\`,
        textRendering: 'auto',
        '&:focus, &:hover': {
          color: colorIconHover,
          textDecoration: 'none'
        }
      },
      [\`\${componentCls}-title\`]: {
        flex: 1,
        margin: 0,
        color: colorText,
        fontWeight: token.fontWeightStrong,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG
      },
      // Body
      [\`\${componentCls}-body\`]: {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        padding: paddingLG,
        overflow: 'auto'
      },
      // Footer
      [\`\${componentCls}-footer\`]: {
        flexShrink: 0,
        padding: \`\${drawerFooterPaddingVertical}px \${drawerFooterPaddingHorizontal}px\`,
        borderTop: \`\${lineWidth}px \${lineType} \${colorSplit}\`
      },
      // ====================== RTL =======================
      '&-rtl': {
        direction: 'rtl'
      }
    }
  };
};
// ============================== Export ==============================
/* harmony default export */ var drawer_style = ((0,genComponentStyleHook/* default */.Z)('Drawer', token => {
  const drawerToken = (0,statistic/* merge */.TS)(token, {
    drawerFooterPaddingVertical: token.paddingXS,
    drawerFooterPaddingHorizontal: token.padding
  });
  return [genDrawerStyle(drawerToken), style_motion(drawerToken)];
}, token => ({
  zIndexPopup: token.zIndexPopupBase
})));
// EXTERNAL MODULE: ./node_modules/antd/es/space/Compact.js
var Compact = __webpack_require__(4173);
;// CONCATENATED MODULE: ./node_modules/antd/es/drawer/index.js
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};








// CSSINJS


const SizeTypes = (/* unused pure expression or super */ null && (['default', 'large']));
const defaultPushState = {
  distance: 180
};
function drawer_Drawer(props) {
  var _a;
  const {
      rootClassName,
      width,
      height,
      size = 'default',
      mask = true,
      push = defaultPushState,
      open,
      afterOpenChange,
      onClose,
      prefixCls: customizePrefixCls,
      getContainer: customizeGetContainer,
      // Deprecated
      visible,
      afterVisibleChange
    } = props,
    rest = __rest(props, ["rootClassName", "width", "height", "size", "mask", "push", "open", "afterOpenChange", "onClose", "prefixCls", "getContainer", "visible", "afterVisibleChange"]);
  const {
    getPopupContainer,
    getPrefixCls,
    direction
  } = react.useContext(config_provider_context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = drawer_style(prefixCls);
  const getContainer =
  // \u6709\u53EF\u80FD\u4E3A false\uFF0C\u6240\u4EE5\u4E0D\u80FD\u76F4\u63A5\u5224\u65AD
  customizeGetContainer === undefined && getPopupContainer ? () => getPopupContainer(document.body) : customizeGetContainer;
  const drawerClassName = classnames_default()({
    'no-mask': !mask,
    [\`\${prefixCls}-rtl\`]: direction === 'rtl'
  }, rootClassName, hashId);
  // ========================== Warning ===========================
  if (false) {}
  // ============================ Size ============================
  const mergedWidth = react.useMemo(() => width !== null && width !== void 0 ? width : size === 'large' ? 736 : 378, [width, size]);
  const mergedHeight = react.useMemo(() => height !== null && height !== void 0 ? height : size === 'large' ? 736 : 378, [height, size]);
  // =========================== Motion ===========================
  const maskMotion = {
    motionName: (0,motion/* getTransitionName */.mL)(prefixCls, 'mask-motion'),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500
  };
  const panelMotion = motionPlacement => ({
    motionName: (0,motion/* getTransitionName */.mL)(prefixCls, \`panel-motion-\${motionPlacement}\`),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500
  });
  // =========================== Render ===========================
  return wrapSSR( /*#__PURE__*/react.createElement(Compact/* NoCompactStyle */.BR, null, /*#__PURE__*/react.createElement(form_context/* NoFormStyle */.Ux, {
    status: true,
    override: true
  }, /*#__PURE__*/react.createElement(rc_drawer_es, Object.assign({
    prefixCls: prefixCls,
    onClose: onClose,
    maskMotion: maskMotion,
    motion: panelMotion
  }, rest, {
    open: open !== null && open !== void 0 ? open : visible,
    mask: mask,
    push: push,
    width: mergedWidth,
    height: mergedHeight,
    rootClassName: drawerClassName,
    getContainer: getContainer,
    afterOpenChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange
  }), /*#__PURE__*/react.createElement(DrawerPanel_DrawerPanel, Object.assign({
    prefixCls: prefixCls
  }, rest, {
    onClose: onClose
  }))))));
}
if (false) {}
function PurePanel(_a) {
  var {
      prefixCls: customizePrefixCls,
      style,
      className,
      placement = 'right'
    } = _a,
    restProps = __rest(_a, ["prefixCls", "style", "className", "placement"]);
  const {
    getPrefixCls
  } = react.useContext(config_provider_context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = drawer_style(prefixCls);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: classnames_default()(prefixCls, \`\${prefixCls}-pure\`, \`\${prefixCls}-\${placement}\`, hashId, className),
    style: style
  }, /*#__PURE__*/react.createElement(DrawerPanel_DrawerPanel, Object.assign({
    prefixCls: prefixCls
  }, restProps))));
}
drawer_Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
/* harmony default export */ var drawer = (drawer_Drawer);
// EXTERNAL MODULE: ./node_modules/@ant-design/cssinjs/es/index.js + 26 modules
var cssinjs_es = __webpack_require__(65178);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/style/index.js




var proLayoutTitleHide = new cssinjs_es/* Keyframes */.E4('antBadgeLoadingCircle', {
  '0%': {
    display: 'none',
    opacity: 0
  },
  '80%': {
    display: 'none',
    opacity: 0
  },
  '100%': {
    display: 'unset',
    opacity: 1
  }
});
var style_genSiderMenuStyle = function genSiderMenuStyle(token) {
  var _token$layout, _token$layout$sider, _token$layout2, _token$layout2$sider, _token$layout3, _token$layout3$sider, _token$layout4, _token$layout4$sider, _$concat, _token$layout5, _token$layout5$sider, _token$layout6, _token$layout6$sider, _token$layout7, _token$layout7$sider, _token$layout8, _token$layout8$sider, _token$layout9, _token$layout9$sider, _token$layout10, _token$layout10$heade, _token$layout11, _token$layout11$heade, _token$layout12, _token$layout12$sider, _token$componentCls;
  return (0,defineProperty/* default */.Z)({}, token.proComponentsCls, (0,defineProperty/* default */.Z)({}, "".concat(token.proComponentsCls, "-layout"), (0,defineProperty/* default */.Z)({}, token.componentCls, (_token$componentCls = {
    position: 'relative',
    background: ((_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$sider = _token$layout.sider) === null || _token$layout$sider === void 0 ? void 0 : _token$layout$sider.colorMenuBackground) || 'transparent',
    boxSizing: 'border-box',
    '&-menu': {
      position: 'relative',
      zIndex: 10,
      minHeight: '100%'
    },
    '&-fixed': {
      position: 'fixed',
      insetBlockStart: 0,
      insetInlineStart: 0,
      zIndex: '100',
      height: '100%'
    }
  }, (0,defineProperty/* default */.Z)(_token$componentCls, "".concat(token.antCls, "-layout-sider-children"), {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingInline: (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$sider = _token$layout2.sider) === null || _token$layout2$sider === void 0 ? void 0 : _token$layout2$sider.paddingInlineLayoutMenu,
    paddingBlock: (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$sider = _token$layout3.sider) === null || _token$layout3$sider === void 0 ? void 0 : _token$layout3$sider.paddingBlockLayoutMenu,
    borderInlineEnd: "1px solid ".concat(token.colorSplit)
  }), (0,defineProperty/* default */.Z)(_token$componentCls, "".concat(token.antCls, "-menu"), (_$concat = {}, (0,defineProperty/* default */.Z)(_$concat, "".concat(token.antCls, "-menu-item-group-title"), {
    fontSize: token.fontSizeSM,
    paddingBottom: 4
  }), (0,defineProperty/* default */.Z)(_$concat, "".concat(token.antCls, "-menu-item:hover"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : (_token$layout4$sider = _token$layout4.sider) === null || _token$layout4$sider === void 0 ? void 0 : _token$layout4$sider.colorTextMenuItemHover
  }), _$concat)), (0,defineProperty/* default */.Z)(_token$componentCls, '&-logo', {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 12,
    paddingBlock: 16,
    color: (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : (_token$layout5$sider = _token$layout5.sider) === null || _token$layout5$sider === void 0 ? void 0 : _token$layout5$sider.colorTextMenu,
    cursor: 'pointer',
    borderBlockEnd: "1px solid ".concat((_token$layout6 = token.layout) === null || _token$layout6 === void 0 ? void 0 : (_token$layout6$sider = _token$layout6.sider) === null || _token$layout6$sider === void 0 ? void 0 : _token$layout6$sider.colorMenuItemDivider),
    '> a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 22,
      fontSize: 22,
      '> img': {
        display: 'inline-block',
        height: 22,
        verticalAlign: 'middle'
      },
      '> h1': {
        display: 'inline-block',
        height: 22,
        marginBlock: 0,
        marginInlineEnd: 0,
        marginInlineStart: 6,
        color: (_token$layout7 = token.layout) === null || _token$layout7 === void 0 ? void 0 : (_token$layout7$sider = _token$layout7.sider) === null || _token$layout7$sider === void 0 ? void 0 : _token$layout7$sider.colorTextMenuTitle,
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '22px',
        verticalAlign: 'middle'
      }
    },
    '&-collapsed': (0,defineProperty/* default */.Z)({
      flexDirection: 'column-reverse',
      margin: 0,
      padding: 12
    }, "".concat(token.proComponentsCls, "-layout-apps-icon"), {
      marginBlockEnd: 8,
      fontSize: 16,
      transition: 'font-size 0.2s ease-in-out,color 0.2s ease-in-out'
    })
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-actions', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBlock: 4,
    marginInline: 0,
    color: (_token$layout8 = token.layout) === null || _token$layout8 === void 0 ? void 0 : (_token$layout8$sider = _token$layout8.sider) === null || _token$layout8$sider === void 0 ? void 0 : _token$layout8$sider.colorTextMenu,
    '&-collapsed': {
      flexDirection: 'column-reverse',
      paddingBlock: 0,
      paddingInline: 8,
      fontSize: 16,
      transition: 'font-size 0.3s ease-in-out'
    },
    '&-list': {
      color: (_token$layout9 = token.layout) === null || _token$layout9 === void 0 ? void 0 : (_token$layout9$sider = _token$layout9.sider) === null || _token$layout9$sider === void 0 ? void 0 : _token$layout9$sider.colorTextMenuSecondary,
      '&-collapsed': {
        marginBlockEnd: 8,
        animationName: 'none'
      },
      '&-item': {
        paddingInline: 6,
        paddingBlock: 6,
        lineHeight: '16px',
        fontSize: 16,
        cursor: 'pointer',
        borderRadius: token.borderRadius,
        '&:hover': {
          background: token.colorBgTextHover
        }
      }
    },
    '&-avatar': {
      fontSize: 14,
      paddingInline: 8,
      paddingBlock: 8,
      borderRadius: token.borderRadius,
      '& *': {
        cursor: 'pointer'
      },
      '&:hover': {
        background: token.colorBgTextHover
      }
    }
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-hide-menu-collapsed', {
    insetInlineStart: "-".concat(token.proLayoutCollapsedWidth - 12, "px"),
    position: 'absolute'
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-mix', {
    height: "calc(100% - ".concat((token === null || token === void 0 ? void 0 : (_token$layout10 = token.layout) === null || _token$layout10 === void 0 ? void 0 : (_token$layout10$heade = _token$layout10.header) === null || _token$layout10$heade === void 0 ? void 0 : _token$layout10$heade.heightLayoutHeader) || 56, "px)"),
    insetBlockStart: "".concat((token === null || token === void 0 ? void 0 : (_token$layout11 = token.layout) === null || _token$layout11 === void 0 ? void 0 : (_token$layout11$heade = _token$layout11.header) === null || _token$layout11$heade === void 0 ? void 0 : _token$layout11$heade.heightLayoutHeader) || 56, "px")
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-extra', {
    marginBlockEnd: 16,
    marginBlock: 0,
    marginInline: 16,
    '&-no-logo': {
      marginBlockStart: 16
    }
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-links', {
    width: '100%',
    ul: {
      height: 'auto'
    }
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-link-menu', {
    border: 'none',
    boxShadow: 'none',
    background: 'transparent'
  }), (0,defineProperty/* default */.Z)(_token$componentCls, '&-footer', {
    color: (_token$layout12 = token.layout) === null || _token$layout12 === void 0 ? void 0 : (_token$layout12$sider = _token$layout12.sider) === null || _token$layout12$sider === void 0 ? void 0 : _token$layout12$sider.colorTextMenuSecondary,
    paddingBlockEnd: 16,
    fontSize: token.fontSize,
    animationName: proLayoutTitleHide,
    animationDuration: '.3s',
    animationTimingFunction: 'ease'
  }), _token$componentCls))));
};
function SiderMenu_style_useStyle(prefixCls, _ref2) {
  var proLayoutCollapsedWidth = _ref2.proLayoutCollapsedWidth;
  return (0,useStyle/* useStyle */.Xj)('ProLayoutSiderMenu', function (token) {
    var siderMenuToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      proLayoutCollapsedWidth: proLayoutCollapsedWidth
    });
    return [style_genSiderMenuStyle(siderMenuToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/components/SiderMenu/index.js









var SiderMenuWrapper = function SiderMenuWrapper(props) {
  var isMobile = props.isMobile,
    siderWidth = props.siderWidth,
    collapsed = props.collapsed,
    onCollapse = props.onCollapse,
    style = props.style,
    className = props.className,
    hide = props.hide,
    getContainer = props.getContainer,
    prefixCls = props.prefixCls;
  (0,react.useEffect)(function () {
    if (isMobile === true) {
      onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  var omitProps = (0,omit_js_es/* default */.Z)(props, ['className', 'style']);
  var _React$useContext = react.useContext(config_provider/* default.ConfigContext */.ZP.ConfigContext),
    direction = _React$useContext.direction;
  var _useStyle = SiderMenu_style_useStyle("".concat(prefixCls, "-sider"), {
      proLayoutCollapsedWidth: 64
    }),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var siderClassName = classnames_default()("".concat(prefixCls, "-sider"), className, hashId);
  if (hide) {
    return null;
  }
  var drawerOpenProps = openVisibleCompatible(!collapsed, function () {
    return onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(true);
  });
  return wrapSSR(isMobile ? (0,jsx_runtime.jsx)(drawer, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    placement: direction === 'rtl' ? 'right' : 'left',
    className: classnames_default()("".concat(prefixCls, "-drawer-sider"), className)
  }, drawerOpenProps), {}, {
    style: (0,esm_objectSpread2/* default */.Z)({
      padding: 0,
      height: '100vh'
    }, style),
    maskClosable: true,
    closable: false,
    getContainer: getContainer,
    width: siderWidth,
    bodyStyle: {
      height: '100vh',
      padding: 0,
      display: 'flex',
      flexDirection: 'row'
    },
    children: (0,jsx_runtime.jsx)(SiderMenu, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, omitProps), {}, {
      isMobile: true,
      className: siderClassName,
      collapsed: isMobile ? false : collapsed,
      splitMenus: false,
      originCollapsed: collapsed
    }))
  })) : (0,jsx_runtime.jsx)(SiderMenu, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    className: siderClassName,
    originCollapsed: collapsed
  }, omitProps), {}, {
    style: style
  })));
};

// EXTERNAL MODULE: ./node_modules/@ant-design/pro-layout/es/context/RouteContext.js
var RouteContext = __webpack_require__(76509);
// EXTERNAL MODULE: ./node_modules/@ant-design/pro-layout/node_modules/path-to-regexp/index.js
var node_modules_path_to_regexp = __webpack_require__(16254);
var path_to_regexp_default = /*#__PURE__*/__webpack_require__.n(node_modules_path_to_regexp);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/getPageTitle.js


var matchParamsPath = function matchParamsPath(pathname, breadcrumb, breadcrumbMap) {
  // Internal logic use breadcrumbMap to ensure the order
  // \u5185\u90E8\u903B\u8F91\u4F7F\u7528 breadcrumbMap \u6765\u786E\u4FDD\u67E5\u8BE2\u987A\u5E8F
  if (breadcrumbMap) {
    var pathKey = (0,esm_toConsumableArray/* default */.Z)(breadcrumbMap.keys()).find(function (key) {
      return path_to_regexp_default()(key).test(pathname);
    });
    if (pathKey) {
      return breadcrumbMap.get(pathKey);
    }
  }
  // External uses use breadcrumb
  // \u5916\u90E8\u7528\u6237\u4F7F\u7528 breadcrumb \u53C2\u6570
  if (breadcrumb) {
    var _pathKey = Object.keys(breadcrumb).find(function (key) {
      return path_to_regexp_default()(key).test(pathname);
    });
    if (_pathKey) {
      return breadcrumb[_pathKey];
    }
  }
  return {
    path: ''
  };
};
/**
 * \u83B7\u53D6\u5173\u4E8E pageTitle \u7684\u6240\u6709\u4FE1\u606F\u65B9\u4FBF\u5305\u88C5
 *
 * @param props
 * @param ignoreTitle
 */
var getPageTitleInfo = function getPageTitleInfo(props, ignoreTitle) {
  var _props$pathname = props.pathname,
    pathname = _props$pathname === void 0 ? '/' : _props$pathname,
    breadcrumb = props.breadcrumb,
    breadcrumbMap = props.breadcrumbMap,
    formatMessage = props.formatMessage,
    title = props.title,
    _props$menu = props.menu,
    menu = _props$menu === void 0 ? {
      locale: false
    } : _props$menu;
  var pageTitle = ignoreTitle ? '' : title || '';
  var currRouterData = matchParamsPath(pathname, breadcrumb, breadcrumbMap);
  if (!currRouterData) {
    return {
      title: pageTitle,
      id: '',
      pageName: pageTitle
    };
  }
  var pageName = currRouterData.name;
  if (menu.locale !== false && currRouterData.locale && formatMessage) {
    pageName = formatMessage({
      id: currRouterData.locale || '',
      defaultMessage: currRouterData.name
    });
  }
  if (!pageName) {
    return {
      title: pageTitle,
      id: currRouterData.locale || '',
      pageName: pageTitle
    };
  }
  if (ignoreTitle || !title) {
    return {
      title: pageName,
      id: currRouterData.locale || '',
      pageName: pageName
    };
  }
  return {
    title: "".concat(pageName, " - ").concat(title),
    id: currRouterData.locale || '',
    pageName: pageName
  };
};
var getPageTitle = function getPageTitle(props, ignoreTitle) {
  return getPageTitleInfo(props, ignoreTitle).title;
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/en-US/settingDrawer.js
/* harmony default export */ var settingDrawer = ({
  'app.setting.pagestyle': 'Page style setting',
  'app.setting.pagestyle.dark': 'Dark Menu style',
  'app.setting.pagestyle.light': 'Light Menu style',
  'app.setting.pagestyle.realdark': 'Dark style (Beta)',
  'app.setting.content-width': 'Content Width',
  'app.setting.content-width.fixed': 'Fixed',
  'app.setting.content-width.fluid': 'Fluid',
  'app.setting.themecolor': 'Theme Color',
  'app.setting.themecolor.dust': 'Dust Red',
  'app.setting.themecolor.volcano': 'Volcano',
  'app.setting.themecolor.sunset': 'Sunset Orange',
  'app.setting.themecolor.cyan': 'Cyan',
  'app.setting.themecolor.green': 'Polar Green',
  'app.setting.themecolor.techBlue': 'Tech Blue (default)',
  'app.setting.themecolor.daybreak': 'Daybreak Blue',
  'app.setting.themecolor.geekblue': 'Geek Blue',
  'app.setting.themecolor.purple': 'Golden Purple',
  'app.setting.sidermenutype': 'SideMenu Type',
  'app.setting.sidermenutype-sub': 'Classic',
  'app.setting.sidermenutype-group': 'Grouping',
  'app.setting.navigationmode': 'Navigation Mode',
  'app.setting.regionalsettings': 'Regional Settings',
  'app.setting.regionalsettings.header': 'Header',
  'app.setting.regionalsettings.menu': 'Menu',
  'app.setting.regionalsettings.footer': 'Footer',
  'app.setting.regionalsettings.menuHeader': 'Menu Header',
  'app.setting.sidemenu': 'Side Menu Layout',
  'app.setting.topmenu': 'Top Menu Layout',
  'app.setting.mixmenu': 'Mix Menu Layout',
  'app.setting.splitMenus': 'Split Menus',
  'app.setting.fixedheader': 'Fixed Header',
  'app.setting.fixedsidebar': 'Fixed Sidebar',
  'app.setting.fixedsidebar.hint': 'Works on Side Menu Layout',
  'app.setting.hideheader': 'Hidden Header when scrolling',
  'app.setting.hideheader.hint': 'Works when Hidden Header is enabled',
  'app.setting.othersettings': 'Other Settings',
  'app.setting.weakmode': 'Weak Mode',
  'app.setting.copy': 'Copy Setting',
  'app.setting.loading': 'Loading theme',
  'app.setting.copyinfo': 'copy success\uFF0Cplease replace defaultSettings in src/models/setting.js',
  'app.setting.production.hint': 'Setting panel shows in development environment only, please manually modify'
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/en-US.js


/* harmony default export */ var en_US = ((0,esm_objectSpread2/* default */.Z)({}, settingDrawer));
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/it-IT/settingDrawer.js
/* harmony default export */ var it_IT_settingDrawer = ({
  'app.setting.pagestyle': 'Impostazioni di stile',
  'app.setting.pagestyle.dark': 'Tema scuro',
  'app.setting.pagestyle.light': 'Tema chiaro',
  'app.setting.content-width': 'Largezza contenuto',
  'app.setting.content-width.fixed': 'Fissa',
  'app.setting.content-width.fluid': 'Fluida',
  'app.setting.themecolor': 'Colore del tema',
  'app.setting.themecolor.dust': 'Rosso polvere',
  'app.setting.themecolor.volcano': 'Vulcano',
  'app.setting.themecolor.sunset': 'Arancione tramonto',
  'app.setting.themecolor.cyan': 'Ciano',
  'app.setting.themecolor.green': 'Verde polare',
  'app.setting.themecolor.techBlue': 'Tech Blu (default)',
  'app.setting.themecolor.daybreak': 'Blu cielo mattutino',
  'app.setting.themecolor.geekblue': 'Blu geek',
  'app.setting.themecolor.purple': 'Viola dorato',
  'app.setting.navigationmode': 'Modalit\xE0 di navigazione',
  'app.setting.sidemenu': 'Menu laterale',
  'app.setting.topmenu': 'Menu in testata',
  'app.setting.mixmenu': 'Menu misto',
  'app.setting.splitMenus': 'Menu divisi',
  'app.setting.fixedheader': 'Testata fissa',
  'app.setting.fixedsidebar': 'Menu laterale fisso',
  'app.setting.fixedsidebar.hint': 'Solo se selezionato Menu laterale',
  'app.setting.hideheader': 'Nascondi testata durante lo scorrimento',
  'app.setting.hideheader.hint': 'Solo se abilitato Nascondi testata durante lo scorrimento',
  'app.setting.othersettings': 'Altre impostazioni',
  'app.setting.weakmode': 'Inverti colori',
  'app.setting.copy': 'Copia impostazioni',
  'app.setting.loading': 'Carico tema...',
  'app.setting.copyinfo': 'Impostazioni copiate con successo! Incolla il contenuto in config/defaultSettings.js',
  'app.setting.production.hint': 'Questo pannello \xE8 visibile solo durante lo sviluppo. Le impostazioni devono poi essere modificate manulamente'
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/it-IT.js


/* harmony default export */ var it_IT = ((0,esm_objectSpread2/* default */.Z)({}, it_IT_settingDrawer));
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/ko-KR/settingDrawer.js
/* harmony default export */ var ko_KR_settingDrawer = ({
  'app.setting.pagestyle': '\uC2A4\uD0C0\uC77C \uC124\uC815',
  'app.setting.pagestyle.dark': '\uB2E4\uD06C \uBAA8\uB4DC',
  'app.setting.pagestyle.light': '\uB77C\uC774\uD2B8 \uBAA8\uB4DC',
  'app.setting.content-width': '\uCEE8\uD150\uCE20 \uB108\uBE44',
  'app.setting.content-width.fixed': '\uACE0\uC815',
  'app.setting.content-width.fluid': '\uD750\uB984',
  'app.setting.themecolor': '\uD14C\uB9C8 \uC0C9\uC0C1',
  'app.setting.themecolor.dust': 'Dust Red',
  'app.setting.themecolor.volcano': 'Volcano',
  'app.setting.themecolor.sunset': 'Sunset Orange',
  'app.setting.themecolor.cyan': 'Cyan',
  'app.setting.themecolor.green': 'Polar Green',
  'app.setting.themecolor.techBlue': 'Tech Blu (default)',
  'app.setting.themecolor.daybreak': 'Daybreak Blue',
  'app.setting.themecolor.geekblue': 'Geek Blue',
  'app.setting.themecolor.purple': 'Golden Purple',
  'app.setting.navigationmode': '\uB124\uBE44\uAC8C\uC774\uC158 \uBAA8\uB4DC',
  'app.setting.regionalsettings': '\uC601\uC5ED\uBCC4 \uC124\uC815',
  'app.setting.regionalsettings.header': '\uD5E4\uB354',
  'app.setting.regionalsettings.menu': '\uBA54\uB274',
  'app.setting.regionalsettings.footer': '\uBC14\uB2E5\uAE00',
  'app.setting.regionalsettings.menuHeader': '\uBA54\uB274 \uD5E4\uB354',
  'app.setting.sidemenu': '\uBA54\uB274 \uC0AC\uC774\uB4DC \uBC30\uCE58',
  'app.setting.topmenu': '\uBA54\uB274 \uC0C1\uB2E8 \uBC30\uCE58',
  'app.setting.mixmenu': '\uD63C\uD569\uD615 \uBC30\uCE58',
  'app.setting.splitMenus': '\uBA54\uB274 \uBD84\uB9AC',
  'app.setting.fixedheader': '\uD5E4\uB354 \uACE0\uC815',
  'app.setting.fixedsidebar': '\uC0AC\uC774\uB4DC\uBC14 \uACE0\uC815',
  'app.setting.fixedsidebar.hint': "'\uBA54\uB274 \uC0AC\uC774\uB4DC \uBC30\uCE58'\uB97C \uC120\uD0DD\uD588\uC744 \uB54C \uB3D9\uC791\uD568",
  'app.setting.hideheader': '\uC2A4\uD06C\uB864 \uC911 \uD5E4\uB354 \uAC10\uCD94\uAE30',
  'app.setting.hideheader.hint': "'\uD5E4\uB354 \uAC10\uCD94\uAE30 \uC635\uC158'\uC744 \uC120\uD0DD\uD588\uC744 \uB54C \uB3D9\uC791\uD568",
  'app.setting.othersettings': '\uB2E4\uB978 \uC124\uC815',
  'app.setting.weakmode': '\uACE0\uB300\uBE44 \uBAA8\uB4DC',
  'app.setting.copy': '\uC124\uC815\uAC12 \uBCF5\uC0AC',
  'app.setting.loading': '\uD14C\uB9C8 \uB85C\uB529 \uC911',
  'app.setting.copyinfo': '\uBCF5\uC0AC \uC131\uACF5. src/models/settings.js\uC5D0 \uC788\uB294 defaultSettings\uB97C \uAD50\uCCB4\uD574 \uC8FC\uC138\uC694.',
  'app.setting.production.hint': '\uC124\uC815 \uD310\uB12C\uC740 \uAC1C\uBC1C \uD658\uACBD\uC5D0\uC11C\uB9CC \uBCF4\uC5EC\uC9D1\uB2C8\uB2E4. \uC9C1\uC811 \uC218\uB3D9\uC73C\uB85C \uBCC0\uACBD\uBC14\uB78D\uB2C8\uB2E4.'
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/ko-KR.js


/* harmony default export */ var ko_KR = ((0,esm_objectSpread2/* default */.Z)({}, ko_KR_settingDrawer));
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/zh-CN/settingDrawer.js
/* harmony default export */ var zh_CN_settingDrawer = ({
  'app.setting.pagestyle': '\u6574\u4F53\u98CE\u683C\u8BBE\u7F6E',
  'app.setting.pagestyle.dark': '\u6697\u8272\u83DC\u5355\u98CE\u683C',
  'app.setting.pagestyle.light': '\u4EAE\u8272\u83DC\u5355\u98CE\u683C',
  'app.setting.pagestyle.realdark': '\u6697\u8272\u98CE\u683C(\u5B9E\u9A8C\u529F\u80FD)',
  'app.setting.content-width': '\u5185\u5BB9\u533A\u57DF\u5BBD\u5EA6',
  'app.setting.content-width.fixed': '\u5B9A\u5BBD',
  'app.setting.content-width.fluid': '\u6D41\u5F0F',
  'app.setting.themecolor': '\u4E3B\u9898\u8272',
  'app.setting.themecolor.dust': '\u8584\u66AE',
  'app.setting.themecolor.volcano': '\u706B\u5C71',
  'app.setting.themecolor.sunset': '\u65E5\u66AE',
  'app.setting.themecolor.cyan': '\u660E\u9752',
  'app.setting.themecolor.green': '\u6781\u5149\u7EFF',
  'app.setting.themecolor.techBlue': '\u79D1\u6280\u84DD\uFF08\u9ED8\u8BA4\uFF09',
  'app.setting.themecolor.daybreak': '\u62C2\u6653',
  'app.setting.themecolor.geekblue': '\u6781\u5BA2\u84DD',
  'app.setting.themecolor.purple': '\u9171\u7D2B',
  'app.setting.navigationmode': '\u5BFC\u822A\u6A21\u5F0F',
  'app.setting.sidermenutype': '\u4FA7\u8FB9\u83DC\u5355\u7C7B\u578B',
  'app.setting.sidermenutype-sub': '\u7ECF\u5178\u6A21\u5F0F',
  'app.setting.sidermenutype-group': '\u5206\u7EC4\u6A21\u5F0F',
  'app.setting.regionalsettings': '\u5185\u5BB9\u533A\u57DF',
  'app.setting.regionalsettings.header': '\u9876\u680F',
  'app.setting.regionalsettings.menu': '\u83DC\u5355',
  'app.setting.regionalsettings.footer': '\u9875\u811A',
  'app.setting.regionalsettings.menuHeader': '\u83DC\u5355\u5934',
  'app.setting.sidemenu': '\u4FA7\u8FB9\u83DC\u5355\u5E03\u5C40',
  'app.setting.topmenu': '\u9876\u90E8\u83DC\u5355\u5E03\u5C40',
  'app.setting.mixmenu': '\u6DF7\u5408\u83DC\u5355\u5E03\u5C40',
  'app.setting.splitMenus': '\u81EA\u52A8\u5206\u5272\u83DC\u5355',
  'app.setting.fixedheader': '\u56FA\u5B9A Header',
  'app.setting.fixedsidebar': '\u56FA\u5B9A\u4FA7\u8FB9\u83DC\u5355',
  'app.setting.fixedsidebar.hint': '\u4FA7\u8FB9\u83DC\u5355\u5E03\u5C40\u65F6\u53EF\u914D\u7F6E',
  'app.setting.hideheader': '\u4E0B\u6ED1\u65F6\u9690\u85CF Header',
  'app.setting.hideheader.hint': '\u56FA\u5B9A Header \u65F6\u53EF\u914D\u7F6E',
  'app.setting.othersettings': '\u5176\u4ED6\u8BBE\u7F6E',
  'app.setting.weakmode': '\u8272\u5F31\u6A21\u5F0F',
  'app.setting.copy': '\u62F7\u8D1D\u8BBE\u7F6E',
  'app.setting.loading': '\u6B63\u5728\u52A0\u8F7D\u4E3B\u9898',
  'app.setting.copyinfo': '\u62F7\u8D1D\u6210\u529F\uFF0C\u8BF7\u5230 src/defaultSettings.js \u4E2D\u66FF\u6362\u9ED8\u8BA4\u914D\u7F6E',
  'app.setting.production.hint': '\u914D\u7F6E\u680F\u53EA\u5728\u5F00\u53D1\u73AF\u5883\u7528\u4E8E\u9884\u89C8\uFF0C\u751F\u4EA7\u73AF\u5883\u4E0D\u4F1A\u5C55\u73B0\uFF0C\u8BF7\u62F7\u8D1D\u540E\u624B\u52A8\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6'
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/zh-CN.js


/* harmony default export */ var zh_CN = ((0,esm_objectSpread2/* default */.Z)({}, zh_CN_settingDrawer));
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/zh-TW/settingDrawer.js
/* harmony default export */ var zh_TW_settingDrawer = ({
  'app.setting.pagestyle': '\u6574\u9AD4\u98A8\u683C\u8A2D\u7F6E',
  'app.setting.pagestyle.dark': '\u6697\u8272\u83DC\u55AE\u98A8\u683C',
  'app.setting.pagestyle.realdark': '\u6697\u8272\u98A8\u683C(\u5B9E\u9A8C\u529F\u80FD)',
  'app.setting.pagestyle.light': '\u4EAE\u8272\u83DC\u55AE\u98A8\u683C',
  'app.setting.content-width': '\u5167\u5BB9\u5340\u57DF\u5BEC\u5EA6',
  'app.setting.content-width.fixed': '\u5B9A\u5BEC',
  'app.setting.content-width.fluid': '\u6D41\u5F0F',
  'app.setting.themecolor': '\u4E3B\u984C\u8272',
  'app.setting.themecolor.dust': '\u8584\u66AE',
  'app.setting.themecolor.volcano': '\u706B\u5C71',
  'app.setting.themecolor.sunset': '\u65E5\u66AE',
  'app.setting.themecolor.cyan': '\u660E\u9752',
  'app.setting.themecolor.green': '\u6975\u5149\u7DA0',
  'app.setting.themecolor.techBlue': '\u79D1\u6280\u84DD\uFF08\u9ED8\u8A8D\uFF09',
  'app.setting.themecolor.daybreak': '\u62C2\u66C9\u85CD',
  'app.setting.themecolor.geekblue': '\u6975\u5BA2\u85CD',
  'app.setting.themecolor.purple': '\u91AC\u7D2B',
  'app.setting.navigationmode': '\u5C0E\u822A\u6A21\u5F0F',
  'app.setting.sidemenu': '\u5074\u908A\u83DC\u55AE\u5E03\u5C40',
  'app.setting.topmenu': '\u9802\u90E8\u83DC\u55AE\u5E03\u5C40',
  'app.setting.mixmenu': '\u6DF7\u5408\u83DC\u55AE\u5E03\u5C40',
  'app.setting.splitMenus': '\u81EA\u52A8\u5206\u5272\u83DC\u5355',
  'app.setting.fixedheader': '\u56FA\u5B9A Header',
  'app.setting.fixedsidebar': '\u56FA\u5B9A\u5074\u908A\u83DC\u55AE',
  'app.setting.fixedsidebar.hint': '\u5074\u908A\u83DC\u55AE\u5E03\u5C40\u6642\u53EF\u914D\u7F6E',
  'app.setting.hideheader': '\u4E0B\u6ED1\u6642\u96B1\u85CF Header',
  'app.setting.hideheader.hint': '\u56FA\u5B9A Header \u6642\u53EF\u914D\u7F6E',
  'app.setting.othersettings': '\u5176\u4ED6\u8A2D\u7F6E',
  'app.setting.weakmode': '\u8272\u5F31\u6A21\u5F0F',
  'app.setting.copy': '\u62F7\u8C9D\u8A2D\u7F6E',
  'app.setting.loading': '\u6B63\u5728\u52A0\u8F09\u4E3B\u984C',
  'app.setting.copyinfo': '\u62F7\u8C9D\u6210\u529F\uFF0C\u8ACB\u5230 src/defaultSettings.js \u4E2D\u66FF\u63DB\u9ED8\u8A8D\u914D\u7F6E',
  'app.setting.production.hint': '\u914D\u7F6E\u6B04\u53EA\u5728\u958B\u767C\u74B0\u5883\u7528\u65BC\u9810\u89BD\uFF0C\u751F\u7522\u74B0\u5883\u4E0D\u6703\u5C55\u73FE\uFF0C\u8ACB\u62F7\u8C9D\u5F8C\u624B\u52D5\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6'
});
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/zh-TW.js


/* harmony default export */ var zh_TW = ((0,esm_objectSpread2/* default */.Z)({}, zh_TW_settingDrawer));
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/locales/index.js






var locales = {
  'zh-CN': zh_CN,
  'zh-TW': zh_TW,
  'en-US': en_US,
  'it-IT': it_IT,
  'ko-KR': ko_KR
};
var getLanguage = function getLanguage() {
  // support ssr
  if (!(0,isBrowser/* isBrowser */.j)()) return 'zh-CN';
  var lang = window.localStorage.getItem('umi_locale');
  return lang || window.g_locale || navigator.language;
};
var gLocaleObject = function gLocaleObject() {
  var gLocale = getLanguage();
  return locales[gLocale] || locales['zh-CN'];
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/style/index.js
/* provided dependency */ var style_process = __webpack_require__(34155);




var style_getVersion = function getVersion() {
  var _process, _process$env;
  if (typeof style_process === 'undefined') return version/* default */.Z;
  return ((_process = style_process) === null || style_process === void 0 ? void 0 : (_process$env = {"NVM_INC":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/include/node","npm_package_devDependencies_lint_staged":"^13.0.3","npm_config_leveldown_binary_host_mirror":"https://npm.taobao.org/mirrors/leveldown/v{version}","PYCHARM_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/pycharm.vmoptions","WEBIDE_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/webide.vmoptions","NVMW_NODEJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/node","npm_package_devDependencies_prettier":"^2.7.1","npm_config_couchbase_binary_host_mirror":"https://npm.taobao.org/mirrors/couchbase/v{version}","TERM_PROGRAM":"Apple_Terminal","npm_package_devDependencies_mockjs":"^1.1.0","NODE":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node","NVM_CD_FLAGS":"-q","ANDROID_HOME":"/Users/eternallycyf/Library/Android/sdk","npm_package_devDependencies_typescript":"^4.1.2","npm_package_dependencies__umijs_max":"^4.0.46","npm_config_version_git_tag":"true","INIT_CWD":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab","SHELL":"/bin/zsh","JETBRAINSCLIENT_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/jetbrainsclient.vmoptions","TERM":"xterm-256color","npm_config_flow_bin_binary_host_mirror":"https://npm.taobao.org/mirrors/flow/v","npm_config_zmq_prebuilt_binary_host_mirror":"https://npm.taobao.org/mirrors/zmq-prebuilt/v{version}","npm_config_gl_binary_host_mirror":"https://npm.taobao.org/mirrors/gl/v{version}","TMPDIR":"/var/folders/m3/c9nzstxn6yqf77lz8wcvmq200000gn/T/","GRADLE_HOME":"/Applications/Android Studio.app/Contents/gradle/gradle-5.6.4","npm_config_init_license":"MIT","TERM_PROGRAM_VERSION":"447","npm_config_chromedriver_cdnurl":"https://npm.taobao.org/mirrors/chromedriver","npm_package_scripts_dev":"max dev","npm_config_grpc_node_binary_host_mirror":"https://npm.taobao.org/mirrors","TERM_SESSION_ID":"996E1C36-E010-49D8-A529-265933774FE6","NODIST_IOJS_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_config_sodium_prebuilt_binary_host_mirror":"https://npm.taobao.org/mirrors/sodium-prebuilt/v{version}","npm_package_private":"true","npm_config_registry":"https://registry.npmjs.org/","npm_config_home":"https://npm.taobao.org","npm_config_no_proxy":"registry.npmjs.org","ZSH":"/Users/eternallycyf/.oh-my-zsh","PNPM_HOME":"/Users/eternallycyf/Library/pnpm","npm_package_dependencies__ant_design_icons":"^4.7.0","NVMW_NPM_MIRROR":"https://npm.taobao.org/mirrors/npm","npm_package_readmeFilename":"README.md","npm_package_devDependencies__types_dva":"^1.1.0","USER":"eternallycyf","NVM_DIR":"/Users/eternallycyf/.nvm","npm_package_description":"- \u6700\u5C0F\u590D\u73B0 - \u65E0\u5176\u4ED6\u4E0D\u76F8\u5173\u5185\u5BB9","npm_package_devDependencies__types_react":"^18.0.0","npm_config_phantomjs_cdnurl":"https://npm.taobao.org/mirrors/phantomjs","npm_package_scripts_deploy":"bash ./deploy.sh","IOJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_package_dependencies_redux_persist":"^6.0.0","PHPSTORM_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/phpstorm.vmoptions","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.uDfhnzMC0L/Listeners","npm_package_dependencies_lodash":"^4.17.19","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","npm_config_node_tk5_binary_host_mirror":"https://npm.taobao.org/mirrors/node-tk5/v{version}","npm_config_utp_native_binary_host_mirror":"https://npm.taobao.org/mirrors/utp-native/v{version}","GOLAND_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/goland.vmoptions","npm_execpath":"/usr/local/lib/node_modules/yarn/bin/yarn.js","APPCODE_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/appcode.vmoptions","PAGER":"less","npm_config_hackrf_binary_host_mirror":"https://npm.taobao.org/mirrors/hackrf/v{version}","npm_package_author_name":"eternallycyf","LSCOLORS":"Gxfxcxdxbxegedabagacad","npm_package_devDependencies__types_react_dom":"^18.0.0","PATH":"/var/folders/m3/c9nzstxn6yqf77lz8wcvmq200000gn/T/yarn--1674452187883-0.010524767745134556:/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/.bin:/Users/eternallycyf/.config/yarn/link/node_modules/.bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/libexec/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node_modules/npm/bin/node-gyp-bin:/var/folders/m3/c9nzstxn6yqf77lz8wcvmq200000gn/T/yarn--1674452187489-0.46525508965450535:/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/.bin:/Users/eternallycyf/.config/yarn/link/node_modules/.bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/libexec/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/lib/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node_modules/npm/bin/node-gyp-bin:/Users/eternallycyf/Library/pnpm:/home/eternallycyf/jdk1.7.0_03/bin:/usr/local/opt/mysql@5.6/bin:/usr/local/opt/redis@4.0/bin:/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/VMware Fusion.app/Contents/Public:/Library/Apple/usr/bin:/Users/eternallycyf/Library/Android/sdk/emulator:/Users/eternallycyf/Library/Android/sdk/tools:/Users/eternallycyf/Library/Android/sdk/tools/bin:/Users/eternallycyf/Library/Android/sdk/platform-tools:/usr/local/Cellar/mysql/8.0.27/bin/:/usr/local/mongodb/bin/:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/usr/local/bin:/Applications/Android Studio.app/Contents/gradle/gradle-5.6.4/bin","npm_config_argv":"{\\"remain\\":[],\\"cooked\\":[\\"run\\",\\"deploy\\"],\\"original\\":[\\"deploy\\"]}","npm_package_devDependencies__types_js_cookie":"^3.0.2","npm_package_scripts_postinstall":"max setup","GH_EMAIL_TOKEN":"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___MY_VMOPTIONS_SHELL_FILE=/Users/eternallycyf/.jetbrains.vmoptions.sh","npm_package_devDependencies_prettier_plugin_packagejson":"^2","__LLVM_PROFILE_RT_INIT_ONCE":"__LLVM_PROFILE_RT_INIT_ONCE","npm_config_https_proxy":"","npm_config_mknod_binary_host_mirror":"https://npm.taobao.org/mirrors/mknod/v{version}","_":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/.bin/cross-env","__CFBundleIdentifier":"com.apple.Terminal","NVM_NODEJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/node","npm_config_sqlite3_binary_site":"https://npm.taobao.org/mirrors/sqlite3","PWD":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab","JAVA_HOME":"/home/eternallycyf/jdk1.7.0_03","NODIST_NODE_MIRROR":"https://npm.taobao.org/mirrors/node","npm_package_devDependencies__types_lodash":"^4.14.191","npm_config_node_sqlite3_binary_host_mirror":"https://npm.taobao.org/mirrors","npm_lifecycle_event":"build:pro","IDEA_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/idea.vmoptions","CLION_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/clion.vmoptions","LANG":"zh_CN.UTF-8","npm_package_name":"","npm_package_scripts_start":"rm -rf ./src/pages/.DS_Store && cross-env NODE_ENV=development max dev","npm_package_scripts_build":"max build","npm_config_version_commit_hooks":"true","npm_config_nodegit_binary_host_mirror":"https://npm.taobao.org/mirrors/nodegit/v{version}/","XPC_FLAGS":"0x0","NODE_ENV":"production","WEBSTORM_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/webstorm.vmoptions","npm_config_bin_links":"true","npm_config_rabin_binary_host_mirror":"https://npm.taobao.org/mirrors/rabin/v{version}","npm_config_wrap_output":"","DATASPELL_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/dataspell.vmoptions","npm_package_dependencies_classnames":"^2.2.6","npm_config_debug_binary_host_mirror":"https://npm.taobao.org/mirrors/node-inspector","npm_config_electron_mirror":"https://npm.taobao.org/mirrors/electron/","XPC_SERVICE_NAME":"0","npm_package_version":"","npm_config_sass_binary_site":"http://npm.taobao.org/mirrors/node-sass","SHLVL":"4","HOME":"/Users/eternallycyf","NVMW_IOJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_config_save_prefix":"^","npm_config_strict_ssl":"true","npm_config_scripts_prepend_node_path":"true","npm_config_NO_PROXY":"registry.npmjs.org","npm_package_devDependencies_husky":"^8.0.1","npm_package_devDependencies_cross_env":"^7.0.3","npm_config_version_git_message":"v%s","npm_package_dependencies_js_cookie":"^3.0.1","npm_config_leveldown_hyper_binary_host_mirror":"https://npm.taobao.org/mirrors/leveldown-hyper/v{version}","npm_config_disturl":"https://npm.taobao.org/dist","LOGNAME":"eternallycyf","LESS":"-R","YARN_WRAP_OUTPUT":"false","npm_package_scripts_format":"prettier --cache --write .","NODEJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/node","npm_lifecycle_script":"cross-env NODE_ENV=production max build","GATEWAY_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/gateway.vmoptions","CLASSPATH":".:/home/eternallycyf/jdk1.7.0_03/lib/dt.jar:/home/eternallycyf/jdk1.7.0_03/lib/tools.jar","npm_package_author_email":"a969475322@gmail.com","DATAGRIP_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/datagrip.vmoptions","NVM_BIN":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin","NVM_IOJS_ORG_MIRROR":"https://npm.taobao.org/mirrors/iojs","npm_config_version_git_sign":"","npm_config_ignore_scripts":"","npm_config_user_agent":"yarn/1.22.15 npm/? node/v18.13.0 darwin x64","npm_package_scripts_build_pro":"cross-env NODE_ENV=production max build","JETBRAINS_CLIENT_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/jetbrains_client.vmoptions","RIDER_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/rider.vmoptions","npm_package_scripts_prepare":"husky install","npm_config_git4win_mirror":"https://npm.taobao.org/mirrors/git-for-windows","RUBYMINE_VM_OPTIONS":"/Users/eternallycyf/Desktop/mdNodes/0.demo/ja-netfilter-all/vmoptions/rubymine.vmoptions","npm_package_devDependencies_prettier_plugin_organize_imports":"^2","npm_package_dependencies_antd":"^5.0.0","npm_config_init_version":"1.0.0","npm_config_ignore_optional":"","npm_config_fse_binary_host_mirror":"https://npm.taobao.org/mirrors/fsevents","npm_package_scripts_setup":"max setup","npm_config_operadriver_cdnurl":"https://npm.taobao.org/mirrors/operadriver","npm_config_profiler_binary_host_mirror":"https://npm.taobao.org/mirrors/node-inspector/","npm_config_python_mirror":"https://npm.taobao.org/mirrors/python","npm_config_utf_8_validate_binary_host_mirror":"https://npm.taobao.org/mirrors/utf-8-validate/v{version}","npm_config_fuse_bindings_binary_host_mirror":"https://npm.taobao.org/mirrors/fuse-bindings/v{version}","npm_node_execpath":"/Users/eternallycyf/.nvm/versions/node/v18.13.0/bin/node","npm_package_dependencies__ant_design_pro_components":"^2.0.1","npm_config_version_tag_prefix":"v","npm_config_puppeteer_download_host":"https://npm.taobao.org/mirrors","UMI_PRESETS":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/@umijs/max/dist/preset.js","UMI_DIR":"/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/umi","PORT":"8000","BABEL_CACHE":"none"}) === null || _process$env === void 0 ? void 0 : _process$env.ANTD_VERSION) || version/* default */.Z;
};
/**
 * \u4E3B\u8981\u533A\u522B\uFF1A
 * \u9700\u8981\u624B\u52A8\u5F15\u5165 import 'antd/dist/antd.css';
 * \u9700\u8981\u91CD\u7F6E menu \u7684\u6837\u5F0F
 * @param token
 * @returns
 */
var compatibleStyle = function compatibleStyle(token) {
  var _getVersion, _token$layout, _token$layout$sider, _token$layout2, _token$layout2$sider, _token$layout3, _token$layout3$sider, _$concat, _token$layout4, _token$layout4$sider, _token$layout5, _token$layout5$sider, _token$layout6, _token$layout6$sider, _token$layout7, _token$layout7$sider, _token$layout8, _token$layout8$sider, _token$layout9, _token$layout9$sider, _$concat$concat, _token$layout10, _token$layout10$sider, _token$layout11, _token$layout11$sider, _token$layout12, _token$layout12$sider, _token$layout13, _token$layout13$sider, _token$layout14, _token$layout14$sider, _token$layout15, _token$layout15$heade, _token$layout16, _token$layout16$heade, _token$layout17, _token$layout17$heade, _token$layout18, _token$layout18$heade, _token$layout19, _token$layout19$heade, _$concat5, _$concat6, _token$layout20, _token$layout20$heade, _token$layout21, _token$layout21$heade, _token$layout22, _token$layout22$heade, _token$layout23, _token$layout23$heade, _token$layout24, _token$layout24$heade, _token$layout25, _token$layout25$heade, _$concat8, _$concat9, _token$componentCls, _token$layout26, _token$layout26$sider, _token$layout27, _token$layout27$sider, _token$layout28, _token$layout28$sider, _token$layout29, _token$layout29$sider, _token$layout30, _token$layout30$sider, _$concat$concat2, _$concat11, _ref;
  if ((_getVersion = style_getVersion()) === null || _getVersion === void 0 ? void 0 : _getVersion.startsWith('5')) {
    return {};
  }
  return _ref = {}, (0,defineProperty/* default */.Z)(_ref, token.proComponentsCls, {
    width: '100%',
    height: '100%'
  }), (0,defineProperty/* default */.Z)(_ref, token.componentCls, (_token$componentCls = {
    width: '100%',
    height: '100%'
  }, (0,defineProperty/* default */.Z)(_token$componentCls, "".concat(token.proComponentsCls, "-base-menu"), (_$concat6 = {
    color: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$sider = _token$layout.sider) === null || _token$layout$sider === void 0 ? void 0 : _token$layout$sider.colorTextMenu
  }, (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-sub"), {
    backgroundColor: 'transparent!important',
    color: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$sider = _token$layout2.sider) === null || _token$layout2$sider === void 0 ? void 0 : _token$layout2$sider.colorTextMenu
  }), (0,defineProperty/* default */.Z)(_$concat6, "& ".concat(token.antCls, "-layout"), {
    backgroundColor: 'transparent',
    width: '100%'
  }), (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-submenu-expand-icon, ").concat(token.antCls, "-menu-submenu-arrow"), {
    color: 'inherit'
  }), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu"), (_$concat = {
    color: token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$sider = _token$layout3.sider) === null || _token$layout3$sider === void 0 ? void 0 : _token$layout3$sider.colorTextMenu
  }, (0,defineProperty/* default */.Z)(_$concat, "".concat(token.antCls, "-menu-item"), {
    '*': {
      transition: 'none !important'
    }
  }), (0,defineProperty/* default */.Z)(_$concat, "".concat(token.antCls, "-menu-item a"), {
    color: 'inherit'
  }), _$concat)), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu-inline"), (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-menu-selected::after,").concat(token.antCls, "-menu-item-selected::after"), {
    display: 'none'
  })), (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-sub ").concat(token.antCls, "-menu-inline"), {
    backgroundColor: 'transparent!important'
  }), (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-item:active, \\n        ").concat(token.antCls, "-menu-submenu-title:active"), {
    backgroundColor: 'transparent!important'
  }), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu-light"), (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-menu-item:hover, \\n            ").concat(token.antCls, "-menu-item-active,\\n            ").concat(token.antCls, "-menu-submenu-active, \\n            ").concat(token.antCls, "-menu-submenu-title:hover"), (0,defineProperty/* default */.Z)({
    color: token === null || token === void 0 ? void 0 : (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : (_token$layout4$sider = _token$layout4.sider) === null || _token$layout4$sider === void 0 ? void 0 : _token$layout4$sider.colorTextMenuActive,
    borderRadius: token.borderRadius
  }, "".concat(token.antCls, "-menu-submenu-arrow"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : (_token$layout5$sider = _token$layout5.sider) === null || _token$layout5$sider === void 0 ? void 0 : _token$layout5$sider.colorTextMenuActive
  }))), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu:not(").concat(token.antCls, "-menu-horizontal)"), (_$concat$concat = {}, (0,defineProperty/* default */.Z)(_$concat$concat, "".concat(token.antCls, "-menu-item-selected"), {
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout6 = token.layout) === null || _token$layout6 === void 0 ? void 0 : (_token$layout6$sider = _token$layout6.sider) === null || _token$layout6$sider === void 0 ? void 0 : _token$layout6$sider.colorBgMenuItemSelected,
    borderRadius: token.borderRadius
  }), (0,defineProperty/* default */.Z)(_$concat$concat, "".concat(token.antCls, "-menu-item:hover, \\n            ").concat(token.antCls, "-menu-item-active,\\n            ").concat(token.antCls, "-menu-submenu-title:hover"), (0,defineProperty/* default */.Z)({
    color: token === null || token === void 0 ? void 0 : (_token$layout7 = token.layout) === null || _token$layout7 === void 0 ? void 0 : (_token$layout7$sider = _token$layout7.sider) === null || _token$layout7$sider === void 0 ? void 0 : _token$layout7$sider.colorTextMenuActive,
    borderRadius: token.borderRadius,
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout8 = token.layout) === null || _token$layout8 === void 0 ? void 0 : (_token$layout8$sider = _token$layout8.sider) === null || _token$layout8$sider === void 0 ? void 0 : _token$layout8$sider.colorBgMenuItemHover
  }, "".concat(token.antCls, "-menu-submenu-arrow"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout9 = token.layout) === null || _token$layout9 === void 0 ? void 0 : (_token$layout9$sider = _token$layout9.sider) === null || _token$layout9$sider === void 0 ? void 0 : _token$layout9$sider.colorTextMenuActive
  })), _$concat$concat)), (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-item-selected"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout10 = token.layout) === null || _token$layout10 === void 0 ? void 0 : (_token$layout10$sider = _token$layout10.sider) === null || _token$layout10$sider === void 0 ? void 0 : _token$layout10$sider.colorTextMenuSelected
  }), (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-submenu-selected"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout11 = token.layout) === null || _token$layout11 === void 0 ? void 0 : (_token$layout11$sider = _token$layout11.sider) === null || _token$layout11$sider === void 0 ? void 0 : _token$layout11$sider.colorTextMenuSelected
  }), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu:not(").concat(token.antCls, "-menu-inline) ").concat(token.antCls, "-menu-submenu-open"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout12 = token.layout) === null || _token$layout12 === void 0 ? void 0 : (_token$layout12$sider = _token$layout12.sider) === null || _token$layout12$sider === void 0 ? void 0 : _token$layout12$sider.colorTextMenuSelected
  }), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu-vertical"), (0,defineProperty/* default */.Z)({}, "".concat(token.antCls, "-menu-submenu-selected"), {
    borderRadius: token.borderRadius,
    color: token === null || token === void 0 ? void 0 : (_token$layout13 = token.layout) === null || _token$layout13 === void 0 ? void 0 : (_token$layout13$sider = _token$layout13.sider) === null || _token$layout13$sider === void 0 ? void 0 : _token$layout13$sider.colorTextMenuSelected
  })), (0,defineProperty/* default */.Z)(_$concat6, "".concat(token.antCls, "-menu-submenu:hover > ").concat(token.antCls, "-menu-submenu-title > ").concat(token.antCls, "-menu-submenu-arrow"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout14 = token.layout) === null || _token$layout14 === void 0 ? void 0 : (_token$layout14$sider = _token$layout14.sider) === null || _token$layout14$sider === void 0 ? void 0 : _token$layout14$sider.colorTextMenuActive
  }), (0,defineProperty/* default */.Z)(_$concat6, "&".concat(token.antCls, "-menu-horizontal"), (_$concat5 = {}, (0,defineProperty/* default */.Z)(_$concat5, "".concat(token.antCls, "-menu-item:hover,\\n          ").concat(token.antCls, "-menu-submenu:hover,\\n          ").concat(token.antCls, "-menu-item-active,\\n          ").concat(token.antCls, "-menu-submenu-active"), {
    borderRadius: 4,
    transition: 'none',
    color: token === null || token === void 0 ? void 0 : (_token$layout15 = token.layout) === null || _token$layout15 === void 0 ? void 0 : (_token$layout15$heade = _token$layout15.header) === null || _token$layout15$heade === void 0 ? void 0 : _token$layout15$heade.colorTextMenuActive,
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout16 = token.layout) === null || _token$layout16 === void 0 ? void 0 : (_token$layout16$heade = _token$layout16.header) === null || _token$layout16$heade === void 0 ? void 0 : _token$layout16$heade.colorBgMenuItemHover
  }), (0,defineProperty/* default */.Z)(_$concat5, "".concat(token.antCls, "-menu-item-open,\\n          ").concat(token.antCls, "-menu-submenu-open,\\n          ").concat(token.antCls, "-menu-item-selected,\\n          ").concat(token.antCls, "-menu-submenu-selected"), (0,defineProperty/* default */.Z)({
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout17 = token.layout) === null || _token$layout17 === void 0 ? void 0 : (_token$layout17$heade = _token$layout17.header) === null || _token$layout17$heade === void 0 ? void 0 : _token$layout17$heade.colorBgMenuItemSelected,
    borderRadius: token.borderRadius,
    transition: 'none',
    color: token === null || token === void 0 ? void 0 : (_token$layout18 = token.layout) === null || _token$layout18 === void 0 ? void 0 : (_token$layout18$heade = _token$layout18.header) === null || _token$layout18$heade === void 0 ? void 0 : _token$layout18$heade.colorTextMenuSelected
  }, "".concat(token.antCls, "-menu-submenu-arrow"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout19 = token.layout) === null || _token$layout19 === void 0 ? void 0 : (_token$layout19$heade = _token$layout19.header) === null || _token$layout19$heade === void 0 ? void 0 : _token$layout19$heade.colorTextMenuSelected
  })), (0,defineProperty/* default */.Z)(_$concat5, "> ".concat(token.antCls, "-menu-item, > ").concat(token.antCls, "-menu-submenu"), {
    paddingInline: 16,
    marginInline: 4
  }), (0,defineProperty/* default */.Z)(_$concat5, "> ".concat(token.antCls, "-menu-item::after, > ").concat(token.antCls, "-menu-submenu::after"), {
    display: 'none'
  }), _$concat5)), _$concat6)), (0,defineProperty/* default */.Z)(_token$componentCls, "".concat(token.proComponentsCls, "-top-nav-header-base-menu"), (_$concat9 = {}, (0,defineProperty/* default */.Z)(_$concat9, "&".concat(token.antCls, "-menu"), (0,defineProperty/* default */.Z)({
    color: token === null || token === void 0 ? void 0 : (_token$layout20 = token.layout) === null || _token$layout20 === void 0 ? void 0 : (_token$layout20$heade = _token$layout20.header) === null || _token$layout20$heade === void 0 ? void 0 : _token$layout20$heade.colorTextMenu
  }, "".concat(token.antCls, "-menu-item a"), {
    color: 'inherit'
  })), (0,defineProperty/* default */.Z)(_$concat9, "&".concat(token.antCls, "-menu-light"), (_$concat8 = {}, (0,defineProperty/* default */.Z)(_$concat8, "".concat(token.antCls, "-menu-item:hover, \\n            ").concat(token.antCls, "-menu-item-active,\\n            ").concat(token.antCls, "-menu-submenu-active, \\n            ").concat(token.antCls, "-menu-submenu-title:hover"), (0,defineProperty/* default */.Z)({
    color: token === null || token === void 0 ? void 0 : (_token$layout21 = token.layout) === null || _token$layout21 === void 0 ? void 0 : (_token$layout21$heade = _token$layout21.header) === null || _token$layout21$heade === void 0 ? void 0 : _token$layout21$heade.colorTextMenuActive,
    borderRadius: token.borderRadius,
    transition: 'none',
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout22 = token.layout) === null || _token$layout22 === void 0 ? void 0 : (_token$layout22$heade = _token$layout22.header) === null || _token$layout22$heade === void 0 ? void 0 : _token$layout22$heade.colorBgMenuItemSelected
  }, "".concat(token.antCls, "-menu-submenu-arrow"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout23 = token.layout) === null || _token$layout23 === void 0 ? void 0 : (_token$layout23$heade = _token$layout23.header) === null || _token$layout23$heade === void 0 ? void 0 : _token$layout23$heade.colorTextMenuActive
  })), (0,defineProperty/* default */.Z)(_$concat8, "".concat(token.antCls, "-menu-item-selected"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout24 = token.layout) === null || _token$layout24 === void 0 ? void 0 : (_token$layout24$heade = _token$layout24.header) === null || _token$layout24$heade === void 0 ? void 0 : _token$layout24$heade.colorTextMenuSelected,
    borderRadius: token.borderRadius,
    backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout25 = token.layout) === null || _token$layout25 === void 0 ? void 0 : (_token$layout25$heade = _token$layout25.header) === null || _token$layout25$heade === void 0 ? void 0 : _token$layout25$heade.colorBgMenuItemSelected
  }), _$concat8)), _$concat9)), _token$componentCls)), (0,defineProperty/* default */.Z)(_ref, "".concat(token.antCls, "-menu-sub").concat(token.antCls, "-menu-inline"), {
    backgroundColor: 'transparent!important'
  }), (0,defineProperty/* default */.Z)(_ref, "".concat(token.antCls, "-menu-submenu-popup"), (_$concat11 = {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
    '-webkit-backdrop-filter': 'blur(8px)',
    backdropFilter: 'blur(8px)'
  }, (0,defineProperty/* default */.Z)(_$concat11, "".concat(token.antCls, "-menu"), (0,defineProperty/* default */.Z)({
    background: 'transparent !important',
    backgroundColor: 'transparent !important'
  }, "".concat(token.antCls, "-menu-item:active, \\n        ").concat(token.antCls, "-menu-submenu-title:active"), {
    backgroundColor: 'transparent!important'
  })), (0,defineProperty/* default */.Z)(_$concat11, "".concat(token.antCls, "-menu-item-selected"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout26 = token.layout) === null || _token$layout26 === void 0 ? void 0 : (_token$layout26$sider = _token$layout26.sider) === null || _token$layout26$sider === void 0 ? void 0 : _token$layout26$sider.colorTextMenuSelected
  }), (0,defineProperty/* default */.Z)(_$concat11, "".concat(token.antCls, "-menu-submenu-selected"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout27 = token.layout) === null || _token$layout27 === void 0 ? void 0 : (_token$layout27$sider = _token$layout27.sider) === null || _token$layout27$sider === void 0 ? void 0 : _token$layout27$sider.colorTextMenuSelected
  }), (0,defineProperty/* default */.Z)(_$concat11, "".concat(token.antCls, "-menu:not(").concat(token.antCls, "-menu-horizontal)"), (_$concat$concat2 = {}, (0,defineProperty/* default */.Z)(_$concat$concat2, "".concat(token.antCls, "-menu-item-selected"), {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: token.borderRadius,
    color: token === null || token === void 0 ? void 0 : (_token$layout28 = token.layout) === null || _token$layout28 === void 0 ? void 0 : (_token$layout28$sider = _token$layout28.sider) === null || _token$layout28$sider === void 0 ? void 0 : _token$layout28$sider.colorTextMenuSelected
  }), (0,defineProperty/* default */.Z)(_$concat$concat2, "".concat(token.antCls, "-menu-item:hover, \\n          ").concat(token.antCls, "-menu-item-active,\\n          ").concat(token.antCls, "-menu-submenu-title:hover"), (0,defineProperty/* default */.Z)({
    color: token === null || token === void 0 ? void 0 : (_token$layout29 = token.layout) === null || _token$layout29 === void 0 ? void 0 : (_token$layout29$sider = _token$layout29.sider) === null || _token$layout29$sider === void 0 ? void 0 : _token$layout29$sider.colorTextMenuActive,
    borderRadius: token.borderRadius
  }, "".concat(token.antCls, "-menu-submenu-arrow"), {
    color: token === null || token === void 0 ? void 0 : (_token$layout30 = token.layout) === null || _token$layout30 === void 0 ? void 0 : (_token$layout30$sider = _token$layout30.sider) === null || _token$layout30$sider === void 0 ? void 0 : _token$layout30$sider.colorTextMenuActive
  })), _$concat$concat2)), _$concat11)), _ref;
};
var genProLayoutStyle = function genProLayoutStyle(token) {
  var _token$layout31, _token$layout31$pageC, _token$layout32, _token$layout32$pageC, _token$layout33, _token$layout33$pageC, _token$layout34, _$concat12, _token$proComponentsC;
  return (0,defineProperty/* default */.Z)({
    body: {
      paddingBlock: 0,
      paddingInline: 0,
      marginBlock: 0,
      marginInline: 0,
      fontFamily: token.fontFamily
    }
  }, token.proComponentsCls, (_token$proComponentsC = {}, (0,defineProperty/* default */.Z)(_token$proComponentsC, "".concat(token.antCls, "-layout"), {
    backgroundColor: 'transparent !important'
  }), (0,defineProperty/* default */.Z)(_token$proComponentsC, "& ".concat(token.componentCls), (_$concat12 = {}, (0,defineProperty/* default */.Z)(_$concat12, "& ".concat(token.antCls, "-layout"), {
    display: 'flex',
    backgroundColor: 'transparent',
    width: '100%'
  }), (0,defineProperty/* default */.Z)(_$concat12, "".concat(token.componentCls, "-content"), {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: (token === null || token === void 0 ? void 0 : (_token$layout31 = token.layout) === null || _token$layout31 === void 0 ? void 0 : (_token$layout31$pageC = _token$layout31.pageContainer) === null || _token$layout31$pageC === void 0 ? void 0 : _token$layout31$pageC.colorBgPageContainer) || 'transparent',
    position: 'relative',
    '*': {
      boxSizing: 'border-box'
    },
    paddingBlock: token === null || token === void 0 ? void 0 : (_token$layout32 = token.layout) === null || _token$layout32 === void 0 ? void 0 : (_token$layout32$pageC = _token$layout32.pageContainer) === null || _token$layout32$pageC === void 0 ? void 0 : _token$layout32$pageC.paddingBlockPageContainerContent,
    paddingInline: token === null || token === void 0 ? void 0 : (_token$layout33 = token.layout) === null || _token$layout33 === void 0 ? void 0 : (_token$layout33$pageC = _token$layout33.pageContainer) === null || _token$layout33$pageC === void 0 ? void 0 : _token$layout33$pageC.paddingInlinePageContainerContent,
    '&-has-page-container': {
      padding: 0
    }
  }), (0,defineProperty/* default */.Z)(_$concat12, "".concat(token.componentCls, "-container"), {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0,
    backgroundColor: 'transparent'
  }), (0,defineProperty/* default */.Z)(_$concat12, "".concat(token.componentCls, "-bg-list"), {
    pointerEvents: 'none',
    position: 'fixed',
    overflow: 'hidden',
    insetBlockStart: 0,
    insetInlineStart: 0,
    zIndex: 0,
    height: '100%',
    width: '100%',
    background: token === null || token === void 0 ? void 0 : (_token$layout34 = token.layout) === null || _token$layout34 === void 0 ? void 0 : _token$layout34.bgLayout
  }), _$concat12)), (0,defineProperty/* default */.Z)(_token$proComponentsC, "".concat(token.antCls, "-menu-submenu-popup"), {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
    '-webkit-backdrop-filter': 'blur(8px)',
    backdropFilter: 'blur(8px)'
  }), _token$proComponentsC));
};
function es_style_useStyle(prefixCls) {
  return (0,useStyle/* useStyle */.Xj)('ProLayout', function (token) {
    var proLayoutToken = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProLayoutStyle(proLayoutToken), compatibleStyle(proLayoutToken)];
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/utils/pathTools.js
// /userInfo/2144/id => ['/userInfo','/userInfo/2144,'/userInfo/2144/id']
function urlToList(url) {
  if (!url || url === '/') {
    return ['/'];
  }
  var urlList = url.split('/').filter(function (i) {
    return i;
  });
  return urlList.map(function (urlItem, index) {
    return "/".concat(urlList.slice(0, index + 1).join('/'));
  });
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/utils/getBreadcrumbProps.js



// \u6E32\u67D3Breadcrumb \u5B50\u8282\u70B9
// Render the Breadcrumb child node
var defaultItemRender = function defaultItemRender(route, _, routes) {
  var breadcrumbName = route.breadcrumbName,
    path = route.path;
  var last = routes.indexOf(route) === routes.length - 1;
  return last ? (0,jsx_runtime.jsx)("span", {
    children: breadcrumbName
  }) : (0,jsx_runtime.jsx)("a", {
    href: path,
    children: breadcrumbName
  });
};
var renderItemLocal = function renderItemLocal(item, props) {
  var formatMessage = props.formatMessage,
    menu = props.menu;
  if (item.locale && formatMessage && (menu === null || menu === void 0 ? void 0 : menu.locale) !== false) {
    return formatMessage({
      id: item.locale,
      defaultMessage: item.name
    });
  }
  return item.name;
};
var getBreadcrumb = function getBreadcrumb(breadcrumbMap, url) {
  var breadcrumbItem = breadcrumbMap.get(url);
  if (!breadcrumbItem) {
    // Find the first matching path in the order defined by route config
    // \u6309\u7167 route config \u5B9A\u4E49\u7684\u987A\u5E8F\u627E\u5230\u7B2C\u4E00\u4E2A\u5339\u914D\u7684\u8DEF\u5F84
    var keys = Array.from(breadcrumbMap.keys()) || [];
    var targetPath = keys.find(function (path) {
      return (
        // remove ? ,\u4E0D\u7136\u4F1A\u91CD\u590D
        path_to_regexp_default()(path.replace('?', '')).test(url)
      );
    });
    if (targetPath) breadcrumbItem = breadcrumbMap.get(targetPath);
  }
  return breadcrumbItem || {
    path: ''
  };
};
var getBreadcrumbFromProps = function getBreadcrumbFromProps(props) {
  var location = props.location,
    breadcrumbMap = props.breadcrumbMap;
  return {
    location: location,
    breadcrumbMap: breadcrumbMap
  };
};
var conversionFromLocation = function conversionFromLocation(routerLocation, breadcrumbMap, props) {
  // Convertor the url to an array
  var pathSnippets = urlToList(routerLocation === null || routerLocation === void 0 ? void 0 : routerLocation.pathname);
  // Loop data mosaic routing
  var extraBreadcrumbItems = pathSnippets.map(function (url) {
    var currentBreadcrumb = getBreadcrumb(breadcrumbMap, url);
    var name = renderItemLocal(currentBreadcrumb, props);
    var hideInBreadcrumb = currentBreadcrumb.hideInBreadcrumb;
    return name && !hideInBreadcrumb ? {
      path: url,
      breadcrumbName: name,
      component: currentBreadcrumb.component
    } : {
      path: '',
      breadcrumbName: ''
    };
  }).filter(function (item) {
    return item && item.path;
  });
  return extraBreadcrumbItems;
};
/** \u5C06\u53C2\u6570\u8F6C\u5316\u4E3A\u9762\u5305\u5C51 Convert parameters into breadcrumbs */
var genBreadcrumbProps = function genBreadcrumbProps(props) {
  var _getBreadcrumbFromPro = getBreadcrumbFromProps(props),
    location = _getBreadcrumbFromPro.location,
    breadcrumbMap = _getBreadcrumbFromPro.breadcrumbMap;
  // \u6839\u636E location \u751F\u6210 \u9762\u5305\u5C51
  // Generate breadcrumbs based on location
  if (location && location.pathname && breadcrumbMap) {
    return conversionFromLocation(location, breadcrumbMap, props);
  }
  return [];
};
// use breadcrumbRender to change routes
var getBreadcrumbProps = function getBreadcrumbProps(props, layoutPros) {
  var breadcrumbRender = props.breadcrumbRender,
    propsItemRender = props.itemRender;
  var _ref = layoutPros.breadcrumbProps || {},
    _ref$minLength = _ref.minLength,
    minLength = _ref$minLength === void 0 ? 2 : _ref$minLength;
  var routesArray = genBreadcrumbProps(props);
  var itemRender = propsItemRender || defaultItemRender;
  var routes = routesArray;
  // if routes.length =1, don't show it
  if (breadcrumbRender) {
    routes = breadcrumbRender(routes) || [];
  }
  if (routes && routes.length < minLength || breadcrumbRender === false) {
    routes = undefined;
  }
  return {
    routes: routes,
    itemRender: itemRender
  };
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/utils/getMenuData.js



function fromEntries(iterable) {
  return (0,esm_toConsumableArray/* default */.Z)(iterable).reduce(function (obj, _ref) {
    var _ref2 = (0,esm_slicedToArray/* default */.Z)(_ref, 2),
      key = _ref2[0],
      val = _ref2[1];
    // eslint-disable-next-line no-param-reassign
    obj[key] = val;
    return obj;
  }, {});
}
var getMenuData = function getMenuData(routes, menu, formatMessage, menuDataRender) {
  var _transformRoute = transformRoute_transformRoute(routes, (menu === null || menu === void 0 ? void 0 : menu.locale) || false, formatMessage, true),
    menuData = _transformRoute.menuData,
    breadcrumb = _transformRoute.breadcrumb;
  if (!menuDataRender) {
    return {
      breadcrumb: fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData: menuData
    };
  }
  return getMenuData(menuDataRender(menuData), menu, formatMessage, undefined);
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/utils/useCurrentMenuLayoutProps.js




var useCurrentMenuLayoutProps = function useCurrentMenuLayoutProps(currentMenu) {
  var _useState = (0,react.useState)({}),
    _useState2 = (0,esm_slicedToArray/* default */.Z)(_useState, 2),
    currentMenuLayoutProps = _useState2[0],
    setCurrentMenuLayoutProps = _useState2[1];
  (0,react.useEffect)(function () {
    setCurrentMenuLayoutProps(omitUndefined({
      // \u6709\u65F6\u5019\u4F1A\u53D8\u6210\u5BF9\u8C61\uFF0C\u662F\u539F\u6765\u7684\u65B9\u5F0F
      layout: (0,esm_typeof/* default */.Z)(currentMenu.layout) !== 'object' ? currentMenu.layout : undefined,
      navTheme: currentMenu.navTheme,
      menuRender: currentMenu.menuRender,
      footerRender: currentMenu.footerRender,
      menuHeaderRender: currentMenu.menuHeaderRender,
      headerRender: currentMenu.headerRender,
      fixSiderbar: currentMenu.fixSiderbar
    }));
  }, [currentMenu.layout, currentMenu.navTheme, currentMenu.menuRender, currentMenu.footerRender, currentMenu.menuHeaderRender, currentMenu.headerRender, currentMenu.fixSiderbar]);
  return currentMenuLayoutProps;
};

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(32531);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__(73568);
// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/CheckCircleFilled.js + 1 modules
var CheckCircleFilled = __webpack_require__(76278);
// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/CloseCircleFilled.js + 1 modules
var CloseCircleFilled = __webpack_require__(41322);
// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/ExclamationCircleFilled.js + 1 modules
var ExclamationCircleFilled = __webpack_require__(26702);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/WarningFilled.js
// This icon file is generated automatically.
var WarningFilled = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "warning", "theme": "filled" };
/* harmony default export */ var asn_WarningFilled = (WarningFilled);

// EXTERNAL MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/components/AntdIcon.js + 3 modules
var components_AntdIcon = __webpack_require__(93771);
;// CONCATENATED MODULE: ./node_modules/antd/node_modules/@ant-design/icons/es/icons/WarningFilled.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var WarningFilled_WarningFilled = function WarningFilled(props, ref) {
  return /*#__PURE__*/react.createElement(components_AntdIcon/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    ref: ref,
    icon: asn_WarningFilled
  }));
};
WarningFilled_WarningFilled.displayName = 'WarningFilled';
/* harmony default export */ var icons_WarningFilled = (/*#__PURE__*/react.forwardRef(WarningFilled_WarningFilled));
;// CONCATENATED MODULE: ./node_modules/antd/es/result/noFound.js

const NoFound = () => /*#__PURE__*/react.createElement("svg", {
  width: "252",
  height: "294"
}, /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("path", {
  d: "M0 .387h251.772v251.772H0z"
})), /*#__PURE__*/react.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/react.createElement("g", {
  transform: "translate(0 .012)"
}, /*#__PURE__*/react.createElement("mask", {
  fill: "#fff"
}), /*#__PURE__*/react.createElement("path", {
  d: "M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321",
  fill: "#E4EBF7",
  mask: "url(#b)"
})), /*#__PURE__*/react.createElement("path", {
  d: "M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  d: "M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  d: "M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  stroke: "#FFF",
  strokeWidth: "2",
  d: "M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39"
}), /*#__PURE__*/react.createElement("path", {
  d: "M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48",
  fill: "#1890FF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88",
  fill: "#FFB594"
}), /*#__PURE__*/react.createElement("path", {
  d: "M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573",
  fill: "#CBD1D1"
}), /*#__PURE__*/react.createElement("path", {
  d: "M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z",
  fill: "#2B0849"
}), /*#__PURE__*/react.createElement("path", {
  d: "M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558",
  fill: "#A4AABA"
}), /*#__PURE__*/react.createElement("path", {
  d: "M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z",
  fill: "#CBD1D1"
}), /*#__PURE__*/react.createElement("path", {
  d: "M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062",
  fill: "#2B0849"
}), /*#__PURE__*/react.createElement("path", {
  d: "M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15",
  fill: "#A4AABA"
}), /*#__PURE__*/react.createElement("path", {
  d: "M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165",
  fill: "#7BB2F9"
}), /*#__PURE__*/react.createElement("path", {
  d: "M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M107.275 222.1s2.773-1.11 6.102-3.884",
  stroke: "#648BD8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038",
  fill: "#192064"
}), /*#__PURE__*/react.createElement("path", {
  d: "M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642",
  fill: "#192064"
}), /*#__PURE__*/react.createElement("path", {
  d: "M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z",
  fill: "#520038"
}), /*#__PURE__*/react.createElement("path", {
  d: "M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254",
  fill: "#552950"
}), /*#__PURE__*/react.createElement("path", {
  stroke: "#DB836E",
  strokeWidth: "1.118",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M110.13 74.84l-.896 1.61-.298 4.357h-2.228"
}), /*#__PURE__*/react.createElement("path", {
  d: "M110.846 74.481s1.79-.716 2.506.537",
  stroke: "#5C2552",
  strokeWidth: "1.118",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67",
  stroke: "#DB836E",
  strokeWidth: "1.118",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M103.287 72.93s1.83 1.113 4.137.954",
  stroke: "#5C2552",
  strokeWidth: "1.118",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639",
  stroke: "#DB836E",
  strokeWidth: "1.118",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206",
  stroke: "#E4EBF7",
  strokeWidth: "1.101",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M129.405 122.865s-5.272 7.403-9.422 10.768",
  stroke: "#E4EBF7",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M119.306 107.329s.452 4.366-2.127 32.062",
  stroke: "#E4EBF7",
  strokeWidth: "1.101",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01",
  fill: "#F2D7AD"
}), /*#__PURE__*/react.createElement("path", {
  d: "M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92",
  fill: "#F4D19D"
}), /*#__PURE__*/react.createElement("path", {
  d: "M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z",
  fill: "#F2D7AD"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#CC9B6E",
  d: "M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z"
}), /*#__PURE__*/react.createElement("path", {
  d: "M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83",
  fill: "#F4D19D"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#CC9B6E",
  d: "M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#CC9B6E",
  d: "M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z"
}), /*#__PURE__*/react.createElement("path", {
  d: "M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044",
  stroke: "#DB836E",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617",
  stroke: "#DB836E",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754",
  stroke: "#DB836E",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647",
  fill: "#5BA02E"
}), /*#__PURE__*/react.createElement("path", {
  d: "M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647",
  fill: "#92C110"
}), /*#__PURE__*/react.createElement("path", {
  d: "M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187",
  fill: "#F2D7AD"
}), /*#__PURE__*/react.createElement("path", {
  d: "M88.979 89.48s7.776 5.384 16.6 2.842",
  stroke: "#E4EBF7",
  strokeWidth: "1.101",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));
/* harmony default export */ var noFound = (NoFound);
;// CONCATENATED MODULE: ./node_modules/antd/es/result/serverError.js

const ServerError = () => /*#__PURE__*/react.createElement("svg", {
  width: "254",
  height: "294"
}, /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("path", {
  d: "M0 .335h253.49v253.49H0z"
}), /*#__PURE__*/react.createElement("path", {
  d: "M0 293.665h253.49V.401H0z"
})), /*#__PURE__*/react.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/react.createElement("g", {
  transform: "translate(0 .067)"
}, /*#__PURE__*/react.createElement("mask", {
  fill: "#fff"
}), /*#__PURE__*/react.createElement("path", {
  d: "M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134",
  fill: "#E4EBF7",
  mask: "url(#b)"
})), /*#__PURE__*/react.createElement("path", {
  d: "M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  d: "M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68",
  fill: "#FF603B"
}), /*#__PURE__*/react.createElement("path", {
  d: "M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487",
  fill: "#FFB594"
}), /*#__PURE__*/react.createElement("path", {
  d: "M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246",
  fill: "#FFB594"
}), /*#__PURE__*/react.createElement("path", {
  d: "M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z",
  fill: "#520038"
}), /*#__PURE__*/react.createElement("path", {
  d: "M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26",
  fill: "#552950"
}), /*#__PURE__*/react.createElement("path", {
  stroke: "#DB836E",
  strokeWidth: "1.063",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M99.206 73.644l-.9 1.62-.3 4.38h-2.24"
}), /*#__PURE__*/react.createElement("path", {
  d: "M99.926 73.284s1.8-.72 2.52.54",
  stroke: "#5C2552",
  strokeWidth: "1.117",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68",
  stroke: "#DB836E",
  strokeWidth: "1.117",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M92.326 71.724s1.84 1.12 4.16.96",
  stroke: "#5C2552",
  strokeWidth: "1.117",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954",
  stroke: "#DB836E",
  strokeWidth: "1.063",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044",
  stroke: "#E4EBF7",
  strokeWidth: "1.136",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51",
  stroke: "#E4EBF7",
  strokeWidth: "1.085",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47",
  fill: "#CBD1D1"
}), /*#__PURE__*/react.createElement("path", {
  d: "M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z",
  fill: "#2B0849"
}), /*#__PURE__*/react.createElement("path", {
  d: "M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671",
  fill: "#A4AABA"
}), /*#__PURE__*/react.createElement("path", {
  d: "M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z",
  fill: "#CBD1D1"
}), /*#__PURE__*/react.createElement("path", {
  d: "M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162",
  fill: "#2B0849"
}), /*#__PURE__*/react.createElement("path", {
  d: "M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156",
  fill: "#A4AABA"
}), /*#__PURE__*/react.createElement("path", {
  d: "M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69",
  fill: "#7BB2F9"
}), /*#__PURE__*/react.createElement("path", {
  d: "M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034",
  stroke: "#648BD8",
  strokeWidth: "1.085",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M96.973 219.373s2.882-1.153 6.34-4.034",
  stroke: "#648BD8",
  strokeWidth: "1.032",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07",
  stroke: "#648BD8",
  strokeWidth: "1.085",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62",
  fill: "#192064"
}), /*#__PURE__*/react.createElement("path", {
  d: "M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668",
  fill: "#192064"
}), /*#__PURE__*/react.createElement("path", {
  d: "M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513",
  stroke: "#648BD8",
  strokeWidth: "1.085",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72",
  stroke: "#E4EBF7",
  strokeWidth: "1.085",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593",
  stroke: "#DB836E",
  strokeWidth: ".774",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762",
  stroke: "#E59788",
  strokeWidth: ".774",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12",
  stroke: "#E59788",
  strokeWidth: ".774",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M109.278 112.533s3.38-3.613 7.575-4.662",
  stroke: "#E4EBF7",
  strokeWidth: "1.085",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M107.375 123.006s9.697-2.745 11.445-.88",
  stroke: "#E59788",
  strokeWidth: ".774",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955",
  stroke: "#BFCDDD",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01",
  fill: "#A3B4C6"
}), /*#__PURE__*/react.createElement("path", {
  d: "M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813",
  fill: "#A3B4C6"
}), /*#__PURE__*/react.createElement("mask", {
  fill: "#fff"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#A3B4C6",
  mask: "url(#d)",
  d: "M154.098 190.096h70.513v-84.617h-70.513z"
}), /*#__PURE__*/react.createElement("path", {
  d: "M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208",
  fill: "#BFCDDD",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802",
  fill: "#FFF",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209",
  fill: "#BFCDDD",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751",
  stroke: "#7C90A5",
  strokeWidth: "1.124",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802",
  fill: "#FFF",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407",
  fill: "#BFCDDD",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M177.259 207.217v11.52M201.05 207.217v11.52",
  stroke: "#A3B4C6",
  strokeWidth: "1.124",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422",
  fill: "#5BA02E",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423",
  fill: "#92C110",
  mask: "url(#d)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209",
  fill: "#F2D7AD",
  mask: "url(#d)"
})));
/* harmony default export */ var serverError = (ServerError);
;// CONCATENATED MODULE: ./node_modules/antd/es/result/unauthorized.js

const Unauthorized = () => /*#__PURE__*/react.createElement("svg", {
  width: "251",
  height: "294"
}, /*#__PURE__*/react.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/react.createElement("path", {
  d: "M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023",
  fill: "#E4EBF7"
}), /*#__PURE__*/react.createElement("path", {
  d: "M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  d: "M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  d: "M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z",
  stroke: "#FFF",
  strokeWidth: "2"
}), /*#__PURE__*/react.createElement("path", {
  stroke: "#FFF",
  strokeWidth: "2",
  d: "M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668"
}), /*#__PURE__*/react.createElement("path", {
  d: "M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321",
  fill: "#A26EF4"
}), /*#__PURE__*/react.createElement("path", {
  d: "M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61",
  fill: "#5BA02E"
}), /*#__PURE__*/react.createElement("path", {
  d: "M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611",
  fill: "#92C110"
}), /*#__PURE__*/react.createElement("path", {
  d: "M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17",
  fill: "#F2D7AD"
}), /*#__PURE__*/react.createElement("path", {
  d: "M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367",
  fill: "#FFB594"
}), /*#__PURE__*/react.createElement("path", {
  d: "M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M78.18 94.656s.911 7.41-4.914 13.078",
  stroke: "#E4EBF7",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437",
  stroke: "#E4EBF7",
  strokeWidth: ".932",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91",
  fill: "#FFB594"
}), /*#__PURE__*/react.createElement("path", {
  d: "M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103",
  fill: "#5C2552"
}), /*#__PURE__*/react.createElement("path", {
  d: "M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  stroke: "#DB836E",
  strokeWidth: "1.145",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M100.843 77.099l1.701-.928-1.015-4.324.674-1.406"
}), /*#__PURE__*/react.createElement("path", {
  d: "M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32",
  fill: "#552950"
}), /*#__PURE__*/react.createElement("path", {
  d: "M91.132 86.786s5.269 4.957 12.679 2.327",
  stroke: "#DB836E",
  strokeWidth: "1.145",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25",
  fill: "#DB836E"
}), /*#__PURE__*/react.createElement("path", {
  d: "M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073",
  stroke: "#5C2552",
  strokeWidth: "1.526",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254",
  stroke: "#DB836E",
  strokeWidth: "1.145",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008",
  stroke: "#E4EBF7",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M66.508 86.763s-1.598 8.83-6.697 14.078",
  stroke: "#E4EBF7",
  strokeWidth: "1.114",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M128.31 87.934s3.013 4.121 4.06 11.785",
  stroke: "#E4EBF7",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M64.09 84.816s-6.03 9.912-13.607 9.903",
  stroke: "#DB836E",
  strokeWidth: ".795",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73",
  fill: "#FFC6A0"
}), /*#__PURE__*/react.createElement("path", {
  d: "M130.532 85.488s4.588 5.757 11.619 6.214",
  stroke: "#DB836E",
  strokeWidth: ".75",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M121.708 105.73s-.393 8.564-1.34 13.612",
  stroke: "#E4EBF7",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M115.784 161.512s-3.57-1.488-2.678-7.14",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68",
  fill: "#CBD1D1"
}), /*#__PURE__*/react.createElement("path", {
  d: "M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z",
  fill: "#2B0849"
}), /*#__PURE__*/react.createElement("path", {
  d: "M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62",
  fill: "#A4AABA"
}), /*#__PURE__*/react.createElement("path", {
  d: "M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z",
  fill: "#CBD1D1"
}), /*#__PURE__*/react.createElement("path", {
  d: "M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078",
  fill: "#2B0849"
}), /*#__PURE__*/react.createElement("path", {
  d: "M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15",
  fill: "#A4AABA"
}), /*#__PURE__*/react.createElement("path", {
  d: "M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954",
  fill: "#7BB2F9"
}), /*#__PURE__*/react.createElement("path", {
  d: "M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M108.459 220.905s2.759-1.104 6.07-3.863",
  stroke: "#648BD8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/react.createElement("path", {
  d: "M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017",
  fill: "#192064"
}), /*#__PURE__*/react.createElement("path", {
  d: "M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806",
  fill: "#FFF"
}), /*#__PURE__*/react.createElement("path", {
  d: "M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64",
  fill: "#192064"
}), /*#__PURE__*/react.createElement("path", {
  d: "M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956",
  stroke: "#648BD8",
  strokeWidth: "1.051",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));
/* harmony default export */ var unauthorized = (Unauthorized);
;// CONCATENATED MODULE: ./node_modules/antd/es/result/style/index.js

// ============================== Styles ==============================
const genBaseStyle = token => {
  const {
    componentCls,
    lineHeightHeading3,
    iconCls,
    padding,
    paddingXL,
    paddingXS,
    paddingLG,
    marginXS,
    lineHeight
  } = token;
  return {
    // Result
    [componentCls]: {
      padding: \`\${paddingLG * 2}px \${paddingXL}px\`,
      // RTL
      '&-rtl': {
        direction: 'rtl'
      }
    },
    // Exception Status image
    [\`\${componentCls} \${componentCls}-image\`]: {
      width: token.imageWidth,
      height: token.imageHeight,
      margin: 'auto'
    },
    [\`\${componentCls} \${componentCls}-icon\`]: {
      marginBottom: paddingLG,
      textAlign: 'center',
      [\`& > \${iconCls}\`]: {
        fontSize: token.resultIconFontSize
      }
    },
    [\`\${componentCls} \${componentCls}-title\`]: {
      color: token.colorTextHeading,
      fontSize: token.resultTitleFontSize,
      lineHeight: lineHeightHeading3,
      marginBlock: marginXS,
      textAlign: 'center'
    },
    [\`\${componentCls} \${componentCls}-subtitle\`]: {
      color: token.colorTextDescription,
      fontSize: token.resultSubtitleFontSize,
      lineHeight,
      textAlign: 'center'
    },
    [\`\${componentCls} \${componentCls}-content\`]: {
      marginTop: paddingLG,
      padding: \`\${paddingLG}px \${padding * 2.5}px\`,
      backgroundColor: token.colorFillAlter
    },
    [\`\${componentCls} \${componentCls}-extra\`]: {
      margin: token.resultExtraMargin,
      textAlign: 'center',
      '& > *': {
        marginInlineEnd: paddingXS,
        '&:last-child': {
          marginInlineEnd: 0
        }
      }
    }
  };
};
const genStatusIconStyle = token => {
  const {
    componentCls,
    iconCls
  } = token;
  return {
    [\`\${componentCls}-success \${componentCls}-icon > \${iconCls}\`]: {
      color: token.resultSuccessIconColor
    },
    [\`\${componentCls}-error \${componentCls}-icon > \${iconCls}\`]: {
      color: token.resultErrorIconColor
    },
    [\`\${componentCls}-info \${componentCls}-icon > \${iconCls}\`]: {
      color: token.resultInfoIconColor
    },
    [\`\${componentCls}-warning \${componentCls}-icon > \${iconCls}\`]: {
      color: token.resultWarningIconColor
    }
  };
};
const genResultStyle = token => [genBaseStyle(token), genStatusIconStyle(token)];
// ============================== Export ==============================
const getStyle = token => genResultStyle(token);
/* harmony default export */ var result_style = ((0,genComponentStyleHook/* default */.Z)('Result', token => {
  const {
    paddingLG,
    fontSizeHeading3
  } = token;
  const resultSubtitleFontSize = token.fontSize;
  const resultExtraMargin = \`\${paddingLG}px 0 0 0\`;
  const resultInfoIconColor = token.colorInfo;
  const resultErrorIconColor = token.colorError;
  const resultSuccessIconColor = token.colorSuccess;
  const resultWarningIconColor = token.colorWarning;
  const resultToken = (0,statistic/* merge */.TS)(token, {
    resultTitleFontSize: fontSizeHeading3,
    resultSubtitleFontSize,
    resultIconFontSize: fontSizeHeading3 * 3,
    resultExtraMargin,
    resultInfoIconColor,
    resultErrorIconColor,
    resultSuccessIconColor,
    resultWarningIconColor
  });
  return [getStyle(resultToken)];
}, {
  imageWidth: 250,
  imageHeight: 295
}));
;// CONCATENATED MODULE: ./node_modules/antd/es/result/index.js












const IconMap = {
  success: CheckCircleFilled/* default */.Z,
  error: CloseCircleFilled/* default */.Z,
  info: ExclamationCircleFilled/* default */.Z,
  warning: icons_WarningFilled
};
const ExceptionMap = {
  '404': noFound,
  '500': serverError,
  '403': unauthorized
};
// ExceptionImageMap keys
const ExceptionStatus = Object.keys(ExceptionMap);
const result_Icon = _ref => {
  let {
    prefixCls,
    icon,
    status
  } = _ref;
  const className = classnames_default()(\`\${prefixCls}-icon\`);
   false ? 0 : void 0;
  if (ExceptionStatus.includes(\`\${status}\`)) {
    const SVGComponent = ExceptionMap[status];
    return /*#__PURE__*/react.createElement("div", {
      className: \`\${className} \${prefixCls}-image\`
    }, /*#__PURE__*/react.createElement(SVGComponent, null));
  }
  const iconNode = /*#__PURE__*/react.createElement(IconMap[status]);
  if (icon === null || icon === false) {
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: className
  }, icon || iconNode);
};
const Extra = _ref2 => {
  let {
    prefixCls,
    extra
  } = _ref2;
  if (!extra) {
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-extra\`
  }, extra);
};
const Result = _ref3 => {
  let {
    prefixCls: customizePrefixCls,
    className: customizeClassName,
    subTitle,
    title,
    style,
    children,
    status = 'info',
    icon,
    extra
  } = _ref3;
  const {
    getPrefixCls,
    direction
  } = react.useContext(config_provider_context/* ConfigContext */.E_);
  const prefixCls = getPrefixCls('result', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = result_style(prefixCls);
  const className = classnames_default()(prefixCls, \`\${prefixCls}-\${status}\`, customizeClassName, {
    [\`\${prefixCls}-rtl\`]: direction === 'rtl'
  }, hashId);
  return wrapSSR( /*#__PURE__*/react.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/react.createElement(result_Icon, {
    prefixCls: prefixCls,
    status: status,
    icon: icon
  }), /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-title\`
  }, title), subTitle && /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-subtitle\`
  }, subTitle), /*#__PURE__*/react.createElement(Extra, {
    prefixCls: prefixCls,
    extra: extra
  }), children && /*#__PURE__*/react.createElement("div", {
    className: \`\${prefixCls}-content\`
  }, children)));
};
Result.PRESENTED_IMAGE_403 = ExceptionMap['403'];
Result.PRESENTED_IMAGE_404 = ExceptionMap['404'];
Result.PRESENTED_IMAGE_500 = ExceptionMap['500'];
if (false) {}
/* harmony default export */ var result = (Result);
;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-utils/es/components/ErrorBoundary/index.js







// eslint-disable-next-line @typescript-eslint/ban-types
var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  (0,inherits/* default */.Z)(ErrorBoundary, _React$Component);
  var _super = (0,createSuper/* default */.Z)(ErrorBoundary);
  function ErrorBoundary() {
    var _this;
    (0,classCallCheck/* default */.Z)(this, ErrorBoundary);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      hasError: false,
      errorInfo: ''
    };
    return _this;
  }
  (0,createClass/* default */.Z)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      // eslint-disable-next-line no-console
      console.log(error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (0,jsx_runtime.jsx)(result, {
          status: "error",
          title: "Something went wrong.",
          extra: this.state.errorInfo
        });
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        errorInfo: error.message
      };
    }
  }]);
  return ErrorBoundary;
}(react.Component);

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/WrapContent.js







var WrapContent = function WrapContent(props) {
  var _classNames;
  var _useContext = (0,react.useContext)(es/* ProProvider */.L_),
    hashId = _useContext.hashId;
  var style = props.style,
    prefixCls = props.prefixCls,
    children = props.children,
    _props$hasPageContain = props.hasPageContainer,
    hasPageContainer = _props$hasPageContain === void 0 ? 0 : _props$hasPageContain;
  var contentClassName = classnames_default()("".concat(prefixCls, "-content"), hashId, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-has-header"), props.hasHeader), (0,defineProperty/* default */.Z)(_classNames, "".concat(prefixCls, "-content-has-page-container"), hasPageContainer > 0), _classNames));
  var ErrorComponent = props.ErrorBoundary || ErrorBoundary;
  return props.ErrorBoundary === false ? (0,jsx_runtime.jsx)(es_layout.Content, {
    className: contentClassName,
    style: style,
    children: children
  }) : (0,jsx_runtime.jsx)(ErrorComponent, {
    children: (0,jsx_runtime.jsx)(es_layout.Content, {
      className: contentClassName,
      style: style,
      children: children
    })
  });
};

;// CONCATENATED MODULE: ./node_modules/@ant-design/pro-layout/es/ProLayout.js






var ProLayout_excluded = ["id", "defaultMessage"],
  ProLayout_excluded2 = ["fixSiderbar", "navTheme", "layout"];



























var layoutIndex = 0;
var headerRender = function headerRender(props, matchMenuKeys) {
  var _props$stylish;
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return (0,jsx_runtime.jsx)(DefaultHeader, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    matchMenuKeys: matchMenuKeys
  }, props), {}, {
    stylish: (_props$stylish = props.stylish) === null || _props$stylish === void 0 ? void 0 : _props$stylish.header
  }));
};
var footerRender = function footerRender(props) {
  if (props.footerRender === false || props.pure) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender((0,esm_objectSpread2/* default */.Z)({}, props), (0,jsx_runtime.jsx)(DefaultFooter, {}));
  }
  return null;
};
var renderSiderMenu = function renderSiderMenu(props, matchMenuKeys) {
  var _props$stylish3;
  var layout = props.layout,
    isMobile = props.isMobile,
    selectedKeys = props.selectedKeys,
    openKeys = props.openKeys,
    splitMenus = props.splitMenus,
    menuRender = props.menuRender;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  var menuData = props.menuData;
  /** \u5982\u679C\u662F\u5206\u5272\u83DC\u5355\u6A21\u5F0F\uFF0C\u9700\u8981\u4E13\u95E8\u5B9E\u73B0\u4E00\u4E0B */
  if (splitMenus && (openKeys !== false || layout === 'mix') && !isMobile) {
    var _ref = selectedKeys || matchMenuKeys,
      _ref2 = (0,esm_slicedToArray/* default */.Z)(_ref, 1),
      key = _ref2[0];
    if (key) {
      var _props$menuData, _props$menuData$find;
      menuData = ((_props$menuData = props.menuData) === null || _props$menuData === void 0 ? void 0 : (_props$menuData$find = _props$menuData.find(function (item) {
        return item.key === key;
      })) === null || _props$menuData$find === void 0 ? void 0 : _props$menuData$find.children) || [];
    } else {
      menuData = [];
    }
  }
  // \u8FD9\u91CC\u8D70\u4E86\u53EF\u4EE5\u5C11\u4E00\u6B21\u5FAA\u73AF
  var clearMenuData = clearMenuItem(menuData || []);
  if (clearMenuData && (clearMenuData === null || clearMenuData === void 0 ? void 0 : clearMenuData.length) < 1 && splitMenus) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    var _props$stylish2;
    return (0,jsx_runtime.jsx)(SiderMenuWrapper, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      matchMenuKeys: matchMenuKeys
    }, props), {}, {
      hide: true,
      stylish: (_props$stylish2 = props.stylish) === null || _props$stylish2 === void 0 ? void 0 : _props$stylish2.sider
    }));
  }
  var defaultDom = (0,jsx_runtime.jsx)(SiderMenuWrapper, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    matchMenuKeys: matchMenuKeys
  }, props), {}, {
    // \u8FD9\u91CC\u8D70\u4E86\u53EF\u4EE5\u5C11\u4E00\u6B21\u5FAA\u73AF
    menuData: clearMenuData,
    stylish: (_props$stylish3 = props.stylish) === null || _props$stylish3 === void 0 ? void 0 : _props$stylish3.sider
  }));
  if (menuRender) {
    return menuRender(props, defaultDom);
  }
  return defaultDom;
};
var defaultPageTitleRender = function defaultPageTitleRender(pageProps, props) {
  var pageTitleRender = props.pageTitleRender;
  var pageTitleInfo = getPageTitleInfo(pageProps);
  if (pageTitleRender === false) {
    return {
      title: props.title || '',
      id: '',
      pageName: ''
    };
  }
  if (pageTitleRender) {
    var title = pageTitleRender(pageProps, pageTitleInfo.title, pageTitleInfo);
    if (typeof title === 'string') {
      return getPageTitleInfo((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, pageTitleInfo), {}, {
        title: title
      }));
    }
    (0,lib_warning["default"])(typeof title === 'string', 'pro-layout: renderPageTitle return value should be a string');
  }
  return pageTitleInfo;
};
var getpaddingInlineStart = function getpaddingInlineStart(hasLeftPadding, collapsed, siderWidth) {
  if (hasLeftPadding) {
    return collapsed ? 60 : siderWidth;
  }
  return 0;
};
/**
 * \u{1F303} Powerful and easy to use beautiful layout \u{1F3C4}\u200D Support multiple topics and layout types
 *
 * @param props
 */
var BaseProLayout = function BaseProLayout(props) {
  var _props$prefixCls, _classNames, _location$pathname, _token$layout, _token$layout$pageCon;
  var _ref3 = props || {},
    children = _ref3.children,
    propsOnCollapse = _ref3.onCollapse,
    _ref3$location = _ref3.location,
    location = _ref3$location === void 0 ? {
      pathname: '/'
    } : _ref3$location,
    contentStyle = _ref3.contentStyle,
    route = _ref3.route,
    defaultCollapsed = _ref3.defaultCollapsed,
    style = _ref3.style,
    propsSiderWidth = _ref3.siderWidth,
    menu = _ref3.menu,
    siderMenuType = _ref3.siderMenuType,
    propsIsChildrenLayout = _ref3.isChildrenLayout,
    menuDataRender = _ref3.menuDataRender,
    actionRef = _ref3.actionRef,
    bgLayoutImgList = _ref3.bgLayoutImgList,
    propsFormatMessage = _ref3.formatMessage,
    loading = _ref3.loading;
  var siderWidth = (0,react.useMemo)(function () {
    if (propsSiderWidth) return propsSiderWidth;
    if (props.layout === 'mix') return 215;
    return 256;
  }, [props.layout, propsSiderWidth]);
  var context = (0,react.useContext)(config_provider/* default.ConfigContext */.ZP.ConfigContext);
  var prefixCls = (_props$prefixCls = props.prefixCls) !== null && _props$prefixCls !== void 0 ? _props$prefixCls : context.getPrefixCls('pro');
  var _useMountMergeState = (0,useMergedState/* default */.Z)(false, {
      value: menu === null || menu === void 0 ? void 0 : menu.loading,
      onChange: menu === null || menu === void 0 ? void 0 : menu.onLoadingChange
    }),
    _useMountMergeState2 = (0,esm_slicedToArray/* default */.Z)(_useMountMergeState, 2),
    menuLoading = _useMountMergeState2[0],
    setMenuLoading = _useMountMergeState2[1];
  // give a default key for swr
  var _useState = (0,react.useState)(function () {
      layoutIndex += 1;
      return "pro-layout-".concat(layoutIndex);
    }),
    _useState2 = (0,esm_slicedToArray/* default */.Z)(_useState, 1),
    defaultId = _useState2[0];
  /**
   * \u5904\u7406\u56FD\u9645\u5316\u76F8\u5173 formatMessage
   * \u5982\u679C\u6709\u7528\u6237\u914D\u7F6E\u7684\u4EE5\u7528\u6237\u4E3A\u4E3B
   * \u5982\u679C\u6CA1\u6709\u7528\u81EA\u5DF1\u5B9E\u73B0\u7684
   */
  var formatMessage = (0,react.useCallback)(function (_ref4) {
    var id = _ref4.id,
      defaultMessage = _ref4.defaultMessage,
      restParams = (0,objectWithoutProperties/* default */.Z)(_ref4, ProLayout_excluded);
    if (propsFormatMessage) {
      return propsFormatMessage((0,esm_objectSpread2/* default */.Z)({
        id: id,
        defaultMessage: defaultMessage
      }, restParams));
    }
    var locales = gLocaleObject();
    return locales[id] ? locales[id] : defaultMessage;
  }, [propsFormatMessage]);
  var _useSWR = (0,dist/* default */.ZP)([defaultId, menu === null || menu === void 0 ? void 0 : menu.params], /*#__PURE__*/function () {
      var _ref6 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/(0,regeneratorRuntime/* default */.Z)().mark(function _callee(_ref5) {
        var _menu$request;
        var _ref7, params, menuDataItems;
        return (0,regeneratorRuntime/* default */.Z)().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _ref7 = (0,esm_slicedToArray/* default */.Z)(_ref5, 2), params = _ref7[1];
              setMenuLoading(true);
              _context.next = 4;
              return menu === null || menu === void 0 ? void 0 : (_menu$request = menu.request) === null || _menu$request === void 0 ? void 0 : _menu$request.call(menu, params || {}, (route === null || route === void 0 ? void 0 : route.children) || (route === null || route === void 0 ? void 0 : route.routes) || []);
            case 4:
              menuDataItems = _context.sent;
              setMenuLoading(false);
              return _context.abrupt("return", menuDataItems);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref6.apply(this, arguments);
      };
    }(), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false
    }),
    data = _useSWR.data,
    mutate = _useSWR.mutate;
  var _useSWRConfig = (0,dist/* useSWRConfig */.kY)(),
    cache = _useSWRConfig.cache;
  (0,react.useEffect)(function () {
    return function () {
      if (cache instanceof Map) cache.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var menuInfoData = (0,react.useMemo)(function () {
    return getMenuData(data || (route === null || route === void 0 ? void 0 : route.children) || (route === null || route === void 0 ? void 0 : route.routes) || [], menu, formatMessage, menuDataRender);
  }, [formatMessage, menu, menuDataRender, data, route === null || route === void 0 ? void 0 : route.children, route === null || route === void 0 ? void 0 : route.routes]);
  var _ref8 = menuInfoData || {},
    _ref8$breadcrumb = _ref8.breadcrumb,
    breadcrumb = _ref8$breadcrumb === void 0 ? {} : _ref8$breadcrumb,
    breadcrumbMap = _ref8.breadcrumbMap,
    _ref8$menuData = _ref8.menuData,
    menuData = _ref8$menuData === void 0 ? [] : _ref8$menuData;
  if (actionRef && (menu === null || menu === void 0 ? void 0 : menu.request)) {
    actionRef.current = {
      reload: function reload() {
        mutate();
      }
    };
  }
  var matchMenus = (0,react.useMemo)(function () {
    return getMatchMenu_getMatchMenu(location.pathname || '/', menuData || [], true);
  }, [location.pathname, menuData]);
  var matchMenuKeys = (0,react.useMemo)(function () {
    return Array.from(new Set(matchMenus.map(function (item) {
      return item.key || item.path || '';
    })));
  }, [matchMenus]);
  // \u5F53\u524D\u9009\u4E2D\u7684menu\uFF0C\u4E00\u822C\u4E0D\u4F1A\u4E3A\u7A7A
  var currentMenu = matchMenus[matchMenus.length - 1] || {};
  var currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);
  var _props$currentMenuLay = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), currentMenuLayoutProps),
    fixSiderbar = _props$currentMenuLay.fixSiderbar,
    navTheme = _props$currentMenuLay.navTheme,
    propsLayout = _props$currentMenuLay.layout,
    rest = (0,objectWithoutProperties/* default */.Z)(_props$currentMenuLay, ProLayout_excluded2);
  var colSize = use_media_antd_query_es();
  var isMobile = (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;
  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  /* Checking if the menu is loading and if it is, it will return a skeleton loading screen. */
  var hasLeftPadding = propsLayout !== 'top' && !isMobile;
  var _useMergedState = (0,useMergedState/* default */.Z)(function () {
      if (defaultCollapsed !== undefined) return defaultCollapsed;
      if (false) {}
      if (isMobile) return true;
      if (colSize === 'md') return true;
      return false;
    }, {
      value: props.collapsed,
      onChange: propsOnCollapse
    }),
    _useMergedState2 = (0,esm_slicedToArray/* default */.Z)(_useMergedState, 2),
    collapsed = _useMergedState2[0],
    onCollapse = _useMergedState2[1];
  // Splicing parameters, adding menuData and formatMessage in props
  var defaultProps = (0,omit_js_es/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    prefixCls: prefixCls
  }, props), {}, {
    siderWidth: siderWidth
  }, currentMenuLayoutProps), {}, {
    formatMessage: formatMessage,
    breadcrumb: breadcrumb,
    menu: (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, menu), {}, {
      type: siderMenuType || (menu === null || menu === void 0 ? void 0 : menu.type),
      loading: menuLoading
    }),
    layout: propsLayout
  }), ['className', 'style', 'breadcrumbRender']);
  // gen page title
  var pageTitleInfo = defaultPageTitleRender((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
    pathname: location.pathname
  }, defaultProps), {}, {
    breadcrumbMap: breadcrumbMap
  }), props);
  // gen breadcrumbProps, parameter for pageHeader
  var breadcrumbProps = getBreadcrumbProps((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, defaultProps), {}, {
    breadcrumbRender: props.breadcrumbRender,
    breadcrumbMap: breadcrumbMap
  }), props);
  // render sider dom
  var siderMenuDom = renderSiderMenu((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, defaultProps), {}, {
    menuData: menuData,
    onCollapse: onCollapse,
    isMobile: isMobile,
    collapsed: collapsed
  }), matchMenuKeys);
  // render header dom
  var headerDom = headerRender((0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, defaultProps), {}, {
    children: null,
    hasSiderMenu: !!siderMenuDom,
    menuData: menuData,
    isMobile: isMobile,
    collapsed: collapsed,
    onCollapse: onCollapse
  }), matchMenuKeys);
  // render footer dom
  var footerDom = footerRender((0,esm_objectSpread2/* default */.Z)({
    isMobile: isMobile,
    collapsed: collapsed
  }, defaultProps));
  var _useContext = (0,react.useContext)(RouteContext/* RouteContext */.X),
    contextIsChildrenLayout = _useContext.isChildrenLayout;
  // \u5982\u679C props \u4E2D\u5B9A\u4E49\uFF0C\u4EE5 props \u4E3A\u51C6
  var isChildrenLayout = propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout;
  var proLayoutClassName = "".concat(prefixCls, "-layout");
  var _useStyle = es_style_useStyle(proLayoutClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  // gen className
  var className = classnames_default()(props.className, hashId, 'ant-design-pro', proLayoutClassName, (_classNames = {}, (0,defineProperty/* default */.Z)(_classNames, "screen-".concat(colSize), colSize), (0,defineProperty/* default */.Z)(_classNames, "".concat(proLayoutClassName, "-top-menu"), propsLayout === 'top'), (0,defineProperty/* default */.Z)(_classNames, "".concat(proLayoutClassName, "-is-children"), isChildrenLayout), (0,defineProperty/* default */.Z)(_classNames, "".concat(proLayoutClassName, "-fix-siderbar"), fixSiderbar), (0,defineProperty/* default */.Z)(_classNames, "".concat(proLayoutClassName, "-").concat(propsLayout), propsLayout), _classNames));
  /** \u8BA1\u7B97 slider \u7684\u5BBD\u5EA6 */
  var leftSiderWidth = getpaddingInlineStart(!!hasLeftPadding, collapsed, siderWidth);
  // siderMenuDom \u4E3A\u7A7A\u7684\u65F6\u5019\uFF0C\u4E0D\u9700\u8981 padding
  var genLayoutStyle = {
    position: 'relative'
  };
  // if is some layout children, don't need min height
  if (isChildrenLayout || contentStyle && contentStyle.minHeight) {
    genLayoutStyle.minHeight = 0;
  }
  /** \u9875\u9762\u5207\u6362\u7684\u65F6\u5019\u89E6\u53D1 */
  (0,react.useEffect)(function () {
    var _props$onPageChange;
    (_props$onPageChange = props.onPageChange) === null || _props$onPageChange === void 0 ? void 0 : _props$onPageChange.call(props, props.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, (_location$pathname = location.pathname) === null || _location$pathname === void 0 ? void 0 : _location$pathname.search]);
  var _useState3 = (0,react.useState)(false),
    _useState4 = (0,esm_slicedToArray/* default */.Z)(_useState3, 2),
    hasFooterToolbar = _useState4[0],
    setHasFooterToolbar = _useState4[1];
  /**
   * \u4F7F\u7528number\u662F\u56E0\u4E3A\u591A\u6807\u7B7E\u9875\u7684\u65F6\u5019\u6709\u591A\u4E2A PageContainer\uFF0C\u53EA\u6709\u6709\u4EFB\u610F\u4E00\u4E2A\u5C31\u5E94\u8BE5\u5C55\u793A\u8FD9\u4E2AclassName
   */
  var _useState5 = (0,react.useState)(0),
    _useState6 = (0,esm_slicedToArray/* default */.Z)(_useState5, 2),
    hasPageContainer = _useState6[0],
    setHasPageContainer = _useState6[1];
  useDocumentTitle(pageTitleInfo, props.title || false);
  var bgImgStyleList = (0,react.useMemo)(function () {
    if (bgLayoutImgList && bgLayoutImgList.length > 0) {
      return bgLayoutImgList.map(function (item, index) {
        return (0,jsx_runtime.jsx)("img", {
          src: item.src,
          style: (0,esm_objectSpread2/* default */.Z)({
            position: 'absolute'
          }, item)
        }, index);
      });
    }
    return null;
  }, [bgLayoutImgList]);
  var _useContext2 = (0,react.useContext)(es/* ProProvider */.L_),
    token = _useContext2.token;
  return wrapSSR((0,jsx_runtime.jsx)(RouteContext/* RouteContext.Provider */.X.Provider, {
    value: (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, defaultProps), {}, {
      breadcrumb: breadcrumbProps,
      menuData: menuData,
      isMobile: isMobile,
      collapsed: collapsed,
      hasPageContainer: hasPageContainer,
      setHasPageContainer: setHasPageContainer,
      isChildrenLayout: true,
      title: pageTitleInfo.pageName,
      hasSiderMenu: !!siderMenuDom,
      hasHeader: !!headerDom,
      siderWidth: leftSiderWidth,
      hasFooter: !!footerDom,
      hasFooterToolbar: hasFooterToolbar,
      setHasFooterToolbar: setHasFooterToolbar,
      pageTitleInfo: pageTitleInfo,
      matchMenus: matchMenus,
      matchMenuKeys: matchMenuKeys,
      currentMenu: currentMenu
    }),
    children: props.pure ? (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
      children: children
    }) : (0,jsx_runtime.jsxs)("div", {
      className: className,
      children: [(0,jsx_runtime.jsx)("div", {
        className: "".concat(proLayoutClassName, "-bg-list ").concat(hashId),
        children: bgImgStyleList
      }), (0,jsx_runtime.jsxs)(es_layout, {
        style: (0,esm_objectSpread2/* default */.Z)({
          minHeight: '100%',
          // hack style
          flexDirection: siderMenuDom ? 'row' : undefined
        }, style),
        children: [siderMenuDom, (0,jsx_runtime.jsxs)("div", {
          style: genLayoutStyle,
          className: "".concat(proLayoutClassName, "-container ").concat(hashId),
          children: [headerDom, (0,jsx_runtime.jsx)(WrapContent, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
            hasPageContainer: hasPageContainer,
            isChildrenLayout: isChildrenLayout
          }, rest), {}, {
            hasHeader: !!headerDom,
            prefixCls: proLayoutClassName,
            style: contentStyle,
            children: loading ? (0,jsx_runtime.jsx)(PageLoading/* PageLoading */.S, {}) : children
          })), footerDom, hasFooterToolbar && (0,jsx_runtime.jsx)("div", {
            className: "".concat(proLayoutClassName, "-has-footer"),
            style: {
              height: 64,
              marginBlockStart: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$pageCon = _token$layout.pageContainer) === null || _token$layout$pageCon === void 0 ? void 0 : _token$layout$pageCon.paddingBlockPageContainerContent
            }
          })]
        })]
      })]
    })
  }));
};
BaseProLayout.defaultProps = (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
  logo: (0,jsx_runtime.jsx)(Logo, {})
}, defaultSettings), {}, {
  location: (0,isBrowser/* isBrowser */.j)() ? window.location : undefined
});
var ProLayout = function ProLayout(props) {
  var colorPrimary = props.colorPrimary;
  var darkProps = props.navTheme !== undefined ? {
    dark: props.navTheme === 'realDark'
  } : {};
  return (0,jsx_runtime.jsx)(config_provider/* default */.ZP, {
    theme: colorPrimary ? {
      token: {
        colorPrimary: colorPrimary
      }
    } : undefined,
    children: (0,jsx_runtime.jsx)(es/* ProConfigProvider */._Y, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({
      autoClearCache: true
    }, darkProps), {}, {
      token: props.token,
      prefixCls: props.prefixCls,
      children: (0,jsx_runtime.jsx)(BaseProLayout, (0,esm_objectSpread2/* default */.Z)({}, props))
    }))
  });
};

;// CONCATENATED MODULE: ./src/.umi-production/plugin-layout/Layout.less
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/.umi-production/plugin-layout/Logo.tsx
// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!



var LogoIcon = function LogoIcon() {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    viewBox: "0 0 200 200",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("defs", {
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("linearGradient", {
        id: "linearGradient-1",
        x1: "62.102%",
        x2: "108.197%",
        y1: "0%",
        y2: "37.864%",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "0%",
          stopColor: "#4285EB"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "100%",
          stopColor: "#2EC7FF"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("linearGradient", {
        id: "linearGradient-2",
        x1: "69.644%",
        x2: "54.043%",
        y1: "0%",
        y2: "108.457%",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "0%",
          stopColor: "#29CDFF"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "37.86%",
          stopColor: "#148EFF"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "100%",
          stopColor: "#0A60FF"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("linearGradient", {
        id: "linearGradient-3",
        x1: "69.691%",
        x2: "16.723%",
        y1: "-12.974%",
        y2: "117.391%",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "0%",
          stopColor: "#FA816E"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "41.473%",
          stopColor: "#F74A5C"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "100%",
          stopColor: "#F51D2C"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("linearGradient", {
        id: "linearGradient-4",
        x1: "68.128%",
        x2: "30.44%",
        y1: "-35.691%",
        y2: "114.943%",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "0%",
          stopColor: "#FA8E7D"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "51.264%",
          stopColor: "#F74A5C"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("stop", {
          offset: "100%",
          stopColor: "#F51D2C"
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("g", {
      fill: "none",
      fillRule: "evenodd",
      stroke: "none",
      strokeWidth: "1",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("g", {
        transform: "translate(-20 -20)",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("g", {
          transform: "translate(20 20)",
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
              fillRule: "nonzero",
              children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
                children: [/*#__PURE__*/(0,jsx_runtime.jsx)("path", {
                  fill: "url(#linearGradient-1)",
                  d: "M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0 4.209-4.205 4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12z"
                }), /*#__PURE__*/(0,jsx_runtime.jsx)("path", {
                  fill: "url(#linearGradient-2)",
                  d: "M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786 5.186-.883 10.855 1.062 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12z"
                })]
              }), /*#__PURE__*/(0,jsx_runtime.jsx)("path", {
                fill: "url(#linearGradient-3)",
                d: "M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228z"
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)("ellipse", {
              cx: "100.519",
              cy: "100.437",
              fill: "url(#linearGradient-4)",
              rx: "23.6",
              ry: "23.581"
            })]
          })
        })
      })
    })]
  });
};
/* harmony default export */ var plugin_layout_Logo = (LogoIcon);
// EXTERNAL MODULE: ./node_modules/antd/es/button/index.js
var es_button = __webpack_require__(71577);
;// CONCATENATED MODULE: ./src/.umi-production/plugin-layout/Exception.tsx
// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!




var Exception = function Exception(props) {
  var _props$route, _props$route2;
  return (
    // render custom 404
    !props.route && (props.noFound || props.notFound) ||
    // render custom 403
    ((_props$route = props.route) === null || _props$route === void 0 ? void 0 : _props$route.unaccessible) && (props.unAccessible || props.noAccessible) ||
    // render default exception
    (!props.route || ((_props$route2 = props.route) === null || _props$route2 === void 0 ? void 0 : _props$route2.unaccessible)) && /*#__PURE__*/(0,jsx_runtime.jsx)(result, {
      status: props.route ? '403' : '404',
      title: props.route ? '403' : '404',
      subTitle: props.route ? '\u62B1\u6B49\uFF0C\u4F60\u65E0\u6743\u8BBF\u95EE\u8BE5\u9875\u9762' : '\u62B1\u6B49\uFF0C\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728',
      extra: /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
        type: "primary",
        onClick: function onClick() {
          return _umi_production_exports.history.push('/');
        },
        children: "\\u8FD4\\u56DE\\u9996\\u9875"
      })
    }) ||
    // normal render
    props.children
  );
};
/* harmony default export */ var plugin_layout_Exception = (Exception);
// EXTERNAL MODULE: ./node_modules/antd/es/spin/index.js + 2 modules
var spin = __webpack_require__(75081);
// EXTERNAL MODULE: ./node_modules/antd/es/dropdown/index.js
var dropdown = __webpack_require__(13013);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/LogoutOutlined.js
// This icon file is generated automatically.
var LogoutOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" } }] }, "name": "logout", "theme": "outlined" };
/* harmony default export */ var asn_LogoutOutlined = (LogoutOutlined);

;// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/icons/LogoutOutlined.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var LogoutOutlined_LogoutOutlined = function LogoutOutlined(props, ref) {
  return /*#__PURE__*/react.createElement(AntdIcon/* default */.Z, (0,esm_objectSpread2/* default */.Z)((0,esm_objectSpread2/* default */.Z)({}, props), {}, {
    ref: ref,
    icon: asn_LogoutOutlined
  }));
};
LogoutOutlined_LogoutOutlined.displayName = 'LogoutOutlined';
/* harmony default export */ var icons_LogoutOutlined = (/*#__PURE__*/react.forwardRef(LogoutOutlined_LogoutOutlined));
// EXTERNAL MODULE: ./src/.umi-production/plugin-locale/index.ts + 1 modules
var plugin_locale = __webpack_require__(66999);
;// CONCATENATED MODULE: ./src/.umi-production/plugin-layout/rightRender.tsx

// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!







function getRightRenderContent(opts) {
  var _opts$initialState, _opts$initialState2;
  if (opts.runtimeConfig.rightRender) {
    return opts.runtimeConfig.rightRender(opts.initialState, opts.setInitialState, opts.runtimeConfig);
  }
  var avatar = /*#__PURE__*/(0,jsx_runtime.jsxs)("span", {
    className: "umi-plugin-layout-action",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(es_avatar/* default */.C, {
      size: "small",
      className: "umi-plugin-layout-avatar",
      src: ((_opts$initialState = opts.initialState) === null || _opts$initialState === void 0 ? void 0 : _opts$initialState.avatar) || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      alt: "avatar"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
      className: "umi-plugin-layout-name",
      children: (_opts$initialState2 = opts.initialState) === null || _opts$initialState2 === void 0 ? void 0 : _opts$initialState2.name
    })]
  });
  if (opts.loading) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "umi-plugin-layout-right",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(spin/* default */.Z, {
        size: "small",
        style: {
          marginLeft: 8,
          marginRight: 8
        }
      })
    });
  }
  var langMenu = {
    className: "umi-plugin-layout-menu",
    selectedKeys: [],
    items: [{
      key: "logout",
      label: /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(icons_LogoutOutlined, {}), "\\u9000\\u51FA\\u767B\\u5F55"]
      }),
      onClick: function onClick() {
        var _opts$runtimeConfig, _opts$runtimeConfig$l;
        opts === null || opts === void 0 ? void 0 : (_opts$runtimeConfig = opts.runtimeConfig) === null || _opts$runtimeConfig === void 0 ? void 0 : (_opts$runtimeConfig$l = _opts$runtimeConfig.logout) === null || _opts$runtimeConfig$l === void 0 ? void 0 : _opts$runtimeConfig$l.call(_opts$runtimeConfig, opts.initialState);
      }
    }]
  };

  // antd@5 \u548C  4.24 \u4E4B\u540E\u63A8\u8350\u4F7F\u7528 menu\uFF0C\u6027\u80FD\u66F4\u597D
  var dropdownProps = version/* default.startsWith */.Z.startsWith("5.") || version/* default.startsWith */.Z.startsWith("4.24.") ? {
    menu: langMenu
  } : {
    overlay: /*#__PURE__*/(0,jsx_runtime.jsx)(es_menu/* default */.Z, objectSpread2_default()({}, langMenu))
  };
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "umi-plugin-layout-right anticon",
    children: [opts.runtimeConfig.logout ? /*#__PURE__*/(0,jsx_runtime.jsx)(dropdown/* default */.Z, objectSpread2_default()(objectSpread2_default()({}, dropdownProps), {}, {
      overlayClassName: "umi-plugin-layout-container",
      children: avatar
    })) : avatar, /*#__PURE__*/(0,jsx_runtime.jsx)(plugin_locale/* SelectLang */.pD, {})]
  });
}
// EXTERNAL MODULE: ./src/.umi-production/plugin-model/index.tsx
var plugin_model = __webpack_require__(44886);
// EXTERNAL MODULE: ./src/.umi-production/plugin-access/index.tsx
var plugin_access = __webpack_require__(83228);
;// CONCATENATED MODULE: ./src/.umi-production/plugin-layout/Layout.tsx




// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
/// <reference types="/Users/eternallycyf/Documents/GitHub/case/\u81EA\u5DF1\u7684\u5305/umi4-tab/node_modules/@ant-design/pro-components" />











// \u8FC7\u6EE4\u51FA\u9700\u8981\u663E\u793A\u7684\u8DEF\u7531, \u8FD9\u91CC\u7684filterFn \u6307 \u4E0D\u5E0C\u671B\u663E\u793A\u7684\u5C42\u7EA7

var filterRoutes = function filterRoutes(routes, filterFn) {
  if (routes.length === 0) {
    return [];
  }
  var newRoutes = [];
  var _iterator = createForOfIteratorHelper_default()(routes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _route = _step.value;
      var newRoute = objectSpread2_default()({}, _route);
      if (filterFn(_route)) {
        if (Array.isArray(newRoute.routes)) {
          newRoutes.push.apply(newRoutes, toConsumableArray_default()(filterRoutes(newRoute.routes, filterFn)));
        }
      } else {
        if (Array.isArray(newRoute.children)) {
          newRoute.children = filterRoutes(newRoute.children, filterFn);
          newRoute.routes = newRoute.children;
        }
        newRoutes.push(newRoute);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return newRoutes;
};

// \u683C\u5F0F\u5316\u8DEF\u7531 \u5904\u7406\u56E0 wrapper \u5BFC\u81F4\u7684 \u83DC\u5355 path \u4E0D\u4E00\u81F4
var mapRoutes = function mapRoutes(routes) {
  if (routes.length === 0) {
    return [];
  }
  return routes.map(function (route) {
    // \u9700\u8981 copy \u4E00\u4EFD, \u5426\u5219\u4F1A\u6C61\u67D3\u539F\u59CB\u6570\u636E
    var newRoute = objectSpread2_default()({}, route);
    if (route.originPath) {
      newRoute.path = route.originPath;
    }
    if (Array.isArray(route.routes)) {
      newRoute.routes = mapRoutes(route.routes);
    }
    if (Array.isArray(route.children)) {
      newRoute.children = mapRoutes(route.children);
    }
    return newRoute;
  });
};
/* harmony default export */ var plugin_layout_Layout = (function (props) {
  var location = (0,_umi_production_exports.useLocation)();
  var navigate = (0,_umi_production_exports.useNavigate)();
  var _useAppData = (0,_umi_production_exports.useAppData)(),
    clientRoutes = _useAppData.clientRoutes,
    pluginManager = _useAppData.pluginManager;
  var initialInfo = plugin_model/* useModel */.t && (0,plugin_model/* useModel */.t)('@@initialState') || {
    initialState: undefined,
    loading: false,
    setInitialState: null
  };
  var initialState = initialInfo.initialState,
    loading = initialInfo.loading,
    setInitialState = initialInfo.setInitialState;
  var userConfig = {
    "title": "tabs\u5207\u6362",
    "contentWidth": "Fluid",
    "locale": false
  };
  var _useIntl = (0,plugin_locale/* useIntl */.YB)(),
    formatMessage = _useIntl.formatMessage;
  var runtimeConfig = pluginManager.applyPlugins({
    key: 'layout',
    type: 'modify',
    initialValue: objectSpread2_default()({}, initialInfo)
  });

  // \u73B0\u5728\u7684 layout \u53CA wrapper \u5B9E\u73B0\u662F\u901A\u8FC7\u7236\u8DEF\u7531\u7684\u5F62\u5F0F\u5B9E\u73B0\u7684, \u4F1A\u5BFC\u81F4\u8DEF\u7531\u6570\u636E\u591A\u4E86\u5197\u4F59\u5C42\u7EA7, proLayout \u6D88\u8D39\u65F6, \u65E0\u6CD5\u6B63\u786E\u5C55\u793A\u83DC\u5355, \u8FD9\u91CC\u5BF9\u5197\u4F59\u6570\u636E\u8FDB\u884C\u8FC7\u6EE4\u64CD\u4F5C
  var newRoutes = filterRoutes(clientRoutes.filter(function (route) {
    return route.id === 'ant-design-pro-layout';
  }), function (route) {
    return !!route.isLayout && route.id !== 'ant-design-pro-layout' || !!route.isWrapper;
  });
  var _useAccessMarkedRoute = (0,plugin_access/* useAccessMarkedRoutes */.Mf)(mapRoutes(newRoutes)),
    _useAccessMarkedRoute2 = slicedToArray_default()(_useAccessMarkedRoute, 1),
    route = _useAccessMarkedRoute2[0];
  var matchedRoute = (0,react.useMemo)(function () {
    var _matchRoutes, _matchRoutes$pop, _matchRoutes$pop$call;
    return (_matchRoutes = (0,_umi_production_exports.matchRoutes)(route.children, location.pathname)) === null || _matchRoutes === void 0 ? void 0 : (_matchRoutes$pop = _matchRoutes.pop) === null || _matchRoutes$pop === void 0 ? void 0 : (_matchRoutes$pop$call = _matchRoutes$pop.call(_matchRoutes)) === null || _matchRoutes$pop$call === void 0 ? void 0 : _matchRoutes$pop$call.route;
  }, [location.pathname]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(ProLayout, objectSpread2_default()(objectSpread2_default()({
    route: route,
    location: location,
    title: userConfig.title || 'plugin-layout',
    navTheme: "dark",
    siderWidth: 256,
    onMenuHeaderClick: function onMenuHeaderClick(e) {
      e.stopPropagation();
      e.preventDefault();
      navigate('/');
    },
    formatMessage: userConfig.formatMessage || formatMessage,
    menu: {
      locale: userConfig.locale
    },
    logo: plugin_layout_Logo,
    menuItemRender: function menuItemRender(menuItemProps, defaultDom) {
      if (menuItemProps.isUrl || menuItemProps.children) {
        return defaultDom;
      }
      if (menuItemProps.path && location.pathname !== menuItemProps.path) {
        return (
          /*#__PURE__*/
          // handle wildcard route path, for example /slave/* from qiankun
          (0,jsx_runtime.jsx)(_umi_production_exports.Link, {
            to: menuItemProps.path.replace('/*', ''),
            target: menuItemProps.target,
            children: defaultDom
          })
        );
      }
      return defaultDom;
    },
    itemRender: function itemRender(route) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(_umi_production_exports.Link, {
        to: route.path,
        children: route.breadcrumbName
      });
    },
    disableContentMargin: true,
    fixSiderbar: true,
    fixedHeader: true
  }, runtimeConfig), {}, {
    rightContentRender: runtimeConfig.rightContentRender !== false && function (layoutProps) {
      var dom = getRightRenderContent({
        runtimeConfig: runtimeConfig,
        loading: loading,
        initialState: initialState,
        setInitialState: setInitialState
      });
      if (runtimeConfig.rightContentRender) {
        return runtimeConfig.rightContentRender(layoutProps, dom, {
          // BREAK CHANGE userConfig > runtimeConfig
          userConfig: userConfig,
          runtimeConfig: runtimeConfig,
          loading: loading,
          initialState: initialState,
          setInitialState: setInitialState
        });
      }
      return dom;
    },
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(plugin_layout_Exception, {
      route: matchedRoute,
      noFound: runtimeConfig === null || runtimeConfig === void 0 ? void 0 : runtimeConfig.noFound,
      notFound: runtimeConfig === null || runtimeConfig === void 0 ? void 0 : runtimeConfig.notFound,
      unAccessible: runtimeConfig === null || runtimeConfig === void 0 ? void 0 : runtimeConfig.unAccessible,
      noAccessible: runtimeConfig === null || runtimeConfig === void 0 ? void 0 : runtimeConfig.noAccessible,
      children: runtimeConfig.childrenRender ? runtimeConfig.childrenRender( /*#__PURE__*/(0,jsx_runtime.jsx)(_umi_production_exports.Outlet, {}), props) : /*#__PURE__*/(0,jsx_runtime.jsx)(_umi_production_exports.Outlet, {})
    })
  }));
});

//# sourceURL=webpack:///./src/.umi-production/plugin-layout/Layout.tsx_+_96_modules?`)},47930:function(__unused_webpack_module,exports){eval(`var __webpack_unused_export__;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

__webpack_unused_export__ = ({
  value: true
});
exports.Bo = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
/**
 * Tokenize input string.
 */

function lexer(str) {
  var tokens = [];
  var i = 0;

  while (i < str.length) {
    var char = str[i];

    if (char === '*' || char === '+' || char === '?') {
      tokens.push({
        type: 'MODIFIER',
        index: i,
        value: str[i++]
      });
      continue;
    }

    if (char === '\\\\') {
      tokens.push({
        type: 'ESCAPED_CHAR',
        index: i++,
        value: str[i++]
      });
      continue;
    }

    if (char === '{') {
      tokens.push({
        type: 'OPEN',
        index: i,
        value: str[i++]
      });
      continue;
    }

    if (char === '}') {
      tokens.push({
        type: 'CLOSE',
        index: i,
        value: str[i++]
      });
      continue;
    }

    if (char === ':') {
      var name = '';
      var j = i + 1;

      while (j < str.length) {
        var code = str.charCodeAt(j);

        if ( // \`0-9\`
        code >= 48 && code <= 57 || // \`A-Z\`
        code >= 65 && code <= 90 || // \`a-z\`
        code >= 97 && code <= 122 || // \`_\`
        code === 95) {
          name += str[j++];
          continue;
        }

        break;
      }

      if (!name) throw new TypeError('Missing parameter name at ' + i);
      tokens.push({
        type: 'NAME',
        index: i,
        value: name
      });
      i = j;
      continue;
    }

    if (char === '(') {
      var count = 1;
      var pattern = '';
      var j = i + 1;

      if (str[j] === '?') {
        throw new TypeError('Pattern cannot start with "?" at ' + j);
      }

      while (j < str.length) {
        if (str[j] === '\\\\') {
          pattern += str[j++] + str[j++];
          continue;
        }

        if (str[j] === ')') {
          count--;

          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === '(') {
          count++;

          if (str[j + 1] !== '?') {
            throw new TypeError('Capturing groups are not allowed at ' + j);
          }
        }

        pattern += str[j++];
      }

      if (count) throw new TypeError('Unbalanced pattern at ' + i);
      if (!pattern) throw new TypeError('Missing pattern at ' + i);
      tokens.push({
        type: 'PATTERN',
        index: i,
        value: pattern
      });
      i = j;
      continue;
    }

    tokens.push({
      type: 'CHAR',
      index: i,
      value: str[i++]
    });
  }

  tokens.push({
    type: 'END',
    index: i,
    value: ''
  });
  return tokens;
}
/**
 * Parse a string for the raw tokens.
 */


function parse(str, options) {
  if (options === void 0) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  var tokens = lexer(str);
  var _a = options.prefixes,
      prefixes = _a === void 0 ? './' : _a;
  var defaultPattern = '[^' + escapeString(options.delimiter || '/#?') + ']+?';
  var result = [];
  var key = 0;
  var i = 0;
  var path = '';

  var tryConsume = function tryConsume(type) {
    if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
  };

  var mustConsume = function mustConsume(type) {
    var value = tryConsume(type);
    if (value !== undefined) return value;
    var _a = tokens[i],
        nextType = _a.type,
        index = _a.index;
    throw new TypeError('Unexpected ' + nextType + ' at ' + index + ', expected ' + type);
  };

  var consumeText = function consumeText() {
    var result = '';
    var value; // tslint:disable-next-line

    while (value = tryConsume('CHAR') || tryConsume('ESCAPED_CHAR')) {
      result += value;
    }

    return result;
  };

  while (i < tokens.length) {
    var char = tryConsume('CHAR');
    var name = tryConsume('NAME');
    var pattern = tryConsume('PATTERN');

    if (name || pattern) {
      var prefix = char || '';

      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = '';
      }

      if (path) {
        result.push(path);
        path = '';
      }

      result.push({
        name: name || key++,
        prefix: prefix,
        suffix: '',
        pattern: pattern || defaultPattern,
        modifier: tryConsume('MODIFIER') || ''
      });
      continue;
    }

    var value = char || tryConsume('ESCAPED_CHAR');

    if (value) {
      path += value;
      continue;
    }

    if (path) {
      result.push(path);
      path = '';
    }

    var open = tryConsume('OPEN');

    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume('NAME') || '';
      var pattern_1 = tryConsume('PATTERN') || '';
      var suffix = consumeText();
      mustConsume('CLOSE');
      result.push({
        name: name_1 || (pattern_1 ? key++ : ''),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix: prefix,
        suffix: suffix,
        modifier: tryConsume('MODIFIER') || ''
      });
      continue;
    }

    mustConsume('END');
  }

  return result;
}

__webpack_unused_export__ = parse;
/**
 * Compile a string to a template function for the path.
 */

function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}

__webpack_unused_export__ = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */

function tokensToFunction(tokens, options) {
  if (options === void 0) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  var reFlags = flags(options);
  var _a = options.encode,
      encode = _a === void 0 ? function (x) {
    return x;
  } : _a,
      _b = options.validate,
      validate = _b === void 0 ? true : _b; // Compile all the tokens into regexps.

  var matches = tokens.map(function (token) {
    if (_typeof(token) === 'object') {
      return new RegExp('^(?:' + token.pattern + ')$', reFlags);
    }
  });
  return function (data) {
    var path = '';

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data ? data[token.name] : undefined;
      var optional = token.modifier === '?' || token.modifier === '*';
      var repeat = token.modifier === '*' || token.modifier === '+';

      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
        }

        if (value.length === 0) {
          if (optional) continue;
          throw new TypeError('Expected "' + token.name + '" to not be empty');
        }

        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);

          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
          }

          path += token.prefix + segment + token.suffix;
        }

        continue;
      }

      if (typeof value === 'string' || typeof value === 'number') {
        var segment = encode(String(value), token);

        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
        }

        path += token.prefix + segment + token.suffix;
        continue;
      }

      if (optional) continue;
      var typeOfMessage = repeat ? 'an array' : 'a string';
      throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
    }

    return path;
  };
}

__webpack_unused_export__ = tokensToFunction;
/**
 * Create path match function from \`path-to-regexp\` spec.
 */

function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}

__webpack_unused_export__ = match;
/**
 * Create a path match function from \`path-to-regexp\` output.
 */

function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  var _a = options.decode,
      decode = _a === void 0 ? function (x) {
    return x;
  } : _a;
  return function (pathname) {
    var m = re.exec(pathname);
    if (!m) return false;
    var path = m[0],
        index = m.index;
    var params = Object.create(null);

    var _loop_1 = function _loop_1(i) {
      // tslint:disable-next-line
      if (m[i] === undefined) return 'continue';
      var key = keys[i - 1];

      if (key.modifier === '*' || key.modifier === '+') {
        params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i], key);
      }
    };

    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }

    return {
      path: path,
      index: index,
      params: params
    };
  };
}

__webpack_unused_export__ = regexpToFunction;
/**
 * Escape a regular expression string.
 */

function escapeString(str) {
  return str.replace(/([.+*?=^!:\${}()[\\]|/\\\\])/g, '\\\\$1');
}
/**
 * Get the flags for a regexp from the options.
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 */


function regexpToRegexp(path, keys) {
  if (!keys) return path; // Use a negative lookahead to match only capturing groups.

  var groups = path.source.match(/\\((?!\\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: '',
        suffix: '',
        modifier: '',
        pattern: ''
      });
    }
  }

  return path;
}
/**
 * Transform an array into a regexp.
 */


function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function (path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp('(?:' + parts.join('|') + ')', flags(options));
}
/**
 * Create a path regexp from string input.
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */


function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  var _a = options.strict,
      strict = _a === void 0 ? false : _a,
      _b = options.start,
      start = _b === void 0 ? true : _b,
      _c = options.end,
      end = _c === void 0 ? true : _c,
      _d = options.encode,
      encode = _d === void 0 ? function (x) {
    return x;
  } : _d;
  var endsWith = '[' + escapeString(options.endsWith || '') + ']|$';
  var delimiter = '[' + escapeString(options.delimiter || '/#?') + ']';
  var route = start ? '^' : ''; // Iterate over the tokens and create our regexp string.

  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];

    if (typeof token === 'string') {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));

      if (token.pattern) {
        if (keys) keys.push(token);

        if (prefix || suffix) {
          if (token.modifier === '+' || token.modifier === '*') {
            var mod = token.modifier === '*' ? '?' : '';
            route += '(?:' + prefix + '((?:' + token.pattern + ')(?:' + suffix + prefix + '(?:' + token.pattern + '))*)' + suffix + ')' + mod;
          } else {
            route += '(?:' + prefix + '(' + token.pattern + ')' + suffix + ')' + token.modifier;
          }
        } else {
          route += '(' + token.pattern + ')' + token.modifier;
        }
      } else {
        route += '(?:' + prefix + suffix + ')' + token.modifier;
      }
    }
  }

  if (end) {
    if (!strict) route += delimiter + '?';
    route += !options.endsWith ? '$' : '(?=' + endsWith + ')';
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === 'string' ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : // tslint:disable-next-line
    endToken === undefined;

    if (!strict) {
      route += '(?:' + delimiter + '(?=' + endsWith + '))?';
    }

    if (!isEndDelimited) {
      route += '(?=' + delimiter + '|' + endsWith + ')';
    }
  }

  return new RegExp(route, flags(options));
}

__webpack_unused_export__ = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using \`/user/:id\`, \`keys\` will
 * contain \`[{ name: 'id', delimiter: '/', optional: false, repeat: false }]\`.
 */

function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) return regexpToRegexp(path, keys);
  if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

exports.Bo = pathToRegexp;

//# sourceURL=webpack:///./node_modules/@umijs/route-utils/es/path-to-regexp.js?`)},18545:function(__unused_webpack_module,exports,__webpack_require__){"use strict";eval(`

var _interopRequireWildcard = (__webpack_require__(75263)["default"]);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = useEvent;
var React = _interopRequireWildcard(__webpack_require__(67294));
function useEvent(callback) {
  var fnRef = React.useRef();
  fnRef.current = callback;
  var memoFn = React.useCallback(function () {
    var _fnRef$current;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (_fnRef$current = fnRef.current) === null || _fnRef$current === void 0 ? void 0 : _fnRef$current.call.apply(_fnRef$current, [fnRef].concat(args));
  }, []);
  return memoFn;
}

//# sourceURL=webpack:///./node_modules/rc-util/lib/hooks/useEvent.js?`)},82546:function(__unused_webpack_module,exports,__webpack_require__){"use strict";eval(`

var _interopRequireDefault = (__webpack_require__(64836)["default"]);
var _interopRequireWildcard = (__webpack_require__(75263)["default"]);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useLayoutUpdateEffect = exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(67294));
var _canUseDom = _interopRequireDefault(__webpack_require__(19158));
/**
 * Wrap \`React.useLayoutEffect\` which will not throw warning message in test env
 */
var useLayoutEffect =  true && (0, _canUseDom.default)() ? React.useLayoutEffect : React.useEffect;
var _default = useLayoutEffect;
exports["default"] = _default;
var useLayoutUpdateEffect = function useLayoutUpdateEffect(callback, deps) {
  var firstMountRef = React.useRef(true);
  useLayoutEffect(function () {
    if (!firstMountRef.current) {
      return callback();
    }
  }, deps);
  // We tell react that first mount has passed
  useLayoutEffect(function () {
    firstMountRef.current = false;
    return function () {
      firstMountRef.current = true;
    };
  }, []);
};
exports.useLayoutUpdateEffect = useLayoutUpdateEffect;

//# sourceURL=webpack:///./node_modules/rc-util/lib/hooks/useLayoutEffect.js?`)},60869:function(__unused_webpack_module,exports,__webpack_require__){"use strict";eval(`var __webpack_unused_export__;


var _interopRequireDefault = (__webpack_require__(64836)["default"]);
__webpack_unused_export__ = ({
  value: true
});
exports.Z = useMergedState;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(27424));
var _useEvent = _interopRequireDefault(__webpack_require__(18545));
var _useLayoutEffect = __webpack_require__(82546);
var _useState5 = _interopRequireDefault(__webpack_require__(78423));
/** We only think \`undefined\` is empty */
function hasValue(value) {
  return value !== undefined;
}
/**
 * Similar to \`useState\` but will use props value if provided.
 * Note that internal use rc-util \`useState\` hook.
 */
function useMergedState(defaultStateValue, option) {
  var _ref = option || {},
    defaultValue = _ref.defaultValue,
    value = _ref.value,
    onChange = _ref.onChange,
    postState = _ref.postState;
  // ======================= Init =======================
  var _useState = (0, _useState5.default)(function () {
      if (hasValue(value)) {
        return value;
      } else if (hasValue(defaultValue)) {
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      } else {
        return typeof defaultStateValue === 'function' ? defaultStateValue() : defaultStateValue;
      }
    }),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    innerValue = _useState2[0],
    setInnerValue = _useState2[1];
  var mergedValue = value !== undefined ? value : innerValue;
  var postMergedValue = postState ? postState(mergedValue) : mergedValue;
  // ====================== Change ======================
  var onChangeFn = (0, _useEvent.default)(onChange);
  var _useState3 = (0, _useState5.default)([mergedValue]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    prevValue = _useState4[0],
    setPrevValue = _useState4[1];
  (0, _useLayoutEffect.useLayoutUpdateEffect)(function () {
    var prev = prevValue[0];
    if (innerValue !== prev) {
      onChangeFn(innerValue, prev);
    }
  }, [prevValue]);
  // Sync value back to \`undefined\` when it from control to un-control
  (0, _useLayoutEffect.useLayoutUpdateEffect)(function () {
    if (!hasValue(value)) {
      setInnerValue(value);
    }
  }, [value]);
  // ====================== Update ======================
  var triggerChange = (0, _useEvent.default)(function (updater, ignoreDestroy) {
    setInnerValue(updater, ignoreDestroy);
    setPrevValue([mergedValue], ignoreDestroy);
  });
  return [postMergedValue, triggerChange];
}

//# sourceURL=webpack:///./node_modules/rc-util/lib/hooks/useMergedState.js?`)},78423:function(__unused_webpack_module,exports,__webpack_require__){"use strict";eval(`

var _interopRequireWildcard = (__webpack_require__(75263)["default"]);
var _interopRequireDefault = (__webpack_require__(64836)["default"]);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = useSafeState;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(27424));
var React = _interopRequireWildcard(__webpack_require__(67294));
/**
 * Same as React.useState but \`setState\` accept \`ignoreDestroy\` param to not to setState after destroyed.
 * We do not make this auto is to avoid real memory leak.
 * Developer should confirm it's safe to ignore themselves.
 */
function useSafeState(defaultValue) {
  var destroyRef = React.useRef(false);
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  React.useEffect(function () {
    destroyRef.current = false;
    return function () {
      destroyRef.current = true;
    };
  }, []);
  function safeSetState(updater, ignoreDestroy) {
    if (ignoreDestroy && destroyRef.current) {
      return;
    }
    setValue(updater);
  }
  return [value, safeSetState];
}

//# sourceURL=webpack:///./node_modules/rc-util/lib/hooks/useState.js?`)},74704:function(module,__unused_webpack_exports,__webpack_require__){eval(`var unsupportedIterableToArray = __webpack_require__(86116);
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
module.exports = _createForOfIteratorHelper, module.exports.__esModule = true, module.exports["default"] = module.exports;

//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createForOfIteratorHelper.js?`)},75263:function(module,__unused_webpack_exports,__webpack_require__){eval(`var _typeof = (__webpack_require__(18698)["default"]);
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
module.exports = _interopRequireWildcard, module.exports.__esModule = true, module.exports["default"] = module.exports;

//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/interopRequireWildcard.js?`)}}]);
