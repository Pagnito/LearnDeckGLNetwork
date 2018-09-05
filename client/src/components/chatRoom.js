import React, { Component } from "react";
import io from "socket.io-client";
import "../styles/chat-room.css";
import NotFound from "./not-found";
import moment from "moment";
import { Link } from "react-router-dom";
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      users: [],
      userName: "",
      avatar: "",
      chatUsers: []
    };

    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {
      this.socket.emit("newUser", { user: this.props.user });
      this.socket.on("chatUsers", chatUsers => {
        this.setState({ chatUsers: chatUsers });
      });
    });
    this.socket.on("userDisconnected", chatUsers => {
      this.setState({ chatUsers: chatUsers });
    });
    this.socket.on("new message", data => {
      this.setState({ messages: [...this.state.messages, data.message] });
      console.log(this.state.messages);
      const chatBox = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight;
    });
    this.socket.on("messages", data => {
      this.setState({ messages: data });
    });
  }
  componentDidUpdate(prevState) {
    if (this.state.messages !== prevState.messages) {
      const chatBox = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  renderChatUsers = () => {
    if (this.state.chatUsers.length > 0) {
      return this.state.chatUsers.map((user, ind) => {
        return (
          <Link
            to={`/getUser/${user.user.id}`}
            className="chatUserItem"
            key={ind}
          >
            <img className="chatUserAvatar" src={user.user.avatar} />
          </Link>
        );
      });
    }
  };
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
            <div className="msgUserName">
              {message.userName}
              <span className="chatDate">
                {moment(message.date).format("MM Do, hh:mm")}
              </span>
            </div>
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
            <div id="chatBox" className="chatBox">
              {this.renderChat()}
            </div>
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
          <div className="chatUserList">{this.renderChatUsers()}</div>
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
