const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const hundreds = ['', 'one hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'];
const thousands = ['', 'thousand', 'lakh', 'crore'];

function toSentenceCase(text){
  console.log(text);
    console.log(text.split(' '));
    return text.split(' ').map(e => e &&`${e[0].toUpperCase()}${e.slice(1)}`).join(' ');
}

function convertToWords(num) {
  if (num < 0 || num >= 1e12) {
    return 'Invalid number'; // handle out of range numbers
  }

  if (num === 0) {
    return 'zero';
  }

  let i = 0;
  let words = '';

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = '';
      if (chunk < 10) {
        chunkWords = ones[chunk];
      } else if (chunk < 100) {
        chunkWords = tens[Math.floor(chunk / 10)] + ' ' + ones[chunk % 10];
      } else {
        chunkWords = hundreds[Math.floor(chunk / 100)] + ' ' + convertToWords(chunk % 100);
      }

      words = chunkWords + ' ' + thousands[i] + ' ' + words;
    }

    num = Math.floor(num / 1000);
    i++;
  }

  return `${toSentenceCase(words.trim())}`;
}

export default function numberToWords(num){
  return `Indian Rupee ${convertToWords(num)}`
}