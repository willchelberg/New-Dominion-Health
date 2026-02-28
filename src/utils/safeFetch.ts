/**
 * Safe fetch wrapper that gracefully handles backend connection errors
 * Returns null instead of throwing when backend is not deployed
 */

export interface SafeFetchOptions extends RequestInit {
  returnNullOnError?: boolean;
  suppressWarnings?: boolean; // Option to suppress console warnings
}

export async function safeFetch(
  url: string,
  options: SafeFetchOptions = {}
): Promise<Response | null> {
  const { returnNullOnError = true, suppressWarnings = true, ...fetchOptions } = options;
  
  try {
    const response = await fetch(url, fetchOptions);
    return response;
  } catch (error) {
    // Only log if not suppressing warnings
    if (!suppressWarnings) {
      console.warn(`Backend not available: ${url}`, error);
    }
    if (returnNullOnError) {
      return null;
    }
    throw error;
  }
}

export async function safeFetchJSON<T = any>(
  url: string,
  options: SafeFetchOptions = {}
): Promise<T | null> {
  const response = await safeFetch(url, options);
  
  if (!response) {
    return null;
  }
  
  if (!response.ok) {
    if (!options.suppressWarnings) {
      console.warn(`HTTP error ${response.status} from: ${url}`);
    }
    return null;
  }
  
  try {
    return await response.json();
  } catch (error) {
    if (!options.suppressWarnings) {
      console.warn(`Failed to parse JSON from: ${url}`, error);
    }
    return null;
  }
}