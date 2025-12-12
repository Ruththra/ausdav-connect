import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Sample announcements
const announcements = [
  { id: 1, en: '📚 A/L Exam Preparation Seminar - January 2025', ta: '📚 உ.த. தேர்வு தயாரிப்பு கருத்தரங்கு - ஜனவரி 2025' },
  { id: 2, en: '🩸 Blood Donation Camp - Save Lives Today', ta: '🩸 இரத்ததான முகாம் - இன்றே உயிர்களைக் காப்பாற்றுங்கள்' },
  { id: 3, en: '🌳 Anbuchangamam Tree Planting Event - Join Us!', ta: '🌳 அன்புசங்கமம் மரம் நடும் நிகழ்வு - எங்களுடன் இணையுங்கள்!' },
];

// Sample events for the tree
const annualEvents = [
  { id: 1, month: 'Jan', en: 'A/L Exam Prep Seminar', ta: 'உ.த. தேர்வு தயாரிப்பு கருத்தரங்கு' },
  { id: 2, month: 'Mar', en: 'Career Guidance Workshop', ta: 'தொழில் வழிகாட்டுதல் பட்டறை' },
  { id: 3, month: 'May', en: 'University Orientation', ta: 'பல்கலைக்கழக நோக்குநிலை' },
  { id: 4, month: 'Jul', en: 'Anbuchangamam', ta: 'அன்புசங்கமம்' },
  { id: 5, month: 'Sep', en: 'Blood Donation Camp', ta: 'இரத்ததான முகாம்' },
  { id: 6, month: 'Nov', en: 'Annual Award Ceremony', ta: 'வருடாந்த விருது வழங்கல்' },
];

// Sample committee members
const committeePreview = [
  { id: 1, role: 'President', roleTA: 'தலைவர்', name: 'Dr. K. Suresh', batch: '2015' },
  { id: 2, role: 'Secretary', roleTA: 'செயலாளர்', name: 'Ms. T. Priya', batch: '2018' },
  { id: 3, role: 'Treasurer', roleTA: 'பொருளாளர்', name: 'Mr. S. Rajan', batch: '2017' },
];

const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [feedbackForm, setFeedbackForm] = useState({ name: '', contact: '', message: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.message.trim()) {
      toast.error(language === 'en' ? 'Please enter a message' : 'தயவுசெய்து செய்தியை உள்ளிடவும்');
      return;
    }
    toast.success(t('home.feedback.success'));
    setFeedbackForm({ name: '', contact: '', message: '' });
  };

  return (
    <div>
      {/* Announcement Ticker */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0">
              {language === 'en' ? 'NEWS' : 'செய்தி'}
            </span>
            <div className="overflow-hidden flex-1">
              <motion.p
                key={currentAnnouncement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-sm whitespace-nowrap"
              >
                {language === 'en' 
                  ? announcements[currentAnnouncement].en 
                  : announcements[currentAnnouncement].ta}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(45_93%_58%/0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(45_93%_58%/0.2),transparent_40%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-glow">
              <span className="text-4xl font-serif font-bold text-primary">A</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/about">
                  {t('home.hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/events">
                  {t('nav.events')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                <span>{language === 'en' ? 'About Us' : 'எங்களைப் பற்றி'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                {t('home.who.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('home.who.description')}
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/about">
                  {language === 'en' ? 'Learn More' : 'மேலும் அறிய'}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <BookOpen className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <p className="text-foreground font-medium">
                      {language === 'en' ? 'Empowering Education' : 'கல்வியை வலுப்படுத்துதல்'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: language === 'en' ? 'Seminars' : 'கருத்தரங்குகள்' },
                  { icon: Users, label: language === 'en' ? 'Mentorship' : 'வழிகாட்டுதல்' },
                  { icon: Calendar, label: language === 'en' ? 'Events' : 'நிகழ்வுகள்' },
                  { icon: MessageSquare, label: language === 'en' ? 'Support' : 'ஆதரவு' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <item.icon className="w-8 h-8 text-secondary mb-3" />
                    <p className="font-medium text-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                <span>{language === 'en' ? 'Our Programs' : 'எங்கள் திட்டங்கள்'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                {t('home.what.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('home.what.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Annual Events Tree */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.events.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Our year-round activities designed to support and develop students' 
                : 'மாணவர்களை ஆதரிக்கவும் வளர்க்கவும் வடிவமைக்கப்பட்ட எங்கள் ஆண்டு முழுவதும் செயல்பாடுகள்'}
            </p>
          </motion.div>

          {/* Tree Structure */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary -translate-x-1/2" />
            
            <div className="space-y-8">
              {annualEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex items-center gap-4 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block bg-card rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ${idx % 2 === 0 ? 'mr-4' : 'ml-4'}`}>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{event.month}</span>
                      <p className="font-medium text-foreground mt-1">
                        {language === 'en' ? event.en : event.ta}
                      </p>
                    </div>
                  </div>
                  
                  {/* Center Node */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-secondary shadow-glow flex-shrink-0" />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Committee Preview */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              {t('home.committee.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {committeePreview.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-serif font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-primary-foreground text-lg">
                  {member.name}
                </h3>
                <p className="text-secondary font-medium">
                  {language === 'en' ? member.role : member.roleTA}
                </p>
                <p className="text-primary-foreground/60 text-sm mt-1">
                  {language === 'en' ? 'Batch' : 'தொகுதி'} {member.batch}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/committee">
                {t('home.committee.viewAll')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <MessageSquare className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                {t('home.feedback.title')}
              </h2>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleFeedbackSubmit}
              className="bg-card rounded-xl p-6 md:p-8 shadow-lg space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t('home.feedback.name')}
                  </label>
                  <Input
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                    placeholder={language === 'en' ? 'John Doe' : 'உங்கள் பெயர்'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {t('home.feedback.contact')}
                  </label>
                  <Input
                    value={feedbackForm.contact}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, contact: e.target.value })}
                    placeholder={language === 'en' ? 'email@example.com' : 'மின்னஞ்சல்'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t('home.feedback.message')} *
                </label>
                <Textarea
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  placeholder={language === 'en' ? 'Share your thoughts...' : 'உங்கள் எண்ணங்களைப் பகிரவும்...'}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" variant="donate" className="w-full">
                {t('home.feedback.submit')}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
