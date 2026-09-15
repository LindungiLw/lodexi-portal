import { useState } from 'react';
import { Terminal, Code, CheckCircle2, Copy } from 'lucide-react';

export default function ApiQuickStart() {
    const [activeTab, setActiveTab] = useState('curl');
    const [copiedTab, setCopiedTab] = useState(null);

    const codeSnippets = {
        curl: `curl -X POST http://127.0.0.1:8000/api/v1/ask \\
  -H "Authorization: Bearer <YOUR_SECRET_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"question": "Apa itu Lodexi?", "category": "general"}'`,

        python: `import requests

url = "http://127.0.0.1:8000/api/v1/ask"
headers = {
    "Authorization": "Bearer <YOUR_SECRET_KEY>",
    "Content-Type": "application/json"
}
data = {
    "question": "Apa itu Lodexi?",
    "category": "general"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,

        node: `const fetch = require('node-fetch');

const askLodexi = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/v1/ask', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_SECRET_KEY>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: 'Apa itu Lodexi?',
      category: 'general'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

askLodexi();`
    };

    const handleCopy = (language) => {
        navigator.clipboard.writeText(codeSnippets[language]);
        setCopiedTab(language);
        setTimeout(() => setCopiedTab(null), 2000);
    };

    return (
        <section>
            <header className="flex items-center mb-6">
                <Terminal className="w-6 h-6 mr-3 text-slate-800 dark:text-gray-200" />
                <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Developer Quick Start</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Integrate Lodexi into your own applications using raw HTTP requests. (Official SDKs coming soon!)
                    </p>
                </div>
            </header>

            <div className="bg-slate-900 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
                {/* Tabs */}
                <div className="flex bg-slate-800/50 border-b border-slate-700 px-4">
                    {['curl', 'python', 'node'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${
                                activeTab === tab 
                                ? 'text-[#F29191] border-b-2 border-[#F29191] bg-slate-800/80' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                            }`}
                        >
                            {tab === 'curl' ? 'cURL' : tab === 'python' ? 'Python' : 'Node.js'}
                        </button>
                    ))}
                </div>

                {/* Code Block */}
                <div className="relative group">
                    <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto">
                        <code>{codeSnippets[activeTab]}</code>
                    </pre>
                    
                    <button
                        onClick={() => handleCopy(activeTab)}
                        className="absolute top-3 right-3 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-opacity opacity-0 group-hover:opacity-100 flex items-center shadow-sm"
                        title="Copy to clipboard"
                    >
                        {copiedTab === activeTab ? (
                            <><CheckCircle2 className="w-4 h-4 text-green-400 mr-1.5" /> <span className="text-xs text-green-400 font-medium">Copied</span></>
                        ) : (
                            <><Copy className="w-4 h-4 mr-1.5" /> <span className="text-xs font-medium">Copy</span></>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
