import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';

import CovidService from "services/CovidService";
import { generateRandomColor } from "helpers/generateRandomColor";

import VegaChart from "components/Vega"
import generateConfig from 'components/Vega/configs/dailyCasesChart';

const DailyCases = () => {
    const [t] = useTranslation();

    const fetchCovidData = useCallback(async () => {
        const country = "Spain";
        const today = new Date();
        const dateString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        const { data: { dates: { [dateString]: { countries: { [country]: { regions } } }
        }
        } } = await CovidService.fetchCases(dateString, country)
        return generateConfig({ values: regions, range: regions?.map(e => generateRandomColor()), title: t("daily_cases.title") })
    }, [t]);

    return (
        <VegaChart configCallback={fetchCovidData} title={t("daily_cases.title")} />
    )
}

export default DailyCases
