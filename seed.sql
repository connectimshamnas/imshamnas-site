-- Seed Initial Services
INSERT INTO services (title, items) VALUES 
('Digital Strategy', '["Market Analysis", "Brand Positioning", "Growth Hacking", "ROI Optimization"]'),
('Web Development', '["Next.js Applications", "E-commerce Solutions", "Custom CMS", "Performance Optimization"]'),
('Creative Design', '["Brand Identity", "UI/UX Design", "Motion Graphics", "Marketing Collateral"]'),
('Digital Marketing', '["SEO Optimization", "PPC Management", "Content Strategy", "Social Media Marketing"]');

-- Seed Initial Testimonials
INSERT INTO testimonials (author, role, text, image) VALUES 
('Sarah Johnson', 'CEO, TechFlow', 'Shamnas transformed our digital presence. The attention to detail and technical expertise is unmatched.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'),
('Michael Chen', 'Founder, Innovate AI', 'The growth we have seen since implementing their SEO strategy is incredible. Highly recommend.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'),
('Emma Davis', 'Marketing Director, Global Retail', 'Professional, responsive, and creative. They truly understand modern web design.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop');

-- Seed Initial Contact Services
INSERT INTO contact_services (label) VALUES 
('Web Development'),
('UI/UX Design'),
('Digital Marketing'),
('SEO Optimization'),
('General Inquiry');

-- Seed Initial Settings
INSERT INTO settings (key, value) VALUES 
('hero_subtitle', 'Elite Digital Experiences'),
('hero_main_title_prefix', 'Crafting the Future of'),
('hero_main_title_suffix', 'Digital Innovation'),
('hero_description', 'We merge cutting-edge technology with high-end aesthetics to build digital products that captivate and convert.');
