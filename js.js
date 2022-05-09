//json = fetch("https://raw.githubusercontent.com/JeffTam33/D3-Greenland_GDP_Chart/main/greenland_gdp_data.json?token=GHSAT0AAAAAABUF2QNVSW2NK5WS7V66PU7QYTYE4CA");

let dataset = [];
let json = null;
fetch("https://raw.githubusercontent.com/JeffTam33/D3-Greenland_GDP_Chart/main/greenland_gdp_data.json?token=GHSAT0AAAAAABUF2QNUYCDE7L73ZFAXVMRWYTYPCDA")
              .then(response => response.json())
              .then(data => {
                console.log(data);
              })

const width = 900;
const height = 450;
const xScale = d3.scaleLinear()
                 .domain()

var svgContainer = d3.select(".visual-data")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#FFFFFF")
            .style("margin-top", 50);