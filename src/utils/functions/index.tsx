import moment from 'moment';

function capitalizeFirstLetterOfWord(words) {
  const str = words;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);

  return str2;
}

function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.split(' ');
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

function formateDateTime(date) {
  return (
    moment(new Date(date)).format('D MMM Y') +
    ', ' +
    moment(new Date(date)).format('hh:mm a')
  );
}

function checkDateStatus(startDate, endDate) {
  if (new Date() < new Date(startDate)) {
    return 'pending';
  } else if (
    new Date() > new Date(startDate) &&
    new Date() > new Date(endDate)
  ) {
    return 'expire';
  } else if (
    new Date() >= new Date(startDate) &&
    new Date() <= new Date(endDate)
  ) {
    return 'active';
  }
}

export const functions = {
  capitalizeFirstLetterOfWord,
  capitalizeTheFirstLetterOfEachWord,
  formateDateTime,
  checkDateStatus,
};
