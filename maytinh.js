class Model {
    constructor() {
        this.currNumber = '';
        this.operation = '';
        this.dotAllow = true;
        this.isEqual = false;
        this.displayBoxId = '';
    }
    numberModel(numberButton, displayBoxId) {
        console.log("model")
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
            if (this.currNumber == "" && this.preNumber == "") {
                this.currNumber = 0;
            }
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

        if (this.preNumber && this.currNumber == '' && this.operation) {
            this.currNumber = this.preNumber;
            this.preNumber = '';
        }

        if (!this.currNumber) return;
        this.dotAllow = true;
        if ((this.preNumber || this.preNumber === 0) && ((operationButton && !this.isEqual) || (this.isEqual))) {
            this.onSave();
        }
        if (operationButton) this.operation = operationButton;
        this.preNumber = this.currNumber;
        if (!this.isEqual) this.currNumber = '';
        this.operationButton = operationButton;
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
        if (this.operation && (this.preNumber || this.preNumber === 0))
            this.res = this.preNumber + this.operation + this.currNumber;
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
        if (!this.preNumber) return;
        if (!this.preNumber || !this.currNumber) return;
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
    trueFalseModel(displayBoxId) {
        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {
            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        if (this.currNumber > 0) {
            console.log("lớn hơn 0")
            this.currNumber = Math.abs(this.currNumber) * (-1);
        } else {
            console.log("nhỏ hơn 0")
            this.currNumber = Math.abs(this.currNumber) * 1;
        }
        this.onSum()
        console.log("đây là kết quả hiển thị" + this.res)
        this.callbackFromController(this.res)
    }
    percentModel(displayBoxId) {
        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {
            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        if (this.preNumber && this.currNumber) {
            this.currNumber = Number(this.currNumber / 100 * this.preNumber)
        }
        if (!this.preNumber && this.currNumber) {
            this.currNumber = this.currNumber / 100 * this.currNumber

        }
        this.onSum()
        this.callbackFromController(this.res)
    }
    deleteOneModel(displayBoxId) {
        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {
            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        if (this.currNumber) {
            this.currNumber = this.currNumber.substring(0, this.currNumber.length - 1);
        }
        this.onSum()
        this.callbackFromController(this.res)
    }
    deleteCruModel(displayBoxId) {
        if (this.displayBoxId != displayBoxId && this.displayBoxId != '') {
            this.currNumber = '';
            this.preNumber = '';
            this.operation = '';
            this.dotAllow = true;
            this.isEqual = false;
        }
        this.displayBoxId = displayBoxId;
        if (this.currNumber) {
            this.currNumber = "";
        }
        this.onSum()
        this.callbackFromController(this.res)
    }
};
class View {
    constructor(id) {
        this.displayBox = null;
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
                    <input type="text" id="display`+ i + `" class="dis"  value=""></input>
                </div>
                <div class="so">
                    <div class="dong">
                        <input type="button" value="CE" class="CE"></input>
                        <input type="button" class="deleteCurrNumber"  value="C" ></input>
                        <input type="button" class="deleteOne" value="[x]" ></input>
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
                        <input type="button"  class="dataNumber"  value="." data-key="."id="dot"></input>
                        <input type="button"class="dataNumber"   value="0"  ></input>
                        <input type="button" class="percent"   value="%"></input>
                        <input type="button"  class="trueFalse" value="+/-" ></input>
                    </div>
                    <div class="dong">
                        
                        <input type="button" class="daubang"  value="=" id="eq" ></input>
                    </div>
                </div>
            </div>
         </form>`
        this.root.appendChild(this.formCalculator);
    };
    addNumber(data) {
        var numberButtons = document.getElementsByClassName("dataNumber");
        console.log(numberButtons)
        //console.log(typeof (numberButtons))
        Array.from(numberButtons).forEach(function (numberButton) {
            numberButton.addEventListener('click', function () {
                console.log("view")
                var displayContent = numberButton.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBox = displayContent.id;
                if (data(numberButton.value, this.displayBox) !== false) {
                
                    var number = displayContent.value;
                    if (number == 0 && numberButton.value == ".") {
                        number = '0';
                    }
                    var newValue = number + numberButton.value;
                    displayContent.value = newValue;
                }
            });
        });
    }
    addOperation(data) {
        var operationButtons = document.getElementsByClassName("buttonOperation");
        Array.from(operationButtons).forEach(function (operationButton) {
            operationButton.addEventListener('click', function () {

                var displayContent = operationButton.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBox = displayContent.id;
                data(operationButton.value, displayContent.id);
            })
        })
    }
    renderListTodo(newValue) {
        document.getElementById(this.displayBox).value = newValue;
    }
    deleteData(handler) {
        var deletes = document.getElementsByClassName("CE");
        Array.from(deletes).forEach(function (deletee) {
            deletee.addEventListener('click', function () {
                var displayContent = deletee.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBox = displayContent.id;
                handler(displayContent.id);
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
    addButtonTF(handler) {
        var buttonTrueFalse = document.getElementsByClassName("trueFalse");
        Array.from(buttonTrueFalse).forEach(function (trueFalseName) {
            trueFalseName.addEventListener('click', function () {
                var locationButton = trueFalseName.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBoxID = locationButton.id;
                handler(this.displayBoxID)
            })
        })
    }
    addPercent(handler) {
        var buttonPercent = document.getElementsByClassName("percent");
        Array.from(buttonPercent).forEach(function (percentName) {
            percentName.addEventListener('click', function () {
                var percentButton = percentName.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBoxID = percentButton.id;
                handler(this.displayBoxID)
            })
        })
    }
    deleteOne(handler) {
        var buttonDeleteOne = document.getElementsByClassName("deleteOne");
        Array.from(buttonDeleteOne).forEach(function (deleteOneName) {
            deleteOneName.addEventListener('click', function () {
                var deleteOneButton = deleteOneName.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBoxId = deleteOneButton.id;
                handler(this.displayBoxId)
            })
        })
    }
    deleteCurrNumbers(handler) {
        var buttondeletecurrNumber = document.getElementsByClassName("deleteCurrNumber");
        Array.from(buttondeletecurrNumber).forEach(function (deleteCurrName) {
            deleteCurrName.addEventListener("click", function () {
                var deleteConButton = deleteCurrName.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
                this.displayBoxId = deleteConButton.id;
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
        this.view.addButtonTF(this.trueFalseController)
        this.view.addPercent(this.percentController)
        this.view.deleteOne(this.deleteOneController)
        this.view.deleteCurrNumbers(this.deleteCuruNumberController)
    }
    operationController = (operationButton, displayBoxId) => {
        this.view.displayBox = displayBoxId;
        this.model.operationModel(operationButton, displayBoxId)
    }
    numberCon = (numberButton, displayBox) => {
        console.log("controller")
        return this.model.numberModel(numberButton, displayBox);

    }//thêm
    caculatorController = (newValue) => {
        this.view.renderListTodo(newValue)
    }
    deleteController = (displayId) => {
        this.view.displayBox = displayId;
        this.model.deleteModel(displayId);
    }
    equalController = (displayBoxId) => {
        this.model.equalModel(displayBoxId);
    }
    trueFalseController = (displayBoxId) => {
        this.view.displayBox = displayBoxId;
        this.model.trueFalseModel(displayBoxId)
    }
    percentController = (displayBoxId) => {
        this.view.displayBox = displayBoxId;
        this.model.percentModel(displayBoxId)
    }
    deleteOneController = (displayBoxId) => {
        this.view.displayBox = displayBoxId;
        this.model.deleteOneModel(displayBoxId)
    }
    deleteCuruNumberController = (displayBoxId) => {
        this.view.displayBox = displayBoxId;
        this.model.deleteCruModel(displayBoxId)
    }
}
const app = new Controller(new Model(), new View())



