import React from 'react';
import { Heart, Target, Users, Truck } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <span className="text-white font-bold text-4xl">A</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">متجر Alma</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            وجهتك المفضلة للمواد الغذائية والاستهلاكية في الساحل السوري
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">من نحن</h2>
            <p className="text-gray-700 leading-relaxed text-right mb-6">
              متجر Alma هو متجر إلكتروني متخصص في توفير أجود المواد الغذائية والاستهلاكية 
              للعائلات في منطقة الساحل السوري. نسعى لتقديم تجربة تسوق مريحة وسهلة من خلال 
              منصة رقمية حديثة تتيح لك طلب احتياجاتك اليومية بكل يسر وسهولة.
            </p>
            
            <p className="text-gray-700 leading-relaxed text-right mb-8">
              منذ انطلاقتنا، نحن ملتزمون بتوفير منتجات عالية الجودة بأسعار تنافسية، 
              مع خدمة عملاء متميزة وتوصيل سريع. نؤمن بأن التسوق يجب أن يكون تجربة 
              ممتعة ومريحة لجميع أفراد العائلة.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">رؤيتنا</h3>
            </div>
            <p className="text-gray-700 text-right leading-relaxed">
              أن نكون المتجر الإلكتروني الرائد في منطقة الساحل السوري، 
              نوفر للعائلات كل ما تحتاجه من مواد غذائية وأساسية بجودة عالية 
              وخدمة متميزة.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">قيمنا</h3>
            </div>
            <p className="text-gray-700 text-right leading-relaxed">
              الجودة في المنتجات، السرعة في الخدمة، الأمانة في التعامل، 
              والحرص على رضا عملائنا الكرام. هذه هي القيم التي نسير عليها 
              في كل يوم عمل.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">فريقنا</h3>
            </div>
            <p className="text-gray-700 text-right leading-relaxed">
              فريق متخصص من الشباب السوري المتحمس، يعمل بجد لتوفير أفضل 
              تجربة تسوق إلكترونية. نحن نؤمن بالعمل الجماعي والتطوير المستمر.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <Truck className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">خدماتنا</h3>
            </div>
            <p className="text-gray-700 text-right leading-relaxed">
              طلب سهل عبر الواتساب، تحديد الموقع التلقائي، تشكيلة واسعة 
              من المنتجات، وخدمة عملاء على مدار الساعة لضمان راحتكم.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-3xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">انضم إلى عائلة Alma</h2>
          <p className="text-lg opacity-90 mb-6">
            ابدأ تسوقك الآن واستمتع بتجربة فريدة من الراحة والجودة
          </p>
          <div className="inline-flex items-center space-x-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <span className="text-lg font-medium">شكراً لثقتكم بنا</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;