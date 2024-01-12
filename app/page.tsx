'use client'
import { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import HexagonMotif from './hexagonemotif';

import styles from './styles.module.css';

export default function Home() {
  interface Hexagon {
    x: number;
    y: number;
    size: number;
    fill: string;
  }
  
  interface Motif {
    x: number;
    y: number;
    color: string;
    hexagons: Hexagon[];
  }

  const [numHexagons, setNumHexagons] = useState<number>(1);
  const colors = ['#FF5733', '#33FF57']; // Different colors for motifs
  const [motifs, setMotifs] = useState<Motif[]>([]);

  const generateMotifs = (numHexagons: number): Motif[] => {
    const motifsArray: Motif[] = [];

    for (let i = 0; i < 2; i++) { // For two motifs
      const motif: Motif = {
        x: i * 200 + 100,
        y: 200,
        color: colors[i], // Assign different color to each motif
        hexagons: generateHexagonsForMotif(numHexagons, i * 200 + 100, 200, 30, colors[i]),
      };
      motifsArray.push(motif);
    }

    return motifsArray;
  };

  const generateHexagonsForMotif = (numHexagons: number, x: number, y: number, size: number, color: string): Hexagon[] => {
    const hexagons: Hexagon[] = [];
    const angleStep = (2 * Math.PI) / numHexagons;

    for (let i = 0; i < numHexagons; i++) {
      const hexagonX = x + size * Math.cos(i * angleStep);
      const hexagonY = y + size * Math.sin(i * angleStep);

      // Calculate gradient color based on motif color
      const gradientFactor = i / numHexagons; // Adjust for gradient effect
      const gradientColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${1 - gradientFactor})`;

      hexagons.push({ x: hexagonX, y: hexagonY, size: 30, fill: gradientColor });
    }

    return hexagons;
  };

  const handleNumHexagonsSubmit = (): void => {
    const generatedMotifs: Motif[] = generateMotifs(numHexagons);
    setMotifs(generatedMotifs);
  };

  return (
    <div className={styles.container}>
      <h1>Cellular Wireless Network</h1>
      <div className={styles.label}>
        <label>
          Number of Hexagons in a Motif:
          <input
            type="number"
            value={numHexagons}
            onChange={(e) => setNumHexagons(Number(e.target.value))}
          />
        </label>
        <button onClick={handleNumHexagonsSubmit}>Submit</button>
      </div>
      <div className={styles.stage}>
        <Stage width={window.innerWidth} height={window.innerHeight - 100}>
          <Layer>
            {motifs.flatMap((motif, index) => 
              motif.hexagons.map((hexagon, hexIndex) => (
                <HexagonMotif
                  key={`${index}-${hexIndex}`}
                  x={hexagon.x}
                  y={hexagon.y}
                  size={hexagon.size}
                  fill={hexagon.fill}
                />
              ))
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );


}
