import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.70.2:0',
  releaseNotes: {
    en_US: `Updated ChangeDetection.io to 0.70.2.

- Fixes custom WebSocket browser connections failing on watches without browser steps.
- Adds an optional MCP server with access tokens, permissions, and OAuth sign-in for assistants.
- Adds a notification setup widget and improves PDF history, price detection, and watch history loading.
- Fixes excessive rechecking after imports or restores, stale HTTP status reporting, notification templates, and AI settings saves.
- Includes security fixes for notification regular expressions and browser proxy credential handling.

Back up before updating. Downgrades are blocked; returning to an older version requires restoring a backup made with that version.

Full upstream changes: https://github.com/dgtlmoon/changedetection.io/compare/0.60.9...0.70.2`,
    es_ES: `Actualiza ChangeDetection.io a 0.70.2.

- Corrige los fallos de las conexiones de navegador WebSocket en vigilancias sin pasos del navegador.
- Añade un servidor MCP opcional con tokens de acceso, permisos e inicio de sesión OAuth para asistentes.
- Añade un asistente para configurar notificaciones y mejora el historial de PDF, la detección de precios y la carga del historial.
- Corrige las comprobaciones excesivas tras importar o restaurar, los estados HTTP desactualizados, las plantillas de notificación y el guardado de ajustes de IA.
- Incluye correcciones de seguridad para expresiones regulares en notificaciones y credenciales de proxy del navegador.

Haz una copia de seguridad antes de actualizar. Las versiones anteriores están bloqueadas; para volver a una debes restaurar una copia creada con esa versión.

Todos los cambios de upstream: https://github.com/dgtlmoon/changedetection.io/compare/0.60.9...0.70.2`,
    de_DE: `Aktualisiert ChangeDetection.io auf 0.70.2.

- Behebt Fehler bei benutzerdefinierten WebSocket-Browserverbindungen für Überwachungen ohne Browserschritte.
- Fügt einen optionalen MCP-Server mit Zugriffstoken, Berechtigungen und OAuth-Anmeldung für Assistenten hinzu.
- Fügt eine Einrichtungshilfe für Benachrichtigungen hinzu und verbessert PDF-Verlauf, Preiserkennung und das Laden des Überwachungsverlaufs.
- Behebt übermäßige Prüfungen nach Import oder Wiederherstellung, veraltete HTTP-Statusanzeigen, Benachrichtigungsvorlagen und das Speichern von KI-Einstellungen.
- Enthält Sicherheitskorrekturen für reguläre Ausdrücke in Benachrichtigungen und Browser-Proxy-Zugangsdaten.

Erstellen Sie vor dem Update ein Backup. Downgrades sind gesperrt; zur Rückkehr ist ein mit der älteren Version erstelltes Backup wiederherzustellen.

Alle Upstream-Änderungen: https://github.com/dgtlmoon/changedetection.io/compare/0.60.9...0.70.2`,
    pl_PL: `Aktualizuje ChangeDetection.io do 0.70.2.

- Naprawia niestandardowe połączenia WebSocket z przeglądarką dla obserwacji bez kroków przeglądarki.
- Dodaje opcjonalny serwer MCP z tokenami dostępu, uprawnieniami i logowaniem OAuth dla asystentów.
- Dodaje kreator powiadomień i ulepsza historię PDF, wykrywanie cen oraz wczytywanie historii obserwacji.
- Naprawia nadmierne sprawdzanie po imporcie lub przywróceniu, nieaktualne statusy HTTP, szablony powiadomień i zapisywanie ustawień AI.
- Zawiera poprawki bezpieczeństwa wyrażeń regularnych w powiadomieniach i obsługi danych logowania do proxy przeglądarki.

Przed aktualizacją wykonaj kopię zapasową. Powrót do starszej wersji jest zablokowany; wymaga przywrócenia kopii wykonanej w tej wersji.

Wszystkie zmiany upstream: https://github.com/dgtlmoon/changedetection.io/compare/0.60.9...0.70.2`,
    fr_FR: `Met à jour ChangeDetection.io vers 0.70.2.

- Corrige les connexions WebSocket de navigateur personnalisées pour les surveillances sans étapes de navigation.
- Ajoute un serveur MCP facultatif avec jetons d'accès, permissions et connexion OAuth pour les assistants.
- Ajoute un assistant de configuration des notifications et améliore l'historique PDF, la détection des prix et le chargement de l'historique.
- Corrige les vérifications excessives après import ou restauration, les états HTTP périmés, les modèles de notification et l'enregistrement des paramètres IA.
- Inclut des correctifs de sécurité pour les expressions régulières des notifications et les identifiants de proxy du navigateur.

Créez une sauvegarde avant la mise à jour. Les retours à une ancienne version sont bloqués ; ils nécessitent de restaurer une sauvegarde créée avec cette version.

Tous les changements upstream : https://github.com/dgtlmoon/changedetection.io/compare/0.60.9...0.70.2`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
