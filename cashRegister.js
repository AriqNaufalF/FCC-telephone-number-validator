function checkCashRegister(price, cash, cid) {
  //todo: hitung kembalian (*100)
  let change = (cash - price) * 100;

  //todo: hitung jumlah uang di laci kasir(*100)
  const totalCid = cid.reduce((sum, cash) => sum + cash[1] * 100, 0);

  //* panduan satuan uang dolar (sudah * 100)
  const currencyUnit = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    'ONE HUNDRED': 10000,
  };

  /**
   * todo: PENGECEKAN KONDISI
   * kondisi 1, ketika kembalian tidak cukup
   * kondisi 2, ketika kembalian sama dengan jumlah uang di laci kasir
   * kondisi 3, ketika kembalian lebih kecil dari uang yang ada di laci kasir
   *    kembalikan uang dengan pecahannya dari yg paling besar
   */
  if (totalCid < change) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  } else if (totalCid === change) {
    return { status: 'CLOSED', change: cid };
  } else {
    cid = cid.reverse();

    // Menyiapkan uang kembalian (array)
    const returnedMoney = [];

    // telusuri setiap uang yang ada di laci
    cid.forEach((unit) => {
      // set kondisi awal dari satuan baru
      let newCurrencyUnit = [unit[0], 0];
      // jumlah uang
      let amount = unit[1] * 100;

      while (change >= currencyUnit[unit[0]] && amount > 0) {
        change -= currencyUnit[unit[0]];
        amount -= currencyUnit[unit[0]];
        newCurrencyUnit[1] += currencyUnit[unit[0]] / 100;
      }

      if (newCurrencyUnit[1] > 0) {
        returnedMoney.push(newCurrencyUnit);
      }
    });

    if (change > 0) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    return { status: 'OPEN', change: returnedMoney };
  }
}

console.log(
  checkCashRegister(3.26, 100, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
);
