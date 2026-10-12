(function(){
  var el=document.getElementById('posts');
  function esc(s){var d=document.createElement('div');d.textContent=s==null?'':String(s);return d.innerHTML;}
  function empty(msg){el.innerHTML='<div class="empty"><span>🫠</span>'+msg+'</div>';}
  fetch('posts.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(posts){
    if(!Array.isArray(posts)||!posts.length){empty('First slop coming soon. The bots are still warming up.');document.getElementById('slop').innerHTML='<div class="none">No slop yet. Give it a minute.</div>';return;}
    posts.sort(function(a,b){return String(b.date).localeCompare(String(a.date));});
    var bad=posts.filter(function(p){return p.bad;});var bl=document.getElementById('bad');
    if(bad.length)bl.innerHTML=bad.map(function(p){var u=/^https?:\/\//.test(p.url||'')?p.url:'#';return '<li><a href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(p.title)+'</a><span>'+esc(p.date)+'</span></li>';}).join('');
    function card(p){
      var url=/^https?:\/\//.test(p.url||'')?p.url:'#';
      return '<article class="post"><div class="meta">'+esc(p.date)+(p.source?' &middot; '+esc(p.source):'')+'</div>'+
        '<h2><a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(p.title)+'</a></h2><p>'+esc(p.blurb)+'</p></article>';}
    var sl=document.getElementById('slop');var sp=posts.filter(function(p){return p.slop;});
    sl.innerHTML=sp.length?sp.map(card).join(''):'<div class="none">No slop yet. Give it a minute.</div>';
    var rest=posts.filter(function(p){return !p.slop;});
    el.innerHTML=rest.length?rest.map(card).join(''):'<div class="empty"><span>🫠</span>No stories yet.</div>';
  }).catch(function(){empty('The slop machine jammed. Try again later.');});
})();
