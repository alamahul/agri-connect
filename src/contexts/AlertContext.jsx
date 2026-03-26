import React, { createContext, useContext, useState, useCallback } from 'react';
import { Info, AlertCircle, CheckCircle2, X } from 'lucide-react';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((title, message, type = 'info') => {
    setAlert({ title, message, type });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative animate-in zoom-in-95 duration-300">
            {/* Top accent bar */}
            <div className={`h-2 w-full ${
              alert.type === 'error' ? 'bg-red-500' : 
              alert.type === 'success' ? 'bg-[#4BAF47]' : 
              'bg-[#EEC044]'
            }`}></div>
            
            <div className="p-8 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                alert.type === 'error' ? 'bg-red-50 text-red-500' : 
                alert.type === 'success' ? 'bg-green-50 text-[#4BAF47]' : 
                'bg-amber-50 text-[#EEC044]'
              }`}>
                {alert.type === 'error' ? <AlertCircle size={32} /> : 
                 alert.type === 'success' ? <CheckCircle2 size={32} /> : 
                 <Info size={32} />}
              </div>
              
              <h2 className="text-xl font-black text-[#1F1E17] mb-3 uppercase tracking-tight">
                {alert.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                {alert.message}
              </p>

              <button 
                onClick={hideAlert}
                className={`w-full py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg border-b-4 ${
                  alert.type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white border-red-700 shadow-red-200' : 
                  alert.type === 'success' ? 'bg-[#4BAF47] hover:bg-[#3E9440] text-white border-[#337a35] shadow-[#4BAF47]/20' : 
                  'bg-[#4BAF47] hover:bg-[#3E9440] text-white border-[#337a35] shadow-[#4BAF47]/20'
                }`}
              >
                Tutup
              </button>
            </div>
            
            <button 
              onClick={hideAlert}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};
