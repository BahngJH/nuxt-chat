const room = 'ROOM'
export default defineWebSocketHandler({
    open(peer) {
        console.log("[ws] open", peer);
        peer.subscribe(room)
        peer.publish(room, 'Another user joined the chat')
    },

    close(peer) {
        console.log("[ws] close", peer);
    },

    error(peer, error) {
        console.log("[ws] error", peer, error);
    },

    message(peer, message) {
        console.log('[ws] message', peer, message)
        peer.publish(room, message.text())
    }
});