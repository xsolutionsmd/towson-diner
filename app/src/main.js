import './styles.css';

const header=document.querySelector('.site-header'), toggle=document.querySelector('.nav-toggle'), nav=document.querySelector('#site-nav');
const setNav=open=>{
 toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
 document.body.classList.toggle('nav-open',open);document.querySelector('main').inert=open;document.querySelector('footer').inert=open;
 if(open)nav.querySelector('a').focus();else toggle.focus();
};
toggle.addEventListener('click',()=>setNav(toggle.getAttribute('aria-expanded')!=='true'));
document.addEventListener('keydown',e=>{
 if(toggle.getAttribute('aria-expanded')!=='true')return;
 if(e.key==='Escape')setNav(false);
 if(e.key==='Tab'){const all=[toggle,...nav.querySelectorAll('a')],first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
});
const desktop=matchMedia('(min-width:761px)');desktop.addEventListener('change',()=>{if(desktop.matches&&document.body.classList.contains('nav-open'))setNav(false);});
const updateHeader=()=>header.classList.toggle('compact',scrollY>100);addEventListener('scroll',updateHeader,{passive:true});updateHeader();
document.querySelectorAll('.gallery').forEach(g=>{const slides=[...g.querySelectorAll('.gallery-slide')];let current=0;const show=d=>{slides[current].hidden=true;current=(current+d+slides.length)%slides.length;slides[current].hidden=false;g.querySelector('.gallery-status').textContent=slides[current].querySelector('img').alt;};g.querySelector('.gallery-prev').addEventListener('click',()=>show(-1));g.querySelector('.gallery-next').addEventListener('click',()=>show(1));});
const browser=document.querySelector('.menu-browser');
if(browser){
 browser.querySelector('a[href="#menu-browser"]').addEventListener('click',e=>{e.preventDefault();browser.scrollIntoView({block:'start'});});
 const search=browser.querySelector('#menu-search'),select=browser.querySelector('#menu-group'),categories=[...browser.querySelectorAll('.menu-category')],links=[...browser.querySelectorAll('a[data-category]')];let category='breakfast';
 const fillGroups=()=>{const groups=[...new Set(categories.filter(c=>category==='all'||c.dataset.category===category).flatMap(c=>[...c.querySelectorAll('.menu-group')].map(g=>g.dataset.group)))];select.replaceChildren(new Option('All sections','all'),...groups.map(g=>new Option(g,g)));};
 const filter=()=>{const query=search.value.trim().toLowerCase();let count=0;for(const c of categories){let catCount=0;for(const g of c.querySelectorAll('.menu-group')){let groupCount=0;for(const item of g.querySelectorAll('.menu-item')){const visible=Boolean((query||category==='all'||category===c.dataset.category)&&(query||select.value==='all'||select.value===g.dataset.group)&&(!query||item.dataset.name.includes(query)));item.hidden=!visible;if(visible)groupCount++;}g.hidden=groupCount===0;catCount+=groupCount;}c.hidden=catCount===0;count+=catCount;}links.forEach(a=>{if(a.dataset.category===(query?'all':category))a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});select.disabled=Boolean(query);browser.querySelector('.no-results').hidden=count!==0;browser.querySelector('#menu-status').textContent=query?`${count} menu entries found for ${search.value}.`:`Showing ${count} menu entries.`;};
 const saveURL=replace=>{const p=new URLSearchParams();if(search.value.trim())p.set('q',search.value.trim());if(select.value!=='all')p.set('section',select.value);history[replace?'replaceState':'pushState'](null,'',`${location.pathname}${p.size?'?'+p:''}#${category}`);};
 const restore=()=>{const hash=location.hash.slice(1);category=links.some(a=>a.dataset.category===hash)?hash:'breakfast';search.value=new URLSearchParams(location.search).get('q')||'';fillGroups();const group=new URLSearchParams(location.search).get('section');if([...select.options].some(o=>o.value===group))select.value=group;filter();};
 links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();category=a.dataset.category;search.value='';fillGroups();saveURL(false);filter();}));search.addEventListener('input',()=>{filter();saveURL(true);});select.addEventListener('change',()=>{filter();saveURL(false);});browser.querySelectorAll('.reset').forEach(b=>b.addEventListener('click',()=>{category='all';search.value='';fillGroups();saveURL(false);filter();search.focus();}));addEventListener('popstate',restore);addEventListener('hashchange',restore);restore();
}
