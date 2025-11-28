
const API = (function(){
  const KEY_PRODUCTS = 'bv_products_v1';
  const KEY_USERS = 'bv_users_v1';
  const KEY_CART = 'bv_cart_v1';

  
  function seed(){
    if(!localStorage.getItem(KEY_PRODUCTS)){
      const sample = [
        {id:1,name:'Tênis Classic',price:329.90,img:'img/produtos/prod1.jpg',desc:'Modelo clássico e confortável.'},
        {id:2,name:'Tênis Runner',price:399.50,img:'img/produtos/prod2.jpg',desc:'Ideal para corridas.'},
        {id:3,name:'Tênis Urban',price:279.00,img:'img/produtos/prod3.jpg',desc:'Estilo para o dia a dia.'}
      ];
      localStorage.setItem(KEY_PRODUCTS, JSON.stringify(sample));
    }
    if(!localStorage.getItem(KEY_USERS)){
      localStorage.setItem(KEY_USERS, JSON.stringify([]));
    }
    if(!localStorage.getItem(KEY_CART)){
      localStorage.setItem(KEY_CART, JSON.stringify([]));
    }
  }

  function getProducts(){ seed(); return Promise.resolve(JSON.parse(localStorage.getItem(KEY_PRODUCTS) || '[]')) }
  function getProductById(id){ return getProducts().then(list=> list.find(p=>p.id==id)) }
  function addProduct(product){ return getProducts().then(list=>{ product.id = Date.now(); list.push(product); localStorage.setItem(KEY_PRODUCTS, JSON.stringify(list)); return product }) }
  function updateProduct(id, data){ return getProducts().then(list=>{ const idx = list.findIndex(p=>p.id==id); if(idx>-1){ list[idx]=Object.assign(list[idx],data); localStorage.setItem(KEY_PRODUCTS, JSON.stringify(list)); return list[idx]} return null }) }
  function deleteProduct(id){ return getProducts().then(list=>{ const filtered=list.filter(p=>p.id!=id); localStorage.setItem(KEY_PRODUCTS, JSON.stringify(filtered)); return true }) }


  function registerUser(u){ seed(); const users = JSON.parse(localStorage.getItem(KEY_USERS)); if(users.find(x=>x.email===u.email)) return Promise.reject('Email já cadastrado'); users.push(u); localStorage.setItem(KEY_USERS, JSON.stringify(users)); return Promise.resolve(u) }
  function loginUser(email, password){ const users = JSON.parse(localStorage.getItem(KEY_USERS) || '[]'); const found = users.find(x=>x.email===email && x.password===password); if(found) return Promise.resolve(found); return Promise.reject('Credenciais inválidas') }

 
  function getCart(){ return Promise.resolve(JSON.parse(localStorage.getItem(KEY_CART) || '[]')) }
  function saveCart(cart){ localStorage.setItem(KEY_CART, JSON.stringify(cart)); return Promise.resolve(cart) }
  function clearCart(){ localStorage.setItem(KEY_CART, JSON.stringify([])); return Promise.resolve() }

  return {getProducts,getProductById,addProduct,updateProduct,deleteProduct,registerUser,loginUser,getCart,saveCart,clearCart,seed}
})()


API.seed();
