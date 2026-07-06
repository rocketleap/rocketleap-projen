/**
 * Keys where the Rocketleap opinion is load-bearing. User overrides for these are
 * dropped by mergeProjectOptions so the platform's guarantees hold.
 */
export const LOCKED_KEYS: ReadonlySet<string> = new Set([
  'name',
  'packageName',
  'defaultReleaseBranch',
  'licensed',
  'autoDetectBin',
  'pullRequestTemplate',
  'cdkVersionPinning',
  'packageManager',
]);

/**
 * Keys nested inside `githubOptions` that Rocketleap must own.
 */
const LOCKED_GITHUB_KEYS: ReadonlySet<string> = new Set(['mergify', 'workflows']);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function dedupe<T>(items: T[]): T[] {
  const seen = new Set<unknown>();
  const out: T[] = [];
  for (const item of items) {
    const key = typeof item === 'object' && item !== null ? JSON.stringify(item) : item;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function mergeValues(userValue: unknown, defaultValue: unknown): unknown {
  if (userValue === undefined) return defaultValue;
  if (defaultValue === undefined) return userValue;

  if (Array.isArray(userValue) && Array.isArray(defaultValue)) {
    return dedupe([...userValue, ...defaultValue]);
  }

  if (isPlainObject(userValue) && isPlainObject(defaultValue)) {
    return mergeObjects(userValue, defaultValue);
  }

  return userValue;
}

function mergeObjects(userObj: Record<string, unknown>, defaultObj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...defaultObj };
  for (const key of Object.keys(userObj)) {
    out[key] = mergeValues(userObj[key], defaultObj[key]);
  }
  return out;
}

/**
 * Deep-merge user-supplied projen options with Rocketleap defaults so both survive.
 *
 * - Arrays are concat + deduped, user entries first.
 * - Plain objects are recursively merged; on scalar collisions the user wins.
 * - Class instances, enums, functions, and other non-plain values are treated as scalars.
 * - Keys in {@link LOCKED_KEYS} are always taken from the Rocketleap defaults; a
 *   user override for those is silently dropped.
 * - The `githubOptions` object is merged, but the nested `mergify` and `workflows`
 *   fields inside it are locked to the Rocketleap defaults.
 */
export function mergeProjectOptions<TResult extends object, TUser extends object = TResult>(
  userOptions: TUser,
  rocketleapDefaults: Record<string, unknown>,
): TResult {
  const user = userOptions as unknown as Record<string, unknown>;
  const defaults = rocketleapDefaults;

  const merged: Record<string, unknown> = {};
  const keys = new Set([...Object.keys(defaults), ...Object.keys(user)]);

  for (const key of keys) {
    if (LOCKED_KEYS.has(key) && key in defaults) {
      merged[key] = defaults[key];
      continue;
    }

    if (key === 'githubOptions' && isPlainObject(defaults[key]) && isPlainObject(user[key])) {
      const mergedGithub = mergeObjects(user[key] as Record<string, unknown>, defaults[key] as Record<string, unknown>);
      for (const lockedKey of LOCKED_GITHUB_KEYS) {
        const defaultGithub = defaults[key] as Record<string, unknown>;
        if (lockedKey in defaultGithub) {
          mergedGithub[lockedKey] = defaultGithub[lockedKey];
        }
      }
      merged[key] = mergedGithub;
      continue;
    }

    merged[key] = mergeValues(user[key], defaults[key]);
  }

  return merged as unknown as TResult;
}
