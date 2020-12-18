/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*
  !*** ./config/config.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//defining some server-side config-related variables used in code, but should not be hardcoded as best practice\nconst config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 3000,\n  jwtSecret: process.env.JWT_SECRET || \"YOUR_secret_key\",\n  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'\n};\nconst _default = config;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(config, \"config\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\config\\\\config.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\config\\\\config.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./config/config.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../config/config */ \"./config/config.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n //handles requests to signin and signout routes and \n//also provides JWT and express-jwt functionality to enable authentication and authorization for protected user API endpoints\n//controller functions\n\nconst signin = async (req, res) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.findOne({\n      \"email\": req.body.email\n    });\n\n    if (!user) {\n      return res.status('401').json({\n        error: \"User not found\"\n      });\n    }\n\n    if (!user.authenticate(req.body.password)) {\n      return res.status('401').send({\n        error: \"Email and password don't match.\"\n      });\n    }\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user._id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__.default.jwtSecret);\n    res.cookie('t', token, {\n      expire: new Date() + 9999\n    });\n    return res.json({\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email\n      }\n    });\n  } catch (err) {\n    return res.status('401').json({\n      error: \"Could not Sign in.\"\n    });\n  }\n};\n\nconst signout = (req, res) => {\n  res.clearCookie(\"t\");\n  return res.status(\"200\").json({\n    message: \"signed out\"\n  });\n}; // add this to any route that should be protected against unauthenticated access\n\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_3__.default.jwtSecret,\n  userProperty: 'auth',\n  algorithms: ['HS256']\n}); //add this function to routes that require both authentication and authorization\n//req.auth is generated from requireSignin by express-jwt , and the req.profile is generated by userID function in user.controller.js after authentication verification.\n\nconst hasAuthorization = (req, res, next) => {\n  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;\n\n  if (!authorized) {\n    return res.status('403').json({\n      error: \"User is not authorized\"\n    });\n  }\n\n  next();\n};\n\nconst _default = {\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(signin, \"signin\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(signout, \"signout\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(requireSignin, \"requireSignin\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(hasAuthorization, \"hasAuthorization\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\auth.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\auth.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//callbacks to be executed whena route request is received by the server\n\n\n //when express app gets a POST request at'api/users' it calls: \n\nconst create = async (req, res) => {\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default(req.body);\n\n  try {\n    await user.save();\n    return res.status(200).json({\n      message: \"Successfully signed up!\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n}; //when express app gets  a GET request at 'api/users', executes:\n\n\nconst list = async (req, res) => {\n  try {\n    let users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.find().select('name email updated created');\n    res.json(users);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n}; //retrieve user in database by id, the next() middleware propagates control in next relevant controller function for example moving on to read controller fn\n\n\nconst userById = async (req, res, next, id) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.findById(id);\n\n    if (!user) {\n      return res.status('400').json({\n        error: \"User not found\"\n      });\n    }\n\n    req.profile = user;\n    next();\n  } catch (err) {\n    return res.status('400').json({\n      error: \"Could not retrieve user\"\n    });\n  }\n}; //these operations require retrieving a spec user by ID first\n\n\nconst read = (req, res) => {\n  //removes sensitive info before sending the user objvet in respo.\n  req.profile.hashed_password = undefined;\n  req.profile.salt = undefined;\n  return res.json(req.profile);\n};\n\nconst update = async (req, res) => {\n  try {\n    let user = req.profile;\n    user = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(user, req.body);\n    await user.save();\n    user.hashed_password = undefined;\n    user.salt = undefined;\n    res.json(user);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    let user = req.profile;\n    let deletedUser = await user.remove(); //remove query deletes user from database\n\n    deletedUser.hashed_password = undefined;\n    deletedUser.salt = undefined;\n    res.json(deletedUser);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__.default.getErrorMessage(err)\n    });\n  }\n};\n\nconst _default = {\n  create,\n  userById,\n  read,\n  list,\n  remove,\n  update\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(create, \"create\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(list, \"list\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(userById, \"userById\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(read, \"read\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(update, \"update\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(remove, \"remove\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\controllers\\\\user.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/devBundle.js":
/*!*****************************!*
  !*** ./server/devBundle.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-dev-middleware */ \"../node_modules/webpack-dev-middleware/index.js\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-hot-middleware */ \"../node_modules/webpack-hot-middleware/middleware.js\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _webpack_config_client_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../webpack.config.client.js */ \"./webpack.config.client.js\");\n/* harmony import */ var _webpack_config_client_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webpack_config_client_js__WEBPACK_IMPORTED_MODULE_4__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n //integrate front and back end development flow\n//set upp compile method taking express app and configs it to use webpack middleware.\n//this method  enables hot reloading from server-side using webpack hot middlew\n\nconst compile = app => {\n  if (_config_config__WEBPACK_IMPORTED_MODULE_0__.default.env === \"development\") {\n    const compiler = webpack__WEBPACK_IMPORTED_MODULE_1___default()((_webpack_config_client_js__WEBPACK_IMPORTED_MODULE_4___default()));\n    const middleware = webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler, {\n      publicPath: (_webpack_config_client_js__WEBPACK_IMPORTED_MODULE_4___default().output.publicPath)\n    });\n    app.use(middleware);\n    app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler));\n  }\n};\n\nconst _default = {\n  compile\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(compile, \"compile\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\devBundle.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\devBundle.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/devBundle.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*
  !*** ./server/express.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../template */ \"./template.js\");\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* harmony import */ var _devBundle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./devBundle */ \"./server/devBundle.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_10__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n/*..configure express to accept HTTP requests ... */\n\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().urlencoded({\n  extended: true\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use(cors__WEBPACK_IMPORTED_MODULE_4___default()()); //send it in the response to a GET request for the / route\n\napp.get('/', (req, res) => {\n  res.status(200).send((0,_template__WEBPACK_IMPORTED_MODULE_6__.default)());\n}); //mount,makes routes defined in auth.routes.js accessible from client side\n\napp.use('/', _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__.default);\napp.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__.default); //auth error handling for express-jwt\n\napp.use((err, req, res, next) => {\n  if (err.name === 'UnauthorizedError') {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  } else if (err) {\n    res.status(400).json({\n      \"error\": err.name + \": \" + err.message\n    });\n    console.log(err);\n  }\n}); //import middle , client-side webpack config, initiatie webpack to compile and bundle client-side code and enable hot reloading.\n//bundles code with be places in dist folder, which willl be needed to render views.\n\n_devBundle__WEBPACK_IMPORTED_MODULE_9__.default.compile(app); //only use when in development, otherwise comment out\n//config to serve static files from dist folder\n\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use('/dist', express__WEBPACK_IMPORTED_MODULE_0___default().static(path__WEBPACK_IMPORTED_MODULE_10___default().join(CURRENT_WORKING_DIR, 'dist')));\nconst _default = app;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(app, \"app\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\express.js\");\n  reactHotLoader.register(CURRENT_WORKING_DIR, \"CURRENT_WORKING_DIR\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\express.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\express.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/express.js?");

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//MONGOOSE ERROR HANDLING\n//helper method:\nconst getErrorMessage = err => {\n  let message = \"\";\n\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n\n      default:\n        message = \"Something went wrong\";\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) {\n        message = err.errors[errName].message;\n      }\n    }\n  }\n\n  return message;\n}; //method to parse the UNIQUE constraint-related error object and construct an error message:\n\n\nconst getUniqueErrorMessage = err => {\n  let output;\n\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'already exists';\n  } catch (ex) {\n    output = 'Unique field already exists';\n  }\n\n  return output;\n};\n\nconst _default = {\n  getErrorMessage\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(getErrorMessage, \"getErrorMessage\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\helpers\\\\dbErrorHandler.js\");\n  reactHotLoader.register(getUniqueErrorMessage, \"getUniqueErrorMessage\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\helpers\\\\dbErrorHandler.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\helpers\\\\dbErrorHandler.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n// USER MODEL IMPLEMENTATION\n\n\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  //stores users name, etc..\n  name: {\n    type: String,\n    trim: true,\n    required: 'Name is required'\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: 'Email already exists',\n    match: [/.+\\@.+\\..+/, 'Please enter a valid email address'],\n    required: 'Email is required'\n  },\n  //generates timestamps recorded to indicate when user is created and user data is updated:\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: {\n    type: Date\n  },\n  //encrypted user password used for authentication:\n  hashed_password: {\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: {\n    type: String\n  }\n}); //handle password string as virtual field\n\nuserSchema.virtual('password').set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n}); //BUSINESS LOGIC\n//encryption and authentication\n\nuserSchema.methods = {\n  //verify sign-on attempts\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  //generate encrypted hash from the plain-text password and a unique salt value using crypto module from Node\n  encryptPassword: function (password) {\n    if (!password) {\n      return '';\n    }\n\n    try {\n      return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHmac('sha1', this.salt).update(password).digest('hex');\n    } catch (err) {\n      return '';\n    }\n  },\n  //to ensure two users dont end up with same hashed password by using same text passowrd, add a unique salt value before generating the hashed password for each user:\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + '';\n  }\n}; //password validation associated with hashed_password field in schema:\n\nuserSchema.path('hashed_password').validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate('password', 'password must be at least 6 characters long.');\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate('password', 'Password is required');\n  }\n}, null); //user model  exported to be used by the rest of backend code\n//now we can use this user model to extend backend functionality...\n\nconst _default = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(userSchema, \"userSchema\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\models\\\\user.model.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\models\\\\user.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//auth API endpoints for sign-in and sign-out\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router(); //post and get requests invokes the corresponding controller functions in auth.controller.js\n\nrouter.route('/auth/signin').post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.default.signin);\nrouter.route('/auth/signout').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.default.signout);\nconst _default = router;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\routes\\\\auth.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\routes\\\\auth.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n //declare API endpoints that correspond to user CRUD operations \n//and configure express router to handle userID para in a requested route \n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/api/users').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.create); //read route only needs authentication verif\n//update,delete check both authentication and authorization before CRUD executions.                           \n\nrouter.route('/api/users/:userId').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.remove);\nrouter.param('userId', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.userById);\nconst _default = router;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\routes\\\\user.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\server\\\\routes\\\\user.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n //starting the server\n\n_express__WEBPACK_IMPORTED_MODULE_1__.default.listen(_config_config__WEBPACK_IMPORTED_MODULE_0__.default.port, err => {\n  if (err) {\n    console.log(err);\n  }\n\n  console.info('Server started on port %s.', _config_config__WEBPACK_IMPORTED_MODULE_0__.default.port);\n}); //configure to use native ES6 promises and handle the connection to the mongodb database for project\n\n(mongoose__WEBPACK_IMPORTED_MODULE_2___default().Promise) = global.Promise;\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_0__.default.mongoUri, {\n  useNewUrlParser: true,\n  useCreateIndex: true,\n  useUnifiedTopology: true\n});\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.on('error', () => {\n  throw new Error('Unable to connect to database: ${mongoUri}');\n});\n\n//# sourceURL=webpack://backend-skeleton/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*
  !*** ./template.js ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst _default = () => {\n  return '<!doctype html> \\\r\n    <html lang=\"en\" dir=\"ltr\"> \\\r\n    <head> \\\r\n        <meta charset=\"utf-8\"></meta> \\\r\n        <title>MERN Skeleton</title>  \\\r\n        <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:100,300,400\"> \\\r\n        <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\"> \\\r\n    </head> \\\r\n    <body>  \\\r\n        <div id=\"root\">Hello world!!</div> \\\r\n        <script type=\"text/javascript\" src=\"/dist/bundle.js\"></script> \\\r\n    </body>  \\\r\n    </html>';\n};\n\n//returns a html doc that renders hello world on browser screen\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default); //script tag loads REACT frontend code in browser when visiting root URL\"/\" with server running\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\template.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./template.js?");

/***/ }),

