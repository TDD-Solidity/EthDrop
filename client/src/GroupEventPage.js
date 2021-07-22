import React, { Component } from "react";
import {
  BrowserRouter,
  useParams
} from "react-router-dom";

function GroupEventPage (props) {


  const groupName = useParams().groupName;

  // render() {
   return <h1>Group event page! {groupName}</h1>
  // }
}

export default GroupEventPage;
