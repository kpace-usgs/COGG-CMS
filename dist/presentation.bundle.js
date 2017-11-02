/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	(function(){
	  "use strict";
	
	  // include index.html for webpack to load
	  __webpack_require__(52);
	
	  var Reveal = __webpack_require__(74);
	  __webpack_require__(83);
	  // uncomment theme you want to load below
	  __webpack_require__(84);
	
	
	  Reveal.initialize({
	    history: true,
	    keyboard: true,
	    touch: true,
	    transitionSpeed: 'fast',
	    transition: 'convex',
	    mouseWheel: true
	    // More info https://github.com/hakimel/reveal.js#dependencies
	   /* dependencies: [
	      { src: 'plugin/markdown/marked.js' },
	      { src: 'plugin/markdown/markdown.js' },
	      { src: 'plugin/notes/notes.js', async: true },
	      { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
	    ]*/
	  });
	
	
	  /* use elemeno api */
	
	  var Elemeno = __webpack_require__(51);
	
	  var elemeno = new Elemeno(("0c3a750c-bd91-11e7-aec2-57121200e9e9"));
	
	  // define the element where content will be inserted
	  var cmselement = document.getElementById('elemeno');
	
	  function getElemeno() {
	    console.log('get element')
	    elemeno.getCollectionItem('publications', 'kylie-test-publication', function(err, response) {
	        console.log(err, response);
	        cmselement.removeChild(document.getElementById('elemenoP'))
	        
	        cmselement.insertAdjacentHTML('afterbegin', '<h3>'+response.data.title+'</h3>');
	        cmselement.insertAdjacentHTML('beforeend', response.data.content.content.html)
	    });
	  };
	
	// listen for when that element is loaded
	  Reveal.addEventListener('slidechanged', function(event) {
	    console.log(event.indexh);
	    if(event.indexh === 4) {
	      getElemeno();
	    }
	  });
	
	
	})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(37)
	var ieee754 = __webpack_require__(53)
	var isArray = __webpack_require__(27)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(8);
	/*</replacement>*/
	
	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var util = __webpack_require__(6);
	util.inherits = __webpack_require__(2);
	/*</replacement>*/
	
	var Readable = __webpack_require__(28);
	var Writable = __webpack_require__(16);
	
	util.inherits(Duplex, Readable);
	
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false) this.readable = false;
	
	  if (options && options.writable === false) this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  processNextTick(onEndNT, this);
	}
	
	function onEndNT(self) {
	  self.end();
	}
	
	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  get: function () {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    }
	
	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	
	Duplex.prototype._destroy = function (err, cb) {
	  this.push(null);
	  this.end();
	
	  processNextTick(cb, err);
	};
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var asap = __webpack_require__(18);
	
	function noop() {}
	
	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable
	
	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.
	
	
	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	
	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	
	module.exports = Promise;
	
	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('Promise constructor\'s argument is not a function');
	  }
	  this._40 = 0;
	  this._65 = 0;
	  this._55 = null;
	  this._72 = null;
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._37 = null;
	Promise._87 = null;
	Promise._61 = noop;
	
	Promise.prototype.then = function(onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};
	
	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	}
	function handle(self, deferred) {
	  while (self._65 === 3) {
	    self = self._55;
	  }
	  if (Promise._37) {
	    Promise._37(self);
	  }
	  if (self._65 === 0) {
	    if (self._40 === 0) {
	      self._40 = 1;
	      self._72 = deferred;
	      return;
	    }
	    if (self._40 === 1) {
	      self._40 = 2;
	      self._72 = [self._72, deferred];
	      return;
	    }
	    self._72.push(deferred);
	    return;
	  }
	  handleResolved(self, deferred);
	}
	
	function handleResolved(self, deferred) {
	  asap(function() {
	    var cb = self._65 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._65 === 1) {
	        resolve(deferred.promise, self._55);
	      } else {
	        reject(deferred.promise, self._55);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._55);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(
	      self,
	      new TypeError('A promise cannot be resolved with itself.')
	    );
	  }
	  if (
	    newValue &&
	    (typeof newValue === 'object' || typeof newValue === 'function')
	  ) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (
	      then === self.then &&
	      newValue instanceof Promise
	    ) {
	      self._65 = 3;
	      self._55 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._65 = 1;
	  self._55 = newValue;
	  finale(self);
	}
	
	function reject(self, newValue) {
	  self._65 = 2;
	  self._55 = newValue;
	  if (Promise._87) {
	    Promise._87(self, newValue);
	  }
	  finale(self);
	}
	function finale(self) {
	  if (self._40 === 1) {
	    handle(self, self._72);
	    self._72 = null;
	  }
	  if (self._40 === 2) {
	    for (var i = 0; i < self._72.length; i++) {
	      handle(self, self._72[i]);
	    }
	    self._72 = null;
	  }
	}
	
	function Handler(onFulfilled, onRejected, promise){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}
	
	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  });
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	
	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = Buffer.isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = xor;
	function xor(a, b) {
	  var len = Math.min(a.length, b.length);
	  var out = new Buffer(len);
	  var i = -1;
	  while (++i < len) {
	    out.writeUInt8(a[i] ^ b[i], i);
	  }
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (!process.version ||
	    process.version.indexOf('v0.') === 0 ||
	    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = nextTick;
	} else {
	  module.exports = process.nextTick;
	}
	
	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	  case 0:
	  case 1:
	    return process.nextTick(fn);
	  case 2:
	    return process.nextTick(function afterTickOne() {
	      fn.call(null, arg1);
	    });
	  case 3:
	    return process.nextTick(function afterTickTwo() {
	      fn.call(null, arg1, arg2);
	    });
	  case 4:
	    return process.nextTick(function afterTickThree() {
	      fn.call(null, arg1, arg2, arg3);
	    });
	  default:
	    args = new Array(len - 1);
	    i = 0;
	    while (i < args.length) {
	      args[i++] = arguments[i];
	    }
	    return process.nextTick(function afterTick() {
	      fn.apply(null, args);
	    });
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable node/no-deprecated-api */
	var buffer = __webpack_require__(1)
	var Buffer = buffer.Buffer
	
	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key]
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports)
	  exports.Buffer = SafeBuffer
	}
	
	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}
	
	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer)
	
	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	}
	
	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size)
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding)
	    } else {
	      buf.fill(fill)
	    }
	  } else {
	    buf.fill(0)
	  }
	  return buf
	}
	
	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	}
	
	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(93);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(92);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var uint_max = Math.pow(2, 32);
	function fixup_uint32(x) {
	    var ret, x_pos;
	    ret = x > uint_max || x < 0 ? (x_pos = Math.abs(x) % uint_max, x < 0 ? uint_max - x_pos : x_pos) : x;
	    return ret;
	}
	function scrub_vec(v) {
	  var i, _i, _ref;
	  for (i = _i = 0, _ref = v.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	    v[i] = 0;
	  }
	  return false;
	}
	
	function Global() {
	  var i;
	  this.SBOX = [];
	  this.INV_SBOX = [];
	  this.SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.INV_SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.init();
	  this.RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
	}
	
	Global.prototype.init = function() {
	  var d, i, sx, t, x, x2, x4, x8, xi, _i;
	  d = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 256; i = ++_i) {
	      if (i < 128) {
	        _results.push(i << 1);
	      } else {
	        _results.push((i << 1) ^ 0x11b);
	      }
	    }
	    return _results;
	  })();
	  x = 0;
	  xi = 0;
	  for (i = _i = 0; _i < 256; i = ++_i) {
	    sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	    this.SBOX[x] = sx;
	    this.INV_SBOX[sx] = x;
	    x2 = d[x];
	    x4 = d[x2];
	    x8 = d[x4];
	    t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	    this.SUB_MIX[0][x] = (t << 24) | (t >>> 8);
	    this.SUB_MIX[1][x] = (t << 16) | (t >>> 16);
	    this.SUB_MIX[2][x] = (t << 8) | (t >>> 24);
	    this.SUB_MIX[3][x] = t;
	    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	    this.INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8);
	    this.INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16);
	    this.INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24);
	    this.INV_SUB_MIX[3][sx] = t;
	    if (x === 0) {
	      x = xi = 1;
	    } else {
	      x = x2 ^ d[d[d[x8 ^ x2]]];
	      xi ^= d[d[xi]];
	    }
	  }
	  return true;
	};
	
	var G = new Global();
	
	
	AES.blockSize = 4 * 4;
	
	AES.prototype.blockSize = AES.blockSize;
	
	AES.keySize = 256 / 8;
	
	AES.prototype.keySize = AES.keySize;
	
	AES.ivSize = AES.blockSize;
	
	AES.prototype.ivSize = AES.ivSize;
	
	 function bufferToArray(buf) {
	  var len = buf.length/4;
	  var out = new Array(len);
	  var i = -1;
	  while (++i < len) {
	    out[i] = buf.readUInt32BE(i * 4);
	  }
	  return out;
	 }
	function AES(key) {
	  this._key = bufferToArray(key);
	  this._doReset();
	}
	
	AES.prototype._doReset = function() {
	  var invKsRow, keySize, keyWords, ksRow, ksRows, t, _i, _j;
	  keyWords = this._key;
	  keySize = keyWords.length;
	  this._nRounds = keySize + 6;
	  ksRows = (this._nRounds + 1) * 4;
	  this._keySchedule = [];
	  for (ksRow = _i = 0; 0 <= ksRows ? _i < ksRows : _i > ksRows; ksRow = 0 <= ksRows ? ++_i : --_i) {
	    this._keySchedule[ksRow] = ksRow < keySize ? keyWords[ksRow] : (t = this._keySchedule[ksRow - 1], (ksRow % keySize) === 0 ? (t = (t << 8) | (t >>> 24), t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff], t ^= G.RCON[(ksRow / keySize) | 0] << 24) : keySize > 6 && ksRow % keySize === 4 ? t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff] : void 0, this._keySchedule[ksRow - keySize] ^ t);
	  }
	  this._invKeySchedule = [];
	  for (invKsRow = _j = 0; 0 <= ksRows ? _j < ksRows : _j > ksRows; invKsRow = 0 <= ksRows ? ++_j : --_j) {
	    ksRow = ksRows - invKsRow;
	    t = this._keySchedule[ksRow - (invKsRow % 4 ? 0 : 4)];
	    this._invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : G.INV_SUB_MIX[0][G.SBOX[t >>> 24]] ^ G.INV_SUB_MIX[1][G.SBOX[(t >>> 16) & 0xff]] ^ G.INV_SUB_MIX[2][G.SBOX[(t >>> 8) & 0xff]] ^ G.INV_SUB_MIX[3][G.SBOX[t & 0xff]];
	  }
	  return true;
	};
	
	AES.prototype.encryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var out = this._doCryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[1], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[3], 12);
	  return buf;
	};
	
	AES.prototype.decryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var temp = [M[3], M[1]];
	  M[1] = temp[0];
	  M[3] = temp[1];
	  var out = this._doCryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[3], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[1], 12);
	  return buf;
	};
	
	AES.prototype.scrub = function() {
	  scrub_vec(this._keySchedule);
	  scrub_vec(this._invKeySchedule);
	  scrub_vec(this._key);
	};
	
	AES.prototype._doCryptBlock = function(M, keySchedule, SUB_MIX, SBOX) {
	  var ksRow, round, s0, s1, s2, s3, t0, t1, t2, t3, _i, _ref;
	
	  s0 = M[0] ^ keySchedule[0];
	  s1 = M[1] ^ keySchedule[1];
	  s2 = M[2] ^ keySchedule[2];
	  s3 = M[3] ^ keySchedule[3];
	  ksRow = 4;
	  for (round = _i = 1, _ref = this._nRounds; 1 <= _ref ? _i < _ref : _i > _ref; round = 1 <= _ref ? ++_i : --_i) {
	    t0 = SUB_MIX[0][s0 >>> 24] ^ SUB_MIX[1][(s1 >>> 16) & 0xff] ^ SUB_MIX[2][(s2 >>> 8) & 0xff] ^ SUB_MIX[3][s3 & 0xff] ^ keySchedule[ksRow++];
	    t1 = SUB_MIX[0][s1 >>> 24] ^ SUB_MIX[1][(s2 >>> 16) & 0xff] ^ SUB_MIX[2][(s3 >>> 8) & 0xff] ^ SUB_MIX[3][s0 & 0xff] ^ keySchedule[ksRow++];
	    t2 = SUB_MIX[0][s2 >>> 24] ^ SUB_MIX[1][(s3 >>> 16) & 0xff] ^ SUB_MIX[2][(s0 >>> 8) & 0xff] ^ SUB_MIX[3][s1 & 0xff] ^ keySchedule[ksRow++];
	    t3 = SUB_MIX[0][s3 >>> 24] ^ SUB_MIX[1][(s0 >>> 16) & 0xff] ^ SUB_MIX[2][(s1 >>> 8) & 0xff] ^ SUB_MIX[3][s2 & 0xff] ^ keySchedule[ksRow++];
	    s0 = t0;
	    s1 = t1;
	    s2 = t2;
	    s3 = t3;
	  }
	  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
	  return [
	    fixup_uint32(t0),
	    fixup_uint32(t1),
	    fixup_uint32(t2),
	    fixup_uint32(t3)
	  ];
	
	};
	
	
	
	
	  exports.AES = AES;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var Transform = __webpack_require__(82).Transform;
	var inherits = __webpack_require__(2);
	
	module.exports = CipherBase;
	inherits(CipherBase, Transform);
	function CipherBase() {
	  Transform.call(this);
	}
	CipherBase.prototype.update = function (data, inputEnd, outputEnc) {
	  this.write(data, inputEnd);
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	CipherBase.prototype.final = function (outputEnc) {
	  this.end();
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	exports['aes-128-ecb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-192-ecb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-256-ecb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-128-cbc'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-192-cbc'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-256-cbc'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes128'] = exports['aes-128-cbc'];
	exports['aes192'] = exports['aes-192-cbc'];
	exports['aes256'] = exports['aes-256-cbc'];
	exports['aes-128-cfb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-192-cfb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-256-cfb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-128-ofb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-192-ofb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-256-ofb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-128-ctr'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-192-ctr'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-256-ctr'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.
	
	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(8);
	/*</replacement>*/
	
	module.exports = Writable;
	
	/* <replacement> */
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}
	
	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	
	  this.next = null;
	  this.entry = null;
	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */
	
	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	/*<replacement>*/
	var util = __webpack_require__(6);
	util.inherits = __webpack_require__(2);
	/*</replacement>*/
	
	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(91)
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream = __webpack_require__(31);
	/*</replacement>*/
	
	/*<replacement>*/
	var Buffer = __webpack_require__(9).Buffer;
	var OurUint8Array = global.Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*</replacement>*/
	
	var destroyImpl = __webpack_require__(30);
	
	util.inherits(Writable, Stream);
	
	function nop() {}
	
	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(3);
	
	  options = options || {};
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = Math.floor(this.highWaterMark);
	
	  // if _final has been called
	  this.finalCalled = false;
	
	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // has it been destroyed
	  this.destroyed = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	
	  // count buffered requests
	  this.bufferedRequestCount = 0;
	
	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	
	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	
	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})();
	
	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function (object) {
	      if (realHasInstance.call(this, object)) return true;
	
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function (object) {
	    return object instanceof this;
	  };
	}
	
	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(3);
	
	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
	    return new Writable(options);
	  }
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	
	    if (typeof options.writev === 'function') this._writev = options.writev;
	
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	
	    if (typeof options.final === 'function') this._final = options.final;
	  }
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};
	
	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  processNextTick(cb, er);
	}
	
	// Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    processNextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  var isBuf = _isUint8Array(chunk) && !state.objectMode;
	
	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }
	
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	
	  if (typeof cb !== 'function') cb = nop;
	
	  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function () {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);
	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	
	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    processNextTick(cb, er);
	    // this can emit finish, and it will always happen
	    // after error
	    processNextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    stream.emit('error', er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    stream.emit('error', er);
	    // this can emit finish, but finish must
	    // always follow error
	    finishMaybe(stream, state);
	  }
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);
	
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	
	    var count = 0;
	    var allBuffers = true;
	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }
	    buffer.allBuffers = allBuffers;
	
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);
	
	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	
	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('_write() is not implemented'));
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};
	
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;
	    if (err) {
	      stream.emit('error', err);
	    }
	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}
	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function') {
	      state.pendingcb++;
	      state.finalCalled = true;
	      processNextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    prefinish(stream, state);
	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');
	    }
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}
	
	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;
	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  }
	  if (state.corkedRequestsFree) {
	    state.corkedRequestsFree.next = corkReq;
	  } else {
	    state.corkedRequestsFree = corkReq;
	  }
	}
	
	Object.defineProperty(Writable.prototype, 'destroyed', {
	  get: function () {
	    if (this._writableState === undefined) {
	      return false;
	    }
	    return this._writableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    }
	
	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._writableState.destroyed = value;
	  }
	});
	
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;
	Writable.prototype._destroy = function (err, cb) {
	  this.end();
	  cb(err);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(88).setImmediate, (function() { return this; }())))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28);
	exports.Stream = exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(16);
	exports.Duplex = __webpack_require__(3);
	exports.Transform = __webpack_require__(29);
	exports.PassThrough = __webpack_require__(68);


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}
	
	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;
	
	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}
	
	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593
	
	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` or `self` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	
	/* globals self */
	var scope = typeof global !== "undefined" ? global : self;
	var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
	
	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);
	
	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.
	
	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396
	
	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}
	
	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;
	
	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}
	
	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html
	
	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.
	
	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }
	
	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.
	
	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }
	
	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.
	
	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.
	
	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);
	
	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}
	
	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
	
	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = function (crypto, password, keyLen, ivLen) {
	  keyLen = keyLen/8;
	  ivLen = ivLen || 0;
	  var ki = 0;
	  var ii = 0;
	  var key = new Buffer(keyLen);
	  var iv = new Buffer(ivLen);
	  var addmd = 0;
	  var md, md_buf;
	  var i;
	  while (true) {
	    md = crypto.createHash('md5');
	    if(addmd++ > 0) {
	       md.update(md_buf);
	    }
	    md.update(password);
	    md_buf = md.digest();
	    i = 0;
	    if(keyLen > 0) {
	      while(true) {
	        if(keyLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	        key[ki++] = md_buf[i];
	        keyLen--;
	        i++;
	       }
	    }
	    if(ivLen > 0 && i !== md_buf.length) {
	      while(true) {
	        if(ivLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	       iv[ii++] = md_buf[i];
	       ivLen--;
	       i++;
	     }
	   }
	   if(keyLen === 0 && ivLen === 0) {
	      break;
	    }
	  }
	  for(i=0;i<md_buf.length;i++) {
	    md_buf[i] = 0;
	  }
	  return {
	    key: key,
	    iv: iv
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var xor = __webpack_require__(7);
	exports.encrypt = function (self, block) {
	  var data = xor(block, self._prev);
	  self._prev = self._cipher.encryptBlock(data);
	  return self._prev;
	};
	exports.decrypt = function (self, block) {
	  var pad = self._prev;
	  self._prev = block;
	  var out = self._cipher.decryptBlock(block);
	  return xor(out, pad);
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(7);
	exports.encrypt = function (self, data, decrypt) {
	  var out = new Buffer('');
	  var len;
	  while (data.length) {
	    if (self._cache.length === 0) {
	      self._cache = self._cipher.encryptBlock(self._prev);
	      self._prev = new Buffer('');
	    }
	    if (self._cache.length <= data.length) {
	      len = self._cache.length;
	      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)]);
	      data = data.slice(len);
	    } else {
	      out = Buffer.concat([out, encryptStart(self, data, decrypt)]);
	      break;
	    }
	  }
	  return out;
	};
	function encryptStart(self, data, decrypt) {
	  var len = data.length;
	  var out = xor(data, self._cache);
	  self._cache = self._cache.slice(len);
	  self._prev = Buffer.concat([self._prev, decrypt?data:out]);
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(7);
	function getBlock(self) {
	  var out = self._cipher.encryptBlock(self._prev);
	  incr32(self._prev);
	  return out;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	function incr32(iv) {
	  var len = iv.length;
	  var item;
	  while (len--) {
	    item = iv.readUInt8(len);
	    if (item === 255) {
	      iv.writeUInt8(0, len);
	    } else {
	      item++;
	      iv.writeUInt8(item, len);
	      break;
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	exports.encrypt = function (self, block) {
	  return self._cipher.encryptBlock(block);
	};
	exports.decrypt = function (self, block) {
	  return self._cipher.decryptBlock(block);
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(7);
	function getBlock(self) {
	  self._prev = self._cipher.encryptBlock(self._prev);
	  return self._prev;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(11);
	var Transform = __webpack_require__(12);
	var inherits = __webpack_require__(2);
	
	inherits(StreamCipher, Transform);
	module.exports = StreamCipher;
	function StreamCipher(mode, key, iv, decrypt) {
	  if (!(this instanceof StreamCipher)) {
	    return new StreamCipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  this._cache = new Buffer('');
	  this._secCache = new Buffer('');
	  this._decrypt = decrypt;
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	StreamCipher.prototype._transform = function (chunk, _, next) {
	  next(null, this._mode.encrypt(this, chunk, this._decrypt));
	};
	StreamCipher.prototype._flush = function (next) {
	  this._cipher.scrub();
	  next();
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(78)
	
	var md5 = toConstructor(__webpack_require__(45))
	var rmd160 = toConstructor(__webpack_require__(75))
	
	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}
	
	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(8);
	/*</replacement>*/
	
	module.exports = Readable;
	
	/*<replacement>*/
	var isArray = __webpack_require__(27);
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	/*<replacement>*/
	var EE = __webpack_require__(15).EventEmitter;
	
	var EElistenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream = __webpack_require__(31);
	/*</replacement>*/
	
	// TODO(bmeurer): Change this back to const once hole checks are
	// properly optimized away early in Ignition+TurboFan.
	/*<replacement>*/
	var Buffer = __webpack_require__(9).Buffer;
	var OurUint8Array = global.Uint8Array || function () {};
	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}
	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*</replacement>*/
	
	/*<replacement>*/
	var util = __webpack_require__(6);
	util.inherits = __webpack_require__(2);
	/*</replacement>*/
	
	/*<replacement>*/
	var debugUtil = __webpack_require__(96);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	var BufferList = __webpack_require__(69);
	var destroyImpl = __webpack_require__(30);
	var StringDecoder;
	
	util.inherits(Readable, Stream);
	
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];
	
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	
	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(3);
	
	  options = options || {};
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = Math.floor(this.highWaterMark);
	
	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	
	  // has it been destroyed
	  this.destroyed = false;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(32).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(3);
	
	  if (!(this instanceof Readable)) return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }
	
	  Stream.call(this);
	}
	
	Object.defineProperty(Readable.prototype, 'destroyed', {
	  get: function () {
	    if (this._readableState === undefined) {
	      return false;
	    }
	    return this._readableState.destroyed;
	  },
	  set: function (value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    }
	
	    // backward compatibility, the user is explicitly
	    // managing destroyed
	    this._readableState.destroyed = value;
	  }
	});
	
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;
	Readable.prototype._destroy = function (err, cb) {
	  this.push(null);
	  cb(err);
	};
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;
	
	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;
	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }
	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }
	
	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};
	
	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  var state = stream._readableState;
	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
	    if (er) {
	      stream.emit('error', er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }
	
	      if (addToFront) {
	        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        stream.emit('error', new Error('stream.push() after EOF'));
	      } else {
	        state.reading = false;
	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	    }
	  }
	
	  return needMoreData(state);
	}
	
	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    stream.emit('data', chunk);
	    stream.read(0);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	
	    if (state.needReadable) emitReadable(stream);
	  }
	  maybeReadMore(stream, state);
	}
	
	function chunkInvalid(state, chunk) {
	  var er;
	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(32).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}
	
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (n !== 0) state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	
	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }
	
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;
	
	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	
	  if (ret !== null) this.emit('data', ret);
	
	  return ret;
	};
	
	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    processNextTick(maybeReadMore_, stream, state);
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('_read() is not implemented'));
	};
	
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');
	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	
	    cleanedUp = true;
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }
	
	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	
	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = { hasUnpiped: false };
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	
	    if (!dest) dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, unpipeInfo);
	    }return this;
	  }
	
	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this, unpipeInfo);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        processNextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    processNextTick(resume_, stream, state);
	  }
	}
	
	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }
	
	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);
	
	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }
	
	  // proxy certain important events.
	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
	  }
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }
	
	  return ret;
	}
	
	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}
	
	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    processNextTick(endReadableNT, state, stream);
	  }
	}
	
	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	'use strict';
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(3);
	
	/*<replacement>*/
	var util = __webpack_require__(6);
	util.inherits = __webpack_require__(2);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb) {
	    return stream.emit('error', new Error('write callback called multiple times'));
	  }
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(this);
	
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }
	
	  // When the writable side finishes, then flush out anything remaining.
	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er, data) {
	      done(stream, er, data);
	    });else done(stream);
	  });
	}
	
	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('_transform() is not implemented');
	};
	
	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;
	
	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	Transform.prototype._destroy = function (err, cb) {
	  var _this = this;
	
	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	    _this.emit('close');
	  });
	};
	
	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
	
	  if (ts.transforming) throw new Error('Calling transform done when still transforming');
	
	  return stream.push(null);
	}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*<replacement>*/
	
	var processNextTick = __webpack_require__(8);
	/*</replacement>*/
	
	// undocumented cb() API, needed for core, not for public API
	function destroy(err, cb) {
	  var _this = this;
	
	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;
	
	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
	      processNextTick(emitErrorNT, this, err);
	    }
	    return;
	  }
	
	  // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks
	
	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  }
	
	  // if this is a duplex stream mark the writable part as destroyed as well
	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }
	
	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      processNextTick(emitErrorNT, _this, err);
	      if (_this._writableState) {
	        _this._writableState.errorEmitted = true;
	      }
	    } else if (cb) {
	      cb(err);
	    }
	  });
	}
	
	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }
	
	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}
	
	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}
	
	module.exports = {
	  destroy: destroy,
	  undestroy: undestroy
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).EventEmitter;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Buffer = __webpack_require__(9).Buffer;
	
	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};
	
	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	};
	
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}
	
	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};
	
	StringDecoder.prototype.end = utf8End;
	
	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;
	
	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};
	
	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return -1;
	}
	
	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}
	
	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd'.repeat(p);
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd'.repeat(p + 1);
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd'.repeat(p + 2);
	      }
	    }
	  }
	}
	
	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf, p);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}
	
	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}
	
	// For UTF-8, a replacement character for each buffered byte of a (partial)
	// character needs to be added to the output.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
	  return r;
	}
	
	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}
	
	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}
	
	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}
	
	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}
	
	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}
	
	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}
	
	module.exports = isObject;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = "data:application/vnd.ms-fontobject;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICI5OTAwYTQ2NDNjYzYzYzVkOGY5NjlkMjE5NmY3MjU3Mi5lb3QiOw=="

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(18);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);
	
	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}
	
	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}
	
	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}
	
	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return (b64.length * 3 / 4) - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr((len * 3 / 4) - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0; i < l; i += 4) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(11);
	var Transform = __webpack_require__(12);
	var inherits = __webpack_require__(2);
	var modes = __webpack_require__(13);
	var StreamCipher = __webpack_require__(25);
	var ebtk = __webpack_require__(19);
	
	inherits(Decipher, Transform);
	function Decipher(mode, key, iv) {
	  if (!(this instanceof Decipher)) {
	    return new Decipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._last = void 0;
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Decipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.decrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Decipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  if (!chunk) {
	    return next;
	  }
	
	  this.push(unpad(this._mode.decrypt(this, chunk)));
	
	  next();
	};
	
	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};
	
	Splitter.prototype.get = function () {
	  if (this.cache.length > 16) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  if (this.cache.length) {
	    return this.cache;
	  }
	};
	function unpad(last) {
	  var padded = last[15];
	  if (padded === 16) {
	    return;
	  }
	  return last.slice(0, 16 - padded);
	}
	
	var modelist = {
	  ECB: __webpack_require__(23),
	  CBC: __webpack_require__(20),
	  CFB: __webpack_require__(21),
	  OFB: __webpack_require__(24),
	  CTR: __webpack_require__(22)
	};
	
	module.exports = function (crypto) {
	  function createDecipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv, true);
	    }
	    return new Decipher(modelist[config.mode], password, iv);
	  }
	
	  function createDecipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createDecipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createDecipher: createDecipher,
	    createDecipheriv: createDecipheriv
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(11);
	var Transform = __webpack_require__(12);
	var inherits = __webpack_require__(2);
	var modes = __webpack_require__(13);
	var ebtk = __webpack_require__(19);
	var StreamCipher = __webpack_require__(25);
	inherits(Cipher, Transform);
	function Cipher(mode, key, iv) {
	  if (!(this instanceof Cipher)) {
	    return new Cipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Cipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.encrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Cipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  this.push(this._mode.encrypt(this, chunk));
	  this._cipher.scrub();
	  next();
	};
	
	
	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};
	
	Splitter.prototype.get = function () {
	  if (this.cache.length > 15) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  var len = 16 - this.cache.length;
	  var padBuff = new Buffer(len);
	
	  var i = -1;
	  while (++i < len) {
	    padBuff.writeUInt8(len, i);
	  }
	  var out = Buffer.concat([this.cache, padBuff]);
	  return out;
	};
	var modelist = {
	  ECB: __webpack_require__(23),
	  CBC: __webpack_require__(20),
	  CFB: __webpack_require__(21),
	  OFB: __webpack_require__(24),
	  CTR: __webpack_require__(22)
	};
	module.exports = function (crypto) {
	  function createCipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv);
	    }
	    return new Cipher(modelist[config.mode], password, iv);
	  }
	  function createCipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createCipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createCipher: createCipher,
	    createCipheriv: createCipheriv
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function (crypto, exports) {
	  exports = exports || {};
	  var ciphers = __webpack_require__(39)(crypto);
	  exports.createCipher = ciphers.createCipher;
	  exports.createCipheriv = ciphers.createCipheriv;
	  var deciphers = __webpack_require__(38)(crypto);
	  exports.createDecipher = deciphers.createDecipher;
	  exports.createDecipheriv = deciphers.createDecipheriv;
	  var modes = __webpack_require__(13);
	  function listCiphers () {
	    return Object.keys(modes);
	  }
	  exports.listCiphers = listCiphers;
	};
	


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(26)
	
	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)
	
	module.exports = Hmac
	
	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg
	
	  var blocksize = (alg === 'sha512') ? 128 : 64
	
	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key
	
	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }
	
	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)
	
	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }
	
	  this._hash = createHash(alg).update(ipad)
	}
	
	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}
	
	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;
	
	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }
	
	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}
	
	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}
	
	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}
	
	module.exports = { hash: hash };
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(47)
	
	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}
	
	exports.createHash = __webpack_require__(26)
	
	exports.createHmac = __webpack_require__(42)
	
	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}
	
	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}
	
	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}
	
	var p = __webpack_require__(46)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync
	__webpack_require__(40)(exports, module.exports);
	
	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	
	var helpers = __webpack_require__(43);
	
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;
	
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	
	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;
	
	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
	
	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
	
	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
	
	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
	
	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	
	}
	
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}
	
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}
	
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}
	
	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(57)
	
	module.exports = function (crypto, exports) {
	  exports = exports || {}
	
	  var exported = pbkdf2Export(crypto)
	
	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync
	
	  return exports
	}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(95)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1).Buffer))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * reveal.js\n * http://lab.hakim.se/reveal-js\n * MIT licensed\n *\n * Copyright (C) 2017 Hakim El Hattab, http://hakim.se\n */.reveal a,.reveal abbr,.reveal acronym,.reveal address,.reveal applet,.reveal article,.reveal aside,.reveal audio,.reveal b,.reveal big,.reveal blockquote,.reveal canvas,.reveal caption,.reveal center,.reveal cite,.reveal code,.reveal dd,.reveal del,.reveal details,.reveal dfn,.reveal div,.reveal dl,.reveal dt,.reveal em,.reveal embed,.reveal fieldset,.reveal figcaption,.reveal figure,.reveal footer,.reveal form,.reveal h1,.reveal h2,.reveal h3,.reveal h4,.reveal h5,.reveal h6,.reveal header,.reveal hgroup,.reveal iframe,.reveal img,.reveal ins,.reveal kbd,.reveal label,.reveal legend,.reveal li,.reveal mark,.reveal menu,.reveal nav,.reveal object,.reveal ol,.reveal output,.reveal p,.reveal pre,.reveal q,.reveal ruby,.reveal s,.reveal samp,.reveal section,.reveal small,.reveal span,.reveal strike,.reveal strong,.reveal sub,.reveal summary,.reveal sup,.reveal table,.reveal tbody,.reveal td,.reveal tfoot,.reveal th,.reveal thead,.reveal time,.reveal tr,.reveal tt,.reveal u,.reveal ul,.reveal var,.reveal video,body,html{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}.reveal article,.reveal aside,.reveal details,.reveal figcaption,.reveal figure,.reveal footer,.reveal header,.reveal hgroup,.reveal menu,.reveal nav,.reveal section{display:block}body,html{width:100%;height:100%;overflow:hidden}body{position:relative;line-height:1;background-color:#fff;color:#000}.reveal .slides section .fragment{opacity:0;visibility:hidden;transition:all .2s ease}.reveal .slides section .fragment.grow,.reveal .slides section .fragment.visible{opacity:1;visibility:inherit}.reveal .slides section .fragment.grow.visible{-webkit-transform:scale(1.3);transform:scale(1.3)}.reveal .slides section .fragment.shrink{opacity:1;visibility:inherit}.reveal .slides section .fragment.shrink.visible{-webkit-transform:scale(.7);transform:scale(.7)}.reveal .slides section .fragment.zoom-in{-webkit-transform:scale(.1);transform:scale(.1)}.reveal .slides section .fragment.zoom-in.visible{-webkit-transform:none;transform:none}.reveal .slides section .fragment.fade-out{opacity:1;visibility:inherit}.reveal .slides section .fragment.fade-out.visible{opacity:0;visibility:hidden}.reveal .slides section .fragment.semi-fade-out{opacity:1;visibility:inherit}.reveal .slides section .fragment.semi-fade-out.visible{opacity:.5;visibility:inherit}.reveal .slides section .fragment.strike{opacity:1;visibility:inherit}.reveal .slides section .fragment.strike.visible{text-decoration:line-through}.reveal .slides section .fragment.fade-up{-webkit-transform:translateY(20%);transform:translateY(20%)}.reveal .slides section .fragment.fade-up.visible{-webkit-transform:translate(0);transform:translate(0)}.reveal .slides section .fragment.fade-down{-webkit-transform:translateY(-20%);transform:translateY(-20%)}.reveal .slides section .fragment.fade-down.visible{-webkit-transform:translate(0);transform:translate(0)}.reveal .slides section .fragment.fade-right{-webkit-transform:translate(-20%);transform:translate(-20%)}.reveal .slides section .fragment.fade-right.visible{-webkit-transform:translate(0);transform:translate(0)}.reveal .slides section .fragment.fade-left{-webkit-transform:translate(20%);transform:translate(20%)}.reveal .slides section .fragment.fade-left.visible{-webkit-transform:translate(0);transform:translate(0)}.reveal .slides section .fragment.current-visible{opacity:0;visibility:hidden}.reveal .slides section .fragment.current-visible.current-fragment,.reveal .slides section .fragment.highlight-blue,.reveal .slides section .fragment.highlight-current-blue,.reveal .slides section .fragment.highlight-current-green,.reveal .slides section .fragment.highlight-current-red,.reveal .slides section .fragment.highlight-green,.reveal .slides section .fragment.highlight-red{opacity:1;visibility:inherit}.reveal .slides section .fragment.highlight-red.visible{color:#ff2c2d}.reveal .slides section .fragment.highlight-green.visible{color:#17ff2e}.reveal .slides section .fragment.highlight-blue.visible{color:#1b91ff}.reveal .slides section .fragment.highlight-current-red.current-fragment{color:#ff2c2d}.reveal .slides section .fragment.highlight-current-green.current-fragment{color:#17ff2e}.reveal .slides section .fragment.highlight-current-blue.current-fragment{color:#1b91ff}.reveal:after{content:\"\";font-style:italic}.reveal iframe{z-index:1}.reveal a{position:relative}.reveal .stretch{max-width:none;max-height:none}.reveal pre.stretch code{height:100%;max-height:100%;box-sizing:border-box}.reveal .controls{display:none;position:fixed;width:110px;height:110px;z-index:30;right:10px;bottom:10px;-webkit-user-select:none}.reveal .controls button{padding:0;position:absolute;opacity:.05;width:0;height:0;background-color:transparent;border:12px solid transparent;-webkit-transform:scale(.9999);transform:scale(.9999);transition:all .2s ease;-webkit-appearance:none;-webkit-tap-highlight-color:transparent}.reveal .controls .enabled{opacity:.7;cursor:pointer}.reveal .controls .enabled:active{margin-top:1px}.reveal .controls .navigate-left{top:42px;border-right-width:22px;border-right-color:#000}.reveal .controls .navigate-left.fragmented{opacity:.3}.reveal .controls .navigate-right{left:74px;top:42px;border-left-width:22px;border-left-color:#000}.reveal .controls .navigate-right.fragmented{opacity:.3}.reveal .controls .navigate-up{left:42px;border-bottom-width:22px;border-bottom-color:#000}.reveal .controls .navigate-up.fragmented{opacity:.3}.reveal .controls .navigate-down{left:42px;top:74px;border-top-width:22px;border-top-color:#000}.reveal .controls .navigate-down.fragmented{opacity:.3}.reveal .progress{position:fixed;display:none;height:3px;width:100%;bottom:0;left:0;z-index:10;background-color:rgba(0,0,0,.2)}.reveal .progress:after{content:\"\";display:block;position:absolute;height:20px;width:100%;top:-20px}.reveal .progress span{display:block;height:100%;width:0;background-color:#000;transition:width .8s cubic-bezier(.26,.86,.44,.985)}.reveal .slide-number{position:fixed;display:block;right:8px;bottom:8px;z-index:31;font-family:Helvetica,sans-serif;font-size:12px;line-height:1;color:#fff;background-color:rgba(0,0,0,.4);padding:5px}.reveal .slide-number-delimiter{margin:0 3px}.reveal{position:relative;width:100%;height:100%;overflow:hidden;-ms-touch-action:none;touch-action:none}.reveal .slides{position:absolute;width:100%;height:100%;top:0;right:0;bottom:0;left:0;margin:auto;pointer-events:none;overflow:visible;z-index:1;text-align:center;-webkit-perspective:600px;perspective:600px;-webkit-perspective-origin:50% 40%;perspective-origin:50% 40%}.reveal .slides>section{-ms-perspective:600px}.reveal .slides>section,.reveal .slides>section>section{display:none;position:absolute;width:100%;padding:20px 0;pointer-events:auto;z-index:10;-webkit-transform-style:flat;transform-style:flat;transition:transform-origin .8s cubic-bezier(.26,.86,.44,.985),transform .8s cubic-bezier(.26,.86,.44,.985),visibility .8s cubic-bezier(.26,.86,.44,.985),opacity .8s cubic-bezier(.26,.86,.44,.985)}.reveal[data-transition-speed=fast] .slides section{transition-duration:.4s}.reveal[data-transition-speed=slow] .slides section{transition-duration:1.2s}.reveal .slides section[data-transition-speed=fast]{transition-duration:.4s}.reveal .slides section[data-transition-speed=slow]{transition-duration:1.2s}.reveal .slides>section.stack{padding-top:0;padding-bottom:0}.reveal .slides>section.present,.reveal .slides>section>section.present{display:block;z-index:11;opacity:1}.reveal .slides>section:empty,.reveal .slides>section>section:empty,.reveal .slides>section>section[data-background-interactive],.reveal .slides>section[data-background-interactive]{pointer-events:none}.reveal.center,.reveal.center .slides,.reveal.center .slides section{min-height:0!important}.reveal .slides>section.future,.reveal .slides>section.past,.reveal .slides>section>section.future,.reveal .slides>section>section.past{pointer-events:none}.reveal.overview .slides>section,.reveal.overview .slides>section>section{pointer-events:auto}.reveal .slides>section.future,.reveal .slides>section.past,.reveal .slides>section>section.future,.reveal .slides>section>section.past{opacity:0}.reveal.slide section{-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal.slide .slides>section:not([data-transition]).past,.reveal .slides>section[data-transition=slide].past,.reveal .slides>section[data-transition~=slide-out].past{-webkit-transform:translate(-150%);transform:translate(-150%)}.reveal.slide .slides>section:not([data-transition]).future,.reveal .slides>section[data-transition=slide].future,.reveal .slides>section[data-transition~=slide-in].future{-webkit-transform:translate(150%);transform:translate(150%)}.reveal.slide .slides>section>section:not([data-transition]).past,.reveal .slides>section>section[data-transition=slide].past,.reveal .slides>section>section[data-transition~=slide-out].past{-webkit-transform:translateY(-150%);transform:translateY(-150%)}.reveal.slide .slides>section>section:not([data-transition]).future,.reveal .slides>section>section[data-transition=slide].future,.reveal .slides>section>section[data-transition~=slide-in].future{-webkit-transform:translateY(150%);transform:translateY(150%)}.reveal.linear section{-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal.linear .slides>section:not([data-transition]).past,.reveal .slides>section[data-transition=linear].past,.reveal .slides>section[data-transition~=linear-out].past{-webkit-transform:translate(-150%);transform:translate(-150%)}.reveal.linear .slides>section:not([data-transition]).future,.reveal .slides>section[data-transition=linear].future,.reveal .slides>section[data-transition~=linear-in].future{-webkit-transform:translate(150%);transform:translate(150%)}.reveal.linear .slides>section>section:not([data-transition]).past,.reveal .slides>section>section[data-transition=linear].past,.reveal .slides>section>section[data-transition~=linear-out].past{-webkit-transform:translateY(-150%);transform:translateY(-150%)}.reveal.linear .slides>section>section:not([data-transition]).future,.reveal .slides>section>section[data-transition=linear].future,.reveal .slides>section>section[data-transition~=linear-in].future{-webkit-transform:translateY(150%);transform:translateY(150%)}.reveal.default .slides section.stack,.reveal .slides section[data-transition=default].stack{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.reveal.default .slides>section:not([data-transition]).past,.reveal .slides>section[data-transition=default].past,.reveal .slides>section[data-transition~=default-out].past{-webkit-transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0);transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0)}.reveal.default .slides>section:not([data-transition]).future,.reveal .slides>section[data-transition=default].future,.reveal .slides>section[data-transition~=default-in].future{-webkit-transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0);transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0)}.reveal.default .slides>section>section:not([data-transition]).past,.reveal .slides>section>section[data-transition=default].past,.reveal .slides>section>section[data-transition~=default-out].past{-webkit-transform:translate3d(0,-300px,0) rotateX(70deg) translate3d(0,-300px,0);transform:translate3d(0,-300px,0) rotateX(70deg) translate3d(0,-300px,0)}.reveal.default .slides>section>section:not([data-transition]).future,.reveal .slides>section>section[data-transition=default].future,.reveal .slides>section>section[data-transition~=default-in].future{-webkit-transform:translate3d(0,300px,0) rotateX(-70deg) translate3d(0,300px,0);transform:translate3d(0,300px,0) rotateX(-70deg) translate3d(0,300px,0)}.reveal.convex .slides section.stack,.reveal .slides section[data-transition=convex].stack{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.reveal.convex .slides>section:not([data-transition]).past,.reveal .slides>section[data-transition=convex].past,.reveal .slides>section[data-transition~=convex-out].past{-webkit-transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0);transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0)}.reveal.convex .slides>section:not([data-transition]).future,.reveal .slides>section[data-transition=convex].future,.reveal .slides>section[data-transition~=convex-in].future{-webkit-transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0);transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0)}.reveal.convex .slides>section>section:not([data-transition]).past,.reveal .slides>section>section[data-transition=convex].past,.reveal .slides>section>section[data-transition~=convex-out].past{-webkit-transform:translate3d(0,-300px,0) rotateX(70deg) translate3d(0,-300px,0);transform:translate3d(0,-300px,0) rotateX(70deg) translate3d(0,-300px,0)}.reveal.convex .slides>section>section:not([data-transition]).future,.reveal .slides>section>section[data-transition=convex].future,.reveal .slides>section>section[data-transition~=convex-in].future{-webkit-transform:translate3d(0,300px,0) rotateX(-70deg) translate3d(0,300px,0);transform:translate3d(0,300px,0) rotateX(-70deg) translate3d(0,300px,0)}.reveal.concave .slides section.stack,.reveal .slides section[data-transition=concave].stack{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.reveal.concave .slides>section:not([data-transition]).past,.reveal .slides>section[data-transition=concave].past,.reveal .slides>section[data-transition~=concave-out].past{-webkit-transform:translate3d(-100%,0,0) rotateY(90deg) translate3d(-100%,0,0);transform:translate3d(-100%,0,0) rotateY(90deg) translate3d(-100%,0,0)}.reveal.concave .slides>section:not([data-transition]).future,.reveal .slides>section[data-transition=concave].future,.reveal .slides>section[data-transition~=concave-in].future{-webkit-transform:translate3d(100%,0,0) rotateY(-90deg) translate3d(100%,0,0);transform:translate3d(100%,0,0) rotateY(-90deg) translate3d(100%,0,0)}.reveal.concave .slides>section>section:not([data-transition]).past,.reveal .slides>section>section[data-transition=concave].past,.reveal .slides>section>section[data-transition~=concave-out].past{-webkit-transform:translate3d(0,-80%,0) rotateX(-70deg) translate3d(0,-80%,0);transform:translate3d(0,-80%,0) rotateX(-70deg) translate3d(0,-80%,0)}.reveal.concave .slides>section>section:not([data-transition]).future,.reveal .slides>section>section[data-transition=concave].future,.reveal .slides>section>section[data-transition~=concave-in].future{-webkit-transform:translate3d(0,80%,0) rotateX(70deg) translate3d(0,80%,0);transform:translate3d(0,80%,0) rotateX(70deg) translate3d(0,80%,0)}.reveal .slides section[data-transition=zoom],.reveal.zoom .slides section:not([data-transition]){transition-timing-function:ease}.reveal .slides>section[data-transition=zoom].past,.reveal .slides>section[data-transition~=zoom-out].past,.reveal.zoom .slides>section:not([data-transition]).past{visibility:hidden;-webkit-transform:scale(16);transform:scale(16)}.reveal .slides>section[data-transition=zoom].future,.reveal .slides>section[data-transition~=zoom-in].future,.reveal.zoom .slides>section:not([data-transition]).future{visibility:hidden;-webkit-transform:scale(.2);transform:scale(.2)}.reveal .slides>section>section[data-transition=zoom].past,.reveal .slides>section>section[data-transition~=zoom-out].past,.reveal.zoom .slides>section>section:not([data-transition]).past{-webkit-transform:translateY(-150%);transform:translateY(-150%)}.reveal .slides>section>section[data-transition=zoom].future,.reveal .slides>section>section[data-transition~=zoom-in].future,.reveal.zoom .slides>section>section:not([data-transition]).future{-webkit-transform:translateY(150%);transform:translateY(150%)}.reveal.cube .slides{-webkit-perspective:1300px;perspective:1300px}.reveal.cube .slides section{padding:30px;min-height:700px;-webkit-backface-visibility:hidden;backface-visibility:hidden;box-sizing:border-box;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.reveal.center.cube .slides section{min-height:0}.reveal.cube .slides section:not(.stack):before{content:\"\";position:absolute;display:block;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.1);border-radius:4px;-webkit-transform:translateZ(-20px);transform:translateZ(-20px)}.reveal.cube .slides section:not(.stack):after{content:\"\";position:absolute;display:block;width:90%;height:30px;left:5%;bottom:0;background:none;z-index:1;border-radius:4px;box-shadow:0 95px 25px rgba(0,0,0,.2);-webkit-transform:translateZ(-90px) rotateX(65deg);transform:translateZ(-90px) rotateX(65deg)}.reveal.cube .slides>section.stack{padding:0;background:none}.reveal.cube .slides>section.past{-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:translate3d(-100%,0,0) rotateY(-90deg);transform:translate3d(-100%,0,0) rotateY(-90deg)}.reveal.cube .slides>section.future{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translate3d(100%,0,0) rotateY(90deg);transform:translate3d(100%,0,0) rotateY(90deg)}.reveal.cube .slides>section>section.past{-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:translate3d(0,-100%,0) rotateX(90deg);transform:translate3d(0,-100%,0) rotateX(90deg)}.reveal.cube .slides>section>section.future{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translate3d(0,100%,0) rotateX(-90deg);transform:translate3d(0,100%,0) rotateX(-90deg)}.reveal.page .slides{-webkit-perspective-origin:0 50%;perspective-origin:0 50%;-webkit-perspective:3000px;perspective:3000px}.reveal.page .slides section{padding:30px;min-height:700px;box-sizing:border-box;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.reveal.page .slides section.past{z-index:12}.reveal.page .slides section:not(.stack):before{content:\"\";position:absolute;display:block;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.1);-webkit-transform:translateZ(-20px);transform:translateZ(-20px)}.reveal.page .slides section:not(.stack):after{content:\"\";position:absolute;display:block;width:90%;height:30px;left:5%;bottom:0;background:none;z-index:1;border-radius:4px;box-shadow:0 95px 25px rgba(0,0,0,.2);-webkit-transform:translateZ(-90px) rotateX(65deg)}.reveal.page .slides>section.stack{padding:0;background:none}.reveal.page .slides>section.past{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translate3d(-40%,0,0) rotateY(-80deg);transform:translate3d(-40%,0,0) rotateY(-80deg)}.reveal.page .slides>section.future{-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:translateZ(0);transform:translateZ(0)}.reveal.page .slides>section>section.past{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translate3d(0,-40%,0) rotateX(80deg);transform:translate3d(0,-40%,0) rotateX(80deg)}.reveal.page .slides>section>section.future{-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:translateZ(0);transform:translateZ(0)}.reveal.fade .slides>section>section:not([data-transition]),.reveal.fade .slides section:not([data-transition]),.reveal .slides section[data-transition=fade]{-webkit-transform:none;transform:none;transition:opacity .5s}.reveal.fade.overview .slides>section>section,.reveal.fade.overview .slides section{transition:none}.reveal.none .slides section:not([data-transition]),.reveal .slides section[data-transition=none]{-webkit-transform:none;transform:none;transition:none}.reveal .pause-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:#000;visibility:hidden;opacity:0;z-index:100;transition:all 1s ease}.reveal.paused .pause-overlay{visibility:visible;opacity:1}.no-transforms{overflow-y:auto}.no-transforms .reveal .slides{position:relative;width:80%;height:auto!important;top:0;left:50%;margin:0;text-align:center}.no-transforms .reveal .controls,.no-transforms .reveal .progress{display:none!important}.no-transforms .reveal .slides section{display:block!important;opacity:1!important;position:relative!important;height:auto;min-height:0;top:0;left:-50%;margin:70px 0;-webkit-transform:none;transform:none}.no-transforms .reveal .slides section section{left:0}.reveal .no-transition,.reveal .no-transition *{transition:none!important}.reveal .backgrounds{position:absolute;width:100%;height:100%;top:0;left:0;-webkit-perspective:600px;perspective:600px}.reveal .slide-background{display:none;position:absolute;width:100%;height:100%;opacity:0;visibility:hidden;overflow:hidden;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat;background-size:cover;transition:all .8s cubic-bezier(.26,.86,.44,.985)}.reveal .slide-background.stack{display:block}.reveal .slide-background.present{opacity:1;visibility:visible;z-index:2}.print-pdf .reveal .slide-background{opacity:1!important;visibility:visible!important}.reveal .slide-background video{position:absolute;width:100%;height:100%;max-width:none;max-height:none;top:0;left:0;-o-object-fit:cover;object-fit:cover}.reveal .slide-background[data-background-size=contain] video{-o-object-fit:contain;object-fit:contain}.reveal>.backgrounds .slide-background[data-background-transition=none],.reveal[data-background-transition=none]>.backgrounds .slide-background{transition:none}.reveal>.backgrounds .slide-background[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background{opacity:1;-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal>.backgrounds .slide-background.past[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background.past{-webkit-transform:translate(-100%);transform:translate(-100%)}.reveal>.backgrounds .slide-background.future[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background.future{-webkit-transform:translate(100%);transform:translate(100%)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.past{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.future{-webkit-transform:translateY(100%);transform:translateY(100%)}.reveal>.backgrounds .slide-background.past[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background.past{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0);transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0)}.reveal>.backgrounds .slide-background.future[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background.future{opacity:0;-webkit-transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0);transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.past{opacity:0;-webkit-transform:translate3d(0,-100%,0) rotateX(90deg) translate3d(0,-100%,0);transform:translate3d(0,-100%,0) rotateX(90deg) translate3d(0,-100%,0)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.future{opacity:0;-webkit-transform:translate3d(0,100%,0) rotateX(-90deg) translate3d(0,100%,0);transform:translate3d(0,100%,0) rotateX(-90deg) translate3d(0,100%,0)}.reveal>.backgrounds .slide-background.past[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background.past{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotateY(90deg) translate3d(-100%,0,0);transform:translate3d(-100%,0,0) rotateY(90deg) translate3d(-100%,0,0)}.reveal>.backgrounds .slide-background.future[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background.future{opacity:0;-webkit-transform:translate3d(100%,0,0) rotateY(-90deg) translate3d(100%,0,0);transform:translate3d(100%,0,0) rotateY(-90deg) translate3d(100%,0,0)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.past{opacity:0;-webkit-transform:translate3d(0,-100%,0) rotateX(-90deg) translate3d(0,-100%,0);transform:translate3d(0,-100%,0) rotateX(-90deg) translate3d(0,-100%,0)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.future{opacity:0;-webkit-transform:translate3d(0,100%,0) rotateX(90deg) translate3d(0,100%,0);transform:translate3d(0,100%,0) rotateX(90deg) translate3d(0,100%,0)}.reveal>.backgrounds .slide-background[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background{transition-timing-function:ease}.reveal>.backgrounds .slide-background.past[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background.past{opacity:0;visibility:hidden;-webkit-transform:scale(16);transform:scale(16)}.reveal>.backgrounds .slide-background.future[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background.future{opacity:0;visibility:hidden;-webkit-transform:scale(.2);transform:scale(.2)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.past{opacity:0;visibility:hidden;-webkit-transform:scale(16);transform:scale(16)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.future{opacity:0;visibility:hidden;-webkit-transform:scale(.2);transform:scale(.2)}.reveal[data-transition-speed=fast]>.backgrounds .slide-background{transition-duration:.4s}.reveal[data-transition-speed=slow]>.backgrounds .slide-background{transition-duration:1.2s}.reveal.overview{-webkit-perspective-origin:50% 50%;perspective-origin:50% 50%;-webkit-perspective:700px;perspective:700px}.reveal.overview .slides{-moz-transform-style:preserve-3d}.reveal.overview .slides section{height:100%;top:0!important;opacity:1!important;overflow:hidden;visibility:visible!important;cursor:pointer;box-sizing:border-box}.reveal.overview .slides section.present,.reveal.overview .slides section:hover{outline:10px solid hsla(0,0%,59%,.4);outline-offset:10px}.reveal.overview .slides section .fragment{opacity:1;transition:none}.reveal.overview .slides section:after,.reveal.overview .slides section:before{display:none!important}.reveal.overview .slides>section.stack{padding:0;top:0!important;background:none;outline:none;overflow:visible}.reveal.overview .backgrounds{-webkit-perspective:inherit;perspective:inherit;-moz-transform-style:preserve-3d}.reveal.overview .backgrounds .slide-background{opacity:1;visibility:visible;outline:10px solid hsla(0,0%,59%,.1);outline-offset:10px}.reveal.overview .backgrounds .slide-background.stack{overflow:visible}.reveal.overview-deactivating .backgrounds .slide-background,.reveal.overview-deactivating .slides section,.reveal.overview .backgrounds .slide-background,.reveal.overview .slides section{transition:none}.reveal.rtl .slides,.reveal.rtl .slides h1,.reveal.rtl .slides h2,.reveal.rtl .slides h3,.reveal.rtl .slides h4,.reveal.rtl .slides h5,.reveal.rtl .slides h6{direction:rtl;font-family:sans-serif}.reveal.rtl code,.reveal.rtl pre{direction:ltr}.reveal.rtl ol,.reveal.rtl ul{text-align:right}.reveal.rtl .progress span{float:right}.reveal.has-parallax-background .backgrounds{transition:all .8s ease}.reveal.has-parallax-background[data-transition-speed=fast] .backgrounds{transition-duration:.4s}.reveal.has-parallax-background[data-transition-speed=slow] .backgrounds{transition-duration:1.2s}.reveal .overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;background:rgba(0,0,0,.9);opacity:0;visibility:hidden;transition:all .3s ease}.reveal .overlay.visible{opacity:1;visibility:visible}.reveal .overlay .spinner{position:absolute;display:block;top:50%;left:50%;width:32px;height:32px;margin:-16px 0 0 -16px;z-index:10;background-image:url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);visibility:visible;opacity:.6;transition:all .3s ease}.reveal .overlay header{position:absolute;left:0;top:0;width:100%;height:40px;z-index:2;border-bottom:1px solid #222}.reveal .overlay header a{display:inline-block;width:40px;height:40px;line-height:36px;padding:0 10px;float:right;opacity:.6;box-sizing:border-box}.reveal .overlay header a:hover{opacity:1}.reveal .overlay header a .icon{display:inline-block;width:20px;height:20px;background-position:50% 50%;background-size:100%;background-repeat:no-repeat}.reveal .overlay header a.close .icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC)}.reveal .overlay header a.external .icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==)}.reveal .overlay .viewport{position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;top:40px;right:0;bottom:0;left:0}.reveal .overlay.overlay-preview .viewport iframe{width:100%;height:100%;max-width:100%;max-height:100%;border:0;opacity:0;visibility:hidden;transition:all .3s ease}.reveal .overlay.overlay-preview.loaded .viewport iframe{opacity:1;visibility:visible}.reveal .overlay.overlay-preview.loaded .viewport-inner{position:absolute;z-index:-1;left:0;top:45%;width:100%;text-align:center;letter-spacing:normal}.reveal .overlay.overlay-preview .x-frame-error{opacity:0;transition:opacity .3s ease .3s}.reveal .overlay.overlay-preview.loaded .x-frame-error{opacity:1}.reveal .overlay.overlay-preview.loaded .spinner{opacity:0;visibility:hidden;-webkit-transform:scale(.2);transform:scale(.2)}.reveal .overlay.overlay-help .viewport{overflow:auto;color:#fff}.reveal .overlay.overlay-help .viewport .viewport-inner{width:600px;margin:auto;padding:20px 20px 80px;text-align:center;letter-spacing:normal}.reveal .overlay.overlay-help .viewport .viewport-inner .title{font-size:20px}.reveal .overlay.overlay-help .viewport .viewport-inner table{border:1px solid #fff;border-collapse:collapse;font-size:16px}.reveal .overlay.overlay-help .viewport .viewport-inner table td,.reveal .overlay.overlay-help .viewport .viewport-inner table th{width:200px;padding:14px;border:1px solid #fff;vertical-align:middle}.reveal .overlay.overlay-help .viewport .viewport-inner table th{padding-top:20px;padding-bottom:20px}.reveal .playback{position:fixed;left:15px;bottom:20px;z-index:30;cursor:pointer;transition:all .4s ease}.reveal.overview .playback{opacity:0;visibility:hidden}.reveal .roll{display:inline-block;line-height:1.2;overflow:hidden;vertical-align:top;-webkit-perspective:400px;perspective:400px;-webkit-perspective-origin:50% 50%;perspective-origin:50% 50%}.reveal .roll:hover{background:none;text-shadow:none}.reveal .roll span{display:block;position:relative;padding:0 2px;pointer-events:none;transition:all .4s ease;-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal .roll:hover span{background:rgba(0,0,0,.5);-webkit-transform:translateZ(-45px) rotateX(90deg);transform:translateZ(-45px) rotateX(90deg)}.reveal .roll span:after{content:attr(data-title);display:block;position:absolute;left:0;top:0;padding:0 2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:translate3d(0,110%,0) rotateX(-90deg);transform:translate3d(0,110%,0) rotateX(-90deg)}.reveal aside.notes{display:none}.reveal .speaker-notes{display:none;position:absolute;width:70%;max-height:15%;left:15%;bottom:26px;padding:10px;z-index:1;font-size:18px;line-height:1.4;color:#fff;background-color:rgba(0,0,0,.5);overflow:auto;box-sizing:border-box;text-align:left;font-family:Helvetica,sans-serif;-webkit-overflow-scrolling:touch}.reveal .speaker-notes.visible:not(:empty){display:block}@media screen and (max-width:1024px){.reveal .speaker-notes{font-size:14px}}@media screen and (max-width:600px){.reveal .speaker-notes{width:90%;left:5%}}.zoomed .reveal *,.zoomed .reveal :after,.zoomed .reveal :before{-webkit-backface-visibility:visible!important;backface-visibility:visible!important}.zoomed .reveal .controls,.zoomed .reveal .progress{opacity:0}.zoomed .reveal .roll span{background:none}.zoomed .reveal .roll span:after{visibility:hidden}", ""]);
	
	// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	exports.i(__webpack_require__(50), "");
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Montserrat:400);", ""]);
	
	// module
	exports.push([module.id, "html *{color-profile:sRGB;rendering-intent:auto}body{background:linear-gradient(0deg,#d66d75,#e29587);background-color:linear-gradient(0deg,#d66d75,#e29587)}.reveal{font-family:Montserrat,sans-serif;font-size:40px;font-weight:400;color:#fdf6e3}::selection{color:#fff;background:#d33682;text-shadow:none}::-moz-selection{color:#fff;background:#d33682;text-shadow:none}.reveal .slides>section,.reveal .slides>section>section{line-height:1.3;font-weight:inherit}.reveal h1,.reveal h2,.reveal h3,.reveal h4,.reveal h5,.reveal h6{margin:0 0 20px;color:#eee8d5;font-family:League Gothic,Impact,sans-serif;font-weight:400;line-height:1.2;letter-spacing:normal;text-transform:uppercase;text-shadow:none;word-wrap:break-word}.reveal h1{font-size:3.77em}.reveal h2{font-size:2.11em}.reveal h3{font-size:1.55em}.reveal h4{font-size:1em}.reveal h1{text-shadow:none}.reveal p{margin:20px 0;line-height:1.3}.reveal iframe,.reveal img,.reveal video{max-width:95%;max-height:95%}.reveal b,.reveal strong{font-weight:700}.reveal em{font-style:italic}.reveal dl,.reveal ol,.reveal ul{display:inline-block;text-align:left;margin:0 0 0 1em}.reveal ol{list-style-type:decimal}.reveal ul{list-style-type:disc}.reveal ul ul{list-style-type:square}.reveal ul ul ul{list-style-type:circle}.reveal ol ol,.reveal ol ul,.reveal ul ol,.reveal ul ul{display:block;margin-left:40px}.reveal dt{font-weight:700}.reveal dd{margin-left:40px}.reveal blockquote,.reveal q{quotes:none}.reveal blockquote{display:block;position:relative;width:70%;margin:20px auto;padding:5px;font-style:italic;background:hsla(0,0%,100%,.05);box-shadow:0 0 2px rgba(0,0,0,.2)}.reveal blockquote p:first-child,.reveal blockquote p:last-child{display:inline-block}.reveal q{font-style:italic}.reveal pre{display:block;position:relative;width:90%;margin:20px auto;text-align:left;font-size:.55em;line-height:1.2em;word-wrap:break-word;box-shadow:0 0 6px rgba(0,0,0,.3)}.reveal code,.reveal pre{font-family:monospace}.reveal pre code{display:block;padding:5px;overflow:auto;max-height:400px;word-wrap:normal}.reveal table{margin:auto;border-collapse:collapse;border-spacing:0}.reveal table th{font-weight:700}.reveal table td,.reveal table th{text-align:left;padding:.2em .5em;border-bottom:1px solid}.reveal table td[align=center],.reveal table th[align=center]{text-align:center}.reveal table td[align=right],.reveal table th[align=right]{text-align:right}.reveal table tbody tr:last-child td,.reveal table tbody tr:last-child th{border-bottom:none}.reveal sup{vertical-align:super}.reveal sub{vertical-align:sub}.reveal small{display:inline-block;font-size:.6em;line-height:1.2em}.reveal small,.reveal small *{vertical-align:top}.reveal a{color:#eee8d5;text-decoration:1px dashed #eee8d5;transition:color .15s ease}.reveal a:hover{color:#fff;text-shadow:none;border:none}.reveal .roll span:after{color:#fff;background:#d8ca9f}.reveal section img{margin:15px 0;background:hsla(0,0%,100%,.12);border:4px solid #fdf6e3;box-shadow:0 0 10px rgba(0,0,0,.15)}.reveal section img.plain{border:0;box-shadow:none}.reveal a img{transition:all .15s linear}.reveal a:hover img{background:hsla(0,0%,100%,.2);border-color:#eee8d5;box-shadow:0 0 20px rgba(0,0,0,.55)}.reveal .controls .navigate-left,.reveal .controls .navigate-left.enabled{border-right-color:#eee8d5}.reveal .controls .navigate-right,.reveal .controls .navigate-right.enabled{border-left-color:#eee8d5}.reveal .controls .navigate-up,.reveal .controls .navigate-up.enabled{border-bottom-color:#eee8d5}.reveal .controls .navigate-down,.reveal .controls .navigate-down.enabled{border-top-color:#eee8d5}.reveal .controls .navigate-left.enabled:hover{border-right-color:#fff}.reveal .controls .navigate-right.enabled:hover{border-left-color:#fff}.reveal .controls .navigate-up.enabled:hover{border-bottom-color:#fff}.reveal .controls .navigate-down.enabled:hover{border-top-color:#fff}.reveal .progress{background:rgba(0,0,0,.2)}.reveal .progress span{background:#eee8d5;transition:width .8s cubic-bezier(.26,.86,.44,.985)}", ""]);
	
	// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face{font-family:League Gothic;src:url(" + __webpack_require__(35) + ");src:url(" + __webpack_require__(35) + "?#iefix) format(\"embedded-opentype\"),url(" + __webpack_require__(90) + ") format(\"woff\"),url(" + __webpack_require__(89) + ") format(\"truetype\");font-weight:400;font-style:normal}", ""]);
	
	// exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	const crypto = __webpack_require__(44);
	const LRU = __webpack_require__(54);
	const Promise = __webpack_require__(58);
	const request = __webpack_require__(85);
	const sizeof = __webpack_require__(56)
	
	class Elemeno {
	
		constructor (apiKey, opts) {
			let defaults = {
				cacheSize: 50, // megabytes
				cacheMaxAge: 0 // minutes
			};
	
			let options = Object.assign({}, defaults, opts);
	
			this.apiKey = apiKey;
			this.baseUrl = 'https://api.elemeno.io/v1/';
			this.singleBase = 'singles/';
			this.collectionBase = 'collections/';
			this.cache = null;
	
			if (options.cacheMaxAge > 0) {
				this.cache = new LRU({
					max: options.cacheSize * 1024 * 1024,    // bytes
					maxAge: options.cacheMaxAge * 1000 * 60, // milliseconds
					length: function(item, key) {
						return sizeof(item) + sizeof(key);
					}
				});
			}
		}
	
		static getQuery(options, allow) {
			let query = {};
	
			if (options) {
				if (options.filters && Array.isArray(allow) && allow.indexOf('filters') > -1) {
					query.filters = JSON.stringify(options.filters);
				}
				if (options.sort && Array.isArray(allow) && allow.indexOf('sort') > -1) {
					query.sort = JSON.stringify(options.sort);
				}
				if (options.page) {
					query.page = options.page;
				}
				if (options.size) {
					query.size = options.size;
				}
				if (options.byId) {
					query.byId = (options.byId === true || options.byId === 'true') ? true : false;
				}
			}
	
			return query;
		}
	
		get(path, query) {
			let self = this;
			let cacheKey;
	
			if (this.cache) {
				let identifier = JSON.stringify([path, query]);
				cacheKey = crypto.createHash('md5').update(identifier).digest('hex');
	
				let cachedResponse = this.cache.get(cacheKey);
	
				if (cachedResponse) {
					return cb(null, cachedResponse);
				}
			}
	
			return new Promise((resolve, reject) => {
				let req = request.get(this.baseUrl + path);
				req.set('Authorization', this.apiKey);
	
				if (query) {
					req.query(query)
				}
	
				req.end(function(err, res) {
					if (err) {
						reject(err.response.error);
					}
	
					if (self.cache) {
						self.cache.set(cacheKey, res.body);
					}
	
					resolve(res.body)
				});
			});
		}
	
		getSingles(options, cb) {
			if (typeof cb === 'undefined') {
				cb = options;
				options = null;
			}
	
			let path = this.singleBase;
			let query = Elemeno.getQuery(options, ['sort']);
	
			return this.get(path, query).nodeify(cb);
		}
	
		getSingle(singleSlug, cb) {
			let path = this.singleBase + singleSlug;
	
			return this.get(path).nodeify(cb);
		}
	
		getCollections(options, cb) {
			if (typeof cb === 'undefined') {
				cb = options;
				options = null;
			}
	
			let path = this.collectionBase;
			let query = Elemeno.getQuery(options, ['sort']);
	
			return this.get(path, query).nodeify(cb);
		}
	
		getCollection(collectionSlug, cb) {
			let path = this.collectionBase + collectionSlug;
	
			return this.get(path).nodeify(cb);
		}
	
		getCollectionItems(collectionSlug, options, cb) {
			if (typeof cb === 'undefined') {
				cb = options;
				options = null;
			}
	
			let path = this.collectionBase + collectionSlug + '/items/';
			let query = Elemeno.getQuery(options, ['filters', 'sort']);
	
			return this.get(path, query).nodeify(cb);
		}
	
		getCollectionItem(collectionSlug, itemSlug, options, cb) {
			if (typeof cb === 'undefined') {
				cb = options;
				options = null;
			}
	
			let path = this.collectionBase + collectionSlug + '/items/' + itemSlug;
			let query = Elemeno.getQuery(options);
	
			return this.get(path, query).nodeify(cb);
		}
	
		clearCache() {
			if (this.cache) {
				this.cache.reset();
			}
		}
	}
	
	module.exports = Elemeno;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = "module.exports = __webpack_public_path__ + \"app\\\\index.html\";";

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = LRUCache
	
	// This will be a proper iterable 'Map' in engines that support it,
	// or a fakey-fake PseudoMap in older versions.
	var Map = __webpack_require__(65)
	var util = __webpack_require__(10)
	
	// A linked list to keep track of recently-used-ness
	var Yallist = __webpack_require__(94)
	
	// use symbols if possible, otherwise just _props
	var symbols = {}
	var hasSymbol = typeof Symbol === 'function'
	var makeSymbol
	/* istanbul ignore if */
	if (hasSymbol) {
	  makeSymbol = function (key) {
	    return Symbol.for(key)
	  }
	} else {
	  makeSymbol = function (key) {
	    return '_' + key
	  }
	}
	
	function priv (obj, key, val) {
	  var sym
	  if (symbols[key]) {
	    sym = symbols[key]
	  } else {
	    sym = makeSymbol(key)
	    symbols[key] = sym
	  }
	  if (arguments.length === 2) {
	    return obj[sym]
	  } else {
	    obj[sym] = val
	    return val
	  }
	}
	
	function naiveLength () { return 1 }
	
	// lruList is a yallist where the head is the youngest
	// item, and the tail is the oldest.  the list contains the Hit
	// objects as the entries.
	// Each Hit object has a reference to its Yallist.Node.  This
	// never changes.
	//
	// cache is a Map (or PseudoMap) that matches the keys to
	// the Yallist.Node object.
	function LRUCache (options) {
	  if (!(this instanceof LRUCache)) {
	    return new LRUCache(options)
	  }
	
	  if (typeof options === 'number') {
	    options = { max: options }
	  }
	
	  if (!options) {
	    options = {}
	  }
	
	  var max = priv(this, 'max', options.max)
	  // Kind of weird to have a default max of Infinity, but oh well.
	  if (!max ||
	      !(typeof max === 'number') ||
	      max <= 0) {
	    priv(this, 'max', Infinity)
	  }
	
	  var lc = options.length || naiveLength
	  if (typeof lc !== 'function') {
	    lc = naiveLength
	  }
	  priv(this, 'lengthCalculator', lc)
	
	  priv(this, 'allowStale', options.stale || false)
	  priv(this, 'maxAge', options.maxAge || 0)
	  priv(this, 'dispose', options.dispose)
	  this.reset()
	}
	
	// resize the cache when the max changes.
	Object.defineProperty(LRUCache.prototype, 'max', {
	  set: function (mL) {
	    if (!mL || !(typeof mL === 'number') || mL <= 0) {
	      mL = Infinity
	    }
	    priv(this, 'max', mL)
	    trim(this)
	  },
	  get: function () {
	    return priv(this, 'max')
	  },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'allowStale', {
	  set: function (allowStale) {
	    priv(this, 'allowStale', !!allowStale)
	  },
	  get: function () {
	    return priv(this, 'allowStale')
	  },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'maxAge', {
	  set: function (mA) {
	    if (!mA || !(typeof mA === 'number') || mA < 0) {
	      mA = 0
	    }
	    priv(this, 'maxAge', mA)
	    trim(this)
	  },
	  get: function () {
	    return priv(this, 'maxAge')
	  },
	  enumerable: true
	})
	
	// resize the cache when the lengthCalculator changes.
	Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
	  set: function (lC) {
	    if (typeof lC !== 'function') {
	      lC = naiveLength
	    }
	    if (lC !== priv(this, 'lengthCalculator')) {
	      priv(this, 'lengthCalculator', lC)
	      priv(this, 'length', 0)
	      priv(this, 'lruList').forEach(function (hit) {
	        hit.length = priv(this, 'lengthCalculator').call(this, hit.value, hit.key)
	        priv(this, 'length', priv(this, 'length') + hit.length)
	      }, this)
	    }
	    trim(this)
	  },
	  get: function () { return priv(this, 'lengthCalculator') },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'length', {
	  get: function () { return priv(this, 'length') },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'itemCount', {
	  get: function () { return priv(this, 'lruList').length },
	  enumerable: true
	})
	
	LRUCache.prototype.rforEach = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = priv(this, 'lruList').tail; walker !== null;) {
	    var prev = walker.prev
	    forEachStep(this, fn, walker, thisp)
	    walker = prev
	  }
	}
	
	function forEachStep (self, fn, node, thisp) {
	  var hit = node.value
	  if (isStale(self, hit)) {
	    del(self, node)
	    if (!priv(self, 'allowStale')) {
	      hit = undefined
	    }
	  }
	  if (hit) {
	    fn.call(thisp, hit.value, hit.key, self)
	  }
	}
	
	LRUCache.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = priv(this, 'lruList').head; walker !== null;) {
	    var next = walker.next
	    forEachStep(this, fn, walker, thisp)
	    walker = next
	  }
	}
	
	LRUCache.prototype.keys = function () {
	  return priv(this, 'lruList').toArray().map(function (k) {
	    return k.key
	  }, this)
	}
	
	LRUCache.prototype.values = function () {
	  return priv(this, 'lruList').toArray().map(function (k) {
	    return k.value
	  }, this)
	}
	
	LRUCache.prototype.reset = function () {
	  if (priv(this, 'dispose') &&
	      priv(this, 'lruList') &&
	      priv(this, 'lruList').length) {
	    priv(this, 'lruList').forEach(function (hit) {
	      priv(this, 'dispose').call(this, hit.key, hit.value)
	    }, this)
	  }
	
	  priv(this, 'cache', new Map()) // hash of items by key
	  priv(this, 'lruList', new Yallist()) // list of items in order of use recency
	  priv(this, 'length', 0) // length of items in the list
	}
	
	LRUCache.prototype.dump = function () {
	  return priv(this, 'lruList').map(function (hit) {
	    if (!isStale(this, hit)) {
	      return {
	        k: hit.key,
	        v: hit.value,
	        e: hit.now + (hit.maxAge || 0)
	      }
	    }
	  }, this).toArray().filter(function (h) {
	    return h
	  })
	}
	
	LRUCache.prototype.dumpLru = function () {
	  return priv(this, 'lruList')
	}
	
	LRUCache.prototype.inspect = function (n, opts) {
	  var str = 'LRUCache {'
	  var extras = false
	
	  var as = priv(this, 'allowStale')
	  if (as) {
	    str += '\n  allowStale: true'
	    extras = true
	  }
	
	  var max = priv(this, 'max')
	  if (max && max !== Infinity) {
	    if (extras) {
	      str += ','
	    }
	    str += '\n  max: ' + util.inspect(max, opts)
	    extras = true
	  }
	
	  var maxAge = priv(this, 'maxAge')
	  if (maxAge) {
	    if (extras) {
	      str += ','
	    }
	    str += '\n  maxAge: ' + util.inspect(maxAge, opts)
	    extras = true
	  }
	
	  var lc = priv(this, 'lengthCalculator')
	  if (lc && lc !== naiveLength) {
	    if (extras) {
	      str += ','
	    }
	    str += '\n  length: ' + util.inspect(priv(this, 'length'), opts)
	    extras = true
	  }
	
	  var didFirst = false
	  priv(this, 'lruList').forEach(function (item) {
	    if (didFirst) {
	      str += ',\n  '
	    } else {
	      if (extras) {
	        str += ',\n'
	      }
	      didFirst = true
	      str += '\n  '
	    }
	    var key = util.inspect(item.key).split('\n').join('\n  ')
	    var val = { value: item.value }
	    if (item.maxAge !== maxAge) {
	      val.maxAge = item.maxAge
	    }
	    if (lc !== naiveLength) {
	      val.length = item.length
	    }
	    if (isStale(this, item)) {
	      val.stale = true
	    }
	
	    val = util.inspect(val, opts).split('\n').join('\n  ')
	    str += key + ' => ' + val
	  })
	
	  if (didFirst || extras) {
	    str += '\n'
	  }
	  str += '}'
	
	  return str
	}
	
	LRUCache.prototype.set = function (key, value, maxAge) {
	  maxAge = maxAge || priv(this, 'maxAge')
	
	  var now = maxAge ? Date.now() : 0
	  var len = priv(this, 'lengthCalculator').call(this, value, key)
	
	  if (priv(this, 'cache').has(key)) {
	    if (len > priv(this, 'max')) {
	      del(this, priv(this, 'cache').get(key))
	      return false
	    }
	
	    var node = priv(this, 'cache').get(key)
	    var item = node.value
	
	    // dispose of the old one before overwriting
	    if (priv(this, 'dispose')) {
	      priv(this, 'dispose').call(this, key, item.value)
	    }
	
	    item.now = now
	    item.maxAge = maxAge
	    item.value = value
	    priv(this, 'length', priv(this, 'length') + (len - item.length))
	    item.length = len
	    this.get(key)
	    trim(this)
	    return true
	  }
	
	  var hit = new Entry(key, value, len, now, maxAge)
	
	  // oversized objects fall out of cache automatically.
	  if (hit.length > priv(this, 'max')) {
	    if (priv(this, 'dispose')) {
	      priv(this, 'dispose').call(this, key, value)
	    }
	    return false
	  }
	
	  priv(this, 'length', priv(this, 'length') + hit.length)
	  priv(this, 'lruList').unshift(hit)
	  priv(this, 'cache').set(key, priv(this, 'lruList').head)
	  trim(this)
	  return true
	}
	
	LRUCache.prototype.has = function (key) {
	  if (!priv(this, 'cache').has(key)) return false
	  var hit = priv(this, 'cache').get(key).value
	  if (isStale(this, hit)) {
	    return false
	  }
	  return true
	}
	
	LRUCache.prototype.get = function (key) {
	  return get(this, key, true)
	}
	
	LRUCache.prototype.peek = function (key) {
	  return get(this, key, false)
	}
	
	LRUCache.prototype.pop = function () {
	  var node = priv(this, 'lruList').tail
	  if (!node) return null
	  del(this, node)
	  return node.value
	}
	
	LRUCache.prototype.del = function (key) {
	  del(this, priv(this, 'cache').get(key))
	}
	
	LRUCache.prototype.load = function (arr) {
	  // reset the cache
	  this.reset()
	
	  var now = Date.now()
	  // A previous serialized cache has the most recent items first
	  for (var l = arr.length - 1; l >= 0; l--) {
	    var hit = arr[l]
	    var expiresAt = hit.e || 0
	    if (expiresAt === 0) {
	      // the item was created without expiration in a non aged cache
	      this.set(hit.k, hit.v)
	    } else {
	      var maxAge = expiresAt - now
	      // dont add already expired items
	      if (maxAge > 0) {
	        this.set(hit.k, hit.v, maxAge)
	      }
	    }
	  }
	}
	
	LRUCache.prototype.prune = function () {
	  var self = this
	  priv(this, 'cache').forEach(function (value, key) {
	    get(self, key, false)
	  })
	}
	
	function get (self, key, doUse) {
	  var node = priv(self, 'cache').get(key)
	  if (node) {
	    var hit = node.value
	    if (isStale(self, hit)) {
	      del(self, node)
	      if (!priv(self, 'allowStale')) hit = undefined
	    } else {
	      if (doUse) {
	        priv(self, 'lruList').unshiftNode(node)
	      }
	    }
	    if (hit) hit = hit.value
	  }
	  return hit
	}
	
	function isStale (self, hit) {
	  if (!hit || (!hit.maxAge && !priv(self, 'maxAge'))) {
	    return false
	  }
	  var stale = false
	  var diff = Date.now() - hit.now
	  if (hit.maxAge) {
	    stale = diff > hit.maxAge
	  } else {
	    stale = priv(self, 'maxAge') && (diff > priv(self, 'maxAge'))
	  }
	  return stale
	}
	
	function trim (self) {
	  if (priv(self, 'length') > priv(self, 'max')) {
	    for (var walker = priv(self, 'lruList').tail;
	         priv(self, 'length') > priv(self, 'max') && walker !== null;) {
	      // We know that we're about to delete this one, and also
	      // what the next least recently used key will be, so just
	      // go ahead and set it now.
	      var prev = walker.prev
	      del(self, walker)
	      walker = prev
	    }
	  }
	}
	
	function del (self, node) {
	  if (node) {
	    var hit = node.value
	    if (priv(self, 'dispose')) {
	      priv(self, 'dispose').call(this, hit.key, hit.value)
	    }
	    priv(self, 'length', priv(self, 'length') - hit.length)
	    priv(self, 'cache').delete(hit.key)
	    priv(self, 'lruList').removeNode(node)
	  }
	}
	
	// classy, since V8 prefers predictable objects.
	function Entry (key, value, length, now, maxAge) {
	  this.key = key
	  this.value = value
	  this.length = length
	  this.now = now
	  this.maxAge = maxAge || 0
	}


/***/ }),
/* 55 */
/***/ (function(module, exports) {

	/**
	 * Byte sizes are taken from ECMAScript Language Specification
	 * http://www.ecma-international.org/ecma-262/5.1/
	 * http://bclary.com/2004/11/07/#a-4.3.16
	 */
	
	module.exports = {
	    STRING: 2,
	    BOOLEAN: 4,
	    NUMBER: 8
	};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright 2014 Andrei Karpushonak
	
	"use strict";
	
	var ECMA_SIZES  = __webpack_require__(55);
	
	/**
	 * Main module's entry point
	 * Calculates Bytes for the provided parameter
	 * @param object - handles object/string/boolean/buffer
	 * @returns {*}
	 */
	function sizeof(object) {
	    if (object !== null && typeof (object) === 'object') {
	      if (Buffer.isBuffer(object)) {
	        return object.length;
	      }
	      else {
	        var bytes = 0;
	        for (var key in object) {
	
	          if(!Object.hasOwnProperty.call(object, key)) {
	            continue;
	          }
	
	          bytes += sizeof(key);
	          try {
	            bytes += sizeof(object[key]);
	          } catch (ex) {
	            if(ex instanceof RangeError) {
	              // circular reference detected, final result might be incorrect
	              // let's be nice and not throw an exception
	              bytes = 0;
	            }
	          }
	        }
	        return bytes;
	      }
	    } else if (typeof (object) === 'string') {
	      return object.length * ECMA_SIZES.STRING;
	    } else if (typeof (object) === 'boolean') {
	      return ECMA_SIZES.BOOLEAN;
	    } else if (typeof (object) === 'number') {
	      return ECMA_SIZES.NUMBER;
	    } else {
	      return 0;
	    }
	}
	
	module.exports = sizeof;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }
	
	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')
	
	    setTimeout(function() {
	      var result
	
	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }
	
	      callback(undefined, result)
	    })
	  }
	
	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')
	
	    if (iterations < 0)
	      throw new TypeError('Bad iterations')
	
	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')
	
	    if (keylen < 0)
	      throw new TypeError('Bad key length')
	
	    digest = digest || 'sha1'
	
	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)
	
	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)
	
	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)
	
	      var U = crypto.createHmac(digest, password).update(block1).digest()
	
	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen
	
	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }
	
	      U.copy(T, 0, 0, hLen)
	
	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()
	
	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }
	
	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }
	
	    return DK
	  }
	
	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(62)


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(5);
	
	module.exports = Promise;
	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this;
	  self.then(null, function (err) {
	    setTimeout(function () {
	      throw err;
	    }, 0);
	  });
	};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//This file contains the ES6 extensions to the core Promises/A+ API
	
	var Promise = __webpack_require__(5);
	
	module.exports = Promise;
	
	/* Static Functions */
	
	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');
	
	function valuePromise(value) {
	  var p = new Promise(Promise._61);
	  p._65 = 1;
	  p._55 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;
	
	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;
	
	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};
	
	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);
	
	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      if (val && (typeof val === 'object' || typeof val === 'function')) {
	        if (val instanceof Promise && val.then === Promise.prototype.then) {
	          while (val._65 === 3) {
	            val = val._55;
	          }
	          if (val._65 === 1) return res(i, val._55);
	          if (val._65 === 2) reject(val._55);
	          val.then(function (val) {
	            res(i, val);
	          }, reject);
	          return;
	        } else {
	          var then = val.then;
	          if (typeof then === 'function') {
	            var p = new Promise(then.bind(val));
	            p.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	      }
	      args[i] = val;
	      if (--remaining === 0) {
	        resolve(args);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};
	
	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};
	
	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};
	
	/* Prototype Methods */
	
	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(5);
	
	module.exports = Promise;
	Promise.prototype['finally'] = function (f) {
	  return this.then(function (value) {
	    return Promise.resolve(f()).then(function () {
	      return value;
	    });
	  }, function (err) {
	    return Promise.resolve(f()).then(function () {
	      throw err;
	    });
	  });
	};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(5);
	__webpack_require__(59);
	__webpack_require__(61);
	__webpack_require__(60);
	__webpack_require__(63);
	__webpack_require__(64);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	// This file contains then/promise specific extensions that are only useful
	// for node.js interop
	
	var Promise = __webpack_require__(5);
	var asap = __webpack_require__(36);
	
	module.exports = Promise;
	
	/* Static Functions */
	
	Promise.denodeify = function (fn, argumentCount) {
	  if (
	    typeof argumentCount === 'number' && argumentCount !== Infinity
	  ) {
	    return denodeifyWithCount(fn, argumentCount);
	  } else {
	    return denodeifyWithoutCount(fn);
	  }
	};
	
	var callbackFn = (
	  'function (err, res) {' +
	  'if (err) { rj(err); } else { rs(res); }' +
	  '}'
	);
	function denodeifyWithCount(fn, argumentCount) {
	  var args = [];
	  for (var i = 0; i < argumentCount; i++) {
	    args.push('a' + i);
	  }
	  var body = [
	    'return function (' + args.join(',') + ') {',
	    'var self = this;',
	    'return new Promise(function (rs, rj) {',
	    'var res = fn.call(',
	    ['self'].concat(args).concat([callbackFn]).join(','),
	    ');',
	    'if (res &&',
	    '(typeof res === "object" || typeof res === "function") &&',
	    'typeof res.then === "function"',
	    ') {rs(res);}',
	    '});',
	    '};'
	  ].join('');
	  return Function(['Promise', 'fn'], body)(Promise, fn);
	}
	function denodeifyWithoutCount(fn) {
	  var fnLength = Math.max(fn.length - 1, 3);
	  var args = [];
	  for (var i = 0; i < fnLength; i++) {
	    args.push('a' + i);
	  }
	  var body = [
	    'return function (' + args.join(',') + ') {',
	    'var self = this;',
	    'var args;',
	    'var argLength = arguments.length;',
	    'if (arguments.length > ' + fnLength + ') {',
	    'args = new Array(arguments.length + 1);',
	    'for (var i = 0; i < arguments.length; i++) {',
	    'args[i] = arguments[i];',
	    '}',
	    '}',
	    'return new Promise(function (rs, rj) {',
	    'var cb = ' + callbackFn + ';',
	    'var res;',
	    'switch (argLength) {',
	    args.concat(['extra']).map(function (_, index) {
	      return (
	        'case ' + (index) + ':' +
	        'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' +
	        'break;'
	      );
	    }).join(''),
	    'default:',
	    'args[argLength] = cb;',
	    'res = fn.apply(self, args);',
	    '}',
	    
	    'if (res &&',
	    '(typeof res === "object" || typeof res === "function") &&',
	    'typeof res.then === "function"',
	    ') {rs(res);}',
	    '});',
	    '};'
	  ].join('');
	
	  return Function(
	    ['Promise', 'fn'],
	    body
	  )(Promise, fn);
	}
	
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback =
	      typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    var ctx = this;
	    try {
	      return fn.apply(this, arguments).nodeify(callback, ctx);
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) {
	          reject(ex);
	        });
	      } else {
	        asap(function () {
	          callback.call(ctx, ex);
	        })
	      }
	    }
	  }
	};
	
	Promise.prototype.nodeify = function (callback, ctx) {
	  if (typeof callback != 'function') return this;
	
	  this.then(function (value) {
	    asap(function () {
	      callback.call(ctx, null, value);
	    });
	  }, function (err) {
	    asap(function () {
	      callback.call(ctx, err);
	    });
	  });
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Promise = __webpack_require__(5);
	
	module.exports = Promise;
	Promise.enableSynchronous = function () {
	  Promise.prototype.isPending = function() {
	    return this.getState() == 0;
	  };
	
	  Promise.prototype.isFulfilled = function() {
	    return this.getState() == 1;
	  };
	
	  Promise.prototype.isRejected = function() {
	    return this.getState() == 2;
	  };
	
	  Promise.prototype.getValue = function () {
	    if (this._65 === 3) {
	      return this._55.getValue();
	    }
	
	    if (!this.isFulfilled()) {
	      throw new Error('Cannot get a value of an unfulfilled promise.');
	    }
	
	    return this._55;
	  };
	
	  Promise.prototype.getReason = function () {
	    if (this._65 === 3) {
	      return this._55.getReason();
	    }
	
	    if (!this.isRejected()) {
	      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
	    }
	
	    return this._55;
	  };
	
	  Promise.prototype.getState = function () {
	    if (this._65 === 3) {
	      return this._55.getState();
	    }
	    if (this._65 === -1 || this._65 === -2) {
	      return 0;
	    }
	
	    return this._65;
	  };
	};
	
	Promise.disableSynchronous = function() {
	  Promise.prototype.isPending = undefined;
	  Promise.prototype.isFulfilled = undefined;
	  Promise.prototype.isRejected = undefined;
	  Promise.prototype.getValue = undefined;
	  Promise.prototype.getReason = undefined;
	  Promise.prototype.getState = undefined;
	};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.npm_package_name === 'pseudomap' &&
	    process.env.npm_lifecycle_script === 'test')
	  process.env.TEST_PSEUDOMAP = 'true'
	
	if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
	  module.exports = Map
	} else {
	  module.exports = __webpack_require__(66)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	module.exports = PseudoMap
	
	function PseudoMap (set) {
	  if (!(this instanceof PseudoMap)) // whyyyyyyy
	    throw new TypeError("Constructor PseudoMap requires 'new'")
	
	  this.clear()
	
	  if (set) {
	    if ((set instanceof PseudoMap) ||
	        (typeof Map === 'function' && set instanceof Map))
	      set.forEach(function (value, key) {
	        this.set(key, value)
	      }, this)
	    else if (Array.isArray(set))
	      set.forEach(function (kv) {
	        this.set(kv[0], kv[1])
	      }, this)
	    else
	      throw new TypeError('invalid argument')
	  }
	}
	
	PseudoMap.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this
	  Object.keys(this._data).forEach(function (k) {
	    if (k !== 'size')
	      fn.call(thisp, this._data[k].value, this._data[k].key)
	  }, this)
	}
	
	PseudoMap.prototype.has = function (k) {
	  return !!find(this._data, k)
	}
	
	PseudoMap.prototype.get = function (k) {
	  var res = find(this._data, k)
	  return res && res.value
	}
	
	PseudoMap.prototype.set = function (k, v) {
	  set(this._data, k, v)
	}
	
	PseudoMap.prototype.delete = function (k) {
	  var res = find(this._data, k)
	  if (res) {
	    delete this._data[res._index]
	    this._data.size--
	  }
	}
	
	PseudoMap.prototype.clear = function () {
	  var data = Object.create(null)
	  data.size = 0
	
	  Object.defineProperty(this, '_data', {
	    value: data,
	    enumerable: false,
	    configurable: true,
	    writable: false
	  })
	}
	
	Object.defineProperty(PseudoMap.prototype, 'size', {
	  get: function () {
	    return this._data.size
	  },
	  set: function (n) {},
	  enumerable: true,
	  configurable: true
	})
	
	PseudoMap.prototype.values =
	PseudoMap.prototype.keys =
	PseudoMap.prototype.entries = function () {
	  throw new Error('iterators are not implemented in this version')
	}
	
	// Either identical, or both NaN
	function same (a, b) {
	  return a === b || a !== a && b !== b
	}
	
	function Entry (k, v, i) {
	  this.key = k
	  this.value = v
	  this._index = i
	}
	
	function find (data, k) {
	  for (var i = 0, s = '_' + k, key = s;
	       hasOwnProperty.call(data, key);
	       key = s + i++) {
	    if (same(data[key].key, k))
	      return data[key]
	  }
	}
	
	function set (data, k, v) {
	  for (var i = 0, s = '_' + k, key = s;
	       hasOwnProperty.call(data, key);
	       key = s + i++) {
	    if (same(data[key].key, k)) {
	      data[key].value = v
	      return
	    }
	  }
	  data.size++
	  data[key] = new Entry(k, v, key)
	}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	'use strict';
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(29);
	
	/*<replacement>*/
	var util = __webpack_require__(6);
	util.inherits = __webpack_require__(2);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*<replacement>*/
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Buffer = __webpack_require__(9).Buffer;
	/*</replacement>*/
	
	function copyBuffer(src, target, offset) {
	  src.copy(target, offset);
	}
	
	module.exports = function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);
	
	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }
	
	  BufferList.prototype.push = function push(v) {
	    var entry = { data: v, next: null };
	    if (this.length > 0) this.tail.next = entry;else this.head = entry;
	    this.tail = entry;
	    ++this.length;
	  };
	
	  BufferList.prototype.unshift = function unshift(v) {
	    var entry = { data: v, next: this.head };
	    if (this.length === 0) this.tail = entry;
	    this.head = entry;
	    ++this.length;
	  };
	
	  BufferList.prototype.shift = function shift() {
	    if (this.length === 0) return;
	    var ret = this.head.data;
	    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	    --this.length;
	    return ret;
	  };
	
	  BufferList.prototype.clear = function clear() {
	    this.head = this.tail = null;
	    this.length = 0;
	  };
	
	  BufferList.prototype.join = function join(s) {
	    if (this.length === 0) return '';
	    var p = this.head;
	    var ret = '' + p.data;
	    while (p = p.next) {
	      ret += s + p.data;
	    }return ret;
	  };
	
	  BufferList.prototype.concat = function concat(n) {
	    if (this.length === 0) return Buffer.alloc(0);
	    if (this.length === 1) return this.head.data;
	    var ret = Buffer.allocUnsafe(n >>> 0);
	    var p = this.head;
	    var i = 0;
	    while (p) {
	      copyBuffer(p.data, ret, i);
	      i += p.data.length;
	      p = p.next;
	    }
	    return ret;
	  };
	
	  return BufferList;
	}();

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).PassThrough


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).Transform


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ }),
/* 73 */
/***/ (function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */
	
	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];
	
	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * reveal.js
	 * http://lab.hakim.se/reveal-js
	 * MIT licensed
	 *
	 * Copyright (C) 2017 Hakim El Hattab, http://hakim.se
	 */
	(function( root, factory ) {
		if( true ) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				root.Reveal = factory();
				return root.Reveal;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if( typeof exports === 'object' ) {
			// Node. Does not work with strict CommonJS.
			module.exports = factory();
		} else {
			// Browser globals.
			root.Reveal = factory();
		}
	}( this, function() {
	
		'use strict';
	
		var Reveal;
	
		// The reveal.js version
		var VERSION = '3.5.0';
	
		var SLIDES_SELECTOR = '.slides section',
			HORIZONTAL_SLIDES_SELECTOR = '.slides>section',
			VERTICAL_SLIDES_SELECTOR = '.slides>section.present>section',
			HOME_SLIDE_SELECTOR = '.slides>section:first-of-type',
			UA = navigator.userAgent,
	
			// Configuration defaults, can be overridden at initialization time
			config = {
	
				// The "normal" size of the presentation, aspect ratio will be preserved
				// when the presentation is scaled to fit different resolutions
				width: 960,
				height: 700,
	
				// Factor of the display size that should remain empty around the content
				margin: 0.04,
	
				// Bounds for smallest/largest possible scale to apply to content
				minScale: 0.2,
				maxScale: 2.0,
	
				// Display controls in the bottom right corner
				controls: true,
	
				// Display a presentation progress bar
				progress: true,
	
				// Display the page number of the current slide
				slideNumber: false,
	
				// Determine which displays to show the slide number on
				showSlideNumber: 'all',
	
				// Push each slide change to the browser history
				history: false,
	
				// Enable keyboard shortcuts for navigation
				keyboard: true,
	
				// Optional function that blocks keyboard events when retuning false
				keyboardCondition: null,
	
				// Enable the slide overview mode
				overview: true,
	
				// Vertical centering of slides
				center: true,
	
				// Enables touch navigation on devices with touch input
				touch: true,
	
				// Loop the presentation
				loop: false,
	
				// Change the presentation direction to be RTL
				rtl: false,
	
				// Randomizes the order of slides each time the presentation loads
				shuffle: false,
	
				// Turns fragments on and off globally
				fragments: true,
	
				// Flags if the presentation is running in an embedded mode,
				// i.e. contained within a limited portion of the screen
				embedded: false,
	
				// Flags if we should show a help overlay when the question-mark
				// key is pressed
				help: true,
	
				// Flags if it should be possible to pause the presentation (blackout)
				pause: true,
	
				// Flags if speaker notes should be visible to all viewers
				showNotes: false,
	
				// Global override for autolaying embedded media (video/audio/iframe)
				// - null: Media will only autoplay if data-autoplay is present
				// - true: All media will autoplay, regardless of individual setting
				// - false: No media will autoplay, regardless of individual setting
				autoPlayMedia: null,
	
				// Number of milliseconds between automatically proceeding to the
				// next slide, disabled when set to 0, this value can be overwritten
				// by using a data-autoslide attribute on your slides
				autoSlide: 0,
	
				// Stop auto-sliding after user input
				autoSlideStoppable: true,
	
				// Use this method for navigation when auto-sliding (defaults to navigateNext)
				autoSlideMethod: null,
	
				// Enable slide navigation via mouse wheel
				mouseWheel: false,
	
				// Apply a 3D roll to links on hover
				rollingLinks: false,
	
				// Hides the address bar on mobile devices
				hideAddressBar: true,
	
				// Opens links in an iframe preview overlay
				previewLinks: false,
	
				// Exposes the reveal.js API through window.postMessage
				postMessage: true,
	
				// Dispatches all reveal.js events to the parent window through postMessage
				postMessageEvents: false,
	
				// Focuses body when page changes visibility to ensure keyboard shortcuts work
				focusBodyOnPageVisibilityChange: true,
	
				// Transition style
				transition: 'slide', // none/fade/slide/convex/concave/zoom
	
				// Transition speed
				transitionSpeed: 'default', // default/fast/slow
	
				// Transition style for full page slide backgrounds
				backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
	
				// Parallax background image
				parallaxBackgroundImage: '', // CSS syntax, e.g. "a.jpg"
	
				// Parallax background size
				parallaxBackgroundSize: '', // CSS syntax, e.g. "3000px 2000px"
	
				// Amount of pixels to move the parallax background per slide step
				parallaxBackgroundHorizontal: null,
				parallaxBackgroundVertical: null,
	
				// The maximum number of pages a single slide can expand onto when printing
				// to PDF, unlimited by default
				pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,
	
				// Offset used to reduce the height of content within exported PDF pages.
				// This exists to account for environment differences based on how you
				// print to PDF. CLI printing options, like phantomjs and wkpdf, can end
				// on precisely the total height of the document whereas in-browser
				// printing has to end one pixel before.
				pdfPageHeightOffset: -1,
	
				// Number of slides away from the current that are visible
				viewDistance: 3,
	
				// The display mode that will be used to show slides
				display: 'block',
	
				// Script dependencies to load
				dependencies: []
	
			},
	
			// Flags if Reveal.initialize() has been called
			initialized = false,
	
			// Flags if reveal.js is loaded (has dispatched the 'ready' event)
			loaded = false,
	
			// Flags if the overview mode is currently active
			overview = false,
	
			// Holds the dimensions of our overview slides, including margins
			overviewSlideWidth = null,
			overviewSlideHeight = null,
	
			// The horizontal and vertical index of the currently active slide
			indexh,
			indexv,
	
			// The previous and current slide HTML elements
			previousSlide,
			currentSlide,
	
			previousBackground,
	
			// Slides may hold a data-state attribute which we pick up and apply
			// as a class to the body. This list contains the combined state of
			// all current slides.
			state = [],
	
			// The current scale of the presentation (see width/height config)
			scale = 1,
	
			// CSS transform that is currently applied to the slides container,
			// split into two groups
			slidesTransform = { layout: '', overview: '' },
	
			// Cached references to DOM elements
			dom = {},
	
			// Features supported by the browser, see #checkCapabilities()
			features = {},
	
			// Client is a mobile device, see #checkCapabilities()
			isMobileDevice,
	
			// Client is a desktop Chrome, see #checkCapabilities()
			isChrome,
	
			// Throttles mouse wheel navigation
			lastMouseWheelStep = 0,
	
			// Delays updates to the URL due to a Chrome thumbnailer bug
			writeURLTimeout = 0,
	
			// Flags if the interaction event listeners are bound
			eventsAreBound = false,
	
			// The current auto-slide duration
			autoSlide = 0,
	
			// Auto slide properties
			autoSlidePlayer,
			autoSlideTimeout = 0,
			autoSlideStartTime = -1,
			autoSlidePaused = false,
	
			// Holds information about the currently ongoing touch input
			touch = {
				startX: 0,
				startY: 0,
				startSpan: 0,
				startCount: 0,
				captured: false,
				threshold: 40
			},
	
			// Holds information about the keyboard shortcuts
			keyboardShortcuts = {
				'N  ,  SPACE':			'Next slide',
				'P':					'Previous slide',
				'&#8592;  ,  H':		'Navigate left',
				'&#8594;  ,  L':		'Navigate right',
				'&#8593;  ,  K':		'Navigate up',
				'&#8595;  ,  J':		'Navigate down',
				'Home':					'First slide',
				'End':					'Last slide',
				'B  ,  .':				'Pause',
				'F':					'Fullscreen',
				'ESC, O':				'Slide overview'
			};
	
		/**
		 * Starts up the presentation if the client is capable.
		 */
		function initialize( options ) {
	
			// Make sure we only initialize once
			if( initialized === true ) return;
	
			initialized = true;
	
			checkCapabilities();
	
			if( !features.transforms2d && !features.transforms3d ) {
				document.body.setAttribute( 'class', 'no-transforms' );
	
				// Since JS won't be running any further, we load all lazy
				// loading elements upfront
				var images = toArray( document.getElementsByTagName( 'img' ) ),
					iframes = toArray( document.getElementsByTagName( 'iframe' ) );
	
				var lazyLoadable = images.concat( iframes );
	
				for( var i = 0, len = lazyLoadable.length; i < len; i++ ) {
					var element = lazyLoadable[i];
					if( element.getAttribute( 'data-src' ) ) {
						element.setAttribute( 'src', element.getAttribute( 'data-src' ) );
						element.removeAttribute( 'data-src' );
					}
				}
	
				// If the browser doesn't support core features we won't be
				// using JavaScript to control the presentation
				return;
			}
	
			// Cache references to key DOM elements
			dom.wrapper = document.querySelector( '.reveal' );
			dom.slides = document.querySelector( '.reveal .slides' );
	
			// Force a layout when the whole page, incl fonts, has loaded
			window.addEventListener( 'load', layout, false );
	
			var query = Reveal.getQueryHash();
	
			// Do not accept new dependencies via query config to avoid
			// the potential of malicious script injection
			if( typeof query['dependencies'] !== 'undefined' ) delete query['dependencies'];
	
			// Copy options over to our config object
			extend( config, options );
			extend( config, query );
	
			// Hide the address bar in mobile browsers
			hideAddressBar();
	
			// Loads the dependencies and continues to #start() once done
			load();
	
		}
	
		/**
		 * Inspect the client to see what it's capable of, this
		 * should only happens once per runtime.
		 */
		function checkCapabilities() {
	
			isMobileDevice = /(iphone|ipod|ipad|android)/gi.test( UA );
			isChrome = /chrome/i.test( UA ) && !/edge/i.test( UA );
	
			var testElement = document.createElement( 'div' );
	
			features.transforms3d = 'WebkitPerspective' in testElement.style ||
									'MozPerspective' in testElement.style ||
									'msPerspective' in testElement.style ||
									'OPerspective' in testElement.style ||
									'perspective' in testElement.style;
	
			features.transforms2d = 'WebkitTransform' in testElement.style ||
									'MozTransform' in testElement.style ||
									'msTransform' in testElement.style ||
									'OTransform' in testElement.style ||
									'transform' in testElement.style;
	
			features.requestAnimationFrameMethod = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
			features.requestAnimationFrame = typeof features.requestAnimationFrameMethod === 'function';
	
			features.canvas = !!document.createElement( 'canvas' ).getContext;
	
			// Transitions in the overview are disabled in desktop and
			// Safari due to lag
			features.overviewTransitions = !/Version\/[\d\.]+.*Safari/.test( UA );
	
			// Flags if we should use zoom instead of transform to scale
			// up slides. Zoom produces crisper results but has a lot of
			// xbrowser quirks so we only use it in whitelsited browsers.
			features.zoom = 'zoom' in testElement.style && !isMobileDevice &&
							( isChrome || /Version\/[\d\.]+.*Safari/.test( UA ) );
	
		}
	
	    /**
	     * Loads the dependencies of reveal.js. Dependencies are
	     * defined via the configuration option 'dependencies'
	     * and will be loaded prior to starting/binding reveal.js.
	     * Some dependencies may have an 'async' flag, if so they
	     * will load after reveal.js has been started up.
	     */
		function load() {
	
			var scripts = [],
				scriptsAsync = [],
				scriptsToPreload = 0;
	
			// Called once synchronous scripts finish loading
			function proceed() {
				if( scriptsAsync.length ) {
					// Load asynchronous scripts
					head.js.apply( null, scriptsAsync );
				}
	
				start();
			}
	
			function loadScript( s ) {
				head.ready( s.src.match( /([\w\d_\-]*)\.?js$|[^\\\/]*$/i )[0], function() {
					// Extension may contain callback functions
					if( typeof s.callback === 'function' ) {
						s.callback.apply( this );
					}
	
					if( --scriptsToPreload === 0 ) {
						proceed();
					}
				});
			}
	
			for( var i = 0, len = config.dependencies.length; i < len; i++ ) {
				var s = config.dependencies[i];
	
				// Load if there's no condition or the condition is truthy
				if( !s.condition || s.condition() ) {
					if( s.async ) {
						scriptsAsync.push( s.src );
					}
					else {
						scripts.push( s.src );
					}
	
					loadScript( s );
				}
			}
	
			if( scripts.length ) {
				scriptsToPreload = scripts.length;
	
				// Load synchronous scripts
				head.js.apply( null, scripts );
			}
			else {
				proceed();
			}
	
		}
	
		/**
		 * Starts up reveal.js by binding input events and navigating
		 * to the current URL deeplink if there is one.
		 */
		function start() {
	
			// Make sure we've got all the DOM elements we need
			setupDOM();
	
			// Listen to messages posted to this window
			setupPostMessage();
	
			// Prevent the slides from being scrolled out of view
			setupScrollPrevention();
	
			// Resets all vertical slides so that only the first is visible
			resetVerticalSlides();
	
			// Updates the presentation to match the current configuration values
			configure();
	
			// Read the initial hash
			readURL();
	
			// Update all backgrounds
			updateBackground( true );
	
			// Notify listeners that the presentation is ready but use a 1ms
			// timeout to ensure it's not fired synchronously after #initialize()
			setTimeout( function() {
				// Enable transitions now that we're loaded
				dom.slides.classList.remove( 'no-transition' );
	
				loaded = true;
	
				dom.wrapper.classList.add( 'ready' );
	
				dispatchEvent( 'ready', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				} );
			}, 1 );
	
			// Special setup and config is required when printing to PDF
			if( isPrintingPDF() ) {
				removeEventListeners();
	
				// The document needs to have loaded for the PDF layout
				// measurements to be accurate
				if( document.readyState === 'complete' ) {
					setupPDF();
				}
				else {
					window.addEventListener( 'load', setupPDF );
				}
			}
	
		}
	
		/**
		 * Finds and stores references to DOM elements which are
		 * required by the presentation. If a required element is
		 * not found, it is created.
		 */
		function setupDOM() {
	
			// Prevent transitions while we're loading
			dom.slides.classList.add( 'no-transition' );
	
			// Background element
			dom.background = createSingletonNode( dom.wrapper, 'div', 'backgrounds', null );
	
			// Progress bar
			dom.progress = createSingletonNode( dom.wrapper, 'div', 'progress', '<span></span>' );
			dom.progressbar = dom.progress.querySelector( 'span' );
	
			// Arrow controls
			createSingletonNode( dom.wrapper, 'aside', 'controls',
				'<button class="navigate-left" aria-label="previous slide"></button>' +
				'<button class="navigate-right" aria-label="next slide"></button>' +
				'<button class="navigate-up" aria-label="above slide"></button>' +
				'<button class="navigate-down" aria-label="below slide"></button>' );
	
			// Slide number
			dom.slideNumber = createSingletonNode( dom.wrapper, 'div', 'slide-number', '' );
	
			// Element containing notes that are visible to the audience
			dom.speakerNotes = createSingletonNode( dom.wrapper, 'div', 'speaker-notes', null );
			dom.speakerNotes.setAttribute( 'data-prevent-swipe', '' );
			dom.speakerNotes.setAttribute( 'tabindex', '0' );
	
			// Overlay graphic which is displayed during the paused mode
			createSingletonNode( dom.wrapper, 'div', 'pause-overlay', null );
	
			// Cache references to elements
			dom.controls = document.querySelector( '.reveal .controls' );
	
			dom.wrapper.setAttribute( 'role', 'application' );
	
			// There can be multiple instances of controls throughout the page
			dom.controlsLeft = toArray( document.querySelectorAll( '.navigate-left' ) );
			dom.controlsRight = toArray( document.querySelectorAll( '.navigate-right' ) );
			dom.controlsUp = toArray( document.querySelectorAll( '.navigate-up' ) );
			dom.controlsDown = toArray( document.querySelectorAll( '.navigate-down' ) );
			dom.controlsPrev = toArray( document.querySelectorAll( '.navigate-prev' ) );
			dom.controlsNext = toArray( document.querySelectorAll( '.navigate-next' ) );
	
			dom.statusDiv = createStatusDiv();
		}
	
		/**
		 * Creates a hidden div with role aria-live to announce the
		 * current slide content. Hide the div off-screen to make it
		 * available only to Assistive Technologies.
		 *
		 * @return {HTMLElement}
		 */
		function createStatusDiv() {
	
			var statusDiv = document.getElementById( 'aria-status-div' );
			if( !statusDiv ) {
				statusDiv = document.createElement( 'div' );
				statusDiv.style.position = 'absolute';
				statusDiv.style.height = '1px';
				statusDiv.style.width = '1px';
				statusDiv.style.overflow = 'hidden';
				statusDiv.style.clip = 'rect( 1px, 1px, 1px, 1px )';
				statusDiv.setAttribute( 'id', 'aria-status-div' );
				statusDiv.setAttribute( 'aria-live', 'polite' );
				statusDiv.setAttribute( 'aria-atomic','true' );
				dom.wrapper.appendChild( statusDiv );
			}
			return statusDiv;
	
		}
	
		/**
		 * Converts the given HTML element into a string of text
		 * that can be announced to a screen reader. Hidden
		 * elements are excluded.
		 */
		function getStatusText( node ) {
	
			var text = '';
	
			// Text node
			if( node.nodeType === 3 ) {
				text += node.textContent;
			}
			// Element node
			else if( node.nodeType === 1 ) {
	
				var isAriaHidden = node.getAttribute( 'aria-hidden' );
				var isDisplayHidden = window.getComputedStyle( node )['display'] === 'none';
				if( isAriaHidden !== 'true' && !isDisplayHidden ) {
	
					toArray( node.childNodes ).forEach( function( child ) {
						text += getStatusText( child );
					} );
	
				}
	
			}
	
			return text;
	
		}
	
		/**
		 * Configures the presentation for printing to a static
		 * PDF.
		 */
		function setupPDF() {
	
			var slideSize = getComputedSlideSize( window.innerWidth, window.innerHeight );
	
			// Dimensions of the PDF pages
			var pageWidth = Math.floor( slideSize.width * ( 1 + config.margin ) ),
				pageHeight = Math.floor( slideSize.height * ( 1 + config.margin ) );
	
			// Dimensions of slides within the pages
			var slideWidth = slideSize.width,
				slideHeight = slideSize.height;
	
			// Let the browser know what page size we want to print
			injectStyleSheet( '@page{size:'+ pageWidth +'px '+ pageHeight +'px; margin: 0px;}' );
	
			// Limit the size of certain elements to the dimensions of the slide
			injectStyleSheet( '.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: '+ slideWidth +'px; max-height:'+ slideHeight +'px}' );
	
			document.body.classList.add( 'print-pdf' );
			document.body.style.width = pageWidth + 'px';
			document.body.style.height = pageHeight + 'px';
	
			// Make sure stretch elements fit on slide
			layoutSlideContents( slideWidth, slideHeight );
	
			// Add each slide's index as attributes on itself, we need these
			// indices to generate slide numbers below
			toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( hslide, h ) {
				hslide.setAttribute( 'data-index-h', h );
	
				if( hslide.classList.contains( 'stack' ) ) {
					toArray( hslide.querySelectorAll( 'section' ) ).forEach( function( vslide, v ) {
						vslide.setAttribute( 'data-index-h', h );
						vslide.setAttribute( 'data-index-v', v );
					} );
				}
			} );
	
			// Slide and slide background layout
			toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {
	
				// Vertical stacks are not centred since their section
				// children will be
				if( slide.classList.contains( 'stack' ) === false ) {
					// Center the slide inside of the page, giving the slide some margin
					var left = ( pageWidth - slideWidth ) / 2,
						top = ( pageHeight - slideHeight ) / 2;
	
					var contentHeight = slide.scrollHeight;
					var numberOfPages = Math.max( Math.ceil( contentHeight / pageHeight ), 1 );
	
					// Adhere to configured pages per slide limit
					numberOfPages = Math.min( numberOfPages, config.pdfMaxPagesPerSlide );
	
					// Center slides vertically
					if( numberOfPages === 1 && config.center || slide.classList.contains( 'center' ) ) {
						top = Math.max( ( pageHeight - contentHeight ) / 2, 0 );
					}
	
					// Wrap the slide in a page element and hide its overflow
					// so that no page ever flows onto another
					var page = document.createElement( 'div' );
					page.className = 'pdf-page';
					page.style.height = ( ( pageHeight + config.pdfPageHeightOffset ) * numberOfPages ) + 'px';
					slide.parentNode.insertBefore( page, slide );
					page.appendChild( slide );
	
					// Position the slide inside of the page
					slide.style.left = left + 'px';
					slide.style.top = top + 'px';
					slide.style.width = slideWidth + 'px';
	
					if( slide.slideBackgroundElement ) {
						page.insertBefore( slide.slideBackgroundElement, slide );
					}
	
					// Inject notes if `showNotes` is enabled
					if( config.showNotes ) {
	
						// Are there notes for this slide?
						var notes = getSlideNotes( slide );
						if( notes ) {
	
							var notesSpacing = 8;
							var notesLayout = typeof config.showNotes === 'string' ? config.showNotes : 'inline';
							var notesElement = document.createElement( 'div' );
							notesElement.classList.add( 'speaker-notes' );
							notesElement.classList.add( 'speaker-notes-pdf' );
							notesElement.setAttribute( 'data-layout', notesLayout );
							notesElement.innerHTML = notes;
	
							if( notesLayout === 'separate-page' ) {
								page.parentNode.insertBefore( notesElement, page.nextSibling );
							}
							else {
								notesElement.style.left = notesSpacing + 'px';
								notesElement.style.bottom = notesSpacing + 'px';
								notesElement.style.width = ( pageWidth - notesSpacing*2 ) + 'px';
								page.appendChild( notesElement );
							}
	
						}
	
					}
	
					// Inject slide numbers if `slideNumbers` are enabled
					if( config.slideNumber && /all|print/i.test( config.showSlideNumber ) ) {
						var slideNumberH = parseInt( slide.getAttribute( 'data-index-h' ), 10 ) + 1,
							slideNumberV = parseInt( slide.getAttribute( 'data-index-v' ), 10 ) + 1;
	
						var numberElement = document.createElement( 'div' );
						numberElement.classList.add( 'slide-number' );
						numberElement.classList.add( 'slide-number-pdf' );
						numberElement.innerHTML = formatSlideNumber( slideNumberH, '.', slideNumberV );
						page.appendChild( numberElement );
					}
				}
	
			} );
	
			// Show all fragments
			toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ' .fragment' ) ).forEach( function( fragment ) {
				fragment.classList.add( 'visible' );
			} );
	
			// Notify subscribers that the PDF layout is good to go
			dispatchEvent( 'pdf-ready' );
	
		}
	
		/**
		 * This is an unfortunate necessity. Some actions – such as
		 * an input field being focused in an iframe or using the
		 * keyboard to expand text selection beyond the bounds of
		 * a slide – can trigger our content to be pushed out of view.
		 * This scrolling can not be prevented by hiding overflow in
		 * CSS (we already do) so we have to resort to repeatedly
		 * checking if the slides have been offset :(
		 */
		function setupScrollPrevention() {
	
			setInterval( function() {
				if( dom.wrapper.scrollTop !== 0 || dom.wrapper.scrollLeft !== 0 ) {
					dom.wrapper.scrollTop = 0;
					dom.wrapper.scrollLeft = 0;
				}
			}, 1000 );
	
		}
	
		/**
		 * Creates an HTML element and returns a reference to it.
		 * If the element already exists the existing instance will
		 * be returned.
		 *
		 * @param {HTMLElement} container
		 * @param {string} tagname
		 * @param {string} classname
		 * @param {string} innerHTML
		 *
		 * @return {HTMLElement}
		 */
		function createSingletonNode( container, tagname, classname, innerHTML ) {
	
			// Find all nodes matching the description
			var nodes = container.querySelectorAll( '.' + classname );
	
			// Check all matches to find one which is a direct child of
			// the specified container
			for( var i = 0; i < nodes.length; i++ ) {
				var testNode = nodes[i];
				if( testNode.parentNode === container ) {
					return testNode;
				}
			}
	
			// If no node was found, create it now
			var node = document.createElement( tagname );
			node.classList.add( classname );
			if( typeof innerHTML === 'string' ) {
				node.innerHTML = innerHTML;
			}
			container.appendChild( node );
	
			return node;
	
		}
	
		/**
		 * Creates the slide background elements and appends them
		 * to the background container. One element is created per
		 * slide no matter if the given slide has visible background.
		 */
		function createBackgrounds() {
	
			var printMode = isPrintingPDF();
	
			// Clear prior backgrounds
			dom.background.innerHTML = '';
			dom.background.classList.add( 'no-transition' );
	
			// Iterate over all horizontal slides
			toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( slideh ) {
	
				var backgroundStack = createBackground( slideh, dom.background );
	
				// Iterate over all vertical slides
				toArray( slideh.querySelectorAll( 'section' ) ).forEach( function( slidev ) {
	
					createBackground( slidev, backgroundStack );
	
					backgroundStack.classList.add( 'stack' );
	
				} );
	
			} );
	
			// Add parallax background if specified
			if( config.parallaxBackgroundImage ) {
	
				dom.background.style.backgroundImage = 'url("' + config.parallaxBackgroundImage + '")';
				dom.background.style.backgroundSize = config.parallaxBackgroundSize;
	
				// Make sure the below properties are set on the element - these properties are
				// needed for proper transitions to be set on the element via CSS. To remove
				// annoying background slide-in effect when the presentation starts, apply
				// these properties after short time delay
				setTimeout( function() {
					dom.wrapper.classList.add( 'has-parallax-background' );
				}, 1 );
	
			}
			else {
	
				dom.background.style.backgroundImage = '';
				dom.wrapper.classList.remove( 'has-parallax-background' );
	
			}
	
		}
	
		/**
		 * Creates a background for the given slide.
		 *
		 * @param {HTMLElement} slide
		 * @param {HTMLElement} container The element that the background
		 * should be appended to
		 * @return {HTMLElement} New background div
		 */
		function createBackground( slide, container ) {
	
			var data = {
				background: slide.getAttribute( 'data-background' ),
				backgroundSize: slide.getAttribute( 'data-background-size' ),
				backgroundImage: slide.getAttribute( 'data-background-image' ),
				backgroundVideo: slide.getAttribute( 'data-background-video' ),
				backgroundIframe: slide.getAttribute( 'data-background-iframe' ),
				backgroundColor: slide.getAttribute( 'data-background-color' ),
				backgroundRepeat: slide.getAttribute( 'data-background-repeat' ),
				backgroundPosition: slide.getAttribute( 'data-background-position' ),
				backgroundTransition: slide.getAttribute( 'data-background-transition' )
			};
	
			var element = document.createElement( 'div' );
	
			// Carry over custom classes from the slide to the background
			element.className = 'slide-background ' + slide.className.replace( /present|past|future/, '' );
	
			if( data.background ) {
				// Auto-wrap image urls in url(...)
				if( /^(http|file|\/\/)/gi.test( data.background ) || /\.(svg|png|jpg|jpeg|gif|bmp)([?#]|$)/gi.test( data.background ) ) {
					slide.setAttribute( 'data-background-image', data.background );
				}
				else {
					element.style.background = data.background;
				}
			}
	
			// Create a hash for this combination of background settings.
			// This is used to determine when two slide backgrounds are
			// the same.
			if( data.background || data.backgroundColor || data.backgroundImage || data.backgroundVideo || data.backgroundIframe ) {
				element.setAttribute( 'data-background-hash', data.background +
																data.backgroundSize +
																data.backgroundImage +
																data.backgroundVideo +
																data.backgroundIframe +
																data.backgroundColor +
																data.backgroundRepeat +
																data.backgroundPosition +
																data.backgroundTransition );
			}
	
			// Additional and optional background properties
			if( data.backgroundSize ) element.style.backgroundSize = data.backgroundSize;
			if( data.backgroundSize ) element.setAttribute( 'data-background-size', data.backgroundSize );
			if( data.backgroundColor ) element.style.backgroundColor = data.backgroundColor;
			if( data.backgroundRepeat ) element.style.backgroundRepeat = data.backgroundRepeat;
			if( data.backgroundPosition ) element.style.backgroundPosition = data.backgroundPosition;
			if( data.backgroundTransition ) element.setAttribute( 'data-background-transition', data.backgroundTransition );
	
			container.appendChild( element );
	
			// If backgrounds are being recreated, clear old classes
			slide.classList.remove( 'has-dark-background' );
			slide.classList.remove( 'has-light-background' );
	
			slide.slideBackgroundElement = element;
	
			// If this slide has a background color, add a class that
			// signals if it is light or dark. If the slide has no background
			// color, no class will be set
			var computedBackgroundStyle = window.getComputedStyle( element );
			if( computedBackgroundStyle && computedBackgroundStyle.backgroundColor ) {
				var rgb = colorToRgb( computedBackgroundStyle.backgroundColor );
	
				// Ignore fully transparent backgrounds. Some browsers return
				// rgba(0,0,0,0) when reading the computed background color of
				// an element with no background
				if( rgb && rgb.a !== 0 ) {
					if( colorBrightness( computedBackgroundStyle.backgroundColor ) < 128 ) {
						slide.classList.add( 'has-dark-background' );
					}
					else {
						slide.classList.add( 'has-light-background' );
					}
				}
			}
	
			return element;
	
		}
	
		/**
		 * Registers a listener to postMessage events, this makes it
		 * possible to call all reveal.js API methods from another
		 * window. For example:
		 *
		 * revealWindow.postMessage( JSON.stringify({
		 *   method: 'slide',
		 *   args: [ 2 ]
		 * }), '*' );
		 */
		function setupPostMessage() {
	
			if( config.postMessage ) {
				window.addEventListener( 'message', function ( event ) {
					var data = event.data;
	
					// Make sure we're dealing with JSON
					if( typeof data === 'string' && data.charAt( 0 ) === '{' && data.charAt( data.length - 1 ) === '}' ) {
						data = JSON.parse( data );
	
						// Check if the requested method can be found
						if( data.method && typeof Reveal[data.method] === 'function' ) {
							Reveal[data.method].apply( Reveal, data.args );
						}
					}
				}, false );
			}
	
		}
	
		/**
		 * Applies the configuration settings from the config
		 * object. May be called multiple times.
		 *
		 * @param {object} options
		 */
		function configure( options ) {
	
			var numberOfSlides = dom.wrapper.querySelectorAll( SLIDES_SELECTOR ).length;
	
			dom.wrapper.classList.remove( config.transition );
	
			// New config options may be passed when this method
			// is invoked through the API after initialization
			if( typeof options === 'object' ) extend( config, options );
	
			// Force linear transition based on browser capabilities
			if( features.transforms3d === false ) config.transition = 'linear';
	
			dom.wrapper.classList.add( config.transition );
	
			dom.wrapper.setAttribute( 'data-transition-speed', config.transitionSpeed );
			dom.wrapper.setAttribute( 'data-background-transition', config.backgroundTransition );
	
			dom.controls.style.display = config.controls ? 'block' : 'none';
			dom.progress.style.display = config.progress ? 'block' : 'none';
	
			if( config.shuffle ) {
				shuffle();
			}
	
			if( config.rtl ) {
				dom.wrapper.classList.add( 'rtl' );
			}
			else {
				dom.wrapper.classList.remove( 'rtl' );
			}
	
			if( config.center ) {
				dom.wrapper.classList.add( 'center' );
			}
			else {
				dom.wrapper.classList.remove( 'center' );
			}
	
			// Exit the paused mode if it was configured off
			if( config.pause === false ) {
				resume();
			}
	
			if( config.showNotes ) {
				dom.speakerNotes.classList.add( 'visible' );
				dom.speakerNotes.setAttribute( 'data-layout', typeof config.showNotes === 'string' ? config.showNotes : 'inline' );
			}
			else {
				dom.speakerNotes.classList.remove( 'visible' );
			}
	
			if( config.mouseWheel ) {
				document.addEventListener( 'DOMMouseScroll', onDocumentMouseScroll, false ); // FF
				document.addEventListener( 'mousewheel', onDocumentMouseScroll, false );
			}
			else {
				document.removeEventListener( 'DOMMouseScroll', onDocumentMouseScroll, false ); // FF
				document.removeEventListener( 'mousewheel', onDocumentMouseScroll, false );
			}
	
			// Rolling 3D links
			if( config.rollingLinks ) {
				enableRollingLinks();
			}
			else {
				disableRollingLinks();
			}
	
			// Iframe link previews
			if( config.previewLinks ) {
				enablePreviewLinks();
				disablePreviewLinks( '[data-preview-link=false]' );
			}
			else {
				disablePreviewLinks();
				enablePreviewLinks( '[data-preview-link]:not([data-preview-link=false])' );
			}
	
			// Remove existing auto-slide controls
			if( autoSlidePlayer ) {
				autoSlidePlayer.destroy();
				autoSlidePlayer = null;
			}
	
			// Generate auto-slide controls if needed
			if( numberOfSlides > 1 && config.autoSlide && config.autoSlideStoppable && features.canvas && features.requestAnimationFrame ) {
				autoSlidePlayer = new Playback( dom.wrapper, function() {
					return Math.min( Math.max( ( Date.now() - autoSlideStartTime ) / autoSlide, 0 ), 1 );
				} );
	
				autoSlidePlayer.on( 'click', onAutoSlidePlayerClick );
				autoSlidePaused = false;
			}
	
			// When fragments are turned off they should be visible
			if( config.fragments === false ) {
				toArray( dom.slides.querySelectorAll( '.fragment' ) ).forEach( function( element ) {
					element.classList.add( 'visible' );
					element.classList.remove( 'current-fragment' );
				} );
			}
	
			// Slide numbers
			var slideNumberDisplay = 'none';
			if( config.slideNumber && !isPrintingPDF() ) {
				if( config.showSlideNumber === 'all' ) {
					slideNumberDisplay = 'block';
				}
				else if( config.showSlideNumber === 'speaker' && isSpeakerNotes() ) {
					slideNumberDisplay = 'block';
				}
			}
	
			dom.slideNumber.style.display = slideNumberDisplay;
	
			sync();
	
		}
	
		/**
		 * Binds all event listeners.
		 */
		function addEventListeners() {
	
			eventsAreBound = true;
	
			window.addEventListener( 'hashchange', onWindowHashChange, false );
			window.addEventListener( 'resize', onWindowResize, false );
	
			if( config.touch ) {
				dom.wrapper.addEventListener( 'touchstart', onTouchStart, false );
				dom.wrapper.addEventListener( 'touchmove', onTouchMove, false );
				dom.wrapper.addEventListener( 'touchend', onTouchEnd, false );
	
				// Support pointer-style touch interaction as well
				if( window.navigator.pointerEnabled ) {
					// IE 11 uses un-prefixed version of pointer events
					dom.wrapper.addEventListener( 'pointerdown', onPointerDown, false );
					dom.wrapper.addEventListener( 'pointermove', onPointerMove, false );
					dom.wrapper.addEventListener( 'pointerup', onPointerUp, false );
				}
				else if( window.navigator.msPointerEnabled ) {
					// IE 10 uses prefixed version of pointer events
					dom.wrapper.addEventListener( 'MSPointerDown', onPointerDown, false );
					dom.wrapper.addEventListener( 'MSPointerMove', onPointerMove, false );
					dom.wrapper.addEventListener( 'MSPointerUp', onPointerUp, false );
				}
			}
	
			if( config.keyboard ) {
				document.addEventListener( 'keydown', onDocumentKeyDown, false );
				document.addEventListener( 'keypress', onDocumentKeyPress, false );
			}
	
			if( config.progress && dom.progress ) {
				dom.progress.addEventListener( 'click', onProgressClicked, false );
			}
	
			if( config.focusBodyOnPageVisibilityChange ) {
				var visibilityChange;
	
				if( 'hidden' in document ) {
					visibilityChange = 'visibilitychange';
				}
				else if( 'msHidden' in document ) {
					visibilityChange = 'msvisibilitychange';
				}
				else if( 'webkitHidden' in document ) {
					visibilityChange = 'webkitvisibilitychange';
				}
	
				if( visibilityChange ) {
					document.addEventListener( visibilityChange, onPageVisibilityChange, false );
				}
			}
	
			// Listen to both touch and click events, in case the device
			// supports both
			var pointerEvents = [ 'touchstart', 'click' ];
	
			// Only support touch for Android, fixes double navigations in
			// stock browser
			if( UA.match( /android/gi ) ) {
				pointerEvents = [ 'touchstart' ];
			}
	
			pointerEvents.forEach( function( eventName ) {
				dom.controlsLeft.forEach( function( el ) { el.addEventListener( eventName, onNavigateLeftClicked, false ); } );
				dom.controlsRight.forEach( function( el ) { el.addEventListener( eventName, onNavigateRightClicked, false ); } );
				dom.controlsUp.forEach( function( el ) { el.addEventListener( eventName, onNavigateUpClicked, false ); } );
				dom.controlsDown.forEach( function( el ) { el.addEventListener( eventName, onNavigateDownClicked, false ); } );
				dom.controlsPrev.forEach( function( el ) { el.addEventListener( eventName, onNavigatePrevClicked, false ); } );
				dom.controlsNext.forEach( function( el ) { el.addEventListener( eventName, onNavigateNextClicked, false ); } );
			} );
	
		}
	
		/**
		 * Unbinds all event listeners.
		 */
		function removeEventListeners() {
	
			eventsAreBound = false;
	
			document.removeEventListener( 'keydown', onDocumentKeyDown, false );
			document.removeEventListener( 'keypress', onDocumentKeyPress, false );
			window.removeEventListener( 'hashchange', onWindowHashChange, false );
			window.removeEventListener( 'resize', onWindowResize, false );
	
			dom.wrapper.removeEventListener( 'touchstart', onTouchStart, false );
			dom.wrapper.removeEventListener( 'touchmove', onTouchMove, false );
			dom.wrapper.removeEventListener( 'touchend', onTouchEnd, false );
	
			// IE11
			if( window.navigator.pointerEnabled ) {
				dom.wrapper.removeEventListener( 'pointerdown', onPointerDown, false );
				dom.wrapper.removeEventListener( 'pointermove', onPointerMove, false );
				dom.wrapper.removeEventListener( 'pointerup', onPointerUp, false );
			}
			// IE10
			else if( window.navigator.msPointerEnabled ) {
				dom.wrapper.removeEventListener( 'MSPointerDown', onPointerDown, false );
				dom.wrapper.removeEventListener( 'MSPointerMove', onPointerMove, false );
				dom.wrapper.removeEventListener( 'MSPointerUp', onPointerUp, false );
			}
	
			if ( config.progress && dom.progress ) {
				dom.progress.removeEventListener( 'click', onProgressClicked, false );
			}
	
			[ 'touchstart', 'click' ].forEach( function( eventName ) {
				dom.controlsLeft.forEach( function( el ) { el.removeEventListener( eventName, onNavigateLeftClicked, false ); } );
				dom.controlsRight.forEach( function( el ) { el.removeEventListener( eventName, onNavigateRightClicked, false ); } );
				dom.controlsUp.forEach( function( el ) { el.removeEventListener( eventName, onNavigateUpClicked, false ); } );
				dom.controlsDown.forEach( function( el ) { el.removeEventListener( eventName, onNavigateDownClicked, false ); } );
				dom.controlsPrev.forEach( function( el ) { el.removeEventListener( eventName, onNavigatePrevClicked, false ); } );
				dom.controlsNext.forEach( function( el ) { el.removeEventListener( eventName, onNavigateNextClicked, false ); } );
			} );
	
		}
	
		/**
		 * Extend object a with the properties of object b.
		 * If there's a conflict, object b takes precedence.
		 *
		 * @param {object} a
		 * @param {object} b
		 */
		function extend( a, b ) {
	
			for( var i in b ) {
				a[ i ] = b[ i ];
			}
	
		}
	
		/**
		 * Converts the target object to an array.
		 *
		 * @param {object} o
		 * @return {object[]}
		 */
		function toArray( o ) {
	
			return Array.prototype.slice.call( o );
	
		}
	
		/**
		 * Utility for deserializing a value.
		 *
		 * @param {*} value
		 * @return {*}
		 */
		function deserialize( value ) {
	
			if( typeof value === 'string' ) {
				if( value === 'null' ) return null;
				else if( value === 'true' ) return true;
				else if( value === 'false' ) return false;
				else if( value.match( /^[\d\.]+$/ ) ) return parseFloat( value );
			}
	
			return value;
	
		}
	
		/**
		 * Measures the distance in pixels between point a
		 * and point b.
		 *
		 * @param {object} a point with x/y properties
		 * @param {object} b point with x/y properties
		 *
		 * @return {number}
		 */
		function distanceBetween( a, b ) {
	
			var dx = a.x - b.x,
				dy = a.y - b.y;
	
			return Math.sqrt( dx*dx + dy*dy );
	
		}
	
		/**
		 * Applies a CSS transform to the target element.
		 *
		 * @param {HTMLElement} element
		 * @param {string} transform
		 */
		function transformElement( element, transform ) {
	
			element.style.WebkitTransform = transform;
			element.style.MozTransform = transform;
			element.style.msTransform = transform;
			element.style.transform = transform;
	
		}
	
		/**
		 * Applies CSS transforms to the slides container. The container
		 * is transformed from two separate sources: layout and the overview
		 * mode.
		 *
		 * @param {object} transforms
		 */
		function transformSlides( transforms ) {
	
			// Pick up new transforms from arguments
			if( typeof transforms.layout === 'string' ) slidesTransform.layout = transforms.layout;
			if( typeof transforms.overview === 'string' ) slidesTransform.overview = transforms.overview;
	
			// Apply the transforms to the slides container
			if( slidesTransform.layout ) {
				transformElement( dom.slides, slidesTransform.layout + ' ' + slidesTransform.overview );
			}
			else {
				transformElement( dom.slides, slidesTransform.overview );
			}
	
		}
	
		/**
		 * Injects the given CSS styles into the DOM.
		 *
		 * @param {string} value
		 */
		function injectStyleSheet( value ) {
	
			var tag = document.createElement( 'style' );
			tag.type = 'text/css';
			if( tag.styleSheet ) {
				tag.styleSheet.cssText = value;
			}
			else {
				tag.appendChild( document.createTextNode( value ) );
			}
			document.getElementsByTagName( 'head' )[0].appendChild( tag );
	
		}
	
		/**
		 * Find the closest parent that matches the given
		 * selector.
		 *
		 * @param {HTMLElement} target The child element
		 * @param {String} selector The CSS selector to match
		 * the parents against
		 *
		 * @return {HTMLElement} The matched parent or null
		 * if no matching parent was found
		 */
		function closestParent( target, selector ) {
	
			var parent = target.parentNode;
	
			while( parent ) {
	
				// There's some overhead doing this each time, we don't
				// want to rewrite the element prototype but should still
				// be enough to feature detect once at startup...
				var matchesMethod = parent.matches || parent.matchesSelector || parent.msMatchesSelector;
	
				// If we find a match, we're all set
				if( matchesMethod && matchesMethod.call( parent, selector ) ) {
					return parent;
				}
	
				// Keep searching
				parent = parent.parentNode;
	
			}
	
			return null;
	
		}
	
		/**
		 * Converts various color input formats to an {r:0,g:0,b:0} object.
		 *
		 * @param {string} color The string representation of a color
		 * @example
		 * colorToRgb('#000');
		 * @example
		 * colorToRgb('#000000');
		 * @example
		 * colorToRgb('rgb(0,0,0)');
		 * @example
		 * colorToRgb('rgba(0,0,0)');
		 *
		 * @return {{r: number, g: number, b: number, [a]: number}|null}
		 */
		function colorToRgb( color ) {
	
			var hex3 = color.match( /^#([0-9a-f]{3})$/i );
			if( hex3 && hex3[1] ) {
				hex3 = hex3[1];
				return {
					r: parseInt( hex3.charAt( 0 ), 16 ) * 0x11,
					g: parseInt( hex3.charAt( 1 ), 16 ) * 0x11,
					b: parseInt( hex3.charAt( 2 ), 16 ) * 0x11
				};
			}
	
			var hex6 = color.match( /^#([0-9a-f]{6})$/i );
			if( hex6 && hex6[1] ) {
				hex6 = hex6[1];
				return {
					r: parseInt( hex6.substr( 0, 2 ), 16 ),
					g: parseInt( hex6.substr( 2, 2 ), 16 ),
					b: parseInt( hex6.substr( 4, 2 ), 16 )
				};
			}
	
			var rgb = color.match( /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i );
			if( rgb ) {
				return {
					r: parseInt( rgb[1], 10 ),
					g: parseInt( rgb[2], 10 ),
					b: parseInt( rgb[3], 10 )
				};
			}
	
			var rgba = color.match( /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i );
			if( rgba ) {
				return {
					r: parseInt( rgba[1], 10 ),
					g: parseInt( rgba[2], 10 ),
					b: parseInt( rgba[3], 10 ),
					a: parseFloat( rgba[4] )
				};
			}
	
			return null;
	
		}
	
		/**
		 * Calculates brightness on a scale of 0-255.
		 *
		 * @param {string} color See colorToRgb for supported formats.
		 * @see {@link colorToRgb}
		 */
		function colorBrightness( color ) {
	
			if( typeof color === 'string' ) color = colorToRgb( color );
	
			if( color ) {
				return ( color.r * 299 + color.g * 587 + color.b * 114 ) / 1000;
			}
	
			return null;
	
		}
	
		/**
		 * Returns the remaining height within the parent of the
		 * target element.
		 *
		 * remaining height = [ configured parent height ] - [ current parent height ]
		 *
		 * @param {HTMLElement} element
		 * @param {number} [height]
		 */
		function getRemainingHeight( element, height ) {
	
			height = height || 0;
	
			if( element ) {
				var newHeight, oldHeight = element.style.height;
	
				// Change the .stretch element height to 0 in order find the height of all
				// the other elements
				element.style.height = '0px';
				newHeight = height - element.parentNode.offsetHeight;
	
				// Restore the old height, just in case
				element.style.height = oldHeight + 'px';
	
				return newHeight;
			}
	
			return height;
	
		}
	
		/**
		 * Checks if this instance is being used to print a PDF.
		 */
		function isPrintingPDF() {
	
			return ( /print-pdf/gi ).test( window.location.search );
	
		}
	
		/**
		 * Hides the address bar if we're on a mobile device.
		 */
		function hideAddressBar() {
	
			if( config.hideAddressBar && isMobileDevice ) {
				// Events that should trigger the address bar to hide
				window.addEventListener( 'load', removeAddressBar, false );
				window.addEventListener( 'orientationchange', removeAddressBar, false );
			}
	
		}
	
		/**
		 * Causes the address bar to hide on mobile devices,
		 * more vertical space ftw.
		 */
		function removeAddressBar() {
	
			setTimeout( function() {
				window.scrollTo( 0, 1 );
			}, 10 );
	
		}
	
		/**
		 * Dispatches an event of the specified type from the
		 * reveal DOM element.
		 */
		function dispatchEvent( type, args ) {
	
			var event = document.createEvent( 'HTMLEvents', 1, 2 );
			event.initEvent( type, true, true );
			extend( event, args );
			dom.wrapper.dispatchEvent( event );
	
			// If we're in an iframe, post each reveal.js event to the
			// parent window. Used by the notes plugin
			if( config.postMessageEvents && window.parent !== window.self ) {
				window.parent.postMessage( JSON.stringify({ namespace: 'reveal', eventName: type, state: getState() }), '*' );
			}
	
		}
	
		/**
		 * Wrap all links in 3D goodness.
		 */
		function enableRollingLinks() {
	
			if( features.transforms3d && !( 'msPerspective' in document.body.style ) ) {
				var anchors = dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ' a' );
	
				for( var i = 0, len = anchors.length; i < len; i++ ) {
					var anchor = anchors[i];
	
					if( anchor.textContent && !anchor.querySelector( '*' ) && ( !anchor.className || !anchor.classList.contains( anchor, 'roll' ) ) ) {
						var span = document.createElement('span');
						span.setAttribute('data-title', anchor.text);
						span.innerHTML = anchor.innerHTML;
	
						anchor.classList.add( 'roll' );
						anchor.innerHTML = '';
						anchor.appendChild(span);
					}
				}
			}
	
		}
	
		/**
		 * Unwrap all 3D links.
		 */
		function disableRollingLinks() {
	
			var anchors = dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ' a.roll' );
	
			for( var i = 0, len = anchors.length; i < len; i++ ) {
				var anchor = anchors[i];
				var span = anchor.querySelector( 'span' );
	
				if( span ) {
					anchor.classList.remove( 'roll' );
					anchor.innerHTML = span.innerHTML;
				}
			}
	
		}
	
		/**
		 * Bind preview frame links.
		 *
		 * @param {string} [selector=a] - selector for anchors
		 */
		function enablePreviewLinks( selector ) {
	
			var anchors = toArray( document.querySelectorAll( selector ? selector : 'a' ) );
	
			anchors.forEach( function( element ) {
				if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
					element.addEventListener( 'click', onPreviewLinkClicked, false );
				}
			} );
	
		}
	
		/**
		 * Unbind preview frame links.
		 */
		function disablePreviewLinks( selector ) {
	
			var anchors = toArray( document.querySelectorAll( selector ? selector : 'a' ) );
	
			anchors.forEach( function( element ) {
				if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
					element.removeEventListener( 'click', onPreviewLinkClicked, false );
				}
			} );
	
		}
	
		/**
		 * Opens a preview window for the target URL.
		 *
		 * @param {string} url - url for preview iframe src
		 */
		function showPreview( url ) {
	
			closeOverlay();
	
			dom.overlay = document.createElement( 'div' );
			dom.overlay.classList.add( 'overlay' );
			dom.overlay.classList.add( 'overlay-preview' );
			dom.wrapper.appendChild( dom.overlay );
	
			dom.overlay.innerHTML = [
				'<header>',
					'<a class="close" href="#"><span class="icon"></span></a>',
					'<a class="external" href="'+ url +'" target="_blank"><span class="icon"></span></a>',
				'</header>',
				'<div class="spinner"></div>',
				'<div class="viewport">',
					'<iframe src="'+ url +'"></iframe>',
					'<small class="viewport-inner">',
						'<span class="x-frame-error">Unable to load iframe. This is likely due to the site\'s policy (x-frame-options).</span>',
					'</small>',
				'</div>'
			].join('');
	
			dom.overlay.querySelector( 'iframe' ).addEventListener( 'load', function( event ) {
				dom.overlay.classList.add( 'loaded' );
			}, false );
	
			dom.overlay.querySelector( '.close' ).addEventListener( 'click', function( event ) {
				closeOverlay();
				event.preventDefault();
			}, false );
	
			dom.overlay.querySelector( '.external' ).addEventListener( 'click', function( event ) {
				closeOverlay();
			}, false );
	
			setTimeout( function() {
				dom.overlay.classList.add( 'visible' );
			}, 1 );
	
		}
	
		/**
		 * Open or close help overlay window.
		 *
		 * @param {Boolean} [override] Flag which overrides the
		 * toggle logic and forcibly sets the desired state. True means
		 * help is open, false means it's closed.
		 */
		function toggleHelp( override ){
	
			if( typeof override === 'boolean' ) {
				override ? showHelp() : closeOverlay();
			}
			else {
				if( dom.overlay ) {
					closeOverlay();
				}
				else {
					showHelp();
				}
			}
		}
	
		/**
		 * Opens an overlay window with help material.
		 */
		function showHelp() {
	
			if( config.help ) {
	
				closeOverlay();
	
				dom.overlay = document.createElement( 'div' );
				dom.overlay.classList.add( 'overlay' );
				dom.overlay.classList.add( 'overlay-help' );
				dom.wrapper.appendChild( dom.overlay );
	
				var html = '<p class="title">Keyboard Shortcuts</p><br/>';
	
				html += '<table><th>KEY</th><th>ACTION</th>';
				for( var key in keyboardShortcuts ) {
					html += '<tr><td>' + key + '</td><td>' + keyboardShortcuts[ key ] + '</td></tr>';
				}
	
				html += '</table>';
	
				dom.overlay.innerHTML = [
					'<header>',
						'<a class="close" href="#"><span class="icon"></span></a>',
					'</header>',
					'<div class="viewport">',
						'<div class="viewport-inner">'+ html +'</div>',
					'</div>'
				].join('');
	
				dom.overlay.querySelector( '.close' ).addEventListener( 'click', function( event ) {
					closeOverlay();
					event.preventDefault();
				}, false );
	
				setTimeout( function() {
					dom.overlay.classList.add( 'visible' );
				}, 1 );
	
			}
	
		}
	
		/**
		 * Closes any currently open overlay.
		 */
		function closeOverlay() {
	
			if( dom.overlay ) {
				dom.overlay.parentNode.removeChild( dom.overlay );
				dom.overlay = null;
			}
	
		}
	
		/**
		 * Applies JavaScript-controlled layout rules to the
		 * presentation.
		 */
		function layout() {
	
			if( dom.wrapper && !isPrintingPDF() ) {
	
				var size = getComputedSlideSize();
	
				// Layout the contents of the slides
				layoutSlideContents( config.width, config.height );
	
				dom.slides.style.width = size.width + 'px';
				dom.slides.style.height = size.height + 'px';
	
				// Determine scale of content to fit within available space
				scale = Math.min( size.presentationWidth / size.width, size.presentationHeight / size.height );
	
				// Respect max/min scale settings
				scale = Math.max( scale, config.minScale );
				scale = Math.min( scale, config.maxScale );
	
				// Don't apply any scaling styles if scale is 1
				if( scale === 1 ) {
					dom.slides.style.zoom = '';
					dom.slides.style.left = '';
					dom.slides.style.top = '';
					dom.slides.style.bottom = '';
					dom.slides.style.right = '';
					transformSlides( { layout: '' } );
				}
				else {
					// Prefer zoom for scaling up so that content remains crisp.
					// Don't use zoom to scale down since that can lead to shifts
					// in text layout/line breaks.
					if( scale > 1 && features.zoom ) {
						dom.slides.style.zoom = scale;
						dom.slides.style.left = '';
						dom.slides.style.top = '';
						dom.slides.style.bottom = '';
						dom.slides.style.right = '';
						transformSlides( { layout: '' } );
					}
					// Apply scale transform as a fallback
					else {
						dom.slides.style.zoom = '';
						dom.slides.style.left = '50%';
						dom.slides.style.top = '50%';
						dom.slides.style.bottom = 'auto';
						dom.slides.style.right = 'auto';
						transformSlides( { layout: 'translate(-50%, -50%) scale('+ scale +')' } );
					}
				}
	
				// Select all slides, vertical and horizontal
				var slides = toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) );
	
				for( var i = 0, len = slides.length; i < len; i++ ) {
					var slide = slides[ i ];
	
					// Don't bother updating invisible slides
					if( slide.style.display === 'none' ) {
						continue;
					}
	
					if( config.center || slide.classList.contains( 'center' ) ) {
						// Vertical stacks are not centred since their section
						// children will be
						if( slide.classList.contains( 'stack' ) ) {
							slide.style.top = 0;
						}
						else {
							slide.style.top = Math.max( ( size.height - slide.scrollHeight ) / 2, 0 ) + 'px';
						}
					}
					else {
						slide.style.top = '';
					}
	
				}
	
				updateProgress();
				updateParallax();
	
				if( isOverview() ) {
					updateOverview();
				}
	
			}
	
		}
	
		/**
		 * Applies layout logic to the contents of all slides in
		 * the presentation.
		 *
		 * @param {string|number} width
		 * @param {string|number} height
		 */
		function layoutSlideContents( width, height ) {
	
			// Handle sizing of elements with the 'stretch' class
			toArray( dom.slides.querySelectorAll( 'section > .stretch' ) ).forEach( function( element ) {
	
				// Determine how much vertical space we can use
				var remainingHeight = getRemainingHeight( element, height );
	
				// Consider the aspect ratio of media elements
				if( /(img|video)/gi.test( element.nodeName ) ) {
					var nw = element.naturalWidth || element.videoWidth,
						nh = element.naturalHeight || element.videoHeight;
	
					var es = Math.min( width / nw, remainingHeight / nh );
	
					element.style.width = ( nw * es ) + 'px';
					element.style.height = ( nh * es ) + 'px';
	
				}
				else {
					element.style.width = width + 'px';
					element.style.height = remainingHeight + 'px';
				}
	
			} );
	
		}
	
		/**
		 * Calculates the computed pixel size of our slides. These
		 * values are based on the width and height configuration
		 * options.
		 *
		 * @param {number} [presentationWidth=dom.wrapper.offsetWidth]
		 * @param {number} [presentationHeight=dom.wrapper.offsetHeight]
		 */
		function getComputedSlideSize( presentationWidth, presentationHeight ) {
	
			var size = {
				// Slide size
				width: config.width,
				height: config.height,
	
				// Presentation size
				presentationWidth: presentationWidth || dom.wrapper.offsetWidth,
				presentationHeight: presentationHeight || dom.wrapper.offsetHeight
			};
	
			// Reduce available space by margin
			size.presentationWidth -= ( size.presentationWidth * config.margin );
			size.presentationHeight -= ( size.presentationHeight * config.margin );
	
			// Slide width may be a percentage of available width
			if( typeof size.width === 'string' && /%$/.test( size.width ) ) {
				size.width = parseInt( size.width, 10 ) / 100 * size.presentationWidth;
			}
	
			// Slide height may be a percentage of available height
			if( typeof size.height === 'string' && /%$/.test( size.height ) ) {
				size.height = parseInt( size.height, 10 ) / 100 * size.presentationHeight;
			}
	
			return size;
	
		}
	
		/**
		 * Stores the vertical index of a stack so that the same
		 * vertical slide can be selected when navigating to and
		 * from the stack.
		 *
		 * @param {HTMLElement} stack The vertical stack element
		 * @param {string|number} [v=0] Index to memorize
		 */
		function setPreviousVerticalIndex( stack, v ) {
	
			if( typeof stack === 'object' && typeof stack.setAttribute === 'function' ) {
				stack.setAttribute( 'data-previous-indexv', v || 0 );
			}
	
		}
	
		/**
		 * Retrieves the vertical index which was stored using
		 * #setPreviousVerticalIndex() or 0 if no previous index
		 * exists.
		 *
		 * @param {HTMLElement} stack The vertical stack element
		 */
		function getPreviousVerticalIndex( stack ) {
	
			if( typeof stack === 'object' && typeof stack.setAttribute === 'function' && stack.classList.contains( 'stack' ) ) {
				// Prefer manually defined start-indexv
				var attributeName = stack.hasAttribute( 'data-start-indexv' ) ? 'data-start-indexv' : 'data-previous-indexv';
	
				return parseInt( stack.getAttribute( attributeName ) || 0, 10 );
			}
	
			return 0;
	
		}
	
		/**
		 * Displays the overview of slides (quick nav) by scaling
		 * down and arranging all slide elements.
		 */
		function activateOverview() {
	
			// Only proceed if enabled in config
			if( config.overview && !isOverview() ) {
	
				overview = true;
	
				dom.wrapper.classList.add( 'overview' );
				dom.wrapper.classList.remove( 'overview-deactivating' );
	
				if( features.overviewTransitions ) {
					setTimeout( function() {
						dom.wrapper.classList.add( 'overview-animated' );
					}, 1 );
				}
	
				// Don't auto-slide while in overview mode
				cancelAutoSlide();
	
				// Move the backgrounds element into the slide container to
				// that the same scaling is applied
				dom.slides.appendChild( dom.background );
	
				// Clicking on an overview slide navigates to it
				toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {
					if( !slide.classList.contains( 'stack' ) ) {
						slide.addEventListener( 'click', onOverviewSlideClicked, true );
					}
				} );
	
				// Calculate slide sizes
				var margin = 70;
				var slideSize = getComputedSlideSize();
				overviewSlideWidth = slideSize.width + margin;
				overviewSlideHeight = slideSize.height + margin;
	
				// Reverse in RTL mode
				if( config.rtl ) {
					overviewSlideWidth = -overviewSlideWidth;
				}
	
				updateSlidesVisibility();
				layoutOverview();
				updateOverview();
	
				layout();
	
				// Notify observers of the overview showing
				dispatchEvent( 'overviewshown', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				} );
	
			}
	
		}
	
		/**
		 * Uses CSS transforms to position all slides in a grid for
		 * display inside of the overview mode.
		 */
		function layoutOverview() {
	
			// Layout slides
			toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( hslide, h ) {
				hslide.setAttribute( 'data-index-h', h );
				transformElement( hslide, 'translate3d(' + ( h * overviewSlideWidth ) + 'px, 0, 0)' );
	
				if( hslide.classList.contains( 'stack' ) ) {
	
					toArray( hslide.querySelectorAll( 'section' ) ).forEach( function( vslide, v ) {
						vslide.setAttribute( 'data-index-h', h );
						vslide.setAttribute( 'data-index-v', v );
	
						transformElement( vslide, 'translate3d(0, ' + ( v * overviewSlideHeight ) + 'px, 0)' );
					} );
	
				}
			} );
	
			// Layout slide backgrounds
			toArray( dom.background.childNodes ).forEach( function( hbackground, h ) {
				transformElement( hbackground, 'translate3d(' + ( h * overviewSlideWidth ) + 'px, 0, 0)' );
	
				toArray( hbackground.querySelectorAll( '.slide-background' ) ).forEach( function( vbackground, v ) {
					transformElement( vbackground, 'translate3d(0, ' + ( v * overviewSlideHeight ) + 'px, 0)' );
				} );
			} );
	
		}
	
		/**
		 * Moves the overview viewport to the current slides.
		 * Called each time the current slide changes.
		 */
		function updateOverview() {
	
			var vmin = Math.min( window.innerWidth, window.innerHeight );
			var scale = Math.max( vmin / 5, 150 ) / vmin;
	
			transformSlides( {
				overview: [
					'scale('+ scale +')',
					'translateX('+ ( -indexh * overviewSlideWidth ) +'px)',
					'translateY('+ ( -indexv * overviewSlideHeight ) +'px)'
				].join( ' ' )
			} );
	
		}
	
		/**
		 * Exits the slide overview and enters the currently
		 * active slide.
		 */
		function deactivateOverview() {
	
			// Only proceed if enabled in config
			if( config.overview ) {
	
				overview = false;
	
				dom.wrapper.classList.remove( 'overview' );
				dom.wrapper.classList.remove( 'overview-animated' );
	
				// Temporarily add a class so that transitions can do different things
				// depending on whether they are exiting/entering overview, or just
				// moving from slide to slide
				dom.wrapper.classList.add( 'overview-deactivating' );
	
				setTimeout( function () {
					dom.wrapper.classList.remove( 'overview-deactivating' );
				}, 1 );
	
				// Move the background element back out
				dom.wrapper.appendChild( dom.background );
	
				// Clean up changes made to slides
				toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {
					transformElement( slide, '' );
	
					slide.removeEventListener( 'click', onOverviewSlideClicked, true );
				} );
	
				// Clean up changes made to backgrounds
				toArray( dom.background.querySelectorAll( '.slide-background' ) ).forEach( function( background ) {
					transformElement( background, '' );
				} );
	
				transformSlides( { overview: '' } );
	
				slide( indexh, indexv );
	
				layout();
	
				cueAutoSlide();
	
				// Notify observers of the overview hiding
				dispatchEvent( 'overviewhidden', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				} );
	
			}
		}
	
		/**
		 * Toggles the slide overview mode on and off.
		 *
		 * @param {Boolean} [override] Flag which overrides the
		 * toggle logic and forcibly sets the desired state. True means
		 * overview is open, false means it's closed.
		 */
		function toggleOverview( override ) {
	
			if( typeof override === 'boolean' ) {
				override ? activateOverview() : deactivateOverview();
			}
			else {
				isOverview() ? deactivateOverview() : activateOverview();
			}
	
		}
	
		/**
		 * Checks if the overview is currently active.
		 *
		 * @return {Boolean} true if the overview is active,
		 * false otherwise
		 */
		function isOverview() {
	
			return overview;
	
		}
	
		/**
		 * Checks if the current or specified slide is vertical
		 * (nested within another slide).
		 *
		 * @param {HTMLElement} [slide=currentSlide] The slide to check
		 * orientation of
		 * @return {Boolean}
		 */
		function isVerticalSlide( slide ) {
	
			// Prefer slide argument, otherwise use current slide
			slide = slide ? slide : currentSlide;
	
			return slide && slide.parentNode && !!slide.parentNode.nodeName.match( /section/i );
	
		}
	
		/**
		 * Handling the fullscreen functionality via the fullscreen API
		 *
		 * @see http://fullscreen.spec.whatwg.org/
		 * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
		 */
		function enterFullscreen() {
	
			var element = document.documentElement;
	
			// Check which implementation is available
			var requestMethod = element.requestFullscreen ||
								element.webkitRequestFullscreen ||
								element.webkitRequestFullScreen ||
								element.mozRequestFullScreen ||
								element.msRequestFullscreen;
	
			if( requestMethod ) {
				requestMethod.apply( element );
			}
	
		}
	
		/**
		 * Enters the paused mode which fades everything on screen to
		 * black.
		 */
		function pause() {
	
			if( config.pause ) {
				var wasPaused = dom.wrapper.classList.contains( 'paused' );
	
				cancelAutoSlide();
				dom.wrapper.classList.add( 'paused' );
	
				if( wasPaused === false ) {
					dispatchEvent( 'paused' );
				}
			}
	
		}
	
		/**
		 * Exits from the paused mode.
		 */
		function resume() {
	
			var wasPaused = dom.wrapper.classList.contains( 'paused' );
			dom.wrapper.classList.remove( 'paused' );
	
			cueAutoSlide();
	
			if( wasPaused ) {
				dispatchEvent( 'resumed' );
			}
	
		}
	
		/**
		 * Toggles the paused mode on and off.
		 */
		function togglePause( override ) {
	
			if( typeof override === 'boolean' ) {
				override ? pause() : resume();
			}
			else {
				isPaused() ? resume() : pause();
			}
	
		}
	
		/**
		 * Checks if we are currently in the paused mode.
		 *
		 * @return {Boolean}
		 */
		function isPaused() {
	
			return dom.wrapper.classList.contains( 'paused' );
	
		}
	
		/**
		 * Toggles the auto slide mode on and off.
		 *
		 * @param {Boolean} [override] Flag which sets the desired state.
		 * True means autoplay starts, false means it stops.
		 */
	
		function toggleAutoSlide( override ) {
	
			if( typeof override === 'boolean' ) {
				override ? resumeAutoSlide() : pauseAutoSlide();
			}
	
			else {
				autoSlidePaused ? resumeAutoSlide() : pauseAutoSlide();
			}
	
		}
	
		/**
		 * Checks if the auto slide mode is currently on.
		 *
		 * @return {Boolean}
		 */
		function isAutoSliding() {
	
			return !!( autoSlide && !autoSlidePaused );
	
		}
	
		/**
		 * Steps from the current point in the presentation to the
		 * slide which matches the specified horizontal and vertical
		 * indices.
		 *
		 * @param {number} [h=indexh] Horizontal index of the target slide
		 * @param {number} [v=indexv] Vertical index of the target slide
		 * @param {number} [f] Index of a fragment within the
		 * target slide to activate
		 * @param {number} [o] Origin for use in multimaster environments
		 */
		function slide( h, v, f, o ) {
	
			// Remember where we were at before
			previousSlide = currentSlide;
	
			// Query all horizontal slides in the deck
			var horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR );
	
			// Abort if there are no slides
			if( horizontalSlides.length === 0 ) return;
	
			// If no vertical index is specified and the upcoming slide is a
			// stack, resume at its previous vertical index
			if( v === undefined && !isOverview() ) {
				v = getPreviousVerticalIndex( horizontalSlides[ h ] );
			}
	
			// If we were on a vertical stack, remember what vertical index
			// it was on so we can resume at the same position when returning
			if( previousSlide && previousSlide.parentNode && previousSlide.parentNode.classList.contains( 'stack' ) ) {
				setPreviousVerticalIndex( previousSlide.parentNode, indexv );
			}
	
			// Remember the state before this slide
			var stateBefore = state.concat();
	
			// Reset the state array
			state.length = 0;
	
			var indexhBefore = indexh || 0,
				indexvBefore = indexv || 0;
	
			// Activate and transition to the new slide
			indexh = updateSlides( HORIZONTAL_SLIDES_SELECTOR, h === undefined ? indexh : h );
			indexv = updateSlides( VERTICAL_SLIDES_SELECTOR, v === undefined ? indexv : v );
	
			// Update the visibility of slides now that the indices have changed
			updateSlidesVisibility();
	
			layout();
	
			// Apply the new state
			stateLoop: for( var i = 0, len = state.length; i < len; i++ ) {
				// Check if this state existed on the previous slide. If it
				// did, we will avoid adding it repeatedly
				for( var j = 0; j < stateBefore.length; j++ ) {
					if( stateBefore[j] === state[i] ) {
						stateBefore.splice( j, 1 );
						continue stateLoop;
					}
				}
	
				document.documentElement.classList.add( state[i] );
	
				// Dispatch custom event matching the state's name
				dispatchEvent( state[i] );
			}
	
			// Clean up the remains of the previous state
			while( stateBefore.length ) {
				document.documentElement.classList.remove( stateBefore.pop() );
			}
	
			// Update the overview if it's currently active
			if( isOverview() ) {
				updateOverview();
			}
	
			// Find the current horizontal slide and any possible vertical slides
			// within it
			var currentHorizontalSlide = horizontalSlides[ indexh ],
				currentVerticalSlides = currentHorizontalSlide.querySelectorAll( 'section' );
	
			// Store references to the previous and current slides
			currentSlide = currentVerticalSlides[ indexv ] || currentHorizontalSlide;
	
			// Show fragment, if specified
			if( typeof f !== 'undefined' ) {
				navigateFragment( f );
			}
	
			// Dispatch an event if the slide changed
			var slideChanged = ( indexh !== indexhBefore || indexv !== indexvBefore );
			if( slideChanged ) {
				dispatchEvent( 'slidechanged', {
					'indexh': indexh,
					'indexv': indexv,
					'previousSlide': previousSlide,
					'currentSlide': currentSlide,
					'origin': o
				} );
			}
			else {
				// Ensure that the previous slide is never the same as the current
				previousSlide = null;
			}
	
			// Solves an edge case where the previous slide maintains the
			// 'present' class when navigating between adjacent vertical
			// stacks
			if( previousSlide ) {
				previousSlide.classList.remove( 'present' );
				previousSlide.setAttribute( 'aria-hidden', 'true' );
	
				// Reset all slides upon navigate to home
				// Issue: #285
				if ( dom.wrapper.querySelector( HOME_SLIDE_SELECTOR ).classList.contains( 'present' ) ) {
					// Launch async task
					setTimeout( function () {
						var slides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.stack') ), i;
						for( i in slides ) {
							if( slides[i] ) {
								// Reset stack
								setPreviousVerticalIndex( slides[i], 0 );
							}
						}
					}, 0 );
				}
			}
	
			// Handle embedded content
			if( slideChanged || !previousSlide ) {
				stopEmbeddedContent( previousSlide );
				startEmbeddedContent( currentSlide );
			}
	
			// Announce the current slide contents, for screen readers
			dom.statusDiv.textContent = getStatusText( currentSlide );
	
			updateControls();
			updateProgress();
			updateBackground();
			updateParallax();
			updateSlideNumber();
			updateNotes();
	
			// Update the URL hash
			writeURL();
	
			cueAutoSlide();
	
		}
	
		/**
		 * Syncs the presentation with the current DOM. Useful
		 * when new slides or control elements are added or when
		 * the configuration has changed.
		 */
		function sync() {
	
			// Subscribe to input
			removeEventListeners();
			addEventListeners();
	
			// Force a layout to make sure the current config is accounted for
			layout();
	
			// Reflect the current autoSlide value
			autoSlide = config.autoSlide;
	
			// Start auto-sliding if it's enabled
			cueAutoSlide();
	
			// Re-create the slide backgrounds
			createBackgrounds();
	
			// Write the current hash to the URL
			writeURL();
	
			sortAllFragments();
	
			updateControls();
			updateProgress();
			updateSlideNumber();
			updateSlidesVisibility();
			updateBackground( true );
			updateNotes();
	
			formatEmbeddedContent();
	
			// Start or stop embedded content depending on global config
			if( config.autoPlayMedia === false ) {
				stopEmbeddedContent( currentSlide );
			}
			else {
				startEmbeddedContent( currentSlide );
			}
	
			if( isOverview() ) {
				layoutOverview();
			}
	
		}
	
		/**
		 * Resets all vertical slides so that only the first
		 * is visible.
		 */
		function resetVerticalSlides() {
	
			var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
			horizontalSlides.forEach( function( horizontalSlide ) {
	
				var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
				verticalSlides.forEach( function( verticalSlide, y ) {
	
					if( y > 0 ) {
						verticalSlide.classList.remove( 'present' );
						verticalSlide.classList.remove( 'past' );
						verticalSlide.classList.add( 'future' );
						verticalSlide.setAttribute( 'aria-hidden', 'true' );
					}
	
				} );
	
			} );
	
		}
	
		/**
		 * Sorts and formats all of fragments in the
		 * presentation.
		 */
		function sortAllFragments() {
	
			var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
			horizontalSlides.forEach( function( horizontalSlide ) {
	
				var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
				verticalSlides.forEach( function( verticalSlide, y ) {
	
					sortFragments( verticalSlide.querySelectorAll( '.fragment' ) );
	
				} );
	
				if( verticalSlides.length === 0 ) sortFragments( horizontalSlide.querySelectorAll( '.fragment' ) );
	
			} );
	
		}
	
		/**
		 * Randomly shuffles all slides in the deck.
		 */
		function shuffle() {
	
			var slides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
	
			slides.forEach( function( slide ) {
	
				// Insert this slide next to another random slide. This may
				// cause the slide to insert before itself but that's fine.
				dom.slides.insertBefore( slide, slides[ Math.floor( Math.random() * slides.length ) ] );
	
			} );
	
		}
	
		/**
		 * Updates one dimension of slides by showing the slide
		 * with the specified index.
		 *
		 * @param {string} selector A CSS selector that will fetch
		 * the group of slides we are working with
		 * @param {number} index The index of the slide that should be
		 * shown
		 *
		 * @return {number} The index of the slide that is now shown,
		 * might differ from the passed in index if it was out of
		 * bounds.
		 */
		function updateSlides( selector, index ) {
	
			// Select all slides and convert the NodeList result to
			// an array
			var slides = toArray( dom.wrapper.querySelectorAll( selector ) ),
				slidesLength = slides.length;
	
			var printMode = isPrintingPDF();
	
			if( slidesLength ) {
	
				// Should the index loop?
				if( config.loop ) {
					index %= slidesLength;
	
					if( index < 0 ) {
						index = slidesLength + index;
					}
				}
	
				// Enforce max and minimum index bounds
				index = Math.max( Math.min( index, slidesLength - 1 ), 0 );
	
				for( var i = 0; i < slidesLength; i++ ) {
					var element = slides[i];
	
					var reverse = config.rtl && !isVerticalSlide( element );
	
					element.classList.remove( 'past' );
					element.classList.remove( 'present' );
					element.classList.remove( 'future' );
	
					// http://www.w3.org/html/wg/drafts/html/master/editing.html#the-hidden-attribute
					element.setAttribute( 'hidden', '' );
					element.setAttribute( 'aria-hidden', 'true' );
	
					// If this element contains vertical slides
					if( element.querySelector( 'section' ) ) {
						element.classList.add( 'stack' );
					}
	
					// If we're printing static slides, all slides are "present"
					if( printMode ) {
						element.classList.add( 'present' );
						continue;
					}
	
					if( i < index ) {
						// Any element previous to index is given the 'past' class
						element.classList.add( reverse ? 'future' : 'past' );
	
						if( config.fragments ) {
							var pastFragments = toArray( element.querySelectorAll( '.fragment' ) );
	
							// Show all fragments on prior slides
							while( pastFragments.length ) {
								var pastFragment = pastFragments.pop();
								pastFragment.classList.add( 'visible' );
								pastFragment.classList.remove( 'current-fragment' );
							}
						}
					}
					else if( i > index ) {
						// Any element subsequent to index is given the 'future' class
						element.classList.add( reverse ? 'past' : 'future' );
	
						if( config.fragments ) {
							var futureFragments = toArray( element.querySelectorAll( '.fragment.visible' ) );
	
							// No fragments in future slides should be visible ahead of time
							while( futureFragments.length ) {
								var futureFragment = futureFragments.pop();
								futureFragment.classList.remove( 'visible' );
								futureFragment.classList.remove( 'current-fragment' );
							}
						}
					}
				}
	
				// Mark the current slide as present
				slides[index].classList.add( 'present' );
				slides[index].removeAttribute( 'hidden' );
				slides[index].removeAttribute( 'aria-hidden' );
	
				// If this slide has a state associated with it, add it
				// onto the current state of the deck
				var slideState = slides[index].getAttribute( 'data-state' );
				if( slideState ) {
					state = state.concat( slideState.split( ' ' ) );
				}
	
			}
			else {
				// Since there are no slides we can't be anywhere beyond the
				// zeroth index
				index = 0;
			}
	
			return index;
	
		}
	
		/**
		 * Optimization method; hide all slides that are far away
		 * from the present slide.
		 */
		function updateSlidesVisibility() {
	
			// Select all slides and convert the NodeList result to
			// an array
			var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ),
				horizontalSlidesLength = horizontalSlides.length,
				distanceX,
				distanceY;
	
			if( horizontalSlidesLength && typeof indexh !== 'undefined' ) {
	
				// The number of steps away from the present slide that will
				// be visible
				var viewDistance = isOverview() ? 10 : config.viewDistance;
	
				// Limit view distance on weaker devices
				if( isMobileDevice ) {
					viewDistance = isOverview() ? 6 : 2;
				}
	
				// All slides need to be visible when exporting to PDF
				if( isPrintingPDF() ) {
					viewDistance = Number.MAX_VALUE;
				}
	
				for( var x = 0; x < horizontalSlidesLength; x++ ) {
					var horizontalSlide = horizontalSlides[x];
	
					var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) ),
						verticalSlidesLength = verticalSlides.length;
	
					// Determine how far away this slide is from the present
					distanceX = Math.abs( ( indexh || 0 ) - x ) || 0;
	
					// If the presentation is looped, distance should measure
					// 1 between the first and last slides
					if( config.loop ) {
						distanceX = Math.abs( ( ( indexh || 0 ) - x ) % ( horizontalSlidesLength - viewDistance ) ) || 0;
					}
	
					// Show the horizontal slide if it's within the view distance
					if( distanceX < viewDistance ) {
						showSlide( horizontalSlide );
					}
					else {
						hideSlide( horizontalSlide );
					}
	
					if( verticalSlidesLength ) {
	
						var oy = getPreviousVerticalIndex( horizontalSlide );
	
						for( var y = 0; y < verticalSlidesLength; y++ ) {
							var verticalSlide = verticalSlides[y];
	
							distanceY = x === ( indexh || 0 ) ? Math.abs( ( indexv || 0 ) - y ) : Math.abs( y - oy );
	
							if( distanceX + distanceY < viewDistance ) {
								showSlide( verticalSlide );
							}
							else {
								hideSlide( verticalSlide );
							}
						}
	
					}
				}
	
			}
	
		}
	
		/**
		 * Pick up notes from the current slide and display them
		 * to the viewer.
		 *
		 * @see {@link config.showNotes}
		 */
		function updateNotes() {
	
			if( config.showNotes && dom.speakerNotes && currentSlide && !isPrintingPDF() ) {
	
				dom.speakerNotes.innerHTML = getSlideNotes() || '';
	
			}
	
		}
	
		/**
		 * Updates the progress bar to reflect the current slide.
		 */
		function updateProgress() {
	
			// Update progress if enabled
			if( config.progress && dom.progressbar ) {
	
				dom.progressbar.style.width = getProgress() * dom.wrapper.offsetWidth + 'px';
	
			}
	
		}
	
		/**
		 * Updates the slide number div to reflect the current slide.
		 *
		 * The following slide number formats are available:
		 *  "h.v":	horizontal . vertical slide number (default)
		 *  "h/v":	horizontal / vertical slide number
		 *    "c":	flattened slide number
		 *  "c/t":	flattened slide number / total slides
		 */
		function updateSlideNumber() {
	
			// Update slide number if enabled
			if( config.slideNumber && dom.slideNumber ) {
	
				var value = [];
				var format = 'h.v';
	
				// Check if a custom number format is available
				if( typeof config.slideNumber === 'string' ) {
					format = config.slideNumber;
				}
	
				switch( format ) {
					case 'c':
						value.push( getSlidePastCount() + 1 );
						break;
					case 'c/t':
						value.push( getSlidePastCount() + 1, '/', getTotalSlides() );
						break;
					case 'h/v':
						value.push( indexh + 1 );
						if( isVerticalSlide() ) value.push( '/', indexv + 1 );
						break;
					default:
						value.push( indexh + 1 );
						if( isVerticalSlide() ) value.push( '.', indexv + 1 );
				}
	
				dom.slideNumber.innerHTML = formatSlideNumber( value[0], value[1], value[2] );
			}
	
		}
	
		/**
		 * Applies HTML formatting to a slide number before it's
		 * written to the DOM.
		 *
		 * @param {number} a Current slide
		 * @param {string} delimiter Character to separate slide numbers
		 * @param {(number|*)} b Total slides
		 * @return {string} HTML string fragment
		 */
		function formatSlideNumber( a, delimiter, b ) {
	
			if( typeof b === 'number' && !isNaN( b ) ) {
				return  '<span class="slide-number-a">'+ a +'</span>' +
						'<span class="slide-number-delimiter">'+ delimiter +'</span>' +
						'<span class="slide-number-b">'+ b +'</span>';
			}
			else {
				return '<span class="slide-number-a">'+ a +'</span>';
			}
	
		}
	
		/**
		 * Updates the state of all control/navigation arrows.
		 */
		function updateControls() {
	
			var routes = availableRoutes();
			var fragments = availableFragments();
	
			// Remove the 'enabled' class from all directions
			dom.controlsLeft.concat( dom.controlsRight )
							.concat( dom.controlsUp )
							.concat( dom.controlsDown )
							.concat( dom.controlsPrev )
							.concat( dom.controlsNext ).forEach( function( node ) {
				node.classList.remove( 'enabled' );
				node.classList.remove( 'fragmented' );
	
				// Set 'disabled' attribute on all directions
				node.setAttribute( 'disabled', 'disabled' );
			} );
	
			// Add the 'enabled' class to the available routes; remove 'disabled' attribute to enable buttons
			if( routes.left ) dom.controlsLeft.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
			if( routes.right ) dom.controlsRight.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
			if( routes.up ) dom.controlsUp.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
			if( routes.down ) dom.controlsDown.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
	
			// Prev/next buttons
			if( routes.left || routes.up ) dom.controlsPrev.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
			if( routes.right || routes.down ) dom.controlsNext.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
	
			// Highlight fragment directions
			if( currentSlide ) {
	
				// Always apply fragment decorator to prev/next buttons
				if( fragments.prev ) dom.controlsPrev.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
				if( fragments.next ) dom.controlsNext.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
	
				// Apply fragment decorators to directional buttons based on
				// what slide axis they are in
				if( isVerticalSlide( currentSlide ) ) {
					if( fragments.prev ) dom.controlsUp.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
					if( fragments.next ) dom.controlsDown.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
				}
				else {
					if( fragments.prev ) dom.controlsLeft.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
					if( fragments.next ) dom.controlsRight.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
				}
	
			}
	
		}
	
		/**
		 * Updates the background elements to reflect the current
		 * slide.
		 *
		 * @param {boolean} includeAll If true, the backgrounds of
		 * all vertical slides (not just the present) will be updated.
		 */
		function updateBackground( includeAll ) {
	
			var currentBackground = null;
	
			// Reverse past/future classes when in RTL mode
			var horizontalPast = config.rtl ? 'future' : 'past',
				horizontalFuture = config.rtl ? 'past' : 'future';
	
			// Update the classes of all backgrounds to match the
			// states of their slides (past/present/future)
			toArray( dom.background.childNodes ).forEach( function( backgroundh, h ) {
	
				backgroundh.classList.remove( 'past' );
				backgroundh.classList.remove( 'present' );
				backgroundh.classList.remove( 'future' );
	
				if( h < indexh ) {
					backgroundh.classList.add( horizontalPast );
				}
				else if ( h > indexh ) {
					backgroundh.classList.add( horizontalFuture );
				}
				else {
					backgroundh.classList.add( 'present' );
	
					// Store a reference to the current background element
					currentBackground = backgroundh;
				}
	
				if( includeAll || h === indexh ) {
					toArray( backgroundh.querySelectorAll( '.slide-background' ) ).forEach( function( backgroundv, v ) {
	
						backgroundv.classList.remove( 'past' );
						backgroundv.classList.remove( 'present' );
						backgroundv.classList.remove( 'future' );
	
						if( v < indexv ) {
							backgroundv.classList.add( 'past' );
						}
						else if ( v > indexv ) {
							backgroundv.classList.add( 'future' );
						}
						else {
							backgroundv.classList.add( 'present' );
	
							// Only if this is the present horizontal and vertical slide
							if( h === indexh ) currentBackground = backgroundv;
						}
	
					} );
				}
	
			} );
	
			// Stop content inside of previous backgrounds
			if( previousBackground ) {
	
				stopEmbeddedContent( previousBackground );
	
			}
	
			// Start content in the current background
			if( currentBackground ) {
	
				startEmbeddedContent( currentBackground );
	
				var backgroundImageURL = currentBackground.style.backgroundImage || '';
	
				// Restart GIFs (doesn't work in Firefox)
				if( /\.gif/i.test( backgroundImageURL ) ) {
					currentBackground.style.backgroundImage = '';
					window.getComputedStyle( currentBackground ).opacity;
					currentBackground.style.backgroundImage = backgroundImageURL;
				}
	
				// Don't transition between identical backgrounds. This
				// prevents unwanted flicker.
				var previousBackgroundHash = previousBackground ? previousBackground.getAttribute( 'data-background-hash' ) : null;
				var currentBackgroundHash = currentBackground.getAttribute( 'data-background-hash' );
				if( currentBackgroundHash && currentBackgroundHash === previousBackgroundHash && currentBackground !== previousBackground ) {
					dom.background.classList.add( 'no-transition' );
				}
	
				previousBackground = currentBackground;
	
			}
	
			// If there's a background brightness flag for this slide,
			// bubble it to the .reveal container
			if( currentSlide ) {
				[ 'has-light-background', 'has-dark-background' ].forEach( function( classToBubble ) {
					if( currentSlide.classList.contains( classToBubble ) ) {
						dom.wrapper.classList.add( classToBubble );
					}
					else {
						dom.wrapper.classList.remove( classToBubble );
					}
				} );
			}
	
			// Allow the first background to apply without transition
			setTimeout( function() {
				dom.background.classList.remove( 'no-transition' );
			}, 1 );
	
		}
	
		/**
		 * Updates the position of the parallax background based
		 * on the current slide index.
		 */
		function updateParallax() {
	
			if( config.parallaxBackgroundImage ) {
	
				var horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
					verticalSlides = dom.wrapper.querySelectorAll( VERTICAL_SLIDES_SELECTOR );
	
				var backgroundSize = dom.background.style.backgroundSize.split( ' ' ),
					backgroundWidth, backgroundHeight;
	
				if( backgroundSize.length === 1 ) {
					backgroundWidth = backgroundHeight = parseInt( backgroundSize[0], 10 );
				}
				else {
					backgroundWidth = parseInt( backgroundSize[0], 10 );
					backgroundHeight = parseInt( backgroundSize[1], 10 );
				}
	
				var slideWidth = dom.background.offsetWidth,
					horizontalSlideCount = horizontalSlides.length,
					horizontalOffsetMultiplier,
					horizontalOffset;
	
				if( typeof config.parallaxBackgroundHorizontal === 'number' ) {
					horizontalOffsetMultiplier = config.parallaxBackgroundHorizontal;
				}
				else {
					horizontalOffsetMultiplier = horizontalSlideCount > 1 ? ( backgroundWidth - slideWidth ) / ( horizontalSlideCount-1 ) : 0;
				}
	
				horizontalOffset = horizontalOffsetMultiplier * indexh * -1;
	
				var slideHeight = dom.background.offsetHeight,
					verticalSlideCount = verticalSlides.length,
					verticalOffsetMultiplier,
					verticalOffset;
	
				if( typeof config.parallaxBackgroundVertical === 'number' ) {
					verticalOffsetMultiplier = config.parallaxBackgroundVertical;
				}
				else {
					verticalOffsetMultiplier = ( backgroundHeight - slideHeight ) / ( verticalSlideCount-1 );
				}
	
				verticalOffset = verticalSlideCount > 0 ?  verticalOffsetMultiplier * indexv : 0;
	
				dom.background.style.backgroundPosition = horizontalOffset + 'px ' + -verticalOffset + 'px';
	
			}
	
		}
	
		/**
		 * Called when the given slide is within the configured view
		 * distance. Shows the slide element and loads any content
		 * that is set to load lazily (data-src).
		 *
		 * @param {HTMLElement} slide Slide to show
		 */
		/**
		 * Called when the given slide is within the configured view
		 * distance. Shows the slide element and loads any content
		 * that is set to load lazily (data-src).
		 *
		 * @param {HTMLElement} slide Slide to show
		 */
		function showSlide( slide ) {
	
			// Show the slide element
			slide.style.display = config.display;
	
			// Media elements with data-src attributes
			toArray( slide.querySelectorAll( 'img[data-src], video[data-src], audio[data-src]' ) ).forEach( function( element ) {
				element.setAttribute( 'src', element.getAttribute( 'data-src' ) );
				element.removeAttribute( 'data-src' );
			} );
	
			// Media elements with <source> children
			toArray( slide.querySelectorAll( 'video, audio' ) ).forEach( function( media ) {
				var sources = 0;
	
				toArray( media.querySelectorAll( 'source[data-src]' ) ).forEach( function( source ) {
					source.setAttribute( 'src', source.getAttribute( 'data-src' ) );
					source.removeAttribute( 'data-src' );
					sources += 1;
				} );
	
				// If we rewrote sources for this video/audio element, we need
				// to manually tell it to load from its new origin
				if( sources > 0 ) {
					media.load();
				}
			} );
	
	
			// Show the corresponding background element
			var indices = getIndices( slide );
			var background = getSlideBackground( indices.h, indices.v );
			if( background ) {
				background.style.display = 'block';
	
				// If the background contains media, load it
				if( background.hasAttribute( 'data-loaded' ) === false ) {
					background.setAttribute( 'data-loaded', 'true' );
	
					var backgroundImage = slide.getAttribute( 'data-background-image' ),
						backgroundVideo = slide.getAttribute( 'data-background-video' ),
						backgroundVideoLoop = slide.hasAttribute( 'data-background-video-loop' ),
						backgroundVideoMuted = slide.hasAttribute( 'data-background-video-muted' ),
						backgroundIframe = slide.getAttribute( 'data-background-iframe' );
	
					// Images
					if( backgroundImage ) {
						background.style.backgroundImage = 'url('+ backgroundImage +')';
					}
					// Videos
					else if ( backgroundVideo && !isSpeakerNotes() ) {
						var video = document.createElement( 'video' );
	
						if( backgroundVideoLoop ) {
							video.setAttribute( 'loop', '' );
						}
	
						if( backgroundVideoMuted ) {
							video.muted = true;
						}
	
						// Inline video playback works (at least in Mobile Safari) as
						// long as the video is muted and the `playsinline` attribute is
						// present
						if( isMobileDevice ) {
							video.muted = true;
							video.autoplay = true;
							video.setAttribute( 'playsinline', '' );
						}
	
						// Support comma separated lists of video sources
						backgroundVideo.split( ',' ).forEach( function( source ) {
							video.innerHTML += '<source src="'+ source +'">';
						} );
	
						background.appendChild( video );
					}
					// Iframes
					else if( backgroundIframe ) {
						var iframe = document.createElement( 'iframe' );
						iframe.setAttribute( 'allowfullscreen', '' );
						iframe.setAttribute( 'mozallowfullscreen', '' );
						iframe.setAttribute( 'webkitallowfullscreen', '' );
	
						// Only load autoplaying content when the slide is shown to
						// avoid having it play in the background
						if( /autoplay=(1|true|yes)/gi.test( backgroundIframe ) ) {
							iframe.setAttribute( 'data-src', backgroundIframe );
						}
						else {
							iframe.setAttribute( 'src', backgroundIframe );
						}
	
						iframe.style.width  = '100%';
						iframe.style.height = '100%';
						iframe.style.maxHeight = '100%';
						iframe.style.maxWidth = '100%';
	
						background.appendChild( iframe );
					}
				}
	
			}
	
		}
	
		/**
		 * Called when the given slide is moved outside of the
		 * configured view distance.
		 *
		 * @param {HTMLElement} slide
		 */
		function hideSlide( slide ) {
	
			// Hide the slide element
			slide.style.display = 'none';
	
			// Hide the corresponding background element
			var indices = getIndices( slide );
			var background = getSlideBackground( indices.h, indices.v );
			if( background ) {
				background.style.display = 'none';
			}
	
		}
	
		/**
		 * Determine what available routes there are for navigation.
		 *
		 * @return {{left: boolean, right: boolean, up: boolean, down: boolean}}
		 */
		function availableRoutes() {
	
			var horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
				verticalSlides = dom.wrapper.querySelectorAll( VERTICAL_SLIDES_SELECTOR );
	
			var routes = {
				left: indexh > 0 || config.loop,
				right: indexh < horizontalSlides.length - 1 || config.loop,
				up: indexv > 0,
				down: indexv < verticalSlides.length - 1
			};
	
			// reverse horizontal controls for rtl
			if( config.rtl ) {
				var left = routes.left;
				routes.left = routes.right;
				routes.right = left;
			}
	
			return routes;
	
		}
	
		/**
		 * Returns an object describing the available fragment
		 * directions.
		 *
		 * @return {{prev: boolean, next: boolean}}
		 */
		function availableFragments() {
	
			if( currentSlide && config.fragments ) {
				var fragments = currentSlide.querySelectorAll( '.fragment' );
				var hiddenFragments = currentSlide.querySelectorAll( '.fragment:not(.visible)' );
	
				return {
					prev: fragments.length - hiddenFragments.length > 0,
					next: !!hiddenFragments.length
				};
			}
			else {
				return { prev: false, next: false };
			}
	
		}
	
		/**
		 * Enforces origin-specific format rules for embedded media.
		 */
		function formatEmbeddedContent() {
	
			var _appendParamToIframeSource = function( sourceAttribute, sourceURL, param ) {
				toArray( dom.slides.querySelectorAll( 'iframe['+ sourceAttribute +'*="'+ sourceURL +'"]' ) ).forEach( function( el ) {
					var src = el.getAttribute( sourceAttribute );
					if( src && src.indexOf( param ) === -1 ) {
						el.setAttribute( sourceAttribute, src + ( !/\?/.test( src ) ? '?' : '&' ) + param );
					}
				});
			};
	
			// YouTube frames must include "?enablejsapi=1"
			_appendParamToIframeSource( 'src', 'youtube.com/embed/', 'enablejsapi=1' );
			_appendParamToIframeSource( 'data-src', 'youtube.com/embed/', 'enablejsapi=1' );
	
			// Vimeo frames must include "?api=1"
			_appendParamToIframeSource( 'src', 'player.vimeo.com/', 'api=1' );
			_appendParamToIframeSource( 'data-src', 'player.vimeo.com/', 'api=1' );
	
		}
	
		/**
		 * Start playback of any embedded content inside of
		 * the given element.
		 *
		 * @param {HTMLElement} element
		 */
		function startEmbeddedContent( element ) {
	
			if( element && !isSpeakerNotes() ) {
	
				// Restart GIFs
				toArray( element.querySelectorAll( 'img[src$=".gif"]' ) ).forEach( function( el ) {
					// Setting the same unchanged source like this was confirmed
					// to work in Chrome, FF & Safari
					el.setAttribute( 'src', el.getAttribute( 'src' ) );
				} );
	
				// HTML5 media elements
				toArray( element.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
					if( closestParent( el, '.fragment' ) && !closestParent( el, '.fragment.visible' ) ) {
						return;
					}
	
					// Prefer an explicit global autoplay setting
					var autoplay = config.autoPlayMedia;
	
					// If no global setting is available, fall back on the element's
					// own autoplay setting
					if( typeof autoplay !== 'boolean' ) {
						autoplay = el.hasAttribute( 'data-autoplay' ) || !!closestParent( el, '.slide-background' );
					}
	
					if( autoplay && typeof el.play === 'function' ) {
	
						if( el.readyState > 1 ) {
							startEmbeddedMedia( { target: el } );
						}
						else {
							el.removeEventListener( 'loadeddata', startEmbeddedMedia ); // remove first to avoid dupes
							el.addEventListener( 'loadeddata', startEmbeddedMedia );
						}
	
					}
				} );
	
				// Normal iframes
				toArray( element.querySelectorAll( 'iframe[src]' ) ).forEach( function( el ) {
					if( closestParent( el, '.fragment' ) && !closestParent( el, '.fragment.visible' ) ) {
						return;
					}
	
					startEmbeddedIframe( { target: el } );
				} );
	
				// Lazy loading iframes
				toArray( element.querySelectorAll( 'iframe[data-src]' ) ).forEach( function( el ) {
					if( closestParent( el, '.fragment' ) && !closestParent( el, '.fragment.visible' ) ) {
						return;
					}
	
					if( el.getAttribute( 'src' ) !== el.getAttribute( 'data-src' ) ) {
						el.removeEventListener( 'load', startEmbeddedIframe ); // remove first to avoid dupes
						el.addEventListener( 'load', startEmbeddedIframe );
						el.setAttribute( 'src', el.getAttribute( 'data-src' ) );
					}
				} );
	
			}
	
		}
	
		/**
		 * Starts playing an embedded video/audio element after
		 * it has finished loading.
		 *
		 * @param {object} event
		 */
		function startEmbeddedMedia( event ) {
	
			var isAttachedToDOM = !!closestParent( event.target, 'html' ),
				isVisible  		= !!closestParent( event.target, '.present' );
	
			if( isAttachedToDOM && isVisible ) {
				event.target.currentTime = 0;
				event.target.play();
			}
	
			event.target.removeEventListener( 'loadeddata', startEmbeddedMedia );
	
		}
	
		/**
		 * "Starts" the content of an embedded iframe using the
		 * postMessage API.
		 *
		 * @param {object} event
		 */
		function startEmbeddedIframe( event ) {
	
			var iframe = event.target;
	
			if( iframe && iframe.contentWindow ) {
	
				var isAttachedToDOM = !!closestParent( event.target, 'html' ),
					isVisible  		= !!closestParent( event.target, '.present' );
	
				if( isAttachedToDOM && isVisible ) {
	
					// Prefer an explicit global autoplay setting
					var autoplay = config.autoPlayMedia;
	
					// If no global setting is available, fall back on the element's
					// own autoplay setting
					if( typeof autoplay !== 'boolean' ) {
						autoplay = iframe.hasAttribute( 'data-autoplay' ) || !!closestParent( iframe, '.slide-background' );
					}
	
					// YouTube postMessage API
					if( /youtube\.com\/embed\//.test( iframe.getAttribute( 'src' ) ) && autoplay ) {
						iframe.contentWindow.postMessage( '{"event":"command","func":"playVideo","args":""}', '*' );
					}
					// Vimeo postMessage API
					else if( /player\.vimeo\.com\//.test( iframe.getAttribute( 'src' ) ) && autoplay ) {
						iframe.contentWindow.postMessage( '{"method":"play"}', '*' );
					}
					// Generic postMessage API
					else {
						iframe.contentWindow.postMessage( 'slide:start', '*' );
					}
	
				}
	
			}
	
		}
	
		/**
		 * Stop playback of any embedded content inside of
		 * the targeted slide.
		 *
		 * @param {HTMLElement} element
		 */
		function stopEmbeddedContent( element ) {
	
			if( element && element.parentNode ) {
				// HTML5 media elements
				toArray( element.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
					if( !el.hasAttribute( 'data-ignore' ) && typeof el.pause === 'function' ) {
						el.setAttribute('data-paused-by-reveal', '');
						el.pause();
					}
				} );
	
				// Generic postMessage API for non-lazy loaded iframes
				toArray( element.querySelectorAll( 'iframe' ) ).forEach( function( el ) {
					if( el.contentWindow ) el.contentWindow.postMessage( 'slide:stop', '*' );
					el.removeEventListener( 'load', startEmbeddedIframe );
				});
	
				// YouTube postMessage API
				toArray( element.querySelectorAll( 'iframe[src*="youtube.com/embed/"]' ) ).forEach( function( el ) {
					if( !el.hasAttribute( 'data-ignore' ) && el.contentWindow && typeof el.contentWindow.postMessage === 'function' ) {
						el.contentWindow.postMessage( '{"event":"command","func":"pauseVideo","args":""}', '*' );
					}
				});
	
				// Vimeo postMessage API
				toArray( element.querySelectorAll( 'iframe[src*="player.vimeo.com/"]' ) ).forEach( function( el ) {
					if( !el.hasAttribute( 'data-ignore' ) && el.contentWindow && typeof el.contentWindow.postMessage === 'function' ) {
						el.contentWindow.postMessage( '{"method":"pause"}', '*' );
					}
				});
	
				// Lazy loading iframes
				toArray( element.querySelectorAll( 'iframe[data-src]' ) ).forEach( function( el ) {
					// Only removing the src doesn't actually unload the frame
					// in all browsers (Firefox) so we set it to blank first
					el.setAttribute( 'src', 'about:blank' );
					el.removeAttribute( 'src' );
				} );
			}
	
		}
	
		/**
		 * Returns the number of past slides. This can be used as a global
		 * flattened index for slides.
		 *
		 * @return {number} Past slide count
		 */
		function getSlidePastCount() {
	
			var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
	
			// The number of past slides
			var pastCount = 0;
	
			// Step through all slides and count the past ones
			mainLoop: for( var i = 0; i < horizontalSlides.length; i++ ) {
	
				var horizontalSlide = horizontalSlides[i];
				var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
	
				for( var j = 0; j < verticalSlides.length; j++ ) {
	
					// Stop as soon as we arrive at the present
					if( verticalSlides[j].classList.contains( 'present' ) ) {
						break mainLoop;
					}
	
					pastCount++;
	
				}
	
				// Stop as soon as we arrive at the present
				if( horizontalSlide.classList.contains( 'present' ) ) {
					break;
				}
	
				// Don't count the wrapping section for vertical slides
				if( horizontalSlide.classList.contains( 'stack' ) === false ) {
					pastCount++;
				}
	
			}
	
			return pastCount;
	
		}
	
		/**
		 * Returns a value ranging from 0-1 that represents
		 * how far into the presentation we have navigated.
		 *
		 * @return {number}
		 */
		function getProgress() {
	
			// The number of past and total slides
			var totalCount = getTotalSlides();
			var pastCount = getSlidePastCount();
	
			if( currentSlide ) {
	
				var allFragments = currentSlide.querySelectorAll( '.fragment' );
	
				// If there are fragments in the current slide those should be
				// accounted for in the progress.
				if( allFragments.length > 0 ) {
					var visibleFragments = currentSlide.querySelectorAll( '.fragment.visible' );
	
					// This value represents how big a portion of the slide progress
					// that is made up by its fragments (0-1)
					var fragmentWeight = 0.9;
	
					// Add fragment progress to the past slide count
					pastCount += ( visibleFragments.length / allFragments.length ) * fragmentWeight;
				}
	
			}
	
			return pastCount / ( totalCount - 1 );
	
		}
	
		/**
		 * Checks if this presentation is running inside of the
		 * speaker notes window.
		 *
		 * @return {boolean}
		 */
		function isSpeakerNotes() {
	
			return !!window.location.search.match( /receiver/gi );
	
		}
	
		/**
		 * Reads the current URL (hash) and navigates accordingly.
		 */
		function readURL() {
	
			var hash = window.location.hash;
	
			// Attempt to parse the hash as either an index or name
			var bits = hash.slice( 2 ).split( '/' ),
				name = hash.replace( /#|\//gi, '' );
	
			// If the first bit is invalid and there is a name we can
			// assume that this is a named link
			if( isNaN( parseInt( bits[0], 10 ) ) && name.length ) {
				var element;
	
				// Ensure the named link is a valid HTML ID attribute
				if( /^[a-zA-Z][\w:.-]*$/.test( name ) ) {
					// Find the slide with the specified ID
					element = document.getElementById( name );
				}
	
				if( element ) {
					// Find the position of the named slide and navigate to it
					var indices = Reveal.getIndices( element );
					slide( indices.h, indices.v );
				}
				// If the slide doesn't exist, navigate to the current slide
				else {
					slide( indexh || 0, indexv || 0 );
				}
			}
			else {
				// Read the index components of the hash
				var h = parseInt( bits[0], 10 ) || 0,
					v = parseInt( bits[1], 10 ) || 0;
	
				if( h !== indexh || v !== indexv ) {
					slide( h, v );
				}
			}
	
		}
	
		/**
		 * Updates the page URL (hash) to reflect the current
		 * state.
		 *
		 * @param {number} delay The time in ms to wait before
		 * writing the hash
		 */
		function writeURL( delay ) {
	
			if( config.history ) {
	
				// Make sure there's never more than one timeout running
				clearTimeout( writeURLTimeout );
	
				// If a delay is specified, timeout this call
				if( typeof delay === 'number' ) {
					writeURLTimeout = setTimeout( writeURL, delay );
				}
				else if( currentSlide ) {
					var url = '/';
	
					// Attempt to create a named link based on the slide's ID
					var id = currentSlide.getAttribute( 'id' );
					if( id ) {
						id = id.replace( /[^a-zA-Z0-9\-\_\:\.]/g, '' );
					}
	
					// If the current slide has an ID, use that as a named link
					if( typeof id === 'string' && id.length ) {
						url = '/' + id;
					}
					// Otherwise use the /h/v index
					else {
						if( indexh > 0 || indexv > 0 ) url += indexh;
						if( indexv > 0 ) url += '/' + indexv;
					}
	
					window.location.hash = url;
				}
			}
	
		}
		/**
		 * Retrieves the h/v location and fragment of the current,
		 * or specified, slide.
		 *
		 * @param {HTMLElement} [slide] If specified, the returned
		 * index will be for this slide rather than the currently
		 * active one
		 *
		 * @return {{h: number, v: number, f: number}}
		 */
		function getIndices( slide ) {
	
			// By default, return the current indices
			var h = indexh,
				v = indexv,
				f;
	
			// If a slide is specified, return the indices of that slide
			if( slide ) {
				var isVertical = isVerticalSlide( slide );
				var slideh = isVertical ? slide.parentNode : slide;
	
				// Select all horizontal slides
				var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
	
				// Now that we know which the horizontal slide is, get its index
				h = Math.max( horizontalSlides.indexOf( slideh ), 0 );
	
				// Assume we're not vertical
				v = undefined;
	
				// If this is a vertical slide, grab the vertical index
				if( isVertical ) {
					v = Math.max( toArray( slide.parentNode.querySelectorAll( 'section' ) ).indexOf( slide ), 0 );
				}
			}
	
			if( !slide && currentSlide ) {
				var hasFragments = currentSlide.querySelectorAll( '.fragment' ).length > 0;
				if( hasFragments ) {
					var currentFragment = currentSlide.querySelector( '.current-fragment' );
					if( currentFragment && currentFragment.hasAttribute( 'data-fragment-index' ) ) {
						f = parseInt( currentFragment.getAttribute( 'data-fragment-index' ), 10 );
					}
					else {
						f = currentSlide.querySelectorAll( '.fragment.visible' ).length - 1;
					}
				}
			}
	
			return { h: h, v: v, f: f };
	
		}
	
		/**
		 * Retrieves all slides in this presentation.
		 */
		function getSlides() {
	
			return toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ':not(.stack)' ));
	
		}
	
		/**
		 * Retrieves the total number of slides in this presentation.
		 *
		 * @return {number}
		 */
		function getTotalSlides() {
	
			return getSlides().length;
	
		}
	
		/**
		 * Returns the slide element matching the specified index.
		 *
		 * @return {HTMLElement}
		 */
		function getSlide( x, y ) {
	
			var horizontalSlide = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR )[ x ];
			var verticalSlides = horizontalSlide && horizontalSlide.querySelectorAll( 'section' );
	
			if( verticalSlides && verticalSlides.length && typeof y === 'number' ) {
				return verticalSlides ? verticalSlides[ y ] : undefined;
			}
	
			return horizontalSlide;
	
		}
	
		/**
		 * Returns the background element for the given slide.
		 * All slides, even the ones with no background properties
		 * defined, have a background element so as long as the
		 * index is valid an element will be returned.
		 *
		 * @param {number} x Horizontal background index
		 * @param {number} y Vertical background index
		 * @return {(HTMLElement[]|*)}
		 */
		function getSlideBackground( x, y ) {
	
			// When printing to PDF the slide backgrounds are nested
			// inside of the slides
			if( isPrintingPDF() ) {
				var slide = getSlide( x, y );
				if( slide ) {
					return slide.slideBackgroundElement;
				}
	
				return undefined;
			}
	
			var horizontalBackground = dom.wrapper.querySelectorAll( '.backgrounds>.slide-background' )[ x ];
			var verticalBackgrounds = horizontalBackground && horizontalBackground.querySelectorAll( '.slide-background' );
	
			if( verticalBackgrounds && verticalBackgrounds.length && typeof y === 'number' ) {
				return verticalBackgrounds ? verticalBackgrounds[ y ] : undefined;
			}
	
			return horizontalBackground;
	
		}
	
		/**
		 * Retrieves the speaker notes from a slide. Notes can be
		 * defined in two ways:
		 * 1. As a data-notes attribute on the slide <section>
		 * 2. As an <aside class="notes"> inside of the slide
		 *
		 * @param {HTMLElement} [slide=currentSlide]
		 * @return {(string|null)}
		 */
		function getSlideNotes( slide ) {
	
			// Default to the current slide
			slide = slide || currentSlide;
	
			// Notes can be specified via the data-notes attribute...
			if( slide.hasAttribute( 'data-notes' ) ) {
				return slide.getAttribute( 'data-notes' );
			}
	
			// ... or using an <aside class="notes"> element
			var notesElement = slide.querySelector( 'aside.notes' );
			if( notesElement ) {
				return notesElement.innerHTML;
			}
	
			return null;
	
		}
	
		/**
		 * Retrieves the current state of the presentation as
		 * an object. This state can then be restored at any
		 * time.
		 *
		 * @return {{indexh: number, indexv: number, indexf: number, paused: boolean, overview: boolean}}
		 */
		function getState() {
	
			var indices = getIndices();
	
			return {
				indexh: indices.h,
				indexv: indices.v,
				indexf: indices.f,
				paused: isPaused(),
				overview: isOverview()
			};
	
		}
	
		/**
		 * Restores the presentation to the given state.
		 *
		 * @param {object} state As generated by getState()
		 * @see {@link getState} generates the parameter `state`
		 */
		function setState( state ) {
	
			if( typeof state === 'object' ) {
				slide( deserialize( state.indexh ), deserialize( state.indexv ), deserialize( state.indexf ) );
	
				var pausedFlag = deserialize( state.paused ),
					overviewFlag = deserialize( state.overview );
	
				if( typeof pausedFlag === 'boolean' && pausedFlag !== isPaused() ) {
					togglePause( pausedFlag );
				}
	
				if( typeof overviewFlag === 'boolean' && overviewFlag !== isOverview() ) {
					toggleOverview( overviewFlag );
				}
			}
	
		}
	
		/**
		 * Return a sorted fragments list, ordered by an increasing
		 * "data-fragment-index" attribute.
		 *
		 * Fragments will be revealed in the order that they are returned by
		 * this function, so you can use the index attributes to control the
		 * order of fragment appearance.
		 *
		 * To maintain a sensible default fragment order, fragments are presumed
		 * to be passed in document order. This function adds a "fragment-index"
		 * attribute to each node if such an attribute is not already present,
		 * and sets that attribute to an integer value which is the position of
		 * the fragment within the fragments list.
		 *
		 * @param {object[]|*} fragments
		 * @return {object[]} sorted Sorted array of fragments
		 */
		function sortFragments( fragments ) {
	
			fragments = toArray( fragments );
	
			var ordered = [],
				unordered = [],
				sorted = [];
	
			// Group ordered and unordered elements
			fragments.forEach( function( fragment, i ) {
				if( fragment.hasAttribute( 'data-fragment-index' ) ) {
					var index = parseInt( fragment.getAttribute( 'data-fragment-index' ), 10 );
	
					if( !ordered[index] ) {
						ordered[index] = [];
					}
	
					ordered[index].push( fragment );
				}
				else {
					unordered.push( [ fragment ] );
				}
			} );
	
			// Append fragments without explicit indices in their
			// DOM order
			ordered = ordered.concat( unordered );
	
			// Manually count the index up per group to ensure there
			// are no gaps
			var index = 0;
	
			// Push all fragments in their sorted order to an array,
			// this flattens the groups
			ordered.forEach( function( group ) {
				group.forEach( function( fragment ) {
					sorted.push( fragment );
					fragment.setAttribute( 'data-fragment-index', index );
				} );
	
				index ++;
			} );
	
			return sorted;
	
		}
	
		/**
		 * Navigate to the specified slide fragment.
		 *
		 * @param {?number} index The index of the fragment that
		 * should be shown, -1 means all are invisible
		 * @param {number} offset Integer offset to apply to the
		 * fragment index
		 *
		 * @return {boolean} true if a change was made in any
		 * fragments visibility as part of this call
		 */
		function navigateFragment( index, offset ) {
	
			if( currentSlide && config.fragments ) {
	
				var fragments = sortFragments( currentSlide.querySelectorAll( '.fragment' ) );
				if( fragments.length ) {
	
					// If no index is specified, find the current
					if( typeof index !== 'number' ) {
						var lastVisibleFragment = sortFragments( currentSlide.querySelectorAll( '.fragment.visible' ) ).pop();
	
						if( lastVisibleFragment ) {
							index = parseInt( lastVisibleFragment.getAttribute( 'data-fragment-index' ) || 0, 10 );
						}
						else {
							index = -1;
						}
					}
	
					// If an offset is specified, apply it to the index
					if( typeof offset === 'number' ) {
						index += offset;
					}
	
					var fragmentsShown = [],
						fragmentsHidden = [];
	
					toArray( fragments ).forEach( function( element, i ) {
	
						if( element.hasAttribute( 'data-fragment-index' ) ) {
							i = parseInt( element.getAttribute( 'data-fragment-index' ), 10 );
						}
	
						// Visible fragments
						if( i <= index ) {
							if( !element.classList.contains( 'visible' ) ) fragmentsShown.push( element );
							element.classList.add( 'visible' );
							element.classList.remove( 'current-fragment' );
	
							// Announce the fragments one by one to the Screen Reader
							dom.statusDiv.textContent = getStatusText( element );
	
							if( i === index ) {
								element.classList.add( 'current-fragment' );
								startEmbeddedContent( element );
							}
						}
						// Hidden fragments
						else {
							if( element.classList.contains( 'visible' ) ) fragmentsHidden.push( element );
							element.classList.remove( 'visible' );
							element.classList.remove( 'current-fragment' );
						}
	
					} );
	
					if( fragmentsHidden.length ) {
						dispatchEvent( 'fragmenthidden', { fragment: fragmentsHidden[0], fragments: fragmentsHidden } );
					}
	
					if( fragmentsShown.length ) {
						dispatchEvent( 'fragmentshown', { fragment: fragmentsShown[0], fragments: fragmentsShown } );
					}
	
					updateControls();
					updateProgress();
	
					return !!( fragmentsShown.length || fragmentsHidden.length );
	
				}
	
			}
	
			return false;
	
		}
	
		/**
		 * Navigate to the next slide fragment.
		 *
		 * @return {boolean} true if there was a next fragment,
		 * false otherwise
		 */
		function nextFragment() {
	
			return navigateFragment( null, 1 );
	
		}
	
		/**
		 * Navigate to the previous slide fragment.
		 *
		 * @return {boolean} true if there was a previous fragment,
		 * false otherwise
		 */
		function previousFragment() {
	
			return navigateFragment( null, -1 );
	
		}
	
		/**
		 * Cues a new automated slide if enabled in the config.
		 */
		function cueAutoSlide() {
	
			cancelAutoSlide();
	
			if( currentSlide ) {
	
				var fragment = currentSlide.querySelector( '.current-fragment' );
	
				// When the slide first appears there is no "current" fragment so
				// we look for a data-autoslide timing on the first fragment
				if( !fragment ) fragment = currentSlide.querySelector( '.fragment' );
	
				var fragmentAutoSlide = fragment ? fragment.getAttribute( 'data-autoslide' ) : null;
				var parentAutoSlide = currentSlide.parentNode ? currentSlide.parentNode.getAttribute( 'data-autoslide' ) : null;
				var slideAutoSlide = currentSlide.getAttribute( 'data-autoslide' );
	
				// Pick value in the following priority order:
				// 1. Current fragment's data-autoslide
				// 2. Current slide's data-autoslide
				// 3. Parent slide's data-autoslide
				// 4. Global autoSlide setting
				if( fragmentAutoSlide ) {
					autoSlide = parseInt( fragmentAutoSlide, 10 );
				}
				else if( slideAutoSlide ) {
					autoSlide = parseInt( slideAutoSlide, 10 );
				}
				else if( parentAutoSlide ) {
					autoSlide = parseInt( parentAutoSlide, 10 );
				}
				else {
					autoSlide = config.autoSlide;
				}
	
				// If there are media elements with data-autoplay,
				// automatically set the autoSlide duration to the
				// length of that media. Not applicable if the slide
				// is divided up into fragments.
				// playbackRate is accounted for in the duration.
				if( currentSlide.querySelectorAll( '.fragment' ).length === 0 ) {
					toArray( currentSlide.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
						if( el.hasAttribute( 'data-autoplay' ) ) {
							if( autoSlide && (el.duration * 1000 / el.playbackRate ) > autoSlide ) {
								autoSlide = ( el.duration * 1000 / el.playbackRate ) + 1000;
							}
						}
					} );
				}
	
				// Cue the next auto-slide if:
				// - There is an autoSlide value
				// - Auto-sliding isn't paused by the user
				// - The presentation isn't paused
				// - The overview isn't active
				// - The presentation isn't over
				if( autoSlide && !autoSlidePaused && !isPaused() && !isOverview() && ( !Reveal.isLastSlide() || availableFragments().next || config.loop === true ) ) {
					autoSlideTimeout = setTimeout( function() {
						typeof config.autoSlideMethod === 'function' ? config.autoSlideMethod() : navigateNext();
						cueAutoSlide();
					}, autoSlide );
					autoSlideStartTime = Date.now();
				}
	
				if( autoSlidePlayer ) {
					autoSlidePlayer.setPlaying( autoSlideTimeout !== -1 );
				}
	
			}
	
		}
	
		/**
		 * Cancels any ongoing request to auto-slide.
		 */
		function cancelAutoSlide() {
	
			clearTimeout( autoSlideTimeout );
			autoSlideTimeout = -1;
	
		}
	
		function pauseAutoSlide() {
	
			if( autoSlide && !autoSlidePaused ) {
				autoSlidePaused = true;
				dispatchEvent( 'autoslidepaused' );
				clearTimeout( autoSlideTimeout );
	
				if( autoSlidePlayer ) {
					autoSlidePlayer.setPlaying( false );
				}
			}
	
		}
	
		function resumeAutoSlide() {
	
			if( autoSlide && autoSlidePaused ) {
				autoSlidePaused = false;
				dispatchEvent( 'autoslideresumed' );
				cueAutoSlide();
			}
	
		}
	
		function navigateLeft() {
	
			// Reverse for RTL
			if( config.rtl ) {
				if( ( isOverview() || nextFragment() === false ) && availableRoutes().left ) {
					slide( indexh + 1 );
				}
			}
			// Normal navigation
			else if( ( isOverview() || previousFragment() === false ) && availableRoutes().left ) {
				slide( indexh - 1 );
			}
	
		}
	
		function navigateRight() {
	
			// Reverse for RTL
			if( config.rtl ) {
				if( ( isOverview() || previousFragment() === false ) && availableRoutes().right ) {
					slide( indexh - 1 );
				}
			}
			// Normal navigation
			else if( ( isOverview() || nextFragment() === false ) && availableRoutes().right ) {
				slide( indexh + 1 );
			}
	
		}
	
		function navigateUp() {
	
			// Prioritize hiding fragments
			if( ( isOverview() || previousFragment() === false ) && availableRoutes().up ) {
				slide( indexh, indexv - 1 );
			}
	
		}
	
		function navigateDown() {
	
			// Prioritize revealing fragments
			if( ( isOverview() || nextFragment() === false ) && availableRoutes().down ) {
				slide( indexh, indexv + 1 );
			}
	
		}
	
		/**
		 * Navigates backwards, prioritized in the following order:
		 * 1) Previous fragment
		 * 2) Previous vertical slide
		 * 3) Previous horizontal slide
		 */
		function navigatePrev() {
	
			// Prioritize revealing fragments
			if( previousFragment() === false ) {
				if( availableRoutes().up ) {
					navigateUp();
				}
				else {
					// Fetch the previous horizontal slide, if there is one
					var previousSlide;
	
					if( config.rtl ) {
						previousSlide = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.future' ) ).pop();
					}
					else {
						previousSlide = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.past' ) ).pop();
					}
	
					if( previousSlide ) {
						var v = ( previousSlide.querySelectorAll( 'section' ).length - 1 ) || undefined;
						var h = indexh - 1;
						slide( h, v );
					}
				}
			}
	
		}
	
		/**
		 * The reverse of #navigatePrev().
		 */
		function navigateNext() {
	
			// Prioritize revealing fragments
			if( nextFragment() === false ) {
				if( availableRoutes().down ) {
					navigateDown();
				}
				else if( config.rtl ) {
					navigateLeft();
				}
				else {
					navigateRight();
				}
			}
	
		}
	
		/**
		 * Checks if the target element prevents the triggering of
		 * swipe navigation.
		 */
		function isSwipePrevented( target ) {
	
			while( target && typeof target.hasAttribute === 'function' ) {
				if( target.hasAttribute( 'data-prevent-swipe' ) ) return true;
				target = target.parentNode;
			}
	
			return false;
	
		}
	
	
		// --------------------------------------------------------------------//
		// ----------------------------- EVENTS -------------------------------//
		// --------------------------------------------------------------------//
	
		/**
		 * Called by all event handlers that are based on user
		 * input.
		 *
		 * @param {object} [event]
		 */
		function onUserInput( event ) {
	
			if( config.autoSlideStoppable ) {
				pauseAutoSlide();
			}
	
		}
	
		/**
		 * Handler for the document level 'keypress' event.
		 *
		 * @param {object} event
		 */
		function onDocumentKeyPress( event ) {
	
			// Check if the pressed key is question mark
			if( event.shiftKey && event.charCode === 63 ) {
				toggleHelp();
			}
	
		}
	
		/**
		 * Handler for the document level 'keydown' event.
		 *
		 * @param {object} event
		 */
		function onDocumentKeyDown( event ) {
	
			// If there's a condition specified and it returns false,
			// ignore this event
			if( typeof config.keyboardCondition === 'function' && config.keyboardCondition() === false ) {
				return true;
			}
	
			// Remember if auto-sliding was paused so we can toggle it
			var autoSlideWasPaused = autoSlidePaused;
	
			onUserInput( event );
	
			// Check if there's a focused element that could be using
			// the keyboard
			var activeElementIsCE = document.activeElement && document.activeElement.contentEditable !== 'inherit';
			var activeElementIsInput = document.activeElement && document.activeElement.tagName && /input|textarea/i.test( document.activeElement.tagName );
			var activeElementIsNotes = document.activeElement && document.activeElement.className && /speaker-notes/i.test( document.activeElement.className);
	
			// Disregard the event if there's a focused element or a
			// keyboard modifier key is present
			if( activeElementIsCE || activeElementIsInput || activeElementIsNotes || (event.shiftKey && event.keyCode !== 32) || event.altKey || event.ctrlKey || event.metaKey ) return;
	
			// While paused only allow resume keyboard events; 'b', 'v', '.'
			var resumeKeyCodes = [66,86,190,191];
			var key;
	
			// Custom key bindings for togglePause should be able to resume
			if( typeof config.keyboard === 'object' ) {
				for( key in config.keyboard ) {
					if( config.keyboard[key] === 'togglePause' ) {
						resumeKeyCodes.push( parseInt( key, 10 ) );
					}
				}
			}
	
			if( isPaused() && resumeKeyCodes.indexOf( event.keyCode ) === -1 ) {
				return false;
			}
	
			var triggered = false;
	
			// 1. User defined key bindings
			if( typeof config.keyboard === 'object' ) {
	
				for( key in config.keyboard ) {
	
					// Check if this binding matches the pressed key
					if( parseInt( key, 10 ) === event.keyCode ) {
	
						var value = config.keyboard[ key ];
	
						// Callback function
						if( typeof value === 'function' ) {
							value.apply( null, [ event ] );
						}
						// String shortcuts to reveal.js API
						else if( typeof value === 'string' && typeof Reveal[ value ] === 'function' ) {
							Reveal[ value ].call();
						}
	
						triggered = true;
	
					}
	
				}
	
			}
	
			// 2. System defined key bindings
			if( triggered === false ) {
	
				// Assume true and try to prove false
				triggered = true;
	
				switch( event.keyCode ) {
					// p, page up
					case 80: case 33: navigatePrev(); break;
					// n, page down
					case 78: case 34: navigateNext(); break;
					// h, left
					case 72: case 37: navigateLeft(); break;
					// l, right
					case 76: case 39: navigateRight(); break;
					// k, up
					case 75: case 38: navigateUp(); break;
					// j, down
					case 74: case 40: navigateDown(); break;
					// home
					case 36: slide( 0 ); break;
					// end
					case 35: slide( Number.MAX_VALUE ); break;
					// space
					case 32: isOverview() ? deactivateOverview() : event.shiftKey ? navigatePrev() : navigateNext(); break;
					// return
					case 13: isOverview() ? deactivateOverview() : triggered = false; break;
					// two-spot, semicolon, b, v, period, Logitech presenter tools "black screen" button
					case 58: case 59: case 66: case 86: case 190: case 191: togglePause(); break;
					// f
					case 70: enterFullscreen(); break;
					// a
					case 65: if ( config.autoSlideStoppable ) toggleAutoSlide( autoSlideWasPaused ); break;
					default:
						triggered = false;
				}
	
			}
	
			// If the input resulted in a triggered action we should prevent
			// the browsers default behavior
			if( triggered ) {
				event.preventDefault && event.preventDefault();
			}
			// ESC or O key
			else if ( ( event.keyCode === 27 || event.keyCode === 79 ) && features.transforms3d ) {
				if( dom.overlay ) {
					closeOverlay();
				}
				else {
					toggleOverview();
				}
	
				event.preventDefault && event.preventDefault();
			}
	
			// If auto-sliding is enabled we need to cue up
			// another timeout
			cueAutoSlide();
	
		}
	
		/**
		 * Handler for the 'touchstart' event, enables support for
		 * swipe and pinch gestures.
		 *
		 * @param {object} event
		 */
		function onTouchStart( event ) {
	
			if( isSwipePrevented( event.target ) ) return true;
	
			touch.startX = event.touches[0].clientX;
			touch.startY = event.touches[0].clientY;
			touch.startCount = event.touches.length;
	
			// If there's two touches we need to memorize the distance
			// between those two points to detect pinching
			if( event.touches.length === 2 && config.overview ) {
				touch.startSpan = distanceBetween( {
					x: event.touches[1].clientX,
					y: event.touches[1].clientY
				}, {
					x: touch.startX,
					y: touch.startY
				} );
			}
	
		}
	
		/**
		 * Handler for the 'touchmove' event.
		 *
		 * @param {object} event
		 */
		function onTouchMove( event ) {
	
			if( isSwipePrevented( event.target ) ) return true;
	
			// Each touch should only trigger one action
			if( !touch.captured ) {
				onUserInput( event );
	
				var currentX = event.touches[0].clientX;
				var currentY = event.touches[0].clientY;
	
				// If the touch started with two points and still has
				// two active touches; test for the pinch gesture
				if( event.touches.length === 2 && touch.startCount === 2 && config.overview ) {
	
					// The current distance in pixels between the two touch points
					var currentSpan = distanceBetween( {
						x: event.touches[1].clientX,
						y: event.touches[1].clientY
					}, {
						x: touch.startX,
						y: touch.startY
					} );
	
					// If the span is larger than the desire amount we've got
					// ourselves a pinch
					if( Math.abs( touch.startSpan - currentSpan ) > touch.threshold ) {
						touch.captured = true;
	
						if( currentSpan < touch.startSpan ) {
							activateOverview();
						}
						else {
							deactivateOverview();
						}
					}
	
					event.preventDefault();
	
				}
				// There was only one touch point, look for a swipe
				else if( event.touches.length === 1 && touch.startCount !== 2 ) {
	
					var deltaX = currentX - touch.startX,
						deltaY = currentY - touch.startY;
	
					if( deltaX > touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
						touch.captured = true;
						navigateLeft();
					}
					else if( deltaX < -touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
						touch.captured = true;
						navigateRight();
					}
					else if( deltaY > touch.threshold ) {
						touch.captured = true;
						navigateUp();
					}
					else if( deltaY < -touch.threshold ) {
						touch.captured = true;
						navigateDown();
					}
	
					// If we're embedded, only block touch events if they have
					// triggered an action
					if( config.embedded ) {
						if( touch.captured || isVerticalSlide( currentSlide ) ) {
							event.preventDefault();
						}
					}
					// Not embedded? Block them all to avoid needless tossing
					// around of the viewport in iOS
					else {
						event.preventDefault();
					}
	
				}
			}
			// There's a bug with swiping on some Android devices unless
			// the default action is always prevented
			else if( UA.match( /android/gi ) ) {
				event.preventDefault();
			}
	
		}
	
		/**
		 * Handler for the 'touchend' event.
		 *
		 * @param {object} event
		 */
		function onTouchEnd( event ) {
	
			touch.captured = false;
	
		}
	
		/**
		 * Convert pointer down to touch start.
		 *
		 * @param {object} event
		 */
		function onPointerDown( event ) {
	
			if( event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch" ) {
				event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
				onTouchStart( event );
			}
	
		}
	
		/**
		 * Convert pointer move to touch move.
		 *
		 * @param {object} event
		 */
		function onPointerMove( event ) {
	
			if( event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch" )  {
				event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
				onTouchMove( event );
			}
	
		}
	
		/**
		 * Convert pointer up to touch end.
		 *
		 * @param {object} event
		 */
		function onPointerUp( event ) {
	
			if( event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch" )  {
				event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
				onTouchEnd( event );
			}
	
		}
	
		/**
		 * Handles mouse wheel scrolling, throttled to avoid skipping
		 * multiple slides.
		 *
		 * @param {object} event
		 */
		function onDocumentMouseScroll( event ) {
	
			if( Date.now() - lastMouseWheelStep > 600 ) {
	
				lastMouseWheelStep = Date.now();
	
				var delta = event.detail || -event.wheelDelta;
				if( delta > 0 ) {
					navigateNext();
				}
				else if( delta < 0 ) {
					navigatePrev();
				}
	
			}
	
		}
	
		/**
		 * Clicking on the progress bar results in a navigation to the
		 * closest approximate horizontal slide using this equation:
		 *
		 * ( clickX / presentationWidth ) * numberOfSlides
		 *
		 * @param {object} event
		 */
		function onProgressClicked( event ) {
	
			onUserInput( event );
	
			event.preventDefault();
	
			var slidesTotal = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).length;
			var slideIndex = Math.floor( ( event.clientX / dom.wrapper.offsetWidth ) * slidesTotal );
	
			if( config.rtl ) {
				slideIndex = slidesTotal - slideIndex;
			}
	
			slide( slideIndex );
	
		}
	
		/**
		 * Event handler for navigation control buttons.
		 */
		function onNavigateLeftClicked( event ) { event.preventDefault(); onUserInput(); navigateLeft(); }
		function onNavigateRightClicked( event ) { event.preventDefault(); onUserInput(); navigateRight(); }
		function onNavigateUpClicked( event ) { event.preventDefault(); onUserInput(); navigateUp(); }
		function onNavigateDownClicked( event ) { event.preventDefault(); onUserInput(); navigateDown(); }
		function onNavigatePrevClicked( event ) { event.preventDefault(); onUserInput(); navigatePrev(); }
		function onNavigateNextClicked( event ) { event.preventDefault(); onUserInput(); navigateNext(); }
	
		/**
		 * Handler for the window level 'hashchange' event.
		 *
		 * @param {object} [event]
		 */
		function onWindowHashChange( event ) {
	
			readURL();
	
		}
	
		/**
		 * Handler for the window level 'resize' event.
		 *
		 * @param {object} [event]
		 */
		function onWindowResize( event ) {
	
			layout();
	
		}
	
		/**
		 * Handle for the window level 'visibilitychange' event.
		 *
		 * @param {object} [event]
		 */
		function onPageVisibilityChange( event ) {
	
			var isHidden =  document.webkitHidden ||
							document.msHidden ||
							document.hidden;
	
			// If, after clicking a link or similar and we're coming back,
			// focus the document.body to ensure we can use keyboard shortcuts
			if( isHidden === false && document.activeElement !== document.body ) {
				// Not all elements support .blur() - SVGs among them.
				if( typeof document.activeElement.blur === 'function' ) {
					document.activeElement.blur();
				}
				document.body.focus();
			}
	
		}
	
		/**
		 * Invoked when a slide is and we're in the overview.
		 *
		 * @param {object} event
		 */
		function onOverviewSlideClicked( event ) {
	
			// TODO There's a bug here where the event listeners are not
			// removed after deactivating the overview.
			if( eventsAreBound && isOverview() ) {
				event.preventDefault();
	
				var element = event.target;
	
				while( element && !element.nodeName.match( /section/gi ) ) {
					element = element.parentNode;
				}
	
				if( element && !element.classList.contains( 'disabled' ) ) {
	
					deactivateOverview();
	
					if( element.nodeName.match( /section/gi ) ) {
						var h = parseInt( element.getAttribute( 'data-index-h' ), 10 ),
							v = parseInt( element.getAttribute( 'data-index-v' ), 10 );
	
						slide( h, v );
					}
	
				}
			}
	
		}
	
		/**
		 * Handles clicks on links that are set to preview in the
		 * iframe overlay.
		 *
		 * @param {object} event
		 */
		function onPreviewLinkClicked( event ) {
	
			if( event.currentTarget && event.currentTarget.hasAttribute( 'href' ) ) {
				var url = event.currentTarget.getAttribute( 'href' );
				if( url ) {
					showPreview( url );
					event.preventDefault();
				}
			}
	
		}
	
		/**
		 * Handles click on the auto-sliding controls element.
		 *
		 * @param {object} [event]
		 */
		function onAutoSlidePlayerClick( event ) {
	
			// Replay
			if( Reveal.isLastSlide() && config.loop === false ) {
				slide( 0, 0 );
				resumeAutoSlide();
			}
			// Resume
			else if( autoSlidePaused ) {
				resumeAutoSlide();
			}
			// Pause
			else {
				pauseAutoSlide();
			}
	
		}
	
	
		// --------------------------------------------------------------------//
		// ------------------------ PLAYBACK COMPONENT ------------------------//
		// --------------------------------------------------------------------//
	
	
		/**
		 * Constructor for the playback component, which displays
		 * play/pause/progress controls.
		 *
		 * @param {HTMLElement} container The component will append
		 * itself to this
		 * @param {function} progressCheck A method which will be
		 * called frequently to get the current progress on a range
		 * of 0-1
		 */
		function Playback( container, progressCheck ) {
	
			// Cosmetics
			this.diameter = 100;
			this.diameter2 = this.diameter/2;
			this.thickness = 6;
	
			// Flags if we are currently playing
			this.playing = false;
	
			// Current progress on a 0-1 range
			this.progress = 0;
	
			// Used to loop the animation smoothly
			this.progressOffset = 1;
	
			this.container = container;
			this.progressCheck = progressCheck;
	
			this.canvas = document.createElement( 'canvas' );
			this.canvas.className = 'playback';
			this.canvas.width = this.diameter;
			this.canvas.height = this.diameter;
			this.canvas.style.width = this.diameter2 + 'px';
			this.canvas.style.height = this.diameter2 + 'px';
			this.context = this.canvas.getContext( '2d' );
	
			this.container.appendChild( this.canvas );
	
			this.render();
	
		}
	
		/**
		 * @param value
		 */
		Playback.prototype.setPlaying = function( value ) {
	
			var wasPlaying = this.playing;
	
			this.playing = value;
	
			// Start repainting if we weren't already
			if( !wasPlaying && this.playing ) {
				this.animate();
			}
			else {
				this.render();
			}
	
		};
	
		Playback.prototype.animate = function() {
	
			var progressBefore = this.progress;
	
			this.progress = this.progressCheck();
	
			// When we loop, offset the progress so that it eases
			// smoothly rather than immediately resetting
			if( progressBefore > 0.8 && this.progress < 0.2 ) {
				this.progressOffset = this.progress;
			}
	
			this.render();
	
			if( this.playing ) {
				features.requestAnimationFrameMethod.call( window, this.animate.bind( this ) );
			}
	
		};
	
		/**
		 * Renders the current progress and playback state.
		 */
		Playback.prototype.render = function() {
	
			var progress = this.playing ? this.progress : 0,
				radius = ( this.diameter2 ) - this.thickness,
				x = this.diameter2,
				y = this.diameter2,
				iconSize = 28;
	
			// Ease towards 1
			this.progressOffset += ( 1 - this.progressOffset ) * 0.1;
	
			var endAngle = ( - Math.PI / 2 ) + ( progress * ( Math.PI * 2 ) );
			var startAngle = ( - Math.PI / 2 ) + ( this.progressOffset * ( Math.PI * 2 ) );
	
			this.context.save();
			this.context.clearRect( 0, 0, this.diameter, this.diameter );
	
			// Solid background color
			this.context.beginPath();
			this.context.arc( x, y, radius + 4, 0, Math.PI * 2, false );
			this.context.fillStyle = 'rgba( 0, 0, 0, 0.4 )';
			this.context.fill();
	
			// Draw progress track
			this.context.beginPath();
			this.context.arc( x, y, radius, 0, Math.PI * 2, false );
			this.context.lineWidth = this.thickness;
			this.context.strokeStyle = '#666';
			this.context.stroke();
	
			if( this.playing ) {
				// Draw progress on top of track
				this.context.beginPath();
				this.context.arc( x, y, radius, startAngle, endAngle, false );
				this.context.lineWidth = this.thickness;
				this.context.strokeStyle = '#fff';
				this.context.stroke();
			}
	
			this.context.translate( x - ( iconSize / 2 ), y - ( iconSize / 2 ) );
	
			// Draw play/pause icons
			if( this.playing ) {
				this.context.fillStyle = '#fff';
				this.context.fillRect( 0, 0, iconSize / 2 - 4, iconSize );
				this.context.fillRect( iconSize / 2 + 4, 0, iconSize / 2 - 4, iconSize );
			}
			else {
				this.context.beginPath();
				this.context.translate( 4, 0 );
				this.context.moveTo( 0, 0 );
				this.context.lineTo( iconSize - 4, iconSize / 2 );
				this.context.lineTo( 0, iconSize );
				this.context.fillStyle = '#fff';
				this.context.fill();
			}
	
			this.context.restore();
	
		};
	
		Playback.prototype.on = function( type, listener ) {
			this.canvas.addEventListener( type, listener, false );
		};
	
		Playback.prototype.off = function( type, listener ) {
			this.canvas.removeEventListener( type, listener, false );
		};
	
		Playback.prototype.destroy = function() {
	
			this.playing = false;
	
			if( this.canvas.parentNode ) {
				this.container.removeChild( this.canvas );
			}
	
		};
	
	
		// --------------------------------------------------------------------//
		// ------------------------------- API --------------------------------//
		// --------------------------------------------------------------------//
	
	
		Reveal = {
			VERSION: VERSION,
	
			initialize: initialize,
			configure: configure,
			sync: sync,
	
			// Navigation methods
			slide: slide,
			left: navigateLeft,
			right: navigateRight,
			up: navigateUp,
			down: navigateDown,
			prev: navigatePrev,
			next: navigateNext,
	
			// Fragment methods
			navigateFragment: navigateFragment,
			prevFragment: previousFragment,
			nextFragment: nextFragment,
	
			// Deprecated aliases
			navigateTo: slide,
			navigateLeft: navigateLeft,
			navigateRight: navigateRight,
			navigateUp: navigateUp,
			navigateDown: navigateDown,
			navigatePrev: navigatePrev,
			navigateNext: navigateNext,
	
			// Forces an update in slide layout
			layout: layout,
	
			// Randomizes the order of slides
			shuffle: shuffle,
	
			// Returns an object with the available routes as booleans (left/right/top/bottom)
			availableRoutes: availableRoutes,
	
			// Returns an object with the available fragments as booleans (prev/next)
			availableFragments: availableFragments,
	
			// Toggles a help overlay with keyboard shortcuts
			toggleHelp: toggleHelp,
	
			// Toggles the overview mode on/off
			toggleOverview: toggleOverview,
	
			// Toggles the "black screen" mode on/off
			togglePause: togglePause,
	
			// Toggles the auto slide mode on/off
			toggleAutoSlide: toggleAutoSlide,
	
			// State checks
			isOverview: isOverview,
			isPaused: isPaused,
			isAutoSliding: isAutoSliding,
	
			// Adds or removes all internal event listeners (such as keyboard)
			addEventListeners: addEventListeners,
			removeEventListeners: removeEventListeners,
	
			// Facility for persisting and restoring the presentation state
			getState: getState,
			setState: setState,
	
			// Presentation progress
			getSlidePastCount: getSlidePastCount,
	
			// Presentation progress on range of 0-1
			getProgress: getProgress,
	
			// Returns the indices of the current, or specified, slide
			getIndices: getIndices,
	
			// Returns an Array of all slides
			getSlides: getSlides,
	
			// Returns the total number of slides
			getTotalSlides: getTotalSlides,
	
			// Returns the slide element at the specified index
			getSlide: getSlide,
	
			// Returns the slide background element at the specified index
			getSlideBackground: getSlideBackground,
	
			// Returns the speaker notes string for a slide, or null
			getSlideNotes: getSlideNotes,
	
			// Returns the previous slide element, may be null
			getPreviousSlide: function() {
				return previousSlide;
			},
	
			// Returns the current slide element
			getCurrentSlide: function() {
				return currentSlide;
			},
	
			// Returns the current scale of the presentation content
			getScale: function() {
				return scale;
			},
	
			// Returns the current configuration object
			getConfig: function() {
				return config;
			},
	
			// Helper method, retrieves query string as a key/value hash
			getQueryHash: function() {
				var query = {};
	
				location.search.replace( /[A-Z0-9]+?=([\w\.%-]*)/gi, function(a) {
					query[ a.split( '=' ).shift() ] = a.split( '=' ).pop();
				} );
	
				// Basic deserialization
				for( var i in query ) {
					var value = query[ i ];
	
					query[ i ] = deserialize( unescape( value ) );
				}
	
				return query;
			},
	
			// Returns true if we're currently on the first slide
			isFirstSlide: function() {
				return ( indexh === 0 && indexv === 0 );
			},
	
			// Returns true if we're currently on the last slide
			isLastSlide: function() {
				if( currentSlide ) {
					// Does this slide has next a sibling?
					if( currentSlide.nextElementSibling ) return false;
	
					// If it's vertical, does its parent have a next sibling?
					if( isVerticalSlide( currentSlide ) && currentSlide.parentNode.nextElementSibling ) return false;
	
					return true;
				}
	
				return false;
			},
	
			// Checks if reveal.js has been loaded and is ready for use
			isReady: function() {
				return loaded;
			},
	
			// Forward event binding to the reveal DOM element
			addEventListener: function( type, listener, useCapture ) {
				if( 'addEventListener' in window ) {
					( dom.wrapper || document.querySelector( '.reveal' ) ).addEventListener( type, listener, useCapture );
				}
			},
			removeEventListener: function( type, listener, useCapture ) {
				if( 'addEventListener' in window ) {
					( dom.wrapper || document.querySelector( '.reveal' ) ).removeEventListener( type, listener, useCapture );
				}
			},
	
			// Programatically triggers a keyboard event
			triggerKey: function( keyCode ) {
				onDocumentKeyDown( { keyCode: keyCode } );
			},
	
			// Registers a new shortcut to include in the help overlay
			registerKeyboardShortcut: function( key, value ) {
				keyboardShortcuts[key] = value;
			}
		};
	
		return Reveal;
	
	}));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160
	
	
	
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];
	
	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];
	
	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};
	
	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};
	
	var processBlock = function (H, M, offset) {
	
	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];
	
	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }
	
	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;
	
	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;
	
	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};
	
	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}
	
	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}
	
	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}
	
	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}
	
	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}
	
	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}
	
	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
	
	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');
	
	  var m = bytesToWords(message);
	
	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;
	
	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );
	
	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }
	
	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];
	
	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }
	
	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).Buffer))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	module.exports = function (Buffer) {
	
	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }
	
	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }
	
	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }
	
	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block
	
	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)
	
	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }
	
	      s += ch
	      f += ch
	
	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s
	
	    return this
	  }
	
	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8
	
	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80
	
	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)
	
	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }
	
	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)
	
	    var hash = this._update(this._block) || this._hash()
	
	    return enc ? hash.toString(enc) : hash
	  }
	
	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }
	
	  return Hash
	}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}
	
	var Buffer = __webpack_require__(1).Buffer
	var Hash   = __webpack_require__(77)(Buffer)
	
	exports.sha1 = __webpack_require__(79)(Buffer, Hash)
	exports.sha256 = __webpack_require__(80)(Buffer, Hash)
	exports.sha512 = __webpack_require__(81)(Buffer, Hash)


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */
	
	var inherits = __webpack_require__(10).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0
	
	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)
	
	  var POOL = []
	
	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()
	
	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)
	
	    this._h = null
	    this.init()
	  }
	
	  inherits(Sha1, Hash)
	
	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0
	
	    Hash.prototype.init.call(this)
	    return this
	  }
	
	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {
	
	    var a, b, c, d, e, _a, _b, _c, _d, _e
	
	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e
	
	    var w = this._w
	
	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)
	
	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )
	
	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }
	
	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }
	
	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }
	
	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }
	
	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }
	
	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }
	
	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }
	
	  return Sha1
	}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */
	
	var inherits = __webpack_require__(10).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]
	
	  var W = new Array(64)
	
	  function Sha256() {
	    this.init()
	
	    this._w = W //new Array(64)
	
	    Hash.call(this, 16*4, 14*4)
	  }
	
	  inherits(Sha256, Hash)
	
	  Sha256.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }
	
	  function R (X, n) {
	    return (X >>> n);
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }
	
	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }
	
	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }
	
	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }
	
	  Sha256.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]
	
	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w
	
	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }
	
	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0
	
	  };
	
	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)
	
	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)
	
	    return H
	  }
	
	  return Sha256
	
	}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(10).inherits
	
	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]
	
	  var W = new Array(160)
	
	  function Sha512() {
	    this.init()
	    this._w = W
	
	    Hash.call(this, 128, 112)
	  }
	
	  inherits(Sha512, Hash)
	
	  Sha512.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  Sha512.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0
	
	    for (var i = 0; i < 80; i++) {
	      var j = i * 2
	
	      var Wi, Wil
	
	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)
	
	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)
	
	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)
	
	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]
	
	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]
	
	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)
	
	        W[j] = Wi
	        W[j + 1] = Wil
	      }
	
	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)
	
	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)
	
	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]
	
	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)
	
	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)
	
	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)
	
	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }
	
	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0
	
	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }
	
	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)
	
	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }
	
	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)
	
	    return H
	  }
	
	  return Sha512
	
	}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Stream;
	
	var EE = __webpack_require__(15).EventEmitter;
	var inherits = __webpack_require__(2);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(17);
	Stream.Writable = __webpack_require__(72);
	Stream.Duplex = __webpack_require__(67);
	Stream.Transform = __webpack_require__(71);
	Stream.PassThrough = __webpack_require__(70);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js!./reveal.css", function() {
				var newContent = require("!!../../css-loader/index.js!./reveal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../css-loader/index.js!./moon.css", function() {
				var newContent = require("!!../../../css-loader/index.js!./moon.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(41);
	var reduce = __webpack_require__(73);
	var requestBase = __webpack_require__(86);
	var isObject = __webpack_require__(34);
	
	/**
	 * Root reference for iframes.
	 */
	
	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  root = this;
	}
	
	/**
	 * Noop.
	 */
	
	function noop(){};
	
	/**
	 * Expose `request`.
	 */
	
	var request = module.exports = __webpack_require__(87).bind(null, Request);
	
	/**
	 * Determine XHR.
	 */
	
	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};
	
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */
	
	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
	
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */
	
	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	    }
	  }
	  return pairs.join('&');
	}
	
	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */
	
	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  } else if (isObject(val)) {
	    for(var subkey in val) {
	      pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	    }
	    return;
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}
	
	/**
	 * Expose serialization method.
	 */
	
	 request.serializeObject = serialize;
	
	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */
	
	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;
	
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }
	
	  return obj;
	}
	
	/**
	 * Expose parser.
	 */
	
	request.parseString = parseString;
	
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */
	
	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */
	
	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };
	
	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */
	
	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;
	
	  lines.pop(); // trailing CRLF
	
	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }
	
	  return fields;
	}
	
	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */
	
	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}
	
	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function type(str){
	  return str.split(/ *; */).shift();
	};
	
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();
	
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */
	
	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this._setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this._parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}
	
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};
	
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */
	
	Response.prototype._setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);
	
	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};
	
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */
	
	Response.prototype._parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};
	
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */
	
	Response.prototype._setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	
	  var type = status / 100 | 0;
	
	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;
	
	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;
	
	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};
	
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */
	
	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	
	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	
	  return err;
	};
	
	/**
	 * Expose `Response`.
	 */
	
	request.Response = Response;
	
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */
	
	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;
	
	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }
	
	    self.emit('response', res);
	
	    if (err) {
	      return self.callback(err, res);
	    }
	
	    try {
	      if (res.status >= 200 && res.status < 300) {
	        return self.callback(err, res);
	      }
	
	      var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	      new_err.original = err;
	      new_err.response = res;
	      new_err.status = res.status;
	
	      self.callback(new_err, res);
	    } catch(e) {
	      self.callback(e); // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }
	  });
	}
	
	/**
	 * Mixin `Emitter` and `requestBase`.
	 */
	
	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}
	
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};
	
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }
	
	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;
	
	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};
	
	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/
	
	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};
	
	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};
	
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */
	
	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};
	
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */
	
	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;
	
	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;
	
	  this.callback(err);
	};
	
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */
	
	Request.prototype._timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};
	
	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */
	
	Request.prototype._appendQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	};
	
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var timeout = this._timeout;
	  var data = this._formData || this._data;
	
	  // store callback
	  this._callback = fn || noop;
	
	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	
	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }
	
	    if (0 == status) {
	      if (self.timedout) return self._timeoutError();
	      if (self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };
	
	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }
	
	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }
	
	  // querystring
	  this._appendQueryString();
	
	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }
	
	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;
	
	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }
	
	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }
	
	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }
	
	  // send stuff
	  this.emit('request', this);
	
	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};
	
	
	/**
	 * Expose `Request`.
	 */
	
	request.Request = Request;
	
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.options = function(url, data, fn){
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};
	
	request['del'] = del;
	request['delete'] = del;
	
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(34);
	
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};
	
	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};
	
	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};
	
	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};
	
	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Request}
	 */
	
	exports.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
	      self.end(function(err, res){
	        if (err) innerReject(err); else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	}
	
	/**
	 * Allow for extension
	 */
	
	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}
	
	
	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};
	
	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */
	
	exports.getHeader = exports.get;
	
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	
	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	
	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};
	
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	exports.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};
	
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */
	
	exports.withCredentials = function(){
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};
	
	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};
	
	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */
	
	exports.toJSON = function(){
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data
	  };
	};
	
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	exports._isHost = function _isHost(obj) {
	  var str = {}.toString.call(obj);
	
	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];
	
	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }
	
	  if (!obj || this._isHost(data)) return this;
	
	  // default to json
	  if (!type) this.type('json');
	  return this;
	};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */
	
	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }
	
	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }
	
	  return new RequestConstructor(method, url);
	}
	
	module.exports = request;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(76);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

	module.exports = "data:application/font-ttf;base64,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4fofAslYWP03BeH88jExAw788jExAw65R0e4AAACABQAAAN1BdEAFQAcAJ8AAbAdL7AA1rEVEemwFjKwFRCxEAErtA8RABAEK7APELEKASuxCRHpsR4BK7A2GrrAoPcWABUrCgSwAC4OsAHABLEVGfkOsBPAsxQVExMrshQVEyCKIIojBg4REjkAtAABExQVLi4uLi4BsgETFC4uLrBAGgGxEBURErECHDk5sA8RswUEFxgkFzmwChKyBxkbOTk5sAkRsQgaOTkAMDEbATMTNzMXEzMTIwMHIycDIwMHIycDJzM3FzMnIxSmrFALCApQrKa9QQgNClZ7VgoMCUEEvD4/vY7bBGD7oAIXPz/96QRg/bdAQAJJ/bdAQAJJuUdHuAAAAAACAA4AAAKuB1IACwASADoAAbATL7AA1rELEumwCxCxBgErsQUS6bEUASuxCwARErAMObAGEbYBAwQNDxESJBc5sAUSsBA5ADAxGwERMxETIwMHIycDJzM3FzMnIw7i3eHZbwYEBm+BvT1AvI3bBeH8oP1/AoEDYP4fDg4B4blHR7gAAAACABn+bwJiBdEAGQAgAEsAsA0vsQgG6QGwIS+wANaxGQ3psBkQsRQBK7ETDemxIgErsRkAERK0AQoLGiAkFzmwFBGxGx05ObATErEeHzk5ALEIDRESsAs5MDEbARQHBgcOASciJxUWOwEyNzY3EyMDByMnAyczNxczJyMZvggSMhVFBAoCMhEZclNKEMbKUgQJBFKdvD1AvI3bBGD7fyIbQSYQBgQCuARkWYAEtP1QOTkCsLlHR7gAAwAQAAACsAcvAAsADwATAD4AAbAUL7AA1rELEumwCxCxBgErsQUS6bEVASuxCwARErEMDzk5sAYRtgEDBA0OEBMkFzmwBRKxERI5OQAwMRsBETMREyMDByMnAyczNSMFMzUjEOLd4dlvBgQGb3i+vgEgv78F4fyg/X8CgQNg/h8ODgHhhcnJyQAAAAACABQAAAJeB1IACQANACYAAbAOL7EAASu0ARQABwQrsAQysQ8BK7EBABESsgMKDDk5OQAwMTMhNSEBNSEVIQETMzcjFAJK/qABYP3oASn+pYifotfbBCvb2/voBay4AAACAAwAAAIEBdEACQANACYAAbAOL7EAASu0ARQACQQrsAQysQ8BK7EBABESsgMKDDk5OQAwMTMh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ArwADgJyABQCGgBSAxgACAIaADkETQA1BLoASgQAASUClQAxAq4AUgKFAEICrgBKApMAQgHbABQCvAAMArIAUgFyAFIBbP/TAoEAUgFyAFID/QBSArIAUgKRAD8CrgBSAq4ASgH3AFICdgAlAfUAFAKyAE4CWgAQA4kAFAJqABACegAZAhQADAKwAD0BZABSArAAOQUAAHECcAA1AnAANQE7AAABgwBKAnwAQgMxAAQC0AAZBAABEAZsADUBvABKBmwANQQAATkEAAGaANcAAAQAAaoChQApAv0AFAL9ABQC/QAUAv0AFAL9ABQC/QAUBEsAEALEAEQCdABSAnQAUgJ0AFICdABSAZH/+gGRAFIBcv++AXT/ywL5ABQDKABSAtQARALUAEQC1ABEAtQARALUAEQC1AA7Au0AUALtAFAC7QBQAu0AUALAABAC1ABSAt0AQgKpADECqQAxAqkAMQKpADECqQAxAqkAMQPdADEChQBCApMAQgKTAEICkwBCApMAQgFy/98BcgBSAXL/vgF0/8sCoQBMArIAUgKRAD8CkQA/ApEAPwKRAD8CkQA/ApEAPwKyAE4CsgBOArIATgKyAE4CegAZAq4AUgJ6ABkC/QAUAqkAMQL9ABQCqQAxAv0AFAKpADECxABEAoUAQgLEAEQChQBCAsQARAKFAEICxABEAoUAQgL5AFID4wBKAvn/2QKuAEoCdABSApMAQgJ0AFICkwBCAnQAUgKTAEICdABSApMAQgJ0AEICkwBCAuEAQQK8AAwC4QBBArwADALhAEECvAAMAuEAQQK8AAwDCgBSArIAUgMKAAICsgAEAYH//AFy//YBgf/8AXL/9gGB/+EBcv/bAYH/5wFyABcBgQBSAXIAUgMoAFIC3wBSAaf/2wFs/74DAABSAoEAUgKBAFICXABSAXIAGwJcAFIBcgBSAlwAUgKnAFICXABSAkkAUgJ0ACkB1AAfAygAUgKyAFIDKABSArIAUgMoAFICsgBSArIABAMoAFICsgBSAtQARAKRAD8C1ABEApEAPwLUADUCkQASA9cARAPjAD8C4wBSAfcAUgLjAFIB9wBSAuMAUgH3AAQCvgAlAnYAJQK+ACUCdgAlAr4AJQJ2ACUCvgAlAnYAJQKHAAQDKwAUAocABAH1ABQC7QBQArIATgLtAFACsgBOAu0AUAKyAE4C7QBQArIATgLtAEICsgAjAu0AUAKyAE4EDAAZA4kAFAK8AA4CegAZAsAAEAJyABQCFAAMAnIAFAIUAAwCcgAUAhQADAHbACUChwAEAfUAFAP9AQQD/QEEBAABHwP9AZgD/QFmBAABXAQAATkEAADXA88AAAeeAAADzwAAB54AAAKKAAAB5wAAAUUAAAFFAAAA8wAAAYYAAABsAAABvABKAbwASgG8AEoDJgBKA8wASgE1ADEBNQAtATUALQJwADUCcAA1AnAANQJwADUClwBSA8QANQGGAAAB5wAAAy0ANQOpAEoDCABKBFwAAAMEABQAFAAAAAAAAAAAAAAAAAAgAFYBWgHgAqIDQANgA44DvAPaA/IEEgQuBEgEgATkBQoFWAXyBiIGjAcKBygHvAg6CFgIfAiSCKYIvAkaCb4J8gpaCsgLEAs4C1gL0gvoC/4MJAxSDGwMyAziDUYNgA36DkwOxg7kDyYPUg+iEDwQbBCUELYQ8BEUESgRPhFWEeASPhKaEvoTZhOkFHoUsBTOFQwVYBV2FcYV/BZeFr4XHBdOF8YYChhCGHAY4hlcGaYZzho6GlIavBsIGzQbXhteG3wbzByOHPIdEh3cHeoerB7KHuIe/B8eH3ofuh/4ID4gtCD+IXYhziJOIn4iriLiIxojLiNAI1gjcCPGJDYkpiUWJY4mLiaoJ2wnvigOKGQovij4KTIpmiowKsYrYiwkLMItgC5ILrgvMi+sMCwwrjDCMNQw7DEEMYgx+jJkMtAzQDPaNEw1LDVsNao17DYwNog25jdGN4g4Hjh+OTI5pDpmOuI7TDvOPEA8vD0mPag+Gj5yPt4/Tj/QQABAekDIQWJBkkIMQoBDOENaQ9pEYkVCReRG2kdcSDZIvkmgScBKHkp8SuhLQEuYS7xL4EwYTFBMrE0ITSZNPE1sTbZN6E46TnJO0E8kT0pPXk+IT65P2E/uUBRQJlBCUGpQilDGUOpRKlFQUZJR1FJCUqhTGlOGVBhUolUcVY5V8FacVvhXNleSV9RYNlh6WP5ZgloMWphbIluqXDZcxFzyXUBdiF3sXnxe8F9CX4Jf+GBaYNphWGGyYfhihGMSY3Jj9mQ4ZJRk2mUKZTplamWaZc5l8GYcZkpmnma+ZuBnEmcuZ3Rnrmf8aBxoHGgcaBxoHGgcaBxoHGgcaBxoHGgcaCpoOGhGaGJoemicaMJo4mkOaThpYmmOabhp4GngaeBqamq6atZq/mtEa4gAAQAAAVkAbQAFAAAAAAACAAEAAgAWAAABAAGXAAAAAAAAAA8AugADAAEECQAAAFAAAAADAAEECQABABoAUAADAAEECQACAA4AagADAAEECQADAD4AeAADAAEECQAEACoAtgADAAEECQAFAHgA4AADAAEECQAGACgBWAADAAEECQAJADYBgAADAAEECQAMAEQBtgADAAEECQASACoB+gADAAEECQDIABYCJAADAAEECQDJADACOgADAAEECQDKAAACagADAAEECQDLAAoCagADAAEECdkDABoCdAAyADAAMAA5ACAALQAgADIAMAAxADEALAAgAFQAaABlACAATABlAGEAZwB1AGUAIABvAGYAIABNAG8AdgBlAGEAYgBsAGUAIABUAHkAcABlAEwAZQBhAGcAdQBlACAARwBvAHQAaABpAGMAUgBlAGcAdQBsAGEAcgAxAC4ANQA2ADAAOwBVAEsAVwBOADsATABlAGEAZwB1AGUARwBvAHQAaABpAGMALQBSAGUAZwB1AGwAYQByAEwAZQBhAGcAdQBlACAARwBvAHQAaABpAGMAIABSAGUAZwB1AGwAYQByAFYAZQByAHMAaQBvAG4AIAAxAC4ANQA2ADAAOwBQAFMAIAAwADAAMQAuADUANgAwADsAaABvAHQAYwBvAG4AdgAgADEALgAwAC4ANQA2ADsAbQBhAGsAZQBvAHQAZgAuAGwAaQBiADIALgAwAC4AMgAxADMAMgA1AEwAZQBhAGcAdQBlAEcAbwB0AGgAaQBjAC0AUgBlAGcAdQBsAGEAcgBUAGgAZQAgAEwAZQBhAGcAdQBlACAAbwBmACAATQBvAHYAZQBhAGIAbABlACAAVAB5AHAAZQBoAHQAdABwADoALwAvAHQAaABlAGwAZQBhAGcAdQBlAG8AZgBtAG8AdgBlAGEAYgBsAGUAdAB5AHAAZQAuAGMAbwBtAEwAZQBhAGcAdQBlACAARwBvAHQAaABpAGMAIABSAGUAZwB1AGwAYQByAFcAZQBiAGYAbwBuAHQAIAAxAC4AMABUAHUAZQAgAEoAYQBuACAAIAA2ACAAMAA2ADoAMQA5ADoANQA5ACAAMgAwADEANQBvAHIAaQBvAG4ARgBvAG4AdAAgAFMAcQB1AGkAcgByAGUAbAACAAAAAAAA/2cAZgAAAAAAAAAAAAAAAAAAAAAAAAAAAVkAAAABAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAEgATABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAIQAiACMAJAAlACYAJwAoACkAKgArACwALQAuAC8AMAAxADIAMwA0ADUANgA3ADgAOQA6ADsAPAA9AD4APwBAAEEAQgBDAEQARQBGAEcASABJAEoASwBMAE0ATgBPAFAAUQBSAFMAVABVAFYAVwBYAFkAWgBbAFwAXQBeAF8AYABhAQIBAwEEAKMAhACFAJYAjgCLAQUAigDaAI0AwwDeAKIArQDJAMcArgBiAGMAkABkAMsAZQDIAMoAzwDMAM0AzgDpAGYA0wDQANEArwBnAJEA1gDUANUAaADrAO0AiQBqAGkAawBtAGwAbgCgAG8AcQBwAHIAcwB1AHQAdgB3AOoAeAB6AHkAewB9AHwAoQB/AH4AgACBAOwA7gC6AQYBBwEIAQkBCgELAP0A/gEMAQ0BDgEPAP8BAAEQAREBEgEBARMBFAEVARYBFwEYARkBGgEbARwBHQEeAPgA+QEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAPoA1wEvATABMQEyATMBNAE1ATYBNwE4ATkBOgE7ATwBPQDiAOMBPgE/AUABQQFCAUMBRAFFAUYBRwFIAUkBSgFLAUwAsACxAU0BTgFPAVABUQFSAVMBVAFVAVYA+wD8AOQA5QFXAVgBWQFaAVsBXAFdAV4BXwFgAWEBYgFjAWQBZQFmAWcBaAFpAWoAuwFrAWwBbQFuAOYA5wFvAXABcQDYAOEA2wDcAN0A4ADZAN8BcgFzAXQBdQF2AXcBeAF5AXoBewF8AX0BfgF/ALIAswC2ALcAxAC0ALUAxQGAAIcAqwGBAYIBgwCMAO8BhADAAMEHdW5pMDA5Mwd1bmkwMDk0B3VuaTAwQTAHdW5pMDBBRAdBbWFjcm9uB2FtYWNyb24GQWJyZXZlBmFicmV2ZQdBb2dvbmVrB2FvZ29uZWsLQ2NpcmN1bWZsZXgLY2NpcmN1bWZsZXgKQ2RvdGFjY2VudApjZG90YWNjZW50BkRjYXJvbgZkY2Fyb24GRGNyb2F0B0VtYWNyb24HZW1hY3JvbgZFYnJldmUGZWJyZXZlCkVkb3RhY2NlbnQKZWRvdGFjY2VudAdFb2dvbmVrB2VvZ29uZWsGRWNhcm9uBmVjYXJvbgtHY2lyY3VtZmxleAtnY2lyY3VtZmxleApHZG90YWNjZW50Cmdkb3RhY2NlbnQMR2NvbW1hYWNjZW50DGdjb21tYWFjY2VudAtIY2lyY3VtZmxleAtoY2lyY3VtZmxleARIYmFyBGhiYXIGSXRpbGRlBml0aWxkZQdJbWFjcm9uB2ltYWNyb24GSWJyZXZlBmlicmV2ZQdJb2dvbmVrB2lvZ29uZWsCSUoCaWoLSmNpcmN1bWZsZXgLamNpcmN1bWZsZXgMS2NvbW1hYWNjZW50DGtjb21tYWFjY2VudAxrZ3JlZW5sYW5kaWMGTGFjdXRlBmxhY3V0ZQxMY29tbWFhY2NlbnQMbGNvbW1hYWNjZW50BkxjYXJvbgZsY2Fyb24ETGRvdARsZG90Bk5hY3V0ZQZuYWN1dGUMTmNvbW1hYWNjZW50DG5jb21tYWFjY2VudAZOY2Fyb24GbmNhcm9uC25hcG9zdHJvcGhlA0VuZwNlbmcHT21hY3JvbgdvbWFjcm9uBk9icmV2ZQZvYnJldmUNT2h1bmdhcnVtbGF1dA1vaHVuZ2FydW1sYXV0BlJhY3V0ZQZyYWN1dGUMUmNvbW1hYWNjZW50DHJjb21tYWFjY2VudAZSY2Fyb24GcmNhcm9uBlNhY3V0ZQZzYWN1dGULU2NpcmN1bWZsZXgLc2NpcmN1bWZsZXgGVGNhcm9uBnRjYXJvbgRUYmFyBHRiYXIGVXRpbGRlBnV0aWxkZQdVbWFjcm9uB3VtYWNyb24GVWJyZXZlBnVicmV2ZQVVcmluZwV1cmluZw1VaHVuZ2FydW1sYXV0DXVodW5nYXJ1bWxhdXQHVW9nb25lawd1b2dvbmVrC1djaXJjdW1mbGV4C3djaXJjdW1mbGV4C1ljaXJjdW1mbGV4C3ljaXJjdW1mbGV4BlphY3V0ZQZ6YWN1dGUKWmRvdGFjY2VudAp6ZG90YWNjZW50BWxvbmdzB3VuaTAyMUEHdW5pMDIxQgd1bmkyMDAwB3VuaTIwMDEHdW5pMjAwMgd1bmkyMDAzB3VuaTIwMDQHdW5pMjAwNQd1bmkyMDA2B3VuaTIwMDcHdW5pMjAwOAd1bmkyMDA5B3VuaTIwMEEHdW5pMjAxMAd1bmkyMDExCmZpZ3VyZWRhc2gHdW5pMjAxRgd1bmkyMDJGB3VuaTIwNUYERXVybwd1bmkyNUZDuAH/hbABjQBLsAhQWLEBAY5ZsUYGK1ghsBBZS7AUUlghsIBZHbAGK1xYALADIEWwAytEsAQgRbIDLgIrsAMrRLAFIEWyBDICK7ADK0SwBiBFsgXzAiuwAytEsAcgRbIGdgIrsAMrRLAIIEWyBz4CK7ADK0SwCSBFsggyAiuwAytEsAogRbIJtQIrsAMrRLALIEWyCnoCK7ADK0SwDCBFsgsuAiuwAytEAbANIEWwAytEsA4gRbINfQIrsQNGditEsA8gRbIOoQIrsQNGditEsBAgRbIPvAIrsQNGditEsBEgRbIQYAIrsQNGditEsBIgRbIRVQIrsQNGditEsBMgRbISQQIrsQNGditEsBQgRbITLQIrsQNGditEWbAUKwAAAAFUq8TfAAA="

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 91 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */
	
	module.exports = deprecate;
	
	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
	
	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	}
	
	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
	
	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 93 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 94 */
/***/ (function(module, exports) {

	module.exports = Yallist
	
	Yallist.Node = Node
	Yallist.create = Yallist
	
	function Yallist (list) {
	  var self = this
	  if (!(self instanceof Yallist)) {
	    self = new Yallist()
	  }
	
	  self.tail = null
	  self.head = null
	  self.length = 0
	
	  if (list && typeof list.forEach === 'function') {
	    list.forEach(function (item) {
	      self.push(item)
	    })
	  } else if (arguments.length > 0) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	      self.push(arguments[i])
	    }
	  }
	
	  return self
	}
	
	Yallist.prototype.removeNode = function (node) {
	  if (node.list !== this) {
	    throw new Error('removing node which does not belong to this list')
	  }
	
	  var next = node.next
	  var prev = node.prev
	
	  if (next) {
	    next.prev = prev
	  }
	
	  if (prev) {
	    prev.next = next
	  }
	
	  if (node === this.head) {
	    this.head = next
	  }
	  if (node === this.tail) {
	    this.tail = prev
	  }
	
	  node.list.length--
	  node.next = null
	  node.prev = null
	  node.list = null
	}
	
	Yallist.prototype.unshiftNode = function (node) {
	  if (node === this.head) {
	    return
	  }
	
	  if (node.list) {
	    node.list.removeNode(node)
	  }
	
	  var head = this.head
	  node.list = this
	  node.next = head
	  if (head) {
	    head.prev = node
	  }
	
	  this.head = node
	  if (!this.tail) {
	    this.tail = node
	  }
	  this.length++
	}
	
	Yallist.prototype.pushNode = function (node) {
	  if (node === this.tail) {
	    return
	  }
	
	  if (node.list) {
	    node.list.removeNode(node)
	  }
	
	  var tail = this.tail
	  node.list = this
	  node.prev = tail
	  if (tail) {
	    tail.next = node
	  }
	
	  this.tail = node
	  if (!this.head) {
	    this.head = node
	  }
	  this.length++
	}
	
	Yallist.prototype.push = function () {
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    push(this, arguments[i])
	  }
	  return this.length
	}
	
	Yallist.prototype.unshift = function () {
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    unshift(this, arguments[i])
	  }
	  return this.length
	}
	
	Yallist.prototype.pop = function () {
	  if (!this.tail) {
	    return undefined
	  }
	
	  var res = this.tail.value
	  this.tail = this.tail.prev
	  if (this.tail) {
	    this.tail.next = null
	  } else {
	    this.head = null
	  }
	  this.length--
	  return res
	}
	
	Yallist.prototype.shift = function () {
	  if (!this.head) {
	    return undefined
	  }
	
	  var res = this.head.value
	  this.head = this.head.next
	  if (this.head) {
	    this.head.prev = null
	  } else {
	    this.tail = null
	  }
	  this.length--
	  return res
	}
	
	Yallist.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = this.head, i = 0; walker !== null; i++) {
	    fn.call(thisp, walker.value, i, this)
	    walker = walker.next
	  }
	}
	
	Yallist.prototype.forEachReverse = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
	    fn.call(thisp, walker.value, i, this)
	    walker = walker.prev
	  }
	}
	
	Yallist.prototype.get = function (n) {
	  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
	    // abort out of the list early if we hit a cycle
	    walker = walker.next
	  }
	  if (i === n && walker !== null) {
	    return walker.value
	  }
	}
	
	Yallist.prototype.getReverse = function (n) {
	  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
	    // abort out of the list early if we hit a cycle
	    walker = walker.prev
	  }
	  if (i === n && walker !== null) {
	    return walker.value
	  }
	}
	
	Yallist.prototype.map = function (fn, thisp) {
	  thisp = thisp || this
	  var res = new Yallist()
	  for (var walker = this.head; walker !== null;) {
	    res.push(fn.call(thisp, walker.value, this))
	    walker = walker.next
	  }
	  return res
	}
	
	Yallist.prototype.mapReverse = function (fn, thisp) {
	  thisp = thisp || this
	  var res = new Yallist()
	  for (var walker = this.tail; walker !== null;) {
	    res.push(fn.call(thisp, walker.value, this))
	    walker = walker.prev
	  }
	  return res
	}
	
	Yallist.prototype.reduce = function (fn, initial) {
	  var acc
	  var walker = this.head
	  if (arguments.length > 1) {
	    acc = initial
	  } else if (this.head) {
	    walker = this.head.next
	    acc = this.head.value
	  } else {
	    throw new TypeError('Reduce of empty list with no initial value')
	  }
	
	  for (var i = 0; walker !== null; i++) {
	    acc = fn(acc, walker.value, i)
	    walker = walker.next
	  }
	
	  return acc
	}
	
	Yallist.prototype.reduceReverse = function (fn, initial) {
	  var acc
	  var walker = this.tail
	  if (arguments.length > 1) {
	    acc = initial
	  } else if (this.tail) {
	    walker = this.tail.prev
	    acc = this.tail.value
	  } else {
	    throw new TypeError('Reduce of empty list with no initial value')
	  }
	
	  for (var i = this.length - 1; walker !== null; i--) {
	    acc = fn(acc, walker.value, i)
	    walker = walker.prev
	  }
	
	  return acc
	}
	
	Yallist.prototype.toArray = function () {
	  var arr = new Array(this.length)
	  for (var i = 0, walker = this.head; walker !== null; i++) {
	    arr[i] = walker.value
	    walker = walker.next
	  }
	  return arr
	}
	
	Yallist.prototype.toArrayReverse = function () {
	  var arr = new Array(this.length)
	  for (var i = 0, walker = this.tail; walker !== null; i++) {
	    arr[i] = walker.value
	    walker = walker.prev
	  }
	  return arr
	}
	
	Yallist.prototype.slice = function (from, to) {
	  to = to || this.length
	  if (to < 0) {
	    to += this.length
	  }
	  from = from || 0
	  if (from < 0) {
	    from += this.length
	  }
	  var ret = new Yallist()
	  if (to < from || to < 0) {
	    return ret
	  }
	  if (from < 0) {
	    from = 0
	  }
	  if (to > this.length) {
	    to = this.length
	  }
	  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
	    walker = walker.next
	  }
	  for (; walker !== null && i < to; i++, walker = walker.next) {
	    ret.push(walker.value)
	  }
	  return ret
	}
	
	Yallist.prototype.sliceReverse = function (from, to) {
	  to = to || this.length
	  if (to < 0) {
	    to += this.length
	  }
	  from = from || 0
	  if (from < 0) {
	    from += this.length
	  }
	  var ret = new Yallist()
	  if (to < from || to < 0) {
	    return ret
	  }
	  if (from < 0) {
	    from = 0
	  }
	  if (to > this.length) {
	    to = this.length
	  }
	  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
	    walker = walker.prev
	  }
	  for (; walker !== null && i > from; i--, walker = walker.prev) {
	    ret.push(walker.value)
	  }
	  return ret
	}
	
	Yallist.prototype.reverse = function () {
	  var head = this.head
	  var tail = this.tail
	  for (var walker = head; walker !== null; walker = walker.prev) {
	    var p = walker.prev
	    walker.prev = walker.next
	    walker.next = p
	  }
	  this.head = tail
	  this.tail = head
	  return this
	}
	
	function push (self, item) {
	  self.tail = new Node(item, self.tail, null, self)
	  if (!self.head) {
	    self.head = self.tail
	  }
	  self.length++
	}
	
	function unshift (self, item) {
	  self.head = new Node(item, null, self.head, self)
	  if (!self.tail) {
	    self.tail = self.head
	  }
	  self.length++
	}
	
	function Node (value, prev, next, list) {
	  if (!(this instanceof Node)) {
	    return new Node(value, prev, next, list)
	  }
	
	  this.list = list
	  this.value = value
	
	  if (prev) {
	    prev.next = this
	    this.prev = prev
	  } else {
	    this.prev = null
	  }
	
	  if (next) {
	    next.prev = this
	    this.next = next
	  } else {
	    this.next = null
	  }
	}


/***/ }),
/* 95 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ })
/******/ ]);