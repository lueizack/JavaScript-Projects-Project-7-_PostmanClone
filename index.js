console.log("This is POSTMAN CLONE index.js");

//Utility functions:
// 1.Utility function to get DOM element  from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//Initialize number of parameters 
let addedParamsCount = 0;

//Hides parameterBox initially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//If user click on params box ,hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//If user clicks on json box,hide the params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

//If the user clicks on + button,add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{  
    
     let params = document.getElementById('params');
     let string = ` <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="parameterKey${addedParamsCount + 2}"
                            placeholder="Enter parameter ${addedParamsCount + 2} key"
                        />
                        </div>
                        <div class="col-md-4">
                        <input
                            type="text"
                            class="form-control"
                            id="parameterValue${addedParamsCount + 2}"
                            placeholder="Enter parameter ${addedParamsCount + 2} value"
                        />
                        </div>
                        <button id="addParam" class="btn btn-primary deleteParam"> - </button>
                    </div>`
                    //Convert the element string to DOM node 
                    let paramElement = getElementFromString(string);
                    params.appendChild(paramElement);
                    //Add an Event Listener to remove the parameter by clicking - button 
                    let deleteParam = document.getElementsByClassName('deleteParam');
                    for (item of deleteParam) {
                        item.addEventListener('click',(e)=>{
                            e.target.parentElement.remove();
                        })
                    }
                    addedParamsCount ++;
})

//If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    //Show please wait in the responce box to request patience from the user
    document.getElementById('responsePrism').innerHTML = "Please wait... Fetching response";

    //Fetch all thr values user has entered 
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    
    
    //If the use has selected params option instead of json collect all the parameters object 
    if(contentType == 'params'){
        data ={};
        
        for( i = 0; i < addedParamsCount + 1; i++) {
            if(document.getElementById('parameterKey'+ (i+1)) != undefined){
                let key = document.getElementById('parameterKey'+ (i+1)).value;
                let value = document.getElementById('parameterValue'+ (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } 
    else {
        data = document.getElementById('requestJsonText').value;
    }
    
    //Log all the values in the console for debugging
    console.log("URL is ", url);
    console.log("requstType is ", requestType);
    console.log("contentType is ", contentType);
    console.log("data is ", data);

  // if the request type is POST, invoke fetch API to create a POST request
    if (requestType == 'GET'){
        fetch(url,{
            method : 'GET',
        })
        .then(response => response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method : 'POST',
            body : data,
            headers :{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
   
});
