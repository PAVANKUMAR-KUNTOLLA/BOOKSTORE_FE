// Convert React Select Options
export const convertToSelectOptions = (data) => {
  const Options = [];
  data.sort().map((item, index) => {
    Options.push({
      name: item,
      label: item,
      id: `${item}-${index}`,
    });
  });
  return Options;
};

export const capitalizeString = (str) => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  else return "";
};

export const convertToLabel = (str) => {
  return capitalizeString(str ? str.replaceAll("_", " ") : "");
};

//  Convert time to Duration
export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " yrs";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hrs";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " mins";
  }
  return Math.floor(seconds) + " secs";
}

// Convert number to thousand separated string
// eg: 100000 -> 100,000
export function thousands_separators(num) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  return num;
}

/**
 * Password validator for login pages
 */

// has number
const hasNumber = (value) => {
  return new RegExp(/[0-9]/).test(value);
};

// has mix of small and capitals
const hasMixed = (value) => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};

// has special chars
const hasSpecial = (value) => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

// set color based on password strength
export const strengthColor = (count) => {
  if (count < 2) return { label: "Poor", color: value.errorMain };
  if (count < 3) return { label: "Weak", color: value.warningDark };
  if (count < 4) return { label: "Normal", color: value.orangeMain };
  if (count < 5) return { label: "Good", color: value.successMain };
  if (count < 6) return { label: "Strong", color: value.successDark };
};

// password strength indicator
export const strengthIndicator = (value) => {
  let strengths = 0;
  if (value.length > 5) strengths++;
  if (value.length > 7) strengths++;
  if (hasNumber(value)) strengths++;
  if (hasSpecial(value)) strengths++;
  if (hasMixed(value)) strengths++;
  return strengths;
};

/* Validator function */
export const validateString = (val) => {
  if (val && typeof val === "string" && val.length > 0) return true;
  else return false;
};

export const validateArrayData = (val) => {
  if (val && Array.isArray(val) && val.length > 0) return true;
  else return false;
};

export const validateObjectData = (val) => {
  if (val && typeof val === "object" && Object.keys(val).length > 0)
    return true;
  else return false;
};

export const sortArrayObjbyDate = (arr) => {
  return arr.sort((a, b) => new Date(b.x) - new Date(a.x));
};

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

//FIND which array has greater length compare to others
//-------------------------------------------
// let findLargeArr = [];

//   let uniqueFamilydata = [...new Set(report_list.map((d) => d["family"]))];
//   uniqueFamilydata.map((family) => {
//     let filteredData = report_list.filter((each) => each["family"] === family);

//     if (filteredData.length > findLargeArr.length) {
//       familyName = family;
//       findLargeArr = filteredData;
//     }
//   });

export function intToString(num) {
  if (typeof num != "number") return num;
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
}
