var cpuStore = [];
var moboStore = [];

$("#btn-start").on("click", firstInstructions);

function createButton(value, component) {
    console.log(component);
    var btnArea = $('#btn-area');
    var btn = $('<button>' + value + '</button>');
    btn.attr('class', 'btn');
    btn.attr('component', component);

    if (value === 'AMD') { //si el botón es amd o inte se le añade una brand con su marca y llama a la función que recogerá los datos de uno u otro
        var amd = btn.attr('brand', 'AMD');
        amd.on("click", function () { printComponents(component, value) })
    } else if (value === 'Intel') {
        var intel = btn.attr('brand', 'Intel');
        intel.on("click", function () { printComponents(component, value) })
    }


    btn.on("click", selector);
    btnArea.append(btn);
}

function firstInstructions() {
    var component = 'CPU';
    var text = '<p>Vamos a comenzar seleccionando nuestra CPU, para ello contamos con dos principales marcas en el sector de CPU X86, que son AMD e INTEL</p>';
    steps(component, text);
}

function steps(component, text) {
    var textArea = $('#text-area');
    textArea.empty();
    $('#content-title').text(component);
    var p = $(text);
    textArea.append(p);

    var btnArea = $('#btn-area');
    btnArea.empty();
    var value = 'Siguiente';
    createButton(value, component);
}

function selector() {
    var compAttr = $(this).attr('component');

    if (compAttr !== 'CPU' && compAttr !== 'GPU') { //entra aquí si no es ni GPU ni CPU

        if (compAttr === 'motherboard') { //sólo entra aquí si el componente es una motherboard
            printComponents(compAttr, cpuStore[1].replace('+', ''));
        }

    } else if (compAttr !== 'CPU' || compAttr !== 'GPU') { //entra aquí si es GPU o CPU

        $.get('http://localhost:3000/' + compAttr, function getType(response) {
            var cpuObj = response;
            var addedBrands = []; //crea variable con array para almacenar cuantas marcas de cpu existen en la base de datos

            for (var i = 0; i < cpuObj.length; i++) { //for que recorre el array de cpus existentes en la bbdd
                var brand = cpuObj[i].brand; //recogemos el valor de las marcas existentes

                if (!addedBrands.includes(brand)) { //si la marca de cpu no se encuentra dentro del array lo incluye dentro, así podemos crear luego dos botones para cada marca
                    addedBrands.push(brand);
                }
            }

            var btnArea = $('#btn-area');
            btnArea.empty();

            for (var i = 0; i < addedBrands.length; i++) {
                createButton(addedBrands[i], compAttr);
            }
        });
    }
}

function printComponents(component, brand) {
    var textArea = $('#text-area');
    textArea.empty();

    //createBackButton(cont);

    var tableArea = $('#table-area');
    tableArea.empty();

    tableHeadBuilder(tableArea, component);

    var tableComponentBody = $('<tbody></tbody>');
    tableArea.append(tableComponentBody);

    tableBodyBuilder(tableArea, component, brand, tableComponentBody);
};

function tableHeadBuilder(tableArea, component, tableComponentBody) {
    var socketColum;

    if (component === 'CPU' || component === 'motherboard') {
        socketColum = '<th> Socket ▼ </th>';
    } else {
        socketColum = '';
    }

    var headRow = $('<thead><tr><th> Nombre ▼ </th>' + socketColum + '<th> Consumo (Watios) ▼ </th><th> Precio (Euros) ▼ </th></tr></thead>');
    tableArea.append(headRow);
}

function tableBodyBuilder(tableArea, component, brand, tableComponentBody) {
    $.get('http://localhost:3000/' + component + '/' + brand, function getType(response) {
        var compObj = response;

        console.log(response);

        for (var i = 0; i < compObj.length; i++) {
            var name;
            if (component === 'CPU') {
                name = compObj[i].model;
            } else {
                name = compObj[i].name;
            };
            var tdp = compObj[i].tdp;
            var price = '<b>' + compObj[i].price + '</b>';
            tableArea.removeAttr('hidden');

            var optProp; //propiedad que varía según el componente
            if (component === 'CPU' || component === 'motherboard') {
                var socket = compObj[i].socket;
                optProp = '<td id="socket">' + socket + '</td>';
            } else {
                optProp = '';
            }

            var compRow = $('<tr class=' + component + '><td id="name">' + name + '</td>' + optProp + '<td id="watts">' + tdp + '</td><td id="eur">' + price + '</td></tr>');

            compRow.on("click", result);

            tableComponentBody.append(compRow);
        }
        tableArea.tablesorter();
    })
}

function result() {
    var tableArea = $('#table-area');
    tableArea.empty();

    pcComponent = $(this)[0].cells; //saca a una variable los datos de un componente (puede ser cpu,mobo,gpu...)

    if ($(this).attr('class') === 'CPU') {
        
        for (i = 0; i < pcComponent.length; i++) {
            cpuStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'motherboard';
        var text = '<p>Ahora pasaremos a elegir la placa base para nuestro procesador, para ayudarte, sólo se van a mostrar aquellas placas compatibles con el socket del procesador seleccionado.</p>'
        steps(component, text);

    } else if ($(this).attr('class') === 'motherboard') {
        
        for (i = 0; i < pcComponent.length; i++) {
            moboStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'GPU';
        var text = '<p>Ahora pasaremos a elegir la GPU para nuestro procesador, tendremos una amplia gama para elegir, entre AMD y NVIDIA, dependiendo si el ordenador es para jugar o trabajar eligiremos una GPU u otra. Para trabajar o multimedia se recomiendan las r5 en AMD o GT en Nvidia, para jugar o diseño recomendamos las superiores R7, R9 o RX en AMD, o GTX en Nvidia, a partir de la serie X50/XX50.</p>'
        steps(component, text);

    }

}

