import boot = require('app/boot');
import angular = require('angular');

class TreeContext<T> implements app.services.ITreeContext<T> {
  constructor(private defer: ng.IDeferred<app.services.ITreeItem<T>>) {}
  onEach(
    fn: (item: app.services.ITreeItem<T>) => void
  ): app.services.ITreeContext<T> {
    this.eachCallback = fn;
    return this;
  }
  result: ng.IPromise<app.services.ITreeItem<T>> = this.defer.promise;
  eachCallback: (item: app.services.ITreeItem<T>) => void;
}

class TreeConvertContext<T> implements app.services.ITreeConvertContext<T> {
  constructor(private defer: ng.IDeferred<app.services.ITreeItem<T>>) {}
  private _key: any = 'id';
  private _parentKey: any = 'parentId';
  key(name: any): app.services.ITreeConvertContext<T>;
  key();
  key(name?: any) {
    if (name) {
      this._key = name;
      return this;
    }
    return this._key;
  }
  parentKey(name: any): app.services.ITreeConvertContext<T>;
  parentKey();
  parentKey(name?: any) {
    if (name) {
      this._parentKey = name;
      return this;
    }
    return this._parentKey;
  }
  onEach(
    fn: (item: app.services.ITreeItem<T>) => void
  ): app.services.ITreeContext<T> {
    this.eachCallback = fn;
    return this;
  }
  result: ng.IPromise<app.services.ITreeItem<T>> = this.defer.promise;
  eachCallback: ((item: app.services.ITreeItem<T>) => void);
}

class TreeUtility implements app.services.ITreeUtility {
  static $inject = ['$q', '$timeout'];
  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService) {}
  private convertToTree<T>(
    data: T[],
    context: app.services.ITreeConvertContext<T>
  ): app.services.ITreeItem<T> {
    // 将键值映射成键值对
    let map: { [key: string]: app.services.ITreeItem<T> } = {};
    data.forEach((item, idx, arr) => {
      let current = arr[idx];
      map[current[context.key()]] = {
        $data: current,
        $key: current[context.key()]
      };
    });

    // 构建树
    let root: app.services.ITreeItem<T> = {
      $data: null,
      $key: null,
      $children: []
    };
    for (var key in map) {
      let current = map[key];
      let parent = map[current.$data[context.parentKey()]];
      if (parent) {
        current.$parent = parent;
        (parent.$children || (parent.$children = [])).push(current);
      } else {
        current.$parent = root;
        root.$children.push(current);
      }
      (context.eachCallback || angular.noop)(current);
    }

    return root;
  }
  private doEachTree<T>(
    root: app.services.ITreeItem<T>,
    context: app.services.ITreeContext<T>
  ) {
    var self = this;
    root.$children.forEach(function(item) {
      (context.eachCallback || angular.noop)(item);
      if (item.$children) {
        self.doEachTree(item, context);
      }
    });
  }
  toTree<T>(data: T[]): app.services.ITreeConvertContext<T> {
    let self = this;
    let defer = this.$q.defer<app.services.ITreeItem<T>>();
    let context = new TreeConvertContext<T>(defer);
    this.$timeout(() => {
      defer.resolve(self.convertToTree<T>(data, context));
    });
    return context;
  }
  eachTree<T>(root: app.services.ITreeItem<T>): app.services.ITreeContext<T> {
    let self = this;
    let defer = this.$q.defer<app.services.ITreeItem<T>>();
    let context = new TreeContext<T>(defer);
    this.$timeout(() => {
      self.doEachTree<T>(root, context);
      defer.resolve(root);
    });
    return context;
  }
}

boot.service('app/services/treeUtility', TreeUtility);
