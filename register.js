//Login to an account
function Login() {
    let LoginAccount = document.getElementById("AccUserName").value;
    let LoginPassword = document.getElementById("AccPassword").value;

    let x =localStorage.getItem("Accounts")

    if(LoginAccount == x.Account || LoginAccount == x.Acc_email)
    { 
        let y = x.passsword;
        if(x.stat == 1) {
            window.location.href = 'owner.html'; 
        }
        else if(LoginPassword = y)
        {
            window.location.href = 'confirm.html'; 
        }
    }
    else {
        LoginError(1);
    }
}



//Makes an account
function MakeANewAccount() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const passsword = document.getElementById("password").value;
    const ConPassword = document.getElementById("passwordComfirm").value;

    var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(document.getElementById("terms").checked)
    {
        if(username != "")
        {
        if(email.match(emailCheck))
            {
                    document.getElementById("email").style.border = "unset";
                    if(passsword == ConPassword && passsword >= 8)
                    {
                        document.getElementById("password").style.border = "unset";
                        document.getElementById("passwordComfirm").style.border = "unset";
                        
                        let Account = {
                            account: username,
                            Acc_email: email,
                            Acc_passsword: passsword,
                        }
                        localStorage.setItem("Accounts", Account)
                        window.location.href = 'conmaked.html';

                    }
                    else if(action == 1) {
                        document.getElementById("AccUserName").style.border = "5px solid rgb(255,0,0)";
                        document.getElementById("error").innerHTML = "Email is already in uses.";
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
            else {
                document.getElementById("email").style.border = "5px solid rgb(255,0,0)";
                document.getElementById("error").innerHTML = "Invalid email address.";
            }
        }
            else {
            document.getElementById("Username").style.border = "5px solid rgb(255,0,0)";
            document.getElementById("error").innerHTML = "Account needs a user Name.";
            } 
    }
    else {
        document.getElementById("terms").style.border = "5px solid rgb(255,0,0)";
        document.getElementById("error").innerHTML = "You haven't agreed to our terms of service";
    }
}


function newworker() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const passsword = document.getElementById("password").value;
    const ConPassword = document.getElementById("passwordComfirm").value;
    const ID = document.getElementById("id").value
    var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // for an owner
    if(document.getElementById("owner").checked)
    {
        if(username != "")
        {
        if(email.match(emailCheck))
            {
                    document.getElementById("email").style.border = "unset";
                    if(passsword == ConPassword && passsword >= 8)
                    {
                        document.getElementById("password").style.border = "unset";
                        document.getElementById("passwordComfirm").style.border = "unset";
                        
                                     
                        let Account = {
                            account: username,
                            Acc_email: email,
                            Acc_passsword: passsword,
                            stat: 1
                        }
                        localStorage.setItem("Accounts", Account)
                        window.location.href = 'owner.html';
                    }
                    else if(action == 1) {
                        document.getElementById("AccUserName").style.border = "5px solid rgb(255,0,0)";
                        document.getElementById("error").innerHTML = "Email is already in uses.";
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
            else {
                document.getElementById("email").style.border = "5px solid rgb(255,0,0)";
                document.getElementById("error").innerHTML = "Invalid email address.";
            }
        }
            else {
            document.getElementById("Username").style.border = "5px solid rgb(255,0,0)";
            document.getElementById("error").innerHTML = "Account needs a user Name.";
            } 
    }

    // for an employe
    else if(document.getElementById("employe").checked) {
        if(username != "")
        {
        if(email.match(emailCheck))
            {
                    document.getElementById("email").style.border = "unset";
                    if(passsword == ConPassword && passsword >= 8)
                    {
                        document.getElementById("password").style.border = "unset";
                        document.getElementById("passwordComfirm").style.border = "unset";
                        
                                         
                        let Account = {
                            account: username,
                            Acc_email: email,
                            Acc_passsword: passsword,
                        }
                        localStorage.setItem("Accounts", Account)
                        window.location.href = 'conmaked.html';
                    }
                    else if(action == 1) {
                        document.getElementById("AccUserName").style.border = "5px solid rgb(255,0,0)";
                        document.getElementById("error").innerHTML = "Email is already in uses.";
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
            else {
                document.getElementById("email").style.border = "5px solid rgb(255,0,0)";
                document.getElementById("error").innerHTML = "Invalid email address.";
            }
        }
            else {
            document.getElementById("Username").style.border = "5px solid rgb(255,0,0)";
            document.getElementById("error").innerHTML = "Account needs a user Name.";
            } 

    }
    else {
        document.getElementById("owner").style.border = "5px solid rgb(255,0,0)";
        document.getElementById("employe").style.border = "5px solid rgb(255,0,0)";
        document.getElementById("error").innerHTML = "Are you an owner or employe?";
    }
}

// For errors in the login page
function LoginError(error) {
    if(error = 1)
    {
    document.getElementById("AccUserName").style.border = "5px solid rgb(255,0,0)";
    document.getElementById("AccPassword").style.border = "5px solid rgb(255,0,0)";
    document.getElementById("error").innerHTML = "Email or Password is incorect";
    }
    else
    {
        document.getElementById("AccUserName").style.border = "unset";
        document.getElementById("AccPassword").style.border = "unset";
    }
}
