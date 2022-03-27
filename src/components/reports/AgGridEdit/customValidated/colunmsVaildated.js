const checkTrainCar = (vag) => {
  const regNum = /^\d{8}$/;
  if (!regNum.test(vag)) {
    return false;
  } else {
    let sum = 0;
    for (let i = 0; i < vag.length - 1; i++) {
      const v = vag.charAt(i);
      const t = +v * (((i + 1) % 2) + 1);
      if (t > 9) {
        sum = sum + 1 + (t % 10);
      } else {
        sum = sum + t;
      }
    }
    const last = vag.charAt(7);

    return !((+last + sum) % 10);
  }
};

export const styleValidateNV = (params, vags) => {
  const filtrVags = vags.filter((v) => v.includes(params.value));

  if (filtrVags.length > 1 || !checkTrainCar(params.value)) {
    return { borderRight: '1px solid #aaa', color: 'red' };
  } else {
    return { borderRight: '1px solid #aaa' };
  }
};

export const validateNV = (vags) => {
  const nvs = vags.reduce((acc, row) => {
    return [...acc, row.NV];
  }, []);
  const unique = new Set(nvs);
  if (nvs.length > unique.size) {
    return 'Найдены дубликаты';
  } else {
    let noVags = [];
    nvs.forEach((vag) => {
      if (!checkTrainCar(vag)) {
        noVags.push(vag);
      }
    });
    return noVags.length > 0
      ? `Некорректные номера вагонов: ${noVags.join(', ')}`
      : '';
  }
};
