import data from './elements.json' assert { type: 'json' };


var btnContentBuilder = document.getElementById("btnContentBuilder");
btnContentBuilder.onclick = function () { ContentBuilder() };
function ContentBuilder() {
    var elementCount = document.getElementById("elementCount").value;
    var content = document.getElementById("content");
    content.innerHTML = '';
    for (let index = 1; index <= elementCount; index++) {
        debugger;
        if (index % 3 == 1) {
            var container = document.createElement("div");
            container.className = "row  d-flex justify-content-center";
            content.appendChild(container);
        }

        var elementDiv = document.createElement("div");
        elementDiv.className = "from-group col-sm-12 col-md-12 mt-2";

        var selectList = document.createElement("select");
        selectList.className = "form-control"

        for (let index = 0; index < data.length; index++) {
            var option = document.createElement("option");
            option.value = data[index].Symbol;
            option.text = data[index].Element;
            selectList.appendChild(option);
        }
        selectList.id = `elements${index}`
        elementDiv.appendChild(selectList);

        var InputPercent = document.createElement("input");
        InputPercent.className = "form-control";
        InputPercent.type = "number";
        InputPercent.placeholder = "%değer giriniz.";
        InputPercent.id = `elementPercent${index}`;
        elementDiv.appendChild(InputPercent);

        var InputGr = document.createElement("input");
        InputGr.className = "form-control";
        InputGr.type = "number";
        InputGr.placeholder = "gram değeri giriniz";
        InputGr.id = `elementGr${index}`;
        elementDiv.appendChild(InputGr);

        var ResultBox = document.createElement("input");
        ResultBox.className = "form-control";
        ResultBox.type = "number";
        ResultBox.id = `elementResult${index}`
        ResultBox.disabled = true;
        elementDiv.appendChild(ResultBox);
        container.appendChild(elementDiv);
    }
    var buttonsDiv = document.createElement("div");
    buttonsDiv.className = "form-control col-sm-12 col-md-12 mt-4"

    var exceptionLabel = document.createElement("label");
    exceptionLabel.className = "form-control text-danger text-center";
    exceptionLabel.id = "exceptionLabel";
    exceptionLabel.style.visibility = "hidden";
    buttonsDiv.appendChild(exceptionLabel);

    var resultButton = document.createElement("button");
    resultButton.className = "form-control bg-success text-white";
    resultButton.id = "btnResult";
    resultButton.textContent = "Hesapla";
    buttonsDiv.appendChild(resultButton);

    var clearButton = document.createElement("button");
    clearButton.className = "form-control bg-warning text-white";
    clearButton.id = "btnClear";
    clearButton.textContent = "Temizle";
    buttonsDiv.appendChild(clearButton);

    content.appendChild(buttonsDiv);

    var btnClear = document.getElementById("btnClear");
    btnClear.onclick = function () { Clear() }

    var btnCalculate = document.getElementById("btnResult");
    btnCalculate.onclick = function () { Calculate() };
}

function Calculate() {
    var elementCount = document.getElementById("elementCount").value;
    let elements = [];
    var totalMass = 0;
    var totalPercent = 0;
    for (let index = 1; index <= elementCount; index++) {
        const element = {};
        var elementSymbol = document.getElementById(`elements${index}`).value;
        element.atomicMass = data.find(x => x.Symbol == elementSymbol).AtomicMass;
        element.percent = document.getElementById(`elementPercent${index}`).value;
        element.gr = document.getElementById(`elementGr${index}`).value;
        element.ResultBox = document.getElementById(`elementResult${index}`);
        elements.push(element);
        totalMass += element.atomicMass * element.percent;
        totalPercent += parseInt(element.percent);
    }

    if (totalPercent > 100) {
        exceptionLabel.style.visibility = "visible";
        exceptionLabel.textContent = "Toplam yüzde %100'den fazla olamaz";
        return;
    }
    else if (totalPercent != 100) {
        exceptionLabel.style.visibility = "visible";
        exceptionLabel.textContent = "Toplam yüzde %100'e eşit olmalıdır";
        return;
    }
    else {
        exceptionLabel.style.visibility = "hidden"
    }
    elements.forEach(x => {
        var result = ((x.atomicMass * x.percent) / totalMass) * x.gr;
        x.ResultBox.value = result.toString();
    });

}

function Clear() {
    debugger;
    var elementCount = document.getElementById("elementCount").value;
    for (let index = 1; index <= elementCount; index++) {
        document.getElementById(`elementPercent${index}`).value = ' ';
        document.getElementById(`elementGr${index}`).value = ' ';
        document.getElementById(`elementResult${index}`).value = ' ';
    }
}

