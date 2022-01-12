import sharp from 'sharp'
import path from 'path'

const resize = async (filename: string, width: number, height: number) : Promise<string> => {
    const absFilename = path.join(__dirname,'./../../assets/full/' + filename + '.jpg');
    const thumbPath = path.join(__dirname,'./../../assets/thumbs/' + filename + '_' + width + '_' + height  +'.jpg');
    console.log('input filename: ' + absFilename);
    await sharp(absFilename).resize(width, height).toFile(thumbPath);
    return thumbPath;
  };

  export = {
    resize
  };