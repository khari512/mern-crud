import React from "react";

import Table from "components/common/Table";

const ViewRenderer = ( props ) => {
    const components = {
        Table
    }
    const { type, ...rest } = props;

    if( !type ) {
        return null;
    }

    const DynamicComponent = components[ type ];

    return (
        <div>
            <DynamicComponent
                {...rest}
            />
        </div>
       
    );
};

export default ViewRenderer;