export const CamelCase = {
  fromSnakeCase: (snakeCaseStr: string) => {
    if (snakeCaseStr) {
      return snakeCaseStr
        ?.split('_')
        .map((match, i) => {
          if (i > 0) {
            if (match?.length > 1) {
              return `${match[0].toUpperCase()}${match.substring(1)}`;
            } else if (match?.length === 0) {
              return match?.toUpperCase();
            }
            return match;
          }
          return match;
        })
        .join('');
    }
    return snakeCaseStr;
  },
  toSnakeCase: (camelCaseStr: string) => {
    if (camelCaseStr) {
      return `${camelCaseStr[0]}${camelCaseStr
        ?.substring(1)
        .replace(/[A-Z]/g, (match) => `_${match?.toLowerCase?.()}`)}`;
    }
    return camelCaseStr;
  },
  toSentenceCase: (camelCaseStr: string) => {
    if (camelCaseStr) {
      return `${camelCaseStr[0].toUpperCase()}${camelCaseStr
        ?.substring(1)
        .replace(/[A-Z]/g, (match) => ` ${match?.toLowerCase?.()}`)}`;
    }
    return camelCaseStr;
  },
  toCapitalizeCase: (camelCaseStr: string) => {
    if (camelCaseStr) {
      return `${camelCaseStr[0].toUpperCase()}${camelCaseStr
        ?.substring(1)
        .replace(
          /[A-Z]/g,
          (match) =>
            ` ${match?.length > 0 ? match[0]?.toUpperCase() + match?.substring(1) : ''}`,
        )}`;
    }
    return camelCaseStr;
  },
  valueOf: (str: string, delimiter: string) => {
    if (str) {
      return str
        ?.split(delimiter ?? '_')
        .map((match, i) => {
          if (i > 0) {
            if (match?.length > 1) {
              return `${match[0].toUpperCase()}${match.substring(1)}`;
            } else if (match?.length === 0) {
              return match?.toUpperCase();
            }
            return match;
          }
          return match;
        })
        .join('');
    }
    return str;
  },
};

export const SnakeCase = {
  fromCamelCase: (camelCaseStr: string) => {
    if (camelCaseStr) {
      return camelCaseStr
        ?.split(/[A-Z]/)
        .map((match) => {
          return match?.toLowerCase();
        })
        .join('_');
    }
    return camelCaseStr;
  },
  toCamelcase: (snakeCaseStr: string) => CamelCase.fromSnakeCase(snakeCaseStr),
  toSentenceCase: (snakeCaseStr: string) => {
    if (snakeCaseStr) {
      const val = snakeCaseStr?.split('_').join(' ');
      const first = val[0].toUpperCase();
      if (val.length > 1) {
        return first + val.substring(1);
      }
      return first;
    }
    return snakeCaseStr;
  },
  toCapitalizeCase: (snakeCaseStr: string) => {
    if (snakeCaseStr) {
      return snakeCaseStr
        ?.split('_')
        .map((s) => {
          const first = s[0].toUpperCase();
          if (s.length > 1) {
            return first + s.substring(1);
          }
          return first;
        })
        .join(' ');
    }
    return snakeCaseStr;
  },
  valueOf: (str: string, delimiter: string) => {
    if (str) {
      return str
        ?.split(delimiter ?? /[A-Z]/)
        .map((match) => {
          return match?.toLowerCase();
        })
        .join('_');
    }
    return str;
  },
};

export const getInitials = (fullName: string) => {
  const arr = fullName?.split(' ') ?? [];
  return arr && arr?.length > 2
    ? arr
        ?.slice(0, 2)
        .map((s) => s[0])
        .join('')
    : arr?.map((s) => s[0]).join('');
};
