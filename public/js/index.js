const socket = io();


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

    let li = jQuery('<li></li>')
    li.text(`${message.from} ${formattedTime}: ${message.text}`)
    jQuery('#message').append(li)
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

    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from} ${formattedTime}: `)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#message').append(li)
})

