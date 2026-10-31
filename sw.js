const CACHE="textpdf-editor-v1";
const CORE=["./","./index.html"];
const LIBS=[
 "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
 "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
 "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"
];
self.addEventListener("install",event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(CORE);
  for(const url of LIBS){
   try{
    const response=await fetch(url,{mode:"cors"});
    if(response.ok)await cache.put(url,response);
   }catch(e){console.warn("Could not cache library:",url);}
  }
  await self.skipWaiting();
 })());
});
self.addEventListener("activate",event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET")return;
 event.respondWith((async()=>{
  const cached=await caches.match(req,{ignoreSearch:true});
  if(cached)return cached;
  try{
   const response=await fetch(req);
   if(response.ok && (new URL(req.url).origin===self.location.origin)){
    const cache=await caches.open(CACHE);cache.put(req,response.clone());
   }
   return response;
  }catch(e){
   if(req.mode==="navigate")return (await caches.match("./index.html"))||Response.error();
   return Response.error();
  }
 })());
});
