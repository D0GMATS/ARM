import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Group, Rect, Text, Circle, Line } from 'react-konva';
import { Scheme } from '@/domain/entities/Scheme';
import { Point } from '@/domain/value-objects/Point';
import { useEditorStore } from '@/presentation/shared/store/useEditorStore';
import styles from './SchemeCanvas.module.css';

interface SchemeCanvasProps {
  scheme: Scheme;
  onMoveObject: (objectId: string, position: Point) => void;
  onConnectWire: (
    fromObjectId: string,
    fromTerminalId: string,
    toObjectId: string,
    toTerminalId: string
  ) => void;
}

export const SchemeCanvas: React.FC<SchemeCanvasProps> = ({
  scheme,
  onMoveObject,
  onConnectWire,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [wireStart, setWireStart] = useState<{ objectId: string; terminalId: string } | null>(null);

  const { selectedObjectId, setSelectedObjectId, activeTool, zoom } = useEditorStore();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleTerminalClick = (objectId: string, terminalId: string) => {
    if (activeTool !== 'wire') return;
    if (!wireStart) {
      setWireStart({ objectId, terminalId });
    } else {
      onConnectWire(wireStart.objectId, wireStart.terminalId, objectId, terminalId);
      setWireStart(null);
    }
  };

  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      <Stage
        width={size.width}
        height={size.height}
        scaleX={zoom}
        scaleY={zoom}
        draggable={activeTool === 'select'}
        onClick={(e) => {
          if (e.target === e.target.getStage()) {
            setSelectedObjectId(null);
            setWireStart(null);
          }
        }}
      >
        <Layer>
          {scheme.electricalGraph.wires.map((wire) => (
            <Line
              key={wire.id}
              points={wire.points.flatMap((p) => [p.x, p.y])}
              stroke={wire.color}
              strokeWidth={2.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}

          {scheme.objects.map((obj) => {
            const isSelected = obj.id === selectedObjectId;
            return (
              <Group
                key={obj.id}
                x={obj.position.x}
                y={obj.position.y}
                draggable={activeTool === 'select'}
                onClick={() => setSelectedObjectId(obj.id)}
                onDragEnd={(e) => {
                  onMoveObject(obj.id, new Point(e.target.x(), e.target.y()));
                }}
              >
                <Rect
                  width={obj.size.width}
                  height={obj.size.height}
                  fill="#ffffff"
                  stroke={isSelected ? '#1ABB9C' : '#34495E'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  cornerRadius={3}
                  shadowColor="rgba(0,0,0,0.08)"
                  shadowBlur={4}
                />
                <Text
                  text={obj.designation}
                  width={obj.size.width}
                  height={obj.size.height}
                  align="center"
                  verticalAlign="middle"
                  fontSize={12}
                  fontStyle="bold"
                  fill="#34495E"
                />
                {obj.terminals.map((term) => {
                  const isWireStart =
                    wireStart?.objectId === obj.id && wireStart?.terminalId === term.id;
                  return (
                    <Circle
                      key={term.id}
                      x={term.offset.x}
                      y={term.offset.y}
                      radius={5}
                      fill={isWireStart ? '#E74C3C' : '#1ABB9C'}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      onClick={(e) => {
                        e.cancelBubble = true;
                        handleTerminalClick(obj.id, term.id);
                      }}
                    />
                  );
                })}
              </Group>
            );
          })}
        </Layer>
      </Stage>

      {activeTool === 'wire' && (
        <div className={styles.hint}>
          {wireStart
            ? 'Кликните на вторую клемму для соединения'
            : 'Кликните на первую клемму для начала провода'}
        </div>
      )}
    </div>
  );
};
