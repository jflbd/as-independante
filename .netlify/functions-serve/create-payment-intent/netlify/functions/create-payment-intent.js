var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  },
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    module2.exports = require("util").inspect;
  },
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor =
      Object.getOwnPropertyDescriptor && hasMap
        ? Object.getOwnPropertyDescriptor(Map.prototype, "size")
        : null;
    var mapSize =
      hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function"
        ? mapSizeDescriptor.get
        : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor =
      Object.getOwnPropertyDescriptor && hasSet
        ? Object.getOwnPropertyDescriptor(Set.prototype, "size")
        : null;
    var setSize =
      hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function"
        ? setSizeDescriptor.get
        : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf =
      typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? Symbol.prototype.toString
        : null;
    var hasShammedSymbols =
      typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag =
      typeof Symbol === "function" &&
      Symbol.toStringTag &&
      (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol")
        ? Symbol.toStringTag
        : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO =
      (typeof Reflect === "function"
        ? Reflect.getPrototypeOf
        : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (O) {
            return O.__proto__;
          }
        : null);
    function addNumericSeparator(num, str) {
      if (
        num === Infinity ||
        num === -Infinity ||
        num !== num ||
        (num && num > -1e3 && num < 1e3) ||
        $test.call(/e/, str)
      ) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return (
            $replace.call(intStr, sepRegex, "$&_") +
            "." +
            $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "")
          );
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      double: '"',
      single: "'",
    };
    var quoteREs = {
      __proto__: null,
      double: /(["\\])/g,
      single: /(['\\])/g,
    };
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (
        has(opts, "maxStringLength") &&
        (typeof opts.maxStringLength === "number"
          ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
          : opts.maxStringLength !== null)
      ) {
        throw new TypeError(
          'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
        );
      }
      var customInspect = has(opts, "customInspect")
        ? opts.customInspect
        : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError(
          "option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
        );
      }
      if (
        has(opts, "indent") &&
        opts.indent !== null &&
        opts.indent !== "	" &&
        !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
      ) {
        throw new TypeError(
          'option "indent" must be "\\t", an integer > 0, or `null`'
        );
      }
      if (
        has(opts, "numericSeparator") &&
        typeof opts.numericSeparator !== "boolean"
      ) {
        throw new TypeError(
          'option "numericSeparator", if provided, must be `true` or `false`'
        );
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator
          ? addNumericSeparator(obj, bigIntStr)
          : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth,
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return (
          "[Function" +
          (name ? ": " + name : " (anonymous)") +
          "]" +
          (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "")
        );
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols
          ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1")
          : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols
          ? markBoxed(symString)
          : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s +=
            " " +
            attrs[i].name +
            "=" +
            wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (
          !("cause" in Error.prototype) &&
          "cause" in obj &&
          !isEnumerable.call(obj, "cause")
        ) {
          return (
            "{ [" +
            String(obj) +
            "] " +
            $join.call(
              $concat.call("[cause]: " + inspect(obj.cause), parts),
              ", "
            ) +
            " }"
          );
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (
          inspectSymbol &&
          typeof obj[inspectSymbol] === "function" &&
          utilInspect
        ) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (
          customInspect !== "symbol" &&
          typeof obj.inspect === "function"
        ) {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function (value, key) {
            mapParts.push(
              inspect(key, obj, true) + " => " + inspect(value, obj)
            );
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (
        (typeof globalThis !== "undefined" && obj === globalThis) ||
        (typeof global !== "undefined" && obj === global)
      ) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO
          ? gPO(obj) === Object.prototype
          : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag =
          !isPlainObject &&
          toStringTag &&
          Object(obj) === obj &&
          toStringTag in obj
            ? $slice.call(toStr(obj), 8, -1)
            : protoTag
            ? "Object"
            : "";
        var constructorTag =
          isPlainObject || typeof obj.constructor !== "function"
            ? ""
            : obj.constructor.name
            ? obj.constructor.name + " "
            : "";
        var tag =
          constructorTag +
          (stringTag || protoTag
            ? "[" +
              $join.call(
                $concat.call([], stringTag || [], protoTag || []),
                ": "
              ) +
              "] "
            : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function canTrustToString(obj) {
      return (
        !toStringTag ||
        !(
          typeof obj === "object" &&
          (toStringTag in obj || typeof obj[toStringTag] !== "undefined")
        )
      );
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {}
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {}
      return false;
    }
    var hasOwn =
      Object.prototype.hasOwnProperty ||
      function (key) {
        return key in this;
      };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {}
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {}
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {}
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {}
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {}
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return (
        typeof x.nodeName === "string" && typeof x.getAttribute === "function"
      );
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer =
          "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return (
          inspectString($slice.call(str, 0, opts.maxStringLength), opts) +
          trailer
        );
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call(
        $replace.call(str, quoteRE, "\\$1"),
        /[\x00-\x1f]/g,
        lowbyte
      );
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r",
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent
        ? indentedJoin(entries, indent)
        : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent),
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push(
              "[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj)
            );
          }
        }
      }
      return xs;
    }
  },
});

// node_modules/side-channel-list/index.js
var require_side_channel_list = __commonJS({
  "node_modules/side-channel-list/index.js"(exports2, module2) {
    "use strict";
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var listGetNode = function (list, key, isDelete) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) != null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = /** @type {NonNullable<typeof list.next>} */ list.next;
            list.next = curr;
          }
          return curr;
        }
      }
    };
    var listGet = function (objects, key) {
      if (!objects) {
        return void 0;
      }
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function (objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next =
          /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
          {
            key,
            next: objects.next,
            value,
          };
      }
    };
    var listHas = function (objects, key) {
      if (!objects) {
        return false;
      }
      return !!listGetNode(objects, key);
    };
    var listDelete = function (objects, key) {
      if (objects) {
        return listGetNode(objects, key, true);
      }
    };
    module2.exports = function getSideChannelList() {
      var $o;
      var channel = {
        assert: function (key) {
          if (!channel.has(key)) {
            throw new $TypeError(
              "Side channel does not contain " + inspect(key)
            );
          }
        },
        delete: function (key) {
          var root = $o && $o.next;
          var deletedNode = listDelete($o, key);
          if (deletedNode && root && root === deletedNode) {
            $o = void 0;
          }
          return !!deletedNode;
        },
        get: function (key) {
          return listGet($o, key);
        },
        has: function (key) {
          return listHas($o, key);
        },
        set: function (key, value) {
          if (!$o) {
            $o = {
              next: void 0,
            };
          }
          listSet(
            /** @type {NonNullable<typeof $o>} */
            $o,
            key,
            value
          );
        },
      };
      return channel;
    };
  },
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object;
  },
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Error;
  },
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  },
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    module2.exports = RangeError;
  },
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  },
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  },
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  },
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.abs;
  },
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.floor;
  },
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.max;
  },
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.min;
  },
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.pow;
  },
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.round;
  },
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    module2.exports =
      Number.isNaN ||
      function isNaN2(a) {
        return a !== a;
      };
  },
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  },
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  },
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  },
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  },
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (
        typeof Symbol !== "function" ||
        typeof Object.getOwnPropertySymbols !== "function"
      ) {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (
        typeof Object.getOwnPropertyNames === "function" &&
        Object.getOwnPropertyNames(obj).length !== 0
      ) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor =
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  },
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  },
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    module2.exports =
      (typeof Reflect !== "undefined" && Reflect.getPrototypeOf) || null;
  },
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  },
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function (arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function () {
        if (this instanceof bound) {
          var result = target.apply(this, concatty(args, arguments));
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(that, concatty(args, arguments));
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function(
        "binder",
        "return function (" +
          joiny(boundArgs, ",") +
          "){ return binder.apply(this,arguments); }"
      )(binder);
      if (target.prototype) {
        var Empty = function Empty2() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  },
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  },
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.call;
  },
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.apply;
  },
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    module2.exports =
      typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  },
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  },
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  },
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor =
        /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
    } catch (e) {
      if (
        !e ||
        typeof e !== "object" ||
        !("code" in e) ||
        e.code !== "ERR_PROTO_ACCESS"
      ) {
        throw e;
      }
    }
    var desc =
      !!hasProtoAccessor &&
      gOPD &&
      gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports =
      desc && typeof desc.get === "function"
        ? callBind([desc.get])
        : typeof $getPrototypeOf === "function"
        ? /** @type {import('./get')} */
          function getDunder(value) {
            return $getPrototypeOf(value == null ? value : $Object(value));
          }
        : false;
  },
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto
      ? function getProto(O) {
          return reflectGetProto(O);
        }
      : originalGetProto
      ? function getProto(O) {
          if (!O || (typeof O !== "object" && typeof O !== "function")) {
            throw new TypeError("getProto: not an object");
          }
          return originalGetProto(O);
        }
      : getDunderProto
      ? function getProto(O) {
          return getDunderProto(O);
        }
      : null;
  },
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  },
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function (expressionSyntax) {
      try {
        return $Function(
          '"use strict"; return (' + expressionSyntax + ").constructor;"
        )();
      } catch (e) {}
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function () {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD
      ? (function () {
          try {
            arguments.callee;
            return throwTypeError;
          } catch (calleeThrows) {
            try {
              return $gOPD(arguments, "callee").get;
            } catch (gOPDthrows) {
              return throwTypeError;
            }
          }
        })()
      : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray =
      typeof Uint8Array === "undefined" || !getProto
        ? undefined2
        : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%":
        typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%":
        typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%":
        hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%":
        typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%":
        typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      "%EvalError%": $EvalError,
      "%Float16Array%":
        typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%":
        typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%":
        typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%":
        typeof FinalizationRegistry === "undefined"
          ? undefined2
          : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%":
        typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%":
        typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%":
        hasSymbols && getProto
          ? getProto(getProto([][Symbol.iterator]()))
          : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%":
        typeof Map === "undefined" || !hasSymbols || !getProto
          ? undefined2
          : getProto(/* @__PURE__ */ new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%":
        typeof Set === "undefined" || !hasSymbols || !getProto
          ? undefined2
          : getProto(/* @__PURE__ */ new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%":
        typeof SharedArrayBuffer === "undefined"
          ? undefined2
          : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%":
        hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%":
        typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%":
        typeof Uint8ClampedArray === "undefined"
          ? undefined2
          : Uint8ClampedArray,
      "%Uint16Array%":
        typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%":
        typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO,
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": [
        "AsyncGeneratorFunction",
        "prototype",
        "prototype",
      ],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError(
          "invalid intrinsic syntax, expected closing `%`"
        );
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError(
          "invalid intrinsic syntax, expected opening `%`"
        );
      }
      var result = [];
      $replace(string, rePropName, function (match, number, quote, subString) {
        result[result.length] = quote
          ? $replace(subString, reEscapeChar, "$1")
          : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError(
            "intrinsic " +
              name +
              " exists, but is not available. Please file an issue!"
          );
        }
        return {
          alias,
          name: intrinsicName,
          value,
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError(
          "`%` may not be present anywhere but at the beginning and end of the intrinsic name"
        );
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic(
        "%" + intrinsicBaseName + "%",
        allowMissing
      );
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if (
          (first === '"' ||
            first === "'" ||
            first === "`" ||
            last === '"' ||
            last === "'" ||
            last === "`") &&
          first !== last
        ) {
          throw new $SyntaxError(
            "property names with quotes must have matching quotes"
          );
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError(
                "base intrinsic for " +
                  name +
                  " exists, but the property is not available."
              );
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  },
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic =
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing);
      if (
        typeof intrinsic === "function" &&
        $indexOf(name, ".prototype.") > -1
      ) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  },
});

// node_modules/side-channel-map/index.js
var require_side_channel_map = __commonJS({
  "node_modules/side-channel-map/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $Map = GetIntrinsic("%Map%", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapDelete = callBound("Map.prototype.delete", true);
    var $mapSize = callBound("Map.prototype.size", true);
    module2.exports =
      !!$Map &&
      /** @type {Exclude<import('.'), false>} */
      function getSideChannelMap() {
        var $m;
        var channel = {
          assert: function (key) {
            if (!channel.has(key)) {
              throw new $TypeError(
                "Side channel does not contain " + inspect(key)
              );
            }
          },
          delete: function (key) {
            if ($m) {
              var result = $mapDelete($m, key);
              if ($mapSize($m) === 0) {
                $m = void 0;
              }
              return result;
            }
            return false;
          },
          get: function (key) {
            if ($m) {
              return $mapGet($m, key);
            }
          },
          has: function (key) {
            if ($m) {
              return $mapHas($m, key);
            }
            return false;
          },
          set: function (key, value) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          },
        };
        return channel;
      };
  },
});

