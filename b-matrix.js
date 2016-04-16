(function () {

    var app = angular.module('appMatrix', []);

    var digMap = {
        square : [
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}]
        ],
        currentRow : 0,
        currentCol : 0,
        mouseOut : true
    }

    app.controller('MatrixController', function ($timeout) { 

        this.digMap = digMap;
        this.offsetLeft = 0;
        this.offsetTop = 0;
        this.timer = 0;

        this.addCol = function () {
            this.digMap.square.map(function (row) {
                return row.push({});
            });
        }

        this.addRow = function () {
            this.digMap.square.push(this.digMap.square[0].slice(0));
        }

        this.delCol = function () {
            this.digMap.square.map(function (row) {
                return row.splice(digMap.currentCol, 1);    
            });

            if (this.digMap.currentCol === this.digMap.square[0].length) {                      
                tBody = document.getElementsByClassName("b-matrix__table")[0].children[0];         
                this.overTable({ target: tBody.children[0].children[this.digMap.currentCol - 1] });
            }
        }

        this.delRow = function () {
            this.digMap.square.splice(this.digMap.currentRow, 1);

            if (this.digMap.currentRow === this.digMap.square.length) {
                tBody = document.getElementsByClassName("b-matrix__table")[0].children[0];
                this.overTable({ target: tBody.children[this.digMap.currentRow -1].children[0] });
            }
        }    


        this.isShowDelCol = function () {
            return this.digMap.square[0].length > 1 && !this.digMap.mouseOut;
        }

        this.isShowDelRow = function () {
            return this.digMap.square.length > 1 && !this.digMap.mouseOut;
        }

        this.overTable = function (event) {
            this.digMap.currentRow = event.target.parentElement.rowIndex;
            this.digMap.currentCol = event.target.cellIndex;
            this.offsetTop = event.target.offsetTop;
            this.offsetLeft = event.target.offsetLeft;
            this.digMap.mouseOut = false;
        }

        this.mStyleCol = function () {
            return {
                left: this.offsetLeft + 'px'
            };
        }

        this.mStyleRow = function () {
            return {
                top: this.offsetTop + 'px'
            };
        }

        this.leaveDiv = function () {
            this.timer = $timeout(function () {
                digMap.mouseOut = true;
            }, 500);
        }

        this.overDiv = function () {
            $timeout.cancel(this.timer);
        }

    });
})();