/***/ "./webpack.config.client.js":
/*!**********************************!*
  !*** ./webpack.config.client.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nconst CURRENT_WORKING_DIR = process.cwd();\nconst config = {\n  //config webpack bundle and hot-load react code during develp\n  name: \"browser\",\n  mode: \"development\",\n  devtool: 'eval-source-map',\n  entry: ['webpack-hot-middleware/client?reload=true', path.join(CURRENT_WORKING_DIR, 'client/main.js')],\n  output: {\n    path: path.join(CURRENT_WORKING_DIR, '/dist'),\n    filename: 'bundle.js',\n    publicPath: '/dist/'\n  },\n  module: {\n    rules: [{\n      test: /\\.jsx?$/,\n      exclude: /node_modules/,\n      use: ['babel-loader']\n    }, {\n      test: /\\.(ttf|eot|svg|gif|jpg|png)(\\?[\\s\\S]+)?$/,\n      use: 'file-loader'\n    }]\n  },\n  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],\n  resolve: {\n    alias: {\n      'react-dom': '@hot-loader/react-dom'\n    }\n  }\n};\nmodule.exports = config;\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(CURRENT_WORKING_DIR, \"CURRENT_WORKING_DIR\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\webpack.config.client.js\");\n  reactHotLoader.register(config, \"config\", \"C:\\\\Users\\\\orteg\\\\Projects\\\\MERN_apps\\\\simple-setup\\\\MERN_skeleton\\\\webpack.config.client.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://backend-skeleton/./webpack.config.client.js?");

/***/ }),

/***/ "../node_modules/errno/custom.js":
/*!***************************************!*
  !*** ../node_modules/errno/custom.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var prr = __webpack_require__(/*! prr */ \"../node_modules/prr/prr.js\")\r\n\r\nfunction init (type, message, cause) {\r\n  if (!!message && typeof message != 'string') {\r\n    message = message.message || message.name\r\n  }\r\n  prr(this, {\r\n      type    : type\r\n    , name    : type\r\n      // can be passed just a 'cause'\r\n    , cause   : typeof message != 'string' ? message : cause\r\n    , message : message\r\n  }, 'ewr')\r\n}\r\n\r\n// generic prototype, not intended to be actually used - helpful for `instanceof`\r\nfunction CustomError (message, cause) {\r\n  Error.call(this)\r\n  if (Error.captureStackTrace)\r\n    Error.captureStackTrace(this, this.constructor)\r\n  init.call(this, 'CustomError', message, cause)\r\n}\r\n\r\nCustomError.prototype = new Error()\r\n\r\nfunction createError (errno, type, proto) {\r\n  var err = function (message, cause) {\r\n    init.call(this, type, message, cause)\r\n    //TODO: the specificity here is stupid, errno should be available everywhere\r\n    if (type == 'FilesystemError') {\r\n      this.code    = this.cause.code\r\n      this.path    = this.cause.path\r\n      this.errno   = this.cause.errno\r\n      this.message =\r\n        (errno.errno[this.cause.errno]\r\n          ? errno.errno[this.cause.errno].description\r\n          : this.cause.message)\r\n        + (this.cause.path ? ' [' + this.cause.path + ']' : '')\r\n    }\r\n    Error.call(this)\r\n    if (Error.captureStackTrace)\r\n      Error.captureStackTrace(this, err)\r\n  }\r\n  err.prototype = !!proto ? new proto() : new CustomError()\r\n  return err\r\n}\r\n\r\nmodule.exports = function (errno) {\r\n  var ce = function (type, proto) {\r\n    return createError(errno, type, proto)\r\n  }\r\n  return {\r\n      CustomError     : CustomError\r\n    , FilesystemError : ce('FilesystemError')\r\n    , createError     : ce\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/errno/custom.js?");

/***/ }),

/***/ "../node_modules/errno/errno.js":
/*!**************************************!*
  !*** ../node_modules/errno/errno.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var all = module.exports.all = [\r\n  {\r\n    errno: -2,\r\n    code: 'ENOENT',\r\n    description: 'no such file or directory'\r\n  },\r\n  {\r\n    errno: -1,\r\n    code: 'UNKNOWN',\r\n    description: 'unknown error'\r\n  },\r\n  {\r\n    errno: 0,\r\n    code: 'OK',\r\n    description: 'success'\r\n  },\r\n  {\r\n    errno: 1,\r\n    code: 'EOF',\r\n    description: 'end of file'\r\n  },\r\n  {\r\n    errno: 2,\r\n    code: 'EADDRINFO',\r\n    description: 'getaddrinfo error'\r\n  },\r\n  {\r\n    errno: 3,\r\n    code: 'EACCES',\r\n    description: 'permission denied'\r\n  },\r\n  {\r\n    errno: 4,\r\n    code: 'EAGAIN',\r\n    description: 'resource temporarily unavailable'\r\n  },\r\n  {\r\n    errno: 5,\r\n    code: 'EADDRINUSE',\r\n    description: 'address already in use'\r\n  },\r\n  {\r\n    errno: 6,\r\n    code: 'EADDRNOTAVAIL',\r\n    description: 'address not available'\r\n  },\r\n  {\r\n    errno: 7,\r\n    code: 'EAFNOSUPPORT',\r\n    description: 'address family not supported'\r\n  },\r\n  {\r\n    errno: 8,\r\n    code: 'EALREADY',\r\n    description: 'connection already in progress'\r\n  },\r\n  {\r\n    errno: 9,\r\n    code: 'EBADF',\r\n    description: 'bad file descriptor'\r\n  },\r\n  {\r\n    errno: 10,\r\n    code: 'EBUSY',\r\n    description: 'resource busy or locked'\r\n  },\r\n  {\r\n    errno: 11,\r\n    code: 'ECONNABORTED',\r\n    description: 'software caused connection abort'\r\n  },\r\n  {\r\n    errno: 12,\r\n    code: 'ECONNREFUSED',\r\n    description: 'connection refused'\r\n  },\r\n  {\r\n    errno: 13,\r\n    code: 'ECONNRESET',\r\n    description: 'connection reset by peer'\r\n  },\r\n  {\r\n    errno: 14,\r\n    code: 'EDESTADDRREQ',\r\n    description: 'destination address required'\r\n  },\r\n  {\r\n    errno: 15,\r\n    code: 'EFAULT',\r\n    description: 'bad address in system call argument'\r\n  },\r\n  {\r\n    errno: 16,\r\n    code: 'EHOSTUNREACH',\r\n    description: 'host is unreachable'\r\n  },\r\n  {\r\n    errno: 17,\r\n    code: 'EINTR',\r\n    description: 'interrupted system call'\r\n  },\r\n  {\r\n    errno: 18,\r\n    code: 'EINVAL',\r\n    description: 'invalid argument'\r\n  },\r\n  {\r\n    errno: 19,\r\n    code: 'EISCONN',\r\n    description: 'socket is already connected'\r\n  },\r\n  {\r\n    errno: 20,\r\n    code: 'EMFILE',\r\n    description: 'too many open files'\r\n  },\r\n  {\r\n    errno: 21,\r\n    code: 'EMSGSIZE',\r\n    description: 'message too long'\r\n  },\r\n  {\r\n    errno: 22,\r\n    code: 'ENETDOWN',\r\n    description: 'network is down'\r\n  },\r\n  {\r\n    errno: 23,\r\n    code: 'ENETUNREACH',\r\n    description: 'network is unreachable'\r\n  },\r\n  {\r\n    errno: 24,\r\n    code: 'ENFILE',\r\n    description: 'file table overflow'\r\n  },\r\n  {\r\n    errno: 25,\r\n    code: 'ENOBUFS',\r\n    description: 'no buffer space available'\r\n  },\r\n  {\r\n    errno: 26,\r\n    code: 'ENOMEM',\r\n    description: 'not enough memory'\r\n  },\r\n  {\r\n    errno: 27,\r\n    code: 'ENOTDIR',\r\n    description: 'not a directory'\r\n  },\r\n  {\r\n    errno: 28,\r\n    code: 'EISDIR',\r\n    description: 'illegal operation on a directory'\r\n  },\r\n  {\r\n    errno: 29,\r\n    code: 'ENONET',\r\n    description: 'machine is not on the network'\r\n  },\r\n  {\r\n    errno: 31,\r\n    code: 'ENOTCONN',\r\n    description: 'socket is not connected'\r\n  },\r\n  {\r\n    errno: 32,\r\n    code: 'ENOTSOCK',\r\n    description: 'socket operation on non-socket'\r\n  },\r\n  {\r\n    errno: 33,\r\n    code: 'ENOTSUP',\r\n    description: 'operation not supported on socket'\r\n  },\r\n  {\r\n    errno: 34,\r\n    code: 'ENOENT',\r\n    description: 'no such file or directory'\r\n  },\r\n  {\r\n    errno: 35,\r\n    code: 'ENOSYS',\r\n    description: 'function not implemented'\r\n  },\r\n  {\r\n    errno: 36,\r\n    code: 'EPIPE',\r\n    description: 'broken pipe'\r\n  },\r\n  {\r\n    errno: 37,\r\n    code: 'EPROTO',\r\n    description: 'protocol error'\r\n  },\r\n  {\r\n    errno: 38,\r\n    code: 'EPROTONOSUPPORT',\r\n    description: 'protocol not supported'\r\n  },\r\n  {\r\n    errno: 39,\r\n    code: 'EPROTOTYPE',\r\n    description: 'protocol wrong type for socket'\r\n  },\r\n  {\r\n    errno: 40,\r\n    code: 'ETIMEDOUT',\r\n    description: 'connection timed out'\r\n  },\r\n  {\r\n    errno: 41,\r\n    code: 'ECHARSET',\r\n    description: 'invalid Unicode character'\r\n  },\r\n  {\r\n    errno: 42,\r\n    code: 'EAIFAMNOSUPPORT',\r\n    description: 'address family for hostname not supported'\r\n  },\r\n  {\r\n    errno: 44,\r\n    code: 'EAISERVICE',\r\n    description: 'servname not supported for ai_socktype'\r\n  },\r\n  {\r\n    errno: 45,\r\n    code: 'EAISOCKTYPE',\r\n    description: 'ai_socktype not supported'\r\n  },\r\n  {\r\n    errno: 46,\r\n    code: 'ESHUTDOWN',\r\n    description: 'cannot send after transport endpoint shutdown'\r\n  },\r\n  {\r\n    errno: 47,\r\n    code: 'EEXIST',\r\n    description: 'file already exists'\r\n  },\r\n  {\r\n    errno: 48,\r\n    code: 'ESRCH',\r\n    description: 'no such process'\r\n  },\r\n  {\r\n    errno: 49,\r\n    code: 'ENAMETOOLONG',\r\n    description: 'name too long'\r\n  },\r\n  {\r\n    errno: 50,\r\n    code: 'EPERM',\r\n    description: 'operation not permitted'\r\n  },\r\n  {\r\n    errno: 51,\r\n    code: 'ELOOP',\r\n    description: 'too many symbolic links encountered'\r\n  },\r\n  {\r\n    errno: 52,\r\n    code: 'EXDEV',\r\n    description: 'cross-device link not permitted'\r\n  },\r\n  {\r\n    errno: 53,\r\n    code: 'ENOTEMPTY',\r\n    description: 'directory not empty'\r\n  },\r\n  {\r\n    errno: 54,\r\n    code: 'ENOSPC',\r\n    description: 'no space left on device'\r\n  },\r\n  {\r\n    errno: 55,\r\n    code: 'EIO',\r\n    description: 'i/o error'\r\n  },\r\n  {\r\n    errno: 56,\r\n    code: 'EROFS',\r\n    description: 'read-only file system'\r\n  },\r\n  {\r\n    errno: 57,\r\n    code: 'ENODEV',\r\n    description: 'no such device'\r\n  },\r\n  {\r\n    errno: 58,\r\n    code: 'ESPIPE',\r\n    description: 'invalid seek'\r\n  },\r\n  {\r\n    errno: 59,\r\n    code: 'ECANCELED',\r\n    description: 'operation canceled'\r\n  }\r\n]\r\n\r\nmodule.exports.errno = {}\r\nmodule.exports.code = {}\r\n\r\nall.forEach(function (error) {\r\n  module.exports.errno[error.errno] = error\r\n  module.exports.code[error.code] = error\r\n})\r\n\r\nmodule.exports.custom = __webpack_require__(/*! ./custom */ \"../node_modules/errno/custom.js\")(module.exports)\r\nmodule.exports.create = module.exports.custom.createError\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/errno/errno.js?");

/***/ }),

