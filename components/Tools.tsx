
import React, { useState, useRef, useEffect } from 'react';
import { TOOLS, CURRENCY_RATES } from '../constants';
import { Tool } from '../types';
import { 
  generateFastContent, generateThinkingContent, 
  generateProImage, editAIImage, analyzeImageContent, generateVeoVideo,
  createChatSession
} from '../services/geminiService';

// Import standard icons
import { 
  ArrowLeft, Search, MessageSquare, PenTool, FileText, 
  Code2, Maximize, Minimize, Palette, Download, QrCode, Calendar, Calculator, 
  Activity, Percent, DollarSign, Home, Lock, Type, RefreshCw, Braces, 
  Speaker, Mic, Sparkles, Loader2, Upload, Copy, ScanText, Layers, Music, Files, Trash2,
  ChevronDown, ArrowRightLeft, History, Zap, RotateCcw, Video, Film, Mic2, BrainCircuit, Globe, MapPin, Edit, ScanEye, FileAudio, CheckCircle, ImagePlus, Wand2, Send
} from 'lucide-react';

// Strictly separate conflicting imports to avoid shadowing global objects (Image, Map, File)
import {
  Image as ImageIcon,
  Map as MapIcon,
  File as FileIcon
} from 'lucide-react';

// --- Icon Mapper ---
const IconMap: Record<string, React.FC<any>> = {
  MessageSquare, ImageIcon, ScanText, PenTool, FileText, Code2, 
  Maximize, Minimize, Palette, QrCode, Download, 
  Calendar, Calculator, Activity, Percent, DollarSign, Map: MapIcon, Home,
  Lock, Type, RefreshCw, Braces, Speaker, Mic, Layers, Music, File: FileIcon, Files,
  Video, Film, Mic2, BrainCircuit, Globe, MapPin, Edit, ScanEye, FileAudio, Zap, ImagePlus, Wand2
};

interface ToolsProps {
  onBack?: () => void;
}

const ToolHeader: React.FC<{ tool: Tool }> = ({ tool }) => (
  <div className="mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
    <h3 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-2">
      <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
        {React.createElement(IconMap[tool.icon] || Sparkles, { size: 28 })}
      </div>
      {tool.name}
    </h3>
    <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
  </div>
);

// --- AI Chat Tool (Pro 3 Conversational) ---
const AIChatTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatSession = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        chatSession.current = await createChatSession();
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession.current) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await chatSession.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: " + (e as Error).message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200 dark:border-white/5 flex flex-col h-[700px]">
       <ToolHeader tool={tool} />
       <div className="flex-grow overflow-y-auto mb-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-4">
          {messages.length === 0 && (
             <div className="text-center text-slate-400 mt-20">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50"/>
                <p>Start a conversation with Gemini Pro...</p>
             </div>
          )}
          {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                   msg.role === 'user' 
                   ? 'bg-secondary text-white rounded-tr-none' 
                   : 'bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm border border-slate-200 dark:border-white/5'
                }`}>
                   <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.text}</p>
                </div>
             </div>
          ))}
          {loading && (
             <div className="flex justify-start">
                <div className="bg-white dark:bg-white/10 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5">
                   <Loader2 className="animate-spin text-secondary" size={20} />
                </div>
             </div>
          )}
          <div ref={bottomRef} />
       </div>
       <div className="relative">
          <input
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => { if(e.key === 'Enter') handleSend(); }}
             placeholder="Type your message..."
             className="w-full p-4 pr-16 rounded-xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-secondary outline-none transition-all"
             disabled={loading}
          />
          <button 
             onClick={handleSend} 
             disabled={loading || !input.trim()}
             className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-secondary text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
             <Send size={18} />
          </button>
       </div>
    </div>
  );
};

// --- AI Text Tool (Fast & Thinking) ---
const AITextTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = tool.featureId === 'fast' 
        ? await generateFastContent(input)
        : await generateThinkingContent(input);
      setResponse(result || "No response generated.");
    } catch (e) {
      setResponse("Error: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200 dark:border-white/5">
      <ToolHeader tool={tool} />
      <div className="flex flex-col h-[600px]">
         <div className="flex-grow overflow-y-auto mb-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
           {!response && !loading && <div className="text-center text-slate-400 mt-20">Ask anything...</div>}
           {loading && (
             <div className="flex items-center gap-3 text-secondary animate-pulse">
               <BrainCircuit className="animate-spin" />
               {tool.featureId === 'think' ? 'Thinking deeply...' : 'Generating fast response...'}
             </div>
           )}
           {response && (
             <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
               {response}
             </div>
           )}
         </div>
         <div className="relative">
           <textarea
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
             placeholder={tool.featureId === 'think' ? "Ask a complex question (e.g. Math, Coding)..." : "Ask a quick question..."}
             className="w-full p-4 pr-16 rounded-xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 resize-none focus:ring-2 focus:ring-secondary outline-none transition-all"
             rows={3}
           />
           <button 
             onClick={handleSend} 
             disabled={loading || !input.trim()}
             className="absolute right-3 bottom-3 p-2 bg-secondary text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
           >
             {loading ? <Loader2 className="animate-spin" size={20}/> : <Send size={20} />}
           </button>
         </div>
      </div>
    </div>
  );
};

// --- AI Image Generation Tool ---
const AIImageGenTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGen = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await generateProImage(prompt, size);
      setImage(res);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
      <ToolHeader tool={tool} />
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full p-4 rounded-xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10"
          rows={3}
        />
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm">Size:</span>
          {['1K', '2K', '4K'].map(s => (
             <button 
               key={s} 
               onClick={() => setSize(s as any)}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${size === s ? 'bg-secondary text-white' : 'bg-slate-100 dark:bg-white/10'}`}
             >
               {s}
             </button>
          ))}
          <button 
            onClick={handleGen} 
            disabled={loading || !prompt}
            className="ml-auto px-8 py-3 bg-secondary text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-secondary/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} Generate
          </button>
        </div>
      </div>
      
      <div className="mt-8 min-h-[300px] flex items-center justify-center bg-slate-100 dark:bg-black/40 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
         {loading && <div className="text-center"><Loader2 className="animate-spin mx-auto mb-2 text-secondary" size={32}/><p>Creating masterpiece...</p></div>}
         {!loading && !image && <div className="text-slate-400">Image will appear here</div>}
         {image && (
           <div className="relative group w-full">
             <img src={image} alt="Generated" className="w-full rounded-xl shadow-lg" />
             <a href={image} download="generated-ai.png" className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
               <Download size={16} /> Save
             </a>
           </div>
         )}
      </div>
    </div>
  );
};

