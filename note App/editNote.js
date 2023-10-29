let id=parseInt(giveID());
let object=getlocal(id);
renderNote(object);

function giveID(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
    
}
function get(){
  return JSON.parse(localStorage.getItem('notes'));
}
function set(noteArray){
  return localStorage.setItem('notes',JSON.stringify(noteArray));
}
function getlocal(ID){
      let notes=get();
      return notes.find((item) =>item!==null&& item.id === ID);
}
function renderNote(object){
  const noteHTML=`<form class="mx-5">
  <div class="form-group my-4">
    <label for="titleNote" class="mb-2 h4 text-dark">Title</label>
    <textarea  class="form-control bg-light text-dark" id="titleNote" data-id="${object.id}" name="title">${object.title}</textarea>
  </div>
  <div class="form-group my-4">
    <label for="subjectNote" class="mb-2 h4 text-dark">subject</label>
    <textarea class="form-control bg-light text-dark" id="subjectNote" data-id="${object.id}" name="subject">${object.subject}</textarea>
  </div>
  
  <button type="submit" class="btn btn-outline-success" id="update">Submit</button>
</form>`
  document.getElementById('showNote').innerHTML=noteHTML
}
const updateNote = e =>{
  e.preventDefault();
  const title=document.getElementById('titleNote');
  const text=document.getElementById('subjectNote');
  const id=parseInt(document.getElementById('titleNote').getAttribute('data-id'));
  const notes=get();
  for (var key of notes){
    if( key !=null && key.id===id){
      key.title=title.value;
      key.subject=text.value;
      key.lastUpdate=date();
      save(key,id);
    }
  }
}
function save(obj,id){
  let notes=get();
  let noteArray=[];
  for(var key of notes){
       (key===null) ?noteArray.push(key) : (key.id != id) ? noteArray.push(key):noteArray.push(obj)
  }
  set(noteArray);
  window.location="note.html";
}
function date(){
  const date=new Date();
  return date.toLocaleDateString('en-GB');
}
const btn=document.getElementById('update');
if(btn){
  btn.addEventListener('click',updateNote)
}
