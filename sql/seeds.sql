-- أمثلة منتجات
INSERT INTO products (name, sku, price, stock, metadata) VALUES
('بطاطا', 'POTATO001', 1000, 50, '{"unit": "كيس"}'),
('بسكويت ماركة X', 'BISCUITX001', 200, 100, '{"flavor": "شوكولاتة"}'),
('مياه معدنية', 'WATER001', 500, 200, '{"volume": "1.5L"}');

-- أمثلة سائقين
INSERT INTO drivers (name, phone, is_available, lat, lng, vehicle_info) VALUES
('أحمد', '+963999123456', true, 33.5138, 36.2765, 'دراجة نارية'),
('محمد', '+963999789012', true, 33.5104, 36.2925, 'سيارة صغيرة');


