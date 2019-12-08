// $(window).on('load', function () {
//     $('#myModal').modal('show');
//     $('#apiTokenField').val(localStorage.getItem('apiToken'));
// });
let modalAuthorize = (function () {
    let ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    let connectWebSocket = function () {
        function onMessage(msg) {
            const data = JSON.parse(msg.data);
            const msgType = data.msg_type;
            console.log(data);
            if (msgType === 'authorize') {
                if (data.hasOwnProperty('error')) {
                    // Show that client's fail to authorize
                    $("#auth-error").empty();
                    $("#auth-error").append('<p style="color : #F3A712">Auth token is invalid</p>');
                } else {
                    // show client success to authorize
                    $('#myModal').modal('hide');
                    $('#balance').val(data.authorize.balance);
                    $('#mobile-balance').val(data.authorize.balance);
                    $('#mobile-balance').text(data.authorize.balance);

                }
            }
        }

        function onError(event) {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            websockets.close();
        }
        ws.onmessage = onMessage;
        ws.onerror = onError;
    }

    let checkWebSocketConnection = function () {
        if (!(ws.readyState === ws.OPEN)) {
            // setTimeout(() => {
            ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
            connectWebSocket(ws);
            // }, 1000);
        }
        return ws.readyState === ws.OPEN;
    };

    function setAuthorizeButton() {
        $("#authButton").click(() => {
            if (checkWebSocketConnection(ws)) {
                ws.send(JSON.stringify({
                    'authorize': $('#apiTokenField').val()
                }));
            }
        });
    };
    return {
        connectWebSocket: connectWebSocket,
        setAuthorizeButton: setAuthorizeButton
    }

})();
modalAuthorize.connectWebSocket();
modalAuthorize.setAuthorizeButton();

// $( document ).ready(function() {

let tradingConfiguration = (function () {
    let marketList;
    let webSocket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
    let initializeMarketList = function (msg) {
        const activeSymbols = msg;
        const displayName = activeSymbols.map(stock => stock.display_name);
        const symbolOnly = activeSymbols.map(stock => stock.symbol);
        const listValue = [];
        for (let count = 0; count < symbolOnly.length; count += 1) {
            listValue.push({
                label: displayName[count],
                value: symbolOnly[count],
            });
        }
        // marketList = new Awesomplete('input#market', {
        //     minChars: 1,
        //     maxItems: 100,
        //     autoFirst: true,
        //     list: listValue,
        //     // insert label instead of value into the input.
        //     replace(suggestion) {
        //         this.input.value = suggestion.label;
        //     },
        // });

        // Awesomplete.$('#market-drop').addEventListener('click', () => {
        //     if (marketList.ul.childNodes.length === 0) {
        //         marketList.minChars = 0;
        //         marketList.evaluate();
        //     } else if (marketList.ul.hasAttribute('hidden')) {
        //         marketList.open();
        //     } else {
        //         marketList.close();
        //     }
        // });
        // $('input#market').val(localStorage.getItem('market'));
        // $("input#contract").val(localStorage.getItem('contractType'));
    };

    let recreateWebSocket = function () {
        webSocket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
        webSocket.onmessage = function (msg) {
            const data = JSON.parse(msg.data).active_symbols;
            initializeMarketList(data);
        };
        webSocket.onerror = function (event) {
            console.error('Tick Stream Socket encountered error: ', event.message, 'Closing socket');
            webSocket.close();
        };
    };

    let waitForSocketConnection = function (socket, callback) {
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if (callback != null) {
                        callback();
                    }
                } else {
                    console.log("wait for connection...")
                    waitForSocketConnection(socket, callback);
                }

            }, 5); // wait 5 milisecond for the connection...
    };

    let setUp = function () {
        waitForSocketConnection(webSocket, function () {
            webSocket.send(JSON.stringify({
                "active_symbols": "brief"
            }));
        });
    };

    let getListOfMarket = function () {
        return marketList;
    }


    return {
        recreateWebSocket: recreateWebSocket,
        setUp: setUp,
        getListOfMarket: getListOfMarket
    }
})();

tradingConfiguration.recreateWebSocket();
tradingConfiguration.setUp();