// node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = __commonJS({
  "node_modules/side-channel-weakmap/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var getSideChannelMap = require_side_channel_map();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
    module2.exports = $WeakMap
      ? /** @type {Exclude<import('.'), false>} */
        function getSideChannelWeakMap() {
          var $wm;
          var $m;
          var channel = {
            assert: function (key) {
              if (!channel.has(key)) {
                throw new $TypeError(
                  "Side channel does not contain " + inspect(key)
                );
              }
            },
            delete: function (key) {
              if (
                $WeakMap &&
                key &&
                (typeof key === "object" || typeof key === "function")
              ) {
                if ($wm) {
                  return $weakMapDelete($wm, key);
                }
              } else if (getSideChannelMap) {
                if ($m) {
                  return $m["delete"](key);
                }
              }
              return false;
            },
            get: function (key) {
              if (
                $WeakMap &&
                key &&
                (typeof key === "object" || typeof key === "function")
              ) {
                if ($wm) {
                  return $weakMapGet($wm, key);
                }
              }
              return $m && $m.get(key);
            },
            has: function (key) {
              if (
                $WeakMap &&
                key &&
                (typeof key === "object" || typeof key === "function")
              ) {
                if ($wm) {
                  return $weakMapHas($wm, key);
                }
              }
              return !!$m && $m.has(key);
            },
            set: function (key, value) {
              if (
                $WeakMap &&
                key &&
                (typeof key === "object" || typeof key === "function")
              ) {
                if (!$wm) {
                  $wm = new $WeakMap();
                }
                $weakMapSet($wm, key, value);
              } else if (getSideChannelMap) {
                if (!$m) {
                  $m = getSideChannelMap();
                }
                $m.set(key, value);
              }
            },
          };
          return channel;
        }
      : getSideChannelMap;
  },
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    var $TypeError = require_type();
    var inspect = require_object_inspect();
    var getSideChannelList = require_side_channel_list();
    var getSideChannelMap = require_side_channel_map();
    var getSideChannelWeakMap = require_side_channel_weakmap();
    var makeChannel =
      getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    module2.exports = function getSideChannel() {
      var $channelData;
      var channel = {
        assert: function (key) {
          if (!channel.has(key)) {
            throw new $TypeError(
              "Side channel does not contain " + inspect(key)
            );
          }
        },
        delete: function (key) {
          return !!$channelData && $channelData["delete"](key);
        },
        get: function (key) {
          return $channelData && $channelData.get(key);
        },
        has: function (key) {
          return !!$channelData && $channelData.has(key);
        },
        set: function (key, value) {
          if (!$channelData) {
            $channelData = makeChannel();
          }
          $channelData.set(key, value);
        },
      };
      return channel;
    };
  },
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986",
    };
    module2.exports = {
      default: Format.RFC3986,
      formatters: {
        RFC1738: function (value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function (value) {
          return String(value);
        },
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986,
    };
  },
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    })();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? { __proto__: null } : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object" && typeof source !== "function") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (
            (options && (options.plainObjects || options.allowPrototypes)) ||
            !has.call(Object.prototype, source)
          ) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (
              targetItem &&
              typeof targetItem === "object" &&
              item &&
              typeof item === "object"
            ) {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function (str, defaultDecoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var limit = 1024;
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var j = 0; j < string.length; j += limit) {
        var segment =
          string.length >= limit ? string.slice(j, j + limit) : string;
        var arr = [];
        for (var i = 0; i < segment.length; ++i) {
          var c = segment.charCodeAt(i);
          if (
            c === 45 ||
            c === 46 ||
            c === 95 ||
            c === 126 ||
            (c >= 48 && c <= 57) ||
            (c >= 65 && c <= 90) ||
            (c >= 97 && c <= 122) ||
            (format === formats.RFC1738 && (c === 40 || c === 41))
          ) {
            arr[arr.length] = segment.charAt(i);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hexTable[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] =
              hexTable[192 | (c >> 6)] + hexTable[128 | (c & 63)];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] =
              hexTable[224 | (c >> 12)] +
              hexTable[128 | ((c >> 6) & 63)] +
              hexTable[128 | (c & 63)];
            continue;
          }
          i += 1;
          c = 65536 + (((c & 1023) << 10) | (segment.charCodeAt(i) & 1023));
          arr[arr.length] =
            hexTable[240 | (c >> 18)] +
            hexTable[128 | ((c >> 12) & 63)] +
            hexTable[128 | ((c >> 6) & 63)] +
            hexTable[128 | (c & 63)];
        }
        out += arr.join("");
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (
            typeof val === "object" &&
            val !== null &&
            refs.indexOf(val) === -1
          ) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(
        obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj)
      );
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge,
    };
  },
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      },
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      commaRoundTrip: false,
      delimiter: "&",
      encode: true,
      encodeDotInKeys: false,
      encoder: utils.encode,
      encodeValuesOnly: false,
      filter: void 0,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false,
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return (
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean" ||
        typeof v === "symbol" ||
        typeof v === "bigint"
      );
    };
    var sentinel = {};
    var stringify2 = function stringify3(
      object,
      prefix,
      generateArrayPrefix,
      commaRoundTrip,
      allowEmptyArrays,
      strictNullHandling,
      skipNulls,
      encodeDotInKeys,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      sideChannel
    ) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly
            ? encoder(prefix, defaults.encoder, charset, "key", format)
            : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly
            ? prefix
            : encoder(prefix, defaults.encoder, charset, "key", format);
          return [
            formatter(keyValue) +
              "=" +
              formatter(
                encoder(obj, defaults.encoder, charset, "value", format)
              ),
          ];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var encodedPrefix = encodeDotInKeys
        ? String(prefix).replace(/\./g, "%2E")
        : String(prefix);
      var adjustedPrefix =
        commaRoundTrip && isArray(obj) && obj.length === 1
          ? encodedPrefix + "[]"
          : encodedPrefix;
      if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
        return adjustedPrefix + "[]";
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value =
          typeof key === "object" && key && typeof key.value !== "undefined"
            ? key.value
            : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var encodedKey =
          allowDots && encodeDotInKeys
            ? String(key).replace(/\./g, "%2E")
            : String(key);
        var keyPrefix = isArray(obj)
          ? typeof generateArrayPrefix === "function"
            ? generateArrayPrefix(adjustedPrefix, encodedKey)
            : adjustedPrefix
          : adjustedPrefix +
            (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(
          values,
          stringify3(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            allowEmptyArrays,
            strictNullHandling,
            skipNulls,
            encodeDotInKeys,
            generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj)
              ? null
              : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
          )
        );
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (
        typeof opts.allowEmptyArrays !== "undefined" &&
        typeof opts.allowEmptyArrays !== "boolean"
      ) {
        throw new TypeError(
          "`allowEmptyArrays` option can only be `true` or `false`, when provided"
        );
      }
      if (
        typeof opts.encodeDotInKeys !== "undefined" &&
        typeof opts.encodeDotInKeys !== "boolean"
      ) {
        throw new TypeError(
          "`encodeDotInKeys` option can only be `true` or `false`, when provided"
        );
      }
      if (
        opts.encoder !== null &&
        typeof opts.encoder !== "undefined" &&
        typeof opts.encoder !== "function"
      ) {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (
        typeof opts.charset !== "undefined" &&
        opts.charset !== "utf-8" &&
        opts.charset !== "iso-8859-1"
      ) {
        throw new TypeError(
          "The charset option must be either utf-8, iso-8859-1, or undefined"
        );
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      var arrayFormat;
      if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if (
        "commaRoundTrip" in opts &&
        typeof opts.commaRoundTrip !== "boolean"
      ) {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var allowDots =
        typeof opts.allowDots === "undefined"
          ? opts.encodeDotInKeys === true
            ? true
            : defaults.allowDots
          : !!opts.allowDots;
      return {
        addQueryPrefix:
          typeof opts.addQueryPrefix === "boolean"
            ? opts.addQueryPrefix
            : defaults.addQueryPrefix,
        allowDots,
        allowEmptyArrays:
          typeof opts.allowEmptyArrays === "boolean"
            ? !!opts.allowEmptyArrays
            : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel:
          typeof opts.charsetSentinel === "boolean"
            ? opts.charsetSentinel
            : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter:
          typeof opts.delimiter === "undefined"
            ? defaults.delimiter
            : opts.delimiter,
        encode:
          typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys:
          typeof opts.encodeDotInKeys === "boolean"
            ? opts.encodeDotInKeys
            : defaults.encodeDotInKeys,
        encoder:
          typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly:
          typeof opts.encodeValuesOnly === "boolean"
            ? opts.encodeValuesOnly
            : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate:
          typeof opts.serializeDate === "function"
            ? opts.serializeDate
            : defaults.serializeDate,
        skipNulls:
          typeof opts.skipNulls === "boolean"
            ? opts.skipNulls
            : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling:
          typeof opts.strictNullHandling === "boolean"
            ? opts.strictNullHandling
            : defaults.strictNullHandling,
      };
    };
    module2.exports = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
      var commaRoundTrip =
        generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = obj[key];
        if (options.skipNulls && value === null) {
          continue;
        }
        pushToArray(
          keys,
          stringify2(
            value,
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.allowEmptyArrays,
            options.strictNullHandling,
            options.skipNulls,
            options.encodeDotInKeys,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
          )
        );
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  },
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowEmptyArrays: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decodeDotInKeys: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictDepth: false,
      strictNullHandling: false,
      throwOnLimitExceeded: false,
    };
    var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function (val, options, currentArrayLength) {
      if (
        val &&
        typeof val === "string" &&
        options.comma &&
        val.indexOf(",") > -1
      ) {
        return val.split(",");
      }
      if (
        options.throwOnLimitExceeded &&
        currentArrayLength >= options.arrayLimit
      ) {
        throw new RangeError(
          "Array limit exceeded. Only " +
            options.arrayLimit +
            " element" +
            (options.arrayLimit === 1 ? "" : "s") +
            " allowed in an array."
        );
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var limit =
        options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(
        options.delimiter,
        options.throwOnLimitExceeded ? limit + 1 : limit
      );
      if (options.throwOnLimitExceeded && parts.length > limit) {
        throw new RangeError(
          "Parameter limit exceeded. Only " +
            limit +
            " parameter" +
            (limit === 1 ? "" : "s") +
            " allowed."
        );
      }
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos =
          bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key;
        var val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(
            part.slice(0, pos),
            defaults.decoder,
            charset,
            "key"
          );
          val = utils.maybeMap(
            parseArrayValue(
              part.slice(pos + 1),
              options,
              isArray(obj[key]) ? obj[key].length : 0
            ),
            function (encodedVal) {
              return options.decoder(
                encodedVal,
                defaults.decoder,
                charset,
                "value"
              );
            }
          );
        }
        if (
          val &&
          options.interpretNumericEntities &&
          charset === "iso-8859-1"
        ) {
          val = interpretNumericEntities(String(val));
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        var existing = has.call(obj, key);
        if (existing && options.duplicates === "combine") {
          obj[key] = utils.combine(obj[key], val);
        } else if (!existing || options.duplicates === "last") {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function (chain, val, options, valuesParsed) {
      var currentArrayLength = 0;
      if (chain.length > 0 && chain[chain.length - 1] === "[]") {
        var parentKey = chain.slice(0, -1).join("");
        currentArrayLength =
          Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
      }
      var leaf = valuesParsed
        ? val
        : parseArrayValue(val, options, currentArrayLength);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj =
            options.allowEmptyArrays &&
            (leaf === "" || (options.strictNullHandling && leaf === null))
              ? []
              : utils.combine([], leaf);
        } else {
          obj = options.plainObjects ? { __proto__: null } : {};
          var cleanRoot =
            root.charAt(0) === "[" && root.charAt(root.length - 1) === "]"
              ? root.slice(1, -1)
              : root;
          var decodedRoot = options.decodeDotInKeys
            ? cleanRoot.replace(/%2E/g, ".")
            : cleanRoot;
          var index = parseInt(decodedRoot, 10);
          if (!options.parseArrays && decodedRoot === "") {
            obj = { 0: leaf };
          } else if (
            !isNaN(index) &&
            root !== decodedRoot &&
            String(index) === decodedRoot &&
            index >= 0 &&
            options.parseArrays &&
            index <= options.arrayLimit
          ) {
            obj = [];
            obj[index] = leaf;
          } else if (decodedRoot !== "__proto__") {
            obj[decodedRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(
      givenKey,
      val,
      options,
      valuesParsed
    ) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots
        ? givenKey.replace(/\.([^.[]+)/g, "[$1]")
        : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (
        options.depth > 0 &&
        (segment = child.exec(key)) !== null &&
        i < options.depth
      ) {
        i += 1;
        if (
          !options.plainObjects &&
          has.call(Object.prototype, segment[1].slice(1, -1))
        ) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        if (options.strictDepth === true) {
          throw new RangeError(
            "Input depth exceeded depth option of " +
              options.depth +
              " and strictDepth is true"
          );
        }
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (
        typeof opts.allowEmptyArrays !== "undefined" &&
        typeof opts.allowEmptyArrays !== "boolean"
      ) {
        throw new TypeError(
          "`allowEmptyArrays` option can only be `true` or `false`, when provided"
        );
      }
      if (
        typeof opts.decodeDotInKeys !== "undefined" &&
        typeof opts.decodeDotInKeys !== "boolean"
      ) {
        throw new TypeError(
          "`decodeDotInKeys` option can only be `true` or `false`, when provided"
        );
      }
      if (
        opts.decoder !== null &&
        typeof opts.decoder !== "undefined" &&
        typeof opts.decoder !== "function"
      ) {
        throw new TypeError("Decoder has to be a function.");
      }
      if (
        typeof opts.charset !== "undefined" &&
        opts.charset !== "utf-8" &&
        opts.charset !== "iso-8859-1"
      ) {
        throw new TypeError(
          "The charset option must be either utf-8, iso-8859-1, or undefined"
        );
      }
      if (
        typeof opts.throwOnLimitExceeded !== "undefined" &&
        typeof opts.throwOnLimitExceeded !== "boolean"
      ) {
        throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      }
      var charset =
        typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      var duplicates =
        typeof opts.duplicates === "undefined"
          ? defaults.duplicates
          : opts.duplicates;
      if (
        duplicates !== "combine" &&
        duplicates !== "first" &&
        duplicates !== "last"
      ) {
        throw new TypeError(
          "The duplicates option must be either combine, first, or last"
        );
      }
      var allowDots =
        typeof opts.allowDots === "undefined"
          ? opts.decodeDotInKeys === true
            ? true
            : defaults.allowDots
          : !!opts.allowDots;
      return {
        allowDots,
        allowEmptyArrays:
          typeof opts.allowEmptyArrays === "boolean"
            ? !!opts.allowEmptyArrays
            : defaults.allowEmptyArrays,
        allowPrototypes:
          typeof opts.allowPrototypes === "boolean"
            ? opts.allowPrototypes
            : defaults.allowPrototypes,
        allowSparse:
          typeof opts.allowSparse === "boolean"
            ? opts.allowSparse
            : defaults.allowSparse,
        arrayLimit:
          typeof opts.arrayLimit === "number"
            ? opts.arrayLimit
            : defaults.arrayLimit,
        charset,
        charsetSentinel:
          typeof opts.charsetSentinel === "boolean"
            ? opts.charsetSentinel
            : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decodeDotInKeys:
          typeof opts.decodeDotInKeys === "boolean"
            ? opts.decodeDotInKeys
            : defaults.decodeDotInKeys,
        decoder:
          typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter:
          typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter)
            ? opts.delimiter
            : defaults.delimiter,
        depth:
          typeof opts.depth === "number" || opts.depth === false
            ? +opts.depth
            : defaults.depth,
        duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities:
          typeof opts.interpretNumericEntities === "boolean"
            ? opts.interpretNumericEntities
            : defaults.interpretNumericEntities,
        parameterLimit:
          typeof opts.parameterLimit === "number"
            ? opts.parameterLimit
            : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects:
          typeof opts.plainObjects === "boolean"
            ? opts.plainObjects
            : defaults.plainObjects,
        strictDepth:
          typeof opts.strictDepth === "boolean"
            ? !!opts.strictDepth
            : defaults.strictDepth,
        strictNullHandling:
          typeof opts.strictNullHandling === "boolean"
            ? opts.strictNullHandling
            : defaults.strictNullHandling,
        throwOnLimitExceeded:
          typeof opts.throwOnLimitExceeded === "boolean"
            ? opts.throwOnLimitExceeded
            : false,
      };
    };
    module2.exports = function (str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? { __proto__: null } : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? { __proto__: null } : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(
          key,
          tempObj[key],
          options,
          typeof str === "string"
        );
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  },
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify2 = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify: stringify2,
    };
  },
});

// netlify/functions/create-payment-intent.js
var create_payment_intent_exports = {};
__export(create_payment_intent_exports, {
  handler: () => handler,
});
module.exports = __toCommonJS(create_payment_intent_exports);

// node_modules/stripe/esm/platform/NodePlatformFunctions.js
var crypto3 = __toESM(require("crypto"), 1);
var import_events = require("events");

// node_modules/stripe/esm/crypto/NodeCryptoProvider.js
var crypto2 = __toESM(require("crypto"), 1);

// node_modules/stripe/esm/crypto/CryptoProvider.js
var CryptoProvider = class {
  /**
   * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
   * The output HMAC should be encoded in hexadecimal.
   *
   * Sample values for implementations:
   * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
   * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
   */
  computeHMACSignature(payload, secret) {
    throw new Error("computeHMACSignature not implemented.");
  }
  /**
   * Asynchronous version of `computeHMACSignature`. Some implementations may
   * only allow support async signature computation.
   *
   * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
   * The output HMAC should be encoded in hexadecimal.
   *
   * Sample values for implementations:
   * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
   * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
   */
  computeHMACSignatureAsync(payload, secret) {
    throw new Error("computeHMACSignatureAsync not implemented.");
  }
  /**
   * Computes a SHA-256 hash of the data.
   */
  computeSHA256Async(data) {
    throw new Error("computeSHA256 not implemented.");
  }
};
var CryptoProviderOnlySupportsAsyncError = class extends Error {};

// node_modules/stripe/esm/crypto/NodeCryptoProvider.js
var NodeCryptoProvider = class extends CryptoProvider {
  /** @override */
  computeHMACSignature(payload, secret) {
    return crypto2
      .createHmac("sha256", secret)
      .update(payload, "utf8")
      .digest("hex");
  }
  /** @override */
  async computeHMACSignatureAsync(payload, secret) {
    const signature = await this.computeHMACSignature(payload, secret);
    return signature;
  }
  /** @override */
  async computeSHA256Async(data) {
    return new Uint8Array(
      await crypto2.createHash("sha256").update(data).digest()
    );
  }
};

// node_modules/stripe/esm/net/NodeHttpClient.js
var http_ = __toESM(require("http"), 1);
var https_ = __toESM(require("https"), 1);

// node_modules/stripe/esm/net/HttpClient.js
var HttpClient = class _HttpClient {
  /** The client name used for diagnostics. */
  getClientName() {
    throw new Error("getClientName not implemented.");
  }
  makeRequest(
    host,
    port,
    path,
    method,
    headers,
    requestData,
    protocol,
    timeout
  ) {
    throw new Error("makeRequest not implemented.");
  }
  /** Helper to make a consistent timeout error across implementations. */
  static makeTimeoutError() {
    const timeoutErr = new TypeError(_HttpClient.TIMEOUT_ERROR_CODE);
    timeoutErr.code = _HttpClient.TIMEOUT_ERROR_CODE;
    return timeoutErr;
  }
};
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"];
HttpClient.TIMEOUT_ERROR_CODE = "ETIMEDOUT";
var HttpClientResponse = class {
  constructor(statusCode, headers) {
    this._statusCode = statusCode;
    this._headers = headers;
  }
  getStatusCode() {
    return this._statusCode;
  }
  getHeaders() {
    return this._headers;
  }
  getRawResponse() {
    throw new Error("getRawResponse not implemented.");
  }
  toStream(streamCompleteCallback) {
    throw new Error("toStream not implemented.");
  }
  toJSON() {
    throw new Error("toJSON not implemented.");
  }
};

// node_modules/stripe/esm/net/NodeHttpClient.js
var http = http_.default || http_;
var https = https_.default || https_;
var defaultHttpAgent = new http.Agent({ keepAlive: true });
var defaultHttpsAgent = new https.Agent({ keepAlive: true });
var NodeHttpClient = class extends HttpClient {
  constructor(agent) {
    super();
    this._agent = agent;
  }
  /** @override. */
  getClientName() {
    return "node";
  }
  makeRequest(
    host,
    port,
    path,
    method,
    headers,
    requestData,
    protocol,
    timeout
  ) {
    const isInsecureConnection = protocol === "http";
    let agent = this._agent;
    if (!agent) {
      agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
    }
    const requestPromise = new Promise((resolve, reject) => {
      const req = (isInsecureConnection ? http : https).request({
        host,
        port,
        path,
        method,
        agent,
        headers,
        ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5",
      });
      req.setTimeout(timeout, () => {
        req.destroy(HttpClient.makeTimeoutError());
      });
      req.on("response", (res) => {
        resolve(new NodeHttpClientResponse(res));
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.once("socket", (socket) => {
        if (socket.connecting) {
          socket.once(
            isInsecureConnection ? "connect" : "secureConnect",
            () => {
              req.write(requestData);
              req.end();
            }
          );
        } else {
          req.write(requestData);
          req.end();
        }
      });
    });
    return requestPromise;
  }
};
var NodeHttpClientResponse = class extends HttpClientResponse {
  constructor(res) {
    super(res.statusCode, res.headers || {});
    this._res = res;
  }
  getRawResponse() {
    return this._res;
  }
  toStream(streamCompleteCallback) {
    this._res.once("end", () => streamCompleteCallback());
    return this._res;
  }
  toJSON() {
    return new Promise((resolve, reject) => {
      let response = "";
      this._res.setEncoding("utf8");
      this._res.on("data", (chunk) => {
        response += chunk;
      });
      this._res.once("end", () => {
        try {
          resolve(JSON.parse(response));
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

// node_modules/stripe/esm/net/FetchHttpClient.js
var FetchHttpClient = class _FetchHttpClient extends HttpClient {
  constructor(fetchFn) {
    super();
    if (!fetchFn) {
      if (!globalThis.fetch) {
        throw new Error(
          "fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation."
        );
      }
      fetchFn = globalThis.fetch;
    }
    if (globalThis.AbortController) {
      this._fetchFn = _FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
    } else {
      this._fetchFn = _FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
    }
  }
  static makeFetchWithRaceTimeout(fetchFn) {
    return (url, init, timeout) => {
      let pendingTimeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        pendingTimeoutId = setTimeout(() => {
          pendingTimeoutId = null;
          reject(HttpClient.makeTimeoutError());
        }, timeout);
      });
      const fetchPromise = fetchFn(url, init);
      return Promise.race([fetchPromise, timeoutPromise]).finally(() => {
        if (pendingTimeoutId) {
          clearTimeout(pendingTimeoutId);
        }
      });
    };
  }
  static makeFetchWithAbortTimeout(fetchFn) {
    return async (url, init, timeout) => {
      const abort = new AbortController();
      let timeoutId = setTimeout(() => {
        timeoutId = null;
        abort.abort(HttpClient.makeTimeoutError());
      }, timeout);
      try {
        return await fetchFn(
          url,
          Object.assign(Object.assign({}, init), { signal: abort.signal })
        );
      } catch (err) {
        if (err.name === "AbortError") {
          throw HttpClient.makeTimeoutError();
        } else {
          throw err;
        }
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    };
  }
  /** @override. */
  getClientName() {
    return "fetch";
  }
  async makeRequest(
    host,
    port,
    path,
    method,
    headers,
    requestData,
    protocol,
    timeout
  ) {
    const isInsecureConnection = protocol === "http";
    const url = new URL(
      path,
      `${isInsecureConnection ? "http" : "https"}://${host}`
    );
    url.port = port;
    const methodHasPayload =
      method == "POST" || method == "PUT" || method == "PATCH";
    const body = requestData || (methodHasPayload ? "" : void 0);
    const res = await this._fetchFn(
      url.toString(),
      {
        method,
        // @ts-ignore
        headers,
        // @ts-ignore
        body,
      },
      timeout
    );
    return new FetchHttpClientResponse(res);
  }
};
var FetchHttpClientResponse = class _FetchHttpClientResponse extends HttpClientResponse {
  constructor(res) {
    super(
      res.status,
      _FetchHttpClientResponse._transformHeadersToObject(res.headers)
    );
    this._res = res;
  }
  getRawResponse() {
    return this._res;
  }
  toStream(streamCompleteCallback) {
    streamCompleteCallback();
    return this._res.body;
  }
  toJSON() {
    return this._res.json();
  }
  static _transformHeadersToObject(headers) {
    const headersObj = {};
    for (const entry of headers) {
      if (!Array.isArray(entry) || entry.length != 2) {
        throw new Error(
          "Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object."
        );
      }
      headersObj[entry[0]] = entry[1];
    }
    return headersObj;
  }
};

// node_modules/stripe/esm/crypto/SubtleCryptoProvider.js
var SubtleCryptoProvider = class extends CryptoProvider {
  constructor(subtleCrypto) {
    super();
    this.subtleCrypto = subtleCrypto || crypto.subtle;
  }
  /** @override */
  computeHMACSignature(payload, secret) {
    throw new CryptoProviderOnlySupportsAsyncError(
      "SubtleCryptoProvider cannot be used in a synchronous context."
    );
  }
  /** @override */
  async computeHMACSignatureAsync(payload, secret) {
    const encoder = new TextEncoder();
    const key = await this.subtleCrypto.importKey(
      "raw",
      encoder.encode(secret),
      {
        name: "HMAC",
        hash: { name: "SHA-256" },
      },
      false,
      ["sign"]
    );
    const signatureBuffer = await this.subtleCrypto.sign(
      "hmac",
      key,
      encoder.encode(payload)
    );
    const signatureBytes = new Uint8Array(signatureBuffer);
    const signatureHexCodes = new Array(signatureBytes.length);
    for (let i = 0; i < signatureBytes.length; i++) {
      signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
    }
    return signatureHexCodes.join("");
  }
  /** @override */
  async computeSHA256Async(data) {
    return new Uint8Array(await this.subtleCrypto.digest("SHA-256", data));
  }
};
var byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) {
  byteHexMapping[i] = i.toString(16).padStart(2, "0");
}

// node_modules/stripe/esm/platform/PlatformFunctions.js
var PlatformFunctions = class {
  constructor() {
    this._fetchFn = null;
    this._agent = null;
  }
  /**
   * Gets uname with Node's built-in `exec` function, if available.
   */
  getUname() {
    throw new Error("getUname not implemented.");
  }
  /**
   * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
   */
  uuid4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 3) | 8;
      return v.toString(16);
    });
  }
  /**
   * Compares strings in constant time.
   */
  secureCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    const len = a.length;
    let result = 0;
    for (let i = 0; i < len; ++i) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }
  /**
   * Creates an event emitter.
   */
  createEmitter() {
    throw new Error("createEmitter not implemented.");
  }
  /**
   * Checks if the request data is a stream. If so, read the entire stream
   * to a buffer and return the buffer.
   */
  tryBufferData(data) {
    throw new Error("tryBufferData not implemented.");
  }
  /**
   * Creates an HTTP client which uses the Node `http` and `https` packages
   * to issue requests.
   */
  createNodeHttpClient(agent) {
    throw new Error("createNodeHttpClient not implemented.");
  }
  /**
   * Creates an HTTP client for issuing Stripe API requests which uses the Web
   * Fetch API.
   *
   * A fetch function can optionally be passed in as a parameter. If none is
   * passed, will default to the default `fetch` function in the global scope.
   */
  createFetchHttpClient(fetchFn) {
    return new FetchHttpClient(fetchFn);
  }
  /**
   * Creates an HTTP client using runtime-specific APIs.
   */
  createDefaultHttpClient() {
    throw new Error("createDefaultHttpClient not implemented.");
  }
  /**
   * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
   */
  createNodeCryptoProvider() {
    throw new Error("createNodeCryptoProvider not implemented.");
  }
  /**
   * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
   */
  createSubtleCryptoProvider(subtleCrypto) {
    return new SubtleCryptoProvider(subtleCrypto);
  }
  createDefaultCryptoProvider() {
    throw new Error("createDefaultCryptoProvider not implemented.");
  }
};

// node_modules/stripe/esm/Error.js
var Error_exports = {};
__export(Error_exports, {
  StripeAPIError: () => StripeAPIError,
  StripeAuthenticationError: () => StripeAuthenticationError,
  StripeCardError: () => StripeCardError,
  StripeConnectionError: () => StripeConnectionError,
  StripeError: () => StripeError,
  StripeIdempotencyError: () => StripeIdempotencyError,
  StripeInvalidGrantError: () => StripeInvalidGrantError,
  StripeInvalidRequestError: () => StripeInvalidRequestError,
  StripePermissionError: () => StripePermissionError,
  StripeRateLimitError: () => StripeRateLimitError,
  StripeSignatureVerificationError: () => StripeSignatureVerificationError,
  StripeUnknownError: () => StripeUnknownError,
  TemporarySessionExpiredError: () => TemporarySessionExpiredError,
  generateV1Error: () => generateV1Error,
  generateV2Error: () => generateV2Error,
});
var generateV1Error = (rawStripeError) => {
  switch (rawStripeError.type) {
    case "card_error":
      return new StripeCardError(rawStripeError);
    case "invalid_request_error":
      return new StripeInvalidRequestError(rawStripeError);
    case "api_error":
      return new StripeAPIError(rawStripeError);
    case "authentication_error":
      return new StripeAuthenticationError(rawStripeError);
    case "rate_limit_error":
      return new StripeRateLimitError(rawStripeError);
    case "idempotency_error":
      return new StripeIdempotencyError(rawStripeError);
    case "invalid_grant":
      return new StripeInvalidGrantError(rawStripeError);
    default:
      return new StripeUnknownError(rawStripeError);
  }
};
var generateV2Error = (rawStripeError) => {
  switch (rawStripeError.type) {
    case "temporary_session_expired":
      return new TemporarySessionExpiredError(rawStripeError);
  }
  switch (rawStripeError.code) {
    case "invalid_fields":
      return new StripeInvalidRequestError(rawStripeError);
  }
  return generateV1Error(rawStripeError);
};
var StripeError = class extends Error {
  constructor(raw = {}, type = null) {
    super(raw.message);
    this.type = type || this.constructor.name;
    this.raw = raw;
    this.rawType = raw.type;
    this.code = raw.code;
    this.doc_url = raw.doc_url;
    this.param = raw.param;
    this.detail = raw.detail;
    this.headers = raw.headers;
    this.requestId = raw.requestId;
    this.statusCode = raw.statusCode;
    this.message = raw.message;
    this.userMessage = raw.user_message;
    this.charge = raw.charge;
    this.decline_code = raw.decline_code;
    this.payment_intent = raw.payment_intent;
    this.payment_method = raw.payment_method;
    this.payment_method_type = raw.payment_method_type;
    this.setup_intent = raw.setup_intent;
    this.source = raw.source;
  }
};
StripeError.generate = generateV1Error;
var StripeCardError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeCardError");
  }
};
var StripeInvalidRequestError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeInvalidRequestError");
  }
};
var StripeAPIError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeAPIError");
  }
};
var StripeAuthenticationError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeAuthenticationError");
  }
};
var StripePermissionError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripePermissionError");
  }
};
var StripeRateLimitError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeRateLimitError");
  }
};
var StripeConnectionError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeConnectionError");
  }
};
var StripeSignatureVerificationError = class extends StripeError {
  constructor(header, payload, raw = {}) {
    super(raw, "StripeSignatureVerificationError");
    this.header = header;
    this.payload = payload;
  }
};
var StripeIdempotencyError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeIdempotencyError");
  }
};
var StripeInvalidGrantError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeInvalidGrantError");
  }
};
var StripeUnknownError = class extends StripeError {
  constructor(raw = {}) {
    super(raw, "StripeUnknownError");
  }
};
var TemporarySessionExpiredError = class extends StripeError {
  constructor(rawStripeError = {}) {
    super(rawStripeError, "TemporarySessionExpiredError");
  }
};

