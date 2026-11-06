const P=[
{id:1,n:"Wireless noise-cancelling headphones",e:"🎧",c:"Electronics",p:79.99,o:129.99,r:4.5,v:18234},
{id:2,n:"4K smart TV, 55 inch",e:"📺",c:"Electronics",p:349,o:499,r:4.4,v:9120},
{id:3,n:"Smartphone with 128 GB storage",e:"📱",c:"Electronics",p:299,o:379,r:4.3,v:5402},
{id:4,n:"Mechanical gaming keyboard",e:"⌨️",c:"Electronics",p:49.5,o:69,r:4.6,v:12877},
{id:5,n:"Stainless steel air fryer, 5 qt",e:"🍟",c:"Home",p:69.95,o:99.95,r:4.7,v:30211},
{id:6,n:"Memory foam pillow, 2 pack",e:"🛏️",c:"Home",p:34.99,o:49.99,r:4.5,v:15508},
{id:7,n:"Robot vacuum cleaner",e:"🤖",c:"Home",p:179,o:249,r:4.2,v:7733},
{id:8,n:"Ceramic coffee mug set",e:"☕",c:"Home",p:22.49,o:29.99,r:4.6,v:4210},
{id:9,n:"Atomic habits, paperback",e:"📘",c:"Books",p:13.98,o:27,r:4.8,v:98012},
{id:10,n:"Beginner's guide to Python",e:"📗",c:"Books",p:24.5,o:39.99,r:4.6,v:6120},
{id:11,n:"Mystery novel bestseller",e:"📕",c:"Books",p:9.99,o:15.99,r:4.4,v:3321},
{id:12,n:"Illustrated world atlas",e:"🌍",c:"Books",p:19.99,o:34,r:4.7,v:2180},
{id:13,n:"Running shoes, men's",e:"👟",c:"Fashion",p:54.99,o:79.99,r:4.4,v:21345},
{id:14,n:"Waterproof rain jacket",e:"🧥",c:"Fashion",p:44,o:65,r:4.3,v:8892},
{id:15,n:"Polarized sunglasses",e:"🕶️",c:"Fashion",p:18.99,o:35,r:4.5,v:11002},
{id:16,n:"Yoga mat with carry strap",e:"🧘",c:"Sports",p:21.99,o:32,r:4.6,v:17650}
];
const CATS=["All","Electronics","Home","Books","Fashion","Sports"];
let cat="All",term="",cart={};
const $=s=>document.querySelector(s);
const money=n=>"$"+n.toFixed(2);
const stars=r=>"★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r));
function card(p){const off=Math.round((1-p.p/p.o)*100);
return `<div class="p"><div class="img">${p.e}</div><h4>${p.n}</h4><div class="stars">${stars(p.r)} <small>${p.v.toLocaleString()}</small></div><div class="deal">-${off}% deal</div><div class="price">${money(p.p)}<s>${money(p.o)}</s></div><button class="add" data-id="${p.id}">Add to cart</button></div>`}
function render(){
  $("#nav").innerHTML=CATS.map(c=>`<button class="${c===cat?"on":""}" data-cat="${c}">${c}</button>`).join("");
  const list=P.filter(p=>(cat==="All"||p.c===cat)&&p.n.toLowerCase().includes(term.toLowerCase()));
  let h="";
  if(cat==="All"&&!term){
    h+=`<div class="cats">`+CATS.slice(1,5).map(c=>`<button class="cat" data-cat="${c}"><h3>Shop ${c}</h3><div class="tiles">${P.filter(p=>p.c===c).slice(0,4).map(p=>`<div class="t">${p.e}</div>`).join("")}</div><span>See more</span></button>`).join("")+`</div>`;
    h+=`<div class="sec"><h2>Today's deals</h2><div class="grid">${[...P].sort((a,b)=>(b.o-b.p)/b.o-(a.o-a.p)/a.o).slice(0,4).map(card).join("")}</div></div>`;
  }
  h+=`<div class="sec"><h2>${term?`Results for "${term}"`:cat==="All"?"Recommended for you":cat}</h2>${list.length?`<div class="grid">${list.map(card).join("")}</div>`:`<div class="empty">No products match your search. Try a different word or category.</div>`}</div>`;
  $("#main").innerHTML=h;
}
function renderCart(){
  const ids=Object.keys(cart);let n=0,sub=0;
  $("#items").innerHTML=ids.length?ids.map(id=>{const p=P.find(x=>x.id==id),q=cart[id];n+=q;sub+=q*p.p;
    return `<div class="it"><div class="e">${p.e}</div><div class="n">${p.n}<div>${money(p.p)}</div><div class="qty"><button data-dec="${id}" aria-label="Decrease">−</button>${q}<button data-inc="${id}" aria-label="Increase">+</button></div></div></div>`}).join(""):`<div class="empty">Your cart is empty. Add something you like.</div>`;
  $("#count").textContent=n;$("#sub").textContent=money(sub);
}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),1500)}
function openCart(o){$("#drawer").classList.toggle("open",o);$("#scrim").classList.toggle("open",o)}
document.addEventListener("click",e=>{
  const t=e.target.closest("button");if(!t)return;
  if(t.dataset.cat){cat=t.dataset.cat;term="";$("#q").value="";render();scrollTo({top:0})}
  else if(t.classList.contains("add")){cart[t.dataset.id]=(cart[t.dataset.id]||0)+1;renderCart();toast("Added to cart")}
  else if(t.dataset.inc){cart[t.dataset.inc]++;renderCart()}
  else if(t.dataset.dec){if(--cart[t.dataset.dec]<=0)delete cart[t.dataset.dec];renderCart()}
  else if(t.id==="cartbtn")openCart(true);
  else if(t.id==="close")openCart(false);
  else if(t.id==="go"){term=$("#q").value.trim();cat="All";render()}
  else if(t.id==="checkout"){if(Object.keys(cart).length){cart={};renderCart();openCart(false);toast("Demo order placed. Thanks for shopping!")}else toast("Your cart is empty")}
});
$("#scrim").onclick=()=>openCart(false);
$("#q").addEventListener("keydown",e=>{if(e.key==="Enter"){term=e.target.value.trim();cat="All";render()}});
render();renderCart();
