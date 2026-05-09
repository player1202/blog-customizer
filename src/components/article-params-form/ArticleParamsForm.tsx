import { useState } from 'react';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { ArrowButton } from 'src/ui/arrow-button';
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  ArticleStateType,
  OptionType,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
  isOpen: boolean;
  onToggle: () => void;
  onApply: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ isOpen, onToggle, onApply }: ArticleParamsFormProps) => {
  const [tempSettings, setTempSettings] = useState<ArticleStateType>(defaultArticleState);

  const updateTempSettings = (newSettings: Partial<ArticleStateType>) => {
    setTempSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleApply = () => {
    onApply(tempSettings);
    onToggle(); // Закрываем сайдбар после применения
  };

  const handleReset = () => {
    setTempSettings(defaultArticleState);
    onApply(defaultArticleState);
    onToggle(); // Закрываем сайдбар после сброса
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />

      {isOpen && (
        <div className={styles.overlay} onClick={onToggle}>
          <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <form className={styles.form}>
              <div className={styles.content}>
                <Select
                  selected={tempSettings.fontFamilyOption}
                  options={fontFamilyOptions}
                  title="Шрифт"
                  onChange={(option: OptionType) =>
                    updateTempSettings({ fontFamilyOption: option })
                  }
                />

                <Select
                  selected={tempSettings.fontSizeOption}
                  options={fontSizeOptions}
                  title="Размер шрифта"
                  onChange={(option: OptionType) => updateTempSettings({ fontSizeOption: option })}
                />

                <Select
                  selected={tempSettings.fontColor}
                  options={fontColors}
                  title="Цвет текста"
                  onChange={(option: OptionType) => updateTempSettings({ fontColor: option })}
                />

                <Select
                  selected={tempSettings.backgroundColor}
                  options={backgroundColors}
                  title="Цвет фона"
                  onChange={(option: OptionType) => updateTempSettings({ backgroundColor: option })}
                />

                <Select
                  selected={tempSettings.contentWidth}
                  options={contentWidthArr}
                  title="Ширина контента"
                  onChange={(option: OptionType) => updateTempSettings({ contentWidth: option })}
                />
              </div>

              <Separator />

              <div className={styles.actions}>
                <Button type="apply" title="Применить" onClick={handleApply} />
                <Button type="clear" title="Сбросить" onClick={handleReset} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
