render()
function get(){
  const note=JSON.parse(localStorage.getItem('notes'));
  return note;
}
function set(noteArray){
  return localStorage.setItem('notes',JSON.stringify(noteArray));
}
function render(){
  
   const notes=get();
   
   let noteArray=notes.filter(item=>(item!=null && item.fav==1));
   const show=document.getElementById('showFav');
   const noteHTML = noteArray.length===0 ? `<div class="w-auto m-3 ">
   <div class="h4 my-4" id="write">There is no greater agony than bearing an untold story inside you.
   </div>
   <p class="m-2" id="writer">― Maya Angelou</p>
 </div>`: noteArray
          .map(
            item =>`<div class="card border border-secondary bg-light col-lg-3 col-4 m-3 rounded" id="noteItem" data-id="${item.id}" onclick="selectnote(${item.id})" >
            <a type="button" class="w-25 m-2" id="favorite" data-id="${item.id}" onclick="favorite(event,${item.id})">
            <svg style="color: rgb(220, 53, 69);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="#dc3545"></path> </svg>
            </a>
            <div class="card-body" style=" overflow:hidden;cursor:pointer">
              <h3 class="card-title" id="title">${item.title}</h3>
              <p class="card-text" id="text">${item.subject}</p>
            </div>
            <div id="footOfText">
               <p id="date" class="card-footer"><small>${item.date}${lastNoteUpdate(item)}</small></p>
            
            </div>
            </div>`
              
          )
          .join('');
          
   show.innerHTML = noteHTML;  
   mode();
};
function mode(){
  var note=document.querySelectorAll('#noteItem');
  var settings = localStorage.getItem('lightSwitch');
  function getSystemDefaultTheme() {
     const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
     if (darkThemeMq.matches) {
       return 'dark';
     }
     return 'light';
   };
   if (settings == null) {
     settings = getSystemDefaultTheme();
   };
   if(settings == 'dark'){
       note.forEach(element=>{
        element.className =element.className.replace(/bg-light/,'bg-dark');
        element.className =element.className.replace(/text-dark/,'text-light')
       })
   }
   if(settings == 'light'){
     note.forEach(element=>{
        element.className =element.className.replace(/bg-dark/,'bg-light');
        element.className =element.className.replace(/text-light/,'text-dark')
     })
 }

};
function favorite(e,ID){
  e.stopPropagation();
  const noteArray=get();
  noteArray.map(item=>item!=null && item.id==ID ?item.fav=0 :item);
  set(noteArray);
  render();
}
function selectnote(id){
  return window.location="edit.html?"+`${"id"}=${id}`;
}
function lastNoteUpdate(note){
  if(note.lastUpdate){
     return `</br>last update : ${note.lastUpdate}`;
  }else{
     return ``;
  }
}