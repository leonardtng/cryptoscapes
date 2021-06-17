export const pearsonCorrelation = (prefs: number[][], p1: number, p2: number) => {
  var si: any = [];

  for (var key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }

  var n = si.length;

  if (n === 0) return 0;

  var sum1 = 0;
  for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

  var sum2 = 0;
  for (var j = 0; j < si.length; j++) sum2 += prefs[p2][si[j]];

  var sum1Sq = 0;
  for (var k = 0; k < si.length; k++) {
    sum1Sq += Math.pow(prefs[p1][si[k]], 2);
  }

  var sum2Sq = 0;
  for (var a = 0; a < si.length; a++) {
    sum2Sq += Math.pow(prefs[p2][si[a]], 2);
  }

  var pSum = 0;
  for (var b = 0; b < si.length; b++) {
    pSum += prefs[p1][si[b]] * prefs[p2][si[b]];
  }

  var num = pSum - (sum1 * sum2 / n);
  var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
      (sum2Sq - Math.pow(sum2, 2) / n));

  if (den === 0) return 0;

  return num / den;
}