define(['app/boot'], function(boot) {
  'use strict';

  var informationTemplate =
    '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i>&nbsp;消息</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>';
  var errorTemplate =
    '<div><div class="modal-header"><h4 class="modal-title"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;错误</h4></div><div class="modal-body"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close()"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button></div></div>';
  var confirmTemplate =
    '<div><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;确认</h4></div><div class="modal-body clearfix"><p ng-if="$data.text">{{$data.text}}</p><ul ng-if="$data.contents"><li ng-repeat="content in $data.contents track by $index">{{content}}</li></ul></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$close(true)"><i class="glyphicon glyphicon-ok-sign"></i>&nbsp;确定</button><button class="btn btn-default" type="button" ng-click="$dismiss()"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;取消</button></div></div>';

  boot.service('app/services/popupService', [
    '$modal',
    '$q',
    function($modal, $q) {
      this.information = function(text, size) {
        var defered = $q.defer();
        $modal
          .open({
            template: informationTemplate,
            size: size ? size : 'sm',
            data: {
              text: text ? text : '操作成功'
            }
          })
          .result.then(function(result) {
            defered.resolve();
          });
        return defered.promise;
      };

      this.confirm = function(text, size) {
        var defered = $q.defer();

        defered.promise.ok = function(fn) {
          defered.promise.then(fn);
          return defered.promise;
        };

        defered.promise.cancel = function(fn) {
          defered.promise['catch'](fn);
          return defered.promise;
        };

        $modal
          .open({
            template: confirmTemplate,
            size: size ? size : 'sm',
            data: {
              text: text ? text : '是否确认操作？'
            }
          })
          .result.then(function(result) {
            if (result === true) {
              defered.resolve(result);
            } else {
              defered.reject(result);
            }
          });
        return defered.promise;
      };

      this.error = function(text, size) {
        var defered = $q.defer();
        var _data = {};
        if (text === null || text === undefined) {
          _data.text = '发生错误';
        } else if (Object.prototype.toString.call(text) === '[object Array]') {
          _data.contents = text;
        } else {
          _data.text = text;
        }
        $modal
          .open({
            template: errorTemplate,
            size: size ? size : 'sm',
            data: _data
          })
          .result.then(function(result) {
            defered.resolve(result);
          });
        return defered.promise;
      };
    }
  ]);
});
