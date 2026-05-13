'use client';

import React, { useMemo, useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Database, Mail, Webhook, Bot, Activity, ChevronDown, MessageSquare, Check } from 'lucide-react';

// --- Custom Node Components ---

const TriggerNode = ({ data }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
    className="relative group"
  >
    <div className="flex items-center px-5 py-4 bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-border-strong)] rounded-2xl min-w-[240px] shadow-2xl transition-all duration-300 group-hover:border-[var(--color-logo-blue)]/50 group-hover:shadow-[0_0_30px_rgba(0,195,255,0.1)]">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-logo-blue)]/10 flex items-center justify-center mr-4 border border-[var(--color-logo-blue)]/20 text-[var(--color-logo-blue)] group-hover:bg-[var(--color-logo-blue)]/20 transition-colors">
        {data.icon === 'webhook' ? <Webhook size={24} /> : data.icon === 'msg' ? <MessageSquare size={24} /> : <Mail size={24} />}
      </div>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-tighter text-[var(--color-text-muted)] mb-0.5">{data.title}</div>
        <div className="font-display font-bold text-[15px] text-[var(--color-text-primary)]">{data.label}</div>
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-2.5 !h-2.5 !bg-[var(--color-logo-blue)] !border-none !-right-1.25 animate-[glow-pulse_2s_infinite]" 
        style={{ '--glow-color': 'rgba(0,195,255,0.8)' } as any}
      />
    </div>
  </motion.div>
);

