---
title: 'DevBlog #2: Stateful vs. Stateless in Paper Plugins'
description: 'Erfahre, welche Vor- und Nachteile stateful und stateless Ansätze in der Paper Plugin-Entwicklung bieten – inklusive praktischer Beispiele aus unserer GitHub-Organisation OneLiteFeatherNET.'
pubDate: 'Feb 10 2025'
heroImage: '/blog/dev-blog-1.webp'
slug: 'dev-blog-2-stateful-vs-stateless-paper-plugins'
---

# Gängige stateful Plugins und ihre stateless Alternativen in der Paper Plugin-Entwicklung

Unser Team arbeitet täglich mit Paper Plugins, um unseren Minecraft-Server mit innovativen und individuellen Funktionen zu erweitern. In diesem Beitrag stelle ich dir eine aktiv verwendete Technologie vor – die Paper Plugin-Entwicklung – und zeige dir anhand von Beispielen, wie der stateful (zustandsbehaftete) Ansatz im Vergleich zum stateless (zustandslosen) Ansatz funktioniert. Erfahre, welche Vor- und Nachteile beide Ansätze bieten und wie sie dir dabei helfen können, robuste und effiziente Plugins zu erstellen.

> **Tipp für Entwickler:**  
> Überlege dir vor der Implementierung, ob du Daten dauerhaft speichern musst (stateful) oder ob es ausreicht, Aktionen direkt und ohne Zwischenspeicherung auszuführen (stateless). So findest du den optimalen Ansatz für dein Projekt!

---

## Grundlagen: Was bedeuten stateful und stateless?

### Stateful Plugins

**Stateful Plugins** speichern interne Zustände – zum Beispiel in Datenstrukturen wie `HashMap` oder in Datenbanken. Dies ist ideal, wenn du Spielerstatistiken, Fortschritte oder individuelle Einstellungen dauerhaft ablegen möchtest.

**Vorteile:**
- **Persistente Daten:** Spielerbezogene Daten bleiben über mehrere Aktionen hinweg erhalten.
- **Komplexe Interaktionen:** Ermöglicht das Verwalten detaillierter Statistiken und fortlaufender Zustände.

**Nachteile:**
- **Höherer Ressourcenaufwand:** Zusätzlicher Speicherbedarf und aufwendigere Verwaltung.
- **Erhöhte Komplexität:** Zusätzliche Maßnahmen für Datensicherung und Synchronisation sind erforderlich.

### Stateless Plugins

**Stateless Plugins** speichern keine internen Zustände. Jede Anfrage wird unabhängig verarbeitet – perfekt für einfache Befehle oder Ad-hoc-Berechnungen.

**Vorteile:**
- **Einfache Implementierung:** Weniger Code und geringerer Ressourcenverbrauch.
- **Unabhängige Verarbeitung:** Keine Synchronisationsprobleme, da jede Berechnung isoliert erfolgt.

**Nachteile:**
- **Keine Langzeitspeicherung:** Daten werden nicht zwischen den Aufrufen behalten.
- **Begrenzte Funktionalität:** Nicht geeignet für komplexe, personalisierte Features.

---

## Praxisbeispiele: Stateful vs. Stateless in Aktion

Im Folgenden findest du zwei Beispiel-Codes, die den Unterschied zwischen stateful und stateless Plugins verdeutlichen. Alle **Beispiel-Codes** dienen als Vorlage und können individuell an deine Projektanforderungen angepasst werden.

### Beispiel 1: Stateful Plugin – Spieler-Kill Counter

Viele Plugins, wie etwa Scoreboards oder Wirtschaftssysteme, speichern dauerhaft Daten. Ein typisches stateful Plugin ist ein Kill-Counter, der die Anzahl der Kills eines Spielers in einer internen `HashMap` speichert. Dadurch bleibt der Zähler während der gesamten Serverlaufzeit erhalten und kann beispielsweise für Ranglisten oder Belohnungssysteme genutzt werden.

