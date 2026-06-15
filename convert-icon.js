const sharp = require('sharp');
const fs = require('fs');

async function generateIco() {
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp('日志事务图标设计.png')
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push(buf);
  }

  // ICO header
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);       // reserved
  header.writeUInt16LE(1, 2);       // ICO type
  header.writeUInt16LE(sizes.length, 4); // image count

  let offset = 6 + sizes.length * 16;
  const entries = [];

  for (let i = 0; i < sizes.length; i++) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0);  // width
    entry.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1);  // height
    entry.writeUInt8(0, 2);       // color count
    entry.writeUInt8(0, 3);       // reserved
    entry.writeUInt16LE(1, 4);    // color planes
    entry.writeUInt16LE(32, 6);   // bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8); // image size
    entry.writeUInt32LE(offset, 12);              // image offset
    entries.push(entry);
    offset += pngBuffers[i].length;
  }

  const ico = Buffer.concat([header, ...entries, ...pngBuffers]);
  fs.writeFileSync('icon.ico', ico);
  console.log('icon.ico 生成成功！包含尺寸:', sizes.join(', '));
}

generateIco().catch(console.error);
