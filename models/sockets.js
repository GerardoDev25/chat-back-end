class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      // todo validar jwt

      // todo saber que usuario esta activo

      // todo emitir todos los usuarios conectados

      // todo unirme a una sala espesifica

      // todo necesito estar escuchando cuando alguien envia un mensaje

      // todo manejar el disconnect

      // todo emitir todos los usuarios conectados
    });
  }
}

export default Sockets;
