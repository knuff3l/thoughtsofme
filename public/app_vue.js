const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(feathers.socketio(socket));

var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        thoughts: [],
        text: ''
    },
    created() {
        this.getThoughts();
        client.service('thoughts').on('created', this.addThought);
    },
    methods: {
        async getThoughts (){
            const thoughts = await client.service('thoughts').find({
                query: {
                    $sort: { createdAt: -1 },
                    $limit: 25
                }
            });
            this.thoughts = thoughts.data;
        },
        addThought(thought){
            this.thoughts.splice(0,0,thought);
        },
        async sendThought(){
            await client.service('thoughts').create({
                text: this.text
            });
            this.text = '';
        }
    },
    filters:{
        formatDate: function (value) {
            if (!value) return '';
            return moment(value).format('DD.M.Y HH:mm:ss');
        }
    }
});
