import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const resize = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const absFilename = path.join(
    __dirname,
    './../../assets/full/' + filename + '.jpg'
  );
  const thumbDir = path.join(__dirname,'./../../assets/thumbs/');
  const thumbPath = path.join(
    thumbDir + filename + '_' + width + '_' + height + '.jpg'
  );
 
  //only create file if it does not exist
  if (!fs.existsSync(thumbPath)) {
    console.log(
      'resizing input filename: ' + absFilename + ' to ' + width + 'x' + height
    );
    //check if directory exists´
    if (!fs.existsSync(thumbDir)){
      console.log(
        'creating directory: ' + thumbDir
      );
      fs.mkdirSync(thumbDir);
    }
    await sharp(absFilename)
      .resize(width, height)
      .toFile(thumbPath);
  }
  return thumbPath;
};

export = {
  resize
};