// Chart.defaults.global.elements.point.radius = 0;
let tickChart = (function () {
    let tickStream;
    let tickChartGraph;
    let marketList;
    let maxTick;
    let myChart;


    let createChart = function () {
        tickChartGraph = document.getElementById('tick-chart').getContext('2d');
        myChart = new Chart(tickChartGraph, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    fill: false,
                    // borderColor: "#342E37",
                    pointBackgroundColor: [],
                    pointBorderColor: [],
                    pointRadius: [],
                    pointHoverRadius: [],
                    borderWidth: 0.5,
                    lineTension: 0,
                    // backgroundColor: '#342E37'
                }]
            },
            options: {

                showTooltips: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            display: false
                        }
                    }]
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                elements: {
                    line: {
                        tension: 0 // disables bezier curves
                    }
                },
                legend: {
                    display: false,
                }
            }
        });
        maxTick = 10;
    }


    let getLatestTick = function (location) {
        console.log(location);
        tickStream.send(JSON.stringify({
            "ticks_history": "R_50",
            "end": "latest",
            "style": "ticks",
            "count": 50,
            "subscribe": 1
        }));
    };
    let addDataToTick = function (data) {
        "use strict";
        myChart.data.labels.push('');
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        let len = myChart.data.datasets[0].data.length;
        if (len === maxTick) {
            myChart.data.labels.shift();
            myChart.data.datasets.forEach((dataset) => {
                dataset.data.shift();
            });
        }
        if (len > 2) {
            let arr = myChart.data.datasets[0].data;
            let minValue = arr.indexOf(Math.min.apply(Math, arr));
            let maxValue = arr.indexOf(Math.max.apply(Math, arr));

            myChart.data.datasets[0].pointBackgroundColor = Array(len).fill('#f3c400');
            myChart.data.datasets[0].pointBorderColor = Array(len).fill('#f3c400');
            myChart.data.datasets[0].pointRadius = [];
            myChart.data.datasets[0].pointBackgroundColor[minValue] = "red";
            myChart.data.datasets[0].pointBorderColor[minValue] = "#red";
            myChart.data.datasets[0].pointRadius[minValue] = 4;

            myChart.data.datasets[0].pointBackgroundColor[maxValue] = "green";
            myChart.data.datasets[0].pointBorderColor[maxValue] = "#green";
            myChart.data.datasets[0].pointRadius[maxValue] = 4;

        }
        myChart.update();
    };

    let changeTickMarket = function (requestedMarket) {
        waitForSocketConnection(tickStream, function () {
            tickStream.send(JSON.stringify({
                contracts_for: marketList._list[requestedMarket].value
            }));
        });
    };
    let recreateWebSocket = function () {
        tickStream = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
        tickStream.onopen = function (msg) {
            tickStream.send(JSON.stringify({
                "ticks_history": "R_50",
                "end": "latest",
                "style": "ticks",
                "count": 50,
                "subscribe": 1
            }));
        }
        tickStream.onmessage = function (msg) {
            const data = JSON.parse(msg.data);
            const msgType = data.msg_type;
            console.log(data);
            if (msgType === 'tick') {
                appendHistory(Number(data.tick.quote));
                addDataToTick(Number(data.tick.quote));
            } else if (msgType === 'contracts_for') {
                const activeContract = data.contracts_for.available;
                let contractCategory = activeContract.map(contract => contract.contract_category_display);
                contractCategory = Array.from(new Set(contractCategory));
                let contractType = activeContract.map(contract => contract.contract_type);
                contractType = Array.from(new Set(contractType));
                console.log(contractCategory);
                for (let category of contractCategory) {
                    $('#contract').append(new Option(category, category));
                }
            }
        }

        tickStream.onerror = function (event) {
            console.error('Tick Stream Socket encountered error: ', event.message, 'Closing socket');
            tickStream.close();
        };

        tickStream.onclose = function (event) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', event);
            setTimeout(function () {
                websockets = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
                recreateWebSocket(websockets);
            }, 1000);
        };
    };
    let appendHistory = function (data) {
        if ($("#tickHistory li").length == maxTick)
            $("#tickHistory li").last().remove();
        if ($("#tickHistory li").length > 0) {
            // if($("#tickHistory li").length > 4){
            let li = $("#tickHistory").find('li');
            let count = 0,
                highest = 0,
                lowest = 0;
            let highestValue = 0,
                lowestValue = $("#tickHistory li").last().text();
            li.each(function () { // id of ul
                $(this).css({
                    backgroundColor: ''
                });
                if ($(this).text() >= highestValue) {
                    highestValue = $(this).text();
                    highest = count;
                } else if ($(this).text() <= lowestValue) {
                    lowestValue = $(this).text();
                    lowest = count;
                }
                count++;
            });

            if (data > highestValue)
                highest = 0;
            else if (data < lowestValue)
                lowest = 0;
            if (highest != 0)
                $("ul#tickHistory li:eq(" + highest + ")").css("background-color", "#27511A");
            if (lowest != 0)
                $("ul#tickHistory li:eq(" + lowest + ")").css("background-color", "#8E2653");
            JSONstringify(highest + " " + highestValue);
            JSONstringify(lowest + " " + lowestValue);
            let mark = "";
            if ($("#tickHistory li").first().text() < data) {
                if (highest == 0)
                    $("#tickHistory").prepend('<li class="upValue" style="background-color: #27511A">' + data + "</li>");
                else if (lowest == 0)
                    $("#tickHistory").prepend('<li class="upValue" style="background-color: #8E2653">' + data + "</li>");
                else
                    $("#tickHistory").prepend('<li class="upValue">' + data + "</li>");
            } else {
                if (highest == 0)
                    $("#tickHistory").prepend('<li class="downValue" style="background-color: #27511A">' + data + "</li>");
                else if (lowest == 0)
                    $("#tickHistory").prepend('<li class="downValue" style="background-color: #8E2653">' + data + "</li>");
                else
                    $("#tickHistory").prepend('<li class="downValue">' + data + "</li>");
            }

        } else
            $("#tickHistory").prepend('<li>' + data + "</li>");
    };
    let waitForSocketConnection = function (socket, callback) {
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made")
                    if (callback != null) {
                        callback();
                    }
                } else {
                    console.log("wait for connection...")
                    waitForSocketConnection(socket, callback);
                }

            }, 5); // wait 5 milisecond for the connection...
    };
    let setMarketButton = function () {
        $('#market').change(() => {
            //Find the market's location and then send the value to the user.
            if (marketList === undefined) {
                marketList = tradingConfiguration.getListOfMarket();
            }
            localStorage.setItem('market', $('#market').val());
            const location = marketList._list.findIndex(obj => obj.label === $('#market').val());
            tickChart.changeTickMarket(location);
            tickChart.getLatestTick(location);
        });
    };
    let setContractTypeButton = () => {
        $('#contract').change(() => {
            localStorage.setItem('contractType', $('#contract').text());
        });

    }
    return {
        createChart: createChart,
        recreateWebSocket: recreateWebSocket,
        changeTickMarket: changeTickMarket,
        setMarketButton: setMarketButton,
        getLatestTick: getLatestTick,
        setContractTypeButton: setContractTypeButton
    }
})();
//Initialize first
tickChart.createChart();
tickChart.recreateWebSocket();
// tickChart.setMarketButton();
// tickChart.setContractTypeButton();
// });

