import React, { useReducer, useEffect } from "react";
import { Vega } from 'react-vega';

import CovidService from "../../services/CovidService";
import { generateRandomColor } from "../../helpers/generateRandomColor";
import generateConfig from "./config";

const initialVegaChartState = {
    loading: true,
    config: null
};

const vegaChartReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_DATA": {
            return { ...state, config: generateConfig(payload?.regions, payload?.regions?.map(e => generateRandomColor())), loading: false }
        }
        default:
            return state;
    }
};

const VegaChart = () => {
    const [{ loading, config }, dispatch] = useReducer(vegaChartReducer, initialVegaChartState)


    useEffect(() => {
        async function fetchCovidData() {
            try {
                const country = "Spain";
                const today = new Date();
                const dateString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000))
                    .toISOString()
                    .split("T")[0];
                const { data: { total, dates: { [dateString]: { countries: { [country]: { regions } } }
                }
                } } = await CovidService.fetchCases(dateString, country)
                dispatch({ type: "SET_DATA", payload: { total, regions } })
            } catch (error) {
                console.log(error)
            }
        };
        fetchCovidData();
    }, [])


    return loading ? <p>Loading...</p> : <Vega
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
        downloadFileName={'Just Name It'}
    />
}

export default VegaChart;