// node_modules/stripe/esm/utils.js
var qs = __toESM(require_lib(), 1);
var OPTIONS_KEYS = [
  "apiKey",
  "idempotencyKey",
  "stripeAccount",
  "apiVersion",
  "maxNetworkRetries",
  "timeout",
  "host",
  "authenticator",
  "stripeContext",
  "additionalHeaders",
];
function isOptionsHash(o) {
  return (
    o &&
    typeof o === "object" &&
    OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop))
  );
}
function queryStringifyRequestData(data, apiMode) {
  return qs
    .stringify(data, {
      serializeDate: (d) => Math.floor(d.getTime() / 1e3).toString(),
      arrayFormat: apiMode == "v2" ? "repeat" : "indices",
    })
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]");
}
var makeURLInterpolator = /* @__PURE__ */ (() => {
  const rc = {
    "\n": "\\n",
    '"': '\\"',
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  };
  return (str) => {
    const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
    return (outputs) => {
      return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) =>
        // @ts-ignore
        encodeURIComponent(outputs[$1] || "")
      );
    };
  };
})();
function extractUrlParams(path) {
  const params = path.match(/\{\w+\}/g);
  if (!params) {
    return [];
  }
  return params.map((param) => param.replace(/[{}]/g, ""));
}
function getDataFromArgs(args) {
  if (!Array.isArray(args) || !args[0] || typeof args[0] !== "object") {
    return {};
  }
  if (!isOptionsHash(args[0])) {
    return args.shift();
  }
  const argKeys = Object.keys(args[0]);
  const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
  if (
    optionKeysInArgs.length > 0 &&
    optionKeysInArgs.length !== argKeys.length
  ) {
    emitWarning(
      `Options found in arguments (${optionKeysInArgs.join(
        ", "
      )}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`
    );
  }
  return {};
}
function getOptionsFromArgs(args) {
  const opts = {
    host: null,
    headers: {},
    settings: {},
  };
  if (args.length > 0) {
    const arg = args[args.length - 1];
    if (typeof arg === "string") {
      opts.authenticator = createApiKeyAuthenticator(args.pop());
    } else if (isOptionsHash(arg)) {
      const params = Object.assign({}, args.pop());
      const extraKeys = Object.keys(params).filter(
        (key) => !OPTIONS_KEYS.includes(key)
      );
      if (extraKeys.length) {
        emitWarning(
          `Invalid options found (${extraKeys.join(", ")}); ignoring.`
        );
      }
      if (params.apiKey) {
        opts.authenticator = createApiKeyAuthenticator(params.apiKey);
      }
      if (params.idempotencyKey) {
        opts.headers["Idempotency-Key"] = params.idempotencyKey;
      }
      if (params.stripeAccount) {
        opts.headers["Stripe-Account"] = params.stripeAccount;
      }
      if (params.stripeContext) {
        if (opts.headers["Stripe-Account"]) {
          throw new Error(
            "Can't specify both stripeAccount and stripeContext."
          );
        }
        opts.headers["Stripe-Context"] = params.stripeContext;
      }
      if (params.apiVersion) {
        opts.headers["Stripe-Version"] = params.apiVersion;
      }
      if (Number.isInteger(params.maxNetworkRetries)) {
        opts.settings.maxNetworkRetries = params.maxNetworkRetries;
      }
      if (Number.isInteger(params.timeout)) {
        opts.settings.timeout = params.timeout;
      }
      if (params.host) {
        opts.host = params.host;
      }
      if (params.authenticator) {
        if (params.apiKey) {
          throw new Error("Can't specify both apiKey and authenticator.");
        }
        if (typeof params.authenticator !== "function") {
          throw new Error(
            "The authenticator must be a function receiving a request as the first parameter."
          );
        }
        opts.authenticator = params.authenticator;
      }
      if (params.additionalHeaders) {
        opts.headers = params.additionalHeaders;
      }
    }
  }
  return opts;
}
function protoExtend(sub) {
  const Super = this;
  const Constructor = Object.prototype.hasOwnProperty.call(sub, "constructor")
    ? sub.constructor
    : function (...args) {
        Super.apply(this, args);
      };
  Object.assign(Constructor, Super);
  Constructor.prototype = Object.create(Super.prototype);
  Object.assign(Constructor.prototype, sub);
  return Constructor;
}
function removeNullish(obj) {
  if (typeof obj !== "object") {
    throw new Error("Argument must be an object");
  }
  return Object.keys(obj).reduce((result, key) => {
    if (obj[key] != null) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}
function normalizeHeaders(obj) {
  if (!(obj && typeof obj === "object")) {
    return obj;
  }
  return Object.keys(obj).reduce((result, header) => {
    result[normalizeHeader(header)] = obj[header];
    return result;
  }, {});
}
function normalizeHeader(header) {
  return header
    .split("-")
    .map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
    .join("-");
}
function callbackifyPromiseWithTimeout(promise, callback) {
  if (callback) {
    return promise.then(
      (res) => {
        setTimeout(() => {
          callback(null, res);
        }, 0);
      },
      (err) => {
        setTimeout(() => {
          callback(err, null);
        }, 0);
      }
    );
  }
  return promise;
}
function pascalToCamelCase(name) {
  if (name === "OAuth") {
    return "oauth";
  } else {
    return name[0].toLowerCase() + name.substring(1);
  }
}
function emitWarning(warning) {
  if (typeof process.emitWarning !== "function") {
    return console.warn(`Stripe: ${warning}`);
  }
  return process.emitWarning(warning, "Stripe");
}
function isObject(obj) {
  const type = typeof obj;
  return (type === "function" || type === "object") && !!obj;
}
function flattenAndStringify(data) {
  const result = {};
  const step = (obj, prevKey) => {
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = prevKey ? `${prevKey}[${key}]` : key;
      if (isObject(value)) {
        if (
          !(value instanceof Uint8Array) &&
          !Object.prototype.hasOwnProperty.call(value, "data")
        ) {
          return step(value, newKey);
        } else {
          result[newKey] = value;
        }
      } else {
        result[newKey] = String(value);
      }
    });
  };
  step(data, null);
  return result;
}
function validateInteger(name, n, defaultVal) {
  if (!Number.isInteger(n)) {
    if (defaultVal !== void 0) {
      return defaultVal;
    } else {
      throw new Error(`${name} must be an integer`);
    }
  }
  return n;
}
function determineProcessUserAgentProperties() {
  return typeof process === "undefined"
    ? {}
    : {
        lang_version: process.version,
        platform: process.platform,
      };
}
function createApiKeyAuthenticator(apiKey) {
  const authenticator = (request) => {
    request.headers.Authorization = "Bearer " + apiKey;
    return Promise.resolve();
  };
  authenticator._apiKey = apiKey;
  return authenticator;
}
function concat(arrays) {
  const totalLength = arrays.reduce((len, array) => len + array.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  arrays.forEach((array) => {
    merged.set(array, offset);
    offset += array.length;
  });
  return merged;
}
function dateTimeReplacer(key, value) {
  if (this[key] instanceof Date) {
    return Math.floor(this[key].getTime() / 1e3).toString();
  }
  return value;
}
function jsonStringifyRequestData(data) {
  return JSON.stringify(data, dateTimeReplacer);
}
function getAPIMode(path) {
  if (!path) {
    return "v1";
  }
  return path.startsWith("/v2") ? "v2" : "v1";
}

// node_modules/stripe/esm/platform/NodePlatformFunctions.js
var import_child_process = require("child_process");
var StreamProcessingError = class extends StripeError {};
var NodePlatformFunctions = class extends PlatformFunctions {
  constructor() {
    super();
    this._exec = import_child_process.exec;
    this._UNAME_CACHE = null;
  }
  /** @override */
  uuid4() {
    if (crypto3.randomUUID) {
      return crypto3.randomUUID();
    }
    return super.uuid4();
  }
  /**
   * @override
   * Node's built in `exec` function sometimes throws outright,
   * and sometimes has a callback with an error,
   * depending on the type of error.
   *
   * This unifies that interface by resolving with a null uname
   * if an error is encountered.
   */
  getUname() {
    if (!this._UNAME_CACHE) {
      this._UNAME_CACHE = new Promise((resolve, reject) => {
        try {
          this._exec("uname -a", (err, uname) => {
            if (err) {
              return resolve(null);
            }
            resolve(uname);
          });
        } catch (e) {
          resolve(null);
        }
      });
    }
    return this._UNAME_CACHE;
  }
  /**
   * @override
   * Secure compare, from https://github.com/freewil/scmp
   */
  secureCompare(a, b) {
    if (!a || !b) {
      throw new Error("secureCompare must receive two arguments");
    }
    if (a.length !== b.length) {
      return false;
    }
    if (crypto3.timingSafeEqual) {
      const textEncoder = new TextEncoder();
      const aEncoded = textEncoder.encode(a);
      const bEncoded = textEncoder.encode(b);
      return crypto3.timingSafeEqual(aEncoded, bEncoded);
    }
    return super.secureCompare(a, b);
  }
  createEmitter() {
    return new import_events.EventEmitter();
  }
  /** @override */
  tryBufferData(data) {
    if (!(data.file.data instanceof import_events.EventEmitter)) {
      return Promise.resolve(data);
    }
    const bufferArray = [];
    return new Promise((resolve, reject) => {
      data.file.data
        .on("data", (line) => {
          bufferArray.push(line);
        })
        .once("end", () => {
          const bufferData = Object.assign({}, data);
          bufferData.file.data = concat(bufferArray);
          resolve(bufferData);
        })
        .on("error", (err) => {
          reject(
            new StreamProcessingError({
              message:
                "An error occurred while attempting to process the file for upload.",
              detail: err,
            })
          );
        });
    });
  }
  /** @override */
  createNodeHttpClient(agent) {
    return new NodeHttpClient(agent);
  }
  /** @override */
  createDefaultHttpClient() {
    return new NodeHttpClient();
  }
  /** @override */
  createNodeCryptoProvider() {
    return new NodeCryptoProvider();
  }
  /** @override */
  createDefaultCryptoProvider() {
    return this.createNodeCryptoProvider();
  }
};

// node_modules/stripe/esm/RequestSender.js
var MAX_RETRY_AFTER_WAIT = 60;
var RequestSender = class _RequestSender {
  constructor(stripe2, maxBufferedRequestMetric) {
    this._stripe = stripe2;
    this._maxBufferedRequestMetric = maxBufferedRequestMetric;
  }
  _addHeadersDirectlyToObject(obj, headers) {
    obj.requestId = headers["request-id"];
    obj.stripeAccount = obj.stripeAccount || headers["stripe-account"];
    obj.apiVersion = obj.apiVersion || headers["stripe-version"];
    obj.idempotencyKey = obj.idempotencyKey || headers["idempotency-key"];
  }
  _makeResponseEvent(requestEvent, statusCode, headers) {
    const requestEndTime = Date.now();
    const requestDurationMs = requestEndTime - requestEvent.request_start_time;
    return removeNullish({
      api_version: headers["stripe-version"],
      account: headers["stripe-account"],
      idempotency_key: headers["idempotency-key"],
      method: requestEvent.method,
      path: requestEvent.path,
      status: statusCode,
      request_id: this._getRequestId(headers),
      elapsed: requestDurationMs,
      request_start_time: requestEvent.request_start_time,
      request_end_time: requestEndTime,
    });
  }
  _getRequestId(headers) {
    return headers["request-id"];
  }
  /**
   * Used by methods with spec.streaming === true. For these methods, we do not
   * buffer successful responses into memory or do parse them into stripe
   * objects, we delegate that all of that to the user and pass back the raw
   * http.Response object to the callback.
   *
   * (Unsuccessful responses shouldn't make it here, they should
   * still be buffered/parsed and handled by _jsonResponseHandler -- see
   * makeRequest)
   */
  _streamingResponseHandler(requestEvent, usage, callback) {
    return (res) => {
      const headers = res.getHeaders();
      const streamCompleteCallback = () => {
        const responseEvent = this._makeResponseEvent(
          requestEvent,
          res.getStatusCode(),
          headers
        );
        this._stripe._emitter.emit("response", responseEvent);
        this._recordRequestMetrics(
          this._getRequestId(headers),
          responseEvent.elapsed,
          usage
        );
      };
      const stream = res.toStream(streamCompleteCallback);
      this._addHeadersDirectlyToObject(stream, headers);
      return callback(null, stream);
    };
  }
  /**
   * Default handler for Stripe responses. Buffers the response into memory,
   * parses the JSON and returns it (i.e. passes it to the callback) if there
   * is no "error" field. Otherwise constructs/passes an appropriate Error.
   */
  _jsonResponseHandler(requestEvent, apiMode, usage, callback) {
    return (res) => {
      const headers = res.getHeaders();
      const requestId = this._getRequestId(headers);
      const statusCode = res.getStatusCode();
      const responseEvent = this._makeResponseEvent(
        requestEvent,
        statusCode,
        headers
      );
      this._stripe._emitter.emit("response", responseEvent);
      res
        .toJSON()
        .then(
          (jsonResponse) => {
            if (jsonResponse.error) {
              let err;
              if (typeof jsonResponse.error === "string") {
                jsonResponse.error = {
                  type: jsonResponse.error,
                  message: jsonResponse.error_description,
                };
              }
              jsonResponse.error.headers = headers;
              jsonResponse.error.statusCode = statusCode;
              jsonResponse.error.requestId = requestId;
              if (statusCode === 401) {
                err = new StripeAuthenticationError(jsonResponse.error);
              } else if (statusCode === 403) {
                err = new StripePermissionError(jsonResponse.error);
              } else if (statusCode === 429) {
                err = new StripeRateLimitError(jsonResponse.error);
              } else if (apiMode === "v2") {
                err = generateV2Error(jsonResponse.error);
              } else {
                err = generateV1Error(jsonResponse.error);
              }
              throw err;
            }
            return jsonResponse;
          },
          (e) => {
            throw new StripeAPIError({
              message: "Invalid JSON received from the Stripe API",
              exception: e,
              requestId: headers["request-id"],
            });
          }
        )
        .then(
          (jsonResponse) => {
            this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
            const rawResponse = res.getRawResponse();
            this._addHeadersDirectlyToObject(rawResponse, headers);
            Object.defineProperty(jsonResponse, "lastResponse", {
              enumerable: false,
              writable: false,
              value: rawResponse,
            });
            callback(null, jsonResponse);
          },
          (e) => callback(e, null)
        );
    };
  }
  static _generateConnectionErrorMessage(requestRetries) {
    return `An error occurred with our connection to Stripe.${
      requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""
    }`;
  }
  // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
  static _shouldRetry(res, numRetries, maxRetries, error) {
    if (
      error &&
      numRetries === 0 &&
      HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)
    ) {
      return true;
    }
    if (numRetries >= maxRetries) {
      return false;
    }
    if (!res) {
      return true;
    }
    if (res.getHeaders()["stripe-should-retry"] === "false") {
      return false;
    }
    if (res.getHeaders()["stripe-should-retry"] === "true") {
      return true;
    }
    if (res.getStatusCode() === 409) {
      return true;
    }
    if (res.getStatusCode() >= 500) {
      return true;
    }
    return false;
  }
  _getSleepTimeInMS(numRetries, retryAfter = null) {
    const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
    const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
    let sleepSeconds = Math.min(
      initialNetworkRetryDelay * Math.pow(2, numRetries - 1),
      maxNetworkRetryDelay
    );
    sleepSeconds *= 0.5 * (1 + Math.random());
    sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
    if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
      sleepSeconds = Math.max(sleepSeconds, retryAfter);
    }
    return sleepSeconds * 1e3;
  }
  // Max retries can be set on a per request basis. Favor those over the global setting
  _getMaxNetworkRetries(settings = {}) {
    return settings.maxNetworkRetries !== void 0 &&
      Number.isInteger(settings.maxNetworkRetries)
      ? settings.maxNetworkRetries
      : this._stripe.getMaxNetworkRetries();
  }
  _defaultIdempotencyKey(method, settings, apiMode) {
    const maxRetries = this._getMaxNetworkRetries(settings);
    const genKey = () =>
      `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
    if (apiMode === "v2") {
      if (method === "POST" || method === "DELETE") {
        return genKey();
      }
    } else if (apiMode === "v1") {
      if (method === "POST" && maxRetries > 0) {
        return genKey();
      }
    }
    return null;
  }
  _makeHeaders({
    contentType,
    contentLength,
    apiVersion,
    clientUserAgent,
    method,
    userSuppliedHeaders,
    userSuppliedSettings,
    stripeAccount,
    stripeContext,
    apiMode,
  }) {
    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": contentType,
      "User-Agent": this._getUserAgentString(apiMode),
      "X-Stripe-Client-User-Agent": clientUserAgent,
      "X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
      "Stripe-Version": apiVersion,
      "Stripe-Account": stripeAccount,
      "Stripe-Context": stripeContext,
      "Idempotency-Key": this._defaultIdempotencyKey(
        method,
        userSuppliedSettings,
        apiMode
      ),
    };
    const methodHasPayload =
      method == "POST" || method == "PUT" || method == "PATCH";
    if (methodHasPayload || contentLength) {
      if (!methodHasPayload) {
        emitWarning(
          `${method} method had non-zero contentLength but no payload is expected for this verb`
        );
      }
      defaultHeaders["Content-Length"] = contentLength;
    }
    return Object.assign(
      removeNullish(defaultHeaders),
      // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
      normalizeHeaders(userSuppliedHeaders)
    );
  }
  _getUserAgentString(apiMode) {
    const packageVersion = this._stripe.getConstant("PACKAGE_VERSION");
    const appInfo = this._stripe._appInfo
      ? this._stripe.getAppInfoAsString()
      : "";
    return `Stripe/${apiMode} NodeBindings/${packageVersion} ${appInfo}`.trim();
  }
  _getTelemetryHeader() {
    if (
      this._stripe.getTelemetryEnabled() &&
      this._stripe._prevRequestMetrics.length > 0
    ) {
      const metrics = this._stripe._prevRequestMetrics.shift();
      return JSON.stringify({
        last_request_metrics: metrics,
      });
    }
  }
  _recordRequestMetrics(requestId, requestDurationMs, usage) {
    if (this._stripe.getTelemetryEnabled() && requestId) {
      if (
        this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric
      ) {
        emitWarning(
          "Request metrics buffer is full, dropping telemetry message."
        );
      } else {
        const m = {
          request_id: requestId,
          request_duration_ms: requestDurationMs,
        };
        if (usage && usage.length > 0) {
          m.usage = usage;
        }
        this._stripe._prevRequestMetrics.push(m);
      }
    }
  }
  _rawRequest(method, path, params, options) {
    const requestPromise = new Promise((resolve, reject) => {
      let opts;
      try {
        const requestMethod = method.toUpperCase();
        if (
          requestMethod !== "POST" &&
          params &&
          Object.keys(params).length !== 0
        ) {
          throw new Error(
            "rawRequest only supports params on POST requests. Please pass null and add your parameters to path."
          );
        }
        const args = [].slice.call([params, options]);
        const dataFromArgs = getDataFromArgs(args);
        const data = Object.assign({}, dataFromArgs);
        const calculatedOptions = getOptionsFromArgs(args);
        const headers2 = calculatedOptions.headers;
        const authenticator2 = calculatedOptions.authenticator;
        opts = {
          requestMethod,
          requestPath: path,
          bodyData: data,
          queryData: {},
          authenticator: authenticator2,
          headers: headers2,
          host: null,
          streaming: false,
          settings: {},
          usage: ["raw_request"],
        };
      } catch (err) {
        reject(err);
        return;
      }
      function requestCallback(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      }
      const { headers, settings } = opts;
      const authenticator = opts.authenticator;
      this._request(
        opts.requestMethod,
        opts.host,
        path,
        opts.bodyData,
        authenticator,
        { headers, settings, streaming: opts.streaming },
        opts.usage,
        requestCallback
      );
    });
    return requestPromise;
  }
  _request(
    method,
    host,
    path,
    data,
    authenticator,
    options,
    usage = [],
    callback,
    requestDataProcessor = null
  ) {
    var _a;
    let requestData;
    authenticator =
      (_a =
        authenticator !== null && authenticator !== void 0
          ? authenticator
          : this._stripe._authenticator) !== null && _a !== void 0
        ? _a
        : null;
    const apiMode = getAPIMode(path);
    const retryRequest = (
      requestFn,
      apiVersion,
      headers,
      requestRetries,
      retryAfter
    ) => {
      return setTimeout(
        requestFn,
        this._getSleepTimeInMS(requestRetries, retryAfter),
        apiVersion,
        headers,
        requestRetries + 1
      );
    };
    const makeRequest = (apiVersion, headers, numRetries) => {
      const timeout =
        options.settings &&
        options.settings.timeout &&
        Number.isInteger(options.settings.timeout) &&
        options.settings.timeout >= 0
          ? options.settings.timeout
          : this._stripe.getApiField("timeout");
      const request = {
        host: host || this._stripe.getApiField("host"),
        port: this._stripe.getApiField("port"),
        path,
        method,
        headers: Object.assign({}, headers),
        body: requestData,
        protocol: this._stripe.getApiField("protocol"),
      };
      authenticator(request)
        .then(() => {
          const req = this._stripe
            .getApiField("httpClient")
            .makeRequest(
              request.host,
              request.port,
              request.path,
              request.method,
              request.headers,
              request.body,
              request.protocol,
              timeout
            );
          const requestStartTime = Date.now();
          const requestEvent = removeNullish({
            api_version: apiVersion,
            account: headers["Stripe-Account"],
            idempotency_key: headers["Idempotency-Key"],
            method,
            path,
            request_start_time: requestStartTime,
          });
          const requestRetries = numRetries || 0;
          const maxRetries = this._getMaxNetworkRetries(options.settings || {});
          this._stripe._emitter.emit("request", requestEvent);
          req
            .then((res) => {
              if (
                _RequestSender._shouldRetry(res, requestRetries, maxRetries)
              ) {
                return retryRequest(
                  makeRequest,
                  apiVersion,
                  headers,
                  requestRetries,
                  // @ts-ignore
                  res.getHeaders()["retry-after"]
                );
              } else if (options.streaming && res.getStatusCode() < 400) {
                return this._streamingResponseHandler(
                  requestEvent,
                  usage,
                  callback
                )(res);
              } else {
                return this._jsonResponseHandler(
                  requestEvent,
                  apiMode,
                  usage,
                  callback
                )(res);
              }
            })
            .catch((error) => {
              if (
                _RequestSender._shouldRetry(
                  null,
                  requestRetries,
                  maxRetries,
                  error
                )
              ) {
                return retryRequest(
                  makeRequest,
                  apiVersion,
                  headers,
                  requestRetries,
                  null
                );
              } else {
                const isTimeoutError =
                  error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE;
                return callback(
                  new StripeConnectionError({
                    message: isTimeoutError
                      ? `Request aborted due to timeout being reached (${timeout}ms)`
                      : _RequestSender._generateConnectionErrorMessage(
                          requestRetries
                        ),
                    // @ts-ignore
                    detail: error,
                  })
                );
              }
            });
        })
        .catch((e) => {
          throw new StripeError({
            message: "Unable to authenticate the request",
            exception: e,
          });
        });
    };
    const prepareAndMakeRequest = (error, data2) => {
      if (error) {
        return callback(error);
      }
      requestData = data2;
      this._stripe.getClientUserAgent((clientUserAgent) => {
        const apiVersion = this._stripe.getApiField("version");
        const headers = this._makeHeaders({
          contentType:
            apiMode == "v2"
              ? "application/json"
              : "application/x-www-form-urlencoded",
          contentLength: requestData.length,
          apiVersion,
          clientUserAgent,
          method,
          userSuppliedHeaders: options.headers,
          userSuppliedSettings: options.settings,
          stripeAccount:
            apiMode == "v2" ? null : this._stripe.getApiField("stripeAccount"),
          stripeContext:
            apiMode == "v2" ? this._stripe.getApiField("stripeContext") : null,
          apiMode,
        });
        makeRequest(apiVersion, headers, 0);
      });
    };
    if (requestDataProcessor) {
      requestDataProcessor(
        method,
        data,
        options.headers,
        prepareAndMakeRequest
      );
    } else {
      let stringifiedData;
      if (apiMode == "v2") {
        stringifiedData = data ? jsonStringifyRequestData(data) : "";
      } else {
        stringifiedData = queryStringifyRequestData(data || {}, apiMode);
      }
      prepareAndMakeRequest(null, stringifiedData);
    }
  }
};

// node_modules/stripe/esm/autoPagination.js
var V1Iterator = class {
  constructor(firstPagePromise, requestArgs, spec, stripeResource) {
    this.index = 0;
    this.pagePromise = firstPagePromise;
    this.promiseCache = { currentPromise: null };
    this.requestArgs = requestArgs;
    this.spec = spec;
    this.stripeResource = stripeResource;
  }
  async iterate(pageResult) {
    if (
      !(
        pageResult &&
        pageResult.data &&
        typeof pageResult.data.length === "number"
      )
    ) {
      throw Error(
        "Unexpected: Stripe API response does not have a well-formed `data` array."
      );
    }
    const reverseIteration = isReverseIteration(this.requestArgs);
    if (this.index < pageResult.data.length) {
      const idx = reverseIteration
        ? pageResult.data.length - 1 - this.index
        : this.index;
      const value = pageResult.data[idx];
      this.index += 1;
      return { value, done: false };
    } else if (pageResult.has_more) {
      this.index = 0;
      this.pagePromise = this.getNextPage(pageResult);
      const nextPageResult = await this.pagePromise;
      return this.iterate(nextPageResult);
    }
    return { done: true, value: void 0 };
  }
  /** @abstract */
  getNextPage(_pageResult) {
    throw new Error("Unimplemented");
  }
  async _next() {
    return this.iterate(await this.pagePromise);
  }
  next() {
    if (this.promiseCache.currentPromise) {
      return this.promiseCache.currentPromise;
    }
    const nextPromise = (async () => {
      const ret = await this._next();
      this.promiseCache.currentPromise = null;
      return ret;
    })();
    this.promiseCache.currentPromise = nextPromise;
    return nextPromise;
  }
};
var V1ListIterator = class extends V1Iterator {
  getNextPage(pageResult) {
    const reverseIteration = isReverseIteration(this.requestArgs);
    const lastId = getLastId(pageResult, reverseIteration);
    return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
      [reverseIteration ? "ending_before" : "starting_after"]: lastId,
    });
  }
};
var V1SearchIterator = class extends V1Iterator {
  getNextPage(pageResult) {
    if (!pageResult.next_page) {
      throw Error(
        "Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true."
      );
    }
    return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
      page: pageResult.next_page,
    });
  }
};
var V2ListIterator = class {
  constructor(firstPagePromise, requestArgs, spec, stripeResource) {
    this.currentPageIterator = (async () => {
      const page = await firstPagePromise;
      return page.data[Symbol.iterator]();
    })();
    this.nextPageUrl = (async () => {
      const page = await firstPagePromise;
      return page.next_page_url || null;
    })();
    this.requestArgs = requestArgs;
    this.spec = spec;
    this.stripeResource = stripeResource;
  }
  async turnPage() {
    const nextPageUrl = await this.nextPageUrl;
    if (!nextPageUrl) return null;
    this.spec.fullPath = nextPageUrl;
    const page = await this.stripeResource._makeRequest([], this.spec, {});
    this.nextPageUrl = Promise.resolve(page.next_page_url);
    this.currentPageIterator = Promise.resolve(page.data[Symbol.iterator]());
    return this.currentPageIterator;
  }
  async next() {
    {
      const result2 = (await this.currentPageIterator).next();
      if (!result2.done) return { done: false, value: result2.value };
    }
    const nextPageIterator = await this.turnPage();
    if (!nextPageIterator) {
      return { done: true, value: void 0 };
    }
    const result = nextPageIterator.next();
    if (!result.done) return { done: false, value: result.value };
    return { done: true, value: void 0 };
  }
};
var makeAutoPaginationMethods = (
  stripeResource,
  requestArgs,
  spec,
  firstPagePromise
) => {
  const apiMode = getAPIMode(spec.fullPath || spec.path);
  if (apiMode !== "v2" && spec.methodType === "search") {
    return makeAutoPaginationMethodsFromIterator(
      new V1SearchIterator(firstPagePromise, requestArgs, spec, stripeResource)
    );
  }
  if (apiMode !== "v2" && spec.methodType === "list") {
    return makeAutoPaginationMethodsFromIterator(
      new V1ListIterator(firstPagePromise, requestArgs, spec, stripeResource)
    );
  }
  if (apiMode === "v2" && spec.methodType === "list") {
    return makeAutoPaginationMethodsFromIterator(
      new V2ListIterator(firstPagePromise, requestArgs, spec, stripeResource)
    );
  }
  return null;
};
var makeAutoPaginationMethodsFromIterator = (iterator) => {
  const autoPagingEach = makeAutoPagingEach((...args) =>
    iterator.next(...args)
  );
  const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
  const autoPaginationMethods = {
    autoPagingEach,
    autoPagingToArray,
    // Async iterator functions:
    next: () => iterator.next(),
    return: () => {
      return {};
    },
    [getAsyncIteratorSymbol()]: () => {
      return autoPaginationMethods;
    },
  };
  return autoPaginationMethods;
};
function getAsyncIteratorSymbol() {
  if (typeof Symbol !== "undefined" && Symbol.asyncIterator) {
    return Symbol.asyncIterator;
  }
  return "@@asyncIterator";
}
function getDoneCallback(args) {
  if (args.length < 2) {
    return null;
  }
  const onDone = args[1];
  if (typeof onDone !== "function") {
    throw Error(
      `The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`
    );
  }
  return onDone;
}
function getItemCallback(args) {
  if (args.length === 0) {
    return void 0;
  }
  const onItem = args[0];
  if (typeof onItem !== "function") {
    throw Error(
      `The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`
    );
  }
  if (onItem.length === 2) {
    return onItem;
  }
  if (onItem.length > 2) {
    throw Error(
      `The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`
    );
  }
  return function _onItem(item, next) {
    const shouldContinue = onItem(item);
    next(shouldContinue);
  };
}
function getLastId(listResult, reverseIteration) {
  const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
  const lastItem = listResult.data[lastIdx];
  const lastId = lastItem && lastItem.id;
  if (!lastId) {
    throw Error(
      "Unexpected: No `id` found on the last item while auto-paging a list."
    );
  }
  return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
  return function autoPagingEach() {
    const args = [].slice.call(arguments);
    const onItem = getItemCallback(args);
    const onDone = getDoneCallback(args);
    if (args.length > 2) {
      throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
    }
    const autoPagePromise = wrapAsyncIteratorWithCallback(
      asyncIteratorNext,
      // @ts-ignore we might need a null check
      onItem
    );
    return callbackifyPromiseWithTimeout(autoPagePromise, onDone);
  };
}
function makeAutoPagingToArray(autoPagingEach) {
  return function autoPagingToArray(opts, onDone) {
    const limit = opts && opts.limit;
    if (!limit) {
      throw Error(
        "You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`."
      );
    }
    if (limit > 1e4) {
      throw Error(
        "You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists."
      );
    }
    const promise = new Promise((resolve, reject) => {
      const items = [];
      autoPagingEach((item) => {
        items.push(item);
        if (items.length >= limit) {
          return false;
        }
      })
        .then(() => {
          resolve(items);
        })
        .catch(reject);
    });
    return callbackifyPromiseWithTimeout(promise, onDone);
  };
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
  return new Promise((resolve, reject) => {
    function handleIteration(iterResult) {
      if (iterResult.done) {
        resolve();
        return;
      }
      const item = iterResult.value;
      return new Promise((next) => {
        onItem(item, next);
      }).then((shouldContinue) => {
        if (shouldContinue === false) {
          return handleIteration({ done: true, value: void 0 });
        } else {
          return asyncIteratorNext().then(handleIteration);
        }
      });
    }
    asyncIteratorNext().then(handleIteration).catch(reject);
  });
}
function isReverseIteration(requestArgs) {
  const args = [].slice.call(requestArgs);
  const dataFromArgs = getDataFromArgs(args);
  return !!dataFromArgs.ending_before;
}

