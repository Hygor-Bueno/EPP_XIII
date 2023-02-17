import React, { useState } from 'react';
import { Connection } from '../../Util/RestApi';

export default function OrderField(props) {
    //Listas

    const [riceList, setRiceList] = useState([]);
    const [dessertsList, setDessertsList] = useState([]);

    const [menu, setMenu] = useState("");
    const [rice, setRice] = useState("");
    const [dessert, setDessert] = useState("");
    const [menuPLU, setMenuPLU] = useState("");
    const [pending, setPedding] = useState("");

    const [contObs, setContObs] = useState(props.observation.length);
    const limitObs = 250
    //Mascaras Json
    const maskLogSales = {
        epp_id_product: "",
        quantity: "",
        price: "",
        epp_id_order: "",
        menu: ""
    }

    return (
        <fieldset className='form-group row border-bottom border-dark'>
            <legend>Dados do pedido</legend>
            {props.itemForm("Cód.:", "", "Código do menu.", "number", 2, menuPLU, setMenuPLU, true)}
            {props.selectForm("Menu", 4, formatJsonForSelect(props.menusList, "idMenu", "description"), menu, selectMenu)}
            {props.selectForm("Arroz", 3, formatJsonForSelect(riceList, "idProduct", "description"), rice, setRice, getPluMenu)}
            {props.selectForm("Sobremesa", 3, formatJsonForSelect(dessertsList, "idProduct", "description"), dessert, setDessert, getPluMenu)}

            <div className='col-12'>
                <label><b>Adicional:</b></label>
                <div id="divAdditionalItems" className='border rounded my-1 p-1'>
                    <div><b>Cód.:</b>54037.</div>
                    <div><b>Descrição:</b> Pave Peg Pese 1kg - 1 un. (Preço unit/kg R$ 48.90)</div>
                    <div><b>Subtotal:</b> R$ 48.90</div>
                    <br />
                    <div><b>Cód.:</b>54037.</div>
                    <div><b>Descrição:</b> Pave Peg Pese 1kg - 1 un. (Preço unit/kg R$ 48.90)</div>
                    <div><b>Subtotal:</b> R$ 48.90</div>
                    <br />
                </div>
            </div>
            <div id="txtareaObservation" className={"col-12 my-1"}>
                <div>
                    <label><b>Observações:</b> <i id="limitAlertObs" className="legend legend-alert">({contObs}/250)</i></label>
                    <textarea rows="2" id="txtObservation" value={props.observation} onChange={(event) => {
                        let newElement = event.target;
                        let alert = document.getElementById("limitAlertObs");
                        if (newElement.value.length <= limitObs) {
                            props.setObservation(newElement.value);
                            setContObs(newElement.value.length);
                            alert.classList.contains("text-danger") && alert.classList.remove("text-danger");
                        } else {
                            alert.classList.add("text-danger");
                        }
                    }} className='rounded form form-control textareaDefault'></textarea>
                </div>
            </div>

            {props.itemForm("Sinal:", "", "Sinal dado pelo cliente no ato da compra.", "number", 2, props.signal, props.setSignal, false, reloadTotal)}
            {props.itemForm("Pendente:", "", "Valor que o cliente precisa pagar.", "number", 2, pending, setPedding, true)}
            {props.itemForm("Total.:", "", "Total do pedido.", "number", 2, props.total, props.setTotal, true)}
        </fieldset>
    )

    function selectMenu(value) {
        setMenu(value);
        riceAndDessertClean();
        moneyClean();
        props.logSales.length > 0 && deleteMenuLog();
        props.signal !== "" && reloadTotal();
        let list = props.logsMenusList;

        let filteredMenu = list.filter((item) => {
            if (item.menu["idMenu"] === value) return item;
        });
        let filteredRice = filteredMenu.filter((item) => {
            if (item.logMenu["typeBase"] === "Rice") return item;
        });
        let filteredDessert = filteredMenu.filter((item) => {
            if (item.logMenu["typeBase"] === "Dessert") return item;
        });

        let riceList = filteredRice.map(item => item.product);
        let dessertList = filteredDessert.map(item => item.product);

        let distinctRice = distinctItems(riceList, "idProduct");
        let distinctDessert = distinctItems(dessertList, "idProduct");

        setDessertsList([...distinctDessert]);
        setRiceList([...distinctRice]);
    }

    function distinctItems(list, key) {
        let lookup = {};
        let items = list;
        let result = [];
        for (let i = 0; items[i]; i++) {
            let value = items[i][key];
            if (!(value in lookup)) {
                lookup[value] = 1;
                result.push(items[i]);
            }
        }
        return result;
    }
    async function getPluMenu() {
        if (menu !== "", rice !== "", dessert !== "") {
            let items = props.logsMenusList.filter(itemMenu => (itemMenu.logMenu.eppIdMenu === menu && (itemMenu.logMenu.eppIdProduct === rice || itemMenu.logMenu.eppIdProduct === dessert)) && itemMenu);
            let plu = equalsItems(items.map(item => item.logMenu), "pluMenu");
            setMenuPLU(plu.pluMenu);
            await addItemLogSale(plu);
            reloadTotal();
        }
    }
    function formatJsonForSelect(array, keyId, keyValue) {
        let result = [];
        array.forEach(element => {
            let item = {};
            item.id = element[keyId];
            item.value = element[keyValue];
            result.push(item);
        });
        return result;
    }

    function riceAndDessertClean() {
        setRice("");
        setDessert("");
        setMenuPLU("");
    }
    function moneyClean() {
        setPedding(0.00);
        props.setTotal(0.00);
    }
    function removeItem(idProduct) {
        let items = props.logSales;
        items.forEach((item, index) => {
            if (idProduct === item.epp_id_product) {
                items.splice(index, 1);
            }
        })
        props.setLogSales([...items]);
    }

    function reloadTotal() {
        let items = props.logSales;
        let relTotal = 0.0;
        items.forEach(lSale => {
            relTotal += parseFloat(lSale.price);
        });
        setPedding(relTotal - props.signal);
        props.setTotal(relTotal);
    }

    function deleteMenuLog() {
        let items = props.logSales;
        items.forEach(item => {
            if (item.menu === 1) {
                removeItem(item.epp_id_product);
            }
        });
    }
    function equalsItems(list, key) {
        let lookup = {};
        let items = list;
        let result = {};
        for (let i = 0; items[i]; i++) {
            let value = items[i][key];
            let validation = (value in lookup);
            if (!validation) {
                lookup[value] = 1;
            } else {
                result = items[i];
            }
        }
        return result;
    }
    async function addItemLogSale(item) {
        const list = props.logSales;
        let newItem = await itemsJson(item.pluMenu, true);
        list.push(newItem);
        props.setLogSales([...list]);
    }
    async function itemsJson(idProduct, menu, quantity) {
        let item = maskLogSales;
        let price = 0;
        const connection = new Connection();
        //await connection.get(`&id_product='${value}'&id_shop=${user.getShop().split("_")[1]}`, "EPP/Product.php");
        let itemConsinco = await connection.get(`&id_product='${idProduct}'&id_shop=${1}`, "EPP/Product.php");
        if (itemConsinco.length > 0) price = itemConsinco[0].PRECO;

        item.quantity = menu ? 1 : quantity;
        item.menu = menu ? 1 : 0;
        item.epp_id_product = idProduct;
        item.price = price;
        item.epp_id_order = "";

        return item;
    }
}