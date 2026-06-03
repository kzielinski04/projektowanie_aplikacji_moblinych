Opis zmian wprowadzonych w ekranie `HomeScreen`

Co zmieniono:
- W pliku `screens/HomeScreen.tsx` dodano pole `TextInput` do wyszukiwania po tytule i opisie wydarzeń.
- Dodano prosty filtr kategorii (poziomy pasek z przyciskami) generowany dynamicznie z dostępnych kategorii.
- Wydzielono logikę filtrowania poza JSX przy użyciu `useMemo` jako `filteredEvents`.
- Zmieniono źródło danych `FlatList` na `filteredEvents`.
- Dodano licznik wyników oraz `ListEmptyComponent` wyświetlający komunikat "Brak wyników" gdy nie ma dopasowań.
- Dodano lokalny stan: `searchText` i `selectedCategory` oraz importy `TextInput`, `ScrollView`, `useMemo`.

Co napisałem (krótkie podsumowanie opisu i instrukcji przekazanych w rozmowie):
- Opisałem listę zmienionych elementów i uzasadnienie (dodanie wyszukiwania i filtra, separacja logiki do `useMemo`).
- Podałem instrukcję jak ręcznie przetestować funkcjonalność (testy wyszukiwania, filtrowania, kombinacji, pustego stanu i dodawania nowego wydarzenia przez formularz).
- Wymieniłem ryzyka i ograniczenia: brak debounce, inline style mogą powodować re-rendery, użycie `Date.now()` jako ID, brak a11y i brak testów automatycznych.
- Zaproponowałem opcjonalny refactor (wydzielenie `SearchInput`, `CategoryFilter`, `EventsEmptyState`, przeniesienie inline-styli do `StyleSheet`, constants dla magicznych wartości).

Jak przetestowano (manualnie):
- Wpisywanie frazy w polu wyszukiwania powinno filtrować listę po tytule i opisie.
- Wybór kategorii pokazuje tylko wydarzenia z tej kategorii.
- Kombinacja wyszukiwania i filtra działa łącznie.
- Brak dopasowań wyświetla komunikat "Brak wyników".
- Dodanie nowego wydarzenia powoduje pojawienie się nowej kategorii w filtrze.

Ryzyka / ograniczenia:
- Brak debounce przy wpisywaniu → potencjalne obciążenie przy bardzo dużych listach.
- Inline style powodujące re-rendery i mniejszą spójność stylów.
- Brak pełnej obsługi accessibility i lokalizacji tekstów.
- `Date.now()` jako generator ID może w bardzo rzadkich przypadkach prowadzić do kolizji.
- Brak testów jednostkowych/integracyjnych pokrywających nową logikę.

Następne kroki (opcjonalnie):
- Wydzielenie komponentów `SearchInput`, `CategoryFilter`, `EventsEmptyState`.
- Przeniesienie inline-styli do `styles/HomeScreenStyles.tsx` i użycie theme constants.
- Dodanie debounced search i/lub prostego testu jednostkowego dla funkcji filtrowania.

Pliki zmienione:
- `screens/HomeScreen.tsx` — dodano wyszukiwanie, filtr, `useMemo`, `ListEmptyComponent`.

Jeżeli chcesz, mogę od razu utworzyć branch, zatwierdzić zmiany i przygotować pull request z tym opisem.