// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dist/index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // install a JSONP callback for chunk loading

  /******/
  function webpackJsonpCallback(data) {
    /******/
    var chunkIds = data[0];
    /******/

    var moreModules = data[1];
    /******/

    /******/

    /******/
    // add "moreModules" to the modules object,

    /******/
    // then flag all "chunkIds" as loaded and fire callback

    /******/

    var moduleId,
        chunkId,
        i = 0,
        resolves = [];
    /******/

    for (; i < chunkIds.length; i++) {
      /******/
      chunkId = chunkIds[i];
      /******/

      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        /******/
        resolves.push(installedChunks[chunkId][0]);
        /******/
      }
      /******/


      installedChunks[chunkId] = 0;
      /******/
    }
    /******/


    for (moduleId in moreModules) {
      /******/
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /******/
        modules[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/

    }
    /******/


    if (parentJsonpFunction) parentJsonpFunction(data);
    /******/

    /******/

    while (resolves.length) {
      /******/
      resolves.shift()();
      /******/
    }
    /******/

    /******/

  }

  ;
  /******/

  /******/

  /******/
  // The module cache

  /******/

  var installedModules = {};
  /******/

  /******/
  // object to store loaded and loading chunks

  /******/
  // undefined = chunk not loaded, null = chunk preloaded/prefetched

  /******/
  // Promise = chunk loading, 0 = chunk loaded

  /******/

  var installedChunks = {
    /******/
    "main": 0
    /******/

  };
  /******/

  /******/

  /******/

  /******/
  // script path function

  /******/

  function jsonpScriptSrc(chunkId) {
    /******/
    return __webpack_require__.p + "" + chunkId + ".index.js";
    /******/
  }
  /******/

  /******/
  // object to store loaded and loading wasm modules

  /******/


  var installedWasmModules = {};
  /******/

  /******/

  function promiseResolve() {
    return Promise.resolve();
  }
  /******/

  /******/


  var wasmImportObjects = {
    /******/
    "./pkg/index_bg.wasm": function pkgIndex_bgWasm() {
      /******/
      return {
        /******/
        "./index.js": {
          /******/
          "__wbindgen_object_drop_ref": function __wbindgen_object_drop_ref(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_object_drop_ref"](p0i32);
            /******/
          },

          /******/
          "__wbg_log_d04e9a85ff0b15e7": function __wbg_log_d04e9a85ff0b15e7(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_log_d04e9a85ff0b15e7"](p0i32, p1i32);
            /******/
          },

          /******/
          "__widl_instanceof_CanvasRenderingContext2D": function __widl_instanceof_CanvasRenderingContext2D(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_instanceof_CanvasRenderingContext2D"](p0i32);
            /******/
          },

          /******/
          "__widl_f_put_image_data_CanvasRenderingContext2D": function __widl_f_put_image_data_CanvasRenderingContext2D(p0i32, p1i32, p2f64, p3f64) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_f_put_image_data_CanvasRenderingContext2D"](p0i32, p1i32, p2f64, p3f64);
            /******/
          },

          /******/
          "__widl_f_get_element_by_id_Document": function __widl_f_get_element_by_id_Document(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_f_get_element_by_id_Document"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__widl_instanceof_HTMLCanvasElement": function __widl_instanceof_HTMLCanvasElement(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_instanceof_HTMLCanvasElement"](p0i32);
            /******/
          },

          /******/
          "__widl_f_get_context_HTMLCanvasElement": function __widl_f_get_context_HTMLCanvasElement(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_f_get_context_HTMLCanvasElement"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__widl_f_new_with_u8_clamped_array_ImageData": function __widl_f_new_with_u8_clamped_array_ImageData(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_f_new_with_u8_clamped_array_ImageData"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__widl_instanceof_Window": function __widl_instanceof_Window(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_instanceof_Window"](p0i32);
            /******/
          },

          /******/
          "__widl_f_document_Window": function __widl_f_document_Window(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__widl_f_document_Window"](p0i32);
            /******/
          },

          /******/
          "__wbg_newnoargs_6ad69a50998c5acb": function __wbg_newnoargs_6ad69a50998c5acb(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_newnoargs_6ad69a50998c5acb"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_call_4499dca0c553c196": function __wbg_call_4499dca0c553c196(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_call_4499dca0c553c196"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_globalThis_36c1f2e85948e420": function __wbg_globalThis_36c1f2e85948e420() {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_globalThis_36c1f2e85948e420"]();
            /******/
          },

          /******/
          "__wbg_self_73c7a601ff857345": function __wbg_self_73c7a601ff857345() {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_self_73c7a601ff857345"]();
            /******/
          },

          /******/
          "__wbg_window_ca735e04cb2b0566": function __wbg_window_ca735e04cb2b0566() {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_window_ca735e04cb2b0566"]();
            /******/
          },

          /******/
          "__wbg_global_99312a595fd2e761": function __wbg_global_99312a595fd2e761() {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_global_99312a595fd2e761"]();
            /******/
          },

          /******/
          "__wbindgen_is_undefined": function __wbindgen_is_undefined(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_is_undefined"](p0i32);
            /******/
          },

          /******/
          "__wbindgen_object_clone_ref": function __wbindgen_object_clone_ref(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_object_clone_ref"](p0i32);
            /******/
          },

          /******/
          "__wbg_new_3a746f2619705add": function __wbg_new_3a746f2619705add(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_new_3a746f2619705add"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_call_f54d3a6dadb199ca": function __wbg_call_f54d3a6dadb199ca(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_call_f54d3a6dadb199ca"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_self_ac379e780a0d8b94": function __wbg_self_ac379e780a0d8b94(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_self_ac379e780a0d8b94"](p0i32);
            /******/
          },

          /******/
          "__wbg_crypto_1e4302b85d4f64a2": function __wbg_crypto_1e4302b85d4f64a2(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_crypto_1e4302b85d4f64a2"](p0i32);
            /******/
          },

          /******/
          "__wbg_getRandomValues_1b4ba144162a5c9e": function __wbg_getRandomValues_1b4ba144162a5c9e(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_getRandomValues_1b4ba144162a5c9e"](p0i32);
            /******/
          },

          /******/
          "__wbg_getRandomValues_1ef11e888e5228e9": function __wbg_getRandomValues_1ef11e888e5228e9(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_getRandomValues_1ef11e888e5228e9"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__wbg_require_6461b1e9a0d7c34a": function __wbg_require_6461b1e9a0d7c34a(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_require_6461b1e9a0d7c34a"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_randomFillSync_1b52c8482374c55b": function __wbg_randomFillSync_1b52c8482374c55b(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_randomFillSync_1b52c8482374c55b"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__wbindgen_jsval_eq": function __wbindgen_jsval_eq(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_jsval_eq"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_self_1801c027cb0e6124": function __wbg_self_1801c027cb0e6124() {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_self_1801c027cb0e6124"]();
            /******/
          },

          /******/
          "__wbg_crypto_3e91f24788b1203d": function __wbg_crypto_3e91f24788b1203d(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_crypto_3e91f24788b1203d"](p0i32);
            /******/
          },

          /******/
          "__wbg_getRandomValues_7ecea3ecacbb2f9e": function __wbg_getRandomValues_7ecea3ecacbb2f9e(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_getRandomValues_7ecea3ecacbb2f9e"](p0i32);
            /******/
          },

          /******/
          "__wbg_getRandomValues_f724b5822126eff7": function __wbg_getRandomValues_f724b5822126eff7(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_getRandomValues_f724b5822126eff7"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__wbg_require_e89d842e759f0a4c": function __wbg_require_e89d842e759f0a4c(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_require_e89d842e759f0a4c"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_randomFillSync_eae3007264ffc138": function __wbg_randomFillSync_eae3007264ffc138(p0i32, p1i32, p2i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_randomFillSync_eae3007264ffc138"](p0i32, p1i32, p2i32);
            /******/
          },

          /******/
          "__wbg_error_4bb6c2a97407129a": function __wbg_error_4bb6c2a97407129a(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_error_4bb6c2a97407129a"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbg_new_59cb74e423758ede": function __wbg_new_59cb74e423758ede() {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_new_59cb74e423758ede"]();
            /******/
          },

          /******/
          "__wbg_stack_558ba5917b466edd": function __wbg_stack_558ba5917b466edd(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbg_stack_558ba5917b466edd"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbindgen_debug_string": function __wbindgen_debug_string(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_debug_string"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbindgen_throw": function __wbindgen_throw(p0i32, p1i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_throw"](p0i32, p1i32);
            /******/
          },

          /******/
          "__wbindgen_rethrow": function __wbindgen_rethrow(p0i32) {
            /******/
            return installedModules["./pkg/index.js"].exports["__wbindgen_rethrow"](p0i32);
            /******/
          }
          /******/

          /******/

        }
      };
      /******/
    }
    /******/

  };
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/
  // This file contains only the entry chunk.

  /******/
  // The chunk loading function for additional chunks

  /******/


  __webpack_require__.e = function requireEnsure(chunkId) {
    /******/
    var promises = [];
    /******/

    /******/

    /******/
    // JSONP chunk loading for javascript

    /******/

    /******/

    var installedChunkData = installedChunks[chunkId];
    /******/

    if (installedChunkData !== 0) {
      // 0 means "already installed".

      /******/

      /******/
      // a Promise means "currently loading".

      /******/
      if (installedChunkData) {
        /******/
        promises.push(installedChunkData[2]);
        /******/
      } else {
        /******/
        // setup Promise in chunk cache

        /******/
        var promise = new Promise(function (resolve, reject) {
          /******/
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
          /******/
        });
        /******/

        promises.push(installedChunkData[2] = promise);
        /******/

        /******/
        // start chunk loading

        /******/

        var script = document.createElement('script');
        /******/

        var onScriptComplete;
        /******/

        /******/

        script.charset = 'utf-8';
        /******/

        script.timeout = 120;
        /******/

        if (__webpack_require__.nc) {
          /******/
          script.setAttribute("nonce", __webpack_require__.nc);
          /******/
        }
        /******/


        script.src = jsonpScriptSrc(chunkId);
        /******/

        /******/
        // create error before stack unwound to get useful stacktrace later

        /******/

        var error = new Error();
        /******/

        onScriptComplete = function onScriptComplete(event) {
          /******/
          // avoid mem leaks in IE.

          /******/
          script.onerror = script.onload = null;
          /******/

          clearTimeout(timeout);
          /******/

          var chunk = installedChunks[chunkId];
          /******/

          if (chunk !== 0) {
            /******/
            if (chunk) {
              /******/
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              /******/

              var realSrc = event && event.target && event.target.src;
              /******/

              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              /******/

              error.name = 'ChunkLoadError';
              /******/

              error.type = errorType;
              /******/

              error.request = realSrc;
              /******/

              chunk[1](error);
              /******/
            }
            /******/


            installedChunks[chunkId] = undefined;
            /******/
          }
          /******/

        };
        /******/


        var timeout = setTimeout(function () {
          /******/
          onScriptComplete({
            type: 'timeout',
            target: script
          });
          /******/
        }, 120000);
        /******/

        script.onerror = script.onload = onScriptComplete;
        /******/

        document.head.appendChild(script);
        /******/
      }
      /******/

    }
    /******/

    /******/
    // Fetch + compile chunk loading for webassembly

    /******/

    /******/


    var wasmModules = {
      "1": ["./pkg/index_bg.wasm"]
    }[chunkId] || [];
    /******/

    /******/

    wasmModules.forEach(function (wasmModuleId) {
      /******/
      var installedWasmModuleData = installedWasmModules[wasmModuleId];
      /******/

      /******/
      // a Promise means "currently loading" or "already loaded".

      /******/

      if (installedWasmModuleData)
        /******/
        promises.push(installedWasmModuleData);
        /******/
      else {
          /******/
          var importObject = wasmImportObjects[wasmModuleId]();
          /******/

          var req = fetch(__webpack_require__.p + "" + {
            "./pkg/index_bg.wasm": "bf14ca908541301b5d73"
          }[wasmModuleId] + ".module.wasm");
          /******/

          var promise;
          /******/

          if (importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
            /******/
            promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function (items) {
              /******/
              return WebAssembly.instantiate(items[0], items[1]);
              /******/
            });
            /******/
          } else if (typeof WebAssembly.instantiateStreaming === 'function') {
            /******/
            promise = WebAssembly.instantiateStreaming(req, importObject);
            /******/
          } else {
            /******/
            var bytesPromise = req.then(function (x) {
              return x.arrayBuffer();
            });
            /******/

            promise = bytesPromise.then(function (bytes) {
              /******/
              return WebAssembly.instantiate(bytes, importObject);
              /******/
            });
            /******/
          }
          /******/


          promises.push(installedWasmModules[wasmModuleId] = promise.then(function (res) {
            /******/
            return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
            /******/
          }));
          /******/
        }
      /******/
    });
    /******/

    return Promise.all(promises);
    /******/
  };
  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && _typeof(value) === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/
  // on error function for async loading

  /******/

  __webpack_require__.oe = function (err) {
    console.error(err);
    throw err;
  };
  /******/

  /******/
  // object with all WebAssembly.instance exports

  /******/


  __webpack_require__.w = {};
  /******/

  /******/

  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  /******/

  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /******/

  jsonpArray.push = webpackJsonpCallback;
  /******/

  jsonpArray = jsonpArray.slice();
  /******/

  for (var i = 0; i < jsonpArray.length; i++) {
    webpackJsonpCallback(jsonpArray[i]);
  }
  /******/


  var parentJsonpFunction = oldJsonpFunction;
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = "./index.js");
  /******/
})(
/************************************************************************/

/******/
{
  /***/
  "./index.js":
  /*!******************!*\
    !*** ./index.js ***!
    \******************/

  /*! no static exports found */

  /***/
  function indexJs(module, exports, __webpack_require__) {
    eval("// For more comments about what's going on here, check out the `hello_world`\n// example.\nPromise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./pkg */ \"./pkg/index.js\"))\n    .catch(console.error);\n\nconsole.log(\"index.js finished loading\");\n\n//# sourceURL=webpack:///./index.js?");
    /***/
  }
  /******/

});
},{}],"../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50187" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","dist/index.js"], null)
//# sourceMappingURL=/dist.de44d8ea.js.map