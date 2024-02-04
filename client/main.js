const form = document.getElementById('form')
const newContainer = document.getElementById('new-container')


const baseURL = 'http://localhost:3369'

form.addEventListener('submit', async (e) =>{
  e.preventDefault()



const formData = new FormData(form)
const feedbackData = Object.fromEntries(formData)

const response = await fetch(`${baseURL}/feedbacks`,{
  method: "POST",
  headers : {
    "Content-Type" : "application/json"
  },
  body: JSON.stringify(feedbackData)
})

if (response.ok) {
  displayFeedbacks()
} else{
  console.error('Failed to add feedback', response.status)
}
})

async function fetchFeedbacks() {
  const feedbacks = await fetch(`${baseURL}/feedbacks`)
  let result = await feedbacks.json()
  return result
}

async function displayFeedbacks() {

  let feedbacks = await fetchFeedbacks()
  

  newContainer.innerHTML = ''
  feedbacks.forEach(feedback => {

    
    let linie1TAg = document.createElement('h3')
    let line2TAg = document.createElement('p')
    let delButton = document.createElement('button')

  


    let infoDiv = document.createElement(`div`)
    let feedbackMsg = document.createElement('div')

    

    linie1TAg.textContent = feedback.gust
    line2TAg.textContent = feedback.feedback
    delButton.textContent = 'Delete'
    
    

  
    infoDiv.appendChild(linie1TAg)
    infoDiv.appendChild(line2TAg)
    infoDiv.appendChild(delButton)
    feedbackMsg.appendChild(infoDiv)
    newContainer.appendChild(feedbackMsg)

   


    delButton.addEventListener('click', (e) => {
      e.preventDefault()
      handleDelete(feedback.id)
    })
  
  
  })
}
displayFeedbacks()

async function handleDelete(id) {
  const result = await fetch(`${baseURL}/feedbacks/${id}`,{
    method:"DELETE"
  })
  console.log(result)
  if (result.ok) {
    displayFeedbacks()
  }
}

async function handleUpdate(id, updatedInfo) {
  const result = await fetch(`${baseURL}/feedbacks/${id}`,{
    method:"PUT",
    headers: {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(updatedInfo)
  })

  if(result.ok) {
    displayFeedbacks()
  }
}

