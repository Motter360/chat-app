runPage();

async function runPage(){
    let messages = getMessages();

    renderMessages(messages)

    powerSendButton(messages);
}

function powerSendButton(messages){
    const button = document.querySelector(".send")
    const newMessage = document.querySelector(".new-message")

    const callback = () => {
        let user = getUser(messages)
        
        messages.push(createMessage(user, newMessage.value))
        renderMessages(messages)
        newMessage.value = ""
        
    }

    button.addEventListener("click", callback)
}

function createMessage(user, messageBody){
    
    const now = new Date();

    return {
        sentAt: now.toISOString(),
        sender: `${user.name}`,
        content: messageBody,
        source: `${user.source}`,
    }
}

function getUser(messages){
    if(messages.length % 2 === 0) {
        return {
            name: "Frank Smith",
            source: "domestic",
        }
    } else {
        return {
            name: "John Smith",
            source: "foreign"
        }
    }
}


function renderMessages (messages) {
    const chat = document.querySelector(`.container`)
    chat.innerHTML = ""
    
    for (i = 0; i<messages.length; i++){
        chat.innerHTML += 
        `
        <div class="chat-bubble ${messages[i].source}">
            <p class="content">${messages[i].content}</p>
        </div>
        <p class="time ${messages[i].source}">${messages[i].sentAt}</p>
        `
    }
}


function getMessages () {
    const now = (new Date());

    return [
        {
            sentAt: now.toISOString(),
            sender: "John Smith",
            content: "you up?",
            source: 'foreign'
        },
        {
            sentAt: now.toISOString(),
            sender: "Frank Smith",
            content: "Yeaaaaaah.",
            source: 'domestic'
        },
        {
            sentAt: now.toISOString(),
            sender: "John Smith",
            content: ";;;;;;;)",
            source: 'foreign'
        },
    ]
}
