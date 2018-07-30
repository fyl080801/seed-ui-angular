import mod = require('modules/sample/module');

interface IVideo {
  element: HTMLMediaElement;
}

interface IVideoScope extends ng.IScope {
  video: IVideo;
  audio: boolean;
  autoplay: boolean;
}

class Controller {
  success(stream: MediaStream) {
    this.$scope.video.element.src = (
      window.URL || window['webkitURL']
    ).createObjectURL(stream);
  }

  static $inject = ['$scope'];
  constructor(private $scope: IVideoScope) {}
}

function directive(): ng.IDirective {
  return {
    replace: true,
    template: '<video></video>',
    scope: {
      video: '=ngVideo',
      audio: '@',
      autoplay: '@'
    },
    controller: Controller,
    link: (
      scope: IVideoScope,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes,
      controller?: Controller
    ) => {
      if (scope.autoplay) {
        instanceAttributes.$set('autoplay', 'autoplay');
      }

      var videoObj: MediaStreamConstraints = {
        video: true,
        audio: scope.audio
      };

      if (navigator.getUserMedia) {
        navigator.mediaDevices.getUserMedia(videoObj).then(stream => {
          controller.success(stream);
        });
      } else if (navigator['webkitGetUserMedia']) {
        navigator.mediaDevices['webkitGetUserMedia'](videoObj).then(stream => {
          controller.success(stream);
        });
      } else if (navigator['mozGetUserMedia']) {
        navigator.mediaDevices['mozGetUserMedia'](videoObj).then(stream => {
          controller.success(stream);
        });
      }

      scope.video = {
        element: $(instanceElement).get(0) as HTMLMediaElement
      };
    }
  };
}

mod.directive('ngVideo', directive);
