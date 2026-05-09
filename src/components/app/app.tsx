import { useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
  const [appliedSettings, setAppliedSettings] = useState<ArticleStateType>(defaultArticleState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleApplySettings = (settings: ArticleStateType) => {
    setAppliedSettings(settings);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
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
      <ArticleParamsForm
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onApply={handleApplySettings}
      />
    </main>
  );
};