/***/ "../node_modules/memory-fs/lib/MemoryFileSystem.js":
/*!*********************************************************!*
  !*** ../node_modules/memory-fs/lib/MemoryFileSystem.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n\r\nvar normalize = __webpack_require__(/*! ./normalize */ \"../node_modules/memory-fs/lib/normalize.js\");\r\nvar errors = __webpack_require__(/*! errno */ \"../node_modules/errno/errno.js\");\r\nvar stream = __webpack_require__(/*! readable-stream */ \"readable-stream\");\r\n\r\nvar ReadableStream = stream.Readable;\r\nvar WritableStream = stream.Writable;\r\n\r\nfunction MemoryFileSystemError(err, path) {\r\n\tError.call(this)\r\n\tif (Error.captureStackTrace)\r\n\t\tError.captureStackTrace(this, arguments.callee)\r\n\tthis.code = err.code;\r\n\tthis.errno = err.errno;\r\n\tthis.message = err.description;\r\n\tthis.path = path;\r\n}\r\nMemoryFileSystemError.prototype = new Error();\r\n\r\nfunction MemoryFileSystem(data) {\r\n\tthis.data = data || {};\r\n}\r\nmodule.exports = MemoryFileSystem;\r\n\r\nfunction isDir(item) {\r\n\tif(typeof item !== \"object\") return false;\r\n\treturn item[\"\"] === true;\r\n}\r\n\r\nfunction isFile(item) {\r\n\tif(typeof item !== \"object\") return false;\r\n\treturn !item[\"\"];\r\n}\r\n\r\nfunction pathToArray(path) {\r\n\tpath = normalize(path);\r\n\tvar nix = /^\\//.test(path);\r\n\tif(!nix) {\r\n\t\tif(!/^[A-Za-z]:/.test(path)) {\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.EINVAL, path);\r\n\t\t}\r\n\t\tpath = path.replace(/[\\\\\\/]+/g, \"\\\\\"); // multi slashs\r\n\t\tpath = path.split(/[\\\\\\/]/);\r\n\t\tpath[0] = path[0].toUpperCase();\r\n\t} else {\r\n\t\tpath = path.replace(/\\/+/g, \"/\"); // multi slashs\r\n\t\tpath = path.substr(1).split(\"/\");\r\n\t}\r\n\tif(!path[path.length-1]) path.pop();\r\n\treturn path;\r\n}\r\n\r\nfunction trueFn() { return true; }\r\nfunction falseFn() { return false; }\r\n\r\nMemoryFileSystem.prototype.meta = function(_path) {\r\n\tvar path = pathToArray(_path);\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length - 1; i++) {\r\n\t\tif(!isDir(current[path[i]]))\r\n\t\t\treturn;\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\treturn current[path[i]];\r\n}\r\n\r\nMemoryFileSystem.prototype.existsSync = function(_path) {\r\n\treturn !!this.meta(_path);\r\n}\r\n\r\nMemoryFileSystem.prototype.statSync = function(_path) {\r\n\tvar current = this.meta(_path);\r\n\tif(_path === \"/\" || isDir(current)) {\r\n\t\treturn {\r\n\t\t\tisFile: falseFn,\r\n\t\t\tisDirectory: trueFn,\r\n\t\t\tisBlockDevice: falseFn,\r\n\t\t\tisCharacterDevice: falseFn,\r\n\t\t\tisSymbolicLink: falseFn,\r\n\t\t\tisFIFO: falseFn,\r\n\t\t\tisSocket: falseFn\r\n\t\t};\r\n\t} else if(isFile(current)) {\r\n\t\treturn {\r\n\t\t\tisFile: trueFn,\r\n\t\t\tisDirectory: falseFn,\r\n\t\t\tisBlockDevice: falseFn,\r\n\t\t\tisCharacterDevice: falseFn,\r\n\t\t\tisSymbolicLink: falseFn,\r\n\t\t\tisFIFO: falseFn,\r\n\t\t\tisSocket: falseFn\r\n\t\t};\r\n\t} else {\r\n\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t}\r\n};\r\n\r\nMemoryFileSystem.prototype.readFileSync = function(_path, encoding) {\r\n\tvar path = pathToArray(_path);\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length - 1; i++) {\r\n\t\tif(!isDir(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\tif(!isFile(current[path[i]])) {\r\n\t\tif(isDir(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.EISDIR, _path);\r\n\t\telse\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t}\r\n\tcurrent = current[path[i]];\r\n\treturn encoding ? current.toString(encoding) : current;\r\n};\r\n\r\nMemoryFileSystem.prototype.readdirSync = function(_path) {\r\n\tif(_path === \"/\") return Object.keys(this.data).filter(Boolean);\r\n\tvar path = pathToArray(_path);\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length - 1; i++) {\r\n\t\tif(!isDir(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\tif(!isDir(current[path[i]])) {\r\n\t\tif(isFile(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOTDIR, _path);\r\n\t\telse\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t}\r\n\treturn Object.keys(current[path[i]]).filter(Boolean);\r\n};\r\n\r\nMemoryFileSystem.prototype.mkdirpSync = function(_path) {\r\n\tvar path = pathToArray(_path);\r\n\tif(path.length === 0) return;\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length; i++) {\r\n\t\tif(isFile(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOTDIR, _path);\r\n\t\telse if(!isDir(current[path[i]]))\r\n\t\t\tcurrent[path[i]] = {\"\":true};\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\treturn;\r\n};\r\n\r\nMemoryFileSystem.prototype.mkdirSync = function(_path) {\r\n\tvar path = pathToArray(_path);\r\n\tif(path.length === 0) return;\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length - 1; i++) {\r\n\t\tif(!isDir(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\tif(isDir(current[path[i]]))\r\n\t\tthrow new MemoryFileSystemError(errors.code.EEXIST, _path);\r\n\telse if(isFile(current[path[i]]))\r\n\t\tthrow new MemoryFileSystemError(errors.code.ENOTDIR, _path);\r\n\tcurrent[path[i]] = {\"\":true};\r\n\treturn;\r\n};\r\n\r\nMemoryFileSystem.prototype._remove = function(_path, name, testFn) {\r\n\tvar path = pathToArray(_path);\r\n\tif(path.length === 0) {\r\n\t\tthrow new MemoryFileSystemError(errors.code.EPERM, _path);\r\n\t}\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length - 1; i++) {\r\n\t\tif(!isDir(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\tif(!testFn(current[path[i]]))\r\n\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\tdelete current[path[i]];\r\n\treturn;\r\n};\r\n\r\nMemoryFileSystem.prototype.rmdirSync = function(_path) {\r\n\treturn this._remove(_path, \"Directory\", isDir);\r\n};\r\n\r\nMemoryFileSystem.prototype.unlinkSync = function(_path) {\r\n\treturn this._remove(_path, \"File\", isFile);\r\n};\r\n\r\nMemoryFileSystem.prototype.readlinkSync = function(_path) {\r\n\tthrow new MemoryFileSystemError(errors.code.ENOSYS, _path);\r\n};\r\n\r\nMemoryFileSystem.prototype.writeFileSync = function(_path, content, encoding) {\r\n\tif(!content && !encoding) throw new Error(\"No content\");\r\n\tvar path = pathToArray(_path);\r\n\tif(path.length === 0) {\r\n\t\tthrow new MemoryFileSystemError(errors.code.EISDIR, _path);\r\n\t}\r\n\tvar current = this.data;\r\n\tfor(var i = 0; i < path.length - 1; i++) {\r\n\t\tif(!isDir(current[path[i]]))\r\n\t\t\tthrow new MemoryFileSystemError(errors.code.ENOENT, _path);\r\n\t\tcurrent = current[path[i]];\r\n\t}\r\n\tif(isDir(current[path[i]]))\r\n\t\tthrow new MemoryFileSystemError(errors.code.EISDIR, _path);\r\n\tcurrent[path[i]] = encoding || typeof content === \"string\" ? new Buffer(content, encoding) : content;\r\n\treturn;\r\n};\r\n\r\nMemoryFileSystem.prototype.join = __webpack_require__(/*! ./join */ \"../node_modules/memory-fs/lib/join.js\");\r\nMemoryFileSystem.prototype.pathToArray = pathToArray;\r\nMemoryFileSystem.prototype.normalize = normalize;\r\n\r\n// stream functions\r\n\r\nMemoryFileSystem.prototype.createReadStream = function(path, options) {\r\n\tvar stream = new ReadableStream();\r\n\tvar done = false;\r\n\tvar data;\r\n\ttry {\r\n\t\tdata = this.readFileSync(path);\r\n\t} catch (e) {\r\n\t\tstream._read = function() {\r\n\t\t\tif (done) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tdone = true;\r\n\t\t\tthis.emit('error', e);\r\n\t\t\tthis.push(null);\r\n\t\t};\r\n\t\treturn stream;\r\n\t}\r\n\toptions = options || { };\r\n\toptions.start = options.start || 0;\r\n\toptions.end = options.end || data.length;\r\n\tstream._read = function() {\r\n\t\tif (done) {\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tdone = true;\r\n\t\tthis.push(data.slice(options.start, options.end));\r\n\t\tthis.push(null);\r\n\t};\r\n\treturn stream;\r\n};\r\n\r\nMemoryFileSystem.prototype.createWriteStream = function(path, options) {\r\n\tvar stream = new WritableStream(), self = this;\r\n\ttry {\r\n\t\t// Zero the file and make sure it is writable\r\n\t\tthis.writeFileSync(path, new Buffer(0));\r\n\t} catch(e) {\r\n\t\t// This or setImmediate?\r\n\t\tstream.once('prefinish', function() {\r\n\t\t\tstream.emit('error', e);\r\n\t\t});\r\n\t\treturn stream;\r\n\t}\r\n\tvar bl = [ ], len = 0;\r\n\tstream._write = function(chunk, encoding, callback) {\r\n\t\tbl.push(chunk);\r\n\t\tlen += chunk.length;\r\n\t\tself.writeFile(path, Buffer.concat(bl, len), callback);\r\n\t}\r\n\treturn stream;\r\n};\r\n\r\n// async functions\r\n\r\n[\"stat\", \"readdir\", \"mkdirp\", \"rmdir\", \"unlink\", \"readlink\"].forEach(function(fn) {\r\n\tMemoryFileSystem.prototype[fn] = function(path, callback) {\r\n\t\ttry {\r\n\t\t\tvar result = this[fn + \"Sync\"](path);\r\n\t\t} catch(e) {\r\n\t\t\tsetImmediate(function() {\r\n\t\t\t\tcallback(e);\r\n\t\t\t});\r\n\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tsetImmediate(function() {\r\n\t\t\tcallback(null, result);\r\n\t\t});\r\n\t};\r\n});\r\n\r\n[\"mkdir\", \"readFile\"].forEach(function(fn) {\r\n\tMemoryFileSystem.prototype[fn] = function(path, optArg, callback) {\r\n\t\tif(!callback) {\r\n\t\t\tcallback = optArg;\r\n\t\t\toptArg = undefined;\r\n\t\t}\r\n\t\ttry {\r\n\t\t\tvar result = this[fn + \"Sync\"](path, optArg);\r\n\t\t} catch(e) {\r\n\t\t\tsetImmediate(function() {\r\n\t\t\t\tcallback(e);\r\n\t\t\t});\r\n\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tsetImmediate(function() {\r\n\t\t\tcallback(null, result);\r\n\t\t});\r\n\t};\r\n});\r\n\r\nMemoryFileSystem.prototype.exists = function(path, callback) {\r\n\treturn callback(this.existsSync(path));\r\n}\r\n\r\nMemoryFileSystem.prototype.writeFile = function (path, content, encoding, callback) {\r\n\tif(!callback) {\r\n\t\tcallback = encoding;\r\n\t\tencoding = undefined;\r\n\t}\r\n\ttry {\r\n\t\tthis.writeFileSync(path, content, encoding);\r\n\t} catch(e) {\r\n\t\treturn callback(e);\r\n\t}\r\n\treturn callback();\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/memory-fs/lib/MemoryFileSystem.js?");

/***/ }),

