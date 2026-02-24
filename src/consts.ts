// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'abhisek.xyz';
export const SITE_DESCRIPTION = 'Abhisek Mazumdar - Drupal Developer & Open Source Advocate';

export const DRUPAL_ORG_USERNAME = 'abhisekmazumdar';

/** Drupal.org user ID (uid) – required for the contribution records JSON:API. */
export const DRUPAL_ORG_UID = 3557964;

export const DRUPAL_ORG_PROFILE_URL = 'https://www.drupal.org/u/abhisekmazumdar';

export const DRUPAL_ORG_CREDITS_URL = 'https://www.drupal.org/user/3557964/contribution-records';

/**
 * Projects to highlight in the credits component. Add/remove entries to change what’s shown.
 * machineName is the Drupal.org project machine name (e.g. drupal, ai).
 */
export const DRUPAL_CREDITS_PROJECTS: { label: string; machineName: string }[] = [
	{ label: 'Drupal Core', machineName: 'drupal' },
	{ label: 'AI', machineName: 'ai' },
];

/** Optional override for Drupal.org credit counts when API is down or for testing. */
export const DRUPAL_CREDITS_OVERRIDE:
	| { total?: number; [machineName: string]: number | undefined }
	| undefined = undefined;
