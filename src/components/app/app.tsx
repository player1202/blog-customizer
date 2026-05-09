// src/components/app/app.tsx
import { useState, useEffect, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { ArrowButton } from 'src/ui/arrow-button';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
  const [appliedSettings, setAppliedSettings] = useState<ArticleStateType>(defaultArticleState);
  const [tempSettings, setTempSettings] = useState<ArticleStateType>(defaultArticleState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const applySettings = () => {
    setAppliedSettings(tempSettings);
    setIsSidebarOpen(false);
  };

  const resetSettings = () => {
    setTempSettings(defaultArticleState);
    setAppliedSettings(defaultArticleState);
    setIsSidebarOpen(false);
  };

  const updateTempSettings = (newSettings: Partial<ArticleStateType>) => {
    setTempSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  return (
    <>
      <main
        className={clsx(styles.main)}
        style={
          {
            '--font-family': appliedSettings.fontFamilyOption.value,
            '--font-size': appliedSettings.fontSizeOption.value,
            '--font-color': appliedSettings.fontColor.value,
            '--container-width': appliedSettings.contentWidth.value,
            '--bg-color': appliedSettings.backgroundColor.value,
          } as CSSProperties
        }
      >
        <Article />
      </main>

      <ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}>
          <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <ArticleParamsForm
              settings={tempSettings}
              updateSettings={updateTempSettings}
              applySettings={applySettings}
              resetSettings={resetSettings}
              closeSidebar={toggleSidebar}
            />
          </div>
        </div>
      )}
    </>
  );
};
