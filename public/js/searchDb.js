$(document).ready(selector);

function selector() { //función que lee el tipo que le pasa la id y según qué tipo sea va a una url u otra para mostrar contenido de la base de datos
    var type = $('#type').text();
    var url;
    var classType;

    if (type !== 'cpu' && type !== 'motherboard' && type !== 'ram' && type !== 'gpu' && type !== 'hdd' && type !== 'psu' && type !== 'case') {
        url = 'saveConfig/';
        classType = 'computer-list';
        $('#dropPost').addClass('active');
    } else {
        url = '';
        classType = 'component-list';
        $('#dropComp').addClass('active');
    }

    showData(type, url, classType)
}

function showData(type, url, classType) {
    $.get('http://localhost:3000/' + url + type, function getType(response) {

        response.forEach(function (eachResponse) { //recorre todos los objetos existentes guardados en la base de datos, response son todos los objetos y eachResponse es cada uno de los objetos
            var card = $('<div></div>');
            card.attr('class', 'card');
            $('#publication').append(card);

            var responseList = $('<div></div>');
            responseList.attr('class', 'card-container');

            var img = $('<img>');
            img.attr('class','card-picture');
            img.attr('src','/images/' + type + '.jpg');
            card.append(img);

            card.append(responseList);

            for (var item in eachResponse) { //recorre cada propiedad del objeto para meterla en un li
                componentList = $('<p></p>');
                componentList.attr("class", item);
                componentList.text(item.toUpperCase() + ': ' + eachResponse[item]);
                responseList.append(componentList);
            }
        })
    })
}
