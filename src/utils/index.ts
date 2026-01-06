import { isAxiosError } from 'axios';
import { ApiError, ApiException } from '../@types';
import dayjs from 'dayjs';

export const retrieveErrorResponse = <
  T extends ApiException | ApiError[] = ApiException,
>(
  e: unknown,
): T | undefined => {
  if (isAxiosError<T>(e)) {
    return e?.response?.data
      ? (e?.response?.data as T)
      : ({
          code: e?.response?.status.toString() ?? e.status?.toString(),
          message: e?.message,
        } as T);
  }
};
export const retrieveErrorResponseWithNoData = <
  T extends ApiException | ApiError[] = ApiException,
>(
  e: unknown,
): T | undefined => {
  if (isAxiosError<T>(e)) {
    return e?.response?.data as T;
  }
};

export const isApiException = (payload: unknown): payload is ApiException => {
  if (typeof payload === 'object' && payload != null) {
    if (
      Object.keys(payload).some((k) =>
        ['code', 'message', 'status'].includes(k),
      )
    ) {
      return true;
    }
  }
  return false;
};

export const isValidFileSize = (file: File | null): boolean => {
  if (file == null) {
    return true;
  }
  const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
  return file.size <= maxSize;
};

// export const convertToHtmlEntities = (str: string): string |undefined => {
//   if(str)
//   return str.split('')
//     .map(char => `&#x${(char.codePointAt(0) ?? 0).toString(16)};`)
//     .join('');
// }
/**
 * createIntersectionObserver creates the native JS IntersectionObserver
 * Native JS Api to create an observer that listens if a target element intersects the root element
 * @param target
 * @param callback
 * @param options
 * @returns
 */
export const createIntersectionObserver = (
  target: HTMLElement,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  try {
    if (target) {
      const observer = new IntersectionObserver(
        callback,
        options ?? {
          root: null,
          rootMargin: '0px 16px',
          threshold: buildObserverInitThresholdList(),
        },
      );
      observer.observe(target);
      return () => observer.disconnect();
    }
  } catch (_e) {
    console.log('ERROR creating Intersection Observer');
  }
  return () => {};
};
export const buildObserverInitThresholdList = (numSteps = 10) => {
  const thresholds: number[] = [];
  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }
  return thresholds;
};

export const currentPathName = () => window?.location?.pathname;
export const currentSearchParams = () =>
  new URLSearchParams(window?.location?.search);
export const sortCountries = (a: { name: string }, b: { name: string }) => {
  if (
    a.name.toLowerCase() === 'united states of america' ||
    b.name.toLowerCase() === 'united states of america'
  ) {
    return -1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

type OpenerPromiseProvider = {
  provide: () => Promise<string>;
};

export const openPopUp = (
  popup: Window | null,
  name: string,
  provider?: OpenerPromiseProvider,
  features: string = 'scrollbars=yes,top=200,left=200,width=900,height=800',
) => {
  if (popup == null || popup?.closed) {
    popup = window.open('', name, features);
  }
  if (popup) {
    provider
      ?.provide()
      .then((href) => {
        popup.location.href = href;
        popup.focus();
      })
      .catch((er) => {
        console.error(er);
        popup.focus();
        if (typeof er === 'string') {
          popup.document.write(er);
        } else if ('message' in er) {
          popup.document.write(er.message);
        } else {
          popup.document.write('Failed to fetch: Unknown error');
        }
      });
  } else {
    console.error('Popup blocked');
    alert('Popup blocked');
  }
  return popup;
};

// export const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const emailValidation =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const sortByCreatedAt = (
  a: { createdAt?: string },
  b: { createdAt?: string },
) => {
  return (
    new Date(a.createdAt ?? '').getTime() -
    new Date(b.createdAt ?? '').getTime()
  );
};

/**
 *
 * @returns Return a start time of either 00mins or 30mins, can be use as offset time,
 * for instance if the current time is 10:21 it will return start time of current time 10:30 but if the current time is 10:40 it will return start time of 12:00
 *
 */
export const getNextStartTime = () => {
  const now = dayjs();
  const minutes = now.minute();
  const nextHalfHour = minutes < 30 ? 30 : 60;
  const startTime = now.minute(nextHalfHour).second(0).millisecond(0);
  if (nextHalfHour === 60) {
    startTime.add(1, 'hour').minute(0);
  }
  return startTime;
};

export const getStartTimeInterval = () => {
  const now = dayjs();
  const minutes = now.minute();
  const nextHalfHour = minutes < 30 ? 30 : 60;
  const startTime = now.minute(nextHalfHour).second(0).millisecond(0);
  if (nextHalfHour === 60) {
    startTime.minute(0);
  }
  return startTime.add(4, 'hour');
};

export const formatCreditCardNumber = (input: string) => {
  // Remove any non-numeric characters
  const sanitizedInput = input.replace(/\D/g, '');
  // Limit to 16 digits
  const limitedInput = sanitizedInput.slice(0, 16);

  // Insert a space every 4 digits
  return limitedInput.replace(/(.{4})/g, '$1 ').trim();
};

export const formatBankAccountNumber = (input: string) => {
  // Remove all non-digit characters
  const cleaned = input.replace(/\D/g, '');

  // Truncate to maximum 17 digits (standard US account number length)
  const truncated = cleaned.slice(0, 17);

  // Add hyphens every 4 digits for readability
  return truncated
    .replace(/(\d{4})(?=\d)/g, '$1-')
    .replace(/(-\d{4})-(?=\d)/g, '$1-');
};

export const XArrays = {
  equals: (a: unknown[], b: unknown[]) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  },
};

