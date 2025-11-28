// finalizar
(function(){
  const form = document.getElementById('checkout-form'); if(!form) return;
  const totalEl = document.getElementById('checkout-total');
  function updateTotal(){ API.getCart().then(cart=>{ const t = cart.reduce((s,i)=>s + i.price*i.qty,0); totalEl.textContent = 'R$ '+t.toFixed(2) }) }
  updateTotal();
  form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    // coleta campos (simulação)
    const pedido = {nome:form.querySelector('#nome').value, endereco:form.querySelector('#endereco').value, total: totalEl.textContent}
    // salva pedido em localStorage (poderia mandar para servidor)
    const pedidosKey = 'bv_orders_v1';
    const prev = JSON.parse(localStorage.getItem(pedidosKey) || '[]'); prev.push(Object.assign(pedido,{id:Date.now(),items: JSON.parse(localStorage.getItem('bv_cart_v1')||'[]')})); localStorage.setItem(pedidosKey, JSON.stringify(prev));
    API.clearCart().then(()=>{ location.href='confirmado.html' })
  })
})();
