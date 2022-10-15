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

const locationButton = jQuery('#send-location')

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    } else {
        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function() {
            alert('Unable to fetch location')
        })
    }
})

// The listener for location message
socket.on('newLocationMessage', function(message) {
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#message').append(li)
})

