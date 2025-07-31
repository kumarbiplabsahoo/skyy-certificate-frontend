import { FiBold, FiEdit2, FiItalic, FiSave, FiUnderline } from "react-icons/fi";
import styles from "./textEditer.module.css";
import { useState } from "react";
import { UseSingle } from "../../hooks/useSingle";

export default function TextEditer({
  text,
  setText,
  fontFamily,
  setFontFamily,
  textColor,
  setTextColor,
  placeholders,
  generatedText,
}) {
  const { isEditing, setIsEditing, UpdateTextTemp } = UseSingle();
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  // Handle text selection changes
  const handleTextSelection = (e) => {
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  const insertPlaceholder = (placeholder) => {
    const { start, end } = selection;

    setText(
      (prev) => prev.substring(0, start) + placeholder + prev.substring(end)
    );

    setTimeout(() => {
      const textarea = document.querySelector(`.${styles.textInput}`);
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(
          start + placeholder.length,
          start + placeholder.length
        );
      }
    }, 0);
  };

  // Util to wrap selected text
  const wrapSelectedText = (beforeTag, afterTag) => {
    const { start, end } = selection;
    const selected = text.slice(start, end);
    if (!selected) return;

    const newText =
      text.slice(0, start) + beforeTag + selected + afterTag + text.slice(end);
    setText(newText);

    setTimeout(() => {
      const textarea = document.querySelector(`.${styles.textInput}`);
      if (textarea) {
        const pos =
          start + beforeTag.length + selected.length + afterTag.length;
        textarea.focus();
        textarea.setSelectionRange(pos, pos);
      }
    }, 0);
  };

  // Toggle inline formatting
  const toggleFontStyle = (style) => {
    switch (style) {
      case "bold":
        wrapSelectedText("<strong>", "</strong>");
        break;
      case "italic":
        wrapSelectedText("<em>", "</em>");
        break;
      case "underline":
        wrapSelectedText(
          `<span style="text-decoration:underline;">`,
          "</span>"
        );
        break;
      default:
        break;
    }
  };

  // Apply selected color to text
  const applyColorToSelection = (color) => {
    const { start, end } = selection;
    const selected = text.slice(start, end);
    if (!selected) return;

    const styled = `<span style="color:${color};">${selected}</span>`;
    const newText = text.slice(0, start) + styled + text.slice(end);
    setText(newText);

    setTimeout(() => {
      const textarea = document.querySelector(`.${styles.textInput}`);
      if (textarea) {
        const pos = start + styled.length;
        textarea.focus();
        textarea.setSelectionRange(pos, pos);
      }
    }, 0);
  };

  return (
    <div className={styles.topBox}>
      <div className={styles.topBoxHeader}>
        <h3>Text Editor</h3>
        <div className={styles.toolbar}>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className={styles.fontSelect}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <div className={styles.formatButtons}>
            <button
              onClick={() => toggleFontStyle("bold")}
              className={styles.formatButton}
              title="Bold"
            >
              <FiBold />
            </button>
            <button
              onClick={() => toggleFontStyle("italic")}
              className={styles.formatButton}
              title="Italic"
            >
              <FiItalic />
            </button>
            <button
              onClick={() => toggleFontStyle("underline")}
              className={styles.formatButton}
              title="Underline"
            >
              <FiUnderline />
            </button>
          </div>
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              applyColorToSelection(e.target.value);
            }}
            className={styles.colorPicker}
          />
        </div>
        <div className={styles.controls}>
          <button
            onClick={() => {
              if (isEditing) {
                UpdateTextTemp(text); // Save the content when editing is finished
              }
              setIsEditing((prev) => !prev);
            }}
            className={styles.toggleButton}
          >
            {isEditing ? (
              <>
                <FiSave className={styles.icon} /> Save
              </>
            ) : (
              <>
                <FiEdit2 className={styles.icon} /> Edit
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.placeholderPanel}>
        <h4>Available Placeholders:</h4>
        <div className={styles.placeholderGrid}>
          {placeholders.map((ph) => (
            <button
              key={ph.key}
              onClick={() => insertPlaceholder(ph.display)}
              className={styles.placeholderTag}
              title={`Insert ${ph.display}`}
            >
              {ph.display}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className={styles.textInput}
        value={isEditing ? text : generatedText}
        onChange={(e) => setText(e.target.value)}
        disabled={!isEditing}
        onSelect={handleTextSelection}
        placeholder="Type your certificate content here..."
      />
    </div>
  );
}
