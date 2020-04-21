import React,{ useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const DateField = ( props ) => {

    const [ date, setDate ] = useState(new Date());
    const { onChange } = props;

    const handleChange = ( date ) => {
        setDate( date );
        const momentDate = moment(date);
        onChange && onChange( momentDate.format('L') );
    }

    return <DatePicker
        selected={date}
        onChange={handleChange}
        maxDate={new Date()}
        dateFormat='MM/dd/yyyy'
    />
}

export default DateField;