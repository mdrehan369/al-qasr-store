import { ApiError } from "./catalog";

export async function catalogFetch<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
  } catch {
    throw new ApiError(
      "The fragrance catalogue is temporarily unavailable.",
      503,
    );
  }

  if (!response.ok) {
    let message = "The fragrance catalogue is temporarily unavailable.";

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {}

    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}
