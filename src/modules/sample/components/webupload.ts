import mod = require('modules/sample/module');
import WebUploader = require('../../../../bower_components/fex-webuploader/dist/webuploader.withoutimage');

class Controller {
  up() {
    this.$scope.uploader.upload();
  }

  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.vm = this;
    $scope.server = '';

    var uploader = new WebUploader.Uploader({
      pick: '#up',
      swf: '../../../../bower_components/fex-webuploader/dist/Uploader.swf',
      chunked: false,
      server: $scope.server //'http://103.26.1.78:611/HandlerImgUpload.ashx?EnteCode=31'
    });

    uploader.on('fileQueued', file => {
      var x = '';
    });

    uploader.on('uploadSuccess', (file, response) => {
      alert(response._raw);
    });

    uploader.on('uploadComplete', file => {});

    $scope.uploader = uploader;
  }
}

mod.controller('modules/sample/components/webupload', Controller);
