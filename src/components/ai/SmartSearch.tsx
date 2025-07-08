import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, Sparkles } from 'lucide-react';
import { useProductManager } from '../../hooks/useProductManager';
import { Product } from '../../types';

interface SmartSearchProps {
  onResults: (products: Product[]) => void;
  placeholder?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ 
  onResults, 
  placeholder = "ابحث بذكاء... جرب: 'أريد هدية لأمي' أو 'هاتف بسعر معقول'" 
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { products } = useProductManager();

  // اقتراحات البحث الذكية
  const searchSuggestions = [
    'هاتف ذكي بسعر جيد',
    'ملابس أطفال للصيف',
    'مواد غذائية صحية',
    'هدية لعيد الميلاد',
    'إلكترونيات للمنزل',
    'ملابس رياضية للرجال',
    'حلويات للأطفال',
    'أحذية نسائية أنيقة'
  ];

  useEffect(() => {
    // عرض اقتراحات عند بدء الكتابة
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.includes(query) || query.length > 2
      );
      setSuggestions(filtered.slice(0, 4));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSmartSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // محاكاة البحث الذكي
    setTimeout(() => {
      let results: Product[] = [];
      
      // بحث ذكي بناءً على الكلمات المفتاحية
      if (searchQuery.includes('هاتف') || searchQuery.includes('موبايل') || searchQuery.includes('جوال')) {
        results = products.filter(p => p.category === 'phones');
      } else if (searchQuery.includes('ملابس') || searchQuery.includes('قميص') || searchQuery.includes('فستان')) {
        results = products.filter(p => p.section === 'clothing');
      } else if (searchQuery.includes('طعام') || searchQuery.includes('أكل') || searchQuery.includes('شرب')) {
        results = products.filter(p => p.section === 'food');
      } else if (searchQuery.includes('هدية') || searchQuery.includes('هدايا')) {
        // اقتراح منتجات متنوعة للهدايا
        results = products.filter(p => 
          p.category === 'phones' || 
          p.category === 'headphones' || 
          p.category === 'sweets'
        );
      } else if (searchQuery.includes('رخيص') || searchQuery.includes('معقول') || searchQuery.includes('مناسب')) {
        // منتجات بأسعار معقولة
        results = products.filter(p => p.price < 10000);
      } else {
        // بحث عادي
        results = products.filter(product =>
          product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categoryAr.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      onResults(results);
      setIsSearching(false);
      setSuggestions([]);
    }, 1000);
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSmartSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('المتصفح لا يدعم التعرف على الصوت');
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* شريط البحث الذكي */}
      <div className="relative">
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <Sparkles className="text-purple-500" size={20} />
          <Search className="text-gray-400" size={20} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSmartSearch(query)}
          placeholder={placeholder}
          className="w-full pr-16 pl-12 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right text-lg"
        />
        
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            onClick={startVoiceSearch}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isListening 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={() => handleSmartSearch(query)}
            disabled={isSearching || !query.trim()}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 disabled:opacity-50"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'بحث'
            )}
          </button>
        </div>
      </div>

      {/* اقتراحات البحث */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(suggestion);
                handleSmartSearch(suggestion);
              }}
              className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <Search className="text-gray-400" size={16} />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* حالة البحث الصوتي */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>أتحدث الآن... قل ما تريد البحث عنه</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
