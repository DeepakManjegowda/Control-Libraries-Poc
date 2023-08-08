//ag-grid
const gridOptions = {
  columnDefs: [
    { field: "name" },
    { field: "username" },
    { field: "email" },
    { field: "phone" },
    { field: "companiesId" }, //
    { field: "password" },
  ],
  defaultColDef: { sortable: true, filter: true, minWidth: 5 },
  rowSelection: "multiple",
  animateRows: true,
  pagination: true,
  paginationPageSize: 15,

  onCellClicked: (params) => {
    console.log("cell was clicked", params); //when single row selected we can do other perform useing this
  },
};

const eGridDiv = document.getElementById("myGrid");
new agGrid.Grid(eGridDiv, gridOptions);
fetch("https://6426d11d556bad2a5b58c7dc.mockapi.io/MealsApi/users") // my custom api
  .then((response) => response.json())
  .then((data) => {
    gridOptions.api.setRowData(data);
  });

//chart Js
const ctx = document.getElementById("myChart").getContext("2d");
const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];
const myChart = new Chart(ctx, {
  type: "bar", //we can enter types of chart
  data: {
    labels: data.map((row) => row.year),
    datasets: [
      {
        label: "Acquisitions by year",
        data: data.map((row) => row.count),
      },
    ],
  },
  options: {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  // options: {
  //   indexAxis: "y",
  // },
});

//D3.JS
// Define the dimensions and margins for the SVG
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 700 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create the SVG element
const svg = d3
  .select("#d3Chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Define the x and y scales
const x = d3
  .scaleBand()
  .domain(data.map((row) => row.year))
  .range([0, width])
  .padding(0.1);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (row) => row.count)])
  .nice()
  .range([height, 0]);

// Create the bars
svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => x(d.year))
  .attr("width", x.bandwidth())
  .attr("y", (d) => y(d.count))
  .attr("height", (d) => height - y(d.count))
  .attr("fill", "steelblue");

// Add x-axis
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

// Add y-axis
svg.append("g").call(d3.axisLeft(y));
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom)
  .attr("text-anchor", "middle")
  .text("Acquisitions by year");

//bootstrap input
const forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
});

//File uploading
function getBase64(event) {
  var reader = new FileReader();
  reader.onload = function () {
    alert(reader.result);
    var img = document.getElementById("blob");
    img.setAttribute("src", reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
}
