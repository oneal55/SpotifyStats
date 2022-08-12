export const format = (string) => {
    let acc = "";
    for (let i = 0; i < string.length; i++) {
      if (i === 0) {
        acc += string.charAt(0).toUpperCase();
      } else if (string.charAt(i) === "_") {
        acc += "-";
      } else {
        acc += string.charAt(i).toLowerCase();
      }
    }

    return acc;
  };