// node_modules/stripe/esm/StripeMethod.js
function stripeMethod(spec) {
  if (spec.path !== void 0 && spec.fullPath !== void 0) {
    throw new Error(
      `Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`
    );
  }
  return function (...args) {
    const callback = typeof args[args.length - 1] == "function" && args.pop();
    spec.urlParams = extractUrlParams(
      spec.fullPath || this.createResourcePathWithSymbols(spec.path || "")
    );
    const requestPromise = callbackifyPromiseWithTimeout(
      this._makeRequest(args, spec, {}),
      callback
    );
    Object.assign(
      requestPromise,
      makeAutoPaginationMethods(this, args, spec, requestPromise)
    );
    return requestPromise;
  };
}

// node_modules/stripe/esm/StripeResource.js
StripeResource.extend = protoExtend;
StripeResource.method = stripeMethod;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
function StripeResource(stripe2, deprecatedUrlData) {
  this._stripe = stripe2;
  if (deprecatedUrlData) {
    throw new Error(
      "Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids."
    );
  }
  this.basePath = makeURLInterpolator(
    // @ts-ignore changing type of basePath
    this.basePath || stripe2.getApiField("basePath")
  );
  this.resourcePath = this.path;
  this.path = makeURLInterpolator(this.path);
  this.initialize(...arguments);
}
StripeResource.prototype = {
  _stripe: null,
  // @ts-ignore the type of path changes in ctor
  path: "",
  resourcePath: "",
  // Methods that don't use the API's default '/v1' path can override it with this setting.
  basePath: null,
  initialize() {},
  // Function to override the default data processor. This allows full control
  // over how a StripeResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,
  // Function to add a validation checks before sending the request, errors should
  // be thrown, and they will be passed to the callback/promise.
  validateRequest: null,
  createFullPath(commandPath, urlData) {
    const urlParts = [this.basePath(urlData), this.path(urlData)];
    if (typeof commandPath === "function") {
      const computedCommandPath = commandPath(urlData);
      if (computedCommandPath) {
        urlParts.push(computedCommandPath);
      }
    } else {
      urlParts.push(commandPath);
    }
    return this._joinUrlParts(urlParts);
  },
  // Creates a relative resource path with symbols left in (unlike
  // createFullPath which takes some data to replace them with). For example it
  // might produce: /invoices/{id}
  createResourcePathWithSymbols(pathWithSymbols) {
    if (pathWithSymbols) {
      return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
    } else {
      return `/${this.resourcePath}`;
    }
  },
  _joinUrlParts(parts) {
    return parts.join("/").replace(/\/{2,}/g, "/");
  },
  _getRequestOpts(requestArgs, spec, overrideData) {
    var _a;
    const requestMethod = (spec.method || "GET").toUpperCase();
    const usage = spec.usage || [];
    const urlParams = spec.urlParams || [];
    const encode = spec.encode || ((data2) => data2);
    const isUsingFullPath = !!spec.fullPath;
    const commandPath = makeURLInterpolator(
      isUsingFullPath ? spec.fullPath : spec.path || ""
    );
    const path = isUsingFullPath
      ? spec.fullPath
      : this.createResourcePathWithSymbols(spec.path);
    const args = [].slice.call(requestArgs);
    const urlData = urlParams.reduce((urlData2, param) => {
      const arg = args.shift();
      if (typeof arg !== "string") {
        throw new Error(
          `Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`
        );
      }
      urlData2[param] = arg;
      return urlData2;
    }, {});
    const dataFromArgs = getDataFromArgs(args);
    const data = encode(Object.assign({}, dataFromArgs, overrideData));
    const options = getOptionsFromArgs(args);
    const host = options.host || spec.host;
    const streaming = !!spec.streaming;
    if (args.filter((x) => x != null).length) {
      throw new Error(
        `Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`
      );
    }
    const requestPath = isUsingFullPath
      ? commandPath(urlData)
      : this.createFullPath(commandPath, urlData);
    const headers = Object.assign(options.headers, spec.headers);
    if (spec.validator) {
      spec.validator(data, { headers });
    }
    const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
    const bodyData = dataInQuery ? null : data;
    const queryData = dataInQuery ? data : {};
    return {
      requestMethod,
      requestPath,
      bodyData,
      queryData,
      authenticator:
        (_a = options.authenticator) !== null && _a !== void 0 ? _a : null,
      headers,
      host: host !== null && host !== void 0 ? host : null,
      streaming,
      settings: options.settings,
      usage,
    };
  },
  _makeRequest(requestArgs, spec, overrideData) {
    return new Promise((resolve, reject) => {
      var _a;
      let opts;
      try {
        opts = this._getRequestOpts(requestArgs, spec, overrideData);
      } catch (err) {
        reject(err);
        return;
      }
      function requestCallback(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(
            spec.transformResponseData
              ? spec.transformResponseData(response)
              : response
          );
        }
      }
      const emptyQuery = Object.keys(opts.queryData).length === 0;
      const path = [
        opts.requestPath,
        emptyQuery ? "" : "?",
        queryStringifyRequestData(opts.queryData, getAPIMode(opts.requestPath)),
      ].join("");
      const { headers, settings } = opts;
      this._stripe._requestSender._request(
        opts.requestMethod,
        opts.host,
        path,
        opts.bodyData,
        opts.authenticator,
        {
          headers,
          settings,
          streaming: opts.streaming,
        },
        opts.usage,
        requestCallback,
        (_a = this.requestDataProcessor) === null || _a === void 0
          ? void 0
          : _a.bind(this)
      );
    });
  },
};

// node_modules/stripe/esm/Webhooks.js
function createWebhooks(platformFunctions) {
  const Webhook = {
    DEFAULT_TOLERANCE: 300,
    // @ts-ignore
    signature: null,
    constructEvent(
      payload,
      header,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt
    ) {
      try {
        this.signature.verifyHeader(
          payload,
          header,
          secret,
          tolerance || Webhook.DEFAULT_TOLERANCE,
          cryptoProvider,
          receivedAt
        );
      } catch (e) {
        if (e instanceof CryptoProviderOnlySupportsAsyncError) {
          e.message +=
            "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`";
        }
        throw e;
      }
      const jsonPayload =
        payload instanceof Uint8Array
          ? JSON.parse(new TextDecoder("utf8").decode(payload))
          : JSON.parse(payload);
      return jsonPayload;
    },
    async constructEventAsync(
      payload,
      header,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt
    ) {
      await this.signature.verifyHeaderAsync(
        payload,
        header,
        secret,
        tolerance || Webhook.DEFAULT_TOLERANCE,
        cryptoProvider,
        receivedAt
      );
      const jsonPayload =
        payload instanceof Uint8Array
          ? JSON.parse(new TextDecoder("utf8").decode(payload))
          : JSON.parse(payload);
      return jsonPayload;
    },
    /**
     * Generates a header to be used for webhook mocking
     *
     * @typedef {object} opts
     * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
     * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
     * @property {string} secret - Stripe webhook secret 'whsec_...'
     * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
     * @property {string} signature - Computed webhook signature
     * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
     */
    generateTestHeaderString: function (opts) {
      const preparedOpts = prepareOptions(opts);
      const signature2 =
        preparedOpts.signature ||
        preparedOpts.cryptoProvider.computeHMACSignature(
          preparedOpts.payloadString,
          preparedOpts.secret
        );
      return preparedOpts.generateHeaderString(signature2);
    },
    generateTestHeaderStringAsync: async function (opts) {
      const preparedOpts = prepareOptions(opts);
      const signature2 =
        preparedOpts.signature ||
        (await preparedOpts.cryptoProvider.computeHMACSignatureAsync(
          preparedOpts.payloadString,
          preparedOpts.secret
        ));
      return preparedOpts.generateHeaderString(signature2);
    },
  };
  const signature = {
    EXPECTED_SCHEME: "v1",
    verifyHeader(
      encodedPayload,
      encodedHeader,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt
    ) {
      const {
        decodedHeader: header,
        decodedPayload: payload,
        details,
        suspectPayloadType,
      } = parseEventDetails(
        encodedPayload,
        encodedHeader,
        this.EXPECTED_SCHEME
      );
      const secretContainsWhitespace = /\s/.test(secret);
      cryptoProvider = cryptoProvider || getCryptoProvider();
      const expectedSignature = cryptoProvider.computeHMACSignature(
        makeHMACContent(payload, details),
        secret
      );
      validateComputedSignature(
        payload,
        header,
        details,
        expectedSignature,
        tolerance,
        suspectPayloadType,
        secretContainsWhitespace,
        receivedAt
      );
      return true;
    },
    async verifyHeaderAsync(
      encodedPayload,
      encodedHeader,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt
    ) {
      const {
        decodedHeader: header,
        decodedPayload: payload,
        details,
        suspectPayloadType,
      } = parseEventDetails(
        encodedPayload,
        encodedHeader,
        this.EXPECTED_SCHEME
      );
      const secretContainsWhitespace = /\s/.test(secret);
      cryptoProvider = cryptoProvider || getCryptoProvider();
      const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(
        makeHMACContent(payload, details),
        secret
      );
      return validateComputedSignature(
        payload,
        header,
        details,
        expectedSignature,
        tolerance,
        suspectPayloadType,
        secretContainsWhitespace,
        receivedAt
      );
    },
  };
  function makeHMACContent(payload, details) {
    return `${details.timestamp}.${payload}`;
  }
  function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
    if (!encodedPayload) {
      throw new StripeSignatureVerificationError(
        encodedHeader,
        encodedPayload,
        {
          message: "No webhook payload was provided.",
        }
      );
    }
    const suspectPayloadType =
      typeof encodedPayload != "string" &&
      !(encodedPayload instanceof Uint8Array);
    const textDecoder = new TextDecoder("utf8");
    const decodedPayload =
      encodedPayload instanceof Uint8Array
        ? textDecoder.decode(encodedPayload)
        : encodedPayload;
    if (Array.isArray(encodedHeader)) {
      throw new Error(
        "Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header."
      );
    }
    if (encodedHeader == null || encodedHeader == "") {
      throw new StripeSignatureVerificationError(
        encodedHeader,
        encodedPayload,
        {
          message: "No stripe-signature header value was provided.",
        }
      );
    }
    const decodedHeader =
      encodedHeader instanceof Uint8Array
        ? textDecoder.decode(encodedHeader)
        : encodedHeader;
    const details = parseHeader(decodedHeader, expectedScheme);
    if (!details || details.timestamp === -1) {
      throw new StripeSignatureVerificationError(
        decodedHeader,
        decodedPayload,
        {
          message: "Unable to extract timestamp and signatures from header",
        }
      );
    }
    if (!details.signatures.length) {
      throw new StripeSignatureVerificationError(
        decodedHeader,
        decodedPayload,
        {
          message: "No signatures found with expected scheme",
        }
      );
    }
    return {
      decodedPayload,
      decodedHeader,
      details,
      suspectPayloadType,
    };
  }
  function validateComputedSignature(
    payload,
    header,
    details,
    expectedSignature,
    tolerance,
    suspectPayloadType,
    secretContainsWhitespace,
    receivedAt
  ) {
    const signatureFound = !!details.signatures.filter(
      platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)
    ).length;
    const docsLocation =
      "\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature";
    const whitespaceMessage = secretContainsWhitespace
      ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value"
      : "";
    if (!signatureFound) {
      if (suspectPayloadType) {
        throw new StripeSignatureVerificationError(header, payload, {
          message:
            "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n" +
            docsLocation +
            "\n" +
            whitespaceMessage,
        });
      }
      throw new StripeSignatureVerificationError(header, payload, {
        message:
          "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.\n" +
          docsLocation +
          "\n" +
          whitespaceMessage,
      });
    }
    const timestampAge =
      Math.floor(
        (typeof receivedAt === "number" ? receivedAt : Date.now()) / 1e3
      ) - details.timestamp;
    if (tolerance > 0 && timestampAge > tolerance) {
      throw new StripeSignatureVerificationError(header, payload, {
        message: "Timestamp outside the tolerance zone",
      });
    }
    return true;
  }
  function parseHeader(header, scheme) {
    if (typeof header !== "string") {
      return null;
    }
    return header.split(",").reduce(
      (accum, item) => {
        const kv = item.split("=");
        if (kv[0] === "t") {
          accum.timestamp = parseInt(kv[1], 10);
        }
        if (kv[0] === scheme) {
          accum.signatures.push(kv[1]);
        }
        return accum;
      },
      {
        timestamp: -1,
        signatures: [],
      }
    );
  }
  let webhooksCryptoProviderInstance = null;
  function getCryptoProvider() {
    if (!webhooksCryptoProviderInstance) {
      webhooksCryptoProviderInstance =
        platformFunctions.createDefaultCryptoProvider();
    }
    return webhooksCryptoProviderInstance;
  }
  function prepareOptions(opts) {
    if (!opts) {
      throw new StripeError({
        message: "Options are required",
      });
    }
    const timestamp =
      Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
    const scheme = opts.scheme || signature.EXPECTED_SCHEME;
    const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
    const payloadString = `${timestamp}.${opts.payload}`;
    const generateHeaderString = (signature2) => {
      return `t=${timestamp},${scheme}=${signature2}`;
    };
    return Object.assign(Object.assign({}, opts), {
      timestamp,
      scheme,
      cryptoProvider,
      payloadString,
      generateHeaderString,
    });
  }
  Webhook.signature = signature;
  return Webhook;
}

// node_modules/stripe/esm/apiVersion.js
var ApiVersion = "2025-03-31.basil";

// node_modules/stripe/esm/resources.js
var resources_exports = {};
__export(resources_exports, {
  Account: () => Accounts2,
  AccountLinks: () => AccountLinks,
  AccountSessions: () => AccountSessions,
  Accounts: () => Accounts2,
  ApplePayDomains: () => ApplePayDomains,
  ApplicationFees: () => ApplicationFees,
  Apps: () => Apps,
  Balance: () => Balance,
  BalanceTransactions: () => BalanceTransactions,
  Billing: () => Billing,
  BillingPortal: () => BillingPortal,
  Charges: () => Charges,
  Checkout: () => Checkout,
  Climate: () => Climate,
  ConfirmationTokens: () => ConfirmationTokens2,
  CountrySpecs: () => CountrySpecs,
  Coupons: () => Coupons,
  CreditNotes: () => CreditNotes,
  CustomerSessions: () => CustomerSessions,
  Customers: () => Customers2,
  Disputes: () => Disputes2,
  Entitlements: () => Entitlements,
  EphemeralKeys: () => EphemeralKeys,
  Events: () => Events2,
  ExchangeRates: () => ExchangeRates,
  FileLinks: () => FileLinks,
  Files: () => Files,
  FinancialConnections: () => FinancialConnections,
  Forwarding: () => Forwarding,
  Identity: () => Identity,
  InvoiceItems: () => InvoiceItems,
  InvoicePayments: () => InvoicePayments,
  InvoiceRenderingTemplates: () => InvoiceRenderingTemplates,
  Invoices: () => Invoices,
  Issuing: () => Issuing,
  Mandates: () => Mandates,
  OAuth: () => OAuth,
  PaymentIntents: () => PaymentIntents,
  PaymentLinks: () => PaymentLinks,
  PaymentMethodConfigurations: () => PaymentMethodConfigurations,
  PaymentMethodDomains: () => PaymentMethodDomains,
  PaymentMethods: () => PaymentMethods,
  Payouts: () => Payouts,
  Plans: () => Plans,
  Prices: () => Prices,
  Products: () => Products2,
  PromotionCodes: () => PromotionCodes,
  Quotes: () => Quotes,
  Radar: () => Radar,
  Refunds: () => Refunds2,
  Reporting: () => Reporting,
  Reviews: () => Reviews,
  SetupAttempts: () => SetupAttempts,
  SetupIntents: () => SetupIntents,
  ShippingRates: () => ShippingRates,
  Sigma: () => Sigma,
  Sources: () => Sources,
  SubscriptionItems: () => SubscriptionItems,
  SubscriptionSchedules: () => SubscriptionSchedules,
  Subscriptions: () => Subscriptions,
  Tax: () => Tax,
  TaxCodes: () => TaxCodes,
  TaxIds: () => TaxIds,
  TaxRates: () => TaxRates,
  Terminal: () => Terminal,
  TestHelpers: () => TestHelpers,
  Tokens: () => Tokens2,
  Topups: () => Topups,
  Transfers: () => Transfers,
  Treasury: () => Treasury,
  V2: () => V2,
  WebhookEndpoints: () => WebhookEndpoints,
});

