import { useState, FormEvent, useEffect, useRef } from 'react';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { ArrowButton } from 'src/ui/arrow-button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
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
  onSettingsChange: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onSettingsChange }: ArticleParamsFormProps) => {
  const [tempSettings, setTempSettings] = useState<ArticleStateType>(defaultArticleState);
  const [appliedSettings, setAppliedSettings] = useState<ArticleStateType>(defaultArticleState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSettingsChange(appliedSettings);
  }, [appliedSettings, onSettingsChange]);

  useOutsideClickClose({
    isOpen: isSidebarOpen,
    rootRef: sidebarRef,
    onClose: () => setIsSidebarOpen(false),
    onChange: (newValue: boolean) => setIsSidebarOpen(newValue),
  });

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSidebarOpen]);

  const updateTempSettings = (newSettings: Partial<ArticleStateType>) => {
    setTempSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedSettings(tempSettings);
    setIsSidebarOpen(false);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTempSettings(defaultArticleState);
    setAppliedSettings(defaultArticleState);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

      {isSidebarOpen && (
        <div className={styles.overlay}>
          <div ref={sidebarRef} className={styles.sidebar}>
            <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
              <h2 className={styles.title}>Задайте параметры</h2>

              <Select
                selected={tempSettings.fontFamilyOption}
                options={fontFamilyOptions}
                title="Шрифт"
                onChange={(option: OptionType) => updateTempSettings({ fontFamilyOption: option })}
              />

              <RadioGroup
                name="fontSize"
                options={fontSizeOptions}
                selected={tempSettings.fontSizeOption}
                title="Размер шрифта"
                onChange={(option: OptionType) => updateTempSettings({ fontSizeOption: option })}
              />

              <Select
                selected={tempSettings.fontColor}
                options={fontColors}
                title="Цвет шрифта"
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

              <Separator />

              <div className={styles.actions}>
                <Button type="clear" title="Сбросить" htmlType="reset" />
                <Button type="apply" title="Применить" htmlType="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
