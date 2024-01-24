import {
  d,
  fn
} from "./chunk-YXKPRT4H.js";
import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/use-immer/dist/use-immer.module.js
var import_react = __toESM(require_react());
function i(f2) {
  var u2 = (0, import_react.useState)(function() {
    return d("function" == typeof f2 ? f2() : f2, true);
  }), i2 = u2[1];
  return [u2[0], (0, import_react.useCallback)(function(t2) {
    i2("function" == typeof t2 ? fn(t2) : d(t2));
  }, [])];
}
function e(n, t2, o2) {
  var i2 = (0, import_react.useMemo)(function() {
    return fn(n);
  }, [n]);
  return (0, import_react.useReducer)(i2, t2, o2);
}
export {
  i as useImmer,
  e as useImmerReducer
};
//# sourceMappingURL=use-immer.js.map
