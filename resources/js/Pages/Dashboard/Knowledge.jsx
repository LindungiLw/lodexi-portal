import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { UploadCloud, FileText, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Knowledge({ documents = [] }) {
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset state
        setUploadError(null);

        // Validation
        const allowedExtensions = ['.txt', '.pdf', '.docx'];
        if (!allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
            setUploadError("Format file tidak didukung. Harap unggah .txt, .pdf, atau .docx.");
            return;
        }
        if (file.size > 20 * 1024 * 1024) {
            setUploadError("File is too large. Maximum size is 20MB.");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('document', file);
        formData.append('category', 'general');

        try {
            const response = await fetch('/api/ingest', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                // Refresh the page to get updated documents list
                router.reload({ only: ['documents'] });
            } else {
                setUploadError(result.error || "Failed to upload document.");
            }
        } catch (error) {
            setUploadError("Network error occurred during upload.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                        Knowledge Base
                    </h2>
                </div>
            }
        >
            <Head title="Knowledge Base" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        
                        {uploadError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-2xl p-4 flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-red-800 dark:text-red-400">Upload Failed</h4>
                                    <p className="text-sm text-red-700 dark:text-red-500/80 mt-1">{uploadError}</p>
                                </div>
                            </div>
                        )}

                        {/* Drag and Drop Zone */}
                        <div className="overflow-hidden bg-white/50 backdrop-blur-md shadow-sm sm:rounded-2xl dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-8">
                            <div 
                                onClick={handleFileClick}
                                className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                                    isUploading 
                                    ? 'border-gray-300 dark:border-gray-600 opacity-70 pointer-events-none' 
                                    : 'border-[#F29191]/40 dark:border-[#F29191]/20 hover:bg-[#F29191]/5 dark:hover:bg-[#F29191]/10'
                                }`}
                            >
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                    accept=".txt,.pdf,.docx" 
                                />
                                <div className={`${isUploading ? 'animate-bounce' : ''} bg-[#F29191]/10 dark:bg-[#F29191]/20 p-4 rounded-full mb-4`}>
                                    <UploadCloud className="w-10 h-10 text-[#F29191]" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                                    {isUploading ? "Mengekstrak dan Memproses Dokumen..." : "Upload your Knowledge Base"}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                                    {isUploading 
                                        ? "Sistem sedang membedah dokumen PDF/Word kamu dan mengubahnya menjadi Knowledge Base..." 
                                        : "Tarik & lepas file .pdf, .docx, atau .txt. Mesin LODEXI akan otomatis mengekstrak teks di dalamnya!"}
                                </p>
                                <button 
                                    disabled={isUploading}
                                    className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:bg-gray-400 dark:disabled:bg-gray-600"
                                >
                                    {isUploading ? "Processing..." : "Select File"}
                                </button>
                            </div>
                        </div>

                        {/* Document List */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-[#F29191]" />
                                    Ingested Documents
                                </h3>
                                <span className="text-sm text-gray-500">{documents.length} files total</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Document Name</th>
                                            <th className="px-6 py-4 font-medium">Size</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Date Added</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {documents.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                                    No documents uploaded yet. Start by uploading a text file above.
                                                </td>
                                            </tr>
                                        ) : (
                                            documents.map((doc) => (
                                                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
                                                        <FileText className="w-4 h-4 mr-3 text-gray-400" />
                                                        {doc.filename}
                                                    </td>
                                                    <td className="px-6 py-4">{doc.size}</td>
                                                    <td className="px-6 py-4">
                                                        {doc.status === 'Ingested' ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                                                            </span>
                                                        ) : doc.status === 'Processing' ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                                <div className="w-3 h-3 mr-1 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                                                Processing
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                                                <AlertCircle className="w-3 h-3 mr-1" /> Failed
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">{new Date(doc.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-red-500 hover:text-red-700 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
