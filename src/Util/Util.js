import { Connection } from "./RestApi";

export default class Util {
    setValue(value,setOrigin){
        let newValue = value;
        console.log(newValue);
        setOrigin(newValue);
    }

    loadLocalStorage(user){
        console.log(user)
        localStorage.setItem("token",user.session);
        localStorage.setItem("id",user.id);
    }
    async validateAccess(){
        let connection = new Connection();
        let result = await connection.get(`&user_id=${localStorage.getItem('id')}&application_id=14&validation`,"CCPP/UserAccess.php");
        return result;
    }
    dateCurrent() {
        let data = new Date();
        let day = String(data.getDate()).padStart(2, '0');
        let month = String(data.getMonth() + 1).padStart(2, '0');
        let year = data.getFullYear();
        return year + "-" + month + "-" + day
    }
    convertDateBR(date) {
        let newDate, assistent;
        assistent = date.split('-');
        newDate = assistent[2] + "/" + assistent[1] + "/" + assistent[0]
        return newDate;
    }
}