import OfflinePluginRuntime from 'offline-plugin/runtime';
import { notification } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import { render }  from 'react-dom';
import App from './App';

OfflinePluginRuntime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady');
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: () => {
    notification.success({
      message: 'Your app has been updated',
    });
  },
  onUpdateFailed: () => {
    notification.warn({
      message: 'Could not update to the latest version',
    });
    console.log('SW Event:', 'onUpdateFailed');
  }
});

const root = document.createElement('div');
root.style.height = '100%';
document.body.appendChild(root);
render(<App />, root);
