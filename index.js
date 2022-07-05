let myleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const Deletebtn = document.getElementById("btn2")
const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))

console.log(leadsfromlocalstorage)
if (leadsfromlocalstorage) {
    myleads = leadsfromlocalstorage
    render(myleads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })

})


function render(leads) {

    let listitems = ""
    for (let i = 0; i < leads.length; i++) {
        listitems += `<li><a  target='_blank' href='${leads[i]}'>  ${leads[i]}  </a></li>`
    }
    ulEl.innerHTML = listitems

}


inputBtn.addEventListener("click", function () {
    myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads)
    console.log(localStorage.getItem("myleads"))

})


Deletebtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myleads = []
    render(myleads)
})