// node_modules/stripe/esm/ResourceNamespace.js
function ResourceNamespace(stripe2, resources) {
  for (const name in resources) {
    if (!Object.prototype.hasOwnProperty.call(resources, name)) {
      continue;
    }
    const camelCaseName = name[0].toLowerCase() + name.substring(1);
    const resource = new resources[name](stripe2);
    this[camelCaseName] = resource;
  }
}
function resourceNamespace(namespace, resources) {
  return function (stripe2) {
    return new ResourceNamespace(stripe2, resources);
  };
}

// node_modules/stripe/esm/resources/FinancialConnections/Accounts.js
var stripeMethod2 = StripeResource.method;
var Accounts = StripeResource.extend({
  retrieve: stripeMethod2({
    method: "GET",
    fullPath: "/v1/financial_connections/accounts/{account}",
  }),
  list: stripeMethod2({
    method: "GET",
    fullPath: "/v1/financial_connections/accounts",
    methodType: "list",
  }),
  disconnect: stripeMethod2({
    method: "POST",
    fullPath: "/v1/financial_connections/accounts/{account}/disconnect",
  }),
  listOwners: stripeMethod2({
    method: "GET",
    fullPath: "/v1/financial_connections/accounts/{account}/owners",
    methodType: "list",
  }),
  refresh: stripeMethod2({
    method: "POST",
    fullPath: "/v1/financial_connections/accounts/{account}/refresh",
  }),
  subscribe: stripeMethod2({
    method: "POST",
    fullPath: "/v1/financial_connections/accounts/{account}/subscribe",
  }),
  unsubscribe: stripeMethod2({
    method: "POST",
    fullPath: "/v1/financial_connections/accounts/{account}/unsubscribe",
  }),
});

