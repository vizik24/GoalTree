import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import Goal from './Goal';

// function to build a nested array from the flat goals array
function buildNestedArray(data) {
    // create dict to store items by their index
    const itemsById = {};
    // initialise the root object with a name and empty children object.
    const root = { name: "Root", children: [] };

    // function works in two passes. 
    // first pass - populate itemsById with items from data, each having an empty children array
    data.forEach(item => {
        itemsById[item.index] = { ...item, children: [] };
    });

    // second pass - build the tree structure
    data.forEach(item => {
        // if the items parent goal is the same as its index, it is a root level item
        if (item.parentGoal == item.index) {
            root.children.push(itemsById[item.index]);
        } 
        // otherwise, find its parent in itemsById and add it to the parents children array
        else if (itemsById[item.parentGoal]) {
            itemsById[item.parentGoal].children.push(itemsById[item.index]);
        }
    });

    // root object now contains the nested structure.
    return root;
}

function TreeView({ goals, setGoals, setHighlightGoalIndex, highlightGoalIndex, zoom, bigCards=true }) {
    const [treeData, setTreeData] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [translation, setTranslation] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);

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

    useEffect(() => {
        if (treeLayout && svgRef.current) {
            const nodes = treeLayout.descendants();
            const links = treeLayout.links();

            // Calculate the bounding box of the tree
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            nodes.forEach(node => {
                minX = Math.min(minX, node.y);
                maxX = Math.max(maxX, node.y);
                minY = Math.min(minY, node.x);
                maxY = Math.max(maxY, node.x);
            });

            const width = maxX - minX + 500; // Add padding
            const height = maxY - minY + 300; // Add padding

            // Set the SVG viewBox
            svgRef.current.setAttribute('viewBox', `${minX - 250} ${minY - 150} ${width} ${height}`);

            // Calculate the center of the tree
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            // Set initial translation to center the tree
            setTranslation({ x: -centerX, y: -centerY });
        }
    }, [treeLayout]);

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
        <div className="relative overflow-hidden" style={{ width: '100%', height: '100vh', userSelect: 'none'}}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
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
                            stroke="currentColor"
                            className="stroke-primary"
                            strokeWidth="1.5"
                        />
                    ))}
                    {nodes.map((node, i) => (
                        <foreignObject
                            key={`node-${i}`}
                            x={node.y - 125}
                            y={node.x - 144}
                            width={250}
                            height={288}
                        >
                            <div className="w-full h-full flex justify-center items-center">
                                <Goal
                                bigCard={true}
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

