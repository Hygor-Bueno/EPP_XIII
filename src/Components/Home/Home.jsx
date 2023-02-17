// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Connection } from '../../Util/RestApi';
import Util from '../../Util/Util';
import ClientField from '../FieldsForm/ClientField';
import DeliveryField from '../FieldsForm/DeliveryField';
import OrderField from '../FieldsForm/OrderField';
import './Home.css'

export default function Home() {
    const util = new Util();
    const connection = new Connection();
    const [menusList, setMenusList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);
    const [logsMenusList, setLogsMenusList] = useState([]);

    //Valores selecionados no formulário:
    const [orderCod, setOrderCod] = useState("");
    const [nameClient, setNameClient] = useState("");
    const [foneClient, setFoneClient] = useState("");
    const [email, setEmail] = useState("");
    const [dateOrder, setDateOrder] = useState(util.dateCurrent());
    const [observation, setObservation] = useState(`What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a typ`);
    const [signal, setSignal] = useState("");
    const [total, setTotal] = useState("");
    
    const [dateDelivery, setDateDelivery] = useState("");
    const [hoursDelivery, setHoursDelivery] = useState("");
    const [localDelivery, setLocalDelivery] = useState("");



    const [order, setOrder] = useState("");
    const [logMenu, setLogMenu] = useState("");


    const [logSales, setLogSales] = useState([]);

    useEffect(() => {
        const conn = new Connection();
        async function loadInit() {
            //user.getShop().replace(/ /g, "-")
            let orderList = await conn.get(`&deliveryStore=${'Interlagos_1'}`, 'EPP/Order.php');
            if (orderList && !orderList.error) { orderList.data = orderList.data.reverse(); setOrdersList(orderList.data) };
            let menuList = await conn.get(null, 'EPP/Menu.php');
            if (!menuList.error) {
                menuList.data.unshift({ idMenu: "", description: "Avulso", status: "1" })
                setMenusList(menuList.data);
            };
            let logMenu = await conn.get(null, 'EPP/LogMenu.php');
            if (!logMenu.error) setLogsMenusList(logMenu.data);
        }
        loadInit();
    }, [])
    useEffect(() => { console.log(menusList) }, [menusList])
    return (
        <div id="HomePage" className='d-flex h-100 flex-direction-colum '>
            <form className="col-6 p-1">
            <ClientField 
                    itemForm={itemForm} 
                    orderCod={orderCod} 
                    setOrderCod={setOrderCod} 
                    nameClient={nameClient} 
                    setNameClient={setNameClient} 
                    foneClient={foneClient} 
                    setFoneClient={setFoneClient} 
                    email={email} 
                    setEmail={setEmail} 
                    dateOrder={dateOrder} 
                    setDateOrder={setDateOrder} 
                />                
                <OrderField
                    itemForm={itemForm}
                    selectForm={selectForm}
                    menusList={menusList}
                    setMenusList={setMenusList}
                    signal={signal}
                    setSignal={setSignal}
                    total={total}
                    setTotal={setTotal}
                    logSales={logSales}
                    setLogSales={setLogSales}
                    logsMenusList={logsMenusList}
                    observation={observation}
                    setObservation={setObservation}
                />
                <DeliveryField
                    itemForm={itemForm}
                    selectForm={selectForm}
                    setDateDelivery={setDateDelivery}
                    setHoursDelivery={setHoursDelivery}
                    setLocalDelivery={setLocalDelivery}
                    dateDelivery={dateDelivery}
                    hoursDelivery={hoursDelivery}
                    localDelivery={localDelivery}
                />
            </form>
            <section className="col p-1">
                Principal
            </section>
        </div>
    )
    function itemForm(label, placInput, titleInput, typeInput, divLength, value, funSetValue, enabled, funAssistant) {
        return (
            <div className={`col-${divLength} my-1`}>
                <label>{label}</label>
                <input placeholder={placInput ? placInput : ""} type={typeInput} title={titleInput ? titleInput : ""} onKeyUp={(event) => { funAssistant && funAssistant(event.target.value); }} onChange={(element) => funSetValue(element.target.value)} className="form-control p-1" disabled={enabled} value={value} />
            </div>
        )
    }
    function selectForm(label, divLength, list, defaultValue, funSetValue, funAssistant) {
        return (
            <div className={`col-${divLength} my-1`}>
                <label>{label}</label>
                <select className="form-control" onBlur={(element) => funAssistant && funAssistant(element.target.value)} onChange={(element) => { funSetValue(element.target.value); }} value={defaultValue}>
                    <option value="0" hidden>Selecione</option>
                    {list.map((item, index) => <option key={index} value={item.id}>{item.value}</option>)}
                </select>
            </div>
        );
    }
}