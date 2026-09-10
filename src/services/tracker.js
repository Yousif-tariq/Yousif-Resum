import { API_BASE } from '../config/api';

/**
 * Gets or creates a persistent anonymous device identifier.
 */
function getOrCreateDeviceId() {
  try {
    let deviceId = localStorage.getItem('quantum_device_id');
    if (!deviceId) {
      const randomSegment = Math.random().toString(36).substring(2, 10);
      const timestamp = Date.now().toString(36);
      deviceId = `dev-${timestamp}-${randomSegment}`;
      localStorage.setItem('quantum_device_id', deviceId);
    }
    return deviceId;
  } catch (e) {
    return `dev-${Date.now()}`;
  }
}

/**
 * Dispatches an asynchronous fire-and-forget visit tracking payload to the Django backend.
 */
export function recordVisit(lang = 'en', path = '/') {
  try {
    if (!API_BASE) return; // Silent if no API URL configured

    const payload = {
      device_id: getOrCreateDeviceId(),
      language: lang || 'en',
      screen_resolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
      referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
      path_visited: path || window.location.pathname || '/'
    };

    const url = `${API_BASE}/api/track-visit/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {
      // Non-blocking silent catch
    });
  } catch (e) {
    // Non-blocking silent catch
  }
}
