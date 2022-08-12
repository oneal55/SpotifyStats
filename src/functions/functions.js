export const format = (string) => {
    let acc = "";
    for (let i = 0; i < string.length; i++) {
      if (i === 0 || (string.charAt(i - 1) < 'a' || string.charAt(i - 1) > 'z')) {
        acc += string.charAt(i).toUpperCase();
      } else if (string.charAt(i) === "_") {
        acc += "-";
      } else {
        acc += string.charAt(i).toLowerCase();
      }
    }

    return acc;
  };