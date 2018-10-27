const Load = {
  images(...files) {
    let loaded = 0;
    const images = {};
    return new Promise((resolve) => {
      files.forEach( file => {
        const img = new Image();
        img.src = file;
        img.onload = () => {
          loaded++;
          images[file] = img;
          if( loaded === files.length) resolve(images)
        }
      })
    })
  }
};

export default Load;
