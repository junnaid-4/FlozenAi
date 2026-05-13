'use client';

import React, { useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  Edge, 
  Node,
  Handle,
  Position,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { Zap, Database, Mail, Webhook, Bot, Activity } from 'lucide-react';

// --- Custom Node Components ---

const TriggerNode = ({ data }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="relative group"
  >
    <div className="flex items-center px-4 py-3 bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-border-strong)] rounded-xl min-w-[210px] shadow-2xl">
      <div className="w-[42px] h-[42px] rounded-lg bg-[var(--color-logo-blue)]/10 flex items-center justify-center mr-3 border border-[var(--color-logo-blue)]/20 text-[var(--color-logo-blue)]">
        {data.icon === 'webhook' ? <Webhook size={21} /> : <Mail size={21} />}
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-tighter text-[var(--color-text-muted)] mb-0.5">{data.title}</div>
        <div className="font-display font-bold text-sm text-[var(--color-text-primary)]">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[var(--color-logo-blue)] !border-none !-right-1.5 z-10 animate-glow" style={{ '--glow-color': 'var(--color-logo-blue)' } as React.CSSProperties} />
    </div>
  </motion.div>
);

const ActionNode = ({ data }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.4 }}
    className="relative"
  >
    <div className="flex items-center px-4 py-3 bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-border-strong)] rounded-xl min-w-[190px] shadow-lg">
      <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center mr-3 border text-[var(--color-void)] ${data.colorClass}`}>
        <Activity size={21} />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-tighter text-[var(--color-text-muted)] mb-0.5">{data.title}</div>
        <div className="font-display font-bold text-sm text-[var(--color-text-primary)]">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[var(--color-logo-blue)] !border-none !-left-1.5 z-10 animate-glow" style={{ '--glow-color': 'var(--color-logo-blue)' } as React.CSSProperties} />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[var(--color-logo-blue)] !border-none !-right-1.5 z-10 animate-glow" style={{ '--glow-color': 'var(--color-logo-blue)' } as React.CSSProperties} />
    </div>
  </motion.div>
);

const OutputNode = ({ data }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="relative"
  >
    <div className="flex items-center px-4 py-3 bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-live)]/30 rounded-xl min-w-[210px] shadow-2xl">
      <div className="w-[42px] h-[42px] rounded-lg bg-[var(--color-live)]/10 flex items-center justify-center mr-3 border border-[var(--color-live)]/20 text-[var(--color-live)]">
        {data.icon === 'db' ? <Database size={21} /> : <Zap size={21} />}
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-tighter text-[var(--color-text-muted)] mb-0.5">{data.title}</div>
        <div className="font-display font-bold text-sm text-[var(--color-text-primary)]">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[var(--color-live)] !border-none !-left-1.5 z-10 animate-glow" style={{ '--glow-color': 'var(--color-live)' } as React.CSSProperties} />
    </div>
  </motion.div>
);

// --- Graph Config ---

const initialNodes: Node[] = [
  { id: '1', type: 'trigger', position: { x: 0, y: 160 }, data: { label: 'New Lead', title: 'Webhook', icon: 'webhook' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
  
  { id: '2', type: 'action', position: { x: 280, y: 0 }, data: { label: 'Parse Data', title: 'Formatter', colorClass: 'bg-blue-400 border-blue-400' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
  { id: '3', type: 'action', position: { x: 280, y: 160 }, data: { label: 'Analyze Intent', title: 'AI Agent', colorClass: 'bg-purple-500 border-purple-500' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
  { id: '4', type: 'action', position: { x: 280, y: 320 }, data: { label: 'Filter Spam', title: 'Logic', colorClass: 'bg-yellow-500 border-yellow-500' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
  
  { id: '5', type: 'action', position: { x: 560, y: 80 }, data: { label: 'Assign Rep', title: 'Logic', colorClass: 'bg-[#FF5C40] border-[#FF5C40]' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
  { id: '6', type: 'output', position: { x: 560, y: 240 }, data: { label: 'Update CRM', title: 'Database', icon: 'db' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-logo-blue)', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-logo-blue)', strokeWidth: 2 } },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-logo-blue)', strokeWidth: 2 } },
  
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-logo-blue)', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-logo-blue)', strokeWidth: 2 } },
  
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-live)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-live)' } },
  { id: 'e4-6', source: '4', target: '6', type: 'smoothstep', animated: true, style: { stroke: 'var(--color-live)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-live)' } },
];

export const WorkflowGraph = () => {
  const nodeTypes = useMemo(() => ({ 
    trigger: TriggerNode, 
    action: ActionNode, 
    output: OutputNode 
  }), []);

  return (
    <div className="w-full h-[400px] bg-[var(--color-surface-1)] rounded-xl border border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface-2)] rounded-[var(--radius-sm)] border border-[var(--color-border)]">
        <div className="w-2 h-2 rounded-full bg-[var(--color-live)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">Live Workflow Processing</span>
      </div>
      
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        className="[&_.react-flow__pane]:cursor-default"
      >
        <Background color="var(--color-border-strong)" gap={24} size={1} />
      </ReactFlow>
    </div>
  );
};

// We will default export it so next/dynamic can use it easily without named imports depending on setup, 
// though we usually do named imports. Let's do default export to be safe for next/dynamic.
export default WorkflowGraph;
