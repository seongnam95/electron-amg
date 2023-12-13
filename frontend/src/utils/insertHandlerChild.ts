import { DOMAttributes, ReactElement, cloneElement } from 'react';

type CustomAttributesKey = 'onCancel';
type AttributesKey = CustomAttributesKey | keyof DOMAttributes<ReactElement>;
type Handlers = { [K in AttributesKey]?: Function };

/**
 * 주어진 ReactElement 핸들러에 새로운 함수를 추가합니다.
 *
 * @param {ReactElement} child - 추가할 ReactElement 요소
 * @param {Handlers} handlers - 추가할 새로운 이벤트 핸들러 객체
 * @returns {ReactElement} 새로운 핸들러가 추가된 ReactElement
 */
const insertHandlerChild = <T>(child?: ReactElement, handlers?: Handlers): ReactElement | null => {
  if (!child || !handlers) return null;

  const newProps = Object.entries(handlers).reduce((acc, [eventName, newHandler]) => {
    const originalHandler = child.props[eventName as keyof Handlers];

    if (typeof originalHandler === 'function' && typeof newHandler === 'function') {
      acc[eventName as keyof Handlers] = (...args: any) => {
        newHandler(...args);
        originalHandler(...args);
      };
    } else if (newHandler) {
      acc[eventName as keyof Handlers] = newHandler;
    }

    return acc;
  }, {} as Handlers);

  return cloneElement(child, newProps);
};

export default insertHandlerChild;
