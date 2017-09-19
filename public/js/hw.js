var cpuStore = [];
var moboStore = [];
var gpuStore = [];
var ramStore = [];
var hddStore = [];
var psuStore = [];
var caseStore = [];

var computer = {};

var btnArea = $('#btn-area');
var textArea = $('#text-area');

$("#btn-start").on("click", firstInstructions);

$("#btn-save").on("click", saveConfig);

function createButton(value, component) {
    var btn = $('<button>' + value + '</button>');
    btn.attr('class', 'btn ' + value);
    btn.attr('component', component);

    if (value === 'AMD') { //si el botón es amd o inte se le añade una brand con su marca y llama a la función que recogerá los datos de uno u otro
        var amd = btn.attr('brand', 'AMD');
        amd.on("click", function () { printComponents(component, value) })
    } else if (value === 'Intel') {
        var intel = btn.attr('brand', 'Intel');
        intel.on("click", function () { printComponents(component, value) })
    } else if (value === 'NVIDIA') {
        var nvidia = btn.attr('brand', 'Nvidia');
        nvidia.on("click", function () { printComponents(component, value) })
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
    textArea.empty();
    $('#content-title').text(component);
    var p = $(text);
    textArea.append(p);

    btnArea.empty();
    var value = 'Siguiente';
    createButton(value, component);
}

function selector() {
    var compAttr = $(this).attr('component');

    if (compAttr !== 'CPU' && compAttr !== 'GPU') { //entra aquí si no es ni GPU ni CPU
        var socketType = cpuStore[1].replace('+', '');

        if (compAttr === 'motherboard') { //sólo entra aquí si el componente es una motherboard
            printComponents(compAttr, socketType);

        } else if (compAttr === 'RAM') { //sólo entra aquí si el componente es una ram
            if (cpuStore[1] === 'FM2+' || cpuStore[1] === 'AM3+' || cpuStore[1] === '1150') { //sólo si se cumple alguno de estos sockets la memoria será DDR4, si no será DDR3
                printComponents(compAttr, 'ddr3');
            } else {
                printComponents(compAttr, 'ddr4');
            }
        } else {
            printComponents(compAttr, '');
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

            btnArea.empty();

            for (var i = 0; i < addedBrands.length; i++) {
                createButton(addedBrands[i], compAttr);
            }
        });
    }
}

function printComponents(component, brand) {
    textArea.empty();

    var tableArea = $('#table-area');
    tableArea.empty();

    tableHeadBuilder(tableArea, component);

    var tableComponentBody = $('<tbody></tbody>');
    tableArea.append(tableComponentBody);

    tableBodyBuilder(tableArea, component, brand, tableComponentBody);
};

function tableHeadBuilder(tableArea, component, tableComponentBody) {
    var optColum;
    var optColum2 = 'Consumo';
    if (component === 'CPU') {
        optColum = '<th> Socket ▼ </th>' + '<th> Núcleos ▼ </th>' + '<th> Hilos ▼ </th>' + '<th> Frec ▼ </th>';
    } else if (component === 'motherboard') {
        optColum = '<th> Socket ▼ </th>';
    } else if (component === 'GPU') {
        optColum = '<th> Frec GPU ▼ </th>' + '<th> GPU Turbo ▼ </th>' + '<th> Memoria ▼ </th>' + '<th> Frec Mem ▼ </th>' + '<th> Mem Turbo ▼ </th>';
    } else if (component === 'RAM') {
        optColum = '<th> Tipo ▼ </th>' + '<th> Frec ▼ </th>' + '<th> Módulos ▼ </th>' + '<th> Memoria ▼ </th>';
    } else if (component === 'HDD') {
        optColum = '<th> Memoria ▼ </th>' + '<th> Caché ▼ </th>' + '<th> Velocidad ▼ </th>';
    } else if (component === 'PSU') {
        optColum2 = 'Capacidad';
        optColum = '<th> Eficiencia ▼ </th>';
    } else {
        optColum2 = 'Tamaño de caja';
    }

    var headRow = $('<thead><tr><th> Nombre ▼ </th>' + optColum + '<th>' + optColum2 + '▼ </th><th> Precio ▼ </th></tr></thead>');
    tableArea.append(headRow);
}

