// VARIÁVEIS 
let inputTexto = document.getElementById("inputTexto")
let btn = document.getElementById('btn');
let inputBase = document.getElementById('inputBase');
let resultado = document.querySelector('.resultado');
let filtro = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
let radiobtn1 = document.getElementById('radio1');
let radiobtn2 = document.getElementById('radio2');
let titulo = document.getElementById('inputTextoTitulo');
let txtbtn = document.getElementById('btn');


radiobtn1.addEventListener('click', function(){

    titulo.innerHTML = 'Texto para ser codificado:'
    inputTexto.value = ""

})


radiobtn2.addEventListener('click', function(){

    titulo.innerHTML = 'Texto para ser decodificado:'
    inputTexto.value = ""

})

// MUDAR O QUE TA ESCRITO NO BOTÃO
radiobtn1.addEventListener('click', function(){

    txtbtn.innerHTML = 'CODIFICAR:'
    inputTexto.value = ""

})


radiobtn2.addEventListener('click', function(){

    txtbtn.innerHTML = 'DECODIFICAR'
    inputTexto.value = ""

})


//  MOSTRAR OU ESCONDER O INPUT DE QUANTIDADE DE SALTOS
let baseContainer = document.getElementById('baseContainer');
let escolherDecodificacao = document.getElementById('escolherDecodificacao');

escolherDecodificacao.addEventListener('change', function(){

    if (escolherDecodificacao.value == "optCifra") {

        baseContainer.style.display = 'block'
        inputTexto.value == ""

    } else {

        baseContainer.style.display = 'none'
        
    }

});


// CONDICIONAIS: CRIPTOGRAFAR OU DESCRIPITOGRAFAR EM BASE 64 OU CIFRA DE CESAR
btn.addEventListener('click', function () {

    if (inputTexto.value === "") {

        alert("Campo de texto vazio. Tente novamente.")

    } else if (inputBase.value === "" && escolherDecodificacao.value == "optCifra") {

        alert("Escolha o valor de deslocamento")

    } else if (radiobtn1.checked && escolherDecodificacao.value == "optCifra") {

        resultado.innerText = codificaCesar(inputTexto.value, parseInt(inputBase.value))

    } else if (radiobtn1.checked && escolherDecodificacao.value == "optBase64") {

        resultado.innerText = codificaBase64(inputTexto.value)

    } else if (radiobtn2.checked && escolherDecodificacao.value == "optBase64") {

        resultado.innerText = decodificaBase64(inputTexto.value)

    } else if (radiobtn2.checked && escolherDecodificacao.value == "optCifra") {

        resultado.innerText = decodificaCesar(inputTexto.value, parseInt(inputBase.value))

    }

})


//CODIFICAR EM CIFRA DE CÉSAR
function codificaCesar(str, base) {

    let txtCodificado = " ";

    for (let i = 0; i < str.length; i++) {

        let asciiNum = str[i].charCodeAt()
        
        if (asciiNum >= 65 && asciiNum <= 90) {

            codigo = (((asciiNum - 65) + base) % 26) + 65

        } else if (asciiNum >= 97 && asciiNum <= 122) {

            codigo = (((asciiNum - 97) + base) % 26) + 97

        } else if(asciiNum >= 32 && asciiNum <= 47 || asciiNum >= 58 && asciiNum <= 64 || asciiNum >= 91 && asciiNum <= 96 || asciiNum >= 123 && asciiNum <= 126 || asciiNum >= 48 && asciiNum <= 57){
            
            codigo = asciiNum;

        }else if( asciiNum !== filtro){

            codigo = asciiNum

        }

        txtCodificado += String.fromCharCode(codigo);

    }

    return txtCodificado

}


//DECODIFICAR EM CIFRA DE CÉSAR
function decodificaCesar(str, base) {

    let txtDecodificado = " ";

    for (let i = 0; i < str.length; i++) {

        let asciiNum = str[i].charCodeAt()

        if (asciiNum >= 65 && asciiNum <= 90) {

            codigo = (((asciiNum + 65) - base) % 26) + 65

        } else if (asciiNum >= 97 && asciiNum <= 122) {

           if((asciiNum - 97) - base < 0){

            codigo = (((asciiNum - 97) - base + 26) % 26) + 97

           }else{

            codigo = (((asciiNum - 97) - base) % 26) + 97

           }

        }else if (asciiNum >= 32 && asciiNum <= 47 || asciiNum >= 58 && asciiNum <= 64 || asciiNum >= 91 && asciiNum <= 96 || asciiNum >= 123 && asciiNum <= 126 || asciiNum >= 48 && asciiNum <= 57) {
           
            codigo = asciiNum;

        }else if( asciiNum !== filtro){

            codigo = asciiNum

        }

        txtDecodificado += String.fromCharCode(codigo)
        
    }

    return txtDecodificado

}

//CODIFICAR EM BASE64
function codificaBase64(txt) {

    return btoa(txt)

}

//DECODIFICAR EM BASE64
function decodificaBase64(txt) {

    return atob(txt)

}
