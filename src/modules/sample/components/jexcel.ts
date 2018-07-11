import mod = require('modules/sample/module');
import $ = require('jquery');
import 'jquery.jexcel';

enum CellType {
  实时 = 'real',
  日 = 'day',
  月 = 'month',
  年 = 'year',
  公式 = 'exp'
}

interface IJExcelScope extends ng.IScope {
  data: any[];
  datatext: string;
  vm: Controller;
}

class Controller {
  update() {
    try {
      this.$scope.data = eval(this.$scope.datatext);
      this.table.jexcel('setData', this.$scope.data, false);
    } catch (e) {
      console.error(e);
    }
  }

  private table: any;
  static $inject = ['$scope', '$element'];
  constructor(private $scope: IJExcelScope, private $element: JQLite) {
    $scope.vm = this;
    $scope.data = [
      [
        {
          text: 'Furnace', //text 和其他不能同时存在 text 就是表头之类的静态数据
          'tag:': 'kV', //kv为标签的key 通过kV信息配合type 调用以上的相应函数获取数据。
          type: CellType.实时, //real 实时，day 日 ，month月，year年 //公式
          value: '', //真正的数据，隐藏字段，可以根据需要是否存在
          unit: '', //如果不为空取得数据显示在值得后面。
          fun: function(data) {
            //作为扩展项  对于实时数据基本没用，对于多个值得数据，需要通过数据显示在多个单元格里面，如日报
          }
        },
        {
          text: 'Furnace1', //text 和其他不能同时存在 text 就是表头之类的静态数据
          'tag:': 'kV1', //kv为标签的key 通过kV信息配合type 调用以上的相应函数获取数据。
          type: CellType.实时, //real 实时，day 日 ，month月，year年 //公式
          value: '', //真正的数据，隐藏字段，可以根据需要是否存在
          unit: '', //如果不为空取得数据显示在值得后面。
          fun: function(data) {
            //作为扩展项  对于实时数据基本没用，对于多个值得数据，需要通过数据显示在多个单元格里面，如日报
          }
        }
      ]
    ];

    $scope.datatext = JSON.stringify($scope.data);

    this.table = $('#mytable');
    this.table.jexcel({ data: $scope.data });
  }
}

mod.controller('modules/sample/components/jexcel', Controller);
