import { useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';
import styles from './app.module.scss';
export const App = () => {
  const [settings, setSettings] = useState<ArticleStateType>(defaultArticleState);

  const handleSettingsChange = (newSettings: ArticleStateType) => {
    setSettings(newSettings);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': settings.fontFamilyOption.value,
          '--font-size': settings.fontSizeOption.value,
          '--font-color': settings.fontColor.value,
          '--container-width': settings.contentWidth.value,
          '--bg-color': settings.backgroundColor.value,
        } as CSSProperties
      }
    >
      <Article />
      <ArticleParamsForm onSettingsChange={handleSettingsChange} />
    </main>
  );
};
