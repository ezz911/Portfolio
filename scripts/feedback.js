(function(){
  var K='pn-fb-v1',heart=document.getElementById('fbHeart');if(!heart)return;
  var st;try{st=JSON.parse(localStorage.getItem(K))}catch(e){}
  st=st&&typeof st==='object'?st:{};st.comments=Array.isArray(st.comments)?st.comments:[];
  function save(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
  var count=document.getElementById('fbCount'),lbl=document.getElementById('fbCountLbl'),list=document.getElementById('fbList');
  function paintLike(){var n=st.liked?1:0;count.textContent=n;lbl.textContent=n===1?'like':'likes';heart.setAttribute('aria-pressed',st.liked?'true':'false')}
  function burst(){var b=heart.querySelector('.fb-burst');b.innerHTML='';for(var i=0;i<10;i++){var d=document.createElement('i'),a=i/10*6.283,r=34+Math.random()*10;d.style.setProperty('--x',Math.cos(a)*r+'px');d.style.setProperty('--y',Math.sin(a)*r+'px');b.appendChild(d)}setTimeout(function(){b.innerHTML=''},800)}
  heart.addEventListener('click',function(){st.liked=!st.liked;save();paintLike();if(st.liked&&!matchMedia('(prefers-reduced-motion:reduce)').matches)burst()});
  function ago(t){var s=(Date.now()-t)/1000;if(s<60)return'just now';if(s<3600)return Math.floor(s/60)+'m ago';if(s<86400)return Math.floor(s/3600)+'h ago';return new Date(t).toLocaleDateString()}
  function render(){list.innerHTML='';st.comments.slice().reverse().forEach(function(c){
    var li=document.createElement('li');li.className='fb-item';
    var h=document.createElement('header'),n=document.createElement('b'),t=document.createElement('time');
    n.textContent=c.name;t.textContent=ago(c.t);h.appendChild(n);h.appendChild(t);
    var p=document.createElement('p');p.textContent=c.body;li.appendChild(h);li.appendChild(p);
    if(c.liked&&c.liked.length){var g=document.createElement('div');g.className='fb-tags';c.liked.forEach(function(x){var s=document.createElement('span');s.textContent=x;g.appendChild(s)});li.appendChild(g)}
    list.appendChild(li)})}
  var form=document.getElementById('fbForm'),err=document.getElementById('fbErr');
  form.addEventListener('submit',function(e){e.preventDefault();
    var body=document.getElementById('fbBody'),name=document.getElementById('fbName');
    var txt=body.value.trim();
    if(txt.length<2){err.textContent='Write a few words first.';body.focus();return}
    err.textContent='';
    var liked=[].map.call(form.querySelectorAll('.fb-chips input:checked'),function(i){return i.value});
    st.comments.push({name:name.value.trim()||'Anonymous',body:txt,liked:liked,t:Date.now()});
    save();render();body.value='';[].forEach.call(form.querySelectorAll('.fb-chips input'),function(i){i.checked=false})});
  paintLike();render();
})();
