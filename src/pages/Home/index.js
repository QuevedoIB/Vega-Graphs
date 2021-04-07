import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import routes from "../routes";

import "./Home.scss";

const Home = () => {
    const [t] = useTranslation();
   
    return (
        <div className="c-flex-container c-flex-center c-max-size">
            <ul className="c-nav-list">
                {Object.entries(routes).map(([key, route]) => <li key={key}><Link  to={route}>{t(`routes.${key}`)}</Link></li>)}
            </ul>
        </div>
    )
}

export default Home