function tableBodyBuilder(tableArea, component, brand, tableComponentBody) {
    $.get('http://localhost:3000/' + component + '/' + brand, function getType(response) {
        var compObj = response;

        for (var i = 0; i < compObj.length; i++) {
            tableArea.removeAttr('hidden');

            var name = compObj[i].name;;
            var tdp = compObj[i].tdp;
            var price = '<b>' + compObj[i].price + '</b>';
            var optProp; //propiedad que varía según el componente
            var optProp2 = '<td id="watts">' + tdp + '</td>'; //inicializamos éste que se va a repetir excepto en case

            if (component === 'CPU') {
                var socket = compObj[i].socket;
                var cpuCore = compObj[i].cores;
                var cpuThread = compObj[i].threads;
                var cpuClock = compObj[i].frequency;
                optProp = '<td id="socket">' + socket + '</td>' + '<td id="cpu-core">' + cpuCore + '</td>' + '<td id="cpu-thread">' + cpuThread + '</td>' + '<td id="cpu-freq">' + cpuClock + '</td>';
            } else if (component === 'motherboard') {
                var socket = compObj[i].socket;
                optProp = '<td id="socket">' + socket + '</td>';
            } else if (component === 'GPU') {
                var gpuClock = compObj[i].gpu_clock;
                var gpuBoost = compObj[i].gpu_boost;
                var gpuMemClock = compObj[i].mem_clock;
                var gpuMemBoost = compObj[i].mem_boost;
                var gpuMemory = compObj[i].mem_size + compObj[i].mem_type;
                optProp = '<td id="gpu-clock">' + gpuClock + '</td>' + '<td id="gpu-boost">' + gpuBoost + '</td>' + '<td id="gpu-mem">' + gpuMemory + '</td>' + '<td id="gpu-mem-clock">' + gpuMemClock + '</td>' + '<td id="mem-boost">' + gpuMemBoost + '</td>';
            } else if (component === 'RAM') {
                var memType = compObj[i].type;
                var memSpeed = compObj[i].speed;
                var memModules = compObj[i].modules;
                var memMemory = compObj[i].size;
                optProp = '<td id="mem-type">' + memType + '</td>' + '<td id="mem-speed">' + memSpeed + '</td>' + '<td id="mem-modules">' + memModules + '</td>' + '<td id=mem-memory>' + memMemory + '</td>';
            } else if (component === 'HDD') {
                var hddSize = compObj[i].capacity;
                var hddCache = compObj[i].cache;
                var hddRpm = compObj[i].type;
                optProp = '<td id="hdd-size">' + hddSize + '</td>' + '<td id="hdd-cache">' + hddCache + '</td>' + '<td id="hddRpm">' + hddRpm + '</td>';
            } else if (component === 'PSU') {
                psuEfficiency = compObj[i].efficiency;
                optProp = '<td id="psu-efficiency">' + psuEfficiency + '</td>';
                optProp2 = '<td id="psu-wattage">' + compObj[i].watts + '</td>';
            } else if (component === 'CASE') {
                caseForm = compObj[i].form;
                optProp2 = '<td id="case-form">' + caseForm + '</td>';
            }

            var compRow = $('<tr class=' + component + '><td id="name">' + name + '</td>' + optProp + optProp2 + '<td id="eur">' + price + '</td></tr>');

            compRow.on("click", result);

            tableComponentBody.append(compRow);
        }
        tableArea.tablesorter();
    })
}

