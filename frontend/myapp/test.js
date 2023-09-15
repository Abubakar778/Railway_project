function Add(a, b, callback) {
  const result = a + b;
  const callresult = callback(result);
  return callresult;
}

function doubleitem(result) {
  return 2 * result;
}

Add(2, 4, doubleitem);

const Add = async (a, b, callback) => {
  const result = a + b;
  const callresult = callback(result);
  return await callresult;
};

function doublevalue(result) {
  return 2 * result;
}

Add(2, 4, doublevalue);
