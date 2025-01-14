import React, { useState, useEffect } from 'react';
import Goal from './Goal';
import { Tree } from 'react-tree-graph';

import 'react-tree-graph/dist/style.css';

function buildNestedArray(data) {
    // build a nested array from the linked array structure.
    const itemsById = {};
    const root = [];

    // First map all items by index for quick access
    data.forEach(item => itemsById[item.index] = { ...item, children: [] });

    // Now build the tree by linking children to their parents
    data.forEach(item => {
        if (item.parentGoal == item.index) {
            root.push(itemsById[item.index]);
        } else if (itemsById[item.parentGoal]) {
            itemsById[item.parentGoal].children.push(itemsById[item.index]);
        }
    });

    return root;
}


function TreeView({ goals, setGoals, setHighlightGoalIndex, highlightGoalIndex }) {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        if (goals && goals.length > 0) {
            const tree = buildNestedArray(goals);
            console.log(tree);
            setTreeData(tree);
        }
    }, [goals]);

    if (!treeData || treeData.length === 0) {
        return null; // or return some fallback UI
    }

    const renderGoals = (nodes, level = 0) => {
        console.log('node with index 0, children are:', nodes[0].children)
        return nodes.map((node) => (
            <React.Fragment key={node.index}>
                <div style={{ gridRow: level + 1, gridColumnStart: node.children.length, marginBottom: '10px', display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                    <Goal
                        bigCard={true}
                        goalIndex={node.index}
                        goals={goals}
                        setGoals={setGoals}
                        setHighlightGoalIndex={setHighlightGoalIndex}
                        highlightGoalIndex={highlightGoalIndex}
                    />
                </div>
                {node.children && node.children.length > 0 && renderGoals(node.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className='grid gap-10'>
            {renderGoals(treeData)}
    
        </div>
    );
}

export default TreeView;


// for rendering:
// check number of levels in the tree.
// make grid with 1 column and rows = to numLevels
// map the 