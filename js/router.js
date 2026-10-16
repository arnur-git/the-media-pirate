export function route(){const p=new URLSearchParams(location.hash.slice(1));return{page:p.get('page')||'home',id:p.get('id')||'',q:p.get('q')||''}}
export function go(page,params={}){const p=new URLSearchParams({page,...params});location.hash=p.toString()}
