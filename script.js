//Obtem o formulário
const form = document.querySelector('#form')
//Obtem os inputs do formulário
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const passwordConfirmation = document.querySelector('#password-confirmation')
//Adiciona um evento quando o submit do formulário for clicado e passa uma função
form.addEventListener('submit', (e)=>{
    // Não deixa a página ser recarregada quando o evento for acionado 
    e.preventDefault()
    //Chama a função que verifica se os campos digitados são válidos
    checkInputs()
})
//Função que verifica se os campos são válidos
function checkInputs(){
    //Obtem os valores dos nos inputs
    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value
    const passwordConfirmationValue = passwordConfirmation.value
    //Verifica se usuário está válido
    if(usernameValue === ''){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(username, 'O nome de usuário é obrigatório.')
    }else{
        //Chama a função setSuccessFor passando o input
        setSuccessFor(username)
    }
    //Verifica se email está válido
    if(emailValue === ''){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(email, 'O email é obrigatório.')
    }else if(!checkEmail(emailValue)){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(email, 'Insira um email válido.')
    }else{
        //Chama a função setSuccessFor passando o input
        setSuccessFor(email)
    }
    //Verifica se a senha está válida
    if(passwordValue === ''){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(password, 'A senha é obrigatória.')
    }else if(passwordValue.length < 7){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(password, 'A senha precisa ter no mínimo 7 caracteres.')
    }else{
        //Chama a função setSuccessFor passando o input
        setSuccessFor(password)
    }
    //Verifica se a confirmação da senha é igual a senha
    if(passwordConfirmationValue === ''){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(passwordConfirmation, 'A confirmação de senha é obrigatória.')
    }else if(passwordConfirmationValue != passwordValue){
        //Chama a função setErrorFor passando o input e a mensagem
        setErrorFor(passwordConfirmation, 'As senhas não conferem.')
    }else{
        //Chama a função setSuccessFor passando o input
        setSuccessFor(passwordConfirmation)
    }
    //Obtem todos os elementos que tem a class .form-control
    const formControls = form.querySelectorAll('.form-control')
    //Coloca o formControls em uma lista, executa o método every para verificar se todos os elementos que tem a class .form-control também tem a class success
    const formIsValid = [...formControls].every( formControl => {
        return formControl.className === 'form-control success'
    })
    //Se o formulário for válido acione o modal
    if(formIsValid){
        swal({
            icon: "success",
            title: "Cadastro realizado!",
            text: "Parabéns, o seu cadastro realizado com sucesso!",
          });
    }
}
// Função de erro
function setErrorFor(input, message){
    //Obtem o formControl
    const formControl = input.parentElement
    //Obtem o small
    const small = formControl.querySelector('small')
    //Adicionar a mensagem de erro
    small.innerText = message
    //Adicionar classe de erro
    formControl.className = 'form-control error'
}

function setSuccessFor(input, message){
    //Obtem o formControl
    const formControl = input.parentElement
    //Obtem o small
    const small = formControl.querySelector('small')
    //Caso o small tenha algum conteúdo
    if(small != ''){
        //Retire o conteúdo do small
        small.innerText = ''
    }
    //Adicionar a classe de sucesso
    formControl.className = 'form-control success'
}
//Função para verificar se o email é válido
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}