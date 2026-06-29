# Map System

NagrikAI is a "map-first" application. The geospatial interface is the primary way users interact with the system.

## Library and Technology
- **Library**: `react-leaflet` (React wrapper for Leaflet.js).
- **Map Tiles**: The application uses generic map tiles via the `TileLayer` component. *Note: In a production environment, this should point to a styled map provider (e.g., Mapbox, Google Maps, or a custom styled OSM server) that matches the project's dark/light design system.*

## Implementation Details

### `Home.tsx` (Main Map)
- Renders a full-screen map.
- Dynamically iterates over the `reports` array (fetched from the backend) to place markers.
- **Markers**: Uses Leaflet's `L.divIcon` to render custom HTML/CSS markers instead of standard image pins. The markers are styled using Tailwind CSS classes to match the design system (e.g., pulsating backgrounds, color-coded by issue type).
- **Interactivity**: Clicking a marker opens a `Tooltip` (or `Popup`) showing the issue type and location.

### `Dashboard.tsx` (Agency Map)
- The dashboard includes a smaller map view adjacent to the list of reports.
- Uses a `MapUpdater` utility component. When a user clicks a report in the list, or filters the list, the `MapUpdater` automatically pans and zooms the map to fit the bounds of the currently visible reports using Leaflet's `map.fitBounds()`.

### Location Capture
- In `Capture.tsx`, the application uses the browser's `navigator.geolocation` API to capture latitude and longitude when reporting an issue.
- **Limitation**: Currently, reverse-geocoding (converting lat/lng to a readable street address) is mocked or handled very simply. A production version requires integration with a Geocoding API (e.g., Google Maps Geocoding API) to reliably populate the `location` string.

## Styling Rules
Per the design constitution:
- Maps should align with the current theme (Dark/Light).
- Markers must not use generic map pins; they must be semantic (e.g., warning colors, pulsing animations for severe issues).
- Maps must remain interactive and performant.
