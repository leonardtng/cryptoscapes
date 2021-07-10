export const formatNumber = (x: number | null, removeNegativeSign: boolean = false) => {
  if (x === null) return '0'
  let num: number = x;
  if (removeNegativeSign) num = Math.abs(x); 
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const roundDecimals = (num: number, places: number = 2) => {
  return Math.round(num * 10**places) / 10**places
};

export const shortenNumber = (num: number) => {
  let rawNum: number =  Math.abs(num);

  const format = (value: number, postfix: string) => {
    const str = value.toString();
    let decimalPoint = 0;

    if (str.indexOf('.') > -1 && str[str.indexOf('.') + 1] !== '0') {
      decimalPoint = 1;
    }

    return `${value.toFixed(decimalPoint)}${postfix}`;
  };

  const limits = {
    THOUSAND: 1000,
    MILLION: 1000000,
    BILLION: 1000000000,
    TRILLION: 1000000000000
  };

  if (rawNum >= limits.TRILLION) {
    return format(rawNum / limits.TRILLION, 'T');
  }
  if (rawNum >= limits.BILLION) {
    return format(rawNum / limits.BILLION, 'B');
  }
  if (rawNum >= limits.MILLION) {
    return format(rawNum / limits.MILLION, 'M');
  }
  if (rawNum >= limits.THOUSAND) {
    return format(rawNum / limits.THOUSAND, 'K');
  }

  return num.toFixed(0);
};