const socketIO = require('socket.io');

const socketHandler = (server) => {
    const io = socketIO(server);
    
    const messages = [];
    const connectedUsers = new Map();

    const wsLogger = (event, ...args) => {
        console.log(`[WebSocket][${new Date().toISOString()}] ${event}:`, ...args);
    };

    io.on('connection', (socket) => {
        wsLogger('connect', `Client connected - ID: ${socket.id}`);

        // * Connect Event
        socket.emit('welcome', { message: 'Welcome to messaging server!' });

        socket.on('join', (userData) => {
            try {
                connectedUsers.set(socket.id, {
                    id: socket.id,
                    username: userData.username,
                    joinedAt: new Date()
                });

                wsLogger('join', `User ${userData.username} has been connected!`);

                io.emit('userJoined', {
                    userId: socket.id,
                    username: userData.username,
                    onlineUsers: Array.from(connectedUsers.values())
                });
            } catch (error) {
                handleError(socket, 'join', error);
            }
        });

        // * Message Evento 
        socket.on('message', (data) => {
            try {
                const user = connectedUsers.get(socket.id);
                if (!user) throw new Error('User not authenticated');
                const messageData = {
                    id: Date.now(),
                    userId: socket.id,
                    username: user.username,
                    content: data.content,
                    timestamp: new Date()
                };
                messages.push(messageData);
                wsLogger('message', `Message from ${user.username}: ${data.content}`);

                io.emit('newMessage', messageData);
            } catch (error) {
                handleError(socket, 'message', error);
            }
        });

        // * Leave Event 
        socket.on('leave', () => {
            try {
                const user = connectedUsers.get(socket.id);
                if (user) {
                    wsLogger('leave', `User ${user.username} left the chat`);
                    handleUserDisconnect(socket);
                }
            } catch (error) {
                handleError(socket, 'leave', error);
            }
        });

        // * Ping Event 
        socket.on('ping', () => {
            try {
                socket.emit('pong', { timestamp: Date.now() });
                wsLogger('ping', `Ping received ${socket.id}`);
            } catch (error) {
                handleError(socket, 'ping', error);
            }
        });

        // *  Disconnect Event 
        socket.on('disconnect', () => {
            try {
                wsLogger('disconnect', `Client disconnected- ID: ${socket.id}`);
                handleUserDisconnect(socket);
            } catch (error) {
                handleError(socket, 'disconnect', error);
            }
        });

        // * Reconnect Event
        socket.on('reconnect_attempt', () => {
            wsLogger('reconnect_attempt', `Reconnecting... - ID: ${socket.id}`);
        });
    });

    // * Handle Disconected User
    function handleUserDisconnect(socket) {
        const user = connectedUsers.get(socket.id);
        if (user) {
            connectedUsers.delete(socket.id);
            io.emit('userLeft', {
                userId: socket.id,
                username: user.username,
                onlineUsers: Array.from(connectedUsers.values())
            });
        }
    }

    // * Handle Errors
    function handleError(socket, event, error) {
        console.error(`[ERROR][${event}]`, error);
        socket.emit('error', {
            event,
            message: 'Server error...',
            timestamp: new Date()
        });
    }
};

module.exports = socketHandler;
