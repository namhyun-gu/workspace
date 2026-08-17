/**
 * Google Maps JavaScript API 중 이 프로젝트가 실제로 쓰는 부분만 선언한다.
 * `@types/google.maps`를 넣지 않는 이유는 pnpm-lock.yaml을 건드리지 않기 위해서다
 * (CI가 `--frozen-lockfile`로 설치하므로 package.json 변경은 락파일 재생성을 요구한다).
 */
export {};

declare global {
  namespace google.maps {
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapsEventListener {
      remove(): void;
    }

    interface Padding {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }

    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      minZoom?: number;
      maxZoom?: number;
      mapId?: string;
      /** v3.60+ : "LIGHT" | "DARK" | "FOLLOW_SYSTEM" */
      colorScheme?: string;
      gestureHandling?: "none" | "greedy" | "cooperative" | "auto";
      zoomControl?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
      rotateControl?: boolean;
      scaleControl?: boolean;
      clickableIcons?: boolean;
      keyboardShortcuts?: boolean;
    }

    class LatLngBounds {
      constructor();
      extend(point: LatLngLiteral): LatLngBounds;
      isEmpty(): boolean;
    }

    class Map {
      constructor(el: HTMLElement, opts?: MapOptions);
      fitBounds(bounds: LatLngBounds, padding?: number | Padding): void;
      getZoom(): number | undefined;
      setZoom(zoom: number): void;
      setOptions(opts: MapOptions): void;
      addListener(name: string, handler: () => void): MapsEventListener;
    }

    interface InfoWindowOptions {
      content?: string | Node;
      maxWidth?: number;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      setContent(content: string | Node): void;
      open(opts: { map?: Map; anchor?: unknown }): void;
      close(): void;
    }

    namespace event {
      function addListenerOnce(instance: object, name: string, handler: () => void): MapsEventListener;
    }

    namespace marker {
      interface AdvancedMarkerElementOptions {
        map?: Map | null;
        position?: LatLngLiteral | null;
        content?: Node | null;
        zIndex?: number | null;
        title?: string;
        gmpClickable?: boolean;
      }

      class AdvancedMarkerElement {
        constructor(opts?: AdvancedMarkerElementOptions);
        map: Map | null;
        position: LatLngLiteral | null;
        content: Node | null;
        zIndex: number | null;
        gmpClickable: boolean;
        addListener(name: string, handler: () => void): MapsEventListener;
      }
    }
  }

  interface Window {
    google?: { maps?: unknown };
  }
}
