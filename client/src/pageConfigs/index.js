import React from "react";
import PrivateRoute from "components/private-route/PrivateRoute";

import AddEntryForm from "components/pages/AddEntryForm";
//import EBDueList from "components/pages/EBManager/EBDueList";
import ListByLovPage from "components/pages/ListByLovPage";
import Dashboard from "components/pages/Dashboard";

import EBEntryFormMetadata from "components/pages/metadata/eb-entry-form";
import EBDueListMetadata from "components/pages/metadata/eb-due-list";
import ConsolidatedEBList from "components/pages/metadata/consolidated-eb-list";


export const routesConfig = [
    { path: "/eb-list", metadata: EBEntryFormMetadata, pageType: 'ADD_ENTRY' },
    { path: "/eb-due-list", metadata: EBDueListMetadata, pageType: 'FETCH_BY_LOV' },
    { path: "/consolidated-eb-list", metadata: ConsolidatedEBList, pageType: 'FETCH_BY_LOV' }
];


const getRoutes = () => {

    return routesConfig.map( page => {

        switch(page.pageType){
            case 'ADD_ENTRY':
                return <PrivateRoute exact path={page.path} component={AddEntryForm} />;
            case 'FETCH_BY_LOV':
                return <PrivateRoute exact path={page.path} component={ListByLovPage} />;
            default:
                return <PrivateRoute exact path={page.path} component={Dashboard} />;
        }
        
    });
}


export default getRoutes;