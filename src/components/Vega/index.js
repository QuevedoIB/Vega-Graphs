import React, { useReducer, useEffect } from "react";
import { Vega } from 'react-vega';

import Spinner from "../../components/Spinner"

const initialVegaChartState = {
    loading: true,
    config: null
};

const vegaChartReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_DATA": {
            return { ...state, config: payload, loading: false }
        }
        default:
            return state;
    }
};

const VegaChart = ({ configCallback, title }) => {
    const [{ loading, config }, dispatch] = useReducer(vegaChartReducer, initialVegaChartState)

    useEffect(() => {
        (async function setupVegaConfig() {
            try {
                dispatch({
                    type: "SET_DATA", payload: await configCallback()
                })
            } catch (error) {
                console.log(error)
            }
        })();
    }, [configCallback])

    return loading ? <Spinner /> : <Vega
        spec={
            config
        }
        renderer="svg"
        actions={{
            export: true,
            source: false,
            compiled: false,
            editor: false,
        }}
        downloadFileName={title}
    />
}

export default VegaChart;
