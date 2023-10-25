function start(){
    let name1=btn.querySelector('#nameInput')
    let email=btn.querySelector('#emailInput')
    let title=btn.querySelector('#titleInput')
    let text=btn.querySelector('#textInput')
    todo={
     [name1.name]:name1.value,
     [email.name]:email.value,
     [title.name]:title.value,
     [text.name]:text.value
    }
    
    fetchAPI(todo)
    }
function fetchAPI(todo){
    fetch('http://localhost:3000/contact',{
        method:'POST',
        headers: { "Content-Type": "application/json", },
        body:JSON.stringify(todo)
    })
    .then(response=>{
        if(response.ok){
          document.querySelector('#successMessage').style.display='block'
          return
        }else{
          let res=response.json()
          res
          .then((re)=>{
            let fail=document.querySelector('#errorMessage');
            fail.innerHTML=re.error
            fail.style.display='block'
            return
            })
        }
    }
        
    )
}
const btn=document.querySelector('#contact-us-form')
function handleForm(event) { event.preventDefault();start() } 
if (btn){
    btn.addEventListener('submit',handleForm )
}