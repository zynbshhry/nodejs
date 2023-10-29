



let note=[];
note=refresh();
document.getElementById('addbtn').addEventListener('click',()=>{addNote();window.location="note.html"});
function set(noteArray){
  return localStorage.setItem('notes',JSON.stringify(noteArray));
}
function refresh() {
  if (localStorage.getItem('notes')) {
    return JSON.parse(window.localStorage.getItem('notes'));
  } else {
    return [];
  }
}
function date(){
  const date=new Date();
  return date.toLocaleDateString('en-GB');
}
function textTitle(title){
  return title!=='' ? title :  'Text Note';
}
function save(obj){
    let noteArray=[obj];
    note.forEach(item=>noteArray.push(item));
    set(noteArray);
}
function addNote(){
  const title=document.getElementById('title').value;
  const subject=document.getElementById('subject').value;
   todo={
      title:textTitle(title),
      subject:subject,
      date: date(),
      id:note.length,
      fav:0,
   }  
   save(todo);
}