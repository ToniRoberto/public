//fechar modal
const myModel = new bootstrap.Modal("#registre-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-check").checked;
    const account = getAccount(email);
    
    if(!account){
        alert("Verifique o usuário ou senha");
        return;
    }
    if(account){
        if(account.password !== password){
            alert("usuário ou senha errado");
            return;
        }

        saveSession(email, session);

        window.location.href = "home.html";
    }

});

//criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Preecha o campo com um e-mail válido.");
        return;
    }

    if(password.length < 5){
        alert("Preecha a senha com mínimo 5 digitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModel.hide();
    alert("Conta criada com sucesso!!");
});

//verificar sessão
function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

//gravar dados no localstorage
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

//pegar dados do localstorage
function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }
    return "";
}

//verificar se usuario esta conectado
function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}