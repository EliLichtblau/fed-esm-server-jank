import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from "./app";



const root = document.getElementById('shell')!;

ReactDOMClient.hydrateRoot(root, <App />);