
// function reopenSubscription(json){
//     ws.send(json);
//     // ws.onmessage = function(msg){
//     //     var data = JSON.parse(msg.data);
//     //     console.log(data);
//     // }
// }

Chart.defaults.global.elements.point.radius = 0;
// Chart.defaults.global.elements.point.backgroundColor = '#f3c400';
// Chart.defaults.global.elements.point.borderColor = '#f3c400';
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            fill: false,
            borderColor: "#f3c400",
            pointBackgroundColor: [],
            pointBorderColor: [],
            pointRadius: [],
            pointHoverRadius: [],
            borderWidth: 0.5,
            lineTension: 0,
            backgroundColor: '#f3c400'
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

// function getClose(data){
//     data.map(function(item) {
//         return item['close'];
//     });
// }

// function JSONstringify(json) {
//     if (typeof json != 'string') {
//         json = JSON.stringify(json, undefined, '\t');
//     }

//     var
//         arr = [],
//         _string = 'color:green',
//         _number = 'color:darkorange',
//         _boolean = 'color:blue',
//         _null = 'color:magenta',
//         _key = 'color:red';

//     json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//         var style = _number;
//         if (/^"/.test(match)) {
//             if (/:$/.test(match)) {
//                 style = _key;
//             } else {
//                 style = _string;
//             }
//         } else if (/true|false/.test(match)) {
//             style = _boolean;
//         } else if (/null/.test(match)) {
//             style = _null;
//         }
//         arr.push(style);
//         arr.push('');
//         return '%c' + match + '%c';
//     });

//     arr.unshift(json);

//     console.log.apply(console, arr);
// }