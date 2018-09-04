import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import "../styles/chat-room.css";
import NotFound from "./not-found";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      userName: "",
      avatar: ""
    };
    this.socket = io("http://localhost:3000");
    this.socket.on("new message", data => {
      this.setState({ messages: [...this.state.messages, data.message] });
      console.log(this.state.messages);
    });
    this.socket.on("messages", data => {
      this.setState({ messages: data });
    });
  }
  onChange = e => {
    this.setState({ message: e.target.value });
  };
  sendChatMsg = e => {
    if (this.state.message.length > 0) {
      e.preventDefault();

      this.socket.emit("message", {
        message: this.state.message,
        userName: this.props.user.userName,
        avatar: this.props.user.avatar
      });
      this.setState({ message: "" });
    }
  };
  renderChat = () => {
    return this.state.messages.map((message, ind) => {
      return (
        <div key={ind} className="msg">
          <img className="msgAvatar" src={message.avatar} />
          <div className="positioner">
            <div className="msgUserName">{message.userName}</div>
            <div>{message.message}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    if (Object.keys(this.props.user).length > 0) {
      return (
        <div className="chatRoomWrap">
          <div className="chatRoomList">
            <div className="crListItem">Layers...Coming Soon</div>
            <div className="crListItem">Custom...Coming Soon</div>
            <div className="crListItem">React-map-gl...Coming Soon</div>
            <div className="crListItem">LumaGL...Coming Soon</div>
            <div className="crListItem">Other...Coming Soon</div>
          </div>
          <div className="chatRoom">
            <div className="chatBox">{this.renderChat()}</div>
            <form
              onChange={this.onChange}
              onSubmit={this.sendChatMsg}
              className="chatInputs"
            >
              <textarea value={this.state.message} className="chatText" />
              <div className="chatBtn">
                <i onClick={this.sendChatMsg} className="far fa-comment" />
              </div>
            </form>
          </div>
          <div className="chatUserList" />
        </div>
      );
    } else {
      return (
        <div>
          <NotFound />
        </div>
      );
    }
  }
}

export default ChatRoom;
