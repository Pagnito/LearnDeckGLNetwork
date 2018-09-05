import React, { Component } from "react";
import "../styles/about.css";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdTick: 0,
      rounds: 0,
      theSentenceTrain: "",
      text: `Hello, Im a web developer and at the moment
        I am working on a DeckGL project. I found that there isn't a big
        community for this framework yet and there is not a lot of resources
        to find answers to my questions....thus I made this site so we
        can hopefully use this as a hub to find quick answers inside chatrooms
        and forums all specific to DeckGL. Thank you.
         <div id="contactInfo" className="contactInfo" />
         If you have any questions feel free to email me at
         <span class="email">pavelyeganov@gmail.com</span></div>
          Or you can reach me via`,

      letterShuffles: [
        "a",
        "m",
        "c",
        "d",
        "g",
        "e",
        "y",
        "g",
        "h",
        "a",
        "p",
        "v",
        "s",
        "t",
        "e",
        "v",
        "l",
        "g",
        "n",
        "o",
        ".",
        ".",
        "H",
        "5"
      ]
    };
  }
  componentDidMount() {
    var go = setInterval(() => {
      this.state.rounds++;

      var shuffleLetter = this.state.letterShuffles[this.letterPicker()];
      document.getElementById("aboutTextBox").innerHTML =
        this.state.theSentenceTrain + shuffleLetter;
      if (this.state.rounds === 3) {
        this.state.theSentenceTrain += this.state.text[this.state.thirdTick];
        this.state.thirdTick++;
        this.state.rounds = 0;
      }

      if (this.state.thirdTick === this.state.text.length) {
        clearInterval(go);
        document.getElementById("aboutTextBox").innerHTML = this.state.text;
      }
    }, 20);

    this.setState({ interval: go });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  letterPicker = () => {
    return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  };

  render() {
    return (
      <div className="aboutWrap">
        <div id="aboutTextBox" className="aboutTextBox" />

        <div className="furtherInfoWrap">
          <div id="furtherInfo" className="furtherInfo" />
          <a href="https://www.linkedin.com/in/pavel-yeganov-309269114/">
            <i className="showLink fabL fab fa-linkedin" />
          </a>
          <a href="https://soundcloud.com/pavel-urei-wei-wei">
            <i className="fab fabL showLink2 fa-soundcloud" />
          </a>
          <a href="https://github.com/Pagnito">
            <i className="fab fabL showLink3 fa-github" />
          </a>
        </div>
      </div>
    );
  }
}

export default About;