export const formatSSN = (input: string) => {
  // Remove non-numeric characters
  const formattedInput = input.replace(/\D/g, '');
  if (!formattedInput.length) {
    return '';
  }

  // Check the length of the formatted input to determine where to insert dashes
  let formattedSSN = '';
  for (let i = 0; i < formattedInput.length; i++) {
    if (i === 3 || i === 5) {
      formattedSSN += '-';
    }
    formattedSSN += formattedInput.charAt(i);
  }

  return formattedSSN.slice(0, 11);
};

export function maskCardNumber(cardNumber: string | number): string {
  // Convert the card number to a string in case it's not
  const cardStr = String(cardNumber).replace(/\s+/g, '');

  // Check if the length is less than 4
  if (cardStr.length <= 4) {
    return '*'.repeat(cardStr.length); // Replace all with asterisks
  }

  // Get the last 4 digits
  const lastFourDigits = cardStr.slice(-4);

  // Mask the preceding digits with asterisks
  const masked = '*'.repeat(cardStr.length - 4) + lastFourDigits;

  return masked;
}

export const formatNumberWithCommas = (num: number): string => {
  if (num === 0) return '0.00';
  return num?.toLocaleString('en-US') || '0.00';
};

export const calculateTimeBetween = (
  start: string,
  end: string,
  ags: {
    //eslint-disable-next-line
    format: 'hh:mm a' | 'YYYY-MM-DD HH:mm:ss' | (string & {});
    //eslint-disable-next-line
    unit: 'days' | 'minutes' | 'hours' | (string & {});
  },
) => {
  const startDate = dayjs(start, ags.format);
  const endDate = dayjs(end, ags.format);
  const duration = endDate.diff(startDate, 'hours');

  if (ags && ags.unit === 'days') {
    return `${Math.floor(duration / 24)} days`;
  }

  if (ags && ags.unit === 'minutes') {
    return `${Math.floor(duration / 60)} minutes`;
  }

  return `${duration} hours`;
};

export const getInitPageData = (size: number) => {
  return {
    content: [],
    empty: false,
    first: false,
    last: false,
    number: 0,
    numberOfElements: 0,
    size,
    totalElements: 0,
    totalPages: 0,
  };
};

export function formatUSPhoneNumber(input: string): string {
  // Remove all non-digit characters
  const cleaned = input.replace(/\D/g, '');
  // Keep only first 10 digits
  const trimmed = cleaned.slice(0, 10);
  const length = trimmed.length;

  if (length === 0) return '';

  // Handle different length cases
  if (length <= 3) {
    return `(${trimmed}` + (length === 3 ? ')' : '');
  } else if (length <= 6) {
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
  } else {
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
  }
}

// Helper function to convert data URL to Blob
export const dataURLtoBlob = (dataURL: string) => {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

/**
 * Creates a file name from the location and timestamp
 * @param lng
 * @param lat
 * @returns
 */
export const CreateFileNameFromLocationAndTimeStamp = (
  lng: string | number,
  lat: string | number,
) => {
  const date = new Date();
  return `${lng}_${lat}_${date.getTime()}`;
};

/**
 *
 * @param timestamp - The timestamp to check against the current time
 * @param CACHE_LT - Cache Life Time in milliseconds, default is 1 hour
 * @param max - Maximum number of hours before the timestamp is considered expired
 * @returns
 */
export const checkIfIsExpired = (
  timestamp: string,
  CACHE_LT: number = 1000 * 60 * 60,
  max: number = 24,
) => {
  const now = new Date();
  const expiryDate = new Date(timestamp);
  const diff = Math.abs(now.getTime() - expiryDate.getTime());
  const diffInHours = Math.floor(diff / CACHE_LT);
  return diffInHours > max;
};
