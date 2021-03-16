
let TidinessOptions = {
    1: 'Not very clean',
    2: 'Clean enough',
    3: 'Very well-kept',
  };

  let NoiseOptions = {
    1: 'Very quiet',
    2: 'Not much noise',
    3: 'A little noisy',
    4: 'Pretty loud',
  };

  let PrivacyOptions = {
    1: 'Yes',
    2: 'People walk by occasionally',
    3: 'Not private, people walk by often',
    4: 'Almost public',
  };

  let WuduOptions = {
    1: 'Dedicated wudu area nearby',
    2: 'Bathroom around the corner',
    3: 'On 1 floor above or below',
    4: 'None nearby',
  };

function getTidinessDescription(value) {
    return TidinessOptions[value];
}
function getNoiseDescription(value) {
    return NoiseOptions[value];
}
function getPrivacyDescription(value) {
    return PrivacyOptions[value];
}
function getWuduDescription(value) {
    return WuduOptions[value];
}

export {TidinessOptions, NoiseOptions, PrivacyOptions, WuduOptions, 
    getTidinessDescription, getWuduDescription, getNoiseDescription, 
    getPrivacyDescription};