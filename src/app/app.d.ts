/// <reference path="../../node_modules/@types/angular/index.d.ts" />

export as namespace app;
export = app;

declare namespace app {
  interface IApplication {
    module(name: string, requires?: string[], fn?: Function): ng.IModule;
  }

  /**
   *
   */
  interface IAppConfig {
    serverUrl?: string;
  }

  /**
   *
   */
  interface IAjaxState {
    loading: boolean;
    url?: string;
    method?: string;
    data?: object;
  }

  /**
   *
   */
  interface IAppEnvironment {
    ajaxState: IAjaxState;
    theme?: string;
  }

  /**
   *
   */
  interface IRequireState extends ng.ui.IState {
    requires?: Array<string>;
    title?: string;
    dependencies?: Array<string>;
  }

  /**
   *
   */
  interface IRequireStateProvider extends ng.ui.IStateProvider {
    state(name: string, config: IRequireState): ng.ui.IStateProvider;
    state(config: IRequireState): ng.ui.IStateProvider;
    decorator(
      name?: string,
      decorator?: (state: IRequireState, parent: Function) => any
    ): any;
  }

  interface IExtendStateService extends ng.ui.IStateService {
    back(): ng.IPromise<any>;
  }

  /**
   *
   */
  interface IExtendRootScopeService extends ng.IRootScopeService {
    $appEnvironment: IAppEnvironment;
    $appConfig: IAppConfig;
    $data: any;
    $state: ng.ui.IStateService;
    $stateParams: ng.ui.IStateParamsService;
    $previous: ng.ui.IState;
    $previousParams: ng.ui.IStateParamsService;
  }

  export namespace factories {
    interface IHttpDataHandler {
      doResponse<TOutput>(
        response: ng.IHttpResponse<app.services.IResponseContext<TOutput>>,
        defer: ng.IDeferred<TOutput>
      );
      doError<TOutput>(
        response: ng.IHttpResponse<app.services.IResponseContext<TOutput>>,
        defer: ng.IDeferred<TOutput>
      );
    }

    interface IDelayTimerOptions {
      timeout?: number;
    }

    interface IDelayTimerFactory {
      (options: IDelayTimerOptions): services.IDelayTimer;
    }
  }

  export namespace services {
    interface IDelayTimerContext {
      callback(fn: (state) => any): IDelayTimerContext;
      canceling(fn: () => void): IDelayTimerContext;
    }

    interface IDelayTimer {
      invoke();
      cancel();
      context: IDelayTimerContext;
    }

    interface IConfirmPromise {
      ok(callback?: ((result: any) => void) | null): IConfirmPromise;
      cancel(callback?: ((reason: any) => void) | null): IConfirmPromise;
    }

    interface IRequestPromise<T> extends ng.IPromise<T> {
      cancel(): void;
    }

    interface IResponseContext<T> {
      success: boolean;
      data?: T;
      message: string;
    }

    interface IRequestDefered {
      options(opt: ng.IRequestConfig): IRequestDefered;
      post<TInput, TOutput>(param: TInput): IRequestPromise<TOutput>;
      get<TOutput>(): IRequestPromise<TOutput>;
    }

    /**
     *
     */
    interface IHttpService {
      /**
       *
       * @param url
       */
      get<TOutput>(url: string): app.services.IRequestPromise<TOutput>;

      /**
       *
       * @param url
       * @param param
       */
      post<TInput, TOutput>(
        url: string,
        param: TInput
      ): app.services.IRequestPromise<TOutput>;
    }

    /**
     *
     */
    interface IPopupService {
      /**
       *
       * @param text
       * @param size
       */
      information(text: string, size?: string): ng.IPromise<any>;

      /**
       *
       * @param text
       * @param size
       */
      confirm(text: string, size?: string): IConfirmPromise;

      /**
       *
       * @param text
       * @param size
       */
      error(text: string | Array<any>, size?: string): ng.IPromise<any>;
    }

    interface ITreeItem<T> {
      $data: T;
      $parent?: ITreeItem<T>;
      $children?: ITreeItem<T>[];
      $key: string;
    }

    interface ITreeContext<T> {
      onEach(fn: ((item: ITreeItem<T>) => void)): ITreeContext<T>;
      result: ng.IPromise<ITreeItem<T>>;
    }

    interface ITreeConvertContext<T> extends ITreeContext<T> {
      key(name: string): ITreeConvertContext<T>;
      key(): string;
      parentKey(name: string): ITreeConvertContext<T>;
      parentKey(): string;
    }

    interface ITreeResolveContext<T> extends ITreeContext<T> {
      key(name: string): ITreeResolveContext<T>;
      key(): string;
      childrenKey(name: string): ITreeResolveContext<T>;
      childrenKey(): string;
    }

    /**
     * 树结构工具类
     */
    interface ITreeUtility {
      /**
       * 数组转换成树
       * @param data
       */
      toTree<T>(data: Array<T>): ITreeConvertContext<T>;

      /**
       * 处理树节点，将树转化成标准结构
       * @param data
       */
      resolveTree<T>(data: T): ITreeResolveContext<T>;

      /**
       * 遍历树
       * @param root
       */
      eachTree<T>(root: ITreeItem<T>): ITreeContext<T>;
    }
  }
}
