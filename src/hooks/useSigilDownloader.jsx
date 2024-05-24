import { useCallback } from "react";
import { saveAs } from "file-saver";
import { sigil, stringRenderer } from "urbit-sigil-js";
import * as ob from "urbit-ob";

const useSigilDownloader = (canvasRef) => {
  const initCanvas = (canvas, size) => {
    const { x, y } = size;
    const ctx = canvas.getContext("2d");

    let ratio = window.devicePixelRatio || 1;

    canvas.width = x * ratio;
    canvas.height = y * ratio;
    canvas.style.width = x + "px";
    canvas.style.height = y + "px";

    ctx.scale(ratio, ratio);

    return canvas;
  };

  const cleanupCanvas = (canvas) => {
    canvas.width = 0;
    canvas.height = 0;
  };

  const loadImg = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Error loading image. src: ${src}`);
      img.src = src;
    });

  const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    const byteString = atob(dataURI.split(",")[1]);
    // separate out the mime component
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    // create a view into the buffer
    let ia = new Uint8Array(ab);
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const downloadSigil = useCallback(
    (point, colors, size) => {
      const patp = ob.patp(point);

      const _size = size / window.devicePixelRatio;

      const DATA_URI_PREFIX = "data:image/svg+xml;base64,";

      // initialize canvas element
      const canvas = initCanvas(canvasRef.current, { x: _size, y: _size });
      const ctx = canvas.getContext("2d");

      // make sigil svg and encoded into base64
      const svg = sigil({
        patp,
        renderer: stringRenderer,
        size: _size,
        colors,
        margin: (54 / 256) * _size,
      });

      // FF rendering hack
      const svgDocument = new DOMParser().parseFromString(svg, "image/svg+xml");
      svgDocument.documentElement.width.baseVal.valueAsString = `${size}px`;
      svgDocument.documentElement.height.baseVal.valueAsString = `${size}px`;
      const svgText = new XMLSerializer().serializeToString(svgDocument);
      const svg64 = btoa(svgText);

      return loadImg(DATA_URI_PREFIX + svg64, _size, _size)
        .then((img) => {
          ctx.drawImage(img, 0, 0, _size, _size);
          const png = dataURItoBlob(canvas.toDataURL("image/png"));
          saveAs(png, `${patp.slice(1)}-sigil.png`);
          ctx.clearRect(0, 0, _size, _size);
        })
        .catch(() => "Error generating sigil")
        .then((r) => {
          cleanupCanvas(canvasRef.current);
          return r;
        });
    },
    [canvasRef]
  );
  return { downloadSigil };
};

export default useSigilDownloader;
