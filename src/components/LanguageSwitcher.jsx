
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  useEffect(() => {
    const language = i18n.language;

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <select
      value={i18n.language}
      onChange={(event) =>
        changeLanguage(event.target.value)
      }
      className="h-9 rounded-md border bg-background px-3 text-sm text-foreground"
      aria-label="Language"
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="ar">AR</option>
    </select>
  );
}

export default LanguageSwitcher;
