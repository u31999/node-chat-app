const socket = io();

function scrollToBottom() {
    // Selectors
    const message = jQuery('#message')
    const newMessage = message.children('li:last-child')

    // Height
    let clientHeight = message.prop('clientHeight')
    let scrollTop = message.prop('scrollTop')
    let scrollHeight = message.prop('scrollHeight')
    let newMessageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        message.scrollTop(scrollHeight)
    }
}

socket.on('connect', function() {
            console.log('Connected to server')

    jQuery('#message-form').on('submit', function() {
        event.preventDefault();
        let messageTextBox = jQuery('[name=message]')

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val(),
            createdAt: new Date().getTime()
            }, function() {
                messageTextBox.val('')
        })
    })
})



socket.on('newMessage', function(message) {
    
    let formattedTime = moment(message.createdAt).format('h:mm a')
    let template = jQuery('#message-template').html()  
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })

    jQuery('#message').append(html)

    scrollToBottom()
} )

socket.on('disconnect', function() {
    console.log('Disconnected from the server')
})

const locationButton = jQuery('#send-location')

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    } else {
        locationButton.attr('disabled', 'disabled').text('Sending location...')
        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text('Send location')
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function() {
            locationButton.removeAttr('disabled').text('Send location')
            alert('Unable to fetch location')
        })
    }
})

// The listener for location message
socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a')

    let template = jQuery('#location-message-template').html()  
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })

    jQuery('#message').append(html)
    scrollToBottom()

})

