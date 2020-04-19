
import { COMPONENT_TYPE_MAPPER } from "./constants";

export const  getComponentType = ( metadata = {} ) => {
    const type = metadata.type && metadata.type.toLowerCase();

    if( COMPONENT_TYPE_MAPPER[type] ){
        return COMPONENT_TYPE_MAPPER[type] ;
    }
    return 'Field';
};