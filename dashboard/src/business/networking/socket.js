import io from 'socket.io-client';

// TODO: make this url ENV variable
const Socket = io('https://notifications.minibardelivery.com:443');

export default Socket;
