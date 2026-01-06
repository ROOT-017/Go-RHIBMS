import { ChangeEvent } from 'react';
import { CamelCase } from './strings';

export const loadScriptSync = (
  src: string,
  id: string,
): Promise<boolean | string> =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = () => resolve('script loaded');
    script.src = src;
    if (id) {
      script.id = id;
    }
    script.type = 'text/javascript';
    script.async = false;
    document.getElementsByTagName('body')[0].appendChild(script);
  });

export const removeElementById = (id: string) =>
  new Promise((resolve, reject) => {
    const el = document.getElementById(id);
    if (el) {
      const parentEl = el.parentNode;
      if (parentEl) {
        parentEl.removeChild(el);
        resolve(`removed ${id}`);
      } else {
        reject(new Error(`cannot remove ${id}: its the root`));
      }
    } else {
      reject(new Error(`cannot remove ${id}: not found in the DOM`));
    }
  });

export const getBlobUrl = (code: string, type: string): string => {
  const blob = new Blob([code], {
    type,
  });
  return URL.createObjectURL(blob);
};

export const getHtmlDocumentUrl = ({
  html,
  css,
  js,
}: {
  html: string;
  css: string;
  js: string;
}): string => {
  const _css = css || '';
  const _js = js || '';
  const cssUrl = getBlobUrl(_css, 'text/css');
  const jsUrl = getBlobUrl(_js, 'text/javascript');
  const src = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${_css && `<link rel="stylesheet" type="text/css" href="${cssUrl}" />`}
      </head>
      <body>
        ${html || ''}
        ${_js && `<script src="${jsUrl}"></script>`}
      </body>
    </html>
  `;
  return getBlobUrl(src, 'text/html');
};

export const isInViewPort = (el: HTMLElement) => {
  if (el && el.getBoundingClientRect) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  return false;
};

export const scrollToId = (id: string) => {
  const doc = document;
  const el = doc.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
    });
  }
};

export const getCurrentUserPosition = () =>
  new Promise((resolve, reject) => {
    const {
      navigator: { geolocation },
    } = window;
    if (geolocation) {
      geolocation.getCurrentPosition(
        (position) => resolve(position),
        (err) => reject(err),
      );
    } else {
      reject(Error('Geolocation is not supported by this browser.'));
    }
  });

export const CookieMap = () => {
  const arr = document.cookie
    .split('; ')
    .map((x) => x.split('=')) as unknown as Array<[string, string | number]>;
  return new Map<string, string | number>(arr);
};

export const getValidityMessage = (e?: {
  target: {
    name: string;
    value?: string;
    validity?: Partial<ValidityState>;
    checked?: boolean;
  };
}) => {
  if (e?.target?.validity?.typeMismatch) {
    return `Please enter a valid ${CamelCase.toSentenceCase(e?.target?.name)}.`;
  }
  if (e?.target?.validity?.valueMissing) {
    return `${CamelCase.toSentenceCase(e?.target?.name)} is required.`;
  }
  if (e?.target?.validity?.tooShort) {
    return `${CamelCase.toSentenceCase(e?.target?.name)} is too short.`;
  }
};

export type OnBlurEventHandler = (
  e:
    | ChangeEvent<HTMLInputElement>
    | {
        target: {
          name: string;
          value?: string;
          validity?: Partial<ValidityState>;
          checked?: boolean;
        };
      },
) => void;
