import boot = require('app/boot');
import angular = require('angular');

class TreeContext<T> implements app.services.ITreeContext<T> {
  constructor(private defer: ng.IDeferred<app.services.ITreeItem<T>>) {}

  onEach(
    fn: (item: app.services.ITreeItem<T>) => void
  ): app.services.ITreeContext<T> {
    this.defer.promise.then(angular.noop, angular.noop, fn);
    return this;
  }

  result: ng.IPromise<app.services.ITreeItem<T>> = this.defer.promise;
}

class TreeConvertContext<T> extends TreeContext<T>
  implements app.services.ITreeConvertContext<T> {
  private _key: any = 'id';
  private _parentKey: any = 'parentId';

  key(name: string): app.services.ITreeConvertContext<T>;
  key(): string;
  key(name?: any) {
    if (name) {
      this._key = name;
      return this;
    }
    return this._key;
  }

  parentKey(name: string): app.services.ITreeConvertContext<T>;
  parentKey(): string;
  parentKey(name?: any) {
    if (name) {
      this._parentKey = name;
      return this;
    }
    return this._parentKey;
  }
}

class TreeResolveContext<T> extends TreeContext<T>
  implements app.services.ITreeResolveContext<T> {
  private _key: any = 'id';
  private _childrenKey: any = 'children';

  key(name: string): app.services.ITreeResolveContext<T>;
  key(): string;
  key(name?: any) {
    if (name) {
      this._key = name;
      return this;
    }
    return this._key;
  }

  childrenKey(name: string): app.services.ITreeResolveContext<T>;
  childrenKey(): string;
  childrenKey(name?: any) {
    if (name) {
      this._childrenKey = name;
      return this;
    }
    return this._childrenKey;
  }
}

class TreeUtility implements app.services.ITreeUtility {
  static $inject = ['$q', '$timeout'];

  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService) {}

  private _convert<T>(
    data: T[],
    context: app.services.ITreeConvertContext<T>,
    defer: ng.IDeferred<app.services.ITreeItem<T>>
  ): app.services.ITreeItem<T> {
    // 将键值映射成键值对
    let map: { [key: string]: app.services.ITreeItem<T> } = {};
    for (var i = 0; i < data.length; i++) {
      let current = data[i];
      map[current[context.key()]] = {
        $data: current,
        $key: current[context.key()]
      };
    }

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
      defer.notify(current);
    }

    return root;
  }

  private _resolve<T>(
    data: T,
    context: app.services.ITreeResolveContext<T>,
    defer: ng.IDeferred<app.services.ITreeItem<T>>,
    parent?: app.services.ITreeItem<T>
  ): app.services.ITreeItem<T> {
    let node: app.services.ITreeItem<T> = {
      $data: data,
      $parent: parent,
      $key: data[context.key()]
    };

    let resolvedChildren: app.services.ITreeItem<T>[] = [];
    let children = data[context.childrenKey()];
    children = angular.isArray(children) ? children : [];

    for (var i = 0; i < children.length; i++) {
      resolvedChildren.push(this._resolve(children[i], context, defer, node));
    }

    node.$children = resolvedChildren;
    delete node.$data[context.childrenKey()];

    defer.notify(node);

    return node;
  }

  private _each<T>(
    root: app.services.ITreeItem<T>,
    context: app.services.ITreeContext<T>,
    defer: ng.IDeferred<app.services.ITreeItem<T>>
  ) {
    for (var i = 0; i < root.$children.length; i++) {
      defer.notify(root.$children[i]);
      if (root.$children[i].$children) {
        this._each(root.$children[i], context, defer);
      }
    }
  }

  toTree<T>(data: T[]): app.services.ITreeConvertContext<T> {
    let defer = this.$q.defer<app.services.ITreeItem<T>>();
    let context = new TreeConvertContext<T>(defer);
    this.$timeout(() => {
      defer.resolve(this._convert<T>(data, context, defer));
    });
    return context;
  }

  resolveTree<T>(data: T): app.services.ITreeResolveContext<T> {
    let defer = this.$q.defer<app.services.ITreeItem<T>>();
    let context = new TreeResolveContext<T>(defer);
    this.$timeout(() => {
      defer.resolve(this._resolve<T>(data, context, defer));
    });
    return context;
  }

  eachTree<T>(root: app.services.ITreeItem<T>): app.services.ITreeContext<T> {
    let defer = this.$q.defer<app.services.ITreeItem<T>>();
    let context = new TreeContext<T>(defer);
    this.$timeout(() => {
      this._each<T>(root, context, defer);
      defer.resolve(root);
    });
    return context;
  }
}

boot.service('app/services/treeUtility', TreeUtility);