const ActionNode = ({ data }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    transition={{ delay: 0.2, duration: 0.4 }}
    className="relative group"
  >
    <div className="flex items-center px-5 py-4 bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-border-strong)] rounded-2xl min-w-[240px] shadow-lg transition-all duration-300 group-hover:border-[var(--color-text-primary)]/20">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 border text-[var(--color-void)] transition-transform duration-300 group-hover:scale-110 ${data.colorClass}`}>
        <Activity size={24} />
      </div>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-tighter text-[var(--color-text-muted)] mb-0.5">{data.title}</div>
        <div className="font-display font-bold text-[15px] text-[var(--color-text-primary)]">{data.label}</div>
      </div>
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!w-2.5 !h-2.5 !bg-[var(--color-logo-blue)] !border-none !-left-1.25 animate-[glow-pulse_2.5s_infinite]" 
        style={{ '--glow-color': 'rgba(0,195,255,0.4)' } as any}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-2.5 !h-2.5 !bg-[var(--color-logo-blue)] !border-none !-right-1.25 animate-[glow-pulse_2.5s_infinite]" 
        style={{ '--glow-color': 'rgba(0,195,255,0.4)' } as any}
      />
    </div>
  </motion.div>
);

const OutputNode = ({ data }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
    className="relative group"
  >
    <div className="flex items-center px-5 py-4 bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-live)]/20 rounded-2xl min-w-[240px] shadow-2xl transition-all duration-300 group-hover:border-[var(--color-live)]/50 group-hover:shadow-[0_0_30px_rgba(0,229,160,0.1)]">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-live)]/10 flex items-center justify-center mr-4 border border-[var(--color-live)]/20 text-[var(--color-live)] group-hover:bg-[var(--color-live)]/20 transition-colors">
        {data.icon === 'db' ? <Database size={24} /> : <Zap size={24} />}
      </div>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-tighter text-[var(--color-text-muted)] mb-0.5">{data.title}</div>
        <div className="font-display font-bold text-[15px] text-[var(--color-text-primary)]">{data.label}</div>
      </div>
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!w-2.5 !h-2.5 !bg-[var(--color-live)] !border-none !-left-1.25 animate-[glow-pulse_2s_infinite]" 
        style={{ '--glow-color': 'rgba(0,229,160,0.8)' } as any}
      />
    </div>
  </motion.div>
);

// --- Graph Config ---

const edgeStyleLead = { stroke: 'var(--color-logo-blue)', strokeWidth: 2, filter: 'drop-shadow(0 0 6px rgba(0,195,255,0.6))' };
const edgeStyleLive = { stroke: 'var(--color-live)', strokeWidth: 2, filter: 'drop-shadow(0 0 6px rgba(0,229,160,0.6))' };

const PREVIEWS = {
  lead: {
    nodes: [
      { id: '1', type: 'trigger', position: { x: 0, y: 110 }, data: { label: 'New Lead', title: 'Webhook', icon: 'webhook' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '2', type: 'action', position: { x: 340, y: 30 }, data: { label: 'Enrich Data', title: 'AI Agent', colorClass: 'bg-blue-400 border-blue-400' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '3', type: 'action', position: { x: 340, y: 190 }, data: { label: 'Score Lead', title: 'Logic', colorClass: 'bg-purple-500 border-purple-500' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '4', type: 'action', position: { x: 680, y: 30 }, data: { label: 'Alert Sales', title: 'Slack', colorClass: 'bg-yellow-500 border-yellow-500' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '5', type: 'output', position: { x: 680, y: 190 }, data: { label: 'Add to CRM', title: 'Database', icon: 'db' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'default', animated: true, style: edgeStyleLead },
      { id: 'e1-3', source: '1', target: '3', type: 'default', animated: true, style: edgeStyleLead },
      { id: 'e2-4', source: '2', target: '4', type: 'default', animated: true, style: edgeStyleLead },
      { id: 'e3-5', source: '3', target: '5', type: 'default', animated: true, style: edgeStyleLive, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-live)' } },
      { id: 'e2-5', source: '2', target: '5', type: 'default', animated: true, style: edgeStyleLive, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-live)' } },
    ]
  },
  whatsapp: {
    nodes: [
      { id: '1', type: 'trigger', position: { x: 0, y: 110 }, data: { label: 'Incoming Msg', title: 'WhatsApp', icon: 'msg' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '2', type: 'action', position: { x: 340, y: 110 }, data: { label: 'Analyze Intent', title: 'AI Brain', colorClass: 'bg-purple-500 border-purple-500' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '3', type: 'output', position: { x: 680, y: 30 }, data: { label: 'Auto-Reply', title: 'Action', icon: 'zap' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '4', type: 'action', position: { x: 680, y: 190 }, data: { label: 'Route Human', title: 'Logic', colorClass: 'bg-[#FF5C40] border-[#FF5C40]' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'default', animated: true, style: edgeStyleLead },
      { id: 'e2-3', source: '2', target: '3', type: 'default', animated: true, style: edgeStyleLive, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-live)' } },
      { id: 'e2-4', source: '2', target: '4', type: 'default', animated: true, style: edgeStyleLead },
    ]
  },
  sync: {
    nodes: [
      { id: '1', type: 'trigger', position: { x: 0, y: 110 }, data: { label: 'Schedule', title: 'Timer', icon: 'webhook' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '2', type: 'action', position: { x: 340, y: 110 }, data: { label: 'Fetch API', title: 'Request', colorClass: 'bg-blue-400 border-blue-400' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '3', type: 'action', position: { x: 680, y: 30 }, data: { label: 'Transform', title: 'Formatter', colorClass: 'bg-yellow-500 border-yellow-500' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
      { id: '4', type: 'output', position: { x: 680, y: 190 }, data: { label: 'Update DB', title: 'Database', icon: 'db' }, className: '!bg-transparent !border-none !p-0 !shadow-none !w-auto' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'default', animated: true, style: edgeStyleLead },
      { id: 'e2-3', source: '2', target: '3', type: 'default', animated: true, style: edgeStyleLead },
      { id: 'e2-4', source: '2', target: '4', type: 'default', animated: true, style: edgeStyleLive, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--color-live)' } },
    ]
  }
};

export const AutomationsWorkflowGraph = () => {
  const [activePreview, setActivePreview] = useState<keyof typeof PREVIEWS>('lead');
  const [isOpen, setIsOpen] = useState(false);

  const nodeTypes = useMemo(() => ({
    trigger: TriggerNode,
    action: ActionNode,
    output: OutputNode
  }), []);

  const flowOptions = [
    { value: 'lead', label: 'Lead Gen Flow' },
    { value: 'whatsapp', label: 'WhatsApp Reply' },
    { value: 'sync', label: 'Data Sync' }
  ];

  return (
    <div className="w-full h-[400px] bg-[var(--color-surface-1)] rounded-xl border border-[var(--color-border)] relative overflow-hidden">

      {/* Live Workflow Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface-2)]/80 backdrop-blur-sm rounded-[var(--radius-sm)] border border-[var(--color-border)]">
        <div className="w-2 h-2 rounded-full bg-[var(--color-live)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] hidden sm:block">Live Workflow Processing</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] sm:hidden">Live</span>
      </div>

      {/* Custom Dropdown in Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-[170px] bg-[var(--color-surface-2)]/80 backdrop-blur-md border border-[var(--color-border-strong)] text-[var(--color-text-primary)] text-[11px] font-mono tracking-wider uppercase px-4 py-1.5 rounded-[var(--radius-sm)] outline-none cursor-pointer shadow-lg hover:bg-[var(--color-surface-3)] transition-all duration-300 group h-[33px]"
          >
            <span>{flowOptions.find(o => o.value === activePreview)?.label}</span>
            <ChevronDown className={`ml-2 text-[var(--color-logo-blue)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={14} />
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.98 }}
                className="absolute right-0 mt-2 w-full bg-[var(--color-surface-3)]/95 backdrop-blur-lg border border-[var(--color-border-strong)] rounded-[var(--radius-sm)] shadow-2xl overflow-hidden z-30"
              >
                {flowOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setActivePreview(opt.value as any);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 text-left text-[11px] font-mono tracking-wider uppercase transition-colors ${
                      activePreview === opt.value 
                      ? 'bg-[var(--color-logo-blue)]/20 text-[var(--color-logo-blue)]' 
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {opt.label}
                    {activePreview === opt.value && <Check size={14} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ReactFlow
        key={activePreview}
        nodes={PREVIEWS[activePreview].nodes as Node[]}
        edges={PREVIEWS[activePreview].edges as Edge[]}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.1}
        maxZoom={1.5}
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
        <Background color="var(--color-border-strong)" gap={28} size={1} />
      </ReactFlow>
    </div>
  );
};

// though we usually do named imports. Let's do default export to be safe for next/dynamic.
export default AutomationsWorkflowGraph;
