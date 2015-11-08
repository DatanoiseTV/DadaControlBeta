(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  // allow data: hrefs
  app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto|data):/);
  }]);
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  require('./hrefWhitelist')(app);
  require('./translate')(app);
};

},{"./hrefWhitelist":1,"./translate":3}],3:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  app.config(function($translateProvider) {
    $translateProvider.fallbackLanguage(['en', 'de']);
    $translateProvider.useStaticFilesLoader({
      prefix: 'nls/locale-',
      suffix: '.json'
    });
    $translateProvider.registerAvailableLanguageKeys(['en', 'de'],
      {
        'de_*': 'de',
        'en_*': 'en',
        '*': 'en'
      }
    );
    $translateProvider.determinePreferredLanguage();
  });
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  app.controller('DadaControl', [
    '$scope', 'leafletData', '$http', '$filter', 'downloadFile', '$translate',
    'jsonrpc',
    function($scope, leafletData, $http, $filter, downloadFile, $translate,
             jsonrpc) {

      $scope.selectedLanguage = $translate.use();
      $scope.$watch('selectedLanguage', function(language) {
        $translate.use(language);
      });

    }
  ]);
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  // http://odetocode.com/blogs/scott/archive/2014/10/13/confirm-password-validation-in-angularjs.aspx
  app.directive('compareTo', function() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    };
  });
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  require('./compareTo')(app);
  require('./objectLength')(app);
};

},{"./compareTo":5,"./objectLength":7}],7:[function(require,module,exports){
'use strict';

module.exports = function(app) {

  // see http://stackoverflow.com/a/25299523/1219479
  app.filter('objectLength', function() {
    return function(input) {
      if (!angular.isObject(input)) {
        return;
      }
      return Object.keys(input).length;
    };
  });
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  app.filter('base64encode', ['$window', function($window) {
    return function(input) {
      return $window.btoa(input);
    };
  }]);
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  require('./base64encode')(app);
  require('./range')(app);
};

},{"./base64encode":8,"./range":10}],10:[function(require,module,exports){
'use strict';

module.exports = function(app) {
  app.filter('range', function() {
    return function(input, a, b) {
      var res = [];
      var i;
      if (a < b) {
        for (i = a; i < b + 1; i++) {
          res.push(i);
        }
      } else {
        for (i = a; i > b - 1; i--) {
          res.push(i);
        }
      }

      return res;
    };
  });
};

},{}],11:[function(require,module,exports){
'use strict';

var dadacontrol = angular.module('DadaControl', [
  'ui.bootstrap', 'ngAnimate', 'leaflet-directive', 'pascalprecht.translate'
]);

require('./config')(dadacontrol);
require('./controllers')(dadacontrol);
require('./directives')(dadacontrol);
require('./filters')(dadacontrol);

},{"./config":2,"./controllers":4,"./directives":6,"./filters":9}]},{},[11])
//# sourceMappingURL=index.js.map