/***/ "../node_modules/memory-fs/lib/join.js":
/*!*********************************************!*
  !*** ../node_modules/memory-fs/lib/join.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var normalize = __webpack_require__(/*! ./normalize */ \"../node_modules/memory-fs/lib/normalize.js\");\r\n\r\nvar absoluteWinRegExp = /^[A-Z]:([\\\\\\/]|$)/i;\r\nvar absoluteNixRegExp = /^\\//i;\r\n\r\nmodule.exports = function join(path, request) {\r\n\tif(!request) return normalize(path);\r\n\tif(absoluteWinRegExp.test(request)) return normalize(request.replace(/\\//g, \"\\\\\"));\r\n\tif(absoluteNixRegExp.test(request)) return normalize(request);\r\n\tif(path == \"/\") return normalize(path + request);\r\n\tif(absoluteWinRegExp.test(path)) return normalize(path.replace(/\\//g, \"\\\\\") + \"\\\\\" + request.replace(/\\//g, \"\\\\\"));\r\n\tif(absoluteNixRegExp.test(path)) return normalize(path + \"/\" + request);\r\n\treturn normalize(path + \"/\" + request);\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/memory-fs/lib/join.js?");

/***/ }),

/***/ "../node_modules/memory-fs/lib/normalize.js":
/*!**************************************************!*
  !*** ../node_modules/memory-fs/lib/normalize.js ***!
  \**************************************************/
/***/ ((module) => {

eval("module.exports = function normalize(path) {\r\n\tvar parts = path.split(/(\\\\+|\\/+)/);\r\n\tif(parts.length === 1)\r\n\t\treturn path;\r\n\tvar result = [];\r\n\tvar absolutePathStart = 0;\r\n\tfor(var i = 0, sep = false; i < parts.length; i++, sep = !sep) {\r\n\t\tvar part = parts[i];\r\n\t\tif(i === 0 && /^([A-Z]:)?$/i.test(part)) {\r\n\t\t\tresult.push(part);\r\n\t\t\tabsolutePathStart = 2;\r\n\t\t} else if(sep) {\r\n\t\t\tresult.push(part[0]);\r\n\t\t} else if(part === \"..\") {\r\n\t\t\tswitch(result.length) {\r\n\t\t\t\tcase 0:\r\n\t\t\t\t\t// i. e. \"..\" => \"..\"\r\n\t\t\t\t\t// i. e. \"../a/b/c\" => \"../a/b/c\"\r\n\t\t\t\t\tresult.push(part);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 2:\r\n\t\t\t\t\t// i. e. \"a/..\" => \"\"\r\n\t\t\t\t\t// i. e. \"/..\" => \"/\"\r\n\t\t\t\t\t// i. e. \"C:\\..\" => \"C:\\\"\r\n\t\t\t\t\t// i. e. \"a/../b/c\" => \"b/c\"\r\n\t\t\t\t\t// i. e. \"/../b/c\" => \"/b/c\"\r\n\t\t\t\t\t// i. e. \"C:\\..\\a\\b\\c\" => \"C:\\a\\b\\c\"\r\n\t\t\t\t\ti++;\r\n\t\t\t\t\tsep = !sep;\r\n\t\t\t\t\tresult.length = absolutePathStart;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 4:\r\n\t\t\t\t\t// i. e. \"a/b/..\" => \"a\"\r\n\t\t\t\t\t// i. e. \"/a/..\" => \"/\"\r\n\t\t\t\t\t// i. e. \"C:\\a\\..\" => \"C:\\\"\r\n\t\t\t\t\t// i. e. \"/a/../b/c\" => \"/b/c\"\r\n\t\t\t\t\tif(absolutePathStart === 0) {\r\n\t\t\t\t\t\tresult.length -= 3;\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\ti++;\r\n\t\t\t\t\t\tsep = !sep;\r\n\t\t\t\t\t\tresult.length = 2;\r\n\t\t\t\t\t}\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tdefault:\r\n\t\t\t\t\t// i. e. \"/a/b/..\" => \"/a\"\r\n\t\t\t\t\t// i. e. \"/a/b/../c\" => \"/a/c\"\r\n\t\t\t\t\tresult.length -= 3;\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t} else if(part === \".\") {\r\n\t\t\tswitch(result.length) {\r\n\t\t\t\tcase 0:\r\n\t\t\t\t\t// i. e. \".\" => \".\"\r\n\t\t\t\t\t// i. e. \"./a/b/c\" => \"./a/b/c\"\r\n\t\t\t\t\tresult.push(part);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 2:\r\n\t\t\t\t\t// i. e. \"a/.\" => \"a\"\r\n\t\t\t\t\t// i. e. \"/.\" => \"/\"\r\n\t\t\t\t\t// i. e. \"C:\\.\" => \"C:\\\"\r\n\t\t\t\t\t// i. e. \"C:\\.\\a\\b\\c\" => \"C:\\a\\b\\c\"\r\n\t\t\t\t\tif(absolutePathStart === 0) {\r\n\t\t\t\t\t\tresult.length--;\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\ti++;\r\n\t\t\t\t\t\tsep = !sep;\r\n\t\t\t\t\t}\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tdefault:\r\n\t\t\t\t\t// i. e. \"a/b/.\" => \"a/b\"\r\n\t\t\t\t\t// i. e. \"/a/.\" => \"/\"\r\n\t\t\t\t\t// i. e. \"C:\\a\\.\" => \"C:\\\"\r\n\t\t\t\t\t// i. e. \"a/./b/c\" => \"a/b/c\"\r\n\t\t\t\t\t// i. e. \"/a/./b/c\" => \"/a/b/c\"\r\n\t\t\t\t\tresult.length--;\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t} else if(part) {\r\n\t\t\tresult.push(part);\r\n\t\t}\r\n\t}\r\n\tif(result.length === 1 && /^[A-Za-z]:$/.test(result))\r\n\t\treturn result[0] + \"\\\\\";\r\n\treturn result.join(\"\");\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/memory-fs/lib/normalize.js?");

/***/ }),

/***/ "../node_modules/mkdirp/index.js":
/*!***************************************!*
  !*** ../node_modules/mkdirp/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var path = __webpack_require__(/*! path */ \"path\");\r\nvar fs = __webpack_require__(/*! fs */ \"fs\");\r\nvar _0777 = parseInt('0777', 8);\r\n\r\nmodule.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;\r\n\r\nfunction mkdirP (p, opts, f, made) {\r\n    if (typeof opts === 'function') {\r\n        f = opts;\r\n        opts = {};\r\n    }\r\n    else if (!opts || typeof opts !== 'object') {\r\n        opts = { mode: opts };\r\n    }\r\n    \r\n    var mode = opts.mode;\r\n    var xfs = opts.fs || fs;\r\n    \r\n    if (mode === undefined) {\r\n        mode = _0777\r\n    }\r\n    if (!made) made = null;\r\n    \r\n    var cb = f || function () {};\r\n    p = path.resolve(p);\r\n    \r\n    xfs.mkdir(p, mode, function (er) {\r\n        if (!er) {\r\n            made = made || p;\r\n            return cb(null, made);\r\n        }\r\n        switch (er.code) {\r\n            case 'ENOENT':\r\n                if (path.dirname(p) === p) return cb(er);\r\n                mkdirP(path.dirname(p), opts, function (er, made) {\r\n                    if (er) cb(er, made);\r\n                    else mkdirP(p, opts, cb, made);\r\n                });\r\n                break;\r\n\r\n            // In the case of any other error, just see if there's a dir\r\n            // there already.  If so, then hooray!  If not, then something\r\n            // is borked.\r\n            default:\r\n                xfs.stat(p, function (er2, stat) {\r\n                    // if the stat fails, then that's super weird.\r\n                    // let the original error be the failure reason.\r\n                    if (er2 || !stat.isDirectory()) cb(er, made)\r\n                    else cb(null, made);\r\n                });\r\n                break;\r\n        }\r\n    });\r\n}\r\n\r\nmkdirP.sync = function sync (p, opts, made) {\r\n    if (!opts || typeof opts !== 'object') {\r\n        opts = { mode: opts };\r\n    }\r\n    \r\n    var mode = opts.mode;\r\n    var xfs = opts.fs || fs;\r\n    \r\n    if (mode === undefined) {\r\n        mode = _0777\r\n    }\r\n    if (!made) made = null;\r\n\r\n    p = path.resolve(p);\r\n\r\n    try {\r\n        xfs.mkdirSync(p, mode);\r\n        made = made || p;\r\n    }\r\n    catch (err0) {\r\n        switch (err0.code) {\r\n            case 'ENOENT' :\r\n                made = sync(path.dirname(p), opts, made);\r\n                sync(p, opts, made);\r\n                break;\r\n\r\n            // In the case of any other error, just see if there's a dir\r\n            // there already.  If so, then hooray!  If not, then something\r\n            // is borked.\r\n            default:\r\n                var stat;\r\n                try {\r\n                    stat = xfs.statSync(p);\r\n                }\r\n                catch (err1) {\r\n                    throw err0;\r\n                }\r\n                if (!stat.isDirectory()) throw err0;\r\n                break;\r\n        }\r\n    }\r\n\r\n    return made;\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/mkdirp/index.js?");

/***/ }),

/***/ "../node_modules/prr/prr.js":
/*!**********************************!*
  !*** ../node_modules/prr/prr.js ***!
  \**********************************/
/***/ (function(module) {

eval("/*!\r\n  * prr\r\n  * (c) 2013 Rod Vagg <rod@vagg.org>\r\n  * https://github.com/rvagg/prr\r\n  * License: MIT\r\n  */\r\n\r\n(function (name, context, definition) {\r\n  if ( true && module.exports)\r\n    module.exports = definition()\r\n  else\r\n    context[name] = definition()\r\n})('prr', this, function() {\r\n\r\n  var setProperty = typeof Object.defineProperty == 'function'\r\n      ? function (obj, key, options) {\r\n          Object.defineProperty(obj, key, options)\r\n          return obj\r\n        }\r\n      : function (obj, key, options) { // < es5\r\n          obj[key] = options.value\r\n          return obj\r\n        }\r\n\r\n    , makeOptions = function (value, options) {\r\n        var oo = typeof options == 'object'\r\n          , os = !oo && typeof options == 'string'\r\n          , op = function (p) {\r\n              return oo\r\n                ? !!options[p]\r\n                : os\r\n                  ? options.indexOf(p[0]) > -1\r\n                  : false\r\n            }\r\n\r\n        return {\r\n            enumerable   : op('enumerable')\r\n          , configurable : op('configurable')\r\n          , writable     : op('writable')\r\n          , value        : value\r\n        }\r\n      }\r\n\r\n    , prr = function (obj, key, value, options) {\r\n        var k\r\n\r\n        options = makeOptions(value, options)\r\n\r\n        if (typeof key == 'object') {\r\n          for (k in key) {\r\n            if (Object.hasOwnProperty.call(key, k)) {\r\n              options.value = key[k]\r\n              setProperty(obj, k, options)\r\n            }\r\n          }\r\n          return obj\r\n        }\r\n\r\n        return setProperty(obj, key, options)\r\n      }\r\n\r\n  return prr\r\n})\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/prr/prr.js?");

/***/ }),

/***/ "../node_modules/uuid/lib/bytesToUuid.js":
/*!***********************************************!*
  !*** ../node_modules/uuid/lib/bytesToUuid.js ***!
  \***********************************************/
