
(function(){
  function qs(s){return document.querySelector(s)}
  function qsa(s){return document.querySelectorAll(s)}


  function updateCartCount(){
    API.getCart().then(cart=>{
      const el = qs('#cart-count'); if(el) el.textContent = cart.reduce((a,c)=>a+c.qty,0)
    })
  }

  
  function setupCarousel(){
    const root = qs('#carousel'); if(!root) return;
    const slides = root.querySelector('.slides');
    const total = slides.children.length; let idx=0;
    const prev = root.querySelector('.carousel-prev'), next = root.querySelector('.carousel-next');
    function show(i){ slides.style.transform = `translateX(-${i*100}%)`; }
    prev.addEventListener('click',()=>{ idx=(idx-1+total)%total; show(idx) })
    next.addEventListener('click',()=>{ idx=(idx+1)%total; show(idx) })

    setInterval(()=>{ idx=(idx+1)%total; show(idx) },5000)
  }


  function produtoCardHTML(p){
    return `<div class="product-card card">
      <img src="${p.img}" alt="${p.name}"/>
      <h4>${p.name}</h4>
      <div class="meta"><strong>R$ ${p.price.toFixed(2)}</strong><a class="btn" href="detalhe.html?id=${p.id}">Ver</a></div>
    </div>`
  }

  function loadHome(){
    const el = qs('#destaque-list'); if(!el) return;
    API.getProducts().then(list=>{ el.innerHTML = list.slice(0,6).map(produtoCardHTML).join('') })
  }


  function loadProdutos(){
    const grid = qs('#produtos-grid'); if(!grid) return;
    const search = qs('#search'); const sort = qs('#sort');
    function render(){
      API.getProducts().then(list=>{
        let arr = list.slice();
        const q = search?.value?.toLowerCase?.() || '';
        if(q) arr = arr.filter(p=>p.name.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q));
        if(sort?.value==='price-asc') arr.sort((a,b)=>a.price-b.price)
        if(sort?.value==='price-desc') arr.sort((a,b)=>b.price-a.price)
        grid.innerHTML = arr.map(produtoCardHTML).join('')
      })
    }
    search?.addEventListener('input',render); sort?.addEventListener('change',render); render();
  }


  function loadDetalhe(){
    const el = qs('#produto-detalhe'); if(!el) return;
    const params = new URLSearchParams(location.search); const id=params.get('id'); if(!id) { el.innerHTML='<p>Produto não encontrado</p>'; return }
    API.getProductById(Number(id)).then(p=>{
      if(!p) { el.innerHTML='<p>Produto não encontrado</p>'; return }
      el.innerHTML = `
        <div>
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div>
          <h2>${p.name}</h2>
          <p>${p.desc||''}</p>
          <p><strong>R$ ${p.price.toFixed(2)}</strong></p>
          <label>Tamanho<select id="sel-size"><option>36</option><option>37</option><option>38</option><option>39</option></select></label>
          <button id="add-to-cart" class="btn btn-primary">Adicionar ao carrinho</button>
        </div>
      `;
      qs('#add-to-cart').addEventListener('click',()=>{
        API.getCart().then(cart=>{
          const existing = cart.find(c=>c.id==p.id);
          if(existing) existing.qty++;
          else cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1})
          API.saveCart(cart).then(()=>{ updateCartCount(); alert('Produto adicionado ao carrinho') })
        })
      })
    })
  }


  document.addEventListener('DOMContentLoaded',()=>{
    setupCarousel(); loadHome(); loadProdutos(); loadDetalhe(); updateCartCount();

 
    const navToggle = document.querySelector('.nav-toggle'); navToggle?.addEventListener('click',()=>{
      const nav = document.querySelector('.main-nav'); if(nav.style.display==='block') nav.style.display=''; else nav.style.display='block'
    })


    const userLink = qs('#user-link'); const user = JSON.parse(localStorage.getItem('bv_current_user')||'null'); if(user && user.name){ if(userLink) { userLink.textContent = user.name; userLink.href='#' } }
  })


  window.BV = {updateCartCount}
})();
