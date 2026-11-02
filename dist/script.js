const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeNav() {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
}
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeNav(); navToggle.focus();
  }
});
const intentData = {
  repair: ['REPAIR & TROUBLESHOOTING', 'Less guesswork.\nA sensible next step.', 'A system that won’t start, unusual noise, or air that isn’t the right temperature? Start by describing what you’re noticing.', 'Plan a repair conversation'],
  replacement: ['REPLACEMENT & INSTALLATION', 'A better fit.\nA plan worth understanding.', 'Considering new equipment? Gather your priorities and explore the questions that matter before choosing a system.', 'Plan an upgrade conversation'],
  comfort: ['AIRFLOW & EVERYDAY COMFORT', 'Small details.\nA different feeling.', 'Rooms that feel uneven, airflow concerns, or a home that could be more comfortable? Start with the details you notice.', 'Plan a comfort conversation']
};
document.querySelectorAll('[data-intent]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.intent;
  const data = intentData[key];
  document.querySelectorAll('[data-intent]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelector('#intent-label').textContent = data[0];
  const title = document.querySelector('#intent-title');
  title.textContent = data[1]; title.style.whiteSpace = 'pre-line';
  document.querySelector('#intent-copy').textContent = data[2];
  const link = document.querySelector('#intent-link');
  link.href = 'lab.html?project=' + key + '#planner';
  link.replaceChildren(document.createTextNode(data[3] + ' '));
  const arrow = document.createElement('span'); arrow.textContent = '↗'; link.append(arrow);
}));
const systems = {
  central: {number:'01 / SPLIT SYSTEM',title:'TWO SYSTEMS.\nONE COMFORT GOAL.',description:'An air conditioner handles cooling. A furnace supplies heat. A duct system distributes conditioned air through the home.',heating:'Separate equipment',ducts:'Uses ducts',question:'Equipment matching and airflow'},
  heatpump: {number:'02 / DUCTED HEAT PUMP',title:'ONE SYSTEM.\nTWO SEASONS.',description:'A heat pump moves heat to provide cooling or heating. In a ducted setup, an indoor air handler distributes conditioned air through the home.',heating:'Heat pump provides both',ducts:'Uses ducts',question:'Climate, sizing, and backup needs'},
  ductless: {number:'03 / DUCTLESS SYSTEM',title:'TARGET THE SPACE.\nSKIP THE DUCTS.',description:'An outdoor heat pump connects to indoor units that serve individual spaces. Ductless systems can provide both heating and cooling without a central duct network.',heating:'Heat pump provides both',ducts:'No central ducts required',question:'Indoor unit placement and zones'}
};
const tabs = [...document.querySelectorAll('[data-system][role=tab]')];
const display = document.querySelector('.house-display');
function selectSystem(tab, focus = false) {
  const key = tab.dataset.system; const data = systems[key];
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  display.dataset.system = key;
  document.querySelector('#system-panel').setAttribute('aria-labelledby', tab.id);
  for (const field of ['number','title','description','heating','ducts','question']) document.querySelector('#system-' + field).textContent = data[field];
  document.querySelector('#system-title').style.whiteSpace = 'pre-line';
  if (focus) tab.focus();
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => selectSystem(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index+1)%tabs.length;
    if (event.key === 'ArrowLeft') next = (index+tabs.length-1)%tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length-1;
    if (next !== undefined) { event.preventDefault(); selectSystem(tabs[next],true); }
  });
});
document.querySelectorAll('.mode-button').forEach(button => button.addEventListener('click', () => {
  display.dataset.mode = button.dataset.mode;
  document.querySelectorAll('.mode-button').forEach(item => { item.classList.toggle('active',item===button); item.setAttribute('aria-pressed',String(item===button)); });
}));
if (display) {
  const mobileLink = document.querySelector('.mobile-action');
  mobileLink.href = '#planner';
  mobileLink.replaceChildren(document.createTextNode('Build my comfort plan '));
  const arrow = document.createElement('span'); arrow.textContent = '↓'; mobileLink.append(arrow);
}
const airflow = document.querySelector('#airflow-toggle');
if (airflow) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function setAirflow(on) { display.classList.toggle('is-animated',on); airflow.setAttribute('aria-pressed',String(on)); airflow.textContent=on?'Pause airflow Ⅱ':'Animate airflow ▷'; }
  if (motion.matches) { airflow.textContent='Motion reduced by device'; airflow.disabled=true; }
  airflow.addEventListener('click',()=>setAirflow(!display.classList.contains('is-animated')));
  motion.addEventListener('change',()=>{setAirflow(false);airflow.disabled=motion.matches;if(motion.matches)airflow.textContent='Motion reduced by device';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)setAirflow(false);});
}
const faqSearch = document.querySelector('#faq-search');
if (faqSearch) {
  const items = [...document.querySelectorAll('#faq-list details')];
  const filter = () => {
    const query = faqSearch.value.trim().toLowerCase();
    let count=0;
    items.forEach(item => { const match=item.textContent.toLowerCase().includes(query);item.hidden=!match;if(match)count++;});
    document.querySelector('#faq-count').textContent=count+' of '+items.length+' questions';
    document.querySelector('#faq-empty').hidden=count>0;
  };
  faqSearch.addEventListener('input',filter);filter();
}
const request = document.querySelector('#request-form');
if (request) {
  document.querySelector('.mobile-action').hidden = true;
  const params = new URLSearchParams(location.search);
  const labels = {
    project:{repair:'Repair / troubleshooting',replacement:'System replacement',comfort:'Comfort improvement'},
    priority:{working:'A working system',quiet:'A quieter home',even:'More even temperatures',air:'Indoor air quality'},
    timing:{soon:'As soon as practical',weeks:'In the next few weeks',planning:'Planning ahead'}
  };
  const plan=[];
  for (const [key,group] of Object.entries(labels)) { const selected=params.get(key);const val=Object.hasOwn(group,selected)?group[selected]:null;if(val)plan.push([key==='project'?'Project':key==='priority'?'Priority':'Timing',val]); }
  function appendDetails(root, entries) {
    root.replaceChildren();
    entries.forEach(([label,value])=>{const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);root.append(row);});
  }
  if(plan.length){document.querySelector('#carried-plan').hidden=false;appendDetails(document.querySelector('#carried-details'),plan);}
  const service=params.get('service');
  if(['cooling','heating','air','replacement'].includes(service))request.elements.service.value=service;
  else if(params.get('project')==='replacement')request.elements.service.value='replacement';
  const review=document.querySelector('#request-review');
  request.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(request);
    const entries=[['Name',data.get('name')],['Email',data.get('email')],['Service',request.elements.service.options[request.elements.service.selectedIndex].text],['Space',data.get('space')],['Preferred time',data.get('time')],...plan,['Your notes',data.get('message')]];
    appendDetails(document.querySelector('#review-details'),entries);
    request.hidden=true;review.hidden=false;review.focus();review.scrollIntoView({block:'start',behavior:'auto'});
  });
  document.querySelector('#edit-request').addEventListener('click',()=>{review.hidden=true;request.hidden=false;request.elements.name.focus();request.scrollIntoView({block:'start',behavior:'auto'});});
}
