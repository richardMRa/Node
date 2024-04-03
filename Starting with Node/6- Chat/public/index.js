import { io } from 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.esm.min.js'

const socket = io({
    auth: {
        serverOffset: 0
    }
})

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit('chat message', input.value)
        input.value = ''
    }
})

socket.on('chat message', (msg, serverOffset) => {
    const item = `<span class="msg">${msg}</span>`
    messages.insertAdjacentHTML('beforeend', item)
    socket.auth.serverOffset = serverOffset
    messages.scrollTop = messages.scrollHeight
})