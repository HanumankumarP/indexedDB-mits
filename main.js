function store(){
  var name=document.querySelector("#name").value;
  var email=document.querySelector("#email").value;
  var password=document.querySelector("#password").value;
  var result;
  var store,transaction;
  if(name==''){
    alert("please fill this field");
  } else if(email==''){
    alert("Email field is must");
  } else if(password==''){
    alert("password field is must");
  } else {
    var indexedDB=window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    if(!indexedDB){
      alert("Browser not supported");
    }
    var open=indexedDB.open("Sample",1);
    open.onupgradeneeded=function(e){
      result=e.target.result;
      store=result.createObjectStore("form-data",{keyPath:"email"});
      console.log("success");
    }

    open.onerror=function(e){
      console.log("Sorry error");
    }

    open.onsuccess=function(e){
      result=e.target.result;
      transaction=result.transaction(["form-data"],"readwrite");
      store=transaction.objectStore("form-data");
      store.put({
        name:name,
        email:email,
        password:password
      });

    }
  }
}

function get(){
  var final;
  var email=document.querySelector("#email").value;
  var result;
  var store,transaction;
   if(email==''){
    alert("Email field is must");
  } else {
    var indexedDB=window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    if(!indexedDB){
      alert("Browser not supported");
    }
    var open=indexedDB.open("Sample",1);
    open.onupgradeneeded=function(e){
      result=e.target.result;
      store=result.createObjectStore("form-data",{keyPath:"email"});
      console.log("success");
    }

    open.onerror=function(e){
      console.log("Sorry error");
    }
    var output="";
    open.onsuccess=function(e){
      result=e.target.result;
      transaction=result.transaction(["form-data"],"readwrite");
      store=transaction.objectStore("form-data");
      final=store.get(email);
      final.onsuccess=function(e){
        var finalresult=e.target.result;
        output+="<tr> <td>"+finalresult.name+"</td> <td>"+finalresult.email+"</td> </tr>";
        var tbody=document.querySelector("#tbody");
        tbody.innerHTML=output;
        document.querySelector("#email").value="";
      }
    }
  }
}
