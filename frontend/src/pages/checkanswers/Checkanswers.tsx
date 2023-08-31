import { useRef, useState, useEffect, useContext, useLayoutEffect } from "react";
import { CommandBarButton, IconButton, Dialog, DialogType, Stack } from "@fluentui/react";
import { DismissRegular, SquareRegular, ShieldLockRegular, ErrorCircleRegular } from "@fluentui/react-icons";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import uuid from 'react-uuid';
import React from 'react'

import styles from "./Checkanswers.module.css";
import Azure from "../../assets/Azure.svg";

import {
    getUserInfo,
    ErrorMessage
} from "../../api";
import { AppStateContext } from "../../state/AppProvider";
import { useBoolean } from "@fluentui/react-hooks";

class Checkanswers extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      fetch('/code')
      .then((response) => response.text())
      .then(code => {
        this.setState({ code: code });
      });
  }

    handleChange(event: any) {
      var value = event.target.value;
      var status
      var color
      if (!value || !this.state.code) {
        status = ''
      } else if (value == this.state.code) {
        status = 'correct :-)'
        color = 'green'
      } else {
        status = 'wrong ;-('
        color = 'red'
      }
      this.setState({...this.state, value: value, status: status, color: color});
    }
  
    handleSubmit(event: any) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <Stack horizontal>
            <label>
              Try your passcode:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input readOnly type="text" value={this.state.status} style={{color: this.state.color}} />
          </Stack>
        </form>
      );
    }
  }

export default Checkanswers;