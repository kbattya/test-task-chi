export function amountSum(tickets) {
  const acc = tickets.reduce((acc, ticket) => {
    return (acc += ticket.available);
  }, 0);

  let temp = String(acc).split("");
  temp.splice(-3, 0, ",");

  return temp.join("");
}

export function formatNumberToString(number) {
  let string = number.toString().split('');

  if (string.length <= 3) {
    return string.join('');
  } else {
    string.splice(-3, 0, ',');
    return string.join('');
  }
}

export function convertSecToDate(n) {
  var day = parseInt(n / (24 * 3600));

  if (day < 31) {
    return `${day} days`;
  }
}
