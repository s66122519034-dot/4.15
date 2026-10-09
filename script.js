// A variable to keep the current graph
let chart;

// Calculate displacement with the formula s = ut + 1/2 at^2
function displacement(u, a, time) {
    return u * time + 0.5 * a * time * time;
}

function calculate() {
    // Step 1: Read the values from the form
    const u = parseFloat(document.getElementById("u").value);
    const a = parseFloat(document.getElementById("a").value);
    const t = parseFloat(document.getElementById("t").value);
    const samples = parseInt(document.getElementById("interval").value);

    // Check that the numbers are valid
    if (!Number.isFinite(u) || !Number.isFinite(a) ||
        !Number.isFinite(t) || t <= 0 ||
        !Number.isInteger(samples) || samples < 10 || samples > 100) {
        alert("Please enter valid numbers.");
        return;
    }

    // Step 2: Calculate and show the result at time t
    const result = displacement(u, a, t);
    document.getElementById("result").textContent = result.toFixed(2);
    document.getElementById("timeDisplay").textContent = t + " s";

    // Step 3: Double the total time for the graph
    const totalTime = t * 2;
    const points = [];

    // Create the selected number of points between 0 and 2t
    for (let i = 0; i < samples; i++) {
        const time = totalTime * i / (samples - 1);
        const s = displacement(u, a, time);
        points.push({ x: time, y: s });
    }

    // The red point shows the displacement at time t
    const redPoint = { x: t, y: result };

    // Step 4: Remove the old graph before drawing a new one
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(document.getElementById("myChart"), {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Displacement",
                    data: points,
                    showLine: true,
                    borderColor: "#347ac4",
                    backgroundColor: "#347ac4",
                    pointRadius: samples > 50 ? 2 : 3,
                    borderWidth: 2
                },
                {
                    label: "Selected time",
                    data: [redPoint],
                    backgroundColor: "#e04444",
                    pointRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "linear",
                    min: 0,
                    max: totalTime,
                    title: { display: true, text: "Time (s)" }
                },
                y: {
                    title: { display: true, text: "Displacement (m)" }
                }
            }
        }
    });
}

// Calculate when the user clicks the button
// preventDefault() stops the page from refreshing
const form = document.getElementById("inputForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    calculate();
});

// Show the first graph when the page opens
calculate();
