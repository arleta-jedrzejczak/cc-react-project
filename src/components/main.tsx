
import React from "react";
import { Typography } from "@material-ui/core";
import {TopBar} from "./main/topBar"
import {PostGrid} from "./main/postGrid"

export const Main = () => {
  return (
   <Typography>
    <TopBar></TopBar>
    <PostGrid></PostGrid>
  </Typography>
  )
};