/***/ ((module) => {

eval("/**\r\n * Convert array of 16 byte values to UUID string format of the form:\r\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\r\n */\r\nvar byteToHex = [];\r\nfor (var i = 0; i < 256; ++i) {\r\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\r\n}\r\n\r\nfunction bytesToUuid(buf, offset) {\r\n  var i = offset || 0;\r\n  var bth = byteToHex;\r\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\r\n  return ([\r\n    bth[buf[i++]], bth[buf[i++]],\r\n    bth[buf[i++]], bth[buf[i++]], '-',\r\n    bth[buf[i++]], bth[buf[i++]], '-',\r\n    bth[buf[i++]], bth[buf[i++]], '-',\r\n    bth[buf[i++]], bth[buf[i++]], '-',\r\n    bth[buf[i++]], bth[buf[i++]],\r\n    bth[buf[i++]], bth[buf[i++]],\r\n    bth[buf[i++]], bth[buf[i++]]\r\n  ]).join('');\r\n}\r\n\r\nmodule.exports = bytesToUuid;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "../node_modules/uuid/lib/rng.js":
/*!***************************************!*
  !*** ../node_modules/uuid/lib/rng.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Unique ID creation requires a high quality random # generator.  In node.js\r\n// this is pretty straight-forward - we use the crypto API.\r\n\r\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\n\r\nmodule.exports = function nodeRNG() {\r\n  return crypto.randomBytes(16);\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/uuid/lib/rng.js?");

/***/ }),

/***/ "../node_modules/uuid/v4.js":
/*!**********************************!*
  !*** ../node_modules/uuid/v4.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"../node_modules/uuid/lib/rng.js\");\r\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"../node_modules/uuid/lib/bytesToUuid.js\");\r\n\r\nfunction v4(options, buf, offset) {\r\n  var i = buf && offset || 0;\r\n\r\n  if (typeof(options) == 'string') {\r\n    buf = options === 'binary' ? new Array(16) : null;\r\n    options = null;\r\n  }\r\n  options = options || {};\r\n\r\n  var rnds = options.random || (options.rng || rng)();\r\n\r\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\r\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\r\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\r\n\r\n  // Copy bytes to buffer, if provided\r\n  if (buf) {\r\n    for (var ii = 0; ii < 16; ++ii) {\r\n      buf[i + ii] = rnds[ii];\r\n    }\r\n  }\r\n\r\n  return buf || bytesToUuid(rnds);\r\n}\r\n\r\nmodule.exports = v4;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/uuid/v4.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/index.js":
/*!*******************************************************!*
  !*** ../node_modules/webpack-dev-middleware/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst mime = __webpack_require__(/*! mime */ \"mime\");\r\n\r\nconst createContext = __webpack_require__(/*! ./lib/context */ \"../node_modules/webpack-dev-middleware/lib/context.js\");\r\nconst middleware = __webpack_require__(/*! ./lib/middleware */ \"../node_modules/webpack-dev-middleware/lib/middleware.js\");\r\nconst reporter = __webpack_require__(/*! ./lib/reporter */ \"../node_modules/webpack-dev-middleware/lib/reporter.js\");\r\nconst { setFs, toDisk } = __webpack_require__(/*! ./lib/fs */ \"../node_modules/webpack-dev-middleware/lib/fs.js\");\r\nconst { getFilenameFromUrl, noop, ready } = __webpack_require__(/*! ./lib/util */ \"../node_modules/webpack-dev-middleware/lib/util.js\");\r\n\r\nconst defaults = {\r\n  logLevel: 'info',\r\n  logTime: false,\r\n  logger: null,\r\n  mimeTypes: null,\r\n  reporter,\r\n  stats: {\r\n    colors: true,\r\n    context: process.cwd(),\r\n  },\r\n  watchOptions: {\r\n    aggregateTimeout: 200,\r\n  },\r\n  writeToDisk: false,\r\n};\r\n\r\nmodule.exports = function wdm(compiler, opts) {\r\n  const options = Object.assign({}, defaults, opts);\r\n\r\n  // defining custom MIME type\r\n  if (options.mimeTypes) {\r\n    const typeMap = options.mimeTypes.typeMap || options.mimeTypes;\r\n    const force = !!options.mimeTypes.force;\r\n    mime.define(typeMap, force);\r\n  }\r\n\r\n  const context = createContext(compiler, options);\r\n\r\n  // start watching\r\n  if (!options.lazy) {\r\n    context.watching = compiler.watch(options.watchOptions, (err) => {\r\n      if (err) {\r\n        context.log.error(err.stack || err);\r\n        if (err.details) {\r\n          context.log.error(err.details);\r\n        }\r\n      }\r\n    });\r\n  } else {\r\n    if (typeof options.filename === 'string') {\r\n      const filename = options.filename\r\n        .replace(/[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]/g, '\\\\$&') // eslint-disable-line no-useless-escape\r\n        .replace(/\\\\\\[[a-z]+\\\\\\]/gi, '.+');\r\n\r\n      options.filename = new RegExp(`^[/]{0,1}${filename}$`);\r\n    }\r\n\r\n    context.state = true;\r\n  }\r\n\r\n  if (options.writeToDisk) {\r\n    toDisk(context);\r\n  }\r\n\r\n  setFs(context, compiler);\r\n\r\n  return Object.assign(middleware(context), {\r\n    close(callback) {\r\n      // eslint-disable-next-line no-param-reassign\r\n      callback = callback || noop;\r\n\r\n      if (context.watching) {\r\n        context.watching.close(callback);\r\n      } else {\r\n        callback();\r\n      }\r\n    },\r\n\r\n    context,\r\n\r\n    fileSystem: context.fs,\r\n\r\n    getFilenameFromUrl: getFilenameFromUrl.bind(\r\n      this,\r\n      context.options.publicPath,\r\n      context.compiler\r\n    ),\r\n\r\n    invalidate(callback) {\r\n      // eslint-disable-next-line no-param-reassign\r\n      callback = callback || noop;\r\n\r\n      if (context.watching) {\r\n        ready(context, callback, {});\r\n        context.watching.invalidate();\r\n      } else {\r\n        callback();\r\n      }\r\n    },\r\n\r\n    waitUntilValid(callback) {\r\n      // eslint-disable-next-line no-param-reassign\r\n      callback = callback || noop;\r\n\r\n      ready(context, callback, {});\r\n    },\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/index.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/lib/DevMiddlewareError.js":
/*!************************************************************************!*
  !*** ../node_modules/webpack-dev-middleware/lib/DevMiddlewareError.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\nmodule.exports = class DevMiddlewareError extends Error {};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/lib/DevMiddlewareError.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/lib/context.js":
/*!*************************************************************!*
  !*** ../node_modules/webpack-dev-middleware/lib/context.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst weblog = __webpack_require__(/*! webpack-log */ \"../node_modules/webpack-log/src/index.js\");\r\n\r\nmodule.exports = function ctx(compiler, options) {\r\n  const context = {\r\n    state: false,\r\n    webpackStats: null,\r\n    callbacks: [],\r\n    options,\r\n    compiler,\r\n    watching: null,\r\n    forceRebuild: false,\r\n  };\r\n\r\n  if (options.logger) {\r\n    context.log = options.logger;\r\n  } else {\r\n    context.log = weblog({\r\n      level: options.logLevel || 'info',\r\n      name: 'wdm',\r\n      timestamp: options.logTime,\r\n    });\r\n  }\r\n\r\n  const { log } = context;\r\n\r\n  function done(stats) {\r\n    // We are now on valid state\r\n    context.state = true;\r\n    context.webpackStats = stats;\r\n\r\n    // Do the stuff in nextTick, because bundle may be invalidated\r\n    // if a change happened while compiling\r\n    process.nextTick(() => {\r\n      // check if still in valid state\r\n      if (!context.state) {\r\n        return;\r\n      }\r\n\r\n      // print webpack output\r\n      context.options.reporter(context.options, {\r\n        log,\r\n        state: true,\r\n        stats,\r\n      });\r\n\r\n      // execute callback that are delayed\r\n      const cbs = context.callbacks;\r\n      context.callbacks = [];\r\n      cbs.forEach((cb) => {\r\n        cb(stats);\r\n      });\r\n    });\r\n\r\n    // In lazy mode, we may issue another rebuild\r\n    if (context.forceRebuild) {\r\n      context.forceRebuild = false;\r\n      rebuild();\r\n    }\r\n  }\r\n\r\n  function invalid(callback) {\r\n    if (context.state) {\r\n      context.options.reporter(context.options, {\r\n        log,\r\n        state: false,\r\n      });\r\n    }\r\n\r\n    // We are now in invalid state\r\n    context.state = false;\r\n    if (typeof callback === 'function') {\r\n      callback();\r\n    }\r\n  }\r\n\r\n  function rebuild() {\r\n    if (context.state) {\r\n      context.state = false;\r\n      context.compiler.run((err) => {\r\n        if (err) {\r\n          log.error(err.stack || err);\r\n          if (err.details) {\r\n            log.error(err.details);\r\n          }\r\n        }\r\n      });\r\n    } else {\r\n      context.forceRebuild = true;\r\n    }\r\n  }\r\n\r\n  context.rebuild = rebuild;\r\n  context.compiler.hooks.invalid.tap('WebpackDevMiddleware', invalid);\r\n  context.compiler.hooks.run.tap('WebpackDevMiddleware', invalid);\r\n  context.compiler.hooks.done.tap('WebpackDevMiddleware', done);\r\n  context.compiler.hooks.watchRun.tap(\r\n    'WebpackDevMiddleware',\r\n    (comp, callback) => {\r\n      invalid(callback);\r\n    }\r\n  );\r\n\r\n  return context;\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/lib/context.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/lib/fs.js":
/*!********************************************************!*
  !*** ../node_modules/webpack-dev-middleware/lib/fs.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\n\r\nconst MemoryFileSystem = __webpack_require__(/*! memory-fs */ \"../node_modules/memory-fs/lib/MemoryFileSystem.js\");\r\nconst mkdirp = __webpack_require__(/*! mkdirp */ \"../node_modules/mkdirp/index.js\");\r\nconst { colors } = __webpack_require__(/*! webpack-log */ \"../node_modules/webpack-log/src/index.js\");\r\n\r\nconst DevMiddlewareError = __webpack_require__(/*! ./DevMiddlewareError */ \"../node_modules/webpack-dev-middleware/lib/DevMiddlewareError.js\");\r\n\r\nmodule.exports = {\r\n  toDisk(context) {\r\n    const compilers = context.compiler.compilers || [context.compiler];\r\n\r\n    for (const compiler of compilers) {\r\n      compiler.hooks.emit.tap('WebpackDevMiddleware', (compilation) => {\r\n        if (compiler.hasWebpackDevMiddlewareAssetEmittedCallback) {\r\n          return;\r\n        }\r\n\r\n        compiler.hooks.assetEmitted.tapAsync(\r\n          'WebpackDevMiddleware',\r\n          (file, info, callback) => {\r\n            let targetPath = null;\r\n            let content = null;\r\n\r\n            // webpack@5\r\n            if (info.compilation) {\r\n              ({ targetPath, content } = info);\r\n            } else {\r\n              let targetFile = file;\r\n\r\n              const queryStringIdx = targetFile.indexOf('?');\r\n\r\n              if (queryStringIdx >= 0) {\r\n                targetFile = targetFile.substr(0, queryStringIdx);\r\n              }\r\n\r\n              let { outputPath } = compiler;\r\n\r\n              // TODO Why? Need remove in future major release\r\n              if (outputPath === '/') {\r\n                outputPath = compiler.context;\r\n              }\r\n\r\n              outputPath = compilation.getPath(outputPath, {});\r\n              content = info;\r\n              targetPath = path.join(outputPath, targetFile);\r\n            }\r\n\r\n            const { writeToDisk: filter } = context.options;\r\n            const allowWrite =\r\n              filter && typeof filter === 'function'\r\n                ? filter(targetPath)\r\n                : true;\r\n\r\n            if (!allowWrite) {\r\n              return callback();\r\n            }\r\n\r\n            const { log } = context;\r\n            const dir = path.dirname(targetPath);\r\n\r\n            return mkdirp(dir, (mkdirpError) => {\r\n              if (mkdirpError) {\r\n                return callback(mkdirpError);\r\n              }\r\n\r\n              return fs.writeFile(targetPath, content, (writeFileError) => {\r\n                if (writeFileError) {\r\n                  return callback(writeFileError);\r\n                }\r\n\r\n                log.debug(\r\n                  colors.cyan(\r\n                    `Asset written to disk: ${path.relative(\r\n                      process.cwd(),\r\n                      targetPath\r\n                    )}`\r\n                  )\r\n                );\r\n\r\n                return callback();\r\n              });\r\n            });\r\n          }\r\n        );\r\n        compiler.hasWebpackDevMiddlewareAssetEmittedCallback = true;\r\n      });\r\n    }\r\n  },\r\n\r\n  setFs(context, compiler) {\r\n    if (\r\n      typeof compiler.outputPath === 'string' &&\r\n      !path.posix.isAbsolute(compiler.outputPath) &&\r\n      !path.win32.isAbsolute(compiler.outputPath)\r\n    ) {\r\n      throw new DevMiddlewareError(\r\n        '`output.path` needs to be an absolute path or `/`.'\r\n      );\r\n    }\r\n\r\n    let fileSystem;\r\n\r\n    // store our files in memory\r\n    const isConfiguredFs = context.options.fs;\r\n    const isMemoryFs =\r\n      !isConfiguredFs &&\r\n      !compiler.compilers &&\r\n      compiler.outputFileSystem instanceof MemoryFileSystem;\r\n\r\n    if (isConfiguredFs) {\r\n      // eslint-disable-next-line no-shadow\r\n      const { fs } = context.options;\r\n\r\n      if (typeof fs.join !== 'function') {\r\n        // very shallow check\r\n        throw new Error(\r\n          'Invalid options: options.fs.join() method is expected'\r\n        );\r\n      }\r\n\r\n      // eslint-disable-next-line no-param-reassign\r\n      compiler.outputFileSystem = fs;\r\n      fileSystem = fs;\r\n    } else if (isMemoryFs) {\r\n      fileSystem = compiler.outputFileSystem;\r\n    } else {\r\n      fileSystem = new MemoryFileSystem();\r\n\r\n      // eslint-disable-next-line no-param-reassign\r\n      compiler.outputFileSystem = fileSystem;\r\n    }\r\n\r\n    // eslint-disable-next-line no-param-reassign\r\n    context.fs = fileSystem;\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/lib/fs.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/lib/middleware.js":
/*!****************************************************************!*
  !*** ../node_modules/webpack-dev-middleware/lib/middleware.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\n\r\nconst mime = __webpack_require__(/*! mime */ \"mime\");\r\n\r\nconst DevMiddlewareError = __webpack_require__(/*! ./DevMiddlewareError */ \"../node_modules/webpack-dev-middleware/lib/DevMiddlewareError.js\");\r\nconst {\r\n  getFilenameFromUrl,\r\n  handleRangeHeaders,\r\n  handleRequest,\r\n  ready,\r\n} = __webpack_require__(/*! ./util */ \"../node_modules/webpack-dev-middleware/lib/util.js\");\r\n\r\n// Do not add a charset to the Content-Type header of these file types\r\n// otherwise the client will fail to render them correctly.\r\nconst NonCharsetFileTypes = /\\.(wasm|usdz)$/;\r\n\r\nmodule.exports = function wrapper(context) {\r\n  return function middleware(req, res, next) {\r\n    // fixes #282. credit @cexoso. in certain edge situations res.locals is\r\n    // undefined.\r\n    // eslint-disable-next-line no-param-reassign\r\n    res.locals = res.locals || {};\r\n\r\n    function goNext() {\r\n      if (!context.options.serverSideRender) {\r\n        return next();\r\n      }\r\n\r\n      return new Promise((resolve) => {\r\n        ready(\r\n          context,\r\n          () => {\r\n            // eslint-disable-next-line no-param-reassign\r\n            res.locals.webpackStats = context.webpackStats;\r\n            // eslint-disable-next-line no-param-reassign\r\n            res.locals.fs = context.fs;\r\n\r\n            resolve(next());\r\n          },\r\n          req\r\n        );\r\n      });\r\n    }\r\n\r\n    const acceptedMethods = context.options.methods || ['GET', 'HEAD'];\r\n\r\n    if (acceptedMethods.indexOf(req.method) === -1) {\r\n      return goNext();\r\n    }\r\n\r\n    let filename = getFilenameFromUrl(\r\n      context.options.publicPath,\r\n      context.compiler,\r\n      req.url\r\n    );\r\n\r\n    if (filename === false) {\r\n      return goNext();\r\n    }\r\n\r\n    return new Promise((resolve) => {\r\n      handleRequest(context, filename, processRequest, req);\r\n      // eslint-disable-next-line consistent-return\r\n      function processRequest() {\r\n        try {\r\n          let stat = context.fs.statSync(filename);\r\n\r\n          if (!stat.isFile()) {\r\n            if (stat.isDirectory()) {\r\n              let { index } = context.options;\r\n\r\n              // eslint-disable-next-line no-undefined\r\n              if (index === undefined || index === true) {\r\n                index = 'index.html';\r\n              } else if (!index) {\r\n                throw new DevMiddlewareError('next');\r\n              }\r\n\r\n              filename = path.posix.join(filename, index);\r\n              stat = context.fs.statSync(filename);\r\n\r\n              if (!stat.isFile()) {\r\n                throw new DevMiddlewareError('next');\r\n              }\r\n            } else {\r\n              throw new DevMiddlewareError('next');\r\n            }\r\n          }\r\n        } catch (e) {\r\n          return resolve(goNext());\r\n        }\r\n\r\n        // server content\r\n        let content = context.fs.readFileSync(filename);\r\n\r\n        content = handleRangeHeaders(content, req, res);\r\n\r\n        let contentType = mime.getType(filename) || '';\r\n\r\n        if (!NonCharsetFileTypes.test(filename)) {\r\n          contentType += '; charset=UTF-8';\r\n        }\r\n\r\n        if (!res.getHeader || !res.getHeader('Content-Type')) {\r\n          res.setHeader('Content-Type', contentType);\r\n        }\r\n\r\n        res.setHeader('Content-Length', content.length);\r\n\r\n        const { headers } = context.options;\r\n\r\n        if (headers) {\r\n          for (const name in headers) {\r\n            if ({}.hasOwnProperty.call(headers, name)) {\r\n              res.setHeader(name, context.options.headers[name]);\r\n            }\r\n          }\r\n        }\r\n\r\n        // Express automatically sets the statusCode to 200, but not all servers do (Koa).\r\n        // eslint-disable-next-line no-param-reassign\r\n        res.statusCode = res.statusCode || 200;\r\n\r\n        if (res.send) {\r\n          res.send(content);\r\n        } else {\r\n          res.end(content);\r\n        }\r\n\r\n        resolve();\r\n      }\r\n    });\r\n  };\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/lib/middleware.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/lib/reporter.js":
/*!**************************************************************!*
  !*** ../node_modules/webpack-dev-middleware/lib/reporter.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\nmodule.exports = function reporter(middlewareOptions, options) {\r\n  const { log, state, stats } = options;\r\n\r\n  if (state) {\r\n    const displayStats = middlewareOptions.stats !== false;\r\n    const statsString = stats.toString(middlewareOptions.stats);\r\n\r\n    // displayStats only logged\r\n    if (displayStats && statsString.trim().length) {\r\n      if (stats.hasErrors()) {\r\n        log.error(statsString);\r\n      } else if (stats.hasWarnings()) {\r\n        log.warn(statsString);\r\n      } else {\r\n        log.info(statsString);\r\n      }\r\n    }\r\n\r\n    let message = 'Compiled successfully.';\r\n\r\n    if (stats.hasErrors()) {\r\n      message = 'Failed to compile.';\r\n    } else if (stats.hasWarnings()) {\r\n      message = 'Compiled with warnings.';\r\n    }\r\n    log.info(message);\r\n  } else {\r\n    log.info('Compiling...');\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/lib/reporter.js?");

/***/ }),

