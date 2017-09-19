$(document).ready(showData);

var topic = $('#topic').text();

function showData() {
    $.get('http://localhost:3000/saveConfig/' + topic, function getType(response) {
        var computer = response;

        computer.forEach(function (eachComputer) { //recorre todos los computers existentes en cada topic
            computerList = $('<ul></ul>');
            computerList.attr('class', 'computer-list');
            $('#publication').append(computerList);

            for (var component in eachComputer) { //recorre cada propiedad del objeto para meterla en un li
                componentList = $('<li></li>');
                componentList.attr("class", component);
                componentList.text(component.toUpperCase() + ': ' + eachComputer[component]);
                computerList.append(componentList);
            }
            computerList.append('<hr>');
        })
    })
}
