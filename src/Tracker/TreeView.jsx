import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import Goal from './Goal';

function buildNestedArray(data) {
    const itemsById = {};
    const root = { name: "Root", children: [] };

    data.forEach(item => itemsById[item.index] = { ...item, children: [] });

    data.forEach(item => {
        if (item.parentGoal == item.index) {
            root.children.push(itemsById[item.index]);
        } else if (itemsById[item.parentGoal]) {
            itemsById[item.parentGoal].children.push(itemsById[item.index]);
        }
    });

    return root;
}

function TreeView({ goals, setGoals, setHighlightGoalIndex, highlightGoalIndex }) {
    const [treeData, setTreeData] = useState(null);

    useEffect(() => {
        if (goals && goals.length > 0) {
            const tree = buildNestedArray(goals);
            setTreeData(tree);
        }
    }, [goals]);

    const width = 1200;
    const height = 900;
    const nodeWidth = 250;
    const nodeHeight = 150;

    const hierarchy = useMemo(() => {
        return treeData ? d3.hierarchy(treeData) : null;
    }, [treeData]);

    const treeLayout = useMemo(() => {
        if (!hierarchy) return null;
        return d3.tree()
            .nodeSize([nodeHeight * 1.5, nodeWidth * 1.5])
            .separation((a, b) => a.parent === b.parent ? 1.2 : 1.5)
            (hierarchy);
    }, [hierarchy, nodeWidth, nodeHeight]);

    if (!treeLayout) {
        return null;
    }

    const nodes = treeLayout.descendants();
    const links = treeLayout.links();

    // Calculate the bounds of the tree
    const xMin = d3.min(nodes, d => d.x);
    const xMax = d3.max(nodes, d => d.x);
    const yMin = d3.min(nodes, d => d.y);
    const yMax = d3.max(nodes, d => d.y);

    // Calculate the translation to center the tree
    const tx = -yMin + nodeWidth / 2;
    const ty = -xMin + nodeHeight / 2;

    // Function to create a curved path with rounded corners
    const createPath = (sourceX, sourceY, targetX, targetY) => {
        const midX = (sourceX + targetX) / 2;
        const radius = 16; // 16 pixel radius for rounded corners

        return d3.linkHorizontal()({
            source: [sourceX, sourceY],
            target: [targetX, targetY]
        });
    };

    return (
        <div className="overflow-auto" style={{ width: '100%', height: '100vh' }}>
            <svg width={yMax - yMin + nodeWidth * 2} height={xMax - xMin + nodeHeight * 2}>
                <g transform={`translate(${tx}, ${ty})`}>
                    {links.map((link, i) => {
                        const path = createPath(link.source.y, link.source.x, link.target.y, link.target.x);

                        return (
                            <path
                                key={`link-${i}`}
                                d={path}
                                fill="none"
                                className="stroke-primary"
                                strokeWidth="1.5"
                            />
                        );
                    })}
                    {nodes.map((node, i) => (
                        <foreignObject
                            key={`node-${i}`}
                            x={node.y - nodeWidth / 2}
                            y={node.x - nodeHeight / 2}
                            width={nodeWidth}
                            height={nodeHeight}
                        >
                            <div className="w-full h-full flex justify-center items-center">
                                <Goal
                                    bigCard={false}
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

