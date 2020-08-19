import React from 'react';
import 'antd/dist/antd.css';
import { render }  from 'react-dom';
import App from './App';

const root = document.createElement('div');
document.body.appendChild(root);
render(<App />, root);
