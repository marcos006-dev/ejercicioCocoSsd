const u=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};u();let l;const m=document.getElementById("previsualizarImagen"),s=document.getElementById("cargarImagen"),c=document.getElementById("estado"),d=document.getElementById("predecir"),g=document.getElementById("resultado");document.addEventListener("DOMContentLoaded",async()=>{d.setAttribute("disabled",!0),s.setAttribute("disabled",!0),c.innerHTML="Cargando modelo...",await f(),c.innerHTML="Modelo cargado",d.removeAttribute("disabled"),s.removeAttribute("disabled")});s.addEventListener("change",async function(o){const r=o.target.files[0],n=document.getElementById("imagen")?document.getElementById("imagen"):document.createElement("img");n.setAttribute("crossorigin","anonymous"),n.setAttribute("id","imagen"),n.width=300,n.height=300,n.src=URL.createObjectURL(r),m.appendChild(n)});d.addEventListener("click",async()=>{const o=await l.detect(document.getElementById("imagen"));console.log(o[0].class),g.innerHTML=`
  <div class="mt-3 alert alert-success">
    Resultado: ${o[0].class} <br> Probabilidad: ${o[0].score}
  </div>
  `});const f=async()=>l=await cocoSsd.load();