
function readyForClientOrder()
{

  console.log("inside 'authorised' sendClientOrder.js");

// Unique ID Generator...
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

let supplierID = document.getElementById("supplierID").innerText;
// let supplierID = localStorage.getItem("supplierID");
let checkBoxesCollection = [];
let clientRequestedProducts = [];
let clientName = "";
let clientPhone = "";
let clientBookingDateAndTime = "";
// let clients = "";
let supplierTarget = ""
let clientOrder ={};

console.log(document.querySelectorAll(".productCheckbox").length);
document.querySelectorAll(".productCheckbox").forEach(chechBoxesCollection)

function chechBoxesCollection(item)
{
  console.log("pushed");
  checkBoxesCollection.push(item);
}
for(i=1;i<=checkBoxesCollection.length;i++)
{
  var checkboxNumber = "#checkbox"+i
  document.querySelector(checkboxNumber).addEventListener('change', function()
  {
    let label = "#label"+(this.id);
    if (this.checked)
      {
        clientRequestedProducts.push(document.querySelector(label).textContent+" ");
        console.log(document.querySelector(label).textContent+"  is added to array");
        console.log(clientRequestedProducts+" ARE REQUESTED");
      }
    else
      {
        let indexOfProduct = clientRequestedProducts.indexOf(document.querySelector(label).textContent+" ");
        clientRequestedProducts.splice(indexOfProduct,1);
        console.log(document.querySelector(label).textContent+"  is removed from array");
        console.log(clientRequestedProducts);
      }
  });
}
      // Date/Time, Name and Phone inputs validation code

      var nameIsValid = false;
      var phoneIsValid = false;
      var DateAndTimeAreValid = false;

      // date/time validation...
      document.getElementById("datetime-picker").addEventListener('change', function()
      {
        clientBookingDateAndTime  = document.getElementById("datetime-picker").value;
        if (clientBookingDateAndTime != "")
          {
            console.log(clientBookingDateAndTime);
            document.getElementById("required3").classList.add("d-none");
            document.getElementById("required33").classList.remove("d-none");
            DateAndTimeAreValid = true;
          }
        else
          {
            document.getElementById("required3").classList.remove("d-none");
            document.getElementById("required33").classList.add("d-none");
            DateAndTimeAreValid = false;
          }
      });
      
      

      // name input validation...
      document.getElementById("nameInput").addEventListener('input', function(){
        if (document.getElementById("nameInput").value != "")
          {
            document.getElementById("required1").classList.add("d-none");
            document.getElementById("required11").classList.remove("d-none");
            nameIsValid = true;
            console.log(nameIsValid);
          }
        else
          {
            document.getElementById("required1").classList.remove("d-none");
            document.getElementById("required11").classList.add("d-none");
            nameIsValid = false;
          }
      });

      // phone input validation...
      document.getElementById("phoneInput").addEventListener('input', function(){
        let enteredPhone = document.getElementById("phoneInput").value;
        let arabicRegexFormat = /^[+]*[(]{0,1}[\u0030-\u0039\u0660-\u0669]{1,3}[)]{0,1}[\./\u0030-\u0039\u0660-\u0669]*$/g;
        let englishRegexFormat = /^[+]*[(]{0,1}[\u0030-\u0039\u0660-\u0669]{1,3}[)]{0,1}[\./\u0030-\u0039\u0660-\u0669]*$/g;
           
            console.log(phoneIsValid);

            // check phone if  input number contains non-number characters  
                if ((enteredPhone.match(arabicRegexFormat) || enteredPhone.match(englishRegexFormat)) && enteredPhone != "")
                {
                  console.log("valid phone format");
                  document.getElementById("required2").classList.add("d-none");
                  document.getElementById("required22").classList.remove("d-none");
                  document.getElementById("required222").classList.add("d-none");
                  phoneIsValid = true;
                }
                else
                {
                  if (!enteredPhone.match(arabicRegexFormat) || !enteredPhone.match(englishRegexFormat))
                  {
                    document.getElementById("required2").classList.remove("d-none");
                    document.getElementById("required22").classList.add("d-none");
                    document.getElementById("required222").classList.add("d-none");
                  }
                  if (enteredPhone != "")
                  {
                    console.log("invalid phone number format");
                    document.getElementById("required2").classList.add("d-none");
                    document.getElementById("required22").classList.add("d-none");
                    document.getElementById("required222").classList.remove("d-none");
                  }
                  phoneIsValid = false;                  
                }
      });

  document.querySelector("#bookingButton").addEventListener("click", function()
    {
      if (nameIsValid && phoneIsValid && DateAndTimeAreValid)
      {
        let clientID = uuidv4();

        console.log("name and phone are valid...");
        clientName = document.querySelector("#nameInput").value;
        console.log("name: "+clientName);
        clientPhone = document.querySelector("#phoneInput").value;
        console.log("phone: "+clientPhone);
        clientBookingDateAndTime = document.getElementById("datetime-picker").value;
        clientOrder ={clientID:clientID, supplierID:supplierID, clientName:clientName, clientPhone:clientPhone, clientBookingDateAndTime:clientBookingDateAndTime, clientRequestedProducts:clientRequestedProducts};
        console.log(clientOrder);

        
        let supplierProfile = {};

        let key = clientID;
        let newClient = {};
        newClient[key]= clientOrder;
        let clients = {clients:newClient};

        // var dbRef = db.collection('suppliers').doc('Supplier Profiles').set({
        //   [supplierID] : clients
        // }, { merge: true });
        var clientRef = db.collection('clients').doc(supplierID).set({
          [clientID] : clientOrder
        }, { merge: true });

        // Alert Message Code
        // Swal.fire(
        //   'تم الحجز بنجاح!',
        //   '',
        //   'success'
        // )
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'تم الحجز بنجاح',
          showConfirmButton: false,
          timer: 1800
        })

        setTimeout(function(){window.location.replace("../home.html")}, 1800);
        
        // var setWithMerge = cityRef.set({
        //     capital: true
        // }, { merge: true });
      }
    else
      {
        if (!DateAndTimeAreValid)
        {
          document.getElementById("required3").classList.remove("d-none");
          console.log("date/time are NOT VALID!");
        }
        if (!nameIsValid)
        {
          document.getElementById("required1").classList.remove("d-none");
          console.log("name is NOT VALID!");
        }
        if (!phoneIsValid)
        {
          document.getElementById("required2").classList.remove("d-none");
          document.getElementById("required222").classList.add("d-none");
          console.log("phone is NOT VALID!");
        }
      }
  }
);


  // var clientContactInfo = {name:"King Salman Road", phone:0138990000}
  // var clientRequestedProducts1 = {clientRequests, clientBooking, clientContactInfo}
  //
  // var clientRequests = {request1:"King Abdullah Road", request2:0138994243}
  // var clientBooking = {date:"King Salman Road", time:0138990000}
  // var clientContactInfo = {name:"King Salman Road", phone:0138990000}
  // var clientRequestedProducts2 = {clientRequests, clientBooking, clientContactInfo}
  // var  clients= {clientRequestedProducts1, clientRequestedProducts2}

}