/***/ "../node_modules/webpack-dev-middleware/lib/util.js":
/*!**********************************************************!*
  !*** ../node_modules/webpack-dev-middleware/lib/util.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst { parse } = __webpack_require__(/*! url */ \"url\");\r\nconst querystring = __webpack_require__(/*! querystring */ \"querystring\");\r\n\r\nconst parseRange = __webpack_require__(/*! range-parser */ \"range-parser\");\r\n\r\nconst HASH_REGEXP = /[0-9a-f]{10,}/;\r\n\r\n// support for multi-compiler configuration\r\n// see: https://github.com/webpack/webpack-dev-server/issues/641\r\nfunction getPaths(publicPath, compiler, url) {\r\n  const compilers = compiler && compiler.compilers;\r\n  if (Array.isArray(compilers)) {\r\n    let compilerPublicPath;\r\n\r\n    // the path portion of compilerPublicPath\r\n    let compilerPublicPathBase;\r\n\r\n    for (let i = 0; i < compilers.length; i++) {\r\n      compilerPublicPath =\r\n        compilers[i].options &&\r\n        compilers[i].options.output &&\r\n        compilers[i].options.output.publicPath;\r\n\r\n      if (compilerPublicPath) {\r\n        compilerPublicPathBase =\r\n          compilerPublicPath.indexOf('/') === 0\r\n            ? compilerPublicPath // eslint-disable-next-line\r\n            : // handle the case where compilerPublicPath is a URL with hostname\r\n              parse(compilerPublicPath).pathname;\r\n\r\n        // check the url vs the path part of the compilerPublicPath\r\n        if (url.indexOf(compilerPublicPathBase) === 0) {\r\n          return {\r\n            publicPath: compilerPublicPath,\r\n            outputPath: compilers[i].outputPath,\r\n          };\r\n        }\r\n      }\r\n    }\r\n  }\r\n  return {\r\n    publicPath,\r\n    outputPath: compiler.outputPath,\r\n  };\r\n}\r\n\r\n// eslint-disable-next-line consistent-return\r\nfunction ready(context, fn, req) {\r\n  if (context.state) {\r\n    return fn(context.webpackStats);\r\n  }\r\n\r\n  context.log.info(`wait until bundle finished: ${req.url || fn.name}`);\r\n  context.callbacks.push(fn);\r\n}\r\n\r\nmodule.exports = {\r\n  getFilenameFromUrl(pubPath, compiler, url) {\r\n    const { outputPath, publicPath } = getPaths(pubPath, compiler, url);\r\n    // localPrefix is the folder our bundle should be in\r\n    const localPrefix = parse(publicPath || '/', false, true);\r\n    const urlObject = parse(url);\r\n    let filename;\r\n\r\n    const hostNameIsTheSame = localPrefix.hostname === urlObject.hostname;\r\n\r\n    // publicPath has the hostname that is not the same as request url's, should fail\r\n    if (\r\n      localPrefix.hostname !== null &&\r\n      urlObject.hostname !== null &&\r\n      !hostNameIsTheSame\r\n    ) {\r\n      return false;\r\n    }\r\n\r\n    // publicPath is not in url, so it should fail\r\n    if (publicPath && hostNameIsTheSame && url.indexOf(publicPath) !== 0) {\r\n      return false;\r\n    }\r\n\r\n    // strip localPrefix from the start of url\r\n    if (urlObject.pathname.indexOf(localPrefix.pathname) === 0) {\r\n      filename = urlObject.pathname.substr(localPrefix.pathname.length);\r\n    }\r\n\r\n    if (\r\n      !urlObject.hostname &&\r\n      localPrefix.hostname &&\r\n      url.indexOf(localPrefix.path) !== 0\r\n    ) {\r\n      return false;\r\n    }\r\n\r\n    let uri = outputPath;\r\n\r\n    /* istanbul ignore if */\r\n    if (process.platform === 'win32') {\r\n      // Path Handling for Microsoft Windows\r\n      if (filename) {\r\n        uri = path.posix.join(outputPath || '', querystring.unescape(filename));\r\n\r\n        if (!path.win32.isAbsolute(uri)) {\r\n          uri = `/${uri}`;\r\n        }\r\n      }\r\n\r\n      return uri;\r\n    }\r\n\r\n    // Path Handling for all other operating systems\r\n    if (filename) {\r\n      uri = path.posix.join(outputPath || '', filename);\r\n\r\n      if (!path.posix.isAbsolute(uri)) {\r\n        uri = `/${uri}`;\r\n      }\r\n    }\r\n\r\n    // if no matches, use outputPath as filename\r\n    return querystring.unescape(uri);\r\n  },\r\n\r\n  handleRangeHeaders(content, req, res) {\r\n    // assumes express API. For other servers, need to add logic to access\r\n    // alternative header APIs\r\n    res.setHeader('Accept-Ranges', 'bytes');\r\n\r\n    if (req.headers.range) {\r\n      const ranges = parseRange(content.length, req.headers.range);\r\n\r\n      // unsatisfiable\r\n      if (ranges === -1) {\r\n        res.setHeader('Content-Range', `bytes */${content.length}`);\r\n        // eslint-disable-next-line no-param-reassign\r\n        res.statusCode = 416;\r\n      }\r\n\r\n      // valid (syntactically invalid/multiple ranges are treated as a\r\n      // regular response)\r\n      if (ranges !== -2 && ranges.length === 1) {\r\n        const { length } = content;\r\n\r\n        // Content-Range\r\n        // eslint-disable-next-line no-param-reassign\r\n        res.statusCode = 206;\r\n        res.setHeader(\r\n          'Content-Range',\r\n          `bytes ${ranges[0].start}-${ranges[0].end}/${length}`\r\n        );\r\n\r\n        // eslint-disable-next-line no-param-reassign\r\n        content = content.slice(ranges[0].start, ranges[0].end + 1);\r\n      }\r\n    }\r\n\r\n    return content;\r\n  },\r\n\r\n  handleRequest(context, filename, processRequest, req) {\r\n    // in lazy mode, rebuild on bundle request\r\n    if (\r\n      context.options.lazy &&\r\n      (!context.options.filename || context.options.filename.test(filename))\r\n    ) {\r\n      context.rebuild();\r\n    }\r\n\r\n    if (HASH_REGEXP.test(filename)) {\r\n      try {\r\n        if (context.fs.statSync(filename).isFile()) {\r\n          processRequest();\r\n          return;\r\n        }\r\n      } catch (e) {\r\n        // eslint-disable-line\r\n      }\r\n    }\r\n\r\n    ready(context, processRequest, req);\r\n  },\r\n\r\n  noop: () => {},\r\n\r\n  ready,\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-dev-middleware/lib/util.js?");

