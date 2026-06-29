const sharp = require('sharp');

const inputPath = 'c:/Users/Shruthik Garipally/md-1/public/techpack_4.png';
const outputPath = 'c:/Users/Shruthik Garipally/md-1/public/techpack_4_trimmed.png';

sharp(inputPath)
  .trim() // Trims transparent or uniform border color
  .toFile(outputPath)
  .then(info => {
    console.log('Trimmed image saved:', info);
  })
  .catch(err => {
    console.error('Error trimming image:', err);
  });
