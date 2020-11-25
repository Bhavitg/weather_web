const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    
    fetch('/weather?address='+location).then((res)=>{
    res.json().then((data=11)=>{        
        msg1.textContent = data.location 
        msg2.textContent = data.temp
    })
})
    
})

