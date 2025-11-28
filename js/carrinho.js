// carrinho
(function(){
  const root = document.getElementById('cart-list'); if(!root) return;
  function render(){
    API.getCart().then(cart=>{
      if(cart.length===0){ root.innerHTML='<p>Seu carrinho está vazio.</p>'; return }
      root.innerHTML = cart.map(item=>`<div class="item"><img src="${item.img}" width="80"/><div><h4>${item.name}</h4><p>R$ ${item.price.toFixed(2)}</p><div>Qtd: <button class="dec" data-id="${item.id}">-</button> <span>${item.qty}</span> <button class="inc" data-id="${item.id}">+</button></div></div><button class="remove" data-id="${item.id}">Remover</button></div>`).join('')
      const total = cart.reduce((s,i)=>s + i.price*i.qty,0); root.innerHTML += `<div class="card"><h3>Total: R$ ${total.toFixed(2)}</h3></div>`

      // listeners
      root.querySelectorAll('.remove').forEach(b=> b.addEventListener('click',()=>{
        const id = Number(b.dataset.id);
        const newCart = cart.filter(i=>i.id!=id); API.saveCart(newCart).then(render);
      }))
      root.querySelectorAll('.inc').forEach(b=> b.addEventListener('click',()=>{
        const id = Number(b.dataset.id); const it = cart.find(x=>x.id==id); if(it){ it.qty++; API.saveCart(cart).then(render) }
      }))
      root.querySelectorAll('.dec').forEach(b=> b.addEventListener('click',()=>{
        const id = Number(b.dataset.id); const it = cart.find(x=>x.id==id); if(it){ it.qty--; if(it.qty<=0){ const n=cart.filter(x=>x.id!=id); API.saveCart(n).then(render); return } API.saveCart(cart).then(render) }
      }))
    })
  }
  render();
  // expose
  window.BV = Object.assign(window.BV||{}, {renderCart: render})
})();