// --- AI Image Editor Tool ---
const AIImageEditTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
      setResult(null);
    }
  };

  const handleEdit = async () => {
    if(!preview || !prompt) return;
    setLoading(true);
    try {
      const res = await editAIImage(preview, prompt);
      setResult(res);
    } catch(e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
      <ToolHeader tool={tool} />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
           <div className="relative group h-64 bg-slate-100 dark:bg-black/20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
             {!preview && (
               <>
                <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10"/>
                <div className="text-center">
                  <Upload className="mx-auto mb-2 text-slate-400"/>
                  <p className="text-sm font-bold">Upload Source Image</p>
                </div>
               </>
             )}
             {preview && <img src={preview} className="w-full h-full object-contain" />}
             {preview && <button onClick={() => {setPreview(null); setResult(null);}} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full z-20"><Trash2 size={14}/></button>}
           </div>
           <textarea 
             value={prompt} 
             onChange={e => setPrompt(e.target.value)} 
             placeholder="E.g. Add a retro filter, Remove person in background..."
             className="w-full p-3 rounded-xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 h-32"
           />
           <button onClick={handleEdit} disabled={loading || !preview || !prompt} className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50">
             {loading ? 'Editing...' : 'Apply Magic Edit'}
           </button>
        </div>
        <div className="h-full min-h-[300px] bg-slate-100 dark:bg-black/20 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10">
           {loading && <Loader2 className="animate-spin text-secondary" size={40}/>}
           {!loading && !result && <p className="text-slate-400">Edited image will appear here</p>}
           {result && (
             <div className="relative group w-full h-full">
               <img src={result} className="w-full h-full object-contain rounded-2xl" />
               <a href={result} download="edited.png" className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                 <Download size={16} /> Save
               </a>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- AI Analyzer Tool ---
const AIAnalyzeTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
      setAnalysis('');
    }
  };

  const handleAnalyze = async () => {
    if(!preview) return;
    setLoading(true);
    try {
      const res = await analyzeImageContent(preview, prompt);
      setAnalysis(res || "No analysis returned.");
    } catch(e) {
      setAnalysis("Error: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
      <ToolHeader tool={tool} />
      <div className="grid md:grid-cols-2 gap-8">
         <div className="space-y-4">
           <div className="relative h-64 bg-slate-100 dark:bg-black/20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden">
             {!preview ? (
                <>
                  <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10"/>
                  <div className="text-center text-slate-400">
                    <ScanEye size={40} className="mx-auto mb-2"/>
                    <p>Upload Image to Analyze</p>
                  </div>
                </>
             ) : (
               <img src={preview} className="w-full h-full object-contain" />
             )}
             {preview && <button onClick={() => {setPreview(null); setAnalysis('');}} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full z-20"><Trash2 size={14}/></button>}
           </div>
           <input 
             value={prompt}
             onChange={e => setPrompt(e.target.value)}
             placeholder="Optional: Ask specific question about the image..."
             className="w-full p-3 rounded-xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10"
           />
           <button onClick={handleAnalyze} disabled={!preview || loading} className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50">
             {loading ? 'Analyzing...' : 'Analyze Image'}
           </button>
         </div>
         <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/5 overflow-y-auto max-h-[500px]">
            {!analysis && !loading && <p className="text-slate-400 text-center mt-20">Analysis results will appear here.</p>}
            {loading && <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-secondary" size={40}/></div>}
            {analysis && <div className="prose dark:prose-invert">{analysis}</div>}
         </div>
      </div>
    </div>
  );
};

// --- AI Video Tool (Veo) ---
const AIVideoTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
      setVideoUrl(null);
    }
  };

  const handleGenerate = async () => {
    if(!preview) return;
    setLoading(true);
    try {
      const res = await generateVeoVideo(preview);
      setVideoUrl(res);
    } catch(e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
       <ToolHeader tool={tool} />
       <div className="space-y-6">
          <div className="relative h-64 bg-slate-100 dark:bg-black/20 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden group">
             {!preview ? (
                <>
                  <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10"/>
                  <div className="text-center text-slate-400">
                    <Film size={40} className="mx-auto mb-2"/>
                    <p>Upload Image to Animate</p>
                  </div>
                </>
             ) : (
               <img src={preview} className="w-full h-full object-contain" />
             )}
             {preview && <button onClick={() => {setPreview(null); setVideoUrl(null);}} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full z-20"><Trash2 size={14}/></button>}
          </div>
          
          {!videoUrl && (
            <button onClick={handleGenerate} disabled={!preview || loading} className="w-full py-4 bg-secondary text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
               {loading ? <Loader2 className="animate-spin"/> : <Video size={20} />}
               {loading ? 'Generating Video (this may take a minute)...' : 'Generate Video with Veo'}
            </button>
          )}

          {videoUrl && (
            <div className="mt-6 animate-in fade-in">
               <h4 className="font-bold mb-2 flex items-center gap-2"><CheckCircle className="text-green-500" size={20}/> Video Generated!</h4>
               <video src={videoUrl} controls autoPlay loop className="w-full rounded-xl shadow-lg mb-4" />
               <a href={videoUrl} download="veo-video.mp4" className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                 <Download size={18}/> Download Video
               </a>
            </div>
          )}
       </div>
    </div>
  );
};


// --- Image Tools (Resizer, Compressor, Color, QR, YT) ---
const ImageTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [params, setParams] = useState({ w: 0, h: 0, q: 0.8, text: '' });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProcessedUrl(null);
      
      const img = new window.Image(); // Explicitly use window.Image
      img.onload = () => {
        setParams(prev => ({ ...prev, w: img.width, h: img.height }));
        if (tool.featureId === 'color' && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if(ctx) {
             canvasRef.current.width = img.width;
             canvasRef.current.height = img.height;
             ctx.drawImage(img, 0, 0);
          }
        }
      };
      img.src = url;
    }
  };

  const processImage = () => {
    if (tool.featureId === 'qr') {
      if (params.text) setProcessedUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(params.text)}`);
      return;
    }
    if (tool.featureId === 'yt-thumb') {
      const id = params.text.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (id) setProcessedUrl(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
      else alert("Invalid URL");
      return;
    }
    if (tool.featureId === 'yt-mp3') {
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(params.text)}+mp3`, '_blank');
        return;
    }
    if (tool.featureId === 'bg-remove') {
        alert("For strict privacy and demo purposes, this feature simulates background removal. In a production environment, this would connect to a dedicated API or use a heavy WASM library.");
        if(previewUrl) setProcessedUrl(previewUrl);
        return;
    }

    // Canvas operations
    if (!previewUrl) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image(); // Explicitly use window.Image
    img.onload = () => {
      if (tool.featureId === 'resizer') {
        canvas.width = params.w;
        canvas.height = params.h;
        ctx?.drawImage(img, 0, 0, params.w, params.h);
        setProcessedUrl(canvas.toDataURL('image/jpeg'));
      } else if (tool.featureId === 'compressor') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        setProcessedUrl(canvas.toDataURL('image/jpeg', params.q));
      }
    };
    img.src = previewUrl;
  };

  const handleColorPick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const ctx = canvasRef.current.getContext('2d');
    const p = ctx?.getImageData(x, y, 1, 1).data;
    if (p) setPickedColor("#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1).toUpperCase());
  };

  if (tool.featureId === 'qr' || tool.featureId === 'yt-thumb' || tool.featureId === 'yt-mp3') {
    return (
      <div className="max-w-xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
        <ToolHeader tool={tool} />
        <input 
          type="text" 
          placeholder={tool.featureId === 'qr' ? "Enter text or URL" : "Paste YouTube URL"}
          className="w-full p-4 mb-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          onChange={e => setParams(p => ({ ...p, text: e.target.value }))}
        />
        <button onClick={processImage} className="w-full py-3 bg-secondary text-white rounded-xl font-bold mb-6">
            {tool.featureId === 'yt-mp3' ? 'Search Converter' : 'Generate'}
        </button>
        {processedUrl && (
           <div className="text-center animate-in fade-in">
              <img src={processedUrl} alt="Result" className="mx-auto rounded-xl shadow-lg mb-4 max-h-64" />
              <a href={processedUrl} download="download.jpg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-full">
                <Download size={16} /> Download / Open
              </a>
           </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
      <ToolHeader tool={tool} />
      
      {!previewUrl ? (
         <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl p-12 text-center hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer relative transition-colors">
            <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
            <Upload size={48} className="mx-auto mb-4 text-secondary"/>
            <p className="font-bold text-lg">Upload Image to {tool.name}</p>
            <p className="text-sm text-slate-500">Drag & Drop or Click</p>
         </div>
      ) : (
         <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
               {tool.featureId === 'resizer' && (
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500">Width</label>
                      <input type="number" value={params.w} onChange={e => setParams(p => ({...p, w: parseInt(e.target.value)}))} className="w-full p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500">Height</label>
                      <input type="number" value={params.h} onChange={e => setParams(p => ({...p, h: parseInt(e.target.value)}))} className="w-full p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent" />
                    </div>
                 </div>
               )}
               {tool.featureId === 'compressor' && (
                 <div>
                    <label className="block mb-2 text-sm font-bold">Quality: {Math.round(params.q * 100)}%</label>
                    <input type="range" min="0.1" max="1" step="0.1" value={params.q} onChange={e => setParams(p => ({...p, q: parseFloat(e.target.value)}))} className="w-full accent-secondary" />
                 </div>
               )}
               {tool.featureId !== 'color' && (
                 <button onClick={processImage} className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">Process Image</button>
               )}
               
               {tool.featureId === 'color' && pickedColor && (
                 <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center gap-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full shadow-inner border border-slate-200 dark:border-white/10" style={{ backgroundColor: pickedColor }}></div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">HEX CODE</p>
                      <p className="text-xl font-mono font-bold">{pickedColor}</p>
                    </div>
                    <button onClick={() => navigator.clipboard.writeText(pickedColor)} className="ml-auto text-secondary hover:bg-secondary/10 p-2 rounded-lg"><Copy size={20}/></button>
                 </div>
               )}
               
               <button onClick={() => { setPreviewUrl(null); setProcessedUrl(null); }} className="w-full py-2 text-red-500 font-bold text-sm hover:bg-red-500/10 rounded-lg transition-colors">Remove / Upload New</button>
            </div>

            <div className="bg-slate-100 dark:bg-black/40 rounded-xl p-2 flex items-center justify-center min-h-[300px] overflow-hidden relative border border-slate-200 dark:border-white/10">
               {tool.featureId === 'color' ? (
                  <canvas ref={canvasRef} onClick={handleColorPick} className="max-w-full max-h-[400px] cursor-crosshair" />
               ) : (
                  <img src={processedUrl || previewUrl} alt="Preview" className="max-w-full max-h-[400px] object-contain" />
               )}
               {processedUrl && tool.featureId !== 'bg-remove' && (
                  <a href={processedUrl} download="processed.jpg" className="absolute bottom-4 right-4 px-4 py-2 bg-secondary text-white rounded-full shadow-lg text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    <Download size={16}/> Save
                  </a>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

// --- 5. Calculators (Scientific, Currency, Land, EMI) ---
const CalculatorTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  // Scientific Calc State
  const [calcDisplay, setCalcDisplay] = useState('');
  const [graphMode, setGraphMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Currency State
  const [currAmount, setCurrAmount] = useState(1);
  const [currFrom, setCurrFrom] = useState('USD');
  const [currTo, setCurrTo] = useState('NPR');

  // Land State
  // The master state is sqft. Everything else is derived from it.
  const [sqft, setSqft] = useState<string>('');

  // Generic
  const [inputs, setInputs] = useState<any>({});
  const [result, setResult] = useState('');

  // Scientific Calc Logic
  const handleScientific = (val: string) => {
    if (val === 'C') setCalcDisplay('');
    else if (val === 'DEL') setCalcDisplay(prev => prev.slice(0, -1));
    else if (val === '=') {
      try {
        // Basic safe eval
        const res = Function('"use strict";return (' + calcDisplay
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/sqrt/g, 'Math.sqrt')
          .replace(/\^/g, '**')
          .replace(/pi/g, 'Math.PI') 
          .replace(/e/g, 'Math.E') 
        + ')')();
        setCalcDisplay(String(Number(res).toFixed(8).replace(/\.?0+$/, '')));
      } catch { setCalcDisplay('Error'); }
    } else if (val === 'graph') {
      setGraphMode(!graphMode);
    } else {
      setCalcDisplay(prev => prev + val);
    }
  };

  useEffect(() => {
    if (graphMode && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      ctx.clearRect(0, 0, width, height);
      
      // Draw axes
      ctx.beginPath();
      ctx.strokeStyle = '#94a3b8';
      ctx.moveTo(0, height/2); ctx.lineTo(width, height/2);
      ctx.moveTo(width/2, 0); ctx.lineTo(width/2, height);
      ctx.stroke();

      // Plot Function
      ctx.beginPath();
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 2;
      
      try {
        for (let px = 0; px < width; px++) {
          // Map px to x coordinate (-10 to 10)
          const x = (px - width/2) / (width/20);
          
          // Eval function (very simple basic support like 'sin(x)')
          // We replace 'x' in calcDisplay with actual value
          let expr = calcDisplay
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/x/g, `(${x})`);
          
          // If calcDisplay has no x, don't plot
          if (!calcDisplay.includes('x')) return;

          const y = Function('"use strict";return (' + expr + ')')();
          
          // Map y to py
          const py = height/2 - (y * (height/20));
          
          if (px === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      } catch(e) {
        // ignore plotting errors
      }
    }
  }, [calcDisplay, graphMode]);

  // Currency Logic
  const getRate = (code: string) => CURRENCY_RATES.find(r => r.code === code)?.rate || 1;
  const convertedValue = (currAmount * (getRate(currTo) / getRate(currFrom))).toFixed(2);

  // Land Logic
  // Helper to parse partial land inputs to SQFT
  const updateLand = (field: string, val: number) => {
    // We calculate everything to SQFT first
    let currentSqft = parseFloat(sqft) || 0;
    
    // Current breakdown values for preservation
    const currentRopani = Math.floor(currentSqft / 5476);
    const remR = currentSqft % 5476;
    const currentAana = Math.floor(remR / 342.25);
    const remA = remR % 342.25;
    const currentPaisa = Math.floor(remA / 85.56);
    
    const currentBigha = Math.floor(currentSqft / 72900);
    const remB = currentSqft % 72900;
    const currentKattha = Math.floor(remB / 3645);

    if (field === 'sqft') currentSqft = val;
    
    else if (field === 'ropani') currentSqft = (val * 5476) + (currentAana * 342.25) + (currentPaisa * 85.56) + ((remA % 85.56) / 21.39 * 21.39);
    else if (field === 'aana') currentSqft = (currentRopani * 5476) + (val * 342.25) + (currentPaisa * 85.56) + ((remA % 85.56) / 21.39 * 21.39);
    else if (field === 'paisa') currentSqft = (currentRopani * 5476) + (currentAana * 342.25) + (val * 85.56) + ((remA % 85.56) / 21.39 * 21.39);
    else if (field === 'dam') currentSqft = (currentRopani * 5476) + (currentAana * 342.25) + (currentPaisa * 85.56) + (val * 21.39);
    
    else if (field === 'bigha') currentSqft = (val * 72900) + (currentKattha * 3645) + ((currentSqft % 3645) / 182.25 * 182.25);
    else if (field === 'kattha') currentSqft = (currentBigha * 72900) + (val * 3645) + ((currentSqft % 3645) / 182.25 * 182.25);
    else if (field === 'dhur') currentSqft = (currentBigha * 72900) + (currentKattha * 3645) + (val * 182.25);

    setSqft(currentSqft.toString());
  };

  // Derived Land Values from SQFT state
  const s = parseFloat(sqft) || 0;
  
  const d_ropani = Math.floor(s / 5476);
  const rem_r = s % 5476;
  const d_aana = Math.floor(rem_r / 342.25);
  const rem_a = rem_r % 342.25;
  const d_paisa = Math.floor(rem_a / 85.56);
  const d_dam = ((rem_a % 85.56) / 21.39).toFixed(2);

  const d_bigha = Math.floor(s / 72900);
  const rem_b = s % 72900;
  const d_kattha = Math.floor(rem_b / 3645);
  const d_dhur = ((rem_b % 3645) / 182.25).toFixed(2);

  // --- RENDER ---

  if (tool.featureId === 'scientific') {
      // Refined Button Styles for Distinct Visual Hierarchy
      const btnBase = "h-14 md:h-16 rounded-2xl font-bold text-lg md:text-xl transition-all active:scale-95 flex items-center justify-center shadow-sm relative overflow-hidden group select-none border";
      
      // 1. Numbers (White/Dark Slate)
      const numClass = `${btnBase} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600`;
      
      // 2. Operators (Distinct Indigo Tint)
      const opClass = `${btnBase} bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50`;
      
      // 3. Functions (Subtle Gray/Slate)
      const fnClass = `${btnBase} bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-base font-medium hover:bg-slate-200 dark:hover:bg-slate-800`;
      
      // 4. Actions (Delete/Clear - Red Tint)
      const delClass = `${btnBase} bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40`;
      
      // 5. Equals (Primary Gradient)
      const eqClass = `${btnBase} bg-gradient-to-br from-secondary to-primary border-transparent text-white shadow-lg shadow-primary/30 hover:brightness-110 transform hover:-translate-y-1`;

      // Graph Toggle State
      const graphBtnClass = (active: boolean) => `${fnClass} ${active ? 'ring-2 ring-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : ''}`;

      return (
        <div className="max-w-md mx-auto bg-surface rounded-[2.5rem] p-6 md:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-white/5 backdrop-blur-xl">
           <ToolHeader tool={tool} />
           
           {/* Calculator Display */}
           <div className="bg-slate-50 dark:bg-black/40 p-6 rounded-3xl mb-6 text-right border border-slate-200 dark:border-white/5 shadow-inner min-h-[120px] flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
             {/* Mode Indicators */}
             <div className="flex justify-end gap-2 mb-2 h-6">
                {calcDisplay.includes('x') && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 text-[10px] font-bold border border-indigo-500/20 animate-in fade-in">
                    f(x)
                  </span>
                )}
                {graphMode && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 text-[10px] font-bold border border-purple-500/20 animate-in fade-in">
                    GRAPH
                  </span>
                )}
             </div>
             <div className="text-4xl md:text-5xl font-mono font-medium text-slate-800 dark:text-white overflow-x-auto whitespace-nowrap scrollbar-hide tracking-tight pb-1">
                {calcDisplay || '0'}
             </div>
           </div>

           {/* Graph Area */}
           {graphMode && (
             <div className="mb-6 bg-white dark:bg-black rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 relative h-48 shadow-inner animate-in fade-in slide-in-from-top-4 duration-300">
                <canvas ref={canvasRef} width={300} height={200} className="w-full h-full" />
                <div className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-500 bg-surface/90 px-3 py-1 rounded-full backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
                   Range: -10 to 10
                </div>
             </div>
           )}

           {/* Keypad Grid */}
           <div className="grid grid-cols-4 gap-3 md:gap-4">
              {/* Scientific Functions Row */}
              <button onClick={() => handleScientific('sin')} className={fnClass}>sin</button>
              <button onClick={() => handleScientific('cos')} className={fnClass}>cos</button>
              <button onClick={() => handleScientific('tan')} className={fnClass}>tan</button>
              <button onClick={() => handleScientific('DEL')} className={delClass}>DEL</button>
              
              <button onClick={() => handleScientific('(')} className={fnClass}>(</button>
              <button onClick={() => handleScientific(')')} className={fnClass}>)</button>
              <button onClick={() => handleScientific('^')} className={fnClass}>^</button>
              <button onClick={() => handleScientific('/')} className={opClass}>÷</button>

              <button onClick={() => handleScientific('7')} className={numClass}>7</button>
              <button onClick={() => handleScientific('8')} className={numClass}>8</button>
              <button onClick={() => handleScientific('9')} className={numClass}>9</button>
              <button onClick={() => handleScientific('*')} className={opClass}>×</button>

              <button onClick={() => handleScientific('4')} className={numClass}>4</button>
              <button onClick={() => handleScientific('5')} className={numClass}>5</button>
              <button onClick={() => handleScientific('6')} className={numClass}>6</button>
              <button onClick={() => handleScientific('-')} className={opClass}>−</button>

              <button onClick={() => handleScientific('1')} className={numClass}>1</button>
              <button onClick={() => handleScientific('2')} className={numClass}>2</button>
              <button onClick={() => handleScientific('3')} className={numClass}>3</button>
              <button onClick={() => handleScientific('+')} className={opClass}>+</button>

              <button onClick={() => handleScientific('0')} className={`${numClass} col-span-2 rounded-2xl`}>0</button>
              <button onClick={() => handleScientific('.')} className={numClass}>.</button>
              <button onClick={() => handleScientific('=')} className={eqClass}>=</button>

              {/* Bottom Actions */}
              <button onClick={() => handleScientific('x')} className={`${fnClass} text-indigo-500 font-serif italic font-bold`}>x</button>
              <button onClick={() => handleScientific('graph')} className={graphBtnClass(graphMode)}>Graph</button>
              <button onClick={() => handleScientific('log')} className={fnClass}>log</button>
              <button onClick={() => handleScientific('C')} className={delClass}>AC</button>
           </div>
        </div>
      );
  }

  if (tool.featureId === 'currency') {
      return (
        <div className="max-w-2xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
           <ToolHeader tool={tool} />
           <div className="space-y-8">
              <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                 <label className="block text-xs font-bold text-slate-500 mb-2">AMOUNT</label>
                 <input 
                  type="number" 
                  value={currAmount} 
                  onChange={e => setCurrAmount(parseFloat(e.target.value) || 0)} 
                  className="w-full bg-transparent text-4xl font-bold text-slate-900 dark:text-white outline-none placeholder:text-slate-300"
                  placeholder="0.00"
                 />
              </div>

              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">FROM</label>
                    <div className="relative">
                      <select value={currFrom} onChange={e => setCurrFrom(e.target.value)} className="w-full p-4 pr-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 appearance-none font-bold">
                        {CURRENCY_RATES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    </div>
                 </div>

                 <button onClick={() => { const t = currFrom; setCurrFrom(currTo); setCurrTo(t); }} className="p-4 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-secondary hover:text-white transition-colors mt-6">
                    <ArrowRightLeft size={20} />
                 </button>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">TO</label>
                    <div className="relative">
                      <select value={currTo} onChange={e => setCurrTo(e.target.value)} className="w-full p-4 pr-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 appearance-none font-bold">
                        {CURRENCY_RATES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    </div>
                 </div>
              </div>

              <div className="text-center p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                 <p className="text-sm text-slate-500 mb-1">Converted Amount</p>
                 <p className="text-4xl font-bold text-secondary">{CURRENCY_RATES.find(c=>c.code===currTo)?.flag} {convertedValue} <span className="text-lg">{currTo}</span></p>
                 <p className="text-xs text-slate-400 mt-2">1 {currFrom} = {(getRate(currTo)/getRate(currFrom)).toFixed(4)} {currTo}</p>
              </div>
           </div>
        </div>
      );
  }

  if (tool.featureId === 'area') {
      return (
        <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-white/5">
           <ToolHeader tool={tool} />
           
           <div className="mb-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl text-center">
              <label className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total Area</label>
              <div className="flex items-center justify-center gap-2 mt-2">
                 <input type="number" value={sqft} onChange={e => updateLand('sqft', parseFloat(e.target.value))} className="bg-transparent text-4xl md:text-5xl font-bold text-center w-full outline-none placeholder:text-slate-700" placeholder="0" />
                 <span className="text-xl font-medium text-slate-500">sq.ft</span>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {/* Hill System */}
              <div className="space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                 <div className="flex items-center gap-2 mb-2">
                   <MapIcon size={18} className="text-secondary" />
                   <h4 className="font-bold text-slate-900 dark:text-white">Hill System</h4>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-500">Ropani</label><input type="number" value={d_ropani} onChange={e => updateLand('ropani', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                    <div><label className="text-xs font-bold text-slate-500">Aana</label><input type="number" value={d_aana} onChange={e => updateLand('aana', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                    <div><label className="text-xs font-bold text-slate-500">Paisa</label><input type="number" value={d_paisa} onChange={e => updateLand('paisa', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                    <div><label className="text-xs font-bold text-slate-500">Dam</label><input type="number" value={d_dam} onChange={e => updateLand('dam', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                 </div>
              </div>

              {/* Terai System */}
              <div className="space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                 <div className="flex items-center gap-2 mb-2">
                   <Home size={18} className="text-secondary" />
                   <h4 className="font-bold text-slate-900 dark:text-white">Terai System</h4>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    <div><label className="text-xs font-bold text-slate-500">Bigha</label><input type="number" value={d_bigha} onChange={e => updateLand('bigha', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-bold text-slate-500">Kattha</label><input type="number" value={d_kattha} onChange={e => updateLand('kattha', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                      <div><label className="text-xs font-bold text-slate-500">Dhur</label><input type="number" value={d_dhur} onChange={e => updateLand('dhur', parseFloat(e.target.value))} className="w-full p-3 rounded-lg bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 font-bold"/></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
  }

  // Generic (Age, EMI)
  return (
    <div className="max-w-lg mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-white/5">
      <ToolHeader tool={tool} />
      <div className="bg-slate-100 dark:bg-white/5 p-6 rounded-2xl mb-6 space-y-4">
        {tool.featureId === 'age' && (
          <div>
            <label className="block text-sm font-bold mb-2">Date of Birth</label>
            <input type="date" className="w-full p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10" onChange={e => {
                 const diff = new Date().getTime() - new Date(e.target.value).getTime();
                 const ageDate = new Date(diff);
                 const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                 setResult(`${age} Years Old`);
            }} />
          </div>
        )}
        {tool.featureId === 'emi' && (
           <>
             <input placeholder="Loan Amount" type="number" className="w-full p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10" onChange={e => setInputs({...inputs, p: e.target.value})} />
             <input placeholder="Interest Rate (%)" type="number" className="w-full p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10" onChange={e => setInputs({...inputs, r: e.target.value})} />
             <input placeholder="Tenure (Years)" type="number" className="w-full p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10" onChange={e => setInputs({...inputs, n: e.target.value})} />
             <button onClick={() => {
                  const P = parseFloat(inputs.p), R = parseFloat(inputs.r)/(12*100), N = parseFloat(inputs.n)*12;
                  if (P && R && N) {
                    const emi = (P * R * Math.pow(1+R, N)) / (Math.pow(1+R, N) - 1);
                    setResult(`Monthly EMI: NPR ${emi.toFixed(2)}`);
                  }
             }} className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:opacity-90">Calculate EMI</button>
           </>
        )}
      </div>
      {result && <div className="p-6 bg-secondary text-white rounded-xl font-bold text-center text-xl shadow-lg shadow-secondary/30 animate-in zoom-in">{result}</div>}
    </div>
  );
};

// --- 6. Utilities (PDF, Pass, Word, JSON, etc) ---
const UtilityTool: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [output, setOutput] = useState<any>('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files) setFiles(e.target.files);
  };

  const simulatePdfProcess = () => {
     if(!files || files.length === 0) return;
     setProcessing(true);
     // Simulate network/processing delay
     setTimeout(() => {
         setProcessing(false);
         setOutput("Files Processed Successfully! (Demo: Backend required for PDF ops)");
     }, 2000);
  };

  if (tool.featureId.startsWith('pdf') || tool.featureId === 'word-pdf') {
     return (
        <div className="max-w-lg mx-auto bg-surface p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-white/5">
           <ToolHeader tool={tool} />
           <div className="border-2 border-dashed border-secondary/30 rounded-xl p-10 text-center bg-secondary/5 hover:bg-secondary/10 transition-all relative group">
              <input type="file" multiple={tool.featureId === 'pdf-merge'} className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileDrop} />
              {files ? (
                 <div className="space-y-3 animate-in fade-in">
                    <Files size={48} className="mx-auto text-secondary" />
                    <p className="font-bold text-lg">{files.length} File(s) Selected</p>
                    <p className="text-sm text-slate-500">{files[0].name} {files.length > 1 && `+ ${files.length - 1} more`}</p>
                 </div>
              ) : (
                 <div className="group-hover:scale-105 transition-transform">
                    <Upload size={48} className="mx-auto text-slate-400 mb-4" />
                    <p className="font-bold text-lg text-slate-700 dark:text-slate-300">Drag & Drop Files</p>
                    <p className="text-sm text-slate-500 mt-2">Supports PDF, DOCX</p>
                 </div>
              )}
           </div>
           <button onClick={simulatePdfProcess} disabled={!files || processing} className="w-full mt-6 py-3 bg-secondary text-white rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-secondary/20 transition-all">
               {processing ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
               {processing ? 'Processing...' : 'Start Conversion'}
           </button>
           {output && <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold text-center rounded-xl border border-green-200 dark:border-green-900/30 flex items-center justify-center gap-2"><CheckCircle size={18}/> {output}</div>}
        </div>
     );
  }
  return null;
};

// --- Main Component ---
const Tools: React.FC<ToolsProps> = ({ onBack }) => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'AI Tools', 'Image Tools', 'Calculators', 'Utilities'];
  const activeTool = TOOLS.find(t => t.id === activeToolId);

  const filteredTools = TOOLS.filter(t => {
    return (filter === 'All' || t.category === filter) && 
           (t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));
  });

  const renderTool = () => {
    if (!activeTool) return null;
    switch(activeTool.componentType) {
      case 'ai-chat': return <AIChatTool tool={activeTool} />;
      case 'ai-text': return <AITextTool tool={activeTool} />;
      case 'ai-image-gen': return <AIImageGenTool tool={activeTool} />;
      case 'ai-image-edit': return <AIImageEditTool tool={activeTool} />;
      case 'ai-analyze': return <AIAnalyzeTool tool={activeTool} />;
      case 'ai-video': return <AIVideoTool tool={activeTool} />;
      case 'image': return <ImageTool tool={activeTool} />;
      case 'calculator': return <CalculatorTool tool={activeTool} />;
      case 'utility': return <UtilityTool tool={activeTool} />;
      default: return null;
    }
  };

  return (
    <section className="min-h-screen bg-background text-slate-900 dark:text-slate-200 px-4 md:px-6 pb-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pt-8">
           <button onClick={() => activeToolId ? setActiveToolId(null) : onBack?.()} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors font-medium shadow-sm group">
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> <span>{activeToolId ? 'Back to Dashboard' : 'Back to Portfolio'}</span>
           </button>
           {!activeToolId && (
             <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search tools..." className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-secondary outline-none transition-all" value={search} onChange={e => setSearch(e.target.value)} />
             </div>
           )}
        </div>

        {activeToolId ? (
          <div className="animate-in slide-in-from-right duration-500">{renderTool()}</div>
        ) : (
          <>
            <div className="text-center max-w-3xl mx-auto mb-12 pt-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">Digital Toolkit</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">Advanced Calculations, Media Processing & AI</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10 sticky top-24 z-20 py-4 bg-background/95 backdrop-blur-sm border-b border-slate-200 dark:border-white/5">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-secondary text-white shadow-lg shadow-secondary/30 scale-105' : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <div key={tool.id} onClick={() => setActiveToolId(tool.id)} className="group bg-surface border border-slate-200 dark:border-white/5 rounded-3xl p-6 hover:border-secondary/50 hover:shadow-xl transition-all cursor-pointer flex flex-col relative overflow-hidden hover:-translate-y-1">
                  <div className="absolute -top-4 -right-4 p-8 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform mb-5 border border-slate-100 dark:border-white/5">
                    {React.createElement(IconMap[tool.icon] || Sparkles, { size: 28 })}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{tool.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-grow leading-relaxed">{tool.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{tool.category}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                        <ArrowLeft size={14} className="rotate-180" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Tools;
