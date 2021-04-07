const generateConfig = ({ values, range, title }) => ({
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title,
    data: { values },
    /* layer allows to render multiple charts at the same time */
    layer: [
        {
            mark: {
                type: 'bar', tooltip: true
            },
            encoding: {
                x: {
                    field: 'name',
                    axis: { title: 'Location', labelAngle: -45 },
                },
                y: {
                    field: 'today_new_confirmed',
                    type: 'quantitative',
                    axis: {
                        title: 'Today confirmed cases',
                    },
                },
                color: {
                    field: "name",
                    type: "nominal",
                    scale: {
                        range
                    }
                },
            },
        },
    ],
    config: {
        legend: {
            disable: true
        },
    }
});

export default generateConfig;