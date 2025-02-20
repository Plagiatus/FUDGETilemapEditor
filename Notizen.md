# Features

- tiles
    - basic: just a part of a larger atlas
    - rule based: displays different basic tiles based on set of rules
    - slice-tile: tileset that takes parts of tiles it needs automatically, by basically sort of 4/9-slicing them?
    - scale? (maybe in layer instead?)
- rules
    - based on neighbors
    - random from multiple
    - (animation?)
- layers


- functionality
    - hitbox / etc
    - functionality / code per tile


Editor:
- löschen
- verschieben
- mehrere tiles gleichzeitig setzen
- fill
    - shapes (square / circle)
    - fill bucket / tool 
- picking
- copy / paste

# Optimierung:

- verschiedene Layer offscreen vor-rendern, ggf mit webworkern, dann kombinieren
- nur rendern wenn sich was ändert
- nur das rendern was sich ändert
- nur das rendern was sichtbar ist
    - ggf chunken, also die map in mehrere Chunks aufteilen und diese individuell rendern


