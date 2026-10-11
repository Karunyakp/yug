import { useState } from 'react';
import {
  Share2,
  Filter,
  ArrowRight,
  Info,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Node {
  id: string;
  name: string;
  initials: string;
  assignment: string;
  cluster: number;
  x: number;
  y: number;
  color: string;
  submissionsCount: number;
}

interface Edge {
  source: string;
  target: string;
  similarity: number;
  type: 'high' | 'moderate' | 'cross_lang';
}

const mockNodes: Node[] = [
  { id: '1', name: 'Aarav Sharma', initials: 'AS', assignment: 'Sorting Visualizer', cluster: 1, x: 220, y: 140, color: '#E02875', submissionsCount: 4 },
  { id: '2', name: 'Rohan Mehta', initials: 'RM', assignment: 'Sorting Visualizer', cluster: 1, x: 380, y: 150, color: '#E02875', submissionsCount: 4 },
  { id: '3', name: 'Vivaan Joshi', initials: 'VJ', assignment: 'Sorting Visualizer', cluster: 1, x: 300, y: 260, color: '#E02875', submissionsCount: 3 },
  { id: '4', name: 'Karan Gupta', initials: 'KG', assignment: 'Graph Algorithms', cluster: 2, x: 620, y: 130, color: '#8A63D2', submissionsCount: 5 },
  { id: '5', name: 'Neha Reddy', initials: 'NR', assignment: 'Graph Algorithms', cluster: 2, x: 740, y: 210, color: '#8A63D2', submissionsCount: 5 },
  { id: '6', name: 'Priya Nair', initials: 'PN', assignment: 'Data Structures', cluster: 3, x: 480, y: 380, color: '#00D2D3', submissionsCount: 6 },
  { id: '7', name: 'Sneha Iyer', initials: 'SI', assignment: 'Data Structures', cluster: 3, x: 640, y: 390, color: '#00D2D3', submissionsCount: 6 },
  { id: '8', name: 'Ananya Rao', initials: 'AR', assignment: 'Sorting Visualizer', cluster: 0, x: 120, y: 320, color: '#10B981', submissionsCount: 4 },
  { id: '9', name: 'Kabir Singh', initials: 'KS', assignment: 'DBMS Lab', cluster: 0, x: 820, y: 340, color: '#10B981', submissionsCount: 2 },
];

const mockEdges: Edge[] = [
  { source: '1', target: '2', similarity: 92, type: 'high' },
  { source: '2', target: '3', similarity: 88, type: 'high' },
  { source: '1', target: '3', similarity: 84, type: 'high' },
  { source: '4', target: '5', similarity: 89, type: 'high' },
  { source: '6', target: '7', similarity: 76, type: 'moderate' },
  { source: '2', target: '4', similarity: 54, type: 'cross_lang' },
];

export default function NetworkGraph() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(mockNodes[0]);
  const [filterAssignment, setFilterAssignment] = useState('All');
  const [minSim, setMinSim] = useState(50);
  const [viewMode, setViewMode] = useState<'graph' | 'table'>('graph');

  const filteredEdges = mockEdges.filter(e => e.similarity >= minSim);

  return (
    <div className="space-y-6 pb-12 text-[#F3F4F6]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E02875]/10 border border-[#E02875]/20 text-[#E02875] text-xs font-semibold uppercase tracking-wider mb-2">
            <Share2 size={13} /> Collusion & Cluster Forensics
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Submission Relationship Graph</h1>
          <p className="text-sm text-[#8E99B7] mt-1 max-w-2xl leading-relaxed">
            Visualizes structural and algorithmic similarity connections across student cohort submissions. Note: Edges represent observed code overlap, not definitive evidence of unauthorized collaboration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-[#15192B] border border-[#1F263E] p-1">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'graph' ? 'bg-[#E02875] text-white shadow-sm' : 'text-[#8E99B7] hover:text-white'}`}
            >
              Interactive Graph
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'table' ? 'bg-[#E02875] text-white shadow-sm' : 'text-[#8E99B7] hover:text-white'}`}
            >
              Accessible Table
            </button>
          </div>
          <Link
            to="/compare"
            className="px-4 py-2 rounded-xl bg-[#1F263E] hover:bg-[#2A3352] text-xs font-medium text-white border border-[#2A3352] flex items-center gap-2 transition-all"
          >
            Open Diff Studio <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="bg-[#101422] border border-[#1F263E] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-[#8E99B7]" />
            <span className="text-xs font-semibold text-[#8E99B7] uppercase tracking-wider">Assignment:</span>
            <select
              value={filterAssignment}
              onChange={e => setFilterAssignment(e.target.value)}
              className="bg-[#15192B] border border-[#1F263E] text-xs rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#E02875]"
            >
              <option value="All">All Assignments</option>
              <option value="Sorting Visualizer">Sorting Visualizer</option>
              <option value="Graph Algorithms">Graph Algorithms</option>
              <option value="Data Structures">Data Structures</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#8E99B7] uppercase tracking-wider">Min Similarity:</span>
            <input
              type="range"
              min="30"
              max="95"
              value={minSim}
              onChange={e => setMinSim(Number(e.target.value))}
              className="accent-[#E02875] cursor-pointer w-28"
            />
            <span className="text-xs font-mono font-bold text-[#E02875] bg-[#E02875]/10 px-2 py-0.5 rounded border border-[#E02875]/20">
              {minSim}%+
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#8E99B7]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E02875]"></span> Cluster A (90%+)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8A63D2]"></span> Cluster B (85%+)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#00D2D3]"></span> Cluster C (75%+)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Unlinked / Clean</span>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'graph' ? (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
          {/* SVG Canvas */}
          <div className="bg-[#101422] border border-[#1F263E] rounded-3xl p-6 relative overflow-hidden min-h-[520px] shadow-2xl flex flex-col justify-between">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-[#8E99B7] bg-[#15192B]/80 backdrop-blur px-3 py-1.5 rounded-xl border border-[#1F263E]">
              <Info size={14} className="text-[#00D2D3]" />
              Click any node to inspect relationship details
            </div>

            <svg className="w-full h-[460px] select-none">
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E02875" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8A63D2" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Render Connections */}
              {filteredEdges.map((edge, idx) => {
                const s = mockNodes.find(n => n.id === edge.source);
                const t = mockNodes.find(n => n.id === edge.target);
                if (!s || !t) return null;
                const isSelected = selectedNode && (selectedNode.id === s.id || selectedNode.id === t.id);

                return (
                  <g key={idx}>
                    <line
                      x1={s.x}
                      y1={s.y}
                      x2={t.x}
                      y2={t.y}
                      stroke={edge.type === 'high' ? '#E02875' : edge.type === 'cross_lang' ? '#8A63D2' : '#00D2D3'}
                      strokeWidth={isSelected ? 3.5 : 2}
                      strokeOpacity={isSelected ? 0.9 : 0.45}
                      strokeDasharray={edge.type === 'cross_lang' ? '4 4' : undefined}
                    />
                    <rect
                      x={(s.x + t.x) / 2 - 16}
                      y={(s.y + t.y) / 2 - 10}
                      width={32}
                      height={20}
                      rx={6}
                      fill="#15192B"
                      stroke="#232A44"
                      strokeWidth={1}
                    />
                    <text
                      x={(s.x + t.x) / 2}
                      y={(s.y + t.y) / 2 + 4}
                      fill={edge.similarity >= 85 ? '#E02875' : '#00D2D3'}
                      fontSize={10}
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {edge.similarity}%
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {mockNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform"
                    transform={`translate(${node.x}, ${node.y})`}
                  >
                    {isSelected && (
                      <circle
                        r={28}
                        fill="none"
                        stroke={node.color}
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                    )}
                    <circle
                      r={20}
                      fill="#15192B"
                      stroke={node.color}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#FFFFFF"
                      fontSize={11}
                      fontWeight="600"
                    >
                      {node.initials}
                    </text>
                    <text
                      textAnchor="middle"
                      dy="36"
                      fill="#DCE1EE"
                      fontSize={12}
                      fontWeight="500"
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="flex items-center justify-between text-xs text-[#8E99B7] pt-3 border-t border-[#1F263E]">
              <span>Active submissions analyzed: <strong>{mockNodes.length}</strong></span>
              <span>Observed high-risk clusters: <strong>3 isolated groups</strong></span>
            </div>
          </div>

          {/* Node Inspector Sidebar */}
          <div className="bg-[#101422] border border-[#1F263E] rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
            {selectedNode ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#1F263E]">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg"
                    style={{ backgroundColor: selectedNode.color }}
                  >
                    {selectedNode.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedNode.name}</h3>
                    <p className="text-xs text-[#8E99B7] mt-0.5">{selectedNode.assignment}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#8E99B7] uppercase tracking-wider">Connected Matches</h4>
                  <div className="space-y-2">
                    {mockEdges
                      .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                      .map((edge, i) => {
                        const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                        const otherNode = mockNodes.find(n => n.id === otherId);
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-xl bg-[#15192B] border border-[#1F263E]"
                          >
                            <div>
                              <p className="text-xs font-semibold text-white">{otherNode?.name}</p>
                              <p className="text-[10px] text-[#8E99B7]">
                                {edge.type === 'cross_lang' ? 'Cross-language' : 'Identical AST Logic'}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                edge.similarity >= 85
                                  ? 'bg-[#E02875]/20 text-[#E02875] border border-[#E02875]/30'
                                  : 'bg-[#00D2D3]/20 text-[#00D2D3] border border-[#00D2D3]/30'
                              }`}
                            >
                              {edge.similarity}%
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#15192B] border border-[#1F263E] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8E99B7] uppercase tracking-wider">
                    <Sparkles size={14} className="text-[#E02875]" /> Reviewer Advisory
                  </div>
                  <p className="text-xs text-[#DCE1EE] leading-relaxed">
                    This submission belongs to <strong>Cluster {selectedNode.cluster || 'A'}</strong>. The shared logic involves inner sorting loops and state mutations. Conduct viva examination on loop invariants before finalizing disciplinary action.
                  </p>
                </div>

                <Link
                  to="/compare"
                  className="w-full py-2.5 rounded-xl bg-[#E02875] hover:bg-[#C2185B] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E02875]/20"
                >
                  Open Side-by-Side Review <ExternalLink size={14} />
                </Link>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-sm text-[#8E99B7]">
                Select a student node on the canvas to inspect observed relationships.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Accessible Table View */
        <div className="bg-[#101422] border border-[#1F263E] rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1F263E] bg-[#15192B]/50 text-[#8E99B7] text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Submission A</th>
                  <th className="px-6 py-4">Submission B</th>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4 text-center">Similarity Score</th>
                  <th className="px-6 py-4">Observed Pattern</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F263E]">
                {filteredEdges.map((edge, idx) => {
                  const s = mockNodes.find(n => n.id === edge.source);
                  const t = mockNodes.find(n => n.id === edge.target);
                  return (
                    <tr key={idx} className="hover:bg-[#15192B]/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{s?.name}</td>
                      <td className="px-6 py-4 font-semibold text-white">{t?.name}</td>
                      <td className="px-6 py-4 text-[#8E99B7]">{s?.assignment}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-[#E02875]/10 text-[#E02875] border border-[#E02875]/20">
                          {edge.similarity}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#DCE1EE]">
                        {edge.type === 'cross_lang' ? 'Cross-language AST graph isomorphism' : 'Canonical control-flow match with identifier mutation'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/compare" className="text-xs font-semibold text-[#E02875] hover:underline">
                          Review Diff →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
