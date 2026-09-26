import { useState, useEffect } from 'react';
import { Project, Language } from './types';
import { INITIAL_PROJECTS } from './data/initialProjects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ProjectModal } from './components/ProjectModal';
import { PostProjectModal } from './components/PostProjectModal';
import { BatchUploaderModal } from './components/BatchUploaderModal';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesSection } from './components/ServicesSection';
import { CostEstimator } from './components/CostEstimator';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';
import { getAllProjectImages, saveProjectImage } from './utils/imageStore';

// Dedicated key for sanitized text metadata only
const STORAGE_KEY = 'vandana_graphic_portfolio_metadata_v1';

// Helper to sanitize projects before saving to localStorage to prevent quota exhaustion
function sanitizeProjectsForStorage(list: Project[]): Project[] {
  return list.map((p) => {
    const isBase64 = p.coverImage?.startsWith('data:');
    return {
      ...p,
      // Never store raw megabytes of base64 in localStorage
      coverImage: isBase64 ? '' : p.coverImage,
      galleryImages: p.galleryImages?.filter((img) => !img.startsWith('data:')),
    };
  });
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [projects, setProjects] = useState<Project[]>(() => {
    // Purge old bloated keys from prior turns to instantly free browser quota
    try {
      [
        'vandana_graphic_portfolio_projects',
        'vandana_graphic_portfolio_projects_v2',
        'vandana_graphic_portfolio_projects_v3',
        'vandana_graphic_portfolio_projects_v4',
      ].forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch {
          // ignore
        }
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Restore default image paths if coverImage was stripped for storage
          return parsed.map((item: Project) => {
            const defaultMatch = INITIAL_PROJECTS.find((ip) => ip.id === item.id);
            return {
              ...item,
              coverImage: item.coverImage || defaultMatch?.coverImage || '',
              galleryImages:
                item.galleryImages && item.galleryImages.length > 0
                  ? item.galleryImages
                  : defaultMatch?.galleryImages || [],
            };
          });
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBatchUploaderOpen, setIsBatchUploaderOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [postDefaultCategory, setPostDefaultCategory] = useState<Project['category']>('Branding');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [contactInitialMessage, setContactInitialMessage] = useState('');

  // On mount, load any custom uploaded artwork photos from IndexedDB
  useEffect(() => {
    getAllProjectImages()
      .then((customImages) => {
        if (Object.keys(customImages).length > 0) {
          setProjects((prev) =>
            prev.map((proj) => {
              if (customImages[proj.id]) {
                return { ...proj, coverImage: customImages[proj.id] };
              }
              return proj;
            })
          );
        }
      })
      .catch((err) => {
        console.warn('Error fetching IndexedDB images:', err);
      });
  }, []);

  // Persist project text metadata safely without bloated base64 data
  useEffect(() => {
    try {
      const sanitized = sanitizeProjectsForStorage(projects);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch (err) {
      console.warn('LocalStorage save attempt reached quota, cleaning old keys:', err);
      try {
        // Clean up any other storage keys that may be consuming quota
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key !== STORAGE_KEY && key.startsWith('vandana_')) {
            localStorage.removeItem(key);
          }
        }
        const sanitized = sanitizeProjectsForStorage(projects);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (innerErr) {
        console.warn('Unable to persist to localStorage, running with in-memory state:', innerErr);
      }
    }
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleOpenPostModal = (category?: Project['category']) => {
    setEditingProject(null);
    if (category) setPostDefaultCategory(category);
    setIsPostModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsPostModalOpen(true);
  };

  const handleSaveProject = async (projectData: Project) => {
    // If the coverImage is a user-uploaded base64 file, save it into IndexedDB
    if (projectData.coverImage?.startsWith('data:')) {
      await saveProjectImage(projectData.id, projectData.coverImage);
    }

    setProjects((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === projectData.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = projectData;
        return updated;
      }
      return [projectData, ...prev];
    });

    if (selectedProject?.id === projectData.id) {
      setSelectedProject(projectData);
    }

    showToast(
      editingProject
        ? lang === 'hi'
          ? 'प्रोजेक्ट सफलतापूर्वक अपडेट हो गया!'
          : 'Project updated successfully!'
        : lang === 'hi'
        ? 'नया प्रोजेक्ट सफलतापूर्वक पोस्ट किया गया!'
        : 'New project published to your portfolio!'
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
    showToast(lang === 'hi' ? 'प्रोजेक्ट हटा दिया गया।' : 'Project removed.');
  };

  const handleImportProjects = (imported: Project[]) => {
    setProjects(imported);
    showToast(lang === 'hi' ? 'प्रोजेक्ट्स सफलतापूर्वक आयात हुए!' : 'Projects successfully imported!');
  };

  const handleResetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    showToast(lang === 'hi' ? 'डिफ़ॉल्ट प्रोजेक्ट्स रीसेट किए गए।' : 'Reset to default projects.');
  };

  // Instant single-click upload from project card camera icon
  const handleQuickUploadImage = async (projectId: string, file: File) => {
    try {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      await saveProjectImage(projectId, dataUrl);

      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === projectId ? { ...proj, coverImage: dataUrl } : proj
        )
      );

      if (selectedProject?.id === projectId) {
        setSelectedProject((prev) => (prev ? { ...prev, coverImage: dataUrl } : null));
      }

      showToast(
        lang === 'hi'
          ? 'प्रोजेक्ट की तस्वीर बदल दी गई!'
          : 'Artwork photo updated successfully!'
      );
    } catch (err) {
      console.error('Failed to update project image:', err);
    }
  };

  // Bulk matching upload completed
  const handleBatchImagesApplied = (updatedMap: Record<string, string>) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (updatedMap[proj.id]) {
          return { ...proj, coverImage: updatedMap[proj.id] };
        }
        return proj;
      })
    );

    const count = Object.keys(updatedMap).length;
    showToast(
      lang === 'hi'
        ? `${count} प्रोजेक्ट्स की तस्वीरें अपडेट हो गईं!`
        : `Successfully updated ${count} project artworks!`
    );
  };

  // Next / Previous Project Navigation in Case Study modal
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  const handleCostEstimatorInquiry = (summary: string) => {
    setContactInitialMessage(
      `Project Scope Estimate:\n${summary}\n\nPlease let me know project start date and next steps.`
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setContactInitialMessage(
      `Hello Vandana, I would like to inquire about booking the "${serviceTitle}" service package.`
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-amber-400 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-900 border border-amber-400/80 text-white rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 3-Zone Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenPostModal={() => handleOpenPostModal()}
        onOpenBatchUploader={() => setIsBatchUploaderOpen(true)}
      />

      <main>
        {/* Editorial Split Hero */}
        <Hero
          lang={lang}
          onOpenPostModal={() => handleOpenPostModal()}
          totalProjects={projects.length}
        />

        {/* Selected Portfolio Works Grid & Filter System */}
        <PortfolioGrid
          projects={projects}
          lang={lang}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onOpenPostModal={handleOpenPostModal}
          onOpenBatchUploader={() => setIsBatchUploaderOpen(true)}
          onQuickUploadImage={handleQuickUploadImage}
        />

        {/* Before and After Brand Redesign Transformation Slider */}
        <BeforeAfterSlider lang={lang} />

        {/* Design Services & Deliverables */}
        <ServicesSection lang={lang} onSelectService={handleServiceSelect} />

        {/* Interactive Scope & Cost Estimator */}
        <CostEstimator lang={lang} onInquireEmail={handleCostEstimatorInquiry} />

        {/* About the Designer, Bio, Avatar & Software Arsenal */}
        <AboutSection lang={lang} />

        {/* Direct Contact & Hire Inquiry */}
        <ContactSection lang={lang} initialMessage={contactInitialMessage} />
      </main>

      {/* Editorial Footer with JSON Data Backup / Restore */}
      <Footer
        lang={lang}
        projects={projects}
        onImportProjects={handleImportProjects}
        onResetProjects={handleResetProjects}
        onShowToast={showToast}
      />

      {/* Case Study Fullscreen Lightbox Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
          onEdit={(proj) => {
            setSelectedProject(null);
            handleEditProject(proj);
          }}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}

      {/* Post / Edit Single Project Modal */}
      <PostProjectModal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editingProject={editingProject}
        defaultCategory={postDefaultCategory}
        lang={lang}
      />

      {/* Bulk Artwork Files Uploader Modal */}
      <BatchUploaderModal
        isOpen={isBatchUploaderOpen}
        onClose={() => setIsBatchUploaderOpen(false)}
        projects={projects}
        onImagesApplied={handleBatchImagesApplied}
        lang={lang}
      />
    </div>
  );
}