/***/ }),

/***/ "../node_modules/webpack-hot-middleware/helpers.js":
/*!*********************************************************!*
  !*** ../node_modules/webpack-hot-middleware/helpers.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var parse = __webpack_require__(/*! url */ \"url\").parse;\r\n\r\nexports.pathMatch = function(url, path) {\r\n  try {\r\n    return parse(url).pathname === path;\r\n  } catch (e) {\r\n    return false;\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-hot-middleware/helpers.js?");

/***/ }),

/***/ "../node_modules/webpack-hot-middleware/middleware.js":
/*!************************************************************!*
  !*** ../node_modules/webpack-hot-middleware/middleware.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = webpackHotMiddleware;\r\n\r\nvar helpers = __webpack_require__(/*! ./helpers */ \"../node_modules/webpack-hot-middleware/helpers.js\");\r\nvar pathMatch = helpers.pathMatch;\r\n\r\nfunction webpackHotMiddleware(compiler, opts) {\r\n  opts = opts || {};\r\n  opts.log =\r\n    typeof opts.log == 'undefined' ? console.log.bind(console) : opts.log;\r\n  opts.path = opts.path || '/__webpack_hmr';\r\n  opts.heartbeat = opts.heartbeat || 10 * 1000;\r\n\r\n  var eventStream = createEventStream(opts.heartbeat);\r\n  var latestStats = null;\r\n  var closed = false;\r\n\r\n  if (compiler.hooks) {\r\n    compiler.hooks.invalid.tap('webpack-hot-middleware', onInvalid);\r\n    compiler.hooks.done.tap('webpack-hot-middleware', onDone);\r\n  } else {\r\n    compiler.plugin('invalid', onInvalid);\r\n    compiler.plugin('done', onDone);\r\n  }\r\n  function onInvalid() {\r\n    if (closed) return;\r\n    latestStats = null;\r\n    if (opts.log) opts.log('webpack building...');\r\n    eventStream.publish({ action: 'building' });\r\n  }\r\n  function onDone(statsResult) {\r\n    if (closed) return;\r\n    // Keep hold of latest stats so they can be propagated to new clients\r\n    latestStats = statsResult;\r\n    publishStats('built', latestStats, eventStream, opts.log);\r\n  }\r\n  var middleware = function(req, res, next) {\r\n    if (closed) return next();\r\n    if (!pathMatch(req.url, opts.path)) return next();\r\n    eventStream.handler(req, res);\r\n    if (latestStats) {\r\n      // Explicitly not passing in `log` fn as we don't want to log again on\r\n      // the server\r\n      publishStats('sync', latestStats, eventStream);\r\n    }\r\n  };\r\n  middleware.publish = function(payload) {\r\n    if (closed) return;\r\n    eventStream.publish(payload);\r\n  };\r\n  middleware.close = function() {\r\n    if (closed) return;\r\n    // Can't remove compiler plugins, so we just set a flag and noop if closed\r\n    // https://github.com/webpack/tapable/issues/32#issuecomment-350644466\r\n    closed = true;\r\n    eventStream.close();\r\n    eventStream = null;\r\n  };\r\n  return middleware;\r\n}\r\n\r\nfunction createEventStream(heartbeat) {\r\n  var clientId = 0;\r\n  var clients = {};\r\n  function everyClient(fn) {\r\n    Object.keys(clients).forEach(function(id) {\r\n      fn(clients[id]);\r\n    });\r\n  }\r\n  var interval = setInterval(function heartbeatTick() {\r\n    everyClient(function(client) {\r\n      client.write('data: \\uD83D\\uDC93\\n\\n');\r\n    });\r\n  }, heartbeat).unref();\r\n  return {\r\n    close: function() {\r\n      clearInterval(interval);\r\n      everyClient(function(client) {\r\n        if (!client.finished) client.end();\r\n      });\r\n      clients = {};\r\n    },\r\n    handler: function(req, res) {\r\n      var headers = {\r\n        'Access-Control-Allow-Origin': '*',\r\n        'Content-Type': 'text/event-stream;charset=utf-8',\r\n        'Cache-Control': 'no-cache, no-transform',\r\n        // While behind nginx, event stream should not be buffered:\r\n        // http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering\r\n        'X-Accel-Buffering': 'no',\r\n      };\r\n\r\n      var isHttp1 = !(parseInt(req.httpVersion) >= 2);\r\n      if (isHttp1) {\r\n        req.socket.setKeepAlive(true);\r\n        Object.assign(headers, {\r\n          Connection: 'keep-alive',\r\n        });\r\n      }\r\n\r\n      res.writeHead(200, headers);\r\n      res.write('\\n');\r\n      var id = clientId++;\r\n      clients[id] = res;\r\n      req.on('close', function() {\r\n        if (!res.finished) res.end();\r\n        delete clients[id];\r\n      });\r\n    },\r\n    publish: function(payload) {\r\n      everyClient(function(client) {\r\n        client.write('data: ' + JSON.stringify(payload) + '\\n\\n');\r\n      });\r\n    },\r\n  };\r\n}\r\n\r\nfunction publishStats(action, statsResult, eventStream, log) {\r\n  var stats = statsResult.toJson({\r\n    all: false,\r\n    cached: true,\r\n    children: true,\r\n    modules: true,\r\n    timings: true,\r\n    hash: true,\r\n  });\r\n  // For multi-compiler, stats will be an object with a 'children' array of stats\r\n  var bundles = extractBundles(stats);\r\n  bundles.forEach(function(stats) {\r\n    var name = stats.name || '';\r\n\r\n    // Fallback to compilation name in case of 1 bundle (if it exists)\r\n    if (bundles.length === 1 && !name && statsResult.compilation) {\r\n      name = statsResult.compilation.name || '';\r\n    }\r\n\r\n    if (log) {\r\n      log(\r\n        'webpack built ' +\r\n          (name ? name + ' ' : '') +\r\n          stats.hash +\r\n          ' in ' +\r\n          stats.time +\r\n          'ms'\r\n      );\r\n    }\r\n    eventStream.publish({\r\n      name: name,\r\n      action: action,\r\n      time: stats.time,\r\n      hash: stats.hash,\r\n      warnings: stats.warnings || [],\r\n      errors: stats.errors || [],\r\n      modules: buildModuleMap(stats.modules),\r\n    });\r\n  });\r\n}\r\n\r\nfunction extractBundles(stats) {\r\n  // Stats has modules, single bundle\r\n  if (stats.modules) return [stats];\r\n\r\n  // Stats has children, multiple bundles\r\n  if (stats.children && stats.children.length) return stats.children;\r\n\r\n  // Not sure, assume single\r\n  return [stats];\r\n}\r\n\r\nfunction buildModuleMap(modules) {\r\n  var map = {};\r\n  modules.forEach(function(module) {\r\n    map[module.id] = module.name;\r\n  });\r\n  return map;\r\n}\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-hot-middleware/middleware.js?");

/***/ }),

/***/ "../node_modules/webpack-log/src/index.js":
/*!************************************************!*
  !*** ../node_modules/webpack-log/src/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\n/* global window: true */\r\n/* eslint-disable\r\n  no-shadow,\r\n  no-param-reassign,\r\n  space-before-function-paren\r\n*/\r\nconst uuid = __webpack_require__(/*! uuid/v4 */ \"../node_modules/uuid/v4.js\");\r\nconst colors = __webpack_require__(/*! ansi-colors */ \"ansi-colors\");\r\nconst loglevel = __webpack_require__(/*! ./loglevel */ \"../node_modules/webpack-log/src/loglevel/index.js\");\r\n\r\nconst symbols = {\r\n  trace: colors.grey('₸'),\r\n  debug: colors.cyan('➤'),\r\n  info: colors.blue(colors.symbols.info),\r\n  warn: colors.yellow(colors.symbols.warning),\r\n  error: colors.red(colors.symbols.cross)\r\n};\r\n\r\nconst defaults = {\r\n  name: '<unknown>',\r\n  level: 'info',\r\n  unique: true\r\n};\r\n\r\nconst prefix = {\r\n  level (options) {\r\n    return symbols[options.level];\r\n  },\r\n  template: `{{level}} ${colors.gray('｢{{name}}｣')}: `\r\n};\r\n\r\nfunction log (options) {\r\n  const opts = Object.assign({}, defaults, options);\r\n  const { id } = options;\r\n\r\n  opts.prefix = Object.assign({}, prefix, options.prefix);\r\n  delete opts.id;\r\n\r\n  Object.defineProperty(opts, 'id', {\r\n    get() {\r\n      if (!id) {\r\n        return this.name + (opts.unique ? `-${uuid()}` : '');\r\n      }\r\n\r\n      return id;\r\n    }\r\n  });\r\n\r\n  if (opts.timestamp) {\r\n    opts.prefix.template = `[{{time}}] ${opts.prefix.template}`;\r\n  }\r\n\r\n  const log = loglevel.getLogger(opts);\r\n\r\n  if (!Object.prototype.hasOwnProperty.call(log, 'id')) {\r\n    Object.defineProperty(log, 'id', {\r\n      get() {\r\n        return opts.id;\r\n      }\r\n    });\r\n  }\r\n\r\n  return log;\r\n}\r\n\r\nmodule.exports = log;\r\n// NOTE: this is exported so that consumers of webpack-log can use the same\r\n// version of ansi-colors to decorate log messages without incurring additional\r\n// dependency overhead\r\nmodule.exports.colors = colors;\r\n// NOTE: This is an undocumented function solely for the purpose of tests.\r\n// Do not use this method in production code. Using in production code\r\n// may result in strange behavior.\r\nmodule.exports.delLogger = function delLogger(name) {\r\n  delete loglevel.loggers[name];\r\n};\r\n\r\nmodule.exports.factories = loglevel.factories;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-log/src/index.js?");

/***/ }),

