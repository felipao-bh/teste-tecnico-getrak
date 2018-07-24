$(function () {

    $('#form-stop-calculator').validator().on('submit', function (e) {

        if (e.isDefaultPrevented()) {

            console.log(false);
            return false;
        }

        else {

            if (!e.preventDefault()) {

                let distance = document.getElementById('distancia').value;
                console.log(distance);

                axios('https://swapi.co/api/starships/', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                })

                    .then(function (response) {
                        generateTable(response, distance);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    })
});

function generateTable(response,distance){

    if ( response.data.count > 0 )
    {
        $('#result-table tbody').empty();

        line = '';

        $(response.data.results).each(function(i,e){

            line += '<tr>'
                + '<td>' + e.name + '</td>'
                + '<td>' + e.MGLT + '</td>'
                + '<td>' + e.cost_in_credits + '</td>'
                + '<td>' + stopsCalculate(distance, e.cost_in_credits) + '</td>';
        });

        $('#result-table tbody').append(line);

        line = '';
    }
}

function stopsCalculate(distance, cost) {

    let result;

    if (cost != 'unknown')
    {
        result = distance/cost;
        result = Math.round(result);
    }
    else
    {
        result = 'Não disponível';
    }

    return result;
}

function onlyNumbers(num) {
    let er = /[^0-9.]/;
    er.lastIndex = 0;
    let campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}