function result() {
    var tableArea = $('#table-area');
    tableArea.empty();

    var componentType = $(this).attr('class'); //tipo de componente que le llega a la función result
    var pcComponent = $(this)[0].cells; //saca a una variable los datos de un componente (puede ser cpu,mobo,gpu...)

    if (componentType === 'CPU') {

        for (i = 0; i < pcComponent.length; i++) {
            cpuStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'motherboard';
        var text = '<p>Ahora pasaremos a elegir la placa base para nuestro procesador, para ayudarte, sólo se van a mostrar aquellas placas compatibles con el socket del procesador seleccionado.</p>'
        steps(component, text);

    } else if (componentType === 'motherboard') {

        for (i = 0; i < pcComponent.length; i++) {
            moboStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'GPU';
        var text = '<p>Ahora pasaremos a elegir la GPU para nuestro procesador, tendremos una amplia gama para elegir, entre AMD y NVIDIA, dependiendo si el ordenador es para jugar o trabajar eligiremos una GPU u otra. Para trabajar o multimedia se recomiendan las r5 en AMD o GT en Nvidia, para jugar o diseño recomendamos las superiores R7, R9 o RX en AMD, o GTX en Nvidia, a partir de la serie X50/XX50.</p>'
        steps(component, text);

    } else if (componentType === 'GPU') {

        for (i = 0; i < pcComponent.length; i++) {
            gpuStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'RAM';
        var text = '<p>A continuación podrás elegir la memoria ram. La cantidad de memoria difiere del uso que le vayamos a dar.</p> <p>Para hacerlo más fácil sólo mostramos los tipos de memoria compatible con vuestra configuración (las frecuencias no están contempladas, para ello debes mirar en la página del fabricante de la placa base escogida)</p> <p> Para equipos de oficina se recomienda al menos 4GB de ram, para equipos de Gaming es recomendado tener 16GB de ram y para equipos de diseño 32GB de ram.</p>'
        steps(component, text);

    } else if (componentType === 'RAM') {

        for (i = 0; i < pcComponent.length; i++) {
            ramStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'HDD';
        var text = '<p>Ya casi hemos finalizado, vamos a elegir ahora el almacenamiento de nuestro ordenador, esto va más a gusto del consumidor, según las necesidades de almacenamiento que necesitemos.</p>'
        steps(component, text);

    } else if (componentType === 'HDD') {

        for (i = 0; i < pcComponent.length; i++) {
            hddStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'PSU';
        var text = '<p>A la hora de seleccionar la fuente de alimentación debes tener en cuenta cuál será el consumo aproximado de tu configuración, para ello te lo facilitamos aquí abajo.</p> <p> También recomendamos escoger una fuente con certificación si vas a montar un equipo de alto rendimiento, ya que las que no poseen certificación pueden acarrear problemas de tensión y quemar nuestro pc.</p>' + '<h2 id="warning">' + 'Consumo aproximado: ' + calculator('watts') + 'W</h2>';
        steps(component, text);

    } else if (componentType === 'PSU') {

        for (i = 0; i < pcComponent.length; i++) {
            psuStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        var component = 'CASE';
        var text = '<p>Ya casi hemos finalizado, vamos a elegir ahora el almacenamiento de nuestro ordenador, esto va más a gusto del consumidor, según las necesidades de almacenamiento que necesitemos.</p>';
        steps(component, text);

    } else {

        for (i = 0; i < pcComponent.length; i++) {
            caseStore.push(pcComponent[i].innerText); //saca el texto de cada propiedad de cada td del tr
        }

        configResult();

    }
}

function calculator(type) {

    if (type === 'watts') {
        var cpuPrice = parseFloat(cpuStore[5]);
        var moboPrice = parseFloat(moboStore[2]);
        var ramPrice = parseFloat(ramStore[5]);
        var gpuPrice = parseFloat(gpuStore[6]);
        var hddPrice = parseFloat(hddStore[4]);
    } else if (type === 'price') {
        var cpuPrice = parseFloat(cpuStore[6]);
        var moboPrice = parseFloat(moboStore[3]);
        var ramPrice = parseFloat(ramStore[6]);
        var gpuPrice = parseFloat(gpuStore[7]);
        var hddPrice = parseFloat(hddStore[5]);
    }

    var total = cpuPrice + moboPrice + ramPrice + gpuPrice + hddPrice;

    return total;
}

function configResult() {

    textArea.empty();
    btnArea.empty();


    $('#content-title').text("¡ENHORABUENA, ÉSTA ES TU CONFIG!");

    $('#advice').removeAttr('hidden'); //elimina de oculto el mensaje que pide que se registren

    $('#form-select').removeAttr('hidden');

    $('#select-submit').on("click", function(){ //boton a cambiar el nombre que me libró del quebradero de cabeza de ayer de un form
        computerInit($('#typeOfConfig').val())
    });
}

function computerInit(value){
    
    $('#select-submit').attr('hidden','');

    $('#typeOfConfig').attr('hidden','');

    computer = {
        cpu: cpuStore[0],
        mobo: moboStore[0],
        gpu: gpuStore[0],
        ram: ramStore[0],
        hdd: hddStore[0],
        psu: psuStore[0],
        case: caseStore[0],
        price: calculator('price'),
        topic: value
    }

    var uList = $('<ul></ul>');
    uList.attr('id', 'result-list');
    textArea.append(uList);
    var list = '<li>' + 'Procesador: ' +  computer.cpu + '</li><li>' + 'Placa base: ' + computer.mobo + '</li><li>' + 'Tarjeta gráfica: ' + computer.gpu + '</li><li>' + 'Memoria Ram: ' + computer.ram + '</li><li>' + 'Disco duro: ' + computer.hdd + '</li><li>' + 'Fuente de alimentación: ' + computer.psu + '</li><li>' + 'Caja: ' + computer.case + '</li>';
    uList.append(list);

    var calcPrice = $('<h2></h2>');
    calcPrice.text('Precio final: ' + computer.price + ' €');
    calcPrice.attr('id', 'final-price');
    uList.after(calcPrice);

    $('#save-config').removeAttr('hidden'); //muestra el botón que hay oculto en el html para guardar la config del pc    
}


function saveConfig() {
    $.post('http://localhost:3000/saveConfig', computer, function (response) {
        $('#save-config').attr('hidden','');
    });
}