
import { COMPONENT_TYPE_MAPPER } from "./constants";
import {find} from 'lodash';
import { routesConfig } from "pageConfigs";

export const  getComponentType = ( metadata = {} ) => {
    const type = metadata.type && metadata.type.toLowerCase();

    if( COMPONENT_TYPE_MAPPER[type] ){
        return COMPONENT_TYPE_MAPPER[type] ;
    }
    return 'Field';
};

export const getMetadata = () => {
    const route = find(routesConfig, { path: window.location.pathname } ) || {};
   
    return route.metadata;
}