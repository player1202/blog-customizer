import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  ArticleStateType,
  OptionType,
} from './../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
interface ArticleParamsFormProps {
  settings: ArticleStateType;
  updateSettings: (newSettings: Partial<ArticleStateType>) => void;
  applySettings: () => void;
  resetSettings: () => void;
  closeSidebar: () => void;
}

export const ArticleParamsForm = ({
  settings,
  updateSettings,
  applySettings,
  resetSettings,
  closeSidebar,
}: ArticleParamsFormProps) => {
  const handleApply = () => {
    applySettings();
  };

  const handleClear = () => {
    resetSettings();
  };

  return (
    <form className={styles.form}>
      <div className={styles.header}>
        <h2 className={styles.title}>Настройки статьи</h2>
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeSidebar}
          aria-label="Закрыть"
        >
          ✕
        </button>
      </div>

      <div className={styles.content}>
        <Select
          selected={settings.fontFamilyOption}
          options={fontFamilyOptions}
          title="Шрифт"
          onChange={(option: OptionType) => updateSettings({ fontFamilyOption: option })}
        />

        <Select
          selected={settings.fontSizeOption}
          options={fontSizeOptions}
          title="Размер шрифта"
          onChange={(option: OptionType) => updateSettings({ fontSizeOption: option })}
        />

        <Select
          selected={settings.fontColor}
          options={fontColors}
          title="Цвет текста"
          onChange={(option: OptionType) => updateSettings({ fontColor: option })}
        />

        <Select
          selected={settings.backgroundColor}
          options={backgroundColors}
          title="Цвет фона"
          onChange={(option: OptionType) => updateSettings({ backgroundColor: option })}
        />

        <Select
          selected={settings.contentWidth}
          options={contentWidthArr}
          title="Ширина контента"
          onChange={(option: OptionType) => updateSettings({ contentWidth: option })}
        />
      </div>

      <Separator />

      <div className={styles.actions}>
        <Button type="apply" title="Применить" onClick={handleApply} />
        <Button type="clear" title="Сбросить" onClick={handleClear} />
      </div>
    </form>
  );
};
