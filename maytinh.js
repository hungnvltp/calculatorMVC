class Model {
    constructor() {
        this.currNumber = '';
        this.preNumber = '';
        this.operation = '';
        this.dotAllow = true;
        this.isEqual = false;
        this.displayBoxId = '';


    }
    numberModel(numberButton, displayBoxId) {
        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {
            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        if (numberButton == '.' && !this.dotAllow) return false;
        if (numberButton == '.' && this.dotAllow) {
            this.dotAllow = false;
        }
        this.currNumber = this.currNumber + numberButton;

    }
    operationModel(operationButton, displayBoxId) {
        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {

            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        //this.operationButton = operationButton;
        if (!this.currNumber) return;
        this.dotAllow = true;
        if ((this.preNumber || this.preNumber === 0) && ((operationButton && !this.isEqual) || (this.isEqual))) {
            this.onSave();

        }
        if (operationButton) this.operation = operationButton;
        this.preNumber = this.currNumber;

        if (!this.isEqual) this.currNumber = '';
        this.onSum();
        this.callbackFromController(this.res)
    };
    onSave() {
        this.res = '';

        if (this.preNumber === false || this.preNumber === '' || !this.currNumber) return;
        this.currNumber = parseFloat(this.currNumber);
        this.preNumber = parseFloat(this.preNumber);
        switch (this.operation) {
            case '+':
                this.res = this.preNumber + this.currNumber;
                break;
            case '-':
                this.res = this.preNumber - this.currNumber;
                break;
            case '*':
                this.res = this.preNumber * this.currNumber;
                break;
            case '/':
                this.res = this.preNumber / this.currNumber;
                break;
        }
        this.currNumber = this.res;
        this.operation = '';
        this.preNumber = '';
        this.res = '';
    }
    onSum() {
        this.res = this.currNumber + this.operation;
        if (this.operation && (this.preNumber || this.preNumber === 0)) this.res = this.preNumber + this.operation + this.currNumber;
    }
    caculatorModel(callback) {
        this.callbackFromController = callback;
    }
    deleteModel() {
        this.dotAllow = true;
        this.currNumber = '';
        this.preNumber = '';
        this.operation = '';
        this.res = '';
        this.callbackFromController(this.res)
    }
    equalModel(displayBoxId) {

        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {

            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        this.isEqual = true;
        this.operationModel(null, displayBoxId);
        this.preNumber = '';
        this.isEqual = false;
        this.callbackFromController(this.res)

    }
};
class View {
    constructor(id) {
        this.displayBox = null;
        this.root = document.querySelector("root");
        var i = 1;
        for (i = 1; i < 6; i++) {
            this.calculator(i);
        }
    }
    calculator(i) {
        this.root = document.querySelector("#root");
        this.formCalculator = document.createElement('div');
        this.formCalculator.innerHTML = `
        <form>
              <div class="mayTinh">
                <div class="manHinh">
                    <input type="text" id="display`+ i + `" class="dis"  value="0"></input>
                </div>
                <div class="so">
                    <div class="dong">
                        <input type="button" value="CE" class="CE"></input>
                   <input type="button"  class="dataNumber"  value="." data-key="."id="dot"></input>
                        <input type="button" class="phantram"  value="%" id="phanTram"></input>
                        <input type="button" class="buttonOperation"  value="/"id="chia" ></input>
                    </div>
                    <div class="dong">
                        <input type="button"  class="dataNumber" value="7" id="key7" ></input>
                        <input type="button" class="dataNumber"  value="8" id="key8"></input>
                        <input type="button" class="dataNumber"   value="9" id="key9"></input>
                        <input type="button" class="buttonOperation"value="*" id="mult" ></input>
                    </div>
                    <div class="dong">
                        <input type="button" class="dataNumber" value="4" id="key4"></input>
                        <input type="button" class="dataNumber"  value="5" id="key5"></input>
                        <input type="button" class="dataNumber"   value="6" id="key6"></input>
                        <input type="button" class="buttonOperation"  value="-" id="sub" ></input>
                    </div>
                    <div class="dong">
                        <input type="button"  class="dataNumber" value="1" id="key1"></input>
                        <input type="button" class="dataNumber"   value="2" id="key2"></input>
                        <input type="button" class="dataNumber" value="3" id="key3"></input>
                        <input type="button" class="buttonOperation"  value="+" id="add" ></input>
                    </div>
                    <div class="dong">
                        <input type="button"class="dataNumber"   value="0"  id="key0" ></input>
                        <input type="button" class="daubang"  value="=" id="eq" ></input>
                    </div>
                </div>
            </div>
         </form>`
        this.root.appendChild(this.formCalculator);
    };
    addNumber(data) {
        var numberButtons = document.getElementsByClassName("dataNumber");
        Array.from(numberButtons).forEach(function (numberButton) {
            numberButton.addEventListener('click', function () {
                var displayContent = numberButton.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBox = displayContent.id;
                if (data(numberButton.value, currNumber, this.displayBox) !== false) {
                    var currNumber = displayContent.value;

                    if (currNumber == 0) currNumber = '';
                    var newValue = currNumber + numberButton.value;
                    displayContent.value = newValue;
                    console.log(numberButton.value)
                }
            });
        });
    }
    addOperation(data,) {
        var operationButtons = document.getElementsByClassName("buttonOperation");
        Array.from(operationButtons).forEach(function (operationButton) {
            operationButton.addEventListener('click', function () {
                var displayContent = operationButton.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBox = displayContent.id;
                data(operationButton.value, displayContent.id);
            })
        })
    }//thêm
    renderListTodo(newValue, ) {
        document.getElementById(this.displayBox).value = newValue; // lấy từ thuộc
    }
    deleteData(handler) {
        var deletes = document.getElementsByClassName("CE");
        Array.from(deletes).forEach(function (deletee) {
            deletee.addEventListener('click', function () {
                var deletess = deletee.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                handler();
            })
        })
    }
    equal(handler) {
        var equals = document.getElementsByClassName("daubang");
        Array.from(equals).forEach(function (equalss) {
            equalss.addEventListener('click', function () {
                var equall = equalss.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBoxId = equall.id;
                handler(this.displayBoxId)
            })
        })
    }
};
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        //thêm
        this.model.caculatorModel(this.caculatorController);
        this.view.addOperation(this.operationController);
        this.view.addNumber(this.numberCon);
        this.view.deleteData(this.deleteController)
        this.view.equal(this.equalController)
    }
    operationController = (operationButton, displayBoxId) => {
        this.view.displayBox = displayBoxId;
        this.model.operationModel(operationButton, displayBoxId)
    }
    numberCon = (numberButton, currNumber, displayBox) => {
        return this.model.numberModel(numberButton, displayBox);

    }//thêm
    caculatorController = (newValue) => {
        this.view.renderListTodo(newValue)
    }
    deleteController = (deletes) => {
        this.model.deleteModel(deletes);
    }
    equalController = (displayBoxId) => {
        this.model.equalModel(displayBoxId);
    }
}
const app = new Controller(new Model(), new View())