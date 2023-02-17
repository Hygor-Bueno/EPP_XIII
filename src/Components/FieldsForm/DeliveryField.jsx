import React from 'react';

export default function DeliveryField(props) {
    return (
        <fieldset className='form-group row'>
            <legend>Dados da entrega</legend>
            {props.itemForm("Data:", "", "Data da entrega.", "date", 3, props.dateDelivery, props.setDateDelivery, false)}
            {props.itemForm("Hora:", "", "Horário da entrega.", "time", 3, props.hoursDelivery, props.setHoursDelivery, false)}
            {props.selectForm("Local da Entrega", 6, [], props.localDelivery, props.setLocalDelivery)}
        </fieldset>
    )
}