// node_modules/stripe/esm/resources/Entitlements/ActiveEntitlements.js
var stripeMethod3 = StripeResource.method;
var ActiveEntitlements = StripeResource.extend({
  retrieve: stripeMethod3({
    method: "GET",
    fullPath: "/v1/entitlements/active_entitlements/{id}",
  }),
  list: stripeMethod3({
    method: "GET",
    fullPath: "/v1/entitlements/active_entitlements",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Billing/Alerts.js
var stripeMethod4 = StripeResource.method;
var Alerts = StripeResource.extend({
  create: stripeMethod4({ method: "POST", fullPath: "/v1/billing/alerts" }),
  retrieve: stripeMethod4({
    method: "GET",
    fullPath: "/v1/billing/alerts/{id}",
  }),
  list: stripeMethod4({
    method: "GET",
    fullPath: "/v1/billing/alerts",
    methodType: "list",
  }),
  activate: stripeMethod4({
    method: "POST",
    fullPath: "/v1/billing/alerts/{id}/activate",
  }),
  archive: stripeMethod4({
    method: "POST",
    fullPath: "/v1/billing/alerts/{id}/archive",
  }),
  deactivate: stripeMethod4({
    method: "POST",
    fullPath: "/v1/billing/alerts/{id}/deactivate",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Issuing/Authorizations.js
var stripeMethod5 = StripeResource.method;
var Authorizations = StripeResource.extend({
  create: stripeMethod5({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/authorizations",
  }),
  capture: stripeMethod5({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/capture",
  }),
  expire: stripeMethod5({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/expire",
  }),
  finalizeAmount: stripeMethod5({
    method: "POST",
    fullPath:
      "/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount",
  }),
  increment: stripeMethod5({
    method: "POST",
    fullPath:
      "/v1/test_helpers/issuing/authorizations/{authorization}/increment",
  }),
  respond: stripeMethod5({
    method: "POST",
    fullPath:
      "/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond",
  }),
  reverse: stripeMethod5({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/reverse",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Authorizations.js
var stripeMethod6 = StripeResource.method;
var Authorizations2 = StripeResource.extend({
  retrieve: stripeMethod6({
    method: "GET",
    fullPath: "/v1/issuing/authorizations/{authorization}",
  }),
  update: stripeMethod6({
    method: "POST",
    fullPath: "/v1/issuing/authorizations/{authorization}",
  }),
  list: stripeMethod6({
    method: "GET",
    fullPath: "/v1/issuing/authorizations",
    methodType: "list",
  }),
  approve: stripeMethod6({
    method: "POST",
    fullPath: "/v1/issuing/authorizations/{authorization}/approve",
  }),
  decline: stripeMethod6({
    method: "POST",
    fullPath: "/v1/issuing/authorizations/{authorization}/decline",
  }),
});

// node_modules/stripe/esm/resources/Tax/Calculations.js
var stripeMethod7 = StripeResource.method;
var Calculations = StripeResource.extend({
  create: stripeMethod7({ method: "POST", fullPath: "/v1/tax/calculations" }),
  retrieve: stripeMethod7({
    method: "GET",
    fullPath: "/v1/tax/calculations/{calculation}",
  }),
  listLineItems: stripeMethod7({
    method: "GET",
    fullPath: "/v1/tax/calculations/{calculation}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Cardholders.js
var stripeMethod8 = StripeResource.method;
var Cardholders = StripeResource.extend({
  create: stripeMethod8({
    method: "POST",
    fullPath: "/v1/issuing/cardholders",
  }),
  retrieve: stripeMethod8({
    method: "GET",
    fullPath: "/v1/issuing/cardholders/{cardholder}",
  }),
  update: stripeMethod8({
    method: "POST",
    fullPath: "/v1/issuing/cardholders/{cardholder}",
  }),
  list: stripeMethod8({
    method: "GET",
    fullPath: "/v1/issuing/cardholders",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js
var stripeMethod9 = StripeResource.method;
var Cards = StripeResource.extend({
  deliverCard: stripeMethod9({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/deliver",
  }),
  failCard: stripeMethod9({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/fail",
  }),
  returnCard: stripeMethod9({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/return",
  }),
  shipCard: stripeMethod9({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/ship",
  }),
  submitCard: stripeMethod9({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/submit",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Cards.js
var stripeMethod10 = StripeResource.method;
var Cards2 = StripeResource.extend({
  create: stripeMethod10({ method: "POST", fullPath: "/v1/issuing/cards" }),
  retrieve: stripeMethod10({
    method: "GET",
    fullPath: "/v1/issuing/cards/{card}",
  }),
  update: stripeMethod10({
    method: "POST",
    fullPath: "/v1/issuing/cards/{card}",
  }),
  list: stripeMethod10({
    method: "GET",
    fullPath: "/v1/issuing/cards",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/BillingPortal/Configurations.js
var stripeMethod11 = StripeResource.method;
var Configurations = StripeResource.extend({
  create: stripeMethod11({
    method: "POST",
    fullPath: "/v1/billing_portal/configurations",
  }),
  retrieve: stripeMethod11({
    method: "GET",
    fullPath: "/v1/billing_portal/configurations/{configuration}",
  }),
  update: stripeMethod11({
    method: "POST",
    fullPath: "/v1/billing_portal/configurations/{configuration}",
  }),
  list: stripeMethod11({
    method: "GET",
    fullPath: "/v1/billing_portal/configurations",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Terminal/Configurations.js
var stripeMethod12 = StripeResource.method;
var Configurations2 = StripeResource.extend({
  create: stripeMethod12({
    method: "POST",
    fullPath: "/v1/terminal/configurations",
  }),
  retrieve: stripeMethod12({
    method: "GET",
    fullPath: "/v1/terminal/configurations/{configuration}",
  }),
  update: stripeMethod12({
    method: "POST",
    fullPath: "/v1/terminal/configurations/{configuration}",
  }),
  list: stripeMethod12({
    method: "GET",
    fullPath: "/v1/terminal/configurations",
    methodType: "list",
  }),
  del: stripeMethod12({
    method: "DELETE",
    fullPath: "/v1/terminal/configurations/{configuration}",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/ConfirmationTokens.js
var stripeMethod13 = StripeResource.method;
var ConfirmationTokens = StripeResource.extend({
  create: stripeMethod13({
    method: "POST",
    fullPath: "/v1/test_helpers/confirmation_tokens",
  }),
});

// node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js
var stripeMethod14 = StripeResource.method;
var ConnectionTokens = StripeResource.extend({
  create: stripeMethod14({
    method: "POST",
    fullPath: "/v1/terminal/connection_tokens",
  }),
});

// node_modules/stripe/esm/resources/Billing/CreditBalanceSummary.js
var stripeMethod15 = StripeResource.method;
var CreditBalanceSummary = StripeResource.extend({
  retrieve: stripeMethod15({
    method: "GET",
    fullPath: "/v1/billing/credit_balance_summary",
  }),
});

// node_modules/stripe/esm/resources/Billing/CreditBalanceTransactions.js
var stripeMethod16 = StripeResource.method;
var CreditBalanceTransactions = StripeResource.extend({
  retrieve: stripeMethod16({
    method: "GET",
    fullPath: "/v1/billing/credit_balance_transactions/{id}",
  }),
  list: stripeMethod16({
    method: "GET",
    fullPath: "/v1/billing/credit_balance_transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Billing/CreditGrants.js
var stripeMethod17 = StripeResource.method;
var CreditGrants = StripeResource.extend({
  create: stripeMethod17({
    method: "POST",
    fullPath: "/v1/billing/credit_grants",
  }),
  retrieve: stripeMethod17({
    method: "GET",
    fullPath: "/v1/billing/credit_grants/{id}",
  }),
  update: stripeMethod17({
    method: "POST",
    fullPath: "/v1/billing/credit_grants/{id}",
  }),
  list: stripeMethod17({
    method: "GET",
    fullPath: "/v1/billing/credit_grants",
    methodType: "list",
  }),
  expire: stripeMethod17({
    method: "POST",
    fullPath: "/v1/billing/credit_grants/{id}/expire",
  }),
  voidGrant: stripeMethod17({
    method: "POST",
    fullPath: "/v1/billing/credit_grants/{id}/void",
  }),
});

// node_modules/stripe/esm/resources/Treasury/CreditReversals.js
var stripeMethod18 = StripeResource.method;
var CreditReversals = StripeResource.extend({
  create: stripeMethod18({
    method: "POST",
    fullPath: "/v1/treasury/credit_reversals",
  }),
  retrieve: stripeMethod18({
    method: "GET",
    fullPath: "/v1/treasury/credit_reversals/{credit_reversal}",
  }),
  list: stripeMethod18({
    method: "GET",
    fullPath: "/v1/treasury/credit_reversals",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Customers.js
var stripeMethod19 = StripeResource.method;
var Customers = StripeResource.extend({
  fundCashBalance: stripeMethod19({
    method: "POST",
    fullPath: "/v1/test_helpers/customers/{customer}/fund_cash_balance",
  }),
});

// node_modules/stripe/esm/resources/Treasury/DebitReversals.js
var stripeMethod20 = StripeResource.method;
var DebitReversals = StripeResource.extend({
  create: stripeMethod20({
    method: "POST",
    fullPath: "/v1/treasury/debit_reversals",
  }),
  retrieve: stripeMethod20({
    method: "GET",
    fullPath: "/v1/treasury/debit_reversals/{debit_reversal}",
  }),
  list: stripeMethod20({
    method: "GET",
    fullPath: "/v1/treasury/debit_reversals",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Disputes.js
var stripeMethod21 = StripeResource.method;
var Disputes = StripeResource.extend({
  create: stripeMethod21({ method: "POST", fullPath: "/v1/issuing/disputes" }),
  retrieve: stripeMethod21({
    method: "GET",
    fullPath: "/v1/issuing/disputes/{dispute}",
  }),
  update: stripeMethod21({
    method: "POST",
    fullPath: "/v1/issuing/disputes/{dispute}",
  }),
  list: stripeMethod21({
    method: "GET",
    fullPath: "/v1/issuing/disputes",
    methodType: "list",
  }),
  submit: stripeMethod21({
    method: "POST",
    fullPath: "/v1/issuing/disputes/{dispute}/submit",
  }),
});

// node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js
var stripeMethod22 = StripeResource.method;
var EarlyFraudWarnings = StripeResource.extend({
  retrieve: stripeMethod22({
    method: "GET",
    fullPath: "/v1/radar/early_fraud_warnings/{early_fraud_warning}",
  }),
  list: stripeMethod22({
    method: "GET",
    fullPath: "/v1/radar/early_fraud_warnings",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/V2/Core/EventDestinations.js
var stripeMethod23 = StripeResource.method;
var EventDestinations = StripeResource.extend({
  create: stripeMethod23({
    method: "POST",
    fullPath: "/v2/core/event_destinations",
  }),
  retrieve: stripeMethod23({
    method: "GET",
    fullPath: "/v2/core/event_destinations/{id}",
  }),
  update: stripeMethod23({
    method: "POST",
    fullPath: "/v2/core/event_destinations/{id}",
  }),
  list: stripeMethod23({
    method: "GET",
    fullPath: "/v2/core/event_destinations",
    methodType: "list",
  }),
  del: stripeMethod23({
    method: "DELETE",
    fullPath: "/v2/core/event_destinations/{id}",
  }),
  disable: stripeMethod23({
    method: "POST",
    fullPath: "/v2/core/event_destinations/{id}/disable",
  }),
  enable: stripeMethod23({
    method: "POST",
    fullPath: "/v2/core/event_destinations/{id}/enable",
  }),
  ping: stripeMethod23({
    method: "POST",
    fullPath: "/v2/core/event_destinations/{id}/ping",
  }),
});

// node_modules/stripe/esm/resources/V2/Core/Events.js
var stripeMethod24 = StripeResource.method;
var Events = StripeResource.extend({
  retrieve(...args) {
    const transformResponseData = (response) => {
      return this.addFetchRelatedObjectIfNeeded(response);
    };
    return stripeMethod24({
      method: "GET",
      fullPath: "/v2/core/events/{id}",
      transformResponseData,
    }).apply(this, args);
  },
  list(...args) {
    const transformResponseData = (response) => {
      return Object.assign(Object.assign({}, response), {
        data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this)),
      });
    };
    return stripeMethod24({
      method: "GET",
      fullPath: "/v2/core/events",
      methodType: "list",
      transformResponseData,
    }).apply(this, args);
  },
  /**
   * @private
   *
   * For internal use in stripe-node.
   *
   * @param pulledEvent The retrieved event object
   * @returns The retrieved event object with a fetchRelatedObject method,
   * if pulledEvent.related_object is valid (non-null and has a url)
   */
  addFetchRelatedObjectIfNeeded(pulledEvent) {
    if (!pulledEvent.related_object || !pulledEvent.related_object.url) {
      return pulledEvent;
    }
    return Object.assign(Object.assign({}, pulledEvent), {
      fetchRelatedObject: () =>
        // call stripeMethod with 'this' resource to fetch
        // the related object. 'this' is needed to construct
        // and send the request, but the method spec controls
        // the url endpoint and method, so it doesn't matter
        // that 'this' is an Events resource object here
        stripeMethod24({
          method: "GET",
          fullPath: pulledEvent.related_object.url,
        }).apply(this, [
          {
            stripeAccount: pulledEvent.context,
          },
        ]),
    });
  },
});

// node_modules/stripe/esm/resources/Entitlements/Features.js
var stripeMethod25 = StripeResource.method;
var Features = StripeResource.extend({
  create: stripeMethod25({
    method: "POST",
    fullPath: "/v1/entitlements/features",
  }),
  retrieve: stripeMethod25({
    method: "GET",
    fullPath: "/v1/entitlements/features/{id}",
  }),
  update: stripeMethod25({
    method: "POST",
    fullPath: "/v1/entitlements/features/{id}",
  }),
  list: stripeMethod25({
    method: "GET",
    fullPath: "/v1/entitlements/features",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js
var stripeMethod26 = StripeResource.method;
var FinancialAccounts = StripeResource.extend({
  create: stripeMethod26({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts",
  }),
  retrieve: stripeMethod26({
    method: "GET",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}",
  }),
  update: stripeMethod26({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}",
  }),
  list: stripeMethod26({
    method: "GET",
    fullPath: "/v1/treasury/financial_accounts",
    methodType: "list",
  }),
  close: stripeMethod26({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}/close",
  }),
  retrieveFeatures: stripeMethod26({
    method: "GET",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}/features",
  }),
  updateFeatures: stripeMethod26({
    method: "POST",
    fullPath: "/v1/treasury/financial_accounts/{financial_account}/features",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js
var stripeMethod27 = StripeResource.method;
var InboundTransfers = StripeResource.extend({
  fail: stripeMethod27({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail",
  }),
  returnInboundTransfer: stripeMethod27({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/return",
  }),
  succeed: stripeMethod27({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed",
  }),
});

// node_modules/stripe/esm/resources/Treasury/InboundTransfers.js
var stripeMethod28 = StripeResource.method;
var InboundTransfers2 = StripeResource.extend({
  create: stripeMethod28({
    method: "POST",
    fullPath: "/v1/treasury/inbound_transfers",
  }),
  retrieve: stripeMethod28({
    method: "GET",
    fullPath: "/v1/treasury/inbound_transfers/{id}",
  }),
  list: stripeMethod28({
    method: "GET",
    fullPath: "/v1/treasury/inbound_transfers",
    methodType: "list",
  }),
  cancel: stripeMethod28({
    method: "POST",
    fullPath: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel",
  }),
});

// node_modules/stripe/esm/resources/Terminal/Locations.js
var stripeMethod29 = StripeResource.method;
var Locations = StripeResource.extend({
  create: stripeMethod29({
    method: "POST",
    fullPath: "/v1/terminal/locations",
  }),
  retrieve: stripeMethod29({
    method: "GET",
    fullPath: "/v1/terminal/locations/{location}",
  }),
  update: stripeMethod29({
    method: "POST",
    fullPath: "/v1/terminal/locations/{location}",
  }),
  list: stripeMethod29({
    method: "GET",
    fullPath: "/v1/terminal/locations",
    methodType: "list",
  }),
  del: stripeMethod29({
    method: "DELETE",
    fullPath: "/v1/terminal/locations/{location}",
  }),
});

// node_modules/stripe/esm/resources/Billing/MeterEventAdjustments.js
var stripeMethod30 = StripeResource.method;
var MeterEventAdjustments = StripeResource.extend({
  create: stripeMethod30({
    method: "POST",
    fullPath: "/v1/billing/meter_event_adjustments",
  }),
});

// node_modules/stripe/esm/resources/V2/Billing/MeterEventAdjustments.js
var stripeMethod31 = StripeResource.method;
var MeterEventAdjustments2 = StripeResource.extend({
  create: stripeMethod31({
    method: "POST",
    fullPath: "/v2/billing/meter_event_adjustments",
  }),
});

// node_modules/stripe/esm/resources/V2/Billing/MeterEventSession.js
var stripeMethod32 = StripeResource.method;
var MeterEventSession = StripeResource.extend({
  create: stripeMethod32({
    method: "POST",
    fullPath: "/v2/billing/meter_event_session",
  }),
});

// node_modules/stripe/esm/resources/V2/Billing/MeterEventStream.js
var stripeMethod33 = StripeResource.method;
var MeterEventStream = StripeResource.extend({
  create: stripeMethod33({
    method: "POST",
    fullPath: "/v2/billing/meter_event_stream",
    host: "meter-events.stripe.com",
  }),
});

// node_modules/stripe/esm/resources/Billing/MeterEvents.js
var stripeMethod34 = StripeResource.method;
var MeterEvents = StripeResource.extend({
  create: stripeMethod34({
    method: "POST",
    fullPath: "/v1/billing/meter_events",
  }),
});

// node_modules/stripe/esm/resources/V2/Billing/MeterEvents.js
var stripeMethod35 = StripeResource.method;
var MeterEvents2 = StripeResource.extend({
  create: stripeMethod35({
    method: "POST",
    fullPath: "/v2/billing/meter_events",
  }),
});

// node_modules/stripe/esm/resources/Billing/Meters.js
var stripeMethod36 = StripeResource.method;
var Meters = StripeResource.extend({
  create: stripeMethod36({ method: "POST", fullPath: "/v1/billing/meters" }),
  retrieve: stripeMethod36({
    method: "GET",
    fullPath: "/v1/billing/meters/{id}",
  }),
  update: stripeMethod36({
    method: "POST",
    fullPath: "/v1/billing/meters/{id}",
  }),
  list: stripeMethod36({
    method: "GET",
    fullPath: "/v1/billing/meters",
    methodType: "list",
  }),
  deactivate: stripeMethod36({
    method: "POST",
    fullPath: "/v1/billing/meters/{id}/deactivate",
  }),
  listEventSummaries: stripeMethod36({
    method: "GET",
    fullPath: "/v1/billing/meters/{id}/event_summaries",
    methodType: "list",
  }),
  reactivate: stripeMethod36({
    method: "POST",
    fullPath: "/v1/billing/meters/{id}/reactivate",
  }),
});

// node_modules/stripe/esm/resources/Climate/Orders.js
var stripeMethod37 = StripeResource.method;
var Orders = StripeResource.extend({
  create: stripeMethod37({ method: "POST", fullPath: "/v1/climate/orders" }),
  retrieve: stripeMethod37({
    method: "GET",
    fullPath: "/v1/climate/orders/{order}",
  }),
  update: stripeMethod37({
    method: "POST",
    fullPath: "/v1/climate/orders/{order}",
  }),
  list: stripeMethod37({
    method: "GET",
    fullPath: "/v1/climate/orders",
    methodType: "list",
  }),
  cancel: stripeMethod37({
    method: "POST",
    fullPath: "/v1/climate/orders/{order}/cancel",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js
var stripeMethod38 = StripeResource.method;
var OutboundPayments = StripeResource.extend({
  update: stripeMethod38({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}",
  }),
  fail: stripeMethod38({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/fail",
  }),
  post: stripeMethod38({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/post",
  }),
  returnOutboundPayment: stripeMethod38({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/return",
  }),
});

// node_modules/stripe/esm/resources/Treasury/OutboundPayments.js
var stripeMethod39 = StripeResource.method;
var OutboundPayments2 = StripeResource.extend({
  create: stripeMethod39({
    method: "POST",
    fullPath: "/v1/treasury/outbound_payments",
  }),
  retrieve: stripeMethod39({
    method: "GET",
    fullPath: "/v1/treasury/outbound_payments/{id}",
  }),
  list: stripeMethod39({
    method: "GET",
    fullPath: "/v1/treasury/outbound_payments",
    methodType: "list",
  }),
  cancel: stripeMethod39({
    method: "POST",
    fullPath: "/v1/treasury/outbound_payments/{id}/cancel",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js
var stripeMethod40 = StripeResource.method;
var OutboundTransfers = StripeResource.extend({
  update: stripeMethod40({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}",
  }),
  fail: stripeMethod40({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail",
  }),
  post: stripeMethod40({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post",
  }),
  returnOutboundTransfer: stripeMethod40({
    method: "POST",
    fullPath:
      "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return",
  }),
});

// node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js
var stripeMethod41 = StripeResource.method;
var OutboundTransfers2 = StripeResource.extend({
  create: stripeMethod41({
    method: "POST",
    fullPath: "/v1/treasury/outbound_transfers",
  }),
  retrieve: stripeMethod41({
    method: "GET",
    fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}",
  }),
  list: stripeMethod41({
    method: "GET",
    fullPath: "/v1/treasury/outbound_transfers",
    methodType: "list",
  }),
  cancel: stripeMethod41({
    method: "POST",
    fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Issuing/PersonalizationDesigns.js
var stripeMethod42 = StripeResource.method;
var PersonalizationDesigns = StripeResource.extend({
  activate: stripeMethod42({
    method: "POST",
    fullPath:
      "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate",
  }),
  deactivate: stripeMethod42({
    method: "POST",
    fullPath:
      "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate",
  }),
  reject: stripeMethod42({
    method: "POST",
    fullPath:
      "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject",
  }),
});

// node_modules/stripe/esm/resources/Issuing/PersonalizationDesigns.js
var stripeMethod43 = StripeResource.method;
var PersonalizationDesigns2 = StripeResource.extend({
  create: stripeMethod43({
    method: "POST",
    fullPath: "/v1/issuing/personalization_designs",
  }),
  retrieve: stripeMethod43({
    method: "GET",
    fullPath: "/v1/issuing/personalization_designs/{personalization_design}",
  }),
  update: stripeMethod43({
    method: "POST",
    fullPath: "/v1/issuing/personalization_designs/{personalization_design}",
  }),
  list: stripeMethod43({
    method: "GET",
    fullPath: "/v1/issuing/personalization_designs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/PhysicalBundles.js
var stripeMethod44 = StripeResource.method;
var PhysicalBundles = StripeResource.extend({
  retrieve: stripeMethod44({
    method: "GET",
    fullPath: "/v1/issuing/physical_bundles/{physical_bundle}",
  }),
  list: stripeMethod44({
    method: "GET",
    fullPath: "/v1/issuing/physical_bundles",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Climate/Products.js
var stripeMethod45 = StripeResource.method;
var Products = StripeResource.extend({
  retrieve: stripeMethod45({
    method: "GET",
    fullPath: "/v1/climate/products/{product}",
  }),
  list: stripeMethod45({
    method: "GET",
    fullPath: "/v1/climate/products",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js
var stripeMethod46 = StripeResource.method;
var Readers = StripeResource.extend({
  presentPaymentMethod: stripeMethod46({
    method: "POST",
    fullPath:
      "/v1/test_helpers/terminal/readers/{reader}/present_payment_method",
  }),
});

// node_modules/stripe/esm/resources/Terminal/Readers.js
var stripeMethod47 = StripeResource.method;
var Readers2 = StripeResource.extend({
  create: stripeMethod47({ method: "POST", fullPath: "/v1/terminal/readers" }),
  retrieve: stripeMethod47({
    method: "GET",
    fullPath: "/v1/terminal/readers/{reader}",
  }),
  update: stripeMethod47({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}",
  }),
  list: stripeMethod47({
    method: "GET",
    fullPath: "/v1/terminal/readers",
    methodType: "list",
  }),
  del: stripeMethod47({
    method: "DELETE",
    fullPath: "/v1/terminal/readers/{reader}",
  }),
  cancelAction: stripeMethod47({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/cancel_action",
  }),
  processPaymentIntent: stripeMethod47({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/process_payment_intent",
  }),
  processSetupIntent: stripeMethod47({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/process_setup_intent",
  }),
  refundPayment: stripeMethod47({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/refund_payment",
  }),
  setReaderDisplay: stripeMethod47({
    method: "POST",
    fullPath: "/v1/terminal/readers/{reader}/set_reader_display",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js
var stripeMethod48 = StripeResource.method;
var ReceivedCredits = StripeResource.extend({
  create: stripeMethod48({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/received_credits",
  }),
});

// node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js
var stripeMethod49 = StripeResource.method;
var ReceivedCredits2 = StripeResource.extend({
  retrieve: stripeMethod49({
    method: "GET",
    fullPath: "/v1/treasury/received_credits/{id}",
  }),
  list: stripeMethod49({
    method: "GET",
    fullPath: "/v1/treasury/received_credits",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js
var stripeMethod50 = StripeResource.method;
var ReceivedDebits = StripeResource.extend({
  create: stripeMethod50({
    method: "POST",
    fullPath: "/v1/test_helpers/treasury/received_debits",
  }),
});

// node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js
var stripeMethod51 = StripeResource.method;
var ReceivedDebits2 = StripeResource.extend({
  retrieve: stripeMethod51({
    method: "GET",
    fullPath: "/v1/treasury/received_debits/{id}",
  }),
  list: stripeMethod51({
    method: "GET",
    fullPath: "/v1/treasury/received_debits",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Refunds.js
var stripeMethod52 = StripeResource.method;
var Refunds = StripeResource.extend({
  expire: stripeMethod52({
    method: "POST",
    fullPath: "/v1/test_helpers/refunds/{refund}/expire",
  }),
});

// node_modules/stripe/esm/resources/Tax/Registrations.js
var stripeMethod53 = StripeResource.method;
var Registrations = StripeResource.extend({
  create: stripeMethod53({ method: "POST", fullPath: "/v1/tax/registrations" }),
  retrieve: stripeMethod53({
    method: "GET",
    fullPath: "/v1/tax/registrations/{id}",
  }),
  update: stripeMethod53({
    method: "POST",
    fullPath: "/v1/tax/registrations/{id}",
  }),
  list: stripeMethod53({
    method: "GET",
    fullPath: "/v1/tax/registrations",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Reporting/ReportRuns.js
var stripeMethod54 = StripeResource.method;
var ReportRuns = StripeResource.extend({
  create: stripeMethod54({
    method: "POST",
    fullPath: "/v1/reporting/report_runs",
  }),
  retrieve: stripeMethod54({
    method: "GET",
    fullPath: "/v1/reporting/report_runs/{report_run}",
  }),
  list: stripeMethod54({
    method: "GET",
    fullPath: "/v1/reporting/report_runs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Reporting/ReportTypes.js
var stripeMethod55 = StripeResource.method;
var ReportTypes = StripeResource.extend({
  retrieve: stripeMethod55({
    method: "GET",
    fullPath: "/v1/reporting/report_types/{report_type}",
  }),
  list: stripeMethod55({
    method: "GET",
    fullPath: "/v1/reporting/report_types",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Forwarding/Requests.js
var stripeMethod56 = StripeResource.method;
var Requests = StripeResource.extend({
  create: stripeMethod56({
    method: "POST",
    fullPath: "/v1/forwarding/requests",
  }),
  retrieve: stripeMethod56({
    method: "GET",
    fullPath: "/v1/forwarding/requests/{id}",
  }),
  list: stripeMethod56({
    method: "GET",
    fullPath: "/v1/forwarding/requests",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js
var stripeMethod57 = StripeResource.method;
var ScheduledQueryRuns = StripeResource.extend({
  retrieve: stripeMethod57({
    method: "GET",
    fullPath: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}",
  }),
  list: stripeMethod57({
    method: "GET",
    fullPath: "/v1/sigma/scheduled_query_runs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Apps/Secrets.js
var stripeMethod58 = StripeResource.method;
var Secrets = StripeResource.extend({
  create: stripeMethod58({ method: "POST", fullPath: "/v1/apps/secrets" }),
  list: stripeMethod58({
    method: "GET",
    fullPath: "/v1/apps/secrets",
    methodType: "list",
  }),
  deleteWhere: stripeMethod58({
    method: "POST",
    fullPath: "/v1/apps/secrets/delete",
  }),
  find: stripeMethod58({ method: "GET", fullPath: "/v1/apps/secrets/find" }),
});

// node_modules/stripe/esm/resources/BillingPortal/Sessions.js
var stripeMethod59 = StripeResource.method;
var Sessions = StripeResource.extend({
  create: stripeMethod59({
    method: "POST",
    fullPath: "/v1/billing_portal/sessions",
  }),
});

// node_modules/stripe/esm/resources/Checkout/Sessions.js
var stripeMethod60 = StripeResource.method;
var Sessions2 = StripeResource.extend({
  create: stripeMethod60({ method: "POST", fullPath: "/v1/checkout/sessions" }),
  retrieve: stripeMethod60({
    method: "GET",
    fullPath: "/v1/checkout/sessions/{session}",
  }),
  update: stripeMethod60({
    method: "POST",
    fullPath: "/v1/checkout/sessions/{session}",
  }),
  list: stripeMethod60({
    method: "GET",
    fullPath: "/v1/checkout/sessions",
    methodType: "list",
  }),
  expire: stripeMethod60({
    method: "POST",
    fullPath: "/v1/checkout/sessions/{session}/expire",
  }),
  listLineItems: stripeMethod60({
    method: "GET",
    fullPath: "/v1/checkout/sessions/{session}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/FinancialConnections/Sessions.js
var stripeMethod61 = StripeResource.method;
var Sessions3 = StripeResource.extend({
  create: stripeMethod61({
    method: "POST",
    fullPath: "/v1/financial_connections/sessions",
  }),
  retrieve: stripeMethod61({
    method: "GET",
    fullPath: "/v1/financial_connections/sessions/{session}",
  }),
});

// node_modules/stripe/esm/resources/Tax/Settings.js
var stripeMethod62 = StripeResource.method;
var Settings = StripeResource.extend({
  retrieve: stripeMethod62({ method: "GET", fullPath: "/v1/tax/settings" }),
  update: stripeMethod62({ method: "POST", fullPath: "/v1/tax/settings" }),
});

// node_modules/stripe/esm/resources/Climate/Suppliers.js
var stripeMethod63 = StripeResource.method;
var Suppliers = StripeResource.extend({
  retrieve: stripeMethod63({
    method: "GET",
    fullPath: "/v1/climate/suppliers/{supplier}",
  }),
  list: stripeMethod63({
    method: "GET",
    fullPath: "/v1/climate/suppliers",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/TestClocks.js
var stripeMethod64 = StripeResource.method;
var TestClocks = StripeResource.extend({
  create: stripeMethod64({
    method: "POST",
    fullPath: "/v1/test_helpers/test_clocks",
  }),
  retrieve: stripeMethod64({
    method: "GET",
    fullPath: "/v1/test_helpers/test_clocks/{test_clock}",
  }),
  list: stripeMethod64({
    method: "GET",
    fullPath: "/v1/test_helpers/test_clocks",
    methodType: "list",
  }),
  del: stripeMethod64({
    method: "DELETE",
    fullPath: "/v1/test_helpers/test_clocks/{test_clock}",
  }),
  advance: stripeMethod64({
    method: "POST",
    fullPath: "/v1/test_helpers/test_clocks/{test_clock}/advance",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Tokens.js
var stripeMethod65 = StripeResource.method;
var Tokens = StripeResource.extend({
  retrieve: stripeMethod65({
    method: "GET",
    fullPath: "/v1/issuing/tokens/{token}",
  }),
  update: stripeMethod65({
    method: "POST",
    fullPath: "/v1/issuing/tokens/{token}",
  }),
  list: stripeMethod65({
    method: "GET",
    fullPath: "/v1/issuing/tokens",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Treasury/TransactionEntries.js
var stripeMethod66 = StripeResource.method;
var TransactionEntries = StripeResource.extend({
  retrieve: stripeMethod66({
    method: "GET",
    fullPath: "/v1/treasury/transaction_entries/{id}",
  }),
  list: stripeMethod66({
    method: "GET",
    fullPath: "/v1/treasury/transaction_entries",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TestHelpers/Issuing/Transactions.js
var stripeMethod67 = StripeResource.method;
var Transactions = StripeResource.extend({
  createForceCapture: stripeMethod67({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/transactions/create_force_capture",
  }),
  createUnlinkedRefund: stripeMethod67({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/transactions/create_unlinked_refund",
  }),
  refund: stripeMethod67({
    method: "POST",
    fullPath: "/v1/test_helpers/issuing/transactions/{transaction}/refund",
  }),
});

// node_modules/stripe/esm/resources/FinancialConnections/Transactions.js
var stripeMethod68 = StripeResource.method;
var Transactions2 = StripeResource.extend({
  retrieve: stripeMethod68({
    method: "GET",
    fullPath: "/v1/financial_connections/transactions/{transaction}",
  }),
  list: stripeMethod68({
    method: "GET",
    fullPath: "/v1/financial_connections/transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Issuing/Transactions.js
var stripeMethod69 = StripeResource.method;
var Transactions3 = StripeResource.extend({
  retrieve: stripeMethod69({
    method: "GET",
    fullPath: "/v1/issuing/transactions/{transaction}",
  }),
  update: stripeMethod69({
    method: "POST",
    fullPath: "/v1/issuing/transactions/{transaction}",
  }),
  list: stripeMethod69({
    method: "GET",
    fullPath: "/v1/issuing/transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Tax/Transactions.js
var stripeMethod70 = StripeResource.method;
var Transactions4 = StripeResource.extend({
  retrieve: stripeMethod70({
    method: "GET",
    fullPath: "/v1/tax/transactions/{transaction}",
  }),
  createFromCalculation: stripeMethod70({
    method: "POST",
    fullPath: "/v1/tax/transactions/create_from_calculation",
  }),
  createReversal: stripeMethod70({
    method: "POST",
    fullPath: "/v1/tax/transactions/create_reversal",
  }),
  listLineItems: stripeMethod70({
    method: "GET",
    fullPath: "/v1/tax/transactions/{transaction}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Treasury/Transactions.js
var stripeMethod71 = StripeResource.method;
var Transactions5 = StripeResource.extend({
  retrieve: stripeMethod71({
    method: "GET",
    fullPath: "/v1/treasury/transactions/{id}",
  }),
  list: stripeMethod71({
    method: "GET",
    fullPath: "/v1/treasury/transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Radar/ValueListItems.js
var stripeMethod72 = StripeResource.method;
var ValueListItems = StripeResource.extend({
  create: stripeMethod72({
    method: "POST",
    fullPath: "/v1/radar/value_list_items",
  }),
  retrieve: stripeMethod72({
    method: "GET",
    fullPath: "/v1/radar/value_list_items/{item}",
  }),
  list: stripeMethod72({
    method: "GET",
    fullPath: "/v1/radar/value_list_items",
    methodType: "list",
  }),
  del: stripeMethod72({
    method: "DELETE",
    fullPath: "/v1/radar/value_list_items/{item}",
  }),
});

// node_modules/stripe/esm/resources/Radar/ValueLists.js
var stripeMethod73 = StripeResource.method;
var ValueLists = StripeResource.extend({
  create: stripeMethod73({ method: "POST", fullPath: "/v1/radar/value_lists" }),
  retrieve: stripeMethod73({
    method: "GET",
    fullPath: "/v1/radar/value_lists/{value_list}",
  }),
  update: stripeMethod73({
    method: "POST",
    fullPath: "/v1/radar/value_lists/{value_list}",
  }),
  list: stripeMethod73({
    method: "GET",
    fullPath: "/v1/radar/value_lists",
    methodType: "list",
  }),
  del: stripeMethod73({
    method: "DELETE",
    fullPath: "/v1/radar/value_lists/{value_list}",
  }),
});

// node_modules/stripe/esm/resources/Identity/VerificationReports.js
var stripeMethod74 = StripeResource.method;
var VerificationReports = StripeResource.extend({
  retrieve: stripeMethod74({
    method: "GET",
    fullPath: "/v1/identity/verification_reports/{report}",
  }),
  list: stripeMethod74({
    method: "GET",
    fullPath: "/v1/identity/verification_reports",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Identity/VerificationSessions.js
var stripeMethod75 = StripeResource.method;
var VerificationSessions = StripeResource.extend({
  create: stripeMethod75({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions",
  }),
  retrieve: stripeMethod75({
    method: "GET",
    fullPath: "/v1/identity/verification_sessions/{session}",
  }),
  update: stripeMethod75({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions/{session}",
  }),
  list: stripeMethod75({
    method: "GET",
    fullPath: "/v1/identity/verification_sessions",
    methodType: "list",
  }),
  cancel: stripeMethod75({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions/{session}/cancel",
  }),
  redact: stripeMethod75({
    method: "POST",
    fullPath: "/v1/identity/verification_sessions/{session}/redact",
  }),
});

// node_modules/stripe/esm/resources/Accounts.js
var stripeMethod76 = StripeResource.method;
var Accounts2 = StripeResource.extend({
  create: stripeMethod76({ method: "POST", fullPath: "/v1/accounts" }),
  retrieve(id, ...args) {
    if (typeof id === "string") {
      return stripeMethod76({
        method: "GET",
        fullPath: "/v1/accounts/{id}",
      }).apply(this, [id, ...args]);
    } else {
      if (id === null || id === void 0) {
        [].shift.apply([id, ...args]);
      }
      return stripeMethod76({
        method: "GET",
        fullPath: "/v1/account",
      }).apply(this, [id, ...args]);
    }
  },
  update: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}",
  }),
  list: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts",
    methodType: "list",
  }),
  del: stripeMethod76({ method: "DELETE", fullPath: "/v1/accounts/{account}" }),
  createExternalAccount: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/external_accounts",
  }),
  createLoginLink: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/login_links",
  }),
  createPerson: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/persons",
  }),
  deleteExternalAccount: stripeMethod76({
    method: "DELETE",
    fullPath: "/v1/accounts/{account}/external_accounts/{id}",
  }),
  deletePerson: stripeMethod76({
    method: "DELETE",
    fullPath: "/v1/accounts/{account}/persons/{person}",
  }),
  listCapabilities: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts/{account}/capabilities",
    methodType: "list",
  }),
  listExternalAccounts: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts/{account}/external_accounts",
    methodType: "list",
  }),
  listPersons: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts/{account}/persons",
    methodType: "list",
  }),
  reject: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/reject",
  }),
  retrieveCurrent: stripeMethod76({ method: "GET", fullPath: "/v1/account" }),
  retrieveCapability: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts/{account}/capabilities/{capability}",
  }),
  retrieveExternalAccount: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts/{account}/external_accounts/{id}",
  }),
  retrievePerson: stripeMethod76({
    method: "GET",
    fullPath: "/v1/accounts/{account}/persons/{person}",
  }),
  updateCapability: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/capabilities/{capability}",
  }),
  updateExternalAccount: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/external_accounts/{id}",
  }),
  updatePerson: stripeMethod76({
    method: "POST",
    fullPath: "/v1/accounts/{account}/persons/{person}",
  }),
});

// node_modules/stripe/esm/resources/AccountLinks.js
var stripeMethod77 = StripeResource.method;
var AccountLinks = StripeResource.extend({
  create: stripeMethod77({ method: "POST", fullPath: "/v1/account_links" }),
});

// node_modules/stripe/esm/resources/AccountSessions.js
var stripeMethod78 = StripeResource.method;
var AccountSessions = StripeResource.extend({
  create: stripeMethod78({ method: "POST", fullPath: "/v1/account_sessions" }),
});

// node_modules/stripe/esm/resources/ApplePayDomains.js
var stripeMethod79 = StripeResource.method;
var ApplePayDomains = StripeResource.extend({
  create: stripeMethod79({ method: "POST", fullPath: "/v1/apple_pay/domains" }),
  retrieve: stripeMethod79({
    method: "GET",
    fullPath: "/v1/apple_pay/domains/{domain}",
  }),
  list: stripeMethod79({
    method: "GET",
    fullPath: "/v1/apple_pay/domains",
    methodType: "list",
  }),
  del: stripeMethod79({
    method: "DELETE",
    fullPath: "/v1/apple_pay/domains/{domain}",
  }),
});

// node_modules/stripe/esm/resources/ApplicationFees.js
var stripeMethod80 = StripeResource.method;
var ApplicationFees = StripeResource.extend({
  retrieve: stripeMethod80({
    method: "GET",
    fullPath: "/v1/application_fees/{id}",
  }),
  list: stripeMethod80({
    method: "GET",
    fullPath: "/v1/application_fees",
    methodType: "list",
  }),
  createRefund: stripeMethod80({
    method: "POST",
    fullPath: "/v1/application_fees/{id}/refunds",
  }),
  listRefunds: stripeMethod80({
    method: "GET",
    fullPath: "/v1/application_fees/{id}/refunds",
    methodType: "list",
  }),
  retrieveRefund: stripeMethod80({
    method: "GET",
    fullPath: "/v1/application_fees/{fee}/refunds/{id}",
  }),
  updateRefund: stripeMethod80({
    method: "POST",
    fullPath: "/v1/application_fees/{fee}/refunds/{id}",
  }),
});

// node_modules/stripe/esm/resources/Balance.js
var stripeMethod81 = StripeResource.method;
var Balance = StripeResource.extend({
  retrieve: stripeMethod81({ method: "GET", fullPath: "/v1/balance" }),
});

// node_modules/stripe/esm/resources/BalanceTransactions.js
var stripeMethod82 = StripeResource.method;
var BalanceTransactions = StripeResource.extend({
  retrieve: stripeMethod82({
    method: "GET",
    fullPath: "/v1/balance_transactions/{id}",
  }),
  list: stripeMethod82({
    method: "GET",
    fullPath: "/v1/balance_transactions",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Charges.js
var stripeMethod83 = StripeResource.method;
var Charges = StripeResource.extend({
  create: stripeMethod83({ method: "POST", fullPath: "/v1/charges" }),
  retrieve: stripeMethod83({ method: "GET", fullPath: "/v1/charges/{charge}" }),
  update: stripeMethod83({ method: "POST", fullPath: "/v1/charges/{charge}" }),
  list: stripeMethod83({
    method: "GET",
    fullPath: "/v1/charges",
    methodType: "list",
  }),
  capture: stripeMethod83({
    method: "POST",
    fullPath: "/v1/charges/{charge}/capture",
  }),
  search: stripeMethod83({
    method: "GET",
    fullPath: "/v1/charges/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/ConfirmationTokens.js
var stripeMethod84 = StripeResource.method;
var ConfirmationTokens2 = StripeResource.extend({
  retrieve: stripeMethod84({
    method: "GET",
    fullPath: "/v1/confirmation_tokens/{confirmation_token}",
  }),
});

// node_modules/stripe/esm/resources/CountrySpecs.js
var stripeMethod85 = StripeResource.method;
var CountrySpecs = StripeResource.extend({
  retrieve: stripeMethod85({
    method: "GET",
    fullPath: "/v1/country_specs/{country}",
  }),
  list: stripeMethod85({
    method: "GET",
    fullPath: "/v1/country_specs",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Coupons.js
var stripeMethod86 = StripeResource.method;
var Coupons = StripeResource.extend({
  create: stripeMethod86({ method: "POST", fullPath: "/v1/coupons" }),
  retrieve: stripeMethod86({ method: "GET", fullPath: "/v1/coupons/{coupon}" }),
  update: stripeMethod86({ method: "POST", fullPath: "/v1/coupons/{coupon}" }),
  list: stripeMethod86({
    method: "GET",
    fullPath: "/v1/coupons",
    methodType: "list",
  }),
  del: stripeMethod86({ method: "DELETE", fullPath: "/v1/coupons/{coupon}" }),
});

// node_modules/stripe/esm/resources/CreditNotes.js
var stripeMethod87 = StripeResource.method;
var CreditNotes = StripeResource.extend({
  create: stripeMethod87({ method: "POST", fullPath: "/v1/credit_notes" }),
  retrieve: stripeMethod87({
    method: "GET",
    fullPath: "/v1/credit_notes/{id}",
  }),
  update: stripeMethod87({ method: "POST", fullPath: "/v1/credit_notes/{id}" }),
  list: stripeMethod87({
    method: "GET",
    fullPath: "/v1/credit_notes",
    methodType: "list",
  }),
  listLineItems: stripeMethod87({
    method: "GET",
    fullPath: "/v1/credit_notes/{credit_note}/lines",
    methodType: "list",
  }),
  listPreviewLineItems: stripeMethod87({
    method: "GET",
    fullPath: "/v1/credit_notes/preview/lines",
    methodType: "list",
  }),
  preview: stripeMethod87({
    method: "GET",
    fullPath: "/v1/credit_notes/preview",
  }),
  voidCreditNote: stripeMethod87({
    method: "POST",
    fullPath: "/v1/credit_notes/{id}/void",
  }),
});

// node_modules/stripe/esm/resources/CustomerSessions.js
var stripeMethod88 = StripeResource.method;
var CustomerSessions = StripeResource.extend({
  create: stripeMethod88({ method: "POST", fullPath: "/v1/customer_sessions" }),
});

// node_modules/stripe/esm/resources/Customers.js
var stripeMethod89 = StripeResource.method;
var Customers2 = StripeResource.extend({
  create: stripeMethod89({ method: "POST", fullPath: "/v1/customers" }),
  retrieve: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}",
  }),
  update: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}",
  }),
  list: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers",
    methodType: "list",
  }),
  del: stripeMethod89({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}",
  }),
  createBalanceTransaction: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/balance_transactions",
  }),
  createFundingInstructions: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/funding_instructions",
  }),
  createSource: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/sources",
  }),
  createTaxId: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/tax_ids",
  }),
  deleteDiscount: stripeMethod89({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}/discount",
  }),
  deleteSource: stripeMethod89({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}/sources/{id}",
  }),
  deleteTaxId: stripeMethod89({
    method: "DELETE",
    fullPath: "/v1/customers/{customer}/tax_ids/{id}",
  }),
  listBalanceTransactions: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/balance_transactions",
    methodType: "list",
  }),
  listCashBalanceTransactions: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/cash_balance_transactions",
    methodType: "list",
  }),
  listPaymentMethods: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/payment_methods",
    methodType: "list",
  }),
  listSources: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/sources",
    methodType: "list",
  }),
  listTaxIds: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/tax_ids",
    methodType: "list",
  }),
  retrieveBalanceTransaction: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}",
  }),
  retrieveCashBalance: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/cash_balance",
  }),
  retrieveCashBalanceTransaction: stripeMethod89({
    method: "GET",
    fullPath:
      "/v1/customers/{customer}/cash_balance_transactions/{transaction}",
  }),
  retrievePaymentMethod: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/payment_methods/{payment_method}",
  }),
  retrieveSource: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/sources/{id}",
  }),
  retrieveTaxId: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/{customer}/tax_ids/{id}",
  }),
  search: stripeMethod89({
    method: "GET",
    fullPath: "/v1/customers/search",
    methodType: "search",
  }),
  updateBalanceTransaction: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}",
  }),
  updateCashBalance: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/cash_balance",
  }),
  updateSource: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/sources/{id}",
  }),
  verifySource: stripeMethod89({
    method: "POST",
    fullPath: "/v1/customers/{customer}/sources/{id}/verify",
  }),
});

// node_modules/stripe/esm/resources/Disputes.js
var stripeMethod90 = StripeResource.method;
var Disputes2 = StripeResource.extend({
  retrieve: stripeMethod90({
    method: "GET",
    fullPath: "/v1/disputes/{dispute}",
  }),
  update: stripeMethod90({
    method: "POST",
    fullPath: "/v1/disputes/{dispute}",
  }),
  list: stripeMethod90({
    method: "GET",
    fullPath: "/v1/disputes",
    methodType: "list",
  }),
  close: stripeMethod90({
    method: "POST",
    fullPath: "/v1/disputes/{dispute}/close",
  }),
});

// node_modules/stripe/esm/resources/EphemeralKeys.js
var stripeMethod91 = StripeResource.method;
var EphemeralKeys = StripeResource.extend({
  create: stripeMethod91({
    method: "POST",
    fullPath: "/v1/ephemeral_keys",
    validator: (data, options) => {
      if (!options.headers || !options.headers["Stripe-Version"]) {
        throw new Error(
          "Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node"
        );
      }
    },
  }),
  del: stripeMethod91({
    method: "DELETE",
    fullPath: "/v1/ephemeral_keys/{key}",
  }),
});

// node_modules/stripe/esm/resources/Events.js
var stripeMethod92 = StripeResource.method;
var Events2 = StripeResource.extend({
  retrieve: stripeMethod92({ method: "GET", fullPath: "/v1/events/{id}" }),
  list: stripeMethod92({
    method: "GET",
    fullPath: "/v1/events",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/ExchangeRates.js
var stripeMethod93 = StripeResource.method;
var ExchangeRates = StripeResource.extend({
  retrieve: stripeMethod93({
    method: "GET",
    fullPath: "/v1/exchange_rates/{rate_id}",
  }),
  list: stripeMethod93({
    method: "GET",
    fullPath: "/v1/exchange_rates",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/FileLinks.js
var stripeMethod94 = StripeResource.method;
var FileLinks = StripeResource.extend({
  create: stripeMethod94({ method: "POST", fullPath: "/v1/file_links" }),
  retrieve: stripeMethod94({
    method: "GET",
    fullPath: "/v1/file_links/{link}",
  }),
  update: stripeMethod94({ method: "POST", fullPath: "/v1/file_links/{link}" }),
  list: stripeMethod94({
    method: "GET",
    fullPath: "/v1/file_links",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/multipart.js
var multipartDataGenerator = (method, data, headers) => {
  const segno = (
    Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)
  ).toString();
  headers["Content-Type"] = `multipart/form-data; boundary=${segno}`;
  const textEncoder = new TextEncoder();
  let buffer = new Uint8Array(0);
  const endBuffer = textEncoder.encode("\r\n");
  function push(l) {
    const prevBuffer = buffer;
    const newBuffer =
      l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
    buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
    buffer.set(prevBuffer);
    buffer.set(newBuffer, prevBuffer.length);
    buffer.set(endBuffer, buffer.length - 2);
  }
  function q(s) {
    return `"${s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
  }
  const flattenedData = flattenAndStringify(data);
  for (const k in flattenedData) {
    if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) {
      continue;
    }
    const v = flattenedData[k];
    push(`--${segno}`);
    if (Object.prototype.hasOwnProperty.call(v, "data")) {
      const typedEntry = v;
      push(
        `Content-Disposition: form-data; name=${q(k)}; filename=${q(
          typedEntry.name || "blob"
        )}`
      );
      push(`Content-Type: ${typedEntry.type || "application/octet-stream"}`);
      push("");
      push(typedEntry.data);
    } else {
      push(`Content-Disposition: form-data; name=${q(k)}`);
      push("");
      push(v);
    }
  }
  push(`--${segno}--`);
  return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
  data = data || {};
  if (method !== "POST") {
    return callback(null, queryStringifyRequestData(data));
  }
  this._stripe._platformFunctions
    .tryBufferData(data)
    .then((bufferedData) => {
      const buffer = multipartDataGenerator(method, bufferedData, headers);
      return callback(null, buffer);
    })
    .catch((err) => callback(err, null));
}

// node_modules/stripe/esm/resources/Files.js
var stripeMethod95 = StripeResource.method;
var Files = StripeResource.extend({
  create: stripeMethod95({
    method: "POST",
    fullPath: "/v1/files",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    host: "files.stripe.com",
  }),
  retrieve: stripeMethod95({ method: "GET", fullPath: "/v1/files/{file}" }),
  list: stripeMethod95({
    method: "GET",
    fullPath: "/v1/files",
    methodType: "list",
  }),
  requestDataProcessor: multipartRequestDataProcessor,
});

// node_modules/stripe/esm/resources/InvoiceItems.js
var stripeMethod96 = StripeResource.method;
var InvoiceItems = StripeResource.extend({
  create: stripeMethod96({ method: "POST", fullPath: "/v1/invoiceitems" }),
  retrieve: stripeMethod96({
    method: "GET",
    fullPath: "/v1/invoiceitems/{invoiceitem}",
  }),
  update: stripeMethod96({
    method: "POST",
    fullPath: "/v1/invoiceitems/{invoiceitem}",
  }),
  list: stripeMethod96({
    method: "GET",
    fullPath: "/v1/invoiceitems",
    methodType: "list",
  }),
  del: stripeMethod96({
    method: "DELETE",
    fullPath: "/v1/invoiceitems/{invoiceitem}",
  }),
});

// node_modules/stripe/esm/resources/InvoicePayments.js
var stripeMethod97 = StripeResource.method;
var InvoicePayments = StripeResource.extend({
  retrieve: stripeMethod97({
    method: "GET",
    fullPath: "/v1/invoice_payments/{invoice_payment}",
  }),
  list: stripeMethod97({
    method: "GET",
    fullPath: "/v1/invoice_payments",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/InvoiceRenderingTemplates.js
var stripeMethod98 = StripeResource.method;
var InvoiceRenderingTemplates = StripeResource.extend({
  retrieve: stripeMethod98({
    method: "GET",
    fullPath: "/v1/invoice_rendering_templates/{template}",
  }),
  list: stripeMethod98({
    method: "GET",
    fullPath: "/v1/invoice_rendering_templates",
    methodType: "list",
  }),
  archive: stripeMethod98({
    method: "POST",
    fullPath: "/v1/invoice_rendering_templates/{template}/archive",
  }),
  unarchive: stripeMethod98({
    method: "POST",
    fullPath: "/v1/invoice_rendering_templates/{template}/unarchive",
  }),
});

// node_modules/stripe/esm/resources/Invoices.js
var stripeMethod99 = StripeResource.method;
var Invoices = StripeResource.extend({
  create: stripeMethod99({ method: "POST", fullPath: "/v1/invoices" }),
  retrieve: stripeMethod99({
    method: "GET",
    fullPath: "/v1/invoices/{invoice}",
  }),
  update: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}",
  }),
  list: stripeMethod99({
    method: "GET",
    fullPath: "/v1/invoices",
    methodType: "list",
  }),
  del: stripeMethod99({ method: "DELETE", fullPath: "/v1/invoices/{invoice}" }),
  addLines: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/add_lines",
  }),
  createPreview: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/create_preview",
  }),
  finalizeInvoice: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/finalize",
  }),
  listLineItems: stripeMethod99({
    method: "GET",
    fullPath: "/v1/invoices/{invoice}/lines",
    methodType: "list",
  }),
  markUncollectible: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/mark_uncollectible",
  }),
  pay: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/pay",
  }),
  removeLines: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/remove_lines",
  }),
  search: stripeMethod99({
    method: "GET",
    fullPath: "/v1/invoices/search",
    methodType: "search",
  }),
  sendInvoice: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/send",
  }),
  updateLines: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/update_lines",
  }),
  updateLineItem: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/lines/{line_item_id}",
  }),
  voidInvoice: stripeMethod99({
    method: "POST",
    fullPath: "/v1/invoices/{invoice}/void",
  }),
});

// node_modules/stripe/esm/resources/Mandates.js
var stripeMethod100 = StripeResource.method;
var Mandates = StripeResource.extend({
  retrieve: stripeMethod100({
    method: "GET",
    fullPath: "/v1/mandates/{mandate}",
  }),
});

// node_modules/stripe/esm/resources/OAuth.js
var stripeMethod101 = StripeResource.method;
var oAuthHost = "connect.stripe.com";
var OAuth = StripeResource.extend({
  basePath: "/",
  authorizeUrl(params, options) {
    params = params || {};
    options = options || {};
    let path = "oauth/authorize";
    if (options.express) {
      path = `express/${path}`;
    }
    if (!params.response_type) {
      params.response_type = "code";
    }
    if (!params.client_id) {
      params.client_id = this._stripe.getClientId();
    }
    if (!params.scope) {
      params.scope = "read_write";
    }
    return `https://${oAuthHost}/${path}?${queryStringifyRequestData(params)}`;
  },
  token: stripeMethod101({
    method: "POST",
    path: "oauth/token",
    host: oAuthHost,
  }),
  deauthorize(spec, ...args) {
    if (!spec.client_id) {
      spec.client_id = this._stripe.getClientId();
    }
    return stripeMethod101({
      method: "POST",
      path: "oauth/deauthorize",
      host: oAuthHost,
    }).apply(this, [spec, ...args]);
  },
});

// node_modules/stripe/esm/resources/PaymentIntents.js
var stripeMethod102 = StripeResource.method;
var PaymentIntents = StripeResource.extend({
  create: stripeMethod102({ method: "POST", fullPath: "/v1/payment_intents" }),
  retrieve: stripeMethod102({
    method: "GET",
    fullPath: "/v1/payment_intents/{intent}",
  }),
  update: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}",
  }),
  list: stripeMethod102({
    method: "GET",
    fullPath: "/v1/payment_intents",
    methodType: "list",
  }),
  applyCustomerBalance: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/apply_customer_balance",
  }),
  cancel: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/cancel",
  }),
  capture: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/capture",
  }),
  confirm: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/confirm",
  }),
  incrementAuthorization: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/increment_authorization",
  }),
  search: stripeMethod102({
    method: "GET",
    fullPath: "/v1/payment_intents/search",
    methodType: "search",
  }),
  verifyMicrodeposits: stripeMethod102({
    method: "POST",
    fullPath: "/v1/payment_intents/{intent}/verify_microdeposits",
  }),
});

// node_modules/stripe/esm/resources/PaymentLinks.js
var stripeMethod103 = StripeResource.method;
var PaymentLinks = StripeResource.extend({
  create: stripeMethod103({ method: "POST", fullPath: "/v1/payment_links" }),
  retrieve: stripeMethod103({
    method: "GET",
    fullPath: "/v1/payment_links/{payment_link}",
  }),
  update: stripeMethod103({
    method: "POST",
    fullPath: "/v1/payment_links/{payment_link}",
  }),
  list: stripeMethod103({
    method: "GET",
    fullPath: "/v1/payment_links",
    methodType: "list",
  }),
  listLineItems: stripeMethod103({
    method: "GET",
    fullPath: "/v1/payment_links/{payment_link}/line_items",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/PaymentMethodConfigurations.js
var stripeMethod104 = StripeResource.method;
var PaymentMethodConfigurations = StripeResource.extend({
  create: stripeMethod104({
    method: "POST",
    fullPath: "/v1/payment_method_configurations",
  }),
  retrieve: stripeMethod104({
    method: "GET",
    fullPath: "/v1/payment_method_configurations/{configuration}",
  }),
  update: stripeMethod104({
    method: "POST",
    fullPath: "/v1/payment_method_configurations/{configuration}",
  }),
  list: stripeMethod104({
    method: "GET",
    fullPath: "/v1/payment_method_configurations",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/PaymentMethodDomains.js
var stripeMethod105 = StripeResource.method;
var PaymentMethodDomains = StripeResource.extend({
  create: stripeMethod105({
    method: "POST",
    fullPath: "/v1/payment_method_domains",
  }),
  retrieve: stripeMethod105({
    method: "GET",
    fullPath: "/v1/payment_method_domains/{payment_method_domain}",
  }),
  update: stripeMethod105({
    method: "POST",
    fullPath: "/v1/payment_method_domains/{payment_method_domain}",
  }),
  list: stripeMethod105({
    method: "GET",
    fullPath: "/v1/payment_method_domains",
    methodType: "list",
  }),
  validate: stripeMethod105({
    method: "POST",
    fullPath: "/v1/payment_method_domains/{payment_method_domain}/validate",
  }),
});

// node_modules/stripe/esm/resources/PaymentMethods.js
var stripeMethod106 = StripeResource.method;
var PaymentMethods = StripeResource.extend({
  create: stripeMethod106({ method: "POST", fullPath: "/v1/payment_methods" }),
  retrieve: stripeMethod106({
    method: "GET",
    fullPath: "/v1/payment_methods/{payment_method}",
  }),
  update: stripeMethod106({
    method: "POST",
    fullPath: "/v1/payment_methods/{payment_method}",
  }),
  list: stripeMethod106({
    method: "GET",
    fullPath: "/v1/payment_methods",
    methodType: "list",
  }),
  attach: stripeMethod106({
    method: "POST",
    fullPath: "/v1/payment_methods/{payment_method}/attach",
  }),
  detach: stripeMethod106({
    method: "POST",
    fullPath: "/v1/payment_methods/{payment_method}/detach",
  }),
});

// node_modules/stripe/esm/resources/Payouts.js
var stripeMethod107 = StripeResource.method;
var Payouts = StripeResource.extend({
  create: stripeMethod107({ method: "POST", fullPath: "/v1/payouts" }),
  retrieve: stripeMethod107({
    method: "GET",
    fullPath: "/v1/payouts/{payout}",
  }),
  update: stripeMethod107({ method: "POST", fullPath: "/v1/payouts/{payout}" }),
  list: stripeMethod107({
    method: "GET",
    fullPath: "/v1/payouts",
    methodType: "list",
  }),
  cancel: stripeMethod107({
    method: "POST",
    fullPath: "/v1/payouts/{payout}/cancel",
  }),
  reverse: stripeMethod107({
    method: "POST",
    fullPath: "/v1/payouts/{payout}/reverse",
  }),
});

// node_modules/stripe/esm/resources/Plans.js
var stripeMethod108 = StripeResource.method;
var Plans = StripeResource.extend({
  create: stripeMethod108({ method: "POST", fullPath: "/v1/plans" }),
  retrieve: stripeMethod108({ method: "GET", fullPath: "/v1/plans/{plan}" }),
  update: stripeMethod108({ method: "POST", fullPath: "/v1/plans/{plan}" }),
  list: stripeMethod108({
    method: "GET",
    fullPath: "/v1/plans",
    methodType: "list",
  }),
  del: stripeMethod108({ method: "DELETE", fullPath: "/v1/plans/{plan}" }),
});

// node_modules/stripe/esm/resources/Prices.js
var stripeMethod109 = StripeResource.method;
var Prices = StripeResource.extend({
  create: stripeMethod109({ method: "POST", fullPath: "/v1/prices" }),
  retrieve: stripeMethod109({ method: "GET", fullPath: "/v1/prices/{price}" }),
  update: stripeMethod109({ method: "POST", fullPath: "/v1/prices/{price}" }),
  list: stripeMethod109({
    method: "GET",
    fullPath: "/v1/prices",
    methodType: "list",
  }),
  search: stripeMethod109({
    method: "GET",
    fullPath: "/v1/prices/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/Products.js
var stripeMethod110 = StripeResource.method;
var Products2 = StripeResource.extend({
  create: stripeMethod110({ method: "POST", fullPath: "/v1/products" }),
  retrieve: stripeMethod110({ method: "GET", fullPath: "/v1/products/{id}" }),
  update: stripeMethod110({ method: "POST", fullPath: "/v1/products/{id}" }),
  list: stripeMethod110({
    method: "GET",
    fullPath: "/v1/products",
    methodType: "list",
  }),
  del: stripeMethod110({ method: "DELETE", fullPath: "/v1/products/{id}" }),
  createFeature: stripeMethod110({
    method: "POST",
    fullPath: "/v1/products/{product}/features",
  }),
  deleteFeature: stripeMethod110({
    method: "DELETE",
    fullPath: "/v1/products/{product}/features/{id}",
  }),
  listFeatures: stripeMethod110({
    method: "GET",
    fullPath: "/v1/products/{product}/features",
    methodType: "list",
  }),
  retrieveFeature: stripeMethod110({
    method: "GET",
    fullPath: "/v1/products/{product}/features/{id}",
  }),
  search: stripeMethod110({
    method: "GET",
    fullPath: "/v1/products/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/PromotionCodes.js
var stripeMethod111 = StripeResource.method;
var PromotionCodes = StripeResource.extend({
  create: stripeMethod111({ method: "POST", fullPath: "/v1/promotion_codes" }),
  retrieve: stripeMethod111({
    method: "GET",
    fullPath: "/v1/promotion_codes/{promotion_code}",
  }),
  update: stripeMethod111({
    method: "POST",
    fullPath: "/v1/promotion_codes/{promotion_code}",
  }),
  list: stripeMethod111({
    method: "GET",
    fullPath: "/v1/promotion_codes",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Quotes.js
var stripeMethod112 = StripeResource.method;
var Quotes = StripeResource.extend({
  create: stripeMethod112({ method: "POST", fullPath: "/v1/quotes" }),
  retrieve: stripeMethod112({ method: "GET", fullPath: "/v1/quotes/{quote}" }),
  update: stripeMethod112({ method: "POST", fullPath: "/v1/quotes/{quote}" }),
  list: stripeMethod112({
    method: "GET",
    fullPath: "/v1/quotes",
    methodType: "list",
  }),
  accept: stripeMethod112({
    method: "POST",
    fullPath: "/v1/quotes/{quote}/accept",
  }),
  cancel: stripeMethod112({
    method: "POST",
    fullPath: "/v1/quotes/{quote}/cancel",
  }),
  finalizeQuote: stripeMethod112({
    method: "POST",
    fullPath: "/v1/quotes/{quote}/finalize",
  }),
  listComputedUpfrontLineItems: stripeMethod112({
    method: "GET",
    fullPath: "/v1/quotes/{quote}/computed_upfront_line_items",
    methodType: "list",
  }),
  listLineItems: stripeMethod112({
    method: "GET",
    fullPath: "/v1/quotes/{quote}/line_items",
    methodType: "list",
  }),
  pdf: stripeMethod112({
    method: "GET",
    fullPath: "/v1/quotes/{quote}/pdf",
    host: "files.stripe.com",
    streaming: true,
  }),
});

// node_modules/stripe/esm/resources/Refunds.js
var stripeMethod113 = StripeResource.method;
var Refunds2 = StripeResource.extend({
  create: stripeMethod113({ method: "POST", fullPath: "/v1/refunds" }),
  retrieve: stripeMethod113({
    method: "GET",
    fullPath: "/v1/refunds/{refund}",
  }),
  update: stripeMethod113({ method: "POST", fullPath: "/v1/refunds/{refund}" }),
  list: stripeMethod113({
    method: "GET",
    fullPath: "/v1/refunds",
    methodType: "list",
  }),
  cancel: stripeMethod113({
    method: "POST",
    fullPath: "/v1/refunds/{refund}/cancel",
  }),
});

// node_modules/stripe/esm/resources/Reviews.js
var stripeMethod114 = StripeResource.method;
var Reviews = StripeResource.extend({
  retrieve: stripeMethod114({
    method: "GET",
    fullPath: "/v1/reviews/{review}",
  }),
  list: stripeMethod114({
    method: "GET",
    fullPath: "/v1/reviews",
    methodType: "list",
  }),
  approve: stripeMethod114({
    method: "POST",
    fullPath: "/v1/reviews/{review}/approve",
  }),
});

// node_modules/stripe/esm/resources/SetupAttempts.js
var stripeMethod115 = StripeResource.method;
var SetupAttempts = StripeResource.extend({
  list: stripeMethod115({
    method: "GET",
    fullPath: "/v1/setup_attempts",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/SetupIntents.js
var stripeMethod116 = StripeResource.method;
var SetupIntents = StripeResource.extend({
  create: stripeMethod116({ method: "POST", fullPath: "/v1/setup_intents" }),
  retrieve: stripeMethod116({
    method: "GET",
    fullPath: "/v1/setup_intents/{intent}",
  }),
  update: stripeMethod116({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}",
  }),
  list: stripeMethod116({
    method: "GET",
    fullPath: "/v1/setup_intents",
    methodType: "list",
  }),
  cancel: stripeMethod116({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}/cancel",
  }),
  confirm: stripeMethod116({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}/confirm",
  }),
  verifyMicrodeposits: stripeMethod116({
    method: "POST",
    fullPath: "/v1/setup_intents/{intent}/verify_microdeposits",
  }),
});

// node_modules/stripe/esm/resources/ShippingRates.js
var stripeMethod117 = StripeResource.method;
var ShippingRates = StripeResource.extend({
  create: stripeMethod117({ method: "POST", fullPath: "/v1/shipping_rates" }),
  retrieve: stripeMethod117({
    method: "GET",
    fullPath: "/v1/shipping_rates/{shipping_rate_token}",
  }),
  update: stripeMethod117({
    method: "POST",
    fullPath: "/v1/shipping_rates/{shipping_rate_token}",
  }),
  list: stripeMethod117({
    method: "GET",
    fullPath: "/v1/shipping_rates",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Sources.js
var stripeMethod118 = StripeResource.method;
var Sources = StripeResource.extend({
  create: stripeMethod118({ method: "POST", fullPath: "/v1/sources" }),
  retrieve: stripeMethod118({
    method: "GET",
    fullPath: "/v1/sources/{source}",
  }),
  update: stripeMethod118({ method: "POST", fullPath: "/v1/sources/{source}" }),
  listSourceTransactions: stripeMethod118({
    method: "GET",
    fullPath: "/v1/sources/{source}/source_transactions",
    methodType: "list",
  }),
  verify: stripeMethod118({
    method: "POST",
    fullPath: "/v1/sources/{source}/verify",
  }),
});

// node_modules/stripe/esm/resources/SubscriptionItems.js
var stripeMethod119 = StripeResource.method;
var SubscriptionItems = StripeResource.extend({
  create: stripeMethod119({
    method: "POST",
    fullPath: "/v1/subscription_items",
  }),
  retrieve: stripeMethod119({
    method: "GET",
    fullPath: "/v1/subscription_items/{item}",
  }),
  update: stripeMethod119({
    method: "POST",
    fullPath: "/v1/subscription_items/{item}",
  }),
  list: stripeMethod119({
    method: "GET",
    fullPath: "/v1/subscription_items",
    methodType: "list",
  }),
  del: stripeMethod119({
    method: "DELETE",
    fullPath: "/v1/subscription_items/{item}",
  }),
});

// node_modules/stripe/esm/resources/SubscriptionSchedules.js
var stripeMethod120 = StripeResource.method;
var SubscriptionSchedules = StripeResource.extend({
  create: stripeMethod120({
    method: "POST",
    fullPath: "/v1/subscription_schedules",
  }),
  retrieve: stripeMethod120({
    method: "GET",
    fullPath: "/v1/subscription_schedules/{schedule}",
  }),
  update: stripeMethod120({
    method: "POST",
    fullPath: "/v1/subscription_schedules/{schedule}",
  }),
  list: stripeMethod120({
    method: "GET",
    fullPath: "/v1/subscription_schedules",
    methodType: "list",
  }),
  cancel: stripeMethod120({
    method: "POST",
    fullPath: "/v1/subscription_schedules/{schedule}/cancel",
  }),
  release: stripeMethod120({
    method: "POST",
    fullPath: "/v1/subscription_schedules/{schedule}/release",
  }),
});

// node_modules/stripe/esm/resources/Subscriptions.js
var stripeMethod121 = StripeResource.method;
var Subscriptions = StripeResource.extend({
  create: stripeMethod121({ method: "POST", fullPath: "/v1/subscriptions" }),
  retrieve: stripeMethod121({
    method: "GET",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  update: stripeMethod121({
    method: "POST",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  list: stripeMethod121({
    method: "GET",
    fullPath: "/v1/subscriptions",
    methodType: "list",
  }),
  cancel: stripeMethod121({
    method: "DELETE",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}",
  }),
  deleteDiscount: stripeMethod121({
    method: "DELETE",
    fullPath: "/v1/subscriptions/{subscription_exposed_id}/discount",
  }),
  resume: stripeMethod121({
    method: "POST",
    fullPath: "/v1/subscriptions/{subscription}/resume",
  }),
  search: stripeMethod121({
    method: "GET",
    fullPath: "/v1/subscriptions/search",
    methodType: "search",
  }),
});

// node_modules/stripe/esm/resources/TaxCodes.js
var stripeMethod122 = StripeResource.method;
var TaxCodes = StripeResource.extend({
  retrieve: stripeMethod122({ method: "GET", fullPath: "/v1/tax_codes/{id}" }),
  list: stripeMethod122({
    method: "GET",
    fullPath: "/v1/tax_codes",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/TaxIds.js
var stripeMethod123 = StripeResource.method;
var TaxIds = StripeResource.extend({
  create: stripeMethod123({ method: "POST", fullPath: "/v1/tax_ids" }),
  retrieve: stripeMethod123({ method: "GET", fullPath: "/v1/tax_ids/{id}" }),
  list: stripeMethod123({
    method: "GET",
    fullPath: "/v1/tax_ids",
    methodType: "list",
  }),
  del: stripeMethod123({ method: "DELETE", fullPath: "/v1/tax_ids/{id}" }),
});

// node_modules/stripe/esm/resources/TaxRates.js
var stripeMethod124 = StripeResource.method;
var TaxRates = StripeResource.extend({
  create: stripeMethod124({ method: "POST", fullPath: "/v1/tax_rates" }),
  retrieve: stripeMethod124({
    method: "GET",
    fullPath: "/v1/tax_rates/{tax_rate}",
  }),
  update: stripeMethod124({
    method: "POST",
    fullPath: "/v1/tax_rates/{tax_rate}",
  }),
  list: stripeMethod124({
    method: "GET",
    fullPath: "/v1/tax_rates",
    methodType: "list",
  }),
});

// node_modules/stripe/esm/resources/Tokens.js
var stripeMethod125 = StripeResource.method;
var Tokens2 = StripeResource.extend({
  create: stripeMethod125({ method: "POST", fullPath: "/v1/tokens" }),
  retrieve: stripeMethod125({ method: "GET", fullPath: "/v1/tokens/{token}" }),
});

// node_modules/stripe/esm/resources/Topups.js
var stripeMethod126 = StripeResource.method;
var Topups = StripeResource.extend({
  create: stripeMethod126({ method: "POST", fullPath: "/v1/topups" }),
  retrieve: stripeMethod126({ method: "GET", fullPath: "/v1/topups/{topup}" }),
  update: stripeMethod126({ method: "POST", fullPath: "/v1/topups/{topup}" }),
  list: stripeMethod126({
    method: "GET",
    fullPath: "/v1/topups",
    methodType: "list",
  }),
  cancel: stripeMethod126({
    method: "POST",
    fullPath: "/v1/topups/{topup}/cancel",
  }),
});

// node_modules/stripe/esm/resources/Transfers.js
var stripeMethod127 = StripeResource.method;
var Transfers = StripeResource.extend({
  create: stripeMethod127({ method: "POST", fullPath: "/v1/transfers" }),
  retrieve: stripeMethod127({
    method: "GET",
    fullPath: "/v1/transfers/{transfer}",
  }),
  update: stripeMethod127({
    method: "POST",
    fullPath: "/v1/transfers/{transfer}",
  }),
  list: stripeMethod127({
    method: "GET",
    fullPath: "/v1/transfers",
    methodType: "list",
  }),
  createReversal: stripeMethod127({
    method: "POST",
    fullPath: "/v1/transfers/{id}/reversals",
  }),
  listReversals: stripeMethod127({
    method: "GET",
    fullPath: "/v1/transfers/{id}/reversals",
    methodType: "list",
  }),
  retrieveReversal: stripeMethod127({
    method: "GET",
    fullPath: "/v1/transfers/{transfer}/reversals/{id}",
  }),
  updateReversal: stripeMethod127({
    method: "POST",
    fullPath: "/v1/transfers/{transfer}/reversals/{id}",
  }),
});

// node_modules/stripe/esm/resources/WebhookEndpoints.js
var stripeMethod128 = StripeResource.method;
var WebhookEndpoints = StripeResource.extend({
  create: stripeMethod128({
    method: "POST",
    fullPath: "/v1/webhook_endpoints",
  }),
  retrieve: stripeMethod128({
    method: "GET",
    fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
  }),
  update: stripeMethod128({
    method: "POST",
    fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
  }),
  list: stripeMethod128({
    method: "GET",
    fullPath: "/v1/webhook_endpoints",
    methodType: "list",
  }),
  del: stripeMethod128({
    method: "DELETE",
    fullPath: "/v1/webhook_endpoints/{webhook_endpoint}",
  }),
});

// node_modules/stripe/esm/resources.js
var Apps = resourceNamespace("apps", { Secrets });
var Billing = resourceNamespace("billing", {
  Alerts,
  CreditBalanceSummary,
  CreditBalanceTransactions,
  CreditGrants,
  MeterEventAdjustments,
  MeterEvents,
  Meters,
});
var BillingPortal = resourceNamespace("billingPortal", {
  Configurations,
  Sessions,
});
var Checkout = resourceNamespace("checkout", {
  Sessions: Sessions2,
});
var Climate = resourceNamespace("climate", {
  Orders,
  Products,
  Suppliers,
});
var Entitlements = resourceNamespace("entitlements", {
  ActiveEntitlements,
  Features,
});
var FinancialConnections = resourceNamespace("financialConnections", {
  Accounts,
  Sessions: Sessions3,
  Transactions: Transactions2,
});
var Forwarding = resourceNamespace("forwarding", {
  Requests,
});
var Identity = resourceNamespace("identity", {
  VerificationReports,
  VerificationSessions,
});
var Issuing = resourceNamespace("issuing", {
  Authorizations: Authorizations2,
  Cardholders,
  Cards: Cards2,
  Disputes,
  PersonalizationDesigns: PersonalizationDesigns2,
  PhysicalBundles,
  Tokens,
  Transactions: Transactions3,
});
var Radar = resourceNamespace("radar", {
  EarlyFraudWarnings,
  ValueListItems,
  ValueLists,
});
var Reporting = resourceNamespace("reporting", {
  ReportRuns,
  ReportTypes,
});
var Sigma = resourceNamespace("sigma", {
  ScheduledQueryRuns,
});
var Tax = resourceNamespace("tax", {
  Calculations,
  Registrations,
  Settings,
  Transactions: Transactions4,
});
var Terminal = resourceNamespace("terminal", {
  Configurations: Configurations2,
  ConnectionTokens,
  Locations,
  Readers: Readers2,
});
var TestHelpers = resourceNamespace("testHelpers", {
  ConfirmationTokens,
  Customers,
  Refunds,
  TestClocks,
  Issuing: resourceNamespace("issuing", {
    Authorizations,
    Cards,
    PersonalizationDesigns,
    Transactions,
  }),
  Terminal: resourceNamespace("terminal", {
    Readers,
  }),
  Treasury: resourceNamespace("treasury", {
    InboundTransfers,
    OutboundPayments,
    OutboundTransfers,
    ReceivedCredits,
    ReceivedDebits,
  }),
});
var Treasury = resourceNamespace("treasury", {
  CreditReversals,
  DebitReversals,
  FinancialAccounts,
  InboundTransfers: InboundTransfers2,
  OutboundPayments: OutboundPayments2,
  OutboundTransfers: OutboundTransfers2,
  ReceivedCredits: ReceivedCredits2,
  ReceivedDebits: ReceivedDebits2,
  TransactionEntries,
  Transactions: Transactions5,
});
var V2 = resourceNamespace("v2", {
  Billing: resourceNamespace("billing", {
    MeterEventAdjustments: MeterEventAdjustments2,
    MeterEventSession,
    MeterEventStream,
    MeterEvents: MeterEvents2,
  }),
  Core: resourceNamespace("core", {
    EventDestinations,
    Events,
  }),
});

// node_modules/stripe/esm/stripe.core.js
var DEFAULT_HOST = "api.stripe.com";
var DEFAULT_PORT = "443";
var DEFAULT_BASE_PATH = "/v1/";
var DEFAULT_API_VERSION = ApiVersion;
var DEFAULT_TIMEOUT = 8e4;
var MAX_NETWORK_RETRY_DELAY_SEC = 5;
var INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
var APP_INFO_PROPERTIES = ["name", "version", "url", "partner_id"];
var ALLOWED_CONFIG_PROPERTIES = [
  "authenticator",
  "apiVersion",
  "typescript",
  "maxNetworkRetries",
  "httpAgent",
  "httpClient",
  "timeout",
  "host",
  "port",
  "protocol",
  "telemetry",
  "appInfo",
  "stripeAccount",
  "stripeContext",
];
var defaultRequestSenderFactory = (stripe2) =>
  new RequestSender(stripe2, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(
  platformFunctions,
  requestSender = defaultRequestSenderFactory
) {
  Stripe2.PACKAGE_VERSION = "18.0.0";
  Stripe2.USER_AGENT = Object.assign(
    {
      bindings_version: Stripe2.PACKAGE_VERSION,
      lang: "node",
      publisher: "stripe",
      uname: null,
      typescript: false,
    },
    determineProcessUserAgentProperties()
  );
  Stripe2.StripeResource = StripeResource;
  Stripe2.resources = resources_exports;
  Stripe2.HttpClient = HttpClient;
  Stripe2.HttpClientResponse = HttpClientResponse;
  Stripe2.CryptoProvider = CryptoProvider;
  Stripe2.webhooks = createWebhooks(platformFunctions);
  function Stripe2(key, config = {}) {
    if (!(this instanceof Stripe2)) {
      return new Stripe2(key, config);
    }
    const props = this._getPropsFromConfig(config);
    this._platformFunctions = platformFunctions;
    Object.defineProperty(this, "_emitter", {
      value: this._platformFunctions.createEmitter(),
      enumerable: false,
      configurable: false,
      writable: false,
    });
    this.VERSION = Stripe2.PACKAGE_VERSION;
    this.on = this._emitter.on.bind(this._emitter);
    this.once = this._emitter.once.bind(this._emitter);
    this.off = this._emitter.removeListener.bind(this._emitter);
    const agent = props.httpAgent || null;
    this._api = {
      host: props.host || DEFAULT_HOST,
      port: props.port || DEFAULT_PORT,
      protocol: props.protocol || "https",
      basePath: DEFAULT_BASE_PATH,
      version: props.apiVersion || DEFAULT_API_VERSION,
      timeout: validateInteger("timeout", props.timeout, DEFAULT_TIMEOUT),
      maxNetworkRetries: validateInteger(
        "maxNetworkRetries",
        props.maxNetworkRetries,
        2
      ),
      agent,
      httpClient:
        props.httpClient ||
        (agent
          ? this._platformFunctions.createNodeHttpClient(agent)
          : this._platformFunctions.createDefaultHttpClient()),
      dev: false,
      stripeAccount: props.stripeAccount || null,
      stripeContext: props.stripeContext || null,
    };
    const typescript = props.typescript || false;
    if (typescript !== Stripe2.USER_AGENT.typescript) {
      Stripe2.USER_AGENT.typescript = typescript;
    }
    if (props.appInfo) {
      this._setAppInfo(props.appInfo);
    }
    this._prepResources();
    this._setAuthenticator(key, props.authenticator);
    this.errors = Error_exports;
    this.webhooks = Stripe2.webhooks;
    this._prevRequestMetrics = [];
    this._enableTelemetry = props.telemetry !== false;
    this._requestSender = requestSender(this);
    this.StripeResource = Stripe2.StripeResource;
  }
  Stripe2.errors = Error_exports;
  Stripe2.createNodeHttpClient = platformFunctions.createNodeHttpClient;
  Stripe2.createFetchHttpClient = platformFunctions.createFetchHttpClient;
  Stripe2.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
  Stripe2.createSubtleCryptoProvider =
    platformFunctions.createSubtleCryptoProvider;
  Stripe2.prototype = {
    // Properties are set in the constructor above
    _appInfo: void 0,
    on: null,
    off: null,
    once: null,
    VERSION: null,
    StripeResource: null,
    webhooks: null,
    errors: null,
    _api: null,
    _prevRequestMetrics: null,
    _emitter: null,
    _enableTelemetry: null,
    _requestSender: null,
    _platformFunctions: null,
    rawRequest(method, path, params, options) {
      return this._requestSender._rawRequest(method, path, params, options);
    },
    /**
     * @private
     */
    _setAuthenticator(key, authenticator) {
      if (key && authenticator) {
        throw new Error("Can't specify both apiKey and authenticator");
      }
      if (!key && !authenticator) {
        throw new Error("Neither apiKey nor config.authenticator provided");
      }
      this._authenticator = key
        ? createApiKeyAuthenticator(key)
        : authenticator;
    },
    /**
     * @private
     * This may be removed in the future.
     */
    _setAppInfo(info) {
      if (info && typeof info !== "object") {
        throw new Error("AppInfo must be an object.");
      }
      if (info && !info.name) {
        throw new Error("AppInfo.name is required");
      }
      info = info || {};
      this._appInfo = APP_INFO_PROPERTIES.reduce(
        (accum, prop) => {
          if (typeof info[prop] == "string") {
            accum = accum || {};
            accum[prop] = info[prop];
          }
          return accum;
        },
        // @ts-ignore
        void 0
      );
    },
    /**
     * @private
     * This may be removed in the future.
     */
    _setApiField(key, value) {
      this._api[key] = value;
    },
    /**
     * @private
     * Please open or upvote an issue at github.com/stripe/stripe-node
     * if you use this, detailing your use-case.
     *
     * It may be deprecated and removed in the future.
     */
    getApiField(key) {
      return this._api[key];
    },
    setClientId(clientId) {
      this._clientId = clientId;
    },
    getClientId() {
      return this._clientId;
    },
    /**
     * @private
     * Please open or upvote an issue at github.com/stripe/stripe-node
     * if you use this, detailing your use-case.
     *
     * It may be deprecated and removed in the future.
     */
    getConstant: (c) => {
      switch (c) {
        case "DEFAULT_HOST":
          return DEFAULT_HOST;
        case "DEFAULT_PORT":
          return DEFAULT_PORT;
        case "DEFAULT_BASE_PATH":
          return DEFAULT_BASE_PATH;
        case "DEFAULT_API_VERSION":
          return DEFAULT_API_VERSION;
        case "DEFAULT_TIMEOUT":
          return DEFAULT_TIMEOUT;
        case "MAX_NETWORK_RETRY_DELAY_SEC":
          return MAX_NETWORK_RETRY_DELAY_SEC;
        case "INITIAL_NETWORK_RETRY_DELAY_SEC":
          return INITIAL_NETWORK_RETRY_DELAY_SEC;
      }
      return Stripe2[c];
    },
    getMaxNetworkRetries() {
      return this.getApiField("maxNetworkRetries");
    },
    /**
     * @private
     * This may be removed in the future.
     */
    _setApiNumberField(prop, n, defaultVal) {
      const val = validateInteger(prop, n, defaultVal);
      this._setApiField(prop, val);
    },
    getMaxNetworkRetryDelay() {
      return MAX_NETWORK_RETRY_DELAY_SEC;
    },
    getInitialNetworkRetryDelay() {
      return INITIAL_NETWORK_RETRY_DELAY_SEC;
    },
    /**
     * @private
     * Please open or upvote an issue at github.com/stripe/stripe-node
     * if you use this, detailing your use-case.
     *
     * It may be deprecated and removed in the future.
     *
     * Gets a JSON version of a User-Agent and uses a cached version for a slight
     * speed advantage.
     */
    getClientUserAgent(cb) {
      return this.getClientUserAgentSeeded(Stripe2.USER_AGENT, cb);
    },
    /**
     * @private
     * Please open or upvote an issue at github.com/stripe/stripe-node
     * if you use this, detailing your use-case.
     *
     * It may be deprecated and removed in the future.
     *
     * Gets a JSON version of a User-Agent by encoding a seeded object and
     * fetching a uname from the system.
     */
    getClientUserAgentSeeded(seed, cb) {
      this._platformFunctions.getUname().then((uname) => {
        var _a;
        const userAgent = {};
        for (const field in seed) {
          if (!Object.prototype.hasOwnProperty.call(seed, field)) {
            continue;
          }
          userAgent[field] = encodeURIComponent(
            (_a = seed[field]) !== null && _a !== void 0 ? _a : "null"
          );
        }
        userAgent.uname = encodeURIComponent(uname || "UNKNOWN");
        const client = this.getApiField("httpClient");
        if (client) {
          userAgent.httplib = encodeURIComponent(client.getClientName());
        }
        if (this._appInfo) {
          userAgent.application = this._appInfo;
        }
        cb(JSON.stringify(userAgent));
      });
    },
    /**
     * @private
     * Please open or upvote an issue at github.com/stripe/stripe-node
     * if you use this, detailing your use-case.
     *
     * It may be deprecated and removed in the future.
     */
    getAppInfoAsString() {
      if (!this._appInfo) {
        return "";
      }
      let formatted = this._appInfo.name;
      if (this._appInfo.version) {
        formatted += `/${this._appInfo.version}`;
      }
      if (this._appInfo.url) {
        formatted += ` (${this._appInfo.url})`;
      }
      return formatted;
    },
    getTelemetryEnabled() {
      return this._enableTelemetry;
    },
    /**
     * @private
     * This may be removed in the future.
     */
    _prepResources() {
      for (const name in resources_exports) {
        if (!Object.prototype.hasOwnProperty.call(resources_exports, name)) {
          continue;
        }
        this[pascalToCamelCase(name)] = new resources_exports[name](this);
      }
    },
    /**
     * @private
     * This may be removed in the future.
     */
    _getPropsFromConfig(config) {
      if (!config) {
        return {};
      }
      const isString = typeof config === "string";
      const isObject2 = config === Object(config) && !Array.isArray(config);
      if (!isObject2 && !isString) {
        throw new Error("Config must either be an object or a string");
      }
      if (isString) {
        return {
          apiVersion: config,
        };
      }
      const values = Object.keys(config).filter(
        (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)
      );
      if (values.length > 0) {
        throw new Error(
          `Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(
            ", "
          )}`
        );
      }
      return config;
    },
    parseThinEvent(
      payload,
      header,
      secret,
      tolerance,
      cryptoProvider,
      receivedAt
    ) {
      return this.webhooks.constructEvent(
        payload,
        header,
        secret,
        tolerance,
        cryptoProvider,
        receivedAt
      );
    },
  };
  return Stripe2;
}

// node_modules/stripe/esm/stripe.esm.node.js
var Stripe = createStripe(new NodePlatformFunctions());
var stripe_esm_node_default = Stripe;

// netlify/functions/create-payment-intent.js
var stripe = new stripe_esm_node_default(process.env.STRIPE_SECRET_KEY);
var STATEMENT_DESCRIPTOR = "RACHEL GERVAIS AS";
var handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    // En production, limitez cela à votre domaine
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "CORS activ\xE9" }),
    };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "M\xE9thode non autoris\xE9e" }),
    };
  }
  try {
    const data = JSON.parse(event.body);
    const { amount, description, metadata = {}, customerData } = data;
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Montant invalide" }),
      };
    }
    const amountInCents = Math.round(parseFloat(amount) * 100);
    const customerMetadata = customerData
      ? {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
        }
      : {};
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      description: description || "Service d'accompagnement social",
      statement_descriptor: STATEMENT_DESCRIPTOR,
      // Utilisation de la constante définie plus haut
      metadata: {
        ...metadata,
        ...customerMetadata,
        source: "website",
        mode:
          process.env.NODE_ENV === "production" ? "production" : "development",
      },
      // Si nous avons l'email client, on peut l'ajouter directement au receipt_email
      receipt_email: customerData?.email,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
    };
  } catch (error) {
    console.error("Erreur Stripe:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Erreur lors du traitement du paiement",
        message: error.message,
      }),
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    handler,
  });
//# sourceMappingURL=create-payment-intent.js.map
