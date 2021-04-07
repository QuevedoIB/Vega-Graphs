import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import CovidService from 'services/CovidService';

import VegaChart from 'components/Vega';
import generateConfig from 'components/Vega/configs/totalCasesChart';

const TotalCases = () => {
    const [t] = useTranslation();

    const fetchCovidData = useCallback(async () => {
        const country = 'Spain';
        const today = new Date();
        const dateString = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        )
            .toISOString()
            .split('T')[0];
        const {
            data: {
                total: {
                    today_new_confirmed,
                    today_new_deaths,
                    today_new_open_cases,
                    today_new_recovered,
                },
            },
        } = await CovidService.fetchCases(dateString, country);

        return generateConfig({
            title: t('daily_cases.title'),
            values: [
                { id: 1, value: today_new_confirmed },
                { id: 2, value: today_new_deaths },
                { id: 3, value: today_new_open_cases },
                { id: 4, value: today_new_recovered },
            ],
        });
    }, [t]);

    return (
        <VegaChart
            configCallback={fetchCovidData}
            title={t('daily_cases.title')}
        />
    );
};

export default TotalCases;
