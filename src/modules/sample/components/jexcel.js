define(["require", "exports", "modules/sample/module", "jquery.jexcel"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var CellType;
    (function (CellType) {
        CellType["\u5B9E\u65F6"] = "real";
        CellType["\u65E5"] = "day";
        CellType["\u6708"] = "month";
        CellType["\u5E74"] = "year";
        CellType["\u516C\u5F0F"] = "exp";
    })(CellType || (CellType = {}));
    var Controller = (function () {
        function Controller($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            $scope.vm = this;
            $scope.data = [
                [
                    {
                        text: 'Furnace',
                        'tag:': 'kV',
                        type: CellType.实时,
                        value: '',
                        unit: '',
                        fun: function (data) {
                        }
                    },
                    {
                        text: 'Furnace1',
                        'tag:': 'kV1',
                        type: CellType.实时,
                        value: '',
                        unit: '',
                        fun: function (data) {
                        }
                    }
                ]
            ];
            $scope.datatext = JSON.stringify($scope.data);
            this.table = $('#mytable');
            this.table.jexcel({ data: $scope.data });
        }
        Controller.prototype.update = function () {
            try {
                this.$scope.data = eval(this.$scope.datatext);
                this.table.jexcel('setData', this.$scope.data, false);
            }
            catch (e) {
                console.error(e);
            }
        };
        Controller.$inject = ['$scope', '$element'];
        return Controller;
    }());
    mod.controller('modules/sample/components/jexcel', Controller);
});
//# sourceMappingURL=jexcel.js.map