import { useRef, useState, useEffect, useContext, useLayoutEffect } from "react";
import { CommandBarButton, IconButton, Dialog, DialogType, Stack, IStackTokens } from "@fluentui/react";
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
  
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

  handleClick(event: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    fetch('/code', {
      headers: headers,
      method: "POST",
      body: this.state.code
      })
      .then((response) => response.text())
      .then(result => {
        let status = 'wrong ;-('
        let color = 'red'
        if (result === 'True') {
          status = 'correct :-)'
          color = 'green'
        } 
        this.setState({...this.state, status: status, color: color});
      });
    }
  
    handleChange(event: any) {
      this.setState({...this.state, code: event.target.value});
    }

    render() {
      var horizontalGapStackTokens: IStackTokens = {
        childrenGap: 10,
        padding: 10,
      };
      return (
        <Stack>
          <Stack horizontal tokens={horizontalGapStackTokens}>
            <label>
              Try your passcode:
              <input type="text" name="code" onChange={this.handleChange}/>
            </label>
            <input type="button" value="Check you answer!" onClick={this.handleClick} />
          </Stack>
          {this.state.status && (
                <div style={{color: this.state.color}}>{this.state.status}</div>
          )}
        </Stack>
      );
    }
  }

export default Checkanswers;
