const firebaseConfig = {
    apiKey: "AIzaSyD5QrqpyY2kS2eFvV2ruk_EYF52ly_6Szw",
    authDomain: "illumine-js-db.firebaseapp.com",
    databaseURL: "https://illumine-js-db-default-rtdb.firebaseio.com",
    projectId: "illumine-js-db",
    storageBucket: "illumine-js-db.appspot.com",
    messagingSenderId: "978079381842",
    appId: "1:978079381842:web:614f13d0d91b3763c0228b"
  };

firebase.initializeApp(firebaseConfig)

var illumineFormDB=firebase.database().ref('illumineForm')

const yard = document.getElementById("yard")
const customer =document.getElementById("customer")
const agent =document.getElementById("agent1")
const date =document.getElementById("date")
const amount =document.getElementById("amount")
const payment_type= document.getElementById("payment-types")
const active_check =document.getElementById("check-active")
const usage = document.getElementById("usage");
const size= document.getElementById("size")
const unit_no= document.getElementById("unit-number")
const lessee = document.getElementById("lessee1")
const estimate_type=document.getElementById("estimate-types")
const damage_type=document.getElementById("damage-types")
const udm = document.getElementById("udm")
const billto = document.getElementById("billto1")
const remarks= document.getElementById("remarks")
const save_btn =document.getElementById("save_button")
const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl,1000))



function call(){
 
    if (yard.value=="HK"&& customer.value=="JACK"){
        agent.value="Not Applicable"
        agent.setAttribute('readonly',true)
    }
    else{
        agent.value=""
        agent.removeAttribute('readonly')
    }
}


yard.addEventListener("input",call)

customer.addEventListener("input",call)



function check(){

    
    if (amount.value==""){
        payment_type.setAttribute('disabled',true)
    }
    else{
        payment_type.removeAttribute('disabled')
    }
}

function decimal_check(){
    amount.value = amount.value.replace(/[^0-9.]/g, '');

        // Check if there are more than one decimal point
        const decimalCount = (amount.value.match(/\./g) || []).length;
        if (decimalCount > 1) {
            // If more than one decimal point, remove extra decimal points
            amount.value = amount.value.replace(/\./g, '');
        }

        // Check if the length exceeds the maximum allowed characters
        if (amount.value.length > 10) {
            // If exceeds, truncate the value to 10 characters
            amount.value = amount.value.slice(0, 10);
        }
}


amount.addEventListener("input",decimal_check)

amount.addEventListener("input",check)

var today = new Date()
var yyyy = today.getFullYear()
var mm = today.getMonth()+1
var dd = today.getDate()

if (mm<10){
    mm='0'+mm
}
if (dd<10){
    dd='0'+dd
}

date.value=dd+'/'+mm+'/'+yyyy
date.setAttribute('readonly',true)




function integer_check(){
    size.value = size.value.replace(/[^0-9.]/g, '');

        // Check if there are more than one decimal point
    const decimalCount = (size.value.match(/\./g) || []).length;
    if (decimalCount > 1) {
        // If more than one decimal point, remove extra decimal points
        size.value = size.value.replace(/\./g, '');
    }
}

function integer_check1(){
    unit_no.value = unit_no.value.replace(/[^0-9.]/g, '');

        // Check if there are more than one decimal point
    const decimalCount = (unit_no.value.match(/\./g) || []).length;
    if (decimalCount > 1) {
        // If more than one decimal point, remove extra decimal points
        unit_no.value = unit_no.value.replace(/\./g, '');
    }
}


function active_checker(){

    if(!active_check.checked){
        alert("Please toggle active for successful transaction")
    }
}



size.addEventListener("input",integer_check)

unit_no.addEventListener("input",integer_check1)


active_check.addEventListener("change",active_checker)

const required_field = document.getElementsByClassName("required");

function collect_data_and_check(e){
    e.preventDefault()
    let active=true
    for(var i=0;i<required_field.length;i++){
        var fieldValue = required_field[i].value.trim();
        if (fieldValue===""){
            active=false
            break;
        }

    }
    if(active){
        toastList[1].show()
        setTimeout(function(){submit_to_DB()},5000);
    }
    else{
        toastList[0].show()
    }
 
}

function submit_to_DB(){
    var yard_val=yard.value;
    var customer_val=customer.value;
    var unit_no_val =unit_no.value;
    var usage_val = usage.value;
    var agent_val =agent.value;
    var curr_date =date.value;
    var amount_val = amount.value;
    var payment_type_val= payment_type.value;
    var lessee_val = lessee.value
    var estimate_types= estimate_type.value
    var damage_types =damage_type.value;
    var udm_val = udm.value
    var billto_val =billto.value
    var remarks_val = remarks.value
 
    console.log(yard_val)
    var new_form_db = illumineFormDB.push()

    new_form_db.set({
        yard :yard_val,
        customer_name:customer_val,
        unit_number:unit_no_val,
        usage:usage_val,
        agent:agent_val,
        date : curr_date,
        lessee : lessee_val,
        estimate_type:estimate_types,
        damage_type : damage_types,
        UDM : udm_val,
        bill_to: billto_val,
        amount :amount_val,
        payment_type: payment_type_val,
        remarks : remarks_val
    })

    location.reload()
}


save_btn.addEventListener("click",collect_data_and_check)

 
