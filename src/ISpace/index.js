import React, { Component } from 'react';
import io from 'socket.io-client';

class ISpace extends Component {
  constructor(props) {
    super(props);
    const socket = io.connect();
    console.log(socket);
  }
  render() {
    return (
      <div>
        <h1>ISpace</h1>
      </div>
    );
  }
}

export default ISpace;
