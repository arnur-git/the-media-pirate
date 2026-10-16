const KEY='tmp:v1';
const initial={favorites:[],history:[],settings:{adult:false,compact:false},positions:{}};
function fresh(){return JSON.parse(JSON.stringify(initial))}
function clean(raw){if(!raw||typeof raw!=='object')return fresh();return{favorites:Array.isArray(raw.favorites)?raw.favorites.filter(x=>typeof x==='string'):[],history:Array.isArray(raw.history)?raw.history.filter(x=>x&&typeof x.id==='string').slice(0,100):[],settings:{...initial.settings,...(raw.settings&&typeof raw.settings==='object'?raw.settings:{})},positions:raw.positions&&typeof raw.positions==='object'?raw.positions:{}}}
let state;try{state=clean(JSON.parse(localStorage.getItem(KEY)||'null'))}catch{state=fresh()}
export function getState(){return state}
export function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
export function toggleFavorite(id){state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();return state.favorites.includes(id)}
export function addHistory(item){state.history=[item,...state.history.filter(x=>x.id!==item.id)].slice(0,100);save()}
export function setPosition(id,position){if(Number.isFinite(position)&&position>=0){state.positions[id]=position;save()}}
export function clearHistory(){state.history=[];save()}
export function updateSetting(key,value){state.settings[key]=value;save()}
