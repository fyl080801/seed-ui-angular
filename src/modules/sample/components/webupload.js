define(["require", "exports", "modules/sample/module", "../../../../bower_components/fex-webuploader/dist/webuploader.withoutimage"], function (require, exports, mod, WebUploader) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
            $scope.vm = this;
            $scope.server = '';
            var uploader = new WebUploader.Uploader({
                pick: '#up',
                swf: '../../../../bower_components/fex-webuploader/dist/Uploader.swf',
                chunked: false,
                server: $scope.server
            });
            uploader.on('fileQueued', function (file) {
                var x = '';
            });
            uploader.on('uploadSuccess', function (file, response) {
                alert(response._raw);
            });
            uploader.on('uploadComplete', function (file) { });
            $scope.uploader = uploader;
        }
        Controller.prototype.up = function () {
            this.$scope.uploader.upload();
        };
        Controller.$inject = ['$scope'];
        return Controller;
    }());
    mod.controller('modules/sample/components/webupload', Controller);
});
//# sourceMappingURL=webupload.js.map