/***/ "../node_modules/webpack-log/src/loglevel/LogLevel.js":
/*!************************************************************!*
  !*** ../node_modules/webpack-log/src/loglevel/LogLevel.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\n/* global window: true */\r\n/* eslint-disable\r\n  multiline-ternary,\r\n  no-param-reassign\r\n*/\r\nconst PrefixFactory = __webpack_require__(/*! ./PrefixFactory */ \"../node_modules/webpack-log/src/loglevel/PrefixFactory.js\");\r\nconst MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"../node_modules/webpack-log/src/loglevel/MethodFactory.js\");\r\n\r\nconst defaults = {\r\n  name: +new Date(),\r\n  level: 'warn',\r\n  prefix: null,\r\n  factory: null\r\n};\r\n\r\nclass LogLevel {\r\n  constructor(options) {\r\n    // implement for some _very_ loose type checking. avoids getting into a\r\n    // circular require between MethodFactory and LogLevel\r\n    this.type = 'LogLevel';\r\n    this.options = Object.assign({}, defaults, options);\r\n    this.methodFactory = options.factory;\r\n\r\n    if (!this.methodFactory) {\r\n      const factory = options.prefix\r\n        ? new PrefixFactory(this, options.prefix)\r\n        : new MethodFactory(this);\r\n\r\n      this.methodFactory = factory;\r\n    }\r\n\r\n    if (!this.methodFactory.logger) {\r\n      this.methodFactory.logger = this;\r\n    }\r\n\r\n    this.name = options.name || '<unknown>';\r\n    // this.level is a setter, do this after setting up the factory\r\n    this.level = this.options.level;\r\n  }\r\n\r\n  get factory() {\r\n    return this.methodFactory;\r\n  }\r\n\r\n  set factory(factory) {\r\n    factory.logger = this;\r\n\r\n    this.methodFactory = factory;\r\n    this.methodFactory.replaceMethods(this.level);\r\n  }\r\n\r\n  enable() {\r\n    this.level = this.levels.TRACE;\r\n  }\r\n\r\n  disable() {\r\n    this.level = this.levels.SILENT;\r\n  }\r\n\r\n  get level() {\r\n    return this.currentLevel;\r\n  }\r\n\r\n  set level(logLevel) {\r\n    const level = this.methodFactory.distillLevel(logLevel);\r\n\r\n    if (level == null) {\r\n      throw new Error(\r\n        `loglevel: setLevel() called with invalid level: ${logLevel}`\r\n      );\r\n    }\r\n\r\n    this.currentLevel = level;\r\n    this.methodFactory.replaceMethods(level);\r\n\r\n    if (typeof console === 'undefined' && level < this.levels.SILENT) {\r\n      // eslint-disable-next-line no-console\r\n      console.warn(\r\n        'loglevel: console is undefined. The log will produce no output'\r\n      );\r\n    }\r\n  }\r\n\r\n  get levels() { // eslint-disable-line class-methods-use-this\r\n    return this.methodFactory.levels;\r\n  }\r\n}\r\n\r\nmodule.exports = LogLevel;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-log/src/loglevel/LogLevel.js?");

/***/ }),

/***/ "../node_modules/webpack-log/src/loglevel/MethodFactory.js":
/*!*****************************************************************!*
  !*** ../node_modules/webpack-log/src/loglevel/MethodFactory.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
eval("\r\n\r\n/* eslint-disable\r\n  arrow-parens,\r\n  multiline-ternary,\r\n  consistent-return,\r\n  no-param-reassign,\r\n  prefer-destructuring\r\n*/\r\nconst noop = () => {};\r\n\r\nconst levels = Symbol('levels');\r\nconst instance = Symbol('instance');\r\n\r\nclass MethodFactory {\r\n  constructor(logger) {\r\n    this[levels] = {\r\n      TRACE: 0,\r\n      DEBUG: 1,\r\n      INFO: 2,\r\n      WARN: 3,\r\n      ERROR: 4,\r\n      SILENT: 5\r\n    };\r\n\r\n    this[instance] = logger;\r\n  }\r\n\r\n  set logger(logger) {\r\n    this[instance] = logger;\r\n  }\r\n\r\n  get logger() {\r\n    return this[instance];\r\n  }\r\n\r\n  get levels() {\r\n    return this[levels];\r\n  }\r\n\r\n  get methods() {\r\n    return Object.keys(this.levels)\r\n      .map((key) => key.toLowerCase())\r\n      .filter((key) => key !== 'silent');\r\n  }\r\n\r\n  distillLevel(level) {\r\n    let result = level;\r\n\r\n    if (\r\n      typeof result === 'string' &&\r\n      typeof this.levels[result.toUpperCase()] !== 'undefined'\r\n    ) {\r\n      result = this.levels[result.toUpperCase()];\r\n    }\r\n\r\n    if (this.levelValid(result)) {\r\n      return result;\r\n    }\r\n  }\r\n\r\n  levelValid(level) {\r\n    if (\r\n      typeof level === 'number' && level >= 0 &&\r\n      level <= this.levels.SILENT\r\n    ) {\r\n      return true;\r\n    }\r\n\r\n    return false;\r\n  }\r\n  /**\r\n   * Build the best logging method possible for this env\r\n   * Wherever possible we want to bind, not wrap, to preserve stack traces.\r\n   * Since we're targeting modern browsers, there's no need to wait for the\r\n   * console to become available.\r\n   */\r\n  // eslint-disable-next-line class-methods-use-this\r\n  make(method) {\r\n    if (method === 'debug') {\r\n      method = 'log';\r\n    }\r\n\r\n    /* eslint-disable no-console */\r\n    if (typeof console[method] !== 'undefined') {\r\n      return this.bindMethod(console, method);\r\n    } else if (typeof console.log !== 'undefined') {\r\n      return this.bindMethod(console, 'log');\r\n    }\r\n\r\n    /* eslint-enable no-console */\r\n    return noop;\r\n  }\r\n\r\n  // eslint-disable-next-line class-methods-use-this\r\n  bindMethod(obj, name) {\r\n    const method = obj[name];\r\n\r\n    if (typeof method.bind === 'function') {\r\n      return method.bind(obj);\r\n    }\r\n\r\n    try {\r\n      return Function.prototype.bind.call(method, obj);\r\n    } catch (err) {\r\n      // Missing bind shim or IE8 + Modernizr, fallback to wrapping\r\n      return function result() {\r\n        // eslint-disable-next-line prefer-rest-params\r\n        return Function.prototype.apply.apply(method, [obj, arguments]);\r\n      };\r\n    }\r\n  }\r\n\r\n  replaceMethods(logLevel) {\r\n    const level = this.distillLevel(logLevel);\r\n\r\n    if (level == null) {\r\n      throw new Error(\r\n        `loglevel: replaceMethods() called with invalid level: ${logLevel}`\r\n      );\r\n    }\r\n\r\n    if (!this.logger || this.logger.type !== 'LogLevel') {\r\n      throw new TypeError(\r\n        'loglevel: Logger is undefined or invalid. Please specify a valid Logger instance.'\r\n      );\r\n    }\r\n\r\n    this.methods.forEach((method) => {\r\n      this.logger[method] = (this.levels[method.toUpperCase()] < level)\r\n        ? noop\r\n        : this.make(method);\r\n    });\r\n\r\n    // Define log.log as an alias for log.debug\r\n    this.logger.log = this.logger.debug;\r\n  }\r\n}\r\n\r\nmodule.exports = MethodFactory;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-log/src/loglevel/MethodFactory.js?");

/***/ }),

/***/ "../node_modules/webpack-log/src/loglevel/PrefixFactory.js":
/*!*****************************************************************!*
  !*** ../node_modules/webpack-log/src/loglevel/PrefixFactory.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\n/* eslint-disable\r\n  no-param-reassign,\r\n  space-before-function-paren\r\n*/\r\nconst MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"../node_modules/webpack-log/src/loglevel/MethodFactory.js\");\r\n\r\nconst defaults = {\r\n  name (options) {\r\n    return options.logger.name;\r\n  },\r\n  time () {\r\n    return new Date().toTimeString().split(' ')[0];\r\n  },\r\n  level (options) {\r\n    return `[${options.level}]`;\r\n  },\r\n  template: '{{time}} {{level}} '\r\n};\r\n\r\nclass PrefixFactory extends MethodFactory {\r\n  constructor(logger, options) {\r\n    super(logger);\r\n\r\n    this.options = Object.assign({}, defaults, options);\r\n  }\r\n\r\n  interpolate(level) {\r\n    return this.options.template.replace(/{{([^{}]*)}}/g, (stache, prop) => {\r\n      const fn = this.options[prop];\r\n\r\n      if (fn) {\r\n        return fn({ level, logger: this.logger });\r\n      }\r\n\r\n      return stache;\r\n    });\r\n  }\r\n\r\n  make(method) {\r\n    const og = super.make(method);\r\n\r\n    return (...args) => {\r\n      const [first] = args;\r\n\r\n      const output = this.interpolate(method);\r\n\r\n      if (typeof first === 'string') {\r\n        args[0] = output + first;\r\n      } else {\r\n        args.unshift(output);\r\n      }\r\n\r\n      og(...args);\r\n    };\r\n  }\r\n}\r\n\r\nmodule.exports = PrefixFactory;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-log/src/loglevel/PrefixFactory.js?");

/***/ }),

/***/ "../node_modules/webpack-log/src/loglevel/index.js":
/*!*********************************************************!*
  !*** ../node_modules/webpack-log/src/loglevel/index.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\n/* global window: true */\r\n/* eslint-disable\r\n  no-shadow,\r\n  no-param-reassign,\r\n  space-before-function-paren\r\n*/\r\nconst LogLevel = __webpack_require__(/*! ./LogLevel */ \"../node_modules/webpack-log/src/loglevel/LogLevel.js\");\r\nconst MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"../node_modules/webpack-log/src/loglevel/MethodFactory.js\");\r\nconst PrefixFactory = __webpack_require__(/*! ./PrefixFactory */ \"../node_modules/webpack-log/src/loglevel/PrefixFactory.js\");\r\n\r\nconst defaultLogger = new LogLevel({ name: 'default' });\r\nconst cache = { default: defaultLogger };\r\n\r\n// Grab the current global log variable in case of overwrite\r\nconst existing = (typeof window !== 'undefined') ? window.log : null;\r\n\r\nconst loglevel = Object.assign(defaultLogger, {\r\n  get factories() {\r\n    return {\r\n      MethodFactory,\r\n      PrefixFactory\r\n    };\r\n  },\r\n  get loggers() {\r\n    return cache;\r\n  },\r\n  getLogger(options) {\r\n    if (typeof options === 'string') {\r\n      options = { name: options };\r\n    }\r\n\r\n    if (!options.id) {\r\n      options.id = options.name;\r\n    }\r\n\r\n    const { name, id } = options;\r\n    const defaults = { level: defaultLogger.level };\r\n\r\n    if (typeof name !== 'string' || !name || !name.length) {\r\n      throw new TypeError('You must supply a name when creating a logger');\r\n    }\r\n\r\n    let logger = cache[id];\r\n\r\n    if (!logger) {\r\n      logger = new LogLevel(Object.assign({}, defaults, options));\r\n\r\n      cache[id] = logger;\r\n    }\r\n\r\n    return logger;\r\n  },\r\n  noConflict() {\r\n    if (typeof window !== 'undefined' && window.log === defaultLogger) {\r\n      window.log = existing;\r\n    }\r\n\r\n    return defaultLogger;\r\n  }\r\n});\r\n\r\nmodule.exports = loglevel;\r\n\n\n//# sourceURL=webpack://backend-skeleton/../node_modules/webpack-log/src/loglevel/index.js?");

/***/ }),

/***/ "ansi-colors":
/*!******************************!*
  !*** external "ansi-colors" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"ansi-colors\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22ansi-colors%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"body-parser\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"compression\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22compression%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"cookie-parser\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22cookie-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"cors\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22cors%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"crypto\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22express%22?");

/***/ }),

/***/ "express-jwt":
/*!******************************!*
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express-jwt\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22express-jwt%22?");

/***/ }),

/***/ "fs":
/*!*********************!*
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"fs\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"helmet\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22helmet%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"jsonwebtoken\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash/extend":
/*!********************************!*
  !*** external "lodash/extend" ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"lodash/extend\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22lodash/extend%22?");

/***/ }),

/***/ "mime":
/*!***********************!*
  !*** external "mime" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"mime\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22mime%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"mongoose\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"path\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22path%22?");

/***/ }),

/***/ "querystring":
/*!******************************!*
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"querystring\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22querystring%22?");

/***/ }),

/***/ "range-parser":
/*!*******************************!*
  !*** external "range-parser" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"range-parser\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22range-parser%22?");

/***/ }),

/***/ "readable-stream":
/*!**********************************!*
  !*** external "readable-stream" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"readable-stream\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22readable-stream%22?");

/***/ }),

/***/ "url":
/*!**********************!*
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"url\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22url%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack\");;\n\n//# sourceURL=webpack://backend-skeleton/external_%22webpack%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./server/server.js");
/******/ })()
;