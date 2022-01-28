import resize from '../../utilities/resize';
import sharp from 'sharp';

describe('Test resize functionality', () => {
  it('save a resized image and expect its dimensions to be correct', async () => {
    const filename = 'fjord';
    const width = 200;
    const height = 300;

    const resizedImagePath = await resize.resize(filename, width, height);
    const imageWidth = await (await sharp(resizedImagePath).metadata()).width;
    const imageHeight = await (await sharp(resizedImagePath).metadata()).height;
    expect(imageWidth).toBe(200);
    expect(imageHeight).toBe(300);
  });
});
