import React from 'react';

export default function ClientField(props) {
    return (
        <fieldset className='form-group row border-bottom border-dark'>
            <legend>Dados do cliente</legend>
            {props.itemForm("Cód.:", "", "Código do pedido.", "number", 2, props.orderCod, props.setOrderCod, true)}
            {props.itemForm("Cliente:", "Nome do cliente", "Digite o nome do cliente", "text", 6, props.nameClient, props.setNameClient, false)}
            {props.itemForm("Telefone:", "(11) 99999-9999", "Digite um telefone para contato", "text", 4, props.foneClient, props.setFoneClient, false)}
            {props.itemForm("E-mail:", "exmp@gmail.com", "Digite o nome do cliente", "text", 4, props.email, props.setEmail, false)}
            {props.itemForm("Data:", "", "Digite o nome do cliente", "date", 4, props.dateOrder, props.setDateOrder, false)}
        </fieldset>
    )
}
