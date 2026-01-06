export class NumberFormat {
  pattern: string;
  identifier: string;
  alwaysValid: boolean;
  dial: string;
  constructor(
    pattern: string,
    dial: string,
    identifier = '#',
    alwaysValid = false,
  ) {
    this.pattern = pattern;
    this.identifier = identifier;
    this.alwaysValid = alwaysValid;
    this.dial = dial;
  }
  format = (str: string) => {
    if (
      str === undefined ||
      str === null ||
      str === '' ||
      this.pattern === undefined ||
      this.pattern === null ||
      this.pattern === ''
    ) {
      return str;
    }
    // for each letter in pattern, remove in string
    let substrate = this.pattern;
    let replacedIndex = -1;
    let workingStr = str;
    if (
      workingStr.startsWith(`+${this.dial}`) &&
      workingStr.length > `+${this.dial}`.length + 2
    ) {
      // remove dial
      workingStr = workingStr.replace(`+${this.dial}`, '').trim();
    }
    const len = Math.min(this.pattern.length, workingStr.length);
    for (let i = 0; i < len; i++) {
      replacedIndex = substrate.indexOf(this.identifier);
      substrate = substrate.replace(this.identifier, workingStr[i]);
    }
    return replacedIndex > 0
      ? substrate.substring(0, replacedIndex + 1)
      : substrate;
  };
  parse = (str: string) => {
    if (
      str === undefined ||
      str === null ||
      str === '' ||
      this.pattern === undefined ||
      this.pattern === null ||
      this.pattern === ''
    ) {
      return str;
    }
    // for each letter in pattern, remove in string
    let substrate = str?.replace(`+${this.dial}`, '');
    if (substrate.length > 1) {
      const _pattern = this.pattern.replace(`+${this.dial}`, '');
      for (const s of _pattern) {
        substrate = substrate.replace(s, '');
      }
    }
    return substrate.replace(/\D|\s/, '');
  };
  isValid(val: string) {
    return this.alwaysValid
      ? true
      : String(this.format(val)).length === String(this.pattern).length;
  }
}
