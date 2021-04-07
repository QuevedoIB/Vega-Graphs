const generateConfig = ({ values, title }) => ({
    $schema: 'https://vega.github.io/schema/vega/v4.json',
    title,
    width: 200,
    height: 200,
    autosize: 'none',
    data: [
        {
            name: 'table',
            values,
            transform: [
                {
                    type: 'formula',
                    expr: "datum.id + ': ' + datum.value",
                    as: 'tooltip',
                },
                {
                    type: 'pie',
                    field: 'value',
                    startAngle: 0,
                    endAngle: 6.29,
                    sort: true,
                },
            ],
        },
    ],

    signals: [
        {
            name: 'startAngle',
            value: 0,
        },
        {
            name: 'endAngle',
            value: 6.29,
        },
        {
            name: 'padAngle',
            value: 0,
        },
        {
            name: 'innerRadius',
            value: 30,
        },
        {
            name: 'cornerRadius',
            value: 0,
        },
    ],

    scales: [
        {
            name: 'color',
            type: 'ordinal',
            domain: { data: 'table', field: 'id' },
            range: { scheme: 'category20c' },
        },
    ],

    marks: [
        {
            type: 'arc',
            from: { data: 'table' },
            encode: {
                enter: {
                    fill: { scale: 'color', field: 'id' },
                    x: { signal: 'width / 2' },
                    y: { signal: 'height / 2' },
                    startAngle: { field: 'startAngle' },
                    endAngle: { field: 'endAngle' },
                    padAngle: { signal: 'padAngle' },
                    innerRadius: { signal: 'innerRadius' },
                    outerRadius: { signal: 'width / 2' },
                    cornerRadius: { signal: 'cornerRadius' },
                    tooltip: { field: 'tooltip' },
                },
            },
        },
        {
            type: 'text',
            encode: {
                text: { field: 'value', type: 'quantitative' },
            },
        },
    ],
});

/*
({
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    title,
    width: 200,
    height: 200,
    autosize: 'none',
    signals: [
        {
            name: 'startAngle',
            value: 0,
        },
        {
            name: 'endAngle',
            value: 6.29,
        },
        {
            name: 'padAngle',
            value: 0,
        },
        {
            name: 'innerRadius',
            value: 30,
        },
        {
            name: 'cornerRadius',
            value: 0,
        },
        {
            name: 'sort',
            value: true,
        },
    ],
    data: [
        {
            name: 'table',
            values,
            transform: [
                {
                    type: 'pie',
                    field: 'value',
                    startAngle: { signal: 'startAngle' },
                    endAngle: { signal: 'endAngle' },
                    sort: { signal: 'sort' },
                },
            ],
        },
    ],
    scales: [
        {
            name: 'color',
            type: 'ordinal',
            domain: { data: 'table', field: 'id' },
            range: { scheme: 'category20' },
        },
    ],
    marks: [
        {
            type: 'arc',
            from: { data: 'table' },
            encode: {
                enter: {
                    fill: { scale: 'color', field: 'id' },
                    x: { signal: 'width / 2' },
                    y: { signal: 'height / 2' },
                },
                update: {
                    startAngle: { field: 'startAngle' },
                    endAngle: { field: 'endAngle' },
                    padAngle: { signal: 'padAngle' },
                    innerRadius: { signal: 'innerRadius' },
                    outerRadius: { signal: 'width / 2' },
                    cornerRadius: { signal: 'cornerRadius' },
                },
            },
        },
    ],
});
*/

export default generateConfig;
