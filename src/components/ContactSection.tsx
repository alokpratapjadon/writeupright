import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const initAnimations = async () => {
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Form animation
        if (formRef.current) {
          gsap.fromTo(formRef.current,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: formRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Contact info animation
        if (contactInfoRef.current) {
          gsap.fromTo(contactInfoRef.current,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contactInfoRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              },
              delay: 0.3
            }
          );
        }

        // Section parallax
        if (sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(sectionRef.current, {
                y: progress * -40,
                duration: 0.3
              });
            }
          });
        }

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    };

    initAnimations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-32 bg-gray-900 dark:bg-black transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl text-white mb-8">
            Let's <span className="italic text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? We'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
          >
            <h3 className="text-2xl text-white mb-8">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 min-h-[120px]"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            ref={contactInfoRef}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl text-white mb-8">Get in touch</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                We're here to help bring your vision to life. Whether you have a specific project in mind or just want to explore possibilities, we'd love to start a conversation.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <motion.div 
                className="flex items-start space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <h4 className="text-white mb-2">Email</h4>
                  <p className="text-gray-300">hello@technos.com</p>
                  <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <h4 className="text-white mb-2">Phone</h4>
                  <p className="text-gray-300">+91 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM IST</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h4 className="text-white mb-2">Office</h4>
                  <p className="text-gray-300">Mumbai, Maharashtra</p>
                  <p className="text-gray-400 text-sm">India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="text-white mb-6">Follow us</h4>
              <div className="flex space-x-4">
                {['LinkedIn', 'Twitter', 'Instagram', 'Dribbble'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">
                      {social === 'LinkedIn' && '💼'}
                      {social === 'Twitter' && '🐦'}
                      {social === 'Instagram' && '📷'}
                      {social === 'Dribbble' && '🏀'}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}