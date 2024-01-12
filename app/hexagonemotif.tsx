import { RegularPolygon } from 'react-konva';

interface HexagonMotifProps {
  x: number;
  y: number;
  size: number;
  fill: string;
}

const HexagonMotif: React.FC<HexagonMotifProps> = ({ x, y, size, fill }) => {
  return (
    <RegularPolygon
      x={x}
      y={y}
      sides={6}
      radius={size}
      fill={fill}
    />
  );
};

export default HexagonMotif;