import { getCurrentInstance } from 'vue';
import { IInstance } from '../modal.type';
import defaultLang from './lang/zh-CN';

export const t = (...args: any[]): string => {
  const instance = getCurrentInstance() as IInstance;
  const _t = instance._hub.t;
  if (_t) return _t(...args);

  const [path] = args;
  const array = path.split('.');
  let current: any = defaultLang,
    value: string = '',
    key: string;

  for (let i = 0, j = array.length; i < j; i++) {
    key = array[i];
    value = current[key];
    if (i === j - 1) return value;
    if (!value) return '';
    current = value;
  }
  return '';
};
