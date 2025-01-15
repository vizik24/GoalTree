import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import Goal from './Goal';

function buildNestedArray(data) {
    const itemsById = {};
    const root = { name: "Root", children: [] };

    data.forEach(item => {
        itemsById[item.index] = { ...item, children: [] };
    });

    data.forEach(item => {
        if (item.parentGoal == item.index) {
            root.children.push(itemsById[item.index]);
        } else if (itemsById[item.parentGoal]) {
            itemsById[item.parentGoal].children.push(itemsById[item.index]);
        }
    });

    return root;
}

function TreeView({ goals, setGoals, setHighlightGoalIndex, highlightGoalIndex, zoom }) {
    const [treeData, setTreeData] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [translation, setTranslation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (goals && goals.length > 0) {
            const tree = buildNestedArray(goals);
            setTreeData(tree);
        }
    }, [goals]);

    const hierarchy = useMemo(() => treeData ? d3.hierarchy(treeData) : null, [treeData]);

    const treeLayout = useMemo(() => {
        if (!hierarchy) return null;
        return d3.tree()
            .nodeSize([150 * 1.5, 250 * 1.5])
            .separation((a, b) => a.parent === b.parent ? 1.2 : 1.5)
            (hierarchy);
    }, [hierarchy]);

    if (!treeLayout) {
        return null;
    }

    const nodes = treeLayout.descendants();
    const links = treeLayout.links();

    const createPath = (sourceX, sourceY, targetX, targetY) => {
        return d3.linkHorizontal()({
            source: [sourceX, sourceY],
            target: [targetX, targetY]
        });
    };

    const handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        setStartPos({ x: clientX, y: clientY });
        setIsPanning(true);
    };

    const handleMouseMove = (e) => {
        if (!isPanning) return;
        const { clientX, clientY } = e;
        const dx = clientX - startPos.x;
        const dy = clientY - startPos.y;

        setTranslation({
            x: translation.x + dx,
            y: translation.y + dy
        });

        setStartPos({ x: clientX, y: clientY });
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setStartPos({ x: touch.clientX, y: touch.clientY });
        setIsPanning(true);
    };

    const handleTouchMove = (e) => {
        if (!isPanning) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;

        setTranslation({
            x: translation.x + dx,
            y: translation.y + dy
        });

        setStartPos({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
        setIsPanning(false);
    };

    return (
        <div className="relative overflow-auto" style={{ width: '100%', height: '100vh' }}>
            <svg
                width={Math.max(1200, nodes.length * 250)}
                height={Math.max(900, nodes.length * 150)}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            >
                <g transform={`translate(${translation.x}, ${translation.y}) scale(${zoom})`}>
                    {links.map((link, i) => (
                        <path
                            key={`link-${i}`}
                            d={createPath(link.source.y, link.source.x, link.target.y, link.target.x)}
                            fill="none"
                            stroke="currentColor" // Tailwind class for using primary color
                            className="stroke-primary" // Using Tailwind's class for primary color
                            strokeWidth="1.5"
                        />
                    ))}
                    {nodes.map((node, i) => (
                        <foreignObject
                            key={`node-${i}`}
                            x={node.y - 125}
                            y={node.x - 75}
                            width={250}
                            height={150}
                        >
                            <div className="w-full h-full flex justify-center items-center">
                                <Goal
                                    goalIndex={node.data.index}
                                    goals={goals}
                                    setGoals={setGoals}
                                    setHighlightGoalIndex={setHighlightGoalIndex}
                                    highlightGoalIndex={highlightGoalIndex}
                                />
                            </div>
                        </foreignObject>
                    ))}
                </g>
            </svg>
        </div>
    );
}

export default TreeView;
