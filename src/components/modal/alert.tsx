//@ts-nocheck
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import closest from '../_util/closest';
import Modal from './Modal';
import { Action } from './PropsType';
export default function alert(
  title: React.ReactNode,
  message: React.ReactNode,
  actions = [{ text: '确定' }],
  platform = 'ios',
) {
  let closed = false;

  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: () => { },
    };
  }

  const div: any = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const footer = () => {
    let returnBtn = null;

    if (actions.length === 1) {

      const orginPress = actions[0].onPress || function () { };
      const footerText = actions[0].text || ''
      const btnPress = () => {
        if (closed) {
          return;
        }

        const res = orginPress();
        if (res && res.then) {
          res
            .then(() => {
              closed = true;
              close();
            })
            .catch(() => { });
        } else {
          closed = true;
          close();
        }
      };

      returnBtn = <div
        onClick={() => {
          btnPress();
        }}
        className={`${prefixCls}-alert-content-btn`}
      >
        {footerText}
      </div>


    } else if (actions.length === 2) {
      const orginPress1 = actions[0].onPress || function () { };
      const footerText1 = actions[0].text || ''
      const orginPress2 = actions[1].onPress || function () { };
      const footerText2 = actions[1].text || ''
      const btnPress1 = () => {
        if (closed) {
          return;
        }

        const res = orginPress1();
        if (res && res.then) {
          res
            .then(() => {
              closed = true;
              close();
            })
            .catch(() => { });
        } else {
          closed = true;
          close();
        }
      };
      const btnPress2 = () => {
        if (closed) {
          return;
        }
        const res = orginPress2();
        if (res && res.then) {
          res
            .then(() => {
              closed = true;
              close();
            })
            .catch(() => { });
        } else {
          closed = true;
          close();
        }
      };
      returnBtn = <div className={`${prefixCls}-alert-content-btn-container`}>
        <div
          onClick={() => {
            btnPress1();
          }}
          className={`${prefixCls}-alert-content-btn-left`}
          style={{
            flex: 1,
            backgroundColor: '#0084ff',
            borderRadius: '30px',
            color: '#fff',
            fontSize: 18,
            height: 42,
            lineHeight: '42px',
            border: '1px solid #0084ff',
          }}
        >
          {footerText1}
        </div>
        <div
          onClick={() => {
            btnPress2();
          }}
          className={`${prefixCls}-alert-content-btn-right`}
        >
          {footerText2}
        </div>
      </div>


    } else {
      return null;
    }
    return returnBtn;
  }



  const prefixCls = 'tt-modal';

  function onWrapTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target as Element, `.${prefixCls}-footer`);
    if (!pNode) {
      e.preventDefault();
    }
  }

  ReactDOM.render(
    <Modal
      visible
      transparent
      title={title}
      transitionName="am-zoom"
      closable={false}
      maskClosable={false}
      maskTransitionName="am-fade"
      platform={platform}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className={`${prefixCls}-alert-content`}>{message}{footer()}</div>
    </Modal>,
    div,
  );

  return {
    close,
  };
}
