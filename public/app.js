// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(feathers.socketio(socket));

const pageHTML = `<main class="flex flex-column">
    <div class="flex flex-column col col-9">
      <main class="thoughts flex flex-column flex-1 clear"></main>

      <form class="flex flex-row flex-space-between" id="send-thought">
        <input type="text" name="text" class="flex flex-1">
        <button class="button-primary" type="submit">Send</button>
      </form>
    </div>
  </div>
</main>`;

const addThought = thought => {
    const thoughts = document.querySelector('.thoughts');
    const text = thought.text.replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if(thoughts){
        thoughts.innerHTML += `<div>${text} <span class="sent-date font-300">(${moment(thought.createdAt).format('DD.M.Y HH:mm:ss')})</span></div>`

        thoughts.scrollTop = thoughts.scrollHeight - thoughts.clientHeight;
    }
};

const showPage = async () => {
    document.getElementById('app').innerHTML = pageHTML;
    const thoughts = await client.service('thoughts').find({
        query: {
            $sort: { createdAt: -1 },
            $limit: 25
        }
    });

    thoughts.data.reverse().forEach(addThought);
};

const addEventListener = (selector, event, handler) => {
    document.addEventListener(event, async ev => {
        if (ev.target.closest(selector)) {
            handler(ev);
        }
    });
};

addEventListener('#send-thought', 'submit', async ev => {
    // This is the message text input field
    const input = document.querySelector('[name="text"]');

    ev.preventDefault();

    // Create a new message and then clear the input field
    await client.service('thoughts').create({
        text: input.value
    });

    input.value = '';
});

client.service('thoughts').on('created', addThought);

showPage();