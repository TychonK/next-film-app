function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();

  const dateDifference = currentDate - birthDate;

  const ageDate = new Date(dateDifference);

  const age = ageDate.getUTCFullYear() - 1970;

  return age;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  if (remainingMinutes > 0) {
    if (hours > 0) {
      formattedTime += " ";
    }
    formattedTime += `${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    }`;
  }

  return formattedTime;
}

const calculateBackgroundColor = (voteAverage) => {
  const percentage = (voteAverage / 10) * 100;
  const red = 255;
  const green = (255 * percentage) / 100;
  return `rgb(${red}, ${green}, 0)`;
};

export { calculateAge, formatTime, calculateBackgroundColor };