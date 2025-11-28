
(function(){
  const loginForm = document.getElementById('login-form');
  const regForm = document.getElementById('register-form');

  if(loginForm){
    loginForm.addEventListener('submit',(ev)=>{
      ev.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-password').value;
      API.loginUser(email,pass).then(user=>{
        localStorage.setItem('bv_current_user', JSON.stringify(user));
        alert('Bem-vindo, '+user.name)
        location.href='index.html'
      }).catch(err=>alert(err))
    })
  }

  if(regForm){
    regForm.addEventListener('submit',(ev)=>{
      ev.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const pass = document.getElementById('reg-password').value;
      API.registerUser({name, email, password: pass}).then(u=>{
        localStorage.setItem('bv_current_user', JSON.stringify(u));
        alert('Cadastro realizado!'); location.href='index.html'
      }).catch(err=>alert(err))
    })
  }
})();
