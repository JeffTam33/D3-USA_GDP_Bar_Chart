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
                //Scales for x and y axises
                const xScale = d3.scaleLinear()
                                 .domain([data.begin_year, data.end_year + 1])
                                 .range([padding, width - padding]);
                const yScale = d3.scaleLinear()
                                 .domain([0, d3.max(data.data, (d) => d[1])])
                                 .range([height - padding, padding]);
                //Position of Axises
                const xAxis = d3.axisBottom(xScale);
                const yAxis = d3.axisLeft(yScale);
                //Call Axis to show on screen
                svgContainer.append("g")
                            .attr("id", "x-axis")
                            .attr("transform", "translate(0, " + (height - padding) + ")")
                            .attr("id", "x-axis")
                            .call(xAxis);
                svgContainer.append("g")
                            .attr("id", "y-axis")
                            .attr("transform", "translate(" + padding +" 0)")
                            .call(yAxis);
                //X-axis title
                svgContainer.append("text")
                            .attr("id", "y-axis-title")
                            .attr("x", width / 2)
                            .attr("y", height - (padding / 4))
                            .text("Year");
                //Y-axis title
                svgContainer.append("text")
                            .attr("id", "x-axis-title")
                            .attr("x", (height * -1) + padding)
                            .attr("y", padding / 5)
                            .attr("transform", "rotate(-90)")
                            .text("Gross Domestic Product \(USD millions\)");
                //Bar reactangles
                svgContainer.selectAll("rect")
                            .append("svg")
                            .data(data.data)
                            .enter()
                            .append("rect")
                            .attr("x", (d, i) => i * 16 + padding)
                            .attr("y", (d, i) => (yScale(d[1])))
                            .attr("width", 10)
                            .attr("height", (d, i) => height - yScale(d[1]));
              })