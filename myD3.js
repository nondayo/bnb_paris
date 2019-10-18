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

let barRoomtype = dc.barChart("#roomtype");
let barNeighbourhood = dc.barChart("#neighbourhood");
let histPrice = dc.barChart("#price")
// dj.js
d3.csv("data/demo2.csv").then(function (data) {
    // console.log(data[1].price)
    // console.log(parseInt(data[1].price))
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

    let roomCount = roomDim.group().reduceCount();
    let neighbourhoodCount = neighbourhoodDim.group().reduceCount();
    let priceBin = priceDim.group().reduceCount();

    let roomVec = ["home / apt", "Private room", "Shared room"];
    let neighbourhoodVec = ["Observatoire", "Hôtel-de-Ville", "Opéra", "Ménilmontant", "Louvre", "Popincourt", "Buttes-Montmartre", "Élysée", "Panthéon", "Entrepôt", "Gobelins", "Buttes-Chaumont", "Luxembourg", "Palais-Bourbon", "Reuilly", "Bourse", "Vaugirard", "Batignolles-Monceau", "Passy", "Temple"];

    barRoomtype
        // .width(300)
        // .height(100)
        .margins({
            "top": 10,
            "right": 10,
            "left": 50,
            "bottom": 20
        })
        .dimension(roomDim)
        .group(roomCount)
        // .x(d3.scaleOrdinal().domain(roomVec))
        .x(d3.scaleBand().domain(roomVec))
        .xUnits(dc.units.ordinal)
        .gap(4)
        .elasticY(true)
        .colors("rgb(255, 204, 0)")
        .yAxis()
        .ticks(3)


    barNeighbourhood
        // .width(1000)
        // .height(100)
        .margins({
            "top": 10,
            "right": 10,
            "left": 50,
            "bottom": 20
        })
        .dimension(neighbourhoodDim)
        .group(neighbourhoodCount)
        // .x(d3.scaleOrdinal().domain(roomVec))
        .x(d3.scaleBand().domain(neighbourhoodVec))
        .xUnits(dc.units.ordinal)
        .gap(4)
        .elasticY(true)
        .colors("rgb(255, 204, 0)")
        .yAxis()
        .ticks(3)
    // 研究如何排序
    // .ordering(dc.pluck('key'))
    // .ordering(function (d) {
    //     return neighbourhoodCount;
    // })


    histPrice
        .margins({
            "top": 10,
            "right": 10,
            "left": 50,
            "bottom": 20
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


    dc.renderAll();

})

// function updateGraph() {
//     d3.selectAll(".marker")
//         .style("display", "none");

//     d3.selectAll(".marker")
//         .data(monthDim.top(Infinity))
//         .style("display", "inline");
// }