// $( document ).ready(function() {
//     Chart.defaults.global.elements.point.radius = 0;
//     let tickChart = (function() {
//         let tickStream = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
//         let marketList;
//     })();
//
// });


// if (msgType === 'candles') {
//     priceHistory.price = data.candles.map(item => item.close);
//     // priceHistory['history'] =  data['history']['times'];
// } else if (msgType === 'ohlc') {
//     priceHistory.price.pop();
//     priceHistory.price.push(Number(data.ohlc.close));
//     appendHistory(Number(data.ohlc.close));
// } else if (msgType === 'contracts_for') {
//     // globalMainContractList = initializeContract(data, globalMainContractList);
//     const activeContract = data.contracts_for.available;
//     let contractCategory = activeContract.map(contract => contract.contract_category_display);
//     contractCategory = Array.from(new Set(contractCategory));
//     let contractType = activeContract.map(contract => contract.contract_type);
//     contractType = Array.from(new Set(contractType));
//     console.log(contractCategory);
//     for (let category of contractCategory){
//         $('#contract').append(new Option(category,category));
//     }
// }

// function getClose(data) {
//     data.map(function (item) {
//         return item['close'];
//     });
// }

function JSONstringify(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, '\t');
    }
    let
        arr = [],
        _string = 'color:green',
        _number = 'color:darkorange',
        _boolean = 'color:blue',
        _null = 'color:magenta',
        _key = 'color:red';

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let style = _number;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                style = _key;
            } else {
                style = _string;
            }
        } else if (/true|false/.test(match)) {
            style = _boolean;
        } else if (/null/.test(match)) {
            style = _null;
        }
        arr.push(style);
        arr.push('');
        return '%c' + match + '%c';
    });
    arr.unshift(json);
}

// STRICTLY FOR JQUERY ONLY

//For modal