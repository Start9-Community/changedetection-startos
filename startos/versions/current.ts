import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.60.9:0',
  releaseNotes: {
    en_US: `Updated ChangeDetection.io to 0.60.9.

- Stops trusting certificates from a compromised certificate authority (eMudhra).
- Fixes restock and price detection reading decimal-comma prices ("39,99") as whole numbers.
- Adds a \`unixtime\` filter for formatting Unix timestamps in notifications.
- The language selector is available on the login page.
- Updates notification, browser and parsing dependencies.

Full upstream changes: https://github.com/dgtlmoon/changedetection.io/compare/0.60.8...0.60.9`,
    es_ES: `Actualiza ChangeDetection.io a 0.60.9.

- Deja de confiar en los certificados de una autoridad de certificación comprometida (eMudhra).
- Corrige que la detección de reposición y de precios leyera los precios con coma decimal ("39,99") como números enteros.
- Añade un filtro \`unixtime\` para dar formato a las marcas de tiempo Unix en las notificaciones.
- El selector de idioma está disponible en la página de inicio de sesión.
- Actualiza las dependencias de notificaciones, navegador y análisis.

Todos los cambios de upstream: https://github.com/dgtlmoon/changedetection.io/compare/0.60.8...0.60.9`,
    de_DE: `Aktualisiert ChangeDetection.io auf 0.60.9.

- Vertraut Zertifikaten einer kompromittierten Zertifizierungsstelle (eMudhra) nicht mehr.
- Behebt, dass die Wiederauffüllungs- und Preiserkennung Preise mit Dezimalkomma („39,99“) als ganze Zahlen las.
- Fügt einen \`unixtime\`-Filter hinzu, um Unix-Zeitstempel in Benachrichtigungen zu formatieren.
- Die Sprachauswahl ist auf der Anmeldeseite verfügbar.
- Aktualisiert Abhängigkeiten für Benachrichtigungen, Browser und Parsing.

Alle Upstream-Änderungen: https://github.com/dgtlmoon/changedetection.io/compare/0.60.8...0.60.9`,
    pl_PL: `Aktualizuje ChangeDetection.io do 0.60.9.

- Przestaje ufać certyfikatom przejętego urzędu certyfikacji (eMudhra).
- Naprawia odczytywanie przez wykrywanie zapasów i cen kwot z przecinkiem dziesiętnym („39,99”) jako liczb całkowitych.
- Dodaje filtr \`unixtime\` do formatowania znaczników czasu Unix w powiadomieniach.
- Wybór języka jest dostępny na stronie logowania.
- Aktualizuje zależności powiadomień, przeglądarki i parsowania.

Wszystkie zmiany upstream: https://github.com/dgtlmoon/changedetection.io/compare/0.60.8...0.60.9`,
    fr_FR: `Met à jour ChangeDetection.io vers 0.60.9.

- Ne fait plus confiance aux certificats d'une autorité de certification compromise (eMudhra).
- Corrige la lecture par la détection de réapprovisionnement et de prix des prix à virgule décimale (« 39,99 ») comme des nombres entiers.
- Ajoute un filtre \`unixtime\` pour formater les horodatages Unix dans les notifications.
- Le sélecteur de langue est disponible sur la page de connexion.
- Met à jour les dépendances de notification, de navigateur et d'analyse.

Tous les changements upstream : https://github.com/dgtlmoon/changedetection.io/compare/0.60.8...0.60.9`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
