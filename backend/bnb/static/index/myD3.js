// load file
// listings.csv 8.3Mb
// d3.csv("data/demo1.csv", function (data) {
//     console.log(data);
//     drawNeighbourhoodBar(data);
// });
// d3.csv("data/demo1.csv").then(function (data) {
//     drawNeighbourhoodBar(data);
// });

// dataset = [22, 42, 35, 30];
// drawNeighbourhoodBar(dataset);

// neighbourhood barchart
// function drawNeighbourhoodBar(data) {
//     // let n = data.map(x => x.n);
//     // let nei = data.map(x => x.neighbourhood);
//     // console.log(n);
//     // console.log(nei);

//     let width = 1200;
//     let height = 600;
//     let svg = d3.select("#neighbourhood") //#neighbourhood
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     let padding = {
//         top: 20,
//         right: 20,
//         bottom: 20,
//         left: 20
//     };

//     let rectStep = 35;
//     let rectWidth = 30;
//     let rect = svg.selectAll("rect")
//         .data(data.map(x => x.n))
//         .enter()
//         .append("rect")
//         // .attr("fill", "#FFC125")
//         .attr("fill", "rgb(255, 204, 0)")
//         .attr("x", 100)
//         .attr("y", (d, i) => i * height / data.length)
//         .attr("width", (d, i) => d / 10)
//         .attr("height", 15);
//     // .attr("x", (d, i) => padding.left + i * rectStep)
//     // .attr("y", (d, i) => height - padding.bottom - d)
//     // .attr("width", rectWidth)
//     // .attr("height", d => d / 10);

//     let text = svg.selectAll("text")
//         .data(data.map(x => x.neighbourhood))
//         .enter()
//         .append("text")
//         .attr("fill", "black")
//         .attr("font-size", "14px")
//         .attr("text-anchor", "middle")
//         // .attr("x", (d, i) => d / 10)
//         .attr("x", 150)
//         .attr("y", (d, i) => 11 + i * height / data.length)
//         .text(d => d);
//     //     .attr("x", (d, i) => padding.left + i * rectStep)
//     //     .attr("y", (d, i) => height - padding.bottom - d - 25)
//     //     .attr("dx", rectWidth / 2)
//     //     .attr("dy", "1em")
//     //     .text(d => d)

// };

// d3.csv("/static/index/data/demo2.csv").then(function (data) {
// console.log(data[1]);
// console.log(data[1].latitude);
// })


//Carto tiles attribution and URL
var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var cartoLink = '<a href="http://cartodb.com/attributions">CartoDB</a>';
var cartoURL = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var cartoAttrib = '&copy; ' + osmLink + ' &copy; ' + cartoLink;

var cartoMap = L.tileLayer(cartoURL, {
    attribution: cartoAttrib
});

//Map creation
var map = L.map('map', {
    layers: [cartoMap]
}).setView([48.864516, 2.349014], 11);

var breweryMarkers = new L.FeatureGroup();

const openUrl = "http://127.0.0.1:8000/api/apibnbparis/";
let xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();
xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
        let barRoomtype = dc.barChart("#roomtype");
        let barNeighbourhood = dc.barChart("#neighbourhood");
        let histPrice = dc.barChart("#price")
        let dataTable = dc.dataTable('#data-table');

        let ndx = crossfilter(data);

        let roomDim = ndx.dimension(function (d) {
            return d.room_type;
        });
        let neighbourhoodDim = ndx.dimension(function (d) {
            return d.neighbourhood;
        });
        let priceDim = ndx.dimension(function (d) {
            return parseInt(d.price);
        });
        let allDim = ndx.dimension(function (d) {
            return d;
        });

        let roomCount = roomDim.group().reduceCount();
        let neighbourhoodCount = neighbourhoodDim.group().reduceCount();
        let priceBin = priceDim.group().reduceCount();

        // Barchart 排序
        let sortByroomCount = roomDim.group()
            .all()
            .sort((a, b) => b.value - a.value)
            .map(d => d.key)
        let sortByneighbourhoodCount = neighbourhoodDim
            .group()
            .all() //20區的個數
            .sort((a, b) => b.value - a.value)
            .map(d => d.key)
        // console.log(neighbourhoodDim
        //     .group()
        //     .all())
        // console.log(sortByneighbourhoodCount);

        // barchart x label
        // let roomVec = ["home / apt", "Private room", "Shared room"];
        // let neighbourhoodVec = ["Buttes-Montmartre", "Observatoire", "Hôtel-de-Ville", "Opéra", "Ménilmontant", "Louvre", "Popincourt", "Élysée", "Panthéon", "Entrepôt", "Gobelins", "Buttes-Chaumont", "Luxembourg", "Palais-Bourbon", "Reuilly", "Bourse", "Vaugirard", "Batignolles-Monceau", "Passy", "Temple"];

        barNeighbourhood
            .width(1000)
            // .height(400)
            .margins({
                "top": 10,
                "right": 10,
                "left": 50,
                "bottom": 70
            })
            .dimension(neighbourhoodDim)
            .group(neighbourhoodCount)
            .x(d3.scaleBand().domain(sortByneighbourhoodCount))
            // .x(d3.scaleBand().domain(neighbourhoodNames))
            .xUnits(dc.units.ordinal)
            .brushOn(true)
            .gap(4)
            .elasticY(true)
            .colors("rgb(255, 204, 0)")
            .yAxis()
            .ticks(3)
        // 如果要對 x 軸文字做調整，要在 render() 之後
        // 或是在 css 做調整

        barRoomtype
            .width(500)
            .height(200)
            .margins({
                "top": 10,
                "right": 20,
                "left": 50,
                "bottom": 50
            })
            .dimension(roomDim)
            .group(roomCount)
            // .x(d3.scaleOrdinal().domain(roomVec))
            // .x(d3.scaleBand().domain(roomVec))
            .x(d3.scaleBand().domain(sortByroomCount))
            .xUnits(dc.units.ordinal)
            .gap(4)
            .elasticY(true)
            .colors("rgb(255, 204, 0)")
            .yAxis()
            .ticks(3)

        histPrice
            .width(500)
            .height(200)
            .margins({
                "top": 10,
                "right": 10,
                "left": 50,
                "bottom": 50
            })
            .dimension(priceDim)
            .group(priceBin)
            .x(d3.scaleLinear().domain([0, 999]))
            .brushOn(false)
            .colors("rgb(255, 204, 0)")
            .yAxis()
        // .ticks(5)
        // .yAxisLabel("Count")
        // .xAxisLabel("Price")

        dataTable
            .dimension(allDim)
            .size(100)
            .columns([
                function (d) {
                    return d.host_id;
                },
                function (d) {
                    return d.name;
                },
                function (d) {
                    return d.neighbourhood;
                },
                function (d) {
                    return d.room_type;
                },
                function (d) {
                    return d.price;
                },
                function (d) {
                    return d.number_of_reviews;
                },
                function (d) {
                    return d.availability_365;
                }
            ])
            .on('renderlet', function (table) {
                // each time table is rendered remove nasty extra row dc.js insists on adding
                table.select('tr.dc-table-group').remove();

                // update map with breweries to match filtered data
                breweryMarkers.clearLayers();
                _.each(allDim.top(Infinity), function (d) {
                    let name = d.name;
                    let price = d.price;
                    let roomColor;
                    switch (d.room_type) {
                        case "Entire home/apt":
                            roomColor = "#0084ff";
                            break;
                        case "Private room":
                            roomColor = '#ffc300';
                            break;
                        case "Shared room":
                            roomColor = '#fa3c4c';
                            break;
                        default:
                            roomColor = '#d696bb';
                            break;
                    }
                    let point = L.circle([d.latitude, d.longitude], {
                        // color: "rgb(255, 204, 0)",
                        // fillColor: "rgb(255, 204, 0)",
                        color: "none",
                        // color: roomColor,
                        fillColor: roomColor,
                        fillOpacity: 0.2
                        // radius: 20
                    });
                    point.bindPopup(name + " price: $" + price + " per night");
                    breweryMarkers.addLayer(point);
                });
                map.addLayer(breweryMarkers);
                map.fitBounds(breweryMarkers.getBounds());
            });

        dc.renderAll();
    }
};