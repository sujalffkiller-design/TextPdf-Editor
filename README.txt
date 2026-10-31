TEXT-PDF EDITOR PRO — FIXED PREVIEW BUILD

1. Extract this ZIP.
2. Open the folder in VS Code.
3. Run index.html using Live Server (not file://).
4. Open a text-based PDF.
5. Tap/click a detected text line. The Apply button becomes enabled.
6. Change the text and press Apply text changes. The preview should now show the replacement in visible text.
7. Press Download PDF to save.

Important:
- This is a visual overlay/reconstruction method, not native PDF text-object editing.
- It currently uses a white cover behind replaced text; colored/background PDF areas may not look right.
- Scanned PDFs need OCR, which is not included.
- Offline caching requires one successful online visit over localhost/HTTPS so the service worker can cache the CDN libraries.
