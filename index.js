let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a> <div>
                <span>X</span>
                </div>
            </li>
        `
    }
    ulEl.innerHTML = listItems
    const liEl = document.querySelectorAll('li')
    let index , item = []
    deleteUrl(liEl,index,item) 
}
/* this function delete single Leads from local storage*/ 
function deleteUrl(li,index,item){
    for(let i = 0 ; i < li.length ; i++){
        item.push(li[i].innerHTML)
        li[i].addEventListener('dblclick',function(){
            index = item.indexOf(this.innerHTML)
            myLeads.splice(index,1)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
    }
    console.log("clicked")
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

