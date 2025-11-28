
(function(){
  const loginForm = document.getElementById('admin-login-form');
  const panel = document.getElementById('admin-panel');
  const productsList = document.getElementById('admin-products-list');
  const addForm = document.getElementById('add-product-form');


  const ADMIN_USER = 'admin'; const ADMIN_PASS='1234';

  function renderProducts(){
    API.getProducts().then(list=>{
      productsList.innerHTML = list.map(p=>`<div class="product-card card"><img src="${p.img}" alt="${p.name}"/><h4>${p.name}</h4><p>R$ ${p.price.toFixed(2)}</p><div><button class="remove" data-id="${p.id}">Excluir</button></div></div>`).join('')
      productsList.querySelectorAll('.remove').forEach(b=> b.addEventListener('click',()=>{
        if(confirm('Excluir produto?')){ API.deleteProduct(Number(b.dataset.id)).then(renderProducts) }
      }))
    })
  }

  if(loginForm){
    loginForm.addEventListener('submit',(ev)=>{
      ev.preventDefault(); const u = document.getElementById('admin-user').value; const p=document.getElementById('admin-pass').value;
      if(u===ADMIN_USER && p===ADMIN_PASS){ loginForm.style.display='none'; panel.style.display='block'; renderProducts(); } else alert('Credenciais de admin inválidas')
    })
  }

  if(addForm){
    addForm.addEventListener('submit',(ev)=>{
      ev.preventDefault(); const name=document.getElementById('p-name').value; const price=Number(document.getElementById('p-price').value); const img=document.getElementById('p-img').value; const desc=document.getElementById('p-desc').value; API.addProduct({name,price,img,desc}).then(()=>{ addForm.reset(); renderProducts() })
    })
  }
})();
