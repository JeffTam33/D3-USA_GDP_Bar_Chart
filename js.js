//json = fetch("https://raw.githubusercontent.com/JeffTam33/D3-Greenland_GDP_Chart/main/greenland_gdp_data.json?token=GHSAT0AAAAAABUF2QNVSW2NK5WS7V66PU7QYTYE4CA");
const width = 900;
const height = 450;
const padding = 50;
const xScale = d3.scaleLinear()
                 .domain()

var svgContainer = d3.select(".visual-data")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#FFFFFF")

fetch("https://raw.githubusercontent.com/JeffTam33/D3-Greenland_GDP_Chart/main/greenland_gdp_data.json")
              .then(response => response.json())
              .then(data => {
                console.log(data.begin_year)
                const xScale = d3.scaleLinear()
                                 .domain([data.begin_year, data.end_year + 1])
                                 .range([padding, width - padding]);
                const yScale = d3.scaleLinear()
                                 .domain([0, d3.max(data.data, (d) => d[1])])
                                 .range([height - padding, padding]);
                const xAxis = d3.axisBottom(xScale);
                const yAxis = d3.axisLeft(yScale);
                svgContainer.append("g")
                            .attr("transform", "translate(0, " + (height - padding) + ")")
                            .call(xAxis);
                svgContainer.append("g")
                            .attr("transform", "translate(" + padding +" 0)")
                            .call(yAxis);
                svgContainer.append("text")
                            .attr("x", (height*-1) + padding)
                            .attr("y", padding/5)
                            .attr("transform", "rotate(-90)")
                            .text("Gross Domestic Product \(USD millions\)");
                
              })