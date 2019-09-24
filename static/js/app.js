function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel

    // Use `d3.json` to fetch the metadata for a sample
    var url = `/metadata/` + sample;
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(url).then(function(sample) {
        var sample_metadata = d3.select(`#sample-metadata`);
        // Use `.html("") to clear any existing metadata
        sample_metadata.html("");
        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.       
        Object.entries(sample).forEach(([key, value]) => {
            var row = sample_metadata.append("p");
            row.text(`${key}: ${value}`);
        });
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var plotdata = `/samples/${sample}`;
    d3.json(plotdata).then(function(data) {
        // console.log(data);
        // @TODO: Build a Bubble Chart using the sample data
        var xValues = data.otu_ids;
        var yValues = data.sample_values;
        var textValues = data.otu_labels;
        var mSize = data.sample_values;
        var mColors = data.otu_ids;

        var trace_bubble = {
            x: xValues,
            y: yValues,
            text: textValues,
            mode: 'markers',
            marker: {
                size: mSize,
                color: mColors,
                colorscale: 'Earth',
            }
        };

        var layout = {
            title: "Belly Button Metadata",
            xaxis: { title: "OTU ID" },
            margin: { t: 0 }
        };

        Plotly.newPlot('bubble', trace_bubble, layout);
        console.log('the error is in the bubble.')
        console.log(trace_bubble)

        var pieValues = data.sample_values.slice(0, 10);
        var pieLabels = data.otu_ids.slice(0, 10);
        var pieHover = data.otu_labels.slice(0, 10);

        var data3 = [{
            values: pieValues,
            labels: pieLabels,
            hovertext: pieHover,
            type: 'pie'
        }];

        Plotly.newPlot('pie', data3);
    });

    // //Bonus
    // var plotdata = `/samples/${sample}`;
    // d3.json(plotdata).then(function(data) {
    //     var data4 = [{
    //         domain: { x: [0, 1], y: [0, 1] },
    //         value: 270,
    //         title: { text: "textValues" },
    //         type: "indicator",
    //         mode: "gauge+number"
    //     }];

    //     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    //     Plotly.newPlot(gd, data, layout);
    // });

}

function init() {

    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
        console.log(sampleNames);
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildMetadata(firstSample);
        buildCharts(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();