import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [text, setText] = useState("FOCUS");
  const [color, setColor] = useState("#00eaff");
  const [font, setFont] = useState("Poppins");
  const [background, setBackground] = useState("black");
  const [glow, setGlow] = useState(40);

  // المقاسات
  const [unit, setUnit] = useState("cm");
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(50);

  const previewRef = useRef(null);

  // التحويل إلى سم
  const widthCm =
    unit === "cm"
      ? width
      : unit === "mm"
      ? width / 10
      : width * 2.54;

  const heightCm =
    unit === "cm"
      ? height
      : unit === "mm"
      ? height / 10
      : height * 2.54;

  // حجم المعاينة
  const scale = 6;

  const previewWidth = widthCm * scale;
  const previewHeight = heightCm * scale;

  // حجم الخط تلقائياً
  const fontSize = Math.max(
    40,
    Math.min(previewWidth, previewHeight) * 0.35
  );

  // المساحة والسعر
  const area = widthCm * heightCm;

  const pricePerSquareMeter = 4500;

  const price = (
    (area / 10000) *
    pricePerSquareMeter
  ).toFixed(0);

  // تحميل الصورة
  const downloadImage = async () => {
    const canvas = await html2canvas(previewRef.current, {
      scale: 3,
    });

    const link = document.createElement("a");
    link.download = "neon-sign.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // واتساب
  const sendWhatsApp = () => {
    const message = `
✨ New Neon Order

Text: ${text}

Width: ${width} ${unit}

Height: ${height} ${unit}

Font: ${font}

Color: ${color}

Background: ${background}

Glow: ${glow}

Area: ${(area / 10000).toFixed(2)} m²

Estimated Price: ${price} EGP
`;

    window.open(
      `https://wa.me/201067327962?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="container">

      <div className="controls">

        <h1>✨ Neon Designer</h1>

        <h2>Design Panel</h2>

        <label>Write Your Name</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label>Choose Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label>Font</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          <option>Poppins</option>
          <option>Pacifico</option>
          <option>Great Vibes</option>
          <option>Lobster</option>
          <option>Bebas Neue</option>
          <option>Dancing Script</option>
          <option>Orbitron</option>
          <option>Monoton</option>
          <option>Permanent Marker</option>
          <option>Audiowide</option>
          <option>Press Start 2P</option>
        </select>

        <label>Background</label>
        <select
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        >
          <option value="black">Black</option>
          <option value="brick">Brick Wall</option>
          <option value="wood">Wood</option>
          <option value="grass">Grass</option>
          <option value="purple">Purple</option>
        </select>

        <label>Glow</label>
        <input
          type="range"
          min="10"
          max="100"
          value={glow}
          onChange={(e) => setGlow(Number(e.target.value))}
        />

        <label>Unit</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="cm">Centimeter (cm)</option>
          <option value="mm">Millimeter (mm)</option>
          <option value="inch">Inch</option>
        </select>

        <label>Width</label>
        <input
          type="number"
          value={width}
          min="10"
          onChange={(e) => setWidth(Number(e.target.value))}
        />

        <label>Height</label>
        <input
          type="number"
          value={height}
          min="10"
          onChange={(e) => setHeight(Number(e.target.value))}
        />

        <div style={{ marginTop: "20px" }}>
          <strong>Estimated Price</strong>

          <h2
            style={{
              color: "#00eaff",
              marginTop: "10px",
            }}
          >
            {price} EGP
          </h2>
        </div>

      </div>

      <div
        ref={previewRef}
        className={`preview ${background}`}
        style={{
          width: `${previewWidth}px`,
          height: `${previewHeight}px`,
          position: "relative",
        }}
      >
        <h2
          style={{
            color,
            fontSize: `${fontSize}px`,
            fontFamily: font,
            textShadow: `
              0 0 5px ${color},
              0 0 10px ${color},
              0 0 ${glow}px ${color},
              0 0 ${glow * 1.5}px ${color},
              0 0 ${glow * 2}px ${color}
            `,
          }}
        >
          {text}
        </h2>
      </div>
            <div className="action-buttons">

        <div className="details-card">

          <h3>Design Details</h3>

          <div className="detail-row">
            <span>Text</span>
            <strong>{text}</strong>
          </div>

          <div className="detail-row">
            <span>Size</span>
            <strong>{width} × {height} {unit}</strong>
          </div>

          <div className="detail-row">
            <span>Area</span>
            <strong>{(area / 10000).toFixed(2)} m²</strong>
          </div>

          <div className="detail-row">
            <span>Font</span>
            <strong>{font}</strong>
          </div>

          <div className="detail-row">
            <span>Glow</span>
            <strong>{glow}</strong>
          </div>

          <hr />

          <div className="price-row">
            <span>Estimated Price</span>
            <strong>{price} EGP</strong>
          </div>

        </div>

        <button
          className="whatsapp-btn"
          onClick={sendWhatsApp}
        >
          Order on WhatsApp
        </button>

        <button
          className="download-btn"
          onClick={downloadImage}
        >
          Download PNG
        </button>

      </div>

    </div>
  );
}

export default App;