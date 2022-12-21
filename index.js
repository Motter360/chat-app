runPage();

async function runPage(){
    await runPusher();

    let messages = getMessages();

    renderMessages(messages)
}

async function runPusher () {
    try {
        const key = await fetch('./.env');

        const pusher = new Pusher(key, {
            cluster: 'us2'
        });
    
        const channel = pusher.subscribe('my-channel');

        channel.bind('message-sent', function(data) {
            // add a new message to DOM
        });

        channel.trigger('message-sent', {
            // You can include any data you want to send with the event
            message: 'Hello from the client-side!'
        });
    } catch (e) {
        //
    }
}

// Make a function renderMessages that takes the messages array and spits it out to the dom
function renderMessages (messages) {
    // Get the container
    const chat = document.querySelector(`.container`)
    chat.innerHTML = ""
    
    for (i = 0; i<messages.length; i++){
        chat.innerHTML += 
        `
        <div class="chat-bubble ${messages[i].sender}">
            <p class="content">${messages[i].content}</p>
            <p class="time">${messages[i].sentAt}</p>
        </div>
        `
    }
}


function getMessages () {
    const now = new Date();

    return [
        {
            sentAt: now.toISOString(),
            sender: "John Smith",
            content: "you up?",
            
        },
        {
            sentAt: now.toISOString(),
            sender: "Frank Smith",
            content: "Yeaaaaaah.",
            
        },
        {
            sentAt: now.toISOString(),
            sender: "John Smith",
            content: ";;;;;;;)",
        },
    ]
}
