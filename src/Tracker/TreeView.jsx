

/**
 * TreeView component renders a hierarchical tree structure using D3.js and React.
 * It supports panning and zooming interactions for better navigation of the tree.
 *
 * @component
 * @param {Object[]} goals - Array of goal objects to be displayed in the tree.
 * @param {Function} setGoals - Function to update the goals state.
 * @param {Function} setHighlightGoalIndex - Function to set the index of the highlighted goal.
 * @param {number} highlightGoalIndex - Index of the currently highlighted goal.
 * @param {number} zoom - Zoom level for scaling the tree.
 * 
 */
import React, { useState, useEffect, useMemo } from 'react';
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

function TreeView({ goals, setGoals, setHighlightGoalIndex, highlightGoalIndex, zoom }) {
    // define state variable to hold tree data, 
    const [treeData, setTreeData] = useState(null);
    // state variable to track if panning is active
    const [isPanning, setIsPanning] = useState(false);
    // state variable to store start position of panning
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    // state to store current translation value for panning
    const [translation, setTranslation] = useState({ x: 0, y: 0 });

    // build tree data when goals change
    useEffect(() => {
        if (goals && goals.length > 0) {
            const tree = buildNestedArray(goals);
            setTreeData(tree);
        }
    }, [goals]);

    // memoized hierarchy data based on treeData. Memoizing caches the hierarchy to improve performance.
    const hierarchy = useMemo(() => treeData ? d3.hierarchy(treeData) : null, [treeData]);

    // memoized tree layout based on hierarchy
    const treeLayout = useMemo(() => {
        if (!hierarchy) return null;
        return d3.tree()
            .nodeSize([150 * 1.5, 250 * 1.5])
            .separation((a, b) => a.parent === b.parent ? 1.2 : 1.5)
            (hierarchy);
    }, [hierarchy]);

    // return null is tree layout is not available to avoid fatal errors.
    if (!treeLayout) {
        return null;
    }

    // get nodes and links (edges) from the tree layout
    const nodes = treeLayout.descendants();
    const links = treeLayout.links();

    // function to creare a path between nodes.
    const createPath = (sourceX, sourceY, targetX, targetY) => {
        return d3.linkHorizontal()({
            source: [sourceX, sourceY],
            target: [targetX, targetY]
        });
    };

    // mouse events for panning - update panning state
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

    // touch event handlers for panning
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
