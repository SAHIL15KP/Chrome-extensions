let myleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const Deletebtn = document.getElementById("btn2")
let leadsfromlocalstorage = []

try {
    leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads")) || []
} catch (error) {
    console.error("Unable to read saved leads.", error)
}

if (leadsfromlocalstorage.length) {
    myleads = leadsfromlocalstorage
    render(myleads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTabUrl = normalizeLead(tabs[0] && tabs[0].url)

        if (!currentTabUrl) {
            return
        }

        myleads.push(currentTabUrl)
        saveLeads()
    })

})


function render(leads) {
    ulEl.innerHTML = ""
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < leads.length; i++) {
        const listItem = document.createElement("li")
        const anchor = document.createElement("a")

        anchor.href = leads[i]
        anchor.target = "_blank"
        anchor.rel = "noopener noreferrer"
        anchor.textContent = leads[i]

        listItem.append(anchor)
        fragment.append(listItem)
    }

    ulEl.append(fragment)

}


inputBtn.addEventListener("click", function () {
    const newLead = normalizeLead(inputEl.value)

    if (!newLead) {
        return
    }

    myleads.push(newLead)
    inputEl.value = ""
    saveLeads()

})


Deletebtn.addEventListener("dblclick", function () {
    localStorage.removeItem("myleads")
    myleads = []
    render(myleads)
})

function saveLeads() {
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads)
}

function normalizeLead(value) {
    if (!value) {
        return null
    }

    const trimmedValue = value.trim()

    if (!trimmedValue) {
        return null
    }

    try {
        const url = new URL(trimmedValue)

        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return null
        }

        return url.href
    } catch (error) {
        return null
    }
}