```java
public class PlayerKillCounterPlugin extends JavaPlugin implements Listener {
    // Speichert die Anzahl der Kills jedes Spielers
    private Map<UUID, Integer> killCounts = new HashMap<>();

    @Override
    public void onEnable() {
        // Registrierung des Event-Listeners
        getServer().getPluginManager().registerEvents(this, this);
    }
    
    @EventHandler
    public void onPlayerDeath(EntityDeathEvent event) {
        if (event.getEntity() instanceof Player) {
            Player victim = (Player) event.getEntity();
            Player killer = victim.getKiller();
            if (killer != null) {
                UUID killerId = killer.getUniqueId();
                int currentKills = killCounts.getOrDefault(killerId, 0);
                killCounts.put(killerId, currentKills + 1);
                killer.sendMessage("Deine Kill-Anzahl: " + (currentKills + 1));
            }
        }
    }
}
```

**Erklärung:**  
- **Stateful-Aspekt:** Der Kill-Counter speichert den Zustand jedes Spielers in einer `HashMap` während der gesamten Serverlaufzeit.  
- **Wichtig für Entwickler:** Für den produktiven Einsatz sollte zusätzlich über Mechanismen zur Datensicherung (z. B. persistente Speicherung in Dateien oder Datenbanken) nachgedacht werden.

---

### Beispiel 2: Stateless Plugin – Kill-Ankündigung

Im Gegensatz dazu kann ein Plugin so gestaltet werden, dass es bei jedem Kill-Ereignis direkt reagiert, ohne den Zustand zu speichern. Ein stateless Plugin kündigt den Kill-Vorgang öffentlich an, verarbeitet das Ereignis aber nur im Moment selbst.

```java
public class AnnounceKillPlugin extends JavaPlugin implements Listener {
    @Override
    public void onEnable() {
        // Registrierung des Event-Listeners
        getServer().getPluginManager().registerEvents(this, this);
    }
    
    @EventHandler
    public void onPlayerDeath(EntityDeathEvent event) {
        if (event.getEntity() instanceof Player) {
            Player victim = (Player) event.getEntity();
            Player killer = victim.getKiller();
            if (killer != null) {
                // Direkte Ankündigung des Kills ohne Speicherung eines Zustands
                getServer().broadcastMessage(killer.getName() + " hat " + victim.getName() + " getötet!");
            }
        }
    }
}
```

**Erklärung:**  
- **Stateless-Aspekt:** Jede Ankündigung erfolgt direkt und ohne Speicherung eines langfristigen Zustands.  
- **Wichtig für Entwickler:** Dieser Ansatz eignet sich für einfache, sofortige Aktionen, bei denen keine persistente Datenspeicherung erforderlich ist.

---

## Vergleich: Stateful vs. Stateless

| **Ansatz**   | **Vorteile**                                                | **Nachteile**                                                   |
|--------------|-------------------------------------------------------------|-----------------------------------------------------------------|
| **Stateful** | - Persistente, individuelle Daten<br>- Personalisierte Features | - Höherer Ressourcenverbrauch<br>- Komplexere Datenverwaltung    |
| **Stateless**| - Einfache Implementierung<br>- Geringerer Ressourcenverbrauch   | - Keine Speicherung über Ereignisse hinweg<br>- Eingeschränkte Funktionalität |

---

## Fazit

Die Wahl zwischen stateful und stateless Ansätzen hängt ganz von den Anforderungen deines Projekts ab. Während stateful Plugins komplexe, personalisierte Funktionen ermöglichen – etwa für Ranglisten, Belohnungen oder Wirtschaftssysteme – bieten stateless Plugins eine einfache und ressourcenschonende Lösung für unmittelbare Aktionen.

Mit den hier vorgestellten **Beispiel-Codes** hast du einen klaren Überblick darüber, wie diese beiden Ansätze in der Paper Plugin-Entwicklung umgesetzt werden können. Nutze diese Beispiele als Ausgangspunkt für deine eigene Entwicklung und passe sie an deine individuellen Bedürfnisse an.

---

**Weitere Informationen:**  
Besuche unsere GitHub-Organisation [OneLiteFeatherNET](https://github.dev/OneLiteFeatherNET), um zahlreiche Beispielprojekte und Inspiration für deinen nächsten Paper Plugin zu finden. Abonniere unseren Newsletter, um immer auf dem neuesten Stand zu bleiben und deinen Minecraft-Server kontinuierlich zu verbessern!

*Hinweis: Alle Code-Beispiele in diesem Artikel dienen als **Beispiel-Code**. Passe sie an deine individuellen Bedürfnisse an und erweitere sie nach Belieben.*
