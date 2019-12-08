function takeField(arr, field) {
  return arr.map(x => (field ? x[field] : x));
}

function takeLast(arr, n, field) {
  return takeField(arr.slice(n > arr.length ? 0 : arr.length - n, arr.length), field);
}

function sum(data) {
  return data.reduce((acc, x) => acc + x);
}

function mean(data) {
  return data.reduce((a, b) => a + b) / data.length;
}

function stddev(data) {
  const dataMean = mean(data);
  const sqDiff = data.map(n => (n - dataMean) ** 2);
  const avgSqDiff = mean(sqDiff);
  return Math.sqrt(avgSqDiff);
}

// SMA
function simpleMovingAverage(data, config) {
  const { periods, field } = config;
  if (data.length < periods) {
    throw new Error('Periods longer than data length');
  }
  const vals = takeLast(data, periods, field);
  return sum(vals) / periods;
}

// EMA
function paddingLeft(data, length) {
  const arr = [];
  arr.length = length - data.length;
  arr.fill(0);
  return [...arr, ...data];
}

function exponentialMovingAverage(data, config, initVal) {
  const { periods, field, pipSize = 2 } = config;

  const weightingMultiplier = (2 / (periods + 1));

  const vals = takeField(data, field);

  if (initVal) {
    return ((vals[0] - initVal) * weightingMultiplier + initVal);
  }

  if (data.length < periods) {
    throw new Error('Periods longer than data length');
  }

  const meanVal = mean(takeField(data.slice(0, periods), field));

  return +(vals.slice(periods)
    .reduce((prev, e) => (e - prev) * weightingMultiplier + prev, meanVal)).toFixed(pipSize);
}


// MACD
function macdArray(data, config) {
  const {
    field, fastEmaPeriod = 12, slowEmaPeriod = 26,
    signalEmaPeriod = 9, pipSize = 2,
  } = config;

  const vals = takeField(data, field);

  const { length } = vals;

  const fastEmaArray = paddingLeft(
    exponentialMovingAverageArray(
      vals,
      { periods: fastEmaPeriod, pipSize: 20, field },
      // -------------------------- ^ set pipSize to 20 to prevent rounding
    ),
    length,
  );
  const slowEmaArray = paddingLeft(
    exponentialMovingAverageArray(
      vals,
      { periods: slowEmaPeriod, pipSize: 20, field },
    ),
    length,
  );

  const macdCalcArray = paddingLeft(
    slowEmaArray.map(
      (x, i) => +(fastEmaArray[i] - x).toFixed(pipSize),
    ),
    length,
  );

  const signalEmaArray = paddingLeft(
    exponentialMovingAverageArray(
      macdCalcArray.slice(slowEmaPeriod - 1),
      { periods: signalEmaPeriod, pipSize: 20, field },
    ),
    length,
  );

  return macdCalcArray.map((x, i) => [+(x - signalEmaArray[i]).toFixed(pipSize), x, +(signalEmaArray[i].toFixed(pipSize))])
    .slice(slowEmaPeriod + signalEmaPeriod - 2);
}


// FOR RSI
const calcGain = (q1, q2) => (q2 > q1 ? q2 - q1 : 0);
const calcLoss = (q1, q2) => (q2 < q1 ? q1 - q2 : 0);

function calcFirstAvgDiff(vals, comp, periods) {
  let prev;
  return vals.reduce((r, q, i) => {
    if (i === 1) {
      prev = r;
    }
    const diff = comp(prev, q);
    prev = q;
    return diff + (i === 1 ? 0 : r);
  }) / periods;
}

function calcSecondAvgDiff(vals, comp, periods, initAvg) {
  let prev;
  if (vals.length === 1) { // There is no data to calc avg
    return initAvg;
  }
  return vals.reduce((r, q, i) => {
    if (i === 1) {
      prev = r;
    }
    const diff = comp(prev, q);
    prev = q;
    const prevAvg = i === 1 ? initAvg : r;
    return ((prevAvg * (periods - 1)) + diff) / periods;
  });
}

function relativeStrengthIndex(data, config, memoizedDiff) {
  const { periods, field } = config;

  if (data.length < periods) {
    throw new Error('Periods longer than data length');
  }

  if (data.length === periods) {
    return 0;
  }

  const vals = takeField(data.slice(0, periods + 1), field);

  let restSeq;
  let initAvgGain;
  let initAvgLoss;

  if (memoizedDiff && 'gain' in memoizedDiff) {
    restSeq = takeField(data.slice(-2), field);

    initAvgGain = memoizedDiff.gain;
    initAvgLoss = memoizedDiff.loss;
  } else {
    // include last element from above to calc diff
    restSeq = takeField(data.slice(periods, data.length), field);

    initAvgGain = calcFirstAvgDiff(vals, calcGain, periods);
    initAvgLoss = calcFirstAvgDiff(vals, calcLoss, periods);
  }

  const avgGain = calcSecondAvgDiff(restSeq, calcGain, periods, initAvgGain);
  const avgLoss = calcSecondAvgDiff(restSeq, calcLoss, periods, initAvgLoss);

  if (memoizedDiff) {
    memoizedDiff.gain = avgGain;
    memoizedDiff.loss = avgLoss;
  }

  if (avgGain === 0) {
    return 0;
  } if (avgLoss === 0) {
    return 100;
  }

  const RS = avgGain / avgLoss;

  return 100 - (100 / (1 + (RS)));
}

// Stochastic Indicator (SO)
function stochasticIndicator(data, config) {
  const { kPeriod, dPeriod } = config;

  if (data.length < kPeriod) {
    throw new Error('Periods longer than data length');
  }

  if (data.length === kPeriod) {
    return 0;
  }
  const stochasticValue = [];
  for (let x = 0; x < dPeriod; x++) {
    const closingPrice = data[data.length - 1 - x];
    const tradingSessions = data.split(-kPeriod - x, data.length - 1 - x);
    const minValue = Math.min(tradingSessions);
    const maxValue = Math.max(tradingSessions);
    stochasticValue[x] = (closingPrice - minValue / maxValue - minValue) * 100;
  }

  const kValue = stochasticValue[0];
  const dValue = stochasticValue.reduce((a, b) => a + b, 0);

  return dValue, kValue;
}
