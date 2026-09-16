import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  Menu, X, ExternalLink, Mail, MapPin, 
  Settings, LineChart, Cpu, ShoppingCart, Headset, Code,
  Briefcase, ArrowRight, Download, Linkedin, Laptop
} from 'lucide-react';
import { SiShopify } from 'react-icons/si';

// Use type assertions or any for asset imports to avoid TS errors
import heroImg from '@assets/yvonne-profile-v2-no-bg.png';
import project1Img from '@assets/screencapture-flooringworks-au-2026-08-02-13_43_46_1785656178298.png';
import project2Img from '@assets/screencapture-everfloor-au-2026-08-02-13_54_18_1785656178298.png';
import project3Img from '@assets/screencapture-woodspace-au-2026-08-02-13_55_04_1785656178299.png';

// --- Shared Components ---

const SectionHeading = ({ children, align = 'center' }: { children: React.ReactNode, align?: 'left' | 'center' }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className={`text-3xl md:text-5xl font-bold font-display text-white mb-12 ${align === 'center' ? 'text-center' : ''}`}
  >
    {children}
  </motion.h2>
);

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
    return undefined;
  }, [inView, value, suffix]);

  return <span ref={nodeRef} className="tabular-nums">0{suffix}</span>;
};

// --- Page Component ---

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thanks! I'll get back to you shortly.",
      duration: 5000,
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      
      {/* 1. Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-widest font-display text-white group flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground">
              Y
            </div>
            DEGUZMAN
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-all hover-elevate shadow-sm"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isNavOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-6 flex flex-col gap-4 shadow-lg backdrop-blur-lg bg-background/95">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsNavOpen(false)}
                className="text-lg font-medium text-muted-foreground hover:text-primary py-2"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsNavOpen(false)}
              className="mt-2 text-center w-full py-3 bg-primary text-primary-foreground font-bold rounded"
            >
              Hire Me
            </a>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Hello, I'm
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] tracking-tight">
              Yvonne <br />
              De Guzman
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Helping ecommerce businesses optimize operations, automate workflows, and build exceptional Shopify experiences.
            </p>
            
            <div className="flex flex-wrap gap-3 my-2">
              {['Shopify Expert', 'Ecommerce Operations', 'Technical VA'].map((role) => (
                <span key={role} className="px-4 py-2 rounded-md bg-card border border-border text-sm font-medium text-white/90">
                  {role}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 w-full sm:w-auto">
              <a 
                href="#contact" 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
              >
                Work With Me
                <ArrowRight size={20} />
              </a>
              <a 
                href="#" 
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-border rounded font-semibold text-lg hover:border-primary/50 hover:bg-card transition-all"
              >
                <Download size={20} />
                Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative aspect-[4/5] max-h-[700px] w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl border-4 border-card glow-gold">
              {/* Fallback color while image loads */}
              <div className="absolute inset-0 bg-card -z-10" />
              <img 
                src={heroImg} 
                alt="Yvonne De Guzman" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Floating badges overlay */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-4 bg-card/90 backdrop-blur border border-border p-4 rounded-xl shadow-xl hidden lg:flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <SiShopify size={24} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Certified</p>
                  <p className="font-bold text-white text-sm">Shopify Partner</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-24 relative border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-24">
            {[
              { num: 5, suffix: "+", label: "Years Remote Experience" },
              { num: 100, suffix: "+", label: "Projects Delivered" },
              { num: 10, suffix: "+", label: "Platforms Managed" },
              { num: 100, suffix: "%", label: "International Clients" }, // 100% instead of 'International' for number counter
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left border-l-2 border-primary/20 pl-6"
              >
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 flex items-baseline">
                  <AnimatedCounter value={stat.num} suffix={stat.suffix} />
                </h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <SectionHeading>Bridging the Gap Between Technical Expertise & Operational Strategy</SectionHeading>
            <div className="space-y-6 text-lg text-muted-foreground md:text-xl leading-relaxed text-center md:text-justify mt-12">
              <p>
                I am an ecommerce operations consultant and Shopify specialist with over 5 years of experience helping international brands streamline their businesses and scale effectively. Based in Angeles, Pampanga, Philippines, I bridge the gap between technical expertise and operational strategy.
              </p>
              <p>
                My approach is proactive and results-driven. I don't just manage tasks — I build and optimize systems. From setting up and managing complex inventory across multi-channels like CIN7 to automating repetitive workflows with Zapier and n8n, my focus is on operational efficiency. I provide data-driven solutions to technical challenges, freeing business owners to focus on growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience Timeline */}
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <SectionHeading>Professional Journey</SectionHeading>
          
          <div className="mt-20 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            {[
              {
                time: "Present",
                title: "Shopify Expert & Technical Virtual Assistant",
                desc: "Providing high-level consultancy and technical operations management, automating workflows, optimizing SEO, and managing multi-channel ecommerce ecosystems.",
                active: true
              },
              {
                time: "2.5 Years of Experience",
                title: "Order Entry Specialist",
                desc: "Gained experience in high-volume, multi-platform order processing using systems like SAP and CIN7, focusing on data accuracy and efficiency."
              },
              {
                time: "1 Year of Experience",
                title: "Front-End Developer",
                desc: "Developed skills in HTML5, CSS3, and JavaScript, contributing to website maintenance and landing page optimization."
              },
              {
                time: "4.5 Years of Experience",
                title: "Shopify Virtual Assistant",
                desc: "Transitioned into ecommerce operations, managing product listings, order fulfillment, and first-tier customer support on the Shopify platform."
              },
              {
                time: "1 Year of Experience",
                title: "Facebook Ad Designer",
                desc: "Started in visual content creation for ecommerce advertising, focusing on high-converting creative."
              }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-12">
                
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-[20px] md:-translate-x-1/2 ${
                  item.active ? 'bg-primary text-primary-foreground' : 'bg-card border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors'
                } z-10`}>
                  {item.active ? <Briefcase size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>

                {/* Card */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-md transition-all ml-12 md:ml-0"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <span className={`text-sm font-semibold tracking-wide uppercase ${item.active ? 'text-primary' : 'text-secondary'}`}>
                      {item.time}
                    </span>
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </motion.div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Projects */}
      <section id="projects" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionHeading align="left">Featured Projects</SectionHeading>
              <p className="text-muted-foreground text-lg max-w-2xl mt-4">
                A selection of businesses where I've optimized operations, resolved technical friction, and driven measurable efficiency.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-white transition-colors pb-2 border-b-2 border-primary hover:border-white w-fit">
              View All Work <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Flooring Works",
                role: "Shopify Expert",
                img: project1Img,
                bullets: ["SEO & Product Optimization", "Inventory Management", "Multi-Channel Integrations", "Quote Management"],
                tags: ["Shopify", "Figma", "CSS3", "JavaScript"]
              },
              {
                title: "EverFloor",
                role: "Operations Consultant",
                img: project2Img,
                bullets: ["Order Process Automation", "CIN7 Inventory Management", "Product Database Cleanup", "Workflow Improvements"],
                tags: ["Zapier", "CIN7", "Shopify", "Notion"]
              },
              {
                title: "Woodspace",
                role: "Ecommerce Specialist",
                img: project3Img,
                bullets: ["WordPress/WooCommerce Maintenance", "Landing Page Development", "Technical SEO Audits", "Data Analytics"],
                tags: ["WordPress", "Analytics", "WooCommerce"]
              }
            ].map((project, i) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-card border-b border-border">
                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-display font-bold text-white mb-1">{project.title}</h4>
                      <p className="text-primary text-sm font-medium">{project.role}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6 mt-2 flex-grow">
                    {project.bullets.map((bullet, j) => (
                      <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-primary mt-1 text-[10px]">■</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-card border border-border rounded text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button disabled className="mt-auto w-full py-3 bg-card border border-border rounded font-semibold text-muted-foreground cursor-not-allowed group-hover:border-primary/30 transition-colors flex items-center justify-center gap-2">
                    Case Study Coming Soon
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Services */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading>Core Competencies</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { icon: ShoppingCart, title: "Shopify Management", desc: "Complete store administration, theme customization, and multi-channel integration." },
              { icon: Settings, title: "Website Maintenance", desc: "Regular updates, feature implementation, and troubleshooting for Shopify & WordPress." },
              { icon: LineChart, title: "Technical SEO", desc: "Optimize technical structure, page load speeds, and manage data for search rankings." },
              { icon: Cpu, title: "Workflow Automation", desc: "Custom workflows using Zapier, n8n, and Claude Code to save time and reduce errors." },
              { icon: Briefcase, title: "Inventory Management", desc: "Setup and management across multiple channels using ERPs like SAP, CIN7, and Zoho." },
              { icon: Laptop, title: "Order Processing", desc: "Streamline multi-channel order entry and fulfillment processes ensuring accuracy." },
              { icon: Headset, title: "Technical Support", desc: "Premium, dedicated assistance for complex issues within the ecommerce ecosystem." },
              { icon: Code, title: "Frontend Development", desc: "Custom theme development, landing page building, and dynamic frontend features." }
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-card/50 border border-border p-6 rounded-2xl hover:bg-card hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <service.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technical Skills */}
      <section className="py-24 border-y border-border/50 bg-card/30 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h3 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-8">Technical Arsenal</h3>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Shopify", "WordPress", "WooCommerce", "HTML5", "CSS3", "JavaScript", 
              "Liquid", "SAP", "CIN7", "Zoho", "Git", "GitHub", "Netlify", 
              "Canva", "Figma", "Slack", "Notion", "Google Workspace", 
              "Zapier", "n8n", "Claude Code"
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-4 py-2 bg-background border border-border rounded-full text-white/80 hover:text-white hover:border-secondary hover:bg-secondary/10 transition-colors text-sm font-medium cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight"
          >
            Ready to Elevate Your <br />
            <span className="text-gradient">Ecommerce Operations?</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how I can help you streamline systems, improve efficiency, and scale your international business.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-bold rounded-lg text-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(234,179,8,0.3)]"
          >
            Start the Conversation
          </a>
        </div>
      </section>

      {/* 9. Contact Section */}
      <section id="contact" className="py-24 bg-card/30 border-t border-border/50">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-muted-foreground text-lg mb-12">
                Whether you have a specific project in mind or need ongoing operational support, I'm here to help. Reach out directly or fill out the form.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:vvonlang@gmail.com" className="flex items-center gap-4 text-white/90 hover:text-primary transition-colors p-4 bg-background border border-border rounded-xl hover:border-primary/50 group">
                  <div className="w-12 h-12 bg-card rounded flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold font-display tracking-wide">vvonlang@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/yvonne-de-guzman-83081a197" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/90 hover:text-[#0077b5] transition-colors p-4 bg-background border border-border rounded-xl hover:border-[#0077b5]/50 group">
                  <div className="w-12 h-12 bg-card rounded flex items-center justify-center text-primary group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
                    <p className="font-semibold font-display">Yvonne De Guzman</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 text-white/90 p-4 bg-background border border-border rounded-xl">
                  <div className="w-12 h-12 bg-card rounded flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-semibold font-display">Angeles, Pampanga, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea 
                    id="message" 
                    required
                    rows={5}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-background hover:bg-primary hover:text-primary-foreground font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <a href="#" className="text-xl font-bold tracking-widest font-display text-white group flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground">
              Y
            </div>
            DEGUZMAN
          </a>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-white transition-colors">Projects</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-white transition-colors">Services</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-1">
              Resume <ExternalLink size={12} />
            </a>
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© {new Date().getFullYear()} Yvonne De Guzman.</p>
            <p>All Rights Reserved. Angeles City, PH.</p>
          </div>
          
        </div>
      </footer>
      
    </div>
  );
}
