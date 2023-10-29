

const show=document.getElementById('show');
render();
function set(noteArray){
   return localStorage.setItem('notes',JSON.stringify(noteArray));
}
function get(){
   return JSON.parse(localStorage.getItem('notes'));
}
const checkIfSparseIsEmpty = arr => !Object.values(arr).length;
function filterNote(){
   const notes=get();
   return notes.filter(item=>item!=null);
};
function render(){
    const noteArray=filterNote() ;
    show.innerHTML = html(noteArray); 
    mode();
}
function html(noteArray){
   return noteArray.length===0 ? `<div class="w-auto m-3 " >
   <div class="h4 my-4 " id="write"> don’t write at first for anyone but yourself.
   </div>
   <p class="m-2 " id="writer">― T.S.Eliot</p>
 </div>` : noteArray
 .map(
   item =>`<div class="card col-lg-3 col-4 border border-secondary m-4 rounded  bg-light " id="noteItem" data-id="${item.id}" 
   onclick="selectnote(${item.id})">
   <div class="d-flex m-2">
   <a type="button" class=" mx-1 " id="delete" data-id="${item.id}" onclick="deleteNote(event,${item.id})" >
    <div><svg style="color: rgb(220, 53, 69);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="#dc3545"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="#dc3545"></path> </svg></div>
   </a>
   <a type="button" class="w-25 mx-1"  id="favorite" data-id="${item.id}" onclick="favorite(this,event,${item.id})" >
     <div>${favIcon(item.fav)}</div>
   </a>
   </div>
   <div class="card-body" style=" overflow:hidden;cursor:pointer">
   <h3 id="title" class="card-title">${item.title}</h3>
   <p id="text" class="card-text">${item.subject}</p>
   </div>
   <div id="footOfText">
      <div id="date" class="card-footer"><small>${item.date}${lastNoteUpdate(item)}</small></div>
   </div>
   </div>`
     
 )
 .join('');
}
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

}
function favorite(e,event,favoriteID){
   const noteArray=get();
   let icon = e.querySelector("div");
   noteArray.map(item=> {if(item!=null && item.id == favoriteID){item.fav==1 ? item.fav=0 : item.fav=1;
      icon.innerHTML=favIcon(item.fav);
   }})
   event.stopPropagation();
   set(noteArray);
};
function deleteNote(event,deletedId){
   event.stopPropagation();
   const notes=get();
   for (key in notes){
      if(notes[key]!==null && parseInt(notes[key].id)===deletedId){
            delete notes[key]
      }
   }
   set(notes);
   render();
}
function selectnote(id){
   return window.location="edit.html?"+`${"id"}=${id}`
}
function favIcon(favNum){
   return favNum ===1 ? `<svg style="color: rgb(220, 53, 69);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="#dc3545"></path> </svg>` : `<svg style="color: rgb(220, 53, 69);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"> <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" fill="#dc3545"></path> </svg>`
   
}
function lastNoteUpdate(note){
   if(note.lastUpdate){
      return `</br>last update : ${note.lastUpdate}`;
   }else{
      return ``;
   }
}
function goToAdd(){
   return window.location="addNote.html";
   
}