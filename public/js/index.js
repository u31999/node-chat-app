const socket = io();


socket.on('connect', function() {
            console.log('Connected to server')

    jQuery('#message-form').on('submit', function() {
        event.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val(),
            createdAt: new Date().getTime()
            }, function() {
        
        })
    })
})


socket.on('newMessage', function(message) {
    
    let li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    jQuery('#message').append(li)
} )

socket.on('disconnect', function() {
    console.log('Disconnected from the server')
})

