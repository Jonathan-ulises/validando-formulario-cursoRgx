const DOMElements = (() => {
    const firstName = document.querySelector('#first_name')
    const password = document.querySelector('#password')
    const email = document.querySelector('#email')
    const contactForm = document.querySelector('#contact_form')
    const topic = document.querySelector('#topic')
    const formButton = document.querySelector('#form_button')
    const criterios = document.querySelectorAll('.criterios')
    return {
        firstName,password,email,contactForm,topic,formButton,criterios
    }
})()

const {
    firstName,
    password,
    email,
    contactForm,
    topic,
    formButton,
    criterios
} = DOMElements;

console.log('element => ', firstName)

//! CONDICIONES
const validConditions = {
    isPasswordCorrect: false,
    isTopicCorrect: false,
    isNameCorrect: false,
    isEmailCorrect: false
}

//! EXPRECIONES

const validTopic = /^felicitaci(o|\W)n|queja/gi
const validName = /([A-Z][a-z]{1,}\s){3}/g
const validEmail = /^[a-zA-Z0-9.!#$%++/=?^_{|}-~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)/g
const validPassword = [
    {name: "crit-min5",condition:(value) => value.length > 5},
    {name: "crit-mayus",condition:(value) => value.search(/[A-Z]/g) > -1},
    {name: "crit-num",condition:(value) => value.search(/[0-9]/g) > -1},
    {name: "crit-symb",condition:(value) => value.search(/[!"#$%&/()=?¡¿]/g) > -1}
]

//! Verificar Datos
password.oninput = () => {
    validPassword.forEach((item, idx) => {
        changeClassCriteria(item, idx, password.value)
    });
    if (validPassword.every(item => item.condition(password.value) === true)) {
        validConditions.isPasswordCorrect = true
    }
    console.log('val_pass => ', validConditions.isPasswordCorrect)
}

//FUNCIONES UTILES
const changeClassCriteria = (item, idx, value) => {
    if (item.condition(value) && item.name === criterios[idx].dataset.criterio) {
        if (criterios[idx].classList.contains("incorrecto")) {
            criterios[idx].classList.replace("incorrecto", "correcto")
        }
        criterios[idx].classList.add("correcto")
    } else {
        criterios[idx].classList.replace("correcto", "incorrecto")
    }
}

//! VERIFICAR DATOS
topic.onblur = () => {
    console.log('val_topic => ', validTopic.test(topic.value))
    validConditions.isTopicCorrect = validTopic.test(topic.value)
}

firstName.onblur = () => {
    console.log('val_firsrt => ', validName.test(firstName.value))
    validConditions.isNameCorrect = validName.test(firstName.value)
}

email.onblur = () => {
    console.log('val_email => ', validEmail.test(email.value))
    validConditions.isEmailCorrect = validEmail.test(email.value)
}

contactForm.onsubmit = (e) => {
    e.preventDefault()
    if (Object.values(validConditions).every((condition) => condition === true)) {
        console.log('Enviando Formulario')
        return true
    } else {
        console.log('Completa todos los campos')
        return false
    }
}