const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensage');
const boton = document.getElementById('submit');
const warnings = document.querySelector('#warnings');
const br = document.createElement("br")

nombre.addEventListener("blur", validNotEmpty);
email.addEventListener("blur", validNotEmpty);
asunto.addEventListener("blur", validNotEmpty);
mensaje.addEventListener("blur", validNotEmpty);

nombre.addEventListener("blur", validLength);
asunto.addEventListener("blur", validLength);
mensaje.addEventListener("blur", validLength);

email.addEventListener("blur", validemail);



function validNotEmpty(event) {
    event.preventDefault();
    const idComponent = event.target.id;
    const value = event.target.value;
    const child = document.getElementById(`notEmpty-${idComponent}`);
    if (value == "") {
        if (!child) {
            const element = document.createElement(`div`)
            element.setAttribute("id", `notEmpty-${idComponent}`)
            const node = document.createTextNode(`Coloca tu ${idComponent}`)
            element.appendChild(node);
            element.appendChild(br);
            warnings.appendChild(element);
        }
    } else if (child) {

        warnings.removeChild(child)
    }
    validFields();
};

function validLength(event) {
    event.preventDefault();
    console.log("Target", event.target)
    let num = 50;
    const idComponent = event.target.id;
    if (idComponent == 'mensage')
        num = 500;
    const value = event.target.value;
    const child = document.getElementById(`maxLength-${idComponent}`);
    if (value.length > num) {
        if (!child) {
            const element = document.createElement(`div`)
            element.setAttribute("id", `maxLength-${idComponent}`)
            const node = document.createTextNode(`Máximo valor permitido en ${idComponent} es ${num}`)
            element.appendChild(node);
            element.appendChild(br);
            warnings.appendChild(element);
        };

    } else if (child) {
        warnings.removeChild(child);
    };
    validFields();
};

function validemail(event) {
    event.preventDefault();
    var emailtrue = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const idComponent = event.target.id;
    const value = event.target.value;
    const child = document.getElementById(`email-${idComponent}`);
    if (!emailtrue.test(value)) {
        if (!child) {
            const element = document.createElement(`div`)
            element.setAttribute("id", `email-${idComponent}`)
            const node = document.createTextNode(`El formato email es incorrecto`)
            element.appendChild(node);
            element.appendChild(br);
            warnings.appendChild(element);
        };

    } else if (child) {
        warnings.removeChild(child);
    };
    validFields();
};

function validFields() {

    let val = true;
    var elements = document.querySelectorAll("#form input")

    elements.forEach(element => {
        console.log({ element })

        if (element.value === "")
            val = false;

    });
    const nodes = warnings.querySelectorAll('*')
    console.log({ val })
    if (val && nodes.length == 0) {
        console.log("sdasa", true);
        boton.removeAttribute("disabled");
    } else {
        console.log("sdasa", false);
        boton.setAttribute('disabled', 'disabled');

    }
}


function sendMail() {
    var name = $('#contact #name').val();
    var email = $('#contact #email').val();
    var message = $('#contact textarea').val();
    window.location.href = 'mailto:ziprila@company.com?subject=The subject - ' + name + ' (' + email + ')' + '&body=' + message;
};