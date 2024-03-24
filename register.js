function Login() {
    const LoginAccount = document.getElementById("AccUserName").value;
    const LoginPassword = document.getElementById("AccPassword").value;

    for(let x = 0; x < localStorage.length; x++)
    {
        let GetAcc = JSON.parse(localStorage.getItem(localStorage.key(x)));
        if(LoginAccount == GetAcc.AccUs || LoginAccount == GetAcc.AccEmail)
        {
            var Acc = GetAcc;
            document.getElementById("AccUserName").style.border = "unset";
            break;
        }
        else{
            document.getElementById("AccUserName").style.border = "5px solid rgb(255,0,0)";
            document.getElementById("error").innerHTML = "Email or Password is incorect";
        }
    }

    if(LoginPassword == Acc.AccPass)
    {
        window.location = "confirm.html";
        console.log("go");
    }
    else {
        document.getElementById("AccPassword").style.border = "5px solid rgb(255,0,0)";
        document.getElementById("error").innerHTML = "Email or Password is incorect";
    }

}

function MakeANewAccount() {
    const username = document.getElementById("Username").value;
    const email = document.getElementById("email").value;
    const passsword = document.getElementById("password").value;
    const ConPassword = document.getElementById("passwordComfirm").value;

    var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(username != "")
    {
        document.getElementById("Username").style.border = "unset";
        if(email.match(emailCheck))
        {
            document.getElementById("email").style.border = "unset";
            if(passsword == ConPassword && passsword >= 8)
            {
                document.getElementById("password").style.border = "unset";
                document.getElementById("passwordComfirm").style.border = "unset";
                const Account = {
                    AccUs: username,
                    AccEmail: email,
                    AccPass: passsword
                };

                localStorage.setItem(username, JSON.stringify(Account));
                window.location.href = 'conmaked.html';
            }
            else if(passsword < 8)
            {
                document.getElementById("passwordComfirm").style.border = "unset";
                document.getElementById("password").style.border = "5px solid rgb(255,0,0)";
                document.getElementById("error").innerHTML = "Password is not 8 characters long.";
            }
            else
            {
                document.getElementById("password").style.border = "5px solid rgb(255,0,0)";
                document.getElementById("passwordComfirm").style.border = "5px solid rgb(255,0,0)";
                document.getElementById("error").innerHTML = "Password is incorrect.";
            }
        }
        else
        {
            document.getElementById("email").style.border = "5px solid rgb(255,0,0)";
            document.getElementById("error").innerHTML = "Invalid email address.";
        }

    }
    else
    {
        document.getElementById("Username").style.border = "5px solid rgb(255,0,0)";
        document.getElementById("error").innerHTML = "Account needs a user Name.";
    }
   
}
// for error => style.border = "5px solid #